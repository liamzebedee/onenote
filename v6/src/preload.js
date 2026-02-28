// Preload script — exposes notebook API to renderer via contextBridge
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('log', (...args) => ipcRenderer.send('renderer:log', ...args));

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

  // Listen for state changes from sync
  onStateChanged: (callback) => {
    ipcRenderer.on('notebook:state-changed', (event, state) => {
      callback(state);
    });
  },

  // Remove state change listener
  offStateChanged: () => {
    ipcRenderer.removeAllListeners('notebook:state-changed');
  },
});
