// IPC handlers for Electron main process
// Bridges renderer to the notebook manager

const { ipcMain, dialog, app } = require('electron');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { NotebookManager } = require('./notebook');
const blobs = require('./blobs');

let manager = null;
let mainWindow = null;
let _configPath = null;
let _deviceId = null;

function setupIPC(win, configPath, deviceId) {
  mainWindow = win;
  _configPath = configPath;
  _deviceId = deviceId;
  manager = new NotebookManager();

  // Forward renderer logs to main process stdout
  ipcMain.on('renderer:log', (event, ...args) => {
    console.log('[renderer]', ...args);
  });

  // Open or create a notebook
  ipcMain.handle('notebook:open', async (event, notebookPath) => {
    if (manager.notebookPath) {
      manager.close();
    }

    // Handle default notebook path
    if (notebookPath === '__default__') {
      const dropbox = path.join(os.homedir(), 'Dropbox', 'Notes');
      notebookPath = path.join(dropbox, 'My Notebook.notebound');
    }

    const state = manager.open(notebookPath, _deviceId);

    // Set up state change listener to push to renderer
    manager.onStateChange((newState) => {
      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.webContents.send('notebook:state-changed', newState);
      }
    });

    return state;
  });

  // Get current state
  ipcMain.handle('notebook:get-state', async () => {
    return manager ? manager.getState() : null;
  });

  // Apply an operation from the renderer
  ipcMain.handle('notebook:apply-op', async (event, op) => {
    if (!manager) return null;
    return manager.applyOp(op);
  });

  // Apply multiple ops at once (batch)
  ipcMain.handle('notebook:apply-ops', async (event, ops) => {
    if (!manager) return null;
    let state;
    for (const op of ops) {
      state = manager.applyOp(op);
    }
    return state;
  });

  // Flush WAL (seal current buffer)
  ipcMain.handle('notebook:flush', async () => {
    if (manager) manager.flush();
  });

  // Store a blob from raw buffer + metadata, returns hash
  ipcMain.handle('notebook:save-blob', async (event, data, meta) => {
    if (!manager || !manager.blobsDir) return null;
    const buffer = Buffer.from(data);
    const blobMeta = { mimeType: meta?.mimeType || 'application/octet-stream', ...meta };
    return blobs.store(buffer, manager.blobsDir, blobMeta);
  });

  // Get a blob as data URL by hash
  ipcMain.handle('notebook:get-blob', async (event, hash) => {
    if (!manager || !manager.blobsDir) return null;
    const data = blobs.get(hash, manager.blobsDir);
    if (!data) return null;
    const meta = blobs.getMeta(hash, manager.blobsDir);
    const mimeType = meta?.mimeType || 'application/octet-stream';
    return `data:${mimeType};base64,${data.toString('base64')}`;
  });

  // Show open dialog to pick a .notebound directory
  ipcMain.handle('notebook:pick-directory', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ['openDirectory', 'createDirectory'],
      title: 'Open or Create Notebook',
      buttonLabel: 'Open Notebook',
    });
    if (result.canceled || result.filePaths.length === 0) return null;
    return result.filePaths[0];
  });

  // Show save dialog to create a new .notebound directory
  ipcMain.handle('notebook:pick-save-path', async () => {
    const result = await dialog.showSaveDialog(mainWindow, {
      title: 'Create New Notebook',
      defaultPath: 'MyNotebook.notebound',
      buttonLabel: 'Create',
    });
    if (result.canceled) return null;
    // Ensure .notebound extension
    let p = result.filePath;
    if (!p.endsWith('.notebound')) p += '.notebound';
    return p;
  });

  // Get the notebook path (for display)
  ipcMain.handle('notebook:get-path', async () => {
    return manager ? manager.notebookPath : null;
  });

  // Fetch a remote image URL and return as buffer (bypasses CORS)
  ipcMain.handle('notebook:fetch-image', async (event, url) => {
    const { net } = require('electron');
    const resp = await net.fetch(url);
    if (!resp.ok) throw new Error('fetch failed: ' + resp.status);
    const contentType = resp.headers.get('content-type') || 'image/png';
    const buffer = Buffer.from(await resp.arrayBuffer());
    return { buffer, contentType, size: buffer.length };
  });

  // Save notebook path to config (merges with existing config)
  ipcMain.handle('notebook:save-config', async (event, notebookPath) => {
    let config = {};
    try { config = JSON.parse(fs.readFileSync(_configPath, 'utf8')); } catch {}
    config.notebookPath = notebookPath;
    try { fs.writeFileSync(_configPath, JSON.stringify(config)); } catch {}
  });

  // Get config (for renderer to check if first-run)
  ipcMain.handle('notebook:get-config', async () => {
    try { return JSON.parse(fs.readFileSync(_configPath, 'utf8')); } catch { return {}; }
  });
}

// Open default notebook eagerly from main process (no IPC round-trip)
function openDefault(win, notebookPath, deviceId) {
  mainWindow = win;
  _deviceId = deviceId;
  console.log('[notebound] openDefault called, path:', notebookPath, 'manager:', !!manager);
  if (!manager) manager = new NotebookManager();
  if (manager.notebookPath) manager.close();
  manager.open(notebookPath, deviceId);
  console.log('[notebound] notebook opened, state notebooks:', manager.state?.notebooks?.length);

  manager.onStateChange((newState) => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('notebook:state-changed', newState);
    }
  });

  // Once the renderer is ready, push the initial state
  win.webContents.on('did-finish-load', () => {
    if (manager.state) {
      win.webContents.send('notebook:state-changed', manager.state);
    }
  });
}

function closeNotebook() {
  console.log('[notebound] closeNotebook called, manager exists:', !!manager, 'path:', manager?.notebookPath);
  if (manager) {
    manager.close();
    console.log('[notebound] notebook closed, WAL sealed + snapshot written');
  }
}

module.exports = { setupIPC, closeNotebook, openDefault };
