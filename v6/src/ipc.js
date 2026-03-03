// IPC handlers for Electron main process
// Bridges renderer to the notebook manager

const { ipcMain, dialog, app, shell } = require('electron');
const os = require('os');
const path = require('path');
const fs = require('fs');
const net = require('net');
const { NotebookManager } = require('./notebook');
const blobs = require('./blobs');
const { createVFS, cleanupVFS } = require('./claude-vfs');
const { ClaudeAgent } = require('./claude-agent');
const { config, writeConfig } = require('./config');

let manager = null;
let mainWindow = null;
let _deviceId = null;
let _claudeAgent = null;
let _claudeVfsPath = null;
let _claudePageMap = null;
let _userDataPath = null;
let _mcpSocketServer = null;
let _mcpSocketPath = null;

function _findPage(pages, id) {
  for (const p of pages) {
    if (p.id === id) return p;
    if (p.children?.length) { const f = _findPage(p.children, id); if (f) return f; }
  }
  return null;
}

function setupIPC(win, deviceId, userDataPath) {
  mainWindow = win;
  _deviceId = deviceId;
  _userDataPath = userDataPath;
  manager = new NotebookManager();

  // Window controls (for frameless window on Linux)
  ipcMain.handle('window:minimize', () => mainWindow.minimize());
  ipcMain.handle('window:maximize', () => {
    if (mainWindow.isMaximized()) mainWindow.unmaximize();
    else mainWindow.maximize();
  });
  ipcMain.handle('window:close', () => mainWindow.close());

  // Forward renderer logs to main process stdout
  ipcMain.on('renderer:log', (event, ...args) => {
    console.log('[renderer]', ...args);
  });

  // Open or create a notebook
  ipcMain.handle('notebook:open', async (event, notebookPath) => {
    console.log('[ipc] notebook:open called, path:', notebookPath);
    if (manager.notebookPath) {
      console.log('[ipc] closing existing notebook:', manager.notebookPath);
      manager.close();
    }

    // Handle default notebook path
    if (notebookPath === '__default__') {
      const dropbox = path.join(os.homedir(), 'Dropbox', 'Notes');
      notebookPath = path.join(dropbox, 'My Notebook.notebound');
    }

    const state = manager.open(notebookPath, _deviceId, _userDataPath);
    console.log('[ipc] notebook:open result — notebooks:', state?.notebooks?.length,
      'sections:', state?.notebooks?.[0]?.sections?.length,
      'ui:', JSON.stringify(state?.ui));

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
      properties: ['openDirectory'],
      title: 'Open Notebook',
      buttonLabel: 'Open Notebook',
      filters: [{ name: 'Notebound Notebooks', extensions: ['notebound'] }],
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

  // Save notebook path to config (merges with existing config, maintains recents)
  ipcMain.handle('notebook:save-config', async (event, info) => {
    const notebookPath = typeof info === 'string' ? info : info.path;
    const name = (typeof info === 'object' && info.name) || path.basename(notebookPath, '.notebound');
    console.log('[ipc] save-config — path:', notebookPath, 'name:', name);
    config.notebookPath = notebookPath;
    const recents = Array.isArray(config.recentNotebooks) ? config.recentNotebooks : [];
    const entry = { path: notebookPath, name, lastOpened: Date.now() };
    const filtered = recents.filter(r => r.path !== notebookPath);
    filtered.unshift(entry);
    config.recentNotebooks = filtered.slice(0, 10);
    writeConfig();
    console.log('[ipc] config written, notebookPath now:', config.notebookPath);
  });

  // ── MCP socket server for display panel ─────────────
  function startMcpSocket() {
    if (_mcpSocketServer) return _mcpSocketPath;

    const runDir = process.env.XDG_RUNTIME_DIR
      ? path.join(process.env.XDG_RUNTIME_DIR, 'notebound')
      : path.join(os.homedir(), '.cache', 'notebound', 'run');
    fs.mkdirSync(runDir, { recursive: true });

    _mcpSocketPath = path.join(runDir, `display-${process.pid}.sock`);
    // Clean up stale socket
    try { fs.unlinkSync(_mcpSocketPath); } catch {}

    _mcpSocketServer = net.createServer((conn) => {
      let data = '';
      conn.on('error', () => {}); // ignore EPIPE / connection reset
      conn.on('data', (chunk) => { data += chunk.toString(); });
      conn.on('end', () => {
        try {
          const cmd = JSON.parse(data.trim());
          console.log('[mcp-socket] received:', cmd);
          if (mainWindow && !mainWindow.isDestroyed()) {
            mainWindow.webContents.send('display:command', cmd);
          }
        } catch (err) {
          console.error('[mcp-socket] parse error:', err.message);
        }
        try { conn.end(); } catch {}
      });
    });

    _mcpSocketServer.listen(_mcpSocketPath, () => {
      console.log('[mcp-socket] listening on', _mcpSocketPath);
    });

    return _mcpSocketPath;
  }

  function stopMcpSocket() {
    if (_mcpSocketServer) {
      _mcpSocketServer.close();
      _mcpSocketServer = null;
    }
    if (_mcpSocketPath) {
      try { fs.unlinkSync(_mcpSocketPath); } catch {}
      _mcpSocketPath = null;
    }
  }

  // ── Claude agent IPC ─────────────────────────────────
  ipcMain.handle('claude:start', async (event, pageId) => {
    // Kill existing session
    if (_claudeAgent) { _claudeAgent.kill(); _claudeAgent = null; }
    if (_claudeVfsPath) { cleanupVFS(_claudeVfsPath); _claudeVfsPath = null; }
    _claudePageMap = null;

    if (!manager || !manager.state) throw new Error('No notebook open');

    const { sessionId, basePath, pageMap } = createVFS(manager.state, manager.notebookPath);
    _claudeVfsPath = basePath;
    _claudePageMap = pageMap;
    const cwd = (pageId && pageMap.get(pageId)) || basePath;

    // Start MCP socket server and build config
    const socketPath = startMcpSocket();
    const mcpConfig = {
      mcpServers: {
        'notebound-display': {
          command: 'node',
          args: [path.join(__dirname, 'mcp-server.js')],
          env: { NOTEBOUND_SOCKET: socketPath },
        },
      },
    };
    // Write MCP config to a temp file
    const mcpConfigPath = path.join(path.dirname(socketPath), `mcp-config-${process.pid}.json`);
    fs.writeFileSync(mcpConfigPath, JSON.stringify(mcpConfig), 'utf8');

    // Build context string describing the user's current location
    const state = manager.state;
    const nb = state.notebooks?.[0];
    let context = 'You are a helpful assistant with read-only access to a Notebound notebook.';
    if (nb) {
      context += `\nNotebook: "${nb.title}"`;
      if (pageId) {
        for (const sec of nb.sections || []) {
          const page = _findPage(sec.pages, pageId);
          if (page) {
            context += `\nCurrent section: "${sec.title}"`;
            context += `\nCurrent page: "${page.title}"`;
            break;
          }
        }
      }
    }
    context += '\nYour working directory contains the notebook content as HTML files organized by section.';
    context += '\n\nYou have access to a display panel tool (notebound-display MCP) that can show webpages in the app. When you want to show the user a webpage or HTML file, use the display_webpage tool. You can also refresh or close the display panel.';

    _claudeAgent = new ClaudeAgent(cwd, context, mcpConfigPath);
    console.log('[claude] started session, VFS at', basePath, 'cwd:', cwd, 'mcp:', mcpConfigPath);
    return { sessionId };
  });

  ipcMain.handle('claude:message', async (event, text) => {
    console.log('[ipc] claude:message received, agent exists:', !!_claudeAgent);
    if (!_claudeAgent) throw new Error('No Claude session');
    _claudeAgent.sendMessage(text, (data) => {
      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.webContents.send('claude:stream', data);
      }
    });
  });

  ipcMain.handle('claude:interrupt', async () => {
    if (_claudeAgent) _claudeAgent.interrupt();
  });

  ipcMain.handle('claude:stop', async () => {
    if (_claudeAgent) { _claudeAgent.kill(); _claudeAgent = null; }
    if (_claudeVfsPath) { cleanupVFS(_claudeVfsPath); _claudeVfsPath = null; }
    console.log('[claude] session stopped');
  });

  // Open a URL in the system browser
  ipcMain.handle('shell:open-external', async (event, url) => {
    if (typeof url === 'string' && (url.startsWith('http://') || url.startsWith('https://'))) {
      shell.openExternal(url);
    }
  });

  // Save UI navigation state per notebook path
  ipcMain.handle('notebook:save-ui-state', async (event, notebookPath, uiState) => {
    if (!config.uiPositions) config.uiPositions = {};
    config.uiPositions[notebookPath] = uiState;
    writeConfig();
  });

  // Save per-page view state (pan/zoom) to local config, keyed by notebookPath → pageId
  ipcMain.handle('notebook:save-page-view', async (event, notebookPath, pageId, panX, panY, zoom) => {
    if (!config.pageViews) config.pageViews = {};
    if (!config.pageViews[notebookPath]) config.pageViews[notebookPath] = {};
    const existing = config.pageViews[notebookPath][pageId] || {};
    config.pageViews[notebookPath][pageId] = { ...existing, panX, panY, zoom };
    writeConfig();
  });

  // Save per-page caret position to local config
  ipcMain.handle('notebook:save-page-caret', async (event, notebookPath, pageId, caretBlockId, caretOffset) => {
    if (!config.pageViews) config.pageViews = {};
    if (!config.pageViews[notebookPath]) config.pageViews[notebookPath] = {};
    const existing = config.pageViews[notebookPath][pageId] || {};
    config.pageViews[notebookPath][pageId] = { ...existing, caretBlockId, caretOffset };
    writeConfig();
  });

  // Get config (for renderer to check if first-run)
  ipcMain.handle('notebook:get-config', async () => {
    console.log('[ipc] get-config — notebookPath:', config.notebookPath, 'recents:', config.recentNotebooks?.length ?? 0);
    return config;
  });
}

// Open default notebook eagerly from main process (no IPC round-trip)
function openDefault(win, notebookPath, deviceId, userDataPath) {
  mainWindow = win;
  _deviceId = deviceId;
  _userDataPath = userDataPath;
  console.log('[notebound] openDefault called, path:', notebookPath, 'manager:', !!manager);
  try {
    if (!manager) manager = new NotebookManager();
    if (manager.notebookPath) manager.close();
    manager.open(notebookPath, deviceId, userDataPath);
    // Persist path after every successful open — repairs config if it was cleared by a prior error
    config.notebookPath = notebookPath;
    writeConfig();
    console.log('[notebound] notebook opened, state notebooks:', manager.state?.notebooks?.length);
  } catch (err) {
    console.error('[notebound] openDefault failed:', err.message);
    // Do NOT touch config — the path on disk is still valid.
    // Just show the welcome screen and let the user decide.
    // Tell renderer to stop waiting and show welcome screen
    const notify = () => {
      if (win && !win.isDestroyed()) {
        win.webContents.send('notebook:open-failed');
      }
    };
    if (win.webContents.isLoading()) {
      win.webContents.once('did-finish-load', notify);
    } else {
      notify();
    }
    return;
  }

  manager.onStateChange((newState) => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('notebook:state-changed', newState);
    }
  });

  // Push initial state — handle both "still loading" and "already loaded" cases
  const pushInitialState = () => {
    if (manager.state && win && !win.isDestroyed()) {
      win.webContents.send('notebook:state-changed', manager.state);
    }
  };
  if (win.webContents.isLoading()) {
    win.webContents.once('did-finish-load', pushInitialState);
  } else {
    pushInitialState();
  }
}

function closeNotebook() {
  console.log('[notebound] closeNotebook called, manager exists:', !!manager, 'path:', manager?.notebookPath);
  // Clean up Claude session
  if (_claudeAgent) { _claudeAgent.kill(); _claudeAgent = null; }
  if (_claudeVfsPath) { cleanupVFS(_claudeVfsPath); _claudeVfsPath = null; }
  // Clean up MCP socket
  if (_mcpSocketServer) {
    _mcpSocketServer.close();
    _mcpSocketServer = null;
  }
  if (_mcpSocketPath) {
    try { fs.unlinkSync(_mcpSocketPath); } catch {}
    // Also clean up the MCP config file
    try { fs.unlinkSync(_mcpSocketPath.replace('.sock', '').replace('display-', 'mcp-config-') + '.json'); } catch {}
    _mcpSocketPath = null;
  }
  if (manager) {
    manager.close();
    console.log('[notebound] notebook closed, WAL sealed + snapshot written');
  }
}

module.exports = { setupIPC, closeNotebook, openDefault };
