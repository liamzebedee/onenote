// Browser shim — implements window.notebook API for static/read-only web app.
// Loads notebook state from notebook.json and resolves blobs via fetch.

import type { AppState, NotebookAPI, Page, Block, Section, Notebook } from '../../core/src/types.ts';

let _stateCallback: ((state: AppState) => void) | null = null;
let _blobCache: Map<string, string> = new Map();

window.notebook = {
  _browserShim: true,

  // Config: tell store.js a notebook will load
  getConfig: async () => ({ deviceId: 'browser', notebookPath: 'notebook.json' }),

  // State change listener — store.js registers this at startup
  onStateChanged: (cb: (state: AppState) => void) => { _stateCallback = cb; },
  onOpenFailed: () => {},
  onCanvasZoom: () => {},
  offStateChanged: () => {},
  offCanvasZoom: () => {},

  // Blob resolution: fetch from blobs/<hash>, return object URL
  getBlob: async (hash: string): Promise<string | null> => {
    if (_blobCache.has(hash)) return _blobCache.get(hash)!;
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
  fetchImage: async (_url: string) => { throw new Error('fetchImage not available in browser'); },

  // Open links in new tab
  openExternal: (url: string) => {
    if (typeof url === 'string' && (url.startsWith('http://') || url.startsWith('https://'))) {
      window.open(url, '_blank');
    }
  },
} satisfies NotebookAPI;

// Boot: fetch notebook.json and push state to store
fetch('notebook.json?v=' + Date.now())
  .then((r: Response) => {
    if (!r.ok) throw new Error('Failed to load notebook.json: ' + r.status);
    return r.json();
  })
  .then((state: AppState) => {
    // Migration: normalize default text blocks to x=0
    function migrateBlocks(pages: Page[]): void {
      for (const pg of pages) {
        for (const b of pg.blocks || []) {
          if (b.type === 'text' && b.y === 0 && (b.x === 28 || b.x === 16)) b.x = 0;
        }
        if (pg.children?.length) migrateBlocks(pg.children);
      }
    }
    for (const nb of state.notebooks || []) {
      for (const sec of nb.sections || []) migrateBlocks(sec.pages || []);
    }

    // Apply URL navigation — hash format: #!/Section/Page/?x=...&y=...
    // Also supports legacy query params: ?section=...&page=...
    let sParam: string | null = null;
    let pParam: string | null = null;
    let pHint: string | null = null;
    const hash = window.location.hash;
    if (hash.startsWith('#!/')) {
      const parts = hash.slice(3).split('?');
      const segments = parts[0].split('/').filter(Boolean).map(decodeURIComponent);
      if (segments.length >= 1) sParam = segments[0];
      if (segments.length >= 2) pParam = segments[1];
      if (parts[1]) {
        const hp = new URLSearchParams(parts[1]);
        if (hp.has('p')) pHint = hp.get('p');
      }
    } else {
      const params = new URLSearchParams(window.location.search);
      sParam = params.get('section');
      pParam = params.get('page');
    }
    if (sParam || pParam) {
      const nb = state.notebooks?.[0];
      if (nb) {
        const sec = sParam
          ? nb.sections.find((s: Section) => s.id === sParam || s.title === sParam)
          : nb.sections.find((s: Section) => s.id === state.ui?.sectionId) || nb.sections[0];
        if (sec) {
          state.ui = state.ui || { notebookId: null, sectionId: null, pageId: null };
          state.ui.sectionId = sec.id;
          if (pParam || pHint) {
            function findPage(pages: Page[]): Page | null {
              for (const p of pages) {
                if (pHint && p.id.startsWith(pHint)) return p;
                if (pParam && (p.id === pParam || p.title === pParam)) return p;
                if (p.children?.length) { const f = findPage(p.children); if (f) return f; }
              }
              return null;
            }
            const pg = findPage(sec.pages);
            if (pg) {
              state.ui.pageId = pg.id;
            }
          } else if (sec.pages?.length) {
            state.ui.pageId = sec.pages[0].id;
          }
        }
      }
    }
    if (_stateCallback) _stateCallback(state);
  })
  .catch((err: Error) => {
    console.error('[notebound-web] Failed to load notebook:', err);
  });
