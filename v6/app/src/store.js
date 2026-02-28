import { signal } from '@preact/signals';

export const uid = () => crypto.randomUUID();

// ─── Default constructors ─────────────────────────────────

function mkBlock(x = 0, y = 0, w = 480) {
  return { id: uid(), x, y, w, html: '', type: 'text' };
}

function mkPage(title = 'Untitled Page') {
  const db = mkBlock(0, 0, 480);
  return { id: uid(), title, children: [], defaultBlockId: db.id, blocks: [db], panX: 0, panY: 0, zoom: 1 };
}

function mkSection(title = 'New Section') {
  return { id: uid(), title, pages: [mkPage()] };
}

function mkNotebook(title = 'My Notebook') {
  const sec = mkSection();
  return { id: uid(), title, sections: [sec] };
}

// ─── IPC layer ───────────────────────────────────────────

const hasIPC = typeof window !== 'undefined' && window.notebook;

function sendOp(op) {
  if (hasIPC) window.notebook.applyOp(op);
}

function sendOps(ops) {
  if (hasIPC && ops.length) window.notebook.applyOps(ops);
}

// ─── State ───────────────────────────────────────────────

function defaultState() {
  const nb = mkNotebook();
  return { notebooks: [nb], ui: { notebookId: nb.id, sectionId: nb.sections[0].id, pageId: nb.sections[0].pages[0].id } };
}

export const appState = signal(defaultState());
export const connected = signal(false);
export const showSwitcher = signal(false);
export const recentNotebooks = signal([]);

export function toggleSwitcher() { showSwitcher.value = !showSwitcher.value; }
export function closeSwitcher() { showSwitcher.value = false; }

// Load recents from config on init
if (hasIPC) {
  window.notebook.getConfig().then(cfg => {
    if (Array.isArray(cfg.recentNotebooks)) recentNotebooks.value = cfg.recentNotebooks;
  });
}

// Immutable update — triggers Preact re-render
function update(fn) {
  const draft = structuredClone(appState.value);
  fn(draft);
  appState.value = draft;
}

// Silent update — mutate in-place (no re-render)
function silent(fn) {
  fn(appState.value);
}

// ─── Helpers ─────────────────────────────────────────────

function findInTree(pages, id) {
  for (const p of pages) {
    if (p.id === id) return p;
    if (p.children?.length) { const f = findInTree(p.children, id); if (f) return f; }
  }
  return null;
}

function removeFromTree(pages, id) {
  return pages.filter(p => p.id !== id).map(p => ({ ...p, children: removeFromTree(p.children ?? [], id) }));
}

export function getActivePage(s = appState.value) {
  const { ui, notebooks } = s;
  const nb = notebooks.find(n => n.id === ui.notebookId);
  const sec = nb?.sections.find(sec => sec.id === ui.sectionId);
  return sec ? findInTree(sec.pages, ui.pageId) : null;
}

export { findInTree, removeFromTree };

// ─── UI state persistence ────────────────────────────────

let _notebookPath = null;
let _uiSaveTimer = null;

function persistUiState() {
  if (!hasIPC || !_notebookPath) return;
  clearTimeout(_uiSaveTimer);
  _uiSaveTimer = setTimeout(() => {
    const { ui } = appState.value;
    window.notebook.saveUiState(_notebookPath, {
      sectionId: ui.sectionId,
      pageId: ui.pageId,
    });
  }, 500);
}

// ─── Navigation ──────────────────────────────────────────

export function setActiveNotebook(id) {
  update(s => {
    s.ui.notebookId = id;
    const nb = s.notebooks.find(n => n.id === id);
    s.ui.sectionId = nb?.sections[0]?.id ?? null;
    s.ui.pageId = nb?.sections[0]?.pages[0]?.id ?? null;
  });
  persistUiState();
}

export function setActiveSection(id) {
  update(s => {
    s.ui.sectionId = id;
    const nb = s.notebooks.find(n => n.id === s.ui.notebookId);
    const sec = nb?.sections.find(sec => sec.id === id);
    s.ui.pageId = sec?.pages[0]?.id ?? null;
  });
  persistUiState();
}

export function setActivePage(id) {
  update(s => { s.ui.pageId = id; });
  persistUiState();
}

// ─── Notebook CRUD ───────────────────────────────────────

