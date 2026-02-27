import { signal } from '@preact/signals';

const STORAGE_KEY = 'onenote_v4';
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

// ─── Persistence ─────────────────────────────────────────

function load() {
  try { const r = localStorage.getItem(STORAGE_KEY); return r ? JSON.parse(r) : null; } catch { return null; }
}

let _saveTimer = null;
function scheduleSave() {
  clearTimeout(_saveTimer);
  _saveTimer = setTimeout(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(appState.value)); } catch (e) { console.warn('Save failed', e); }
  }, 300);
}

// ─── State ───────────────────────────────────────────────

function defaultState() {
  const nb = mkNotebook();
  return { notebooks: [nb], ui: { notebookId: nb.id, sectionId: nb.sections[0].id, pageId: nb.sections[0].pages[0].id } };
}

export const appState = signal(load() || defaultState());

// Immutable update — triggers Preact re-render
function update(fn) {
  const draft = JSON.parse(JSON.stringify(appState.value));
  fn(draft);
  appState.value = draft;
  scheduleSave();
}

// Silent update — mutate in-place, just save (no re-render)
function silent(fn) {
  fn(appState.value);
  scheduleSave();
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

// ─── Navigation ──────────────────────────────────────────

export function setActiveNotebook(id) {
  update(s => {
    s.ui.notebookId = id;
    const nb = s.notebooks.find(n => n.id === id);
    s.ui.sectionId = nb?.sections[0]?.id ?? null;
    s.ui.pageId = nb?.sections[0]?.pages[0]?.id ?? null;
  });
}

export function setActiveSection(id) {
  update(s => {
    s.ui.sectionId = id;
    const nb = s.notebooks.find(n => n.id === s.ui.notebookId);
    const sec = nb?.sections.find(sec => sec.id === id);
    s.ui.pageId = sec?.pages[0]?.id ?? null;
  });
}

export function setActivePage(id) {
  update(s => { s.ui.pageId = id; });
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
}

export function renameNotebook(id, title) {
  update(s => { const nb = s.notebooks.find(n => n.id === id); if (nb) nb.title = title; });
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
}

export function reorderNotebooks(ids) {
  update(s => { s.notebooks.sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id)); });
}

// ─── Section CRUD ────────────────────────────────────────

export function addSection(nbId) {
  const sec = mkSection('New Section');
  update(s => {
    const nb = s.notebooks.find(n => n.id === nbId);
    if (!nb) return;
    nb.sections.push(sec);
    s.ui.sectionId = sec.id;
    s.ui.pageId = sec.pages[0].id;
  });
}

export function renameSection(nbId, secId, title) {
  update(s => {
    const sec = s.notebooks.find(n => n.id === nbId)?.sections.find(s => s.id === secId);
    if (sec) sec.title = title;
  });
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
}

export function reorderSections(nbId, ids) {
  update(s => {
    const nb = s.notebooks.find(n => n.id === nbId);
    if (nb) nb.sections.sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id));
  });
}

// ─── Page CRUD ───────────────────────────────────────────

export function addPage(parentPageId = null) {
  const pg = mkPage('Untitled Page');
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
}

export function renamePage(pageId, title) {
  update(s => {
    const nb = s.notebooks.find(n => n.id === s.ui.notebookId);
    const sec = nb?.sections.find(sec => sec.id === s.ui.sectionId);
    if (!sec) return;
    const pg = findInTree(sec.pages, pageId);
    if (pg) pg.title = title;
  });
}

export function deletePage(pageId) {
  update(s => {
    const nb = s.notebooks.find(n => n.id === s.ui.notebookId);
    const sec = nb?.sections.find(sec => sec.id === s.ui.sectionId);
    if (!sec) return;
    sec.pages = removeFromTree(sec.pages, pageId);
    if (s.ui.pageId === pageId) s.ui.pageId = sec.pages[0]?.id ?? null;
  });
}

export function movePage(pageId, targetSecId) {
  update(s => {
    const nb = s.notebooks.find(n => n.id === s.ui.notebookId);
    if (!nb) return;
    let pg = null;
    for (const sec of nb.sections) {
      const found = findInTree(sec.pages, pageId);
      if (found) { pg = JSON.parse(JSON.stringify(found)); sec.pages = removeFromTree(sec.pages, pageId); break; }
    }
    if (!pg) return;
    const target = nb.sections.find(sec => sec.id === targetSecId);
    if (target) target.pages.push(pg);
  });
}

// ─── Block CRUD ──────────────────────────────────────────

export function addBlock(x, y, w = 480, type = 'text') {
  const blk = { id: uid(), x, y, w, html: '', type };
  update(s => {
    const pg = getActivePage(s);
    if (pg) pg.blocks.push(blk);
  });
  return blk;
}

export function deleteBlock(blockId) {
  update(s => {
    const pg = getActivePage(s);
    if (pg) pg.blocks = pg.blocks.filter(b => b.id !== blockId);
  });
}

// Silent updates — block content/position changes don't re-render the sidebar
export function updateBlockHtml(blockId, html) {
  silent(s => {
    const pg = getActivePage(s);
    const blk = pg?.blocks.find(b => b.id === blockId);
    if (blk) blk.html = html;
  });
}

export function updateBlockPos(blockId, x, y) {
  silent(s => {
    const pg = getActivePage(s);
    const blk = pg?.blocks.find(b => b.id === blockId);
    if (blk) { blk.x = x; blk.y = y; }
  });
}

export function updateBlockType(blockId, type) {
  silent(s => {
    const pg = getActivePage(s);
    const blk = pg?.blocks.find(b => b.id === blockId);
    if (blk) blk.type = type;
  });
}

export function updateBlockWidth(blockId, w) {
  silent(s => {
    const pg = getActivePage(s);
    const blk = pg?.blocks.find(b => b.id === blockId);
    if (blk) blk.w = w;
  });
}

export function updatePageView(panX, panY, zoom) {
  silent(s => {
    const pg = getActivePage(s);
    if (pg) { pg.panX = panX; pg.panY = panY; pg.zoom = zoom; }
  });
}

export function updatePageTitle(pageId, title) {
  // Silent: sidebar title updates on blur only
  silent(s => {
    const nb = s.notebooks.find(n => n.id === s.ui.notebookId);
    const sec = nb?.sections.find(sec => sec.id === s.ui.sectionId);
    const pg = sec ? findInTree(sec.pages, pageId) : null;
    if (pg) pg.title = title;
  });
}

export function updatePageTitleAndRefresh(pageId, title) {
  // Called on blur — updates title AND triggers sidebar re-render
  update(s => {
    const nb = s.notebooks.find(n => n.id === s.ui.notebookId);
    const sec = nb?.sections.find(sec => sec.id === s.ui.sectionId);
    const pg = sec ? findInTree(sec.pages, pageId) : null;
    if (pg) pg.title = title;
  });
}
