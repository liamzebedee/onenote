// IPC handlers for Electron main process
// Bridges renderer to the notebook manager

import { ipcMain, dialog, app, shell, net as electronNet, BrowserWindow } from 'electron';
import os from 'os';
import path from 'path';
import fs from 'fs';
import net from 'net';
import { exec, spawn } from 'child_process';
import { NotebookManager } from './notebook';
import * as blobs from './blobs';
import { createVFS, cleanupVFS } from './claude-vfs';
import { ClaudeAgent } from './claude-agent';
import { config, writeConfig, debouncedWriteConfig } from './config';
import type { AppState, Op, BlobMeta, NotebookMeta, Page, UiPosition, PageViewConfig } from '../../core/src/types';

let manager: NotebookManager | null = null;
let mainWindow: BrowserWindow | null = null;
let _deviceId: string | null = null;
let _claudeAgent: ClaudeAgent | null = null;
let _claudeVfsPath: string | null = null;
let _claudePageMap: Map<string, string> | null = null;
let _userDataPath: string | null = null;
let _mcpSocketServer: net.Server | null = null;
let _mcpSocketPath: string | null = null;

function _findPage(pages: Page[], id: string): Page | null {
  for (const p of pages) {
    if (p.id === id) return p;
    if (p.children?.length) { const f = _findPage(p.children, id); if (f) return f; }
  }
  return null;
}