export function addNotebook() {
  const nb = mkNotebook('New Notebook');
  update(s => {
    s.notebooks.push(nb);
    s.ui.notebookId = nb.id;
    s.ui.sectionId = nb.sections[0].id;
    s.ui.pageId = nb.sections[0].pages[0].id;
  });
  const sec = nb.sections[0];
  const page = sec.pages[0];
  sendOps([
    { type: 'notebook-add', notebookId: nb.id, title: nb.title, sections: [] },
    { type: 'section-add', notebookId: nb.id, sectionId: sec.id, title: sec.title, pages: [] },
    { type: 'page-add', sectionId: sec.id, pageId: page.id, title: page.title, defaultBlockId: page.defaultBlockId, blocks: page.blocks },
  ]);
}

export function renameNotebook(id, title) {
  update(s => { const nb = s.notebooks.find(n => n.id === id); if (nb) nb.title = title; });
  sendOp({ type: 'notebook-rename', notebookId: id, title });
}

export function deleteNotebook(id) {
  update(s => {
    s.notebooks = s.notebooks.filter(n => n.id !== id);
    if (s.ui.notebookId === id) {
      const nb = s.notebooks[0];
      s.ui.notebookId = nb?.id ?? null;
      s.ui.sectionId = nb?.sections[0]?.id ?? null;
      s.ui.pageId = nb?.sections[0]?.pages[0]?.id ?? null;
    }
  });
  sendOp({ type: 'notebook-delete', notebookId: id });
}

export function reorderNotebooks(ids) {
  update(s => { s.notebooks.sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id)); });
  sendOp({ type: 'notebook-reorder', notebookIds: ids });
}

// ─── Section CRUD ────────────────────────────────────────

export function addSection(nbId) {
  const sec = mkSection('New Section');
  const page = sec.pages[0];
  update(s => {
    const nb = s.notebooks.find(n => n.id === nbId);
    if (!nb) return;
    nb.sections.push(sec);
    s.ui.sectionId = sec.id;
    s.ui.pageId = page.id;
  });
  sendOps([
    { type: 'section-add', notebookId: nbId, sectionId: sec.id, title: sec.title, pages: [] },
    { type: 'page-add', sectionId: sec.id, pageId: page.id, title: page.title, defaultBlockId: page.defaultBlockId, blocks: page.blocks },
  ]);
}

export function renameSection(nbId, secId, title) {
  update(s => {
    const sec = s.notebooks.find(n => n.id === nbId)?.sections.find(s => s.id === secId);
    if (sec) sec.title = title;
  });
  sendOp({ type: 'section-rename', sectionId: secId, title });
}

export function deleteSection(nbId, secId) {
  update(s => {
    const nb = s.notebooks.find(n => n.id === nbId);
    if (!nb) return;
    nb.sections = nb.sections.filter(sec => sec.id !== secId);
    if (s.ui.sectionId === secId) {
      const first = nb.sections[0];
      s.ui.sectionId = first?.id ?? null;
      s.ui.pageId = first?.pages[0]?.id ?? null;
    }
  });
  sendOp({ type: 'section-delete', notebookId: nbId, sectionId: secId });
}

export function reorderSections(nbId, ids) {
  update(s => {
    const nb = s.notebooks.find(n => n.id === nbId);
    if (nb) nb.sections.sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id));
  });
  sendOp({ type: 'section-reorder', notebookId: nbId, sectionIds: ids });
}

// ─── Page CRUD ───────────────────────────────────────────

export function addPage(parentPageId = null) {
  const pg = mkPage('Untitled Page');
  const secId = appState.value.ui.sectionId;
  update(s => {
    const nb = s.notebooks.find(n => n.id === s.ui.notebookId);
    const sec = nb?.sections.find(sec => sec.id === s.ui.sectionId);
    if (!sec) return;
    if (parentPageId) {
      const parent = findInTree(sec.pages, parentPageId);
      if (parent) { parent.children = parent.children ?? []; parent.children.push(pg); }
    } else {
      sec.pages.push(pg);
    }
    s.ui.pageId = pg.id;
  });
  sendOp({ type: 'page-add', sectionId: secId, pageId: pg.id, title: pg.title, parentPageId, defaultBlockId: pg.defaultBlockId, blocks: pg.blocks });
}

export function renamePage(pageId, title) {
  update(s => {
    const nb = s.notebooks.find(n => n.id === s.ui.notebookId);
    const sec = nb?.sections.find(sec => sec.id === s.ui.sectionId);
    if (!sec) return;
    const pg = findInTree(sec.pages, pageId);
    if (pg) pg.title = title;
  });
  sendOp({ type: 'page-rename', pageId, title });
}

