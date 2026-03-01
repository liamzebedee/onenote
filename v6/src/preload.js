// Preload script — exposes notebook API to renderer via contextBridge
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('log', (...args) => {
  ipcRenderer.send('renderer:log', ...args);
});

contextBridge.exposeInMainWorld('notebook', {
  // Open a .notebound directory, returns materialized state
  open: (path) => ipcRenderer.invoke('notebook:open', path),

  // Get current state
  getState: () => ipcRenderer.invoke('notebook:get-state'),

  // Apply a single operation
  applyOp: (op) => ipcRenderer.invoke('notebook:apply-op', op),

  // Apply multiple operations at once
  applyOps: (ops) => ipcRenderer.invoke('notebook:apply-ops', ops),

  // Flush WAL (seal buffer)
  flush: () => ipcRenderer.invoke('notebook:flush'),

  // Store an attachment blob from ArrayBuffer + metadata, returns SHA-256 hash
  saveBlob: (buffer, meta) => ipcRenderer.invoke('notebook:save-blob', buffer, meta),

  // Get blob as data URL by hash
  getBlob: (hash) => ipcRenderer.invoke('notebook:get-blob', hash),

  // File dialogs
  pickDirectory: () => ipcRenderer.invoke('notebook:pick-directory'),
  pickSavePath: () => ipcRenderer.invoke('notebook:pick-save-path'),

  // Get notebook path
  getPath: () => ipcRenderer.invoke('notebook:get-path'),

  // Fetch remote image (bypasses CORS)
  fetchImage: (url) => ipcRenderer.invoke('notebook:fetch-image', url),

  // Config (notebook path + window state)
  saveConfig: (info) => ipcRenderer.invoke('notebook:save-config', info),
  getConfig: () => ipcRenderer.invoke('notebook:get-config'),

  // Save/restore UI navigation state per notebook
  saveUiState: (notebookPath, uiState) => ipcRenderer.invoke('notebook:save-ui-state', notebookPath, uiState),

  // Save per-page pan/zoom to local config (device-local, not synced)
  savePageView: (notebookPath, pageId, panX, panY, zoom) => ipcRenderer.invoke('notebook:save-page-view', notebookPath, pageId, panX, panY, zoom),

  // Save per-page caret position to local config
  savePageCaret: (notebookPath, pageId, caretBlockId, caretOffset) => ipcRenderer.invoke('notebook:save-page-caret', notebookPath, pageId, caretBlockId, caretOffset),

  // Open URL in system browser
  openExternal: (url) => ipcRenderer.invoke('shell:open-external', url),

  // Canvas zoom commands from menu
  onCanvasZoom: (cb) => ipcRenderer.on('canvas:zoom', (_, dir) => cb(dir)),
  offCanvasZoom: () => ipcRenderer.removeAllListeners('canvas:zoom'),

  // Listen for state changes from sync
  onStateChanged: (callback) => {
    ipcRenderer.on('notebook:state-changed', (event, state) => {
      callback(state);
    });
  },

  // Listen for open failure (show welcome screen)
  onOpenFailed: (callback) => {
    ipcRenderer.on('notebook:open-failed', () => callback());
  },

  // Remove state change listener
  offStateChanged: () => {
    ipcRenderer.removeAllListeners('notebook:state-changed');
  },

});

contextBridge.exposeInMainWorld('windowControls', {
  minimize: () => ipcRenderer.invoke('window:minimize'),
  maximize: () => ipcRenderer.invoke('window:maximize'),
  close: () => ipcRenderer.invoke('window:close'),
});

contextBridge.exposeInMainWorld('display', {
  onCommand: (cb) => {
    ipcRenderer.on('display:command', (event, cmd) => cb(cmd));
  },
  offCommand: () => {
    ipcRenderer.removeAllListeners('display:command');
  },
});

contextBridge.exposeInMainWorld('claude', {
  start: (pageId) => ipcRenderer.invoke('claude:start', pageId),
  message: (text) => ipcRenderer.invoke('claude:message', text),
  interrupt: () => ipcRenderer.invoke('claude:interrupt'),
  stop: () => ipcRenderer.invoke('claude:stop'),
  onStream: (cb) => {
    ipcRenderer.on('claude:stream', (event, data) => cb(data));
  },
  offStream: () => {
    ipcRenderer.removeAllListeners('claude:stream');
  },
});