function setupIPC(win: BrowserWindow, deviceId: string, userDataPath: string): void {
  mainWindow = win;
  _deviceId = deviceId;
  _userDataPath = userDataPath;
  manager = new NotebookManager();

  // Window controls (for frameless window on Linux)
  ipcMain.handle('window:minimize', () => mainWindow!.minimize());
  ipcMain.handle('window:maximize', () => {
    if (mainWindow!.isMaximized()) mainWindow!.unmaximize();
    else mainWindow!.maximize();
  });
  ipcMain.handle('window:close', () => mainWindow!.close());

  // Forward renderer logs to main process stdout
  ipcMain.on('renderer:log', (_event: Electron.IpcMainEvent, ...args: unknown[]) => {
    console.log('[renderer]', ...args);
  });

  // Open or create a notebook
  ipcMain.handle('notebook:open', async (_event: Electron.IpcMainInvokeEvent, notebookPath: string) => {
    console.log('[ipc] notebook:open called, path:', notebookPath);
    if (manager!.notebookPath) {
      console.log('[ipc] closing existing notebook:', manager!.notebookPath);
      manager!.close();
    }

    // Handle default notebook path
    if (notebookPath === '__default__') {
      const dropbox = path.join(os.homedir(), 'Dropbox', 'Notes');
      notebookPath = path.join(dropbox, 'My Notebook.notebound');
    }

    const state = manager!.open(notebookPath, _deviceId!, _userDataPath!);
    console.log('[ipc] notebook:open result -- notebooks:', state?.notebooks?.length,
      'sections:', state?.notebooks?.[0]?.sections?.length,
      'ui:', JSON.stringify(state?.ui));

    // Set up state change listener to push to renderer
    manager!.onStateChange((newState: AppState) => {
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

  // Apply an operation from the renderer (fire-and-forget — no response sent back)
  ipcMain.on('notebook:apply-op', (_event: Electron.IpcMainEvent, op: Op) => {
    if (manager) manager.applyOp(op);
  });

  // Apply multiple ops at once (fire-and-forget)
  ipcMain.on('notebook:apply-ops', (_event: Electron.IpcMainEvent, ops: Op[]) => {
    if (!manager) return;
    for (const op of ops) manager.applyOp(op);
  });

  // Flush WAL (fire-and-forget)
  ipcMain.on('notebook:flush', () => {
    if (manager) manager.flush();
  });

  // Store a blob from raw buffer + metadata, returns hash
  ipcMain.handle('notebook:save-blob', async (_event: Electron.IpcMainInvokeEvent, data: ArrayBuffer, meta: BlobMeta) => {
    if (!manager || !manager.blobsDir) return null;
    const buffer = Buffer.from(data);
    const blobMeta: BlobMeta = { mimeType: meta?.mimeType || 'application/octet-stream', ...meta };
    return blobs.store(buffer, manager.blobsDir, blobMeta);
  });

  // Get a blob as data URL by hash
  ipcMain.handle('notebook:get-blob', async (_event: Electron.IpcMainInvokeEvent, hash: string) => {
    if (!manager || !manager.blobsDir) return null;
    const data = blobs.get(hash, manager.blobsDir);
    if (!data) return null;
    const meta = blobs.getMeta(hash, manager.blobsDir);
    const mimeType = meta?.mimeType || 'application/octet-stream';
    return `data:${mimeType};base64,${data.toString('base64')}`;
  });

  // Show open dialog to pick a .notebound directory
  ipcMain.handle('notebook:pick-directory', async () => {
    const result = await dialog.showOpenDialog(mainWindow!, {
      properties: ['openDirectory'],
      title: 'Open Notebook',
      buttonLabel: 'Open Notebook',
    });
    if (result.canceled || result.filePaths.length === 0) return null;
    return result.filePaths[0];
  });

  // Show save dialog to create a new .notebound directory
  ipcMain.handle('notebook:pick-save-path', async () => {
    const result = await dialog.showSaveDialog(mainWindow!, {
      title: 'Create New Notebook',
      defaultPath: 'MyNotebook.notebound',
      buttonLabel: 'Create',
    });
    if (result.canceled) return null;
    // Ensure .notebound extension
    let p = result.filePath!;
    if (!p.endsWith('.notebound')) p += '.notebound';
    return p;
  });

  // Get the notebook path (for display)
  ipcMain.handle('notebook:get-path', async () => {
    return manager ? manager.notebookPath : null;
  });

  // Fetch a remote image URL and return as buffer (bypasses CORS)
  ipcMain.handle('notebook:fetch-image', async (_event: Electron.IpcMainInvokeEvent, url: string) => {
    const resp = await electronNet.fetch(url);
    if (!resp.ok) throw new Error('fetch failed: ' + resp.status);
    const contentType = resp.headers.get('content-type') || 'image/png';
    const buffer = Buffer.from(await resp.arrayBuffer());
    return { buffer, contentType, size: buffer.length };
  });

  // Save notebook path to config (fire-and-forget)
  ipcMain.on('notebook:save-config', (_event: Electron.IpcMainEvent, info: { path: string; name: string } | string) => {
    const notebookPath = typeof info === 'string' ? info : info.path;
    const name = (typeof info === 'object' && info.name) || path.basename(notebookPath, '.notebound');
    console.log('[ipc] save-config -- path:', notebookPath, 'name:', name);
    config.notebookPath = notebookPath;
    const recents = Array.isArray(config.recentNotebooks) ? config.recentNotebooks : [];
    const entry = { path: notebookPath, name, lastOpened: Date.now() };
    const filtered = recents.filter(r => r.path !== notebookPath);
    filtered.unshift(entry);
    config.recentNotebooks = filtered.slice(0, 10);
    writeConfig();
    console.log('[ipc] config written, notebookPath now:', config.notebookPath);
  });

  // -- MCP socket server for display panel --
  function startMcpSocket(): string {
    if (_mcpSocketServer) return _mcpSocketPath!;

    const runDir = process.env.XDG_RUNTIME_DIR
      ? path.join(process.env.XDG_RUNTIME_DIR, 'notebound')
      : path.join(os.homedir(), '.cache', 'notebound', 'run');
    fs.mkdirSync(runDir, { recursive: true });

    _mcpSocketPath = path.join(runDir, `display-${process.pid}.sock`);
    // Clean up stale socket
    try { fs.unlinkSync(_mcpSocketPath); } catch {}

    _mcpSocketServer = net.createServer((conn: net.Socket) => {
      let data = '';
      conn.on('error', () => {}); // ignore EPIPE / connection reset
      conn.on('data', (chunk: Buffer) => { data += chunk.toString(); });
      conn.on('end', () => {
        try {
          const cmd = JSON.parse(data.trim());
          console.log('[mcp-socket] received:', cmd);
          if (mainWindow && !mainWindow.isDestroyed()) {
            mainWindow.webContents.send('display:command', cmd);
          }
        } catch (err) {
          console.error('[mcp-socket] parse error:', (err as Error).message);
        }
        try { conn.end(); } catch {}
      });
    });

    _mcpSocketServer.listen(_mcpSocketPath, () => {
      console.log('[mcp-socket] listening on', _mcpSocketPath);
    });

    return _mcpSocketPath;
  }

  function stopMcpSocket(): void {
    if (_mcpSocketServer) {
      _mcpSocketServer.close();
      _mcpSocketServer = null;
    }
    if (_mcpSocketPath) {
      try { fs.unlinkSync(_mcpSocketPath); } catch {}
      _mcpSocketPath = null;
    }
  }

  // -- Claude agent IPC --
  ipcMain.handle('claude:start', async (_event: Electron.IpcMainInvokeEvent, pageId: string) => {
    // Kill existing session
    if (_claudeAgent) { _claudeAgent.kill(); _claudeAgent = null; }
    if (_claudeVfsPath) { cleanupVFS(_claudeVfsPath); _claudeVfsPath = null; }
    _claudePageMap = null;

    if (!manager || !manager.state) throw new Error('No notebook open');

    const { sessionId, basePath, pageMap } = createVFS(manager.state, manager.notebookPath!);
    _claudeVfsPath = basePath;
    _claudePageMap = pageMap;
    const cwd = (pageId && pageMap.get(pageId)) || basePath;

    // Start MCP socket server and build config
    const socketPath = startMcpSocket();
    const mcpConfig = {
      mcpServers: {
        'notebound-display': {
          command: 'bun',
          args: ['run', path.join(app.getAppPath(), 'src', 'mcp-server.ts')],
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

  ipcMain.handle('claude:message', async (_event: Electron.IpcMainInvokeEvent, text: string) => {
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
  ipcMain.handle('shell:open-external', async (_event: Electron.IpcMainInvokeEvent, url: string) => {
    if (typeof url === 'string' && (url.startsWith('http://') || url.startsWith('https://'))) {
      shell.openExternal(url);
    }
  });

  // -- Web publish --

  function execAsync(cmd: string, opts: { cwd: string }): Promise<string> {
    return new Promise((resolve, reject) => {
      exec(cmd, opts, (err, stdout, stderr) => {
        if (err) { (err as NodeJS.ErrnoException & { stderr?: string }).stderr = stderr; reject(err); }
        else resolve(stdout);
      });
    });
  }

  interface PublishConfig {
    remote: string;
    exportDir: string;
  }

  function getPublishConfig(): PublishConfig | null {
    if (!manager || !manager.notebookPath) return null;
    const metaPath = path.join(manager.notebookPath, 'meta.json');
    const meta: NotebookMeta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
    return meta.publish || null;
  }

  function ghPagesUrl(remote: string): string | null {
    const match = remote.match(/github\.com[:/]([^/]+)\/([^/.]+)/);
    if (match) return `https://${match[1]}.github.io/${match[2]}/`;
    return null;
  }

  async function ensureGitRepo(exportDir: string, remote: string): Promise<void> {
    const gitDir = path.join(exportDir, '.git');
    if (!fs.existsSync(gitDir)) {
      fs.mkdirSync(exportDir, { recursive: true });
      await execAsync('git init', { cwd: exportDir });
      await execAsync(`git remote add origin ${remote}`, { cwd: exportDir });
      // Try to pull existing content
      try { await execAsync('git fetch origin && git checkout -b main origin/main', { cwd: exportDir }); }
      catch { /* empty repo, first push */ }
    }
  }

  ipcMain.handle('web:publish', async () => {
    if (!manager || !manager.notebookPath) throw new Error('No notebook open');
    const pub = getPublishConfig();
    if (!pub) throw new Error('No publish config in meta.json. Add a "publish" field with "remote" and "exportDir".');
    const { remote, exportDir } = pub;

    await ensureGitRepo(exportDir, remote);

    // Pull before export to avoid conflicts
    try { await execAsync('git pull --rebase origin main', { cwd: exportDir }); }
    catch { /* first push or no remote branch yet */ }

    // Export in child process to avoid blocking the UI
    await new Promise<void>((resolve, reject) => {
      const script = path.join(app.getAppPath(), 'scripts', 'export-web.ts');
      const child = spawn('bun', ['run', script, manager!.notebookPath!, exportDir], { stdio: ['ignore', 'pipe', 'pipe'] });
      let stderr = '';
      child.stderr?.on('data', (chunk: Buffer) => { stderr += chunk.toString(); });
      child.on('exit', code => {
        if (code === 0) return resolve();
        console.error('[web:publish] export-web failed (exit ' + code + '):\n' + stderr);
        reject(new Error('Export failed (exit ' + code + '): ' + stderr.trim()));
      });
      child.on('error', (err) => {
        console.error('[web:publish] export-web error:', err);
        reject(err);
      });
    });

    await execAsync('git add -A', { cwd: exportDir });
    await execAsync('git commit -m "update" --allow-empty', { cwd: exportDir });
    await execAsync('git push -u origin main', { cwd: exportDir });

    return { url: ghPagesUrl(remote) };
  });

  ipcMain.handle('web:open-dir', async () => {
    const pub = getPublishConfig();
    if (!pub) throw new Error('No publish config');
    shell.openPath(pub.exportDir);
  });

  ipcMain.handle('web:open-site', async () => {
    const pub = getPublishConfig();
    if (!pub) throw new Error('No publish config');
    const url = ghPagesUrl(pub.remote);
    if (url) shell.openExternal(url);
    return { url };
  });

  ipcMain.handle('web:get-publish-url', async () => {
    const pub = getPublishConfig();
    return pub?.remote ? ghPagesUrl(pub.remote) : null;
  });

  // Save UI navigation state per notebook path (fire-and-forget)
  ipcMain.on('notebook:save-ui-state', (_event: Electron.IpcMainEvent, notebookPath: string, uiState: UiPosition) => {
    if (!config.uiPositions) config.uiPositions = {};
    config.uiPositions[notebookPath] = uiState;
    debouncedWriteConfig();
  });

  // Save per-page view state (pan/zoom) to local config (fire-and-forget)
  ipcMain.on('notebook:save-page-view', (_event: Electron.IpcMainEvent, notebookPath: string, pageId: string, panX: number, panY: number, zoom: number) => {
    if (!config.pageViews) config.pageViews = {};
    if (!config.pageViews[notebookPath]) config.pageViews[notebookPath] = {};
    const existing: PageViewConfig = config.pageViews[notebookPath][pageId] || {};
    config.pageViews[notebookPath][pageId] = { ...existing, panX, panY, zoom };
    debouncedWriteConfig();
  });

  // Save per-page caret position to local config (fire-and-forget)
  ipcMain.on('notebook:save-page-caret', (_event: Electron.IpcMainEvent, notebookPath: string, pageId: string, caretBlockId: string, caretOffset: number) => {
    if (!config.pageViews) config.pageViews = {};
    if (!config.pageViews[notebookPath]) config.pageViews[notebookPath] = {};
    const existing: PageViewConfig = config.pageViews[notebookPath][pageId] || {};
    config.pageViews[notebookPath][pageId] = { ...existing, caretBlockId, caretOffset };
    debouncedWriteConfig();
  });

  // Get config (for renderer to check if first-run)
  ipcMain.handle('notebook:get-config', async () => {
    console.log('[ipc] get-config -- notebookPath:', config.notebookPath, 'recents:', config.recentNotebooks?.length ?? 0);
    return config;
  });
}

// Open default notebook eagerly from main process (no IPC round-trip)
function openDefault(win: BrowserWindow, notebookPath: string, deviceId: string, userDataPath: string): void {
  mainWindow = win;
  _deviceId = deviceId;
  _userDataPath = userDataPath;
  console.log('[notebound] openDefault called, path:', notebookPath, 'manager:', !!manager);
  try {
    if (!manager) manager = new NotebookManager();
    if (manager.notebookPath) manager.close();
    manager.open(notebookPath, deviceId, userDataPath);
    // Persist path after every successful open -- repairs config if it was cleared by a prior error
    config.notebookPath = notebookPath;
    writeConfig();
    console.log('[notebound] notebook opened, state notebooks:', manager.state?.notebooks?.length);
  } catch (err) {
    console.error('[notebound] openDefault failed:', (err as Error).message);
    // Do NOT touch config -- the path on disk is still valid.
    // Just show the welcome screen and let the user decide.
    // Tell renderer to stop waiting and show welcome screen
    const notify = (): void => {
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

  manager.onStateChange((newState: AppState) => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('notebook:state-changed', newState);
    }
  });

  // Push initial state -- handle both "still loading" and "already loaded" cases
  const pushInitialState = (): void => {
    if (manager!.state && win && !win.isDestroyed()) {
      win.webContents.send('notebook:state-changed', manager!.state);
    }
  };
  if (win.webContents.isLoading()) {
    win.webContents.once('did-finish-load', pushInitialState);
  } else {
    pushInitialState();
  }
}

function closeNotebook(): void {
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

export { setupIPC, closeNotebook, openDefault };