export function deletePage(pageId) {
  update(s => {
    const nb = s.notebooks.find(n => n.id === s.ui.notebookId);
    const sec = nb?.sections.find(sec => sec.id === s.ui.sectionId);
    if (!sec) return;
    sec.pages = removeFromTree(sec.pages, pageId);
    if (s.ui.pageId === pageId) s.ui.pageId = sec.pages[0]?.id ?? null;
  });
  sendOp({ type: 'page-delete', pageId });
}

export function movePage(pageId, targetSecId) {
  update(s => {
    const nb = s.notebooks.find(n => n.id === s.ui.notebookId);
    if (!nb) return;
    let pg = null;
    for (const sec of nb.sections) {
      const found = findInTree(sec.pages, pageId);
      if (found) { pg = structuredClone(found); sec.pages = removeFromTree(sec.pages, pageId); break; }
    }
    if (!pg) return;
    const target = nb.sections.find(sec => sec.id === targetSecId);
    if (target) target.pages.push(pg);
  });
  sendOp({ type: 'page-move', pageId, targetSectionId: targetSecId });
}

// ─── Block CRUD ──────────────────────────────────────────

export function addBlock(x, y, w = 480, type = 'text', extra = {}) {
  const blk = { id: uid(), x, y, w, html: '', type, ...extra };
  const pageId = appState.value.ui.pageId;
  update(s => {
    const pg = getActivePage(s);
    if (pg) pg.blocks.push(blk);
  });
  sendOp({ type: 'block-add', pageId, block: blk });
  return blk;
}

export function deleteBlock(blockId) {
  const pageId = appState.value.ui.pageId;
  update(s => {
    const pg = getActivePage(s);
    if (pg) pg.blocks = pg.blocks.filter(b => b.id !== blockId);
  });
  sendOp({ type: 'block-delete', pageId, blockId });
}

// Silent updates — block content/position changes don't re-render the sidebar
export function updateBlockHtmlLocal(blockId, html) {
  silent(s => {
    const pg = getActivePage(s);
    const blk = pg?.blocks.find(b => b.id === blockId);
    if (blk) blk.html = html;
  });
}

export function updateBlockTextDiff(blockId, diffs) {
  const pageId = appState.value.ui.pageId;
  if (hasIPC && diffs.length > 0) {
    window.notebook.applyOp({ type: 'block-text-diff', pageId, blockId, diffs });
  }
}

export function updateBlockHtml(blockId, html) {
  const pageId = appState.value.ui.pageId;
  silent(s => {
    const pg = getActivePage(s);
    const blk = pg?.blocks.find(b => b.id === blockId);
    if (blk) blk.html = html;
  });
  sendOp({ type: 'block-update-html', pageId, blockId, html });
}

export function updateBlockPos(blockId, x, y) {
  const pageId = appState.value.ui.pageId;
  silent(s => {
    const pg = getActivePage(s);
    const blk = pg?.blocks.find(b => b.id === blockId);
    if (blk) { blk.x = x; blk.y = y; }
  });
  sendOp({ type: 'block-move', pageId, blockId, x, y });
}

export function updateBlockType(blockId, type) {
  const pageId = appState.value.ui.pageId;
  silent(s => {
    const pg = getActivePage(s);
    const blk = pg?.blocks.find(b => b.id === blockId);
    if (blk) blk.type = type;
  });
  sendOp({ type: 'block-update-type', pageId, blockId, blockType: type });
}

export function updateBlockWidth(blockId, w) {
  const pageId = appState.value.ui.pageId;
  silent(s => {
    const pg = getActivePage(s);
    const blk = pg?.blocks.find(b => b.id === blockId);
    if (blk) blk.w = w;
  });
  sendOp({ type: 'block-resize', pageId, blockId, w });
}

export function updateBlockSrc(blockId, src) {
  const pageId = appState.value.ui.pageId;
  update(s => {
    const pg = getActivePage(s);
    const blk = pg?.blocks.find(b => b.id === blockId);
    if (blk) blk.src = src;
  });
  sendOp({ type: 'block-update-src', pageId, blockId, src });
}

export function updatePageView(panX, panY, zoom) {
  const pageId = appState.value.ui.pageId;
  silent(s => {
    const pg = getActivePage(s);
    if (pg) { pg.panX = panX; pg.panY = panY; pg.zoom = zoom; }
  });
  sendOp({ type: 'page-view', pageId, panX, panY, zoom });
}

