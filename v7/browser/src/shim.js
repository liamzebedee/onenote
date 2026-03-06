// Browser shim — implements window.notebook API for static/read-only web app.
// Loads notebook state from notebook.json and resolves blobs via fetch.

let _stateCallback = null;
let _blobCache = new Map();

window.notebook = {
  // Config: tell store.js a notebook will load
  getConfig: async () => ({ notebookPath: 'notebook.json' }),

  // State change listener — store.js registers this at startup
  onStateChanged: (cb) => { _stateCallback = cb; },
  onOpenFailed: () => {},
  onCanvasZoom: () => {},
  offStateChanged: () => {},
  offCanvasZoom: () => {},

  // Blob resolution: fetch from blobs/<hash>, return object URL
  getBlob: async (hash) => {
    if (_blobCache.has(hash)) return _blobCache.get(hash);
    try {
      const resp = await fetch('blobs/' + hash);
      if (!resp.ok) return null;
      const blob = await resp.blob();
      const url = URL.createObjectURL(blob);
      _blobCache.set(hash, url);
      return url;
    } catch {
      return null;
    }
  },

  // Write operations — no-op for read-only
  applyOp: () => {},
  applyOps: () => {},
  flush: () => {},
  saveBlob: async () => null,
  saveConfig: () => {},
  saveUiState: () => {},
  savePageView: () => {},
  savePageCaret: () => {},

  // Navigation — not available in browser
  open: async () => null,
  getState: async () => null,
  getPath: async () => null,
  pickDirectory: async () => null,
  pickSavePath: async () => null,
  fetchImage: async () => null,

  // Open links in new tab
  openExternal: (url) => {
    if (typeof url === 'string' && (url.startsWith('http://') || url.startsWith('https://'))) {
      window.open(url, '_blank');
    }
  },
};

// Boot: fetch notebook.json and push state to store
fetch('notebook.json')
  .then(r => {
    if (!r.ok) throw new Error('Failed to load notebook.json: ' + r.status);
    return r.json();
  })
  .then(state => {
    if (_stateCallback) _stateCallback(state);
  })
  .catch(err => {
    console.error('[notebound-web] Failed to load notebook:', err);
  });