export function updatePageTitle(pageId, title) {
  // Silent: sidebar title updates on blur only
  silent(s => {
    const nb = s.notebooks.find(n => n.id === s.ui.notebookId);
    const sec = nb?.sections.find(sec => sec.id === s.ui.sectionId);
    const pg = sec ? findInTree(sec.pages, pageId) : null;
    if (pg) pg.title = title;
  });
  // Don't send op — wait for blur (updatePageTitleAndRefresh)
}

export function updatePageTitleAndRefresh(pageId, title) {
  update(s => {
    const nb = s.notebooks.find(n => n.id === s.ui.notebookId);
    const sec = nb?.sections.find(sec => sec.id === s.ui.sectionId);
    const pg = sec ? findInTree(sec.pages, pageId) : null;
    if (pg) pg.title = title;
  });
  sendOp({ type: 'page-rename', pageId, title });
}

// ─── Notebook open/create via IPC ────────────────────────

export async function openNotebook(notebookPath) {
  if (!hasIPC) return;
  const state = await window.notebook.open(notebookPath);
  if (state) {
    _notebookPath = notebookPath;

    // Try to restore saved UI position
    const cfg = await window.notebook.getConfig();
    const saved = cfg.uiPositions?.[notebookPath];
    const nb = state.notebooks[0];

    if (saved && nb) {
      // Validate saved IDs still exist in the state
      const sec = nb.sections.find(s => s.id === saved.sectionId);
      const page = sec ? findInTree(sec.pages, saved.pageId) : null;
      state.ui = {
        notebookId: nb.id,
        sectionId: sec?.id ?? nb.sections[0]?.id ?? null,
        pageId: page?.id ?? sec?.pages[0]?.id ?? null,
      };
    } else if (!state.ui) {
      state.ui = {
        notebookId: nb?.id ?? null,
        sectionId: nb?.sections[0]?.id ?? null,
        pageId: nb?.sections[0]?.pages[0]?.id ?? null,
      };
    }

    appState.value = state;
    connected.value = true;
    closeSwitcher();
    // Persist with notebook title for recents
    const title = nb?.title || 'Untitled';
    window.notebook.saveConfig({ path: notebookPath, name: title });
    // Refresh recents
    if (Array.isArray(cfg.recentNotebooks)) recentNotebooks.value = cfg.recentNotebooks;
  }
}

export async function pickAndOpenNotebook() {
  if (!hasIPC) return;
  const dir = await window.notebook.pickDirectory();
  if (dir) await openNotebook(dir);
}

export async function createAndOpenNotebook() {
  if (!hasIPC) return;
  const dir = await window.notebook.pickSavePath();
  if (dir) await openNotebook(dir);
}

// ─── Listen for state changes (initial push + remote sync) ──

if (hasIPC) {
  window.notebook.onStateChanged(async (state) => {
    if (!state || !state.notebooks) return;

    // Check if current UI IDs are valid in the incoming state
    const ui = appState.value.ui;
    const nbExists = state.notebooks.find(n => n.id === ui.notebookId);
    if (nbExists) {
      // UI IDs are still valid — preserve navigation
      state.ui = ui;
    } else {
      // First load — try to restore saved UI position
      const nb = state.notebooks[0];
      let restored = false;
      if (!_notebookPath) {
        try {
          const cfg = await window.notebook.getConfig();
          if (cfg.notebookPath) {
            _notebookPath = cfg.notebookPath;
            const saved = cfg.uiPositions?.[cfg.notebookPath];
            if (saved && nb) {
              const sec = nb.sections.find(s => s.id === saved.sectionId);
              const page = sec ? findInTree(sec.pages, saved.pageId) : null;
              state.ui = {
                notebookId: nb.id,
                sectionId: sec?.id ?? nb.sections[0]?.id ?? null,
                pageId: page?.id ?? sec?.pages[0]?.id ?? null,
              };
              restored = true;
            }
          }
        } catch {}
      }
      if (!restored) {
        state.ui = {
          notebookId: nb?.id ?? null,
          sectionId: nb?.sections[0]?.id ?? null,
          pageId: nb?.sections[0]?.pages[0]?.id ?? null,
        };
      }
    }
    appState.value = { ...state };
    connected.value = true;
  });
}
