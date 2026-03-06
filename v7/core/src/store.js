import { signal } from '@preact/signals';

export const uid = () => crypto.randomUUID();

// ─── Default constructors ─────────────────────────────────

function mkBlock(x = 0, y = 0, w = 480) {
  return { id: uid(), x, y, w, html: '', type: 'text' };
}

function mkPage(title = 'Untitled Page') {
  return { id: uid(), title, children: [], blocks: [], panX: 0, panY: 0, zoom: 1, createdAt: Date.now() };
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
export const initializing = signal(true); // true until we know whether a notebook will load
export const showSwitcher = signal(false);
export const recentNotebooks = signal([]);
const isDesktop = hasIPC && !window.notebook._browserShim;
function checkEditParam() {
  if (typeof window === 'undefined') return false;
  if (new URLSearchParams(window.location.search).get('edit') === 'on') return true;
  const hash = window.location.hash;
  if (hash.includes('?')) {
    if (new URLSearchParams(hash.slice(hash.indexOf('?') + 1)).get('edit') === 'on') return true;
  }
  return false;
}
export const editingEnabled = signal(
  isDesktop ? true : checkEditParam()
);
export const preloadCache = signal(new Map()); // pageId → page, for keep-alive pre-rendering

// Sync hash URL in browser mode: #!/SectionTitle/PageTitle/
function syncHashUrl() {
  if (isDesktop) return;
  const { ui, notebooks } = appState.value;
  const nb = notebooks.find(n => n.id === ui.notebookId);
  if (!nb) return;
  const sec = nb.sections.find(s => s.id === ui.sectionId);
  const page = sec ? findInTree(sec.pages, ui.pageId) : null;
  const parts = ['#!/'];
  if (sec) parts.push(encodeURIComponent(sec.title), '/');
  if (page) parts.push(encodeURIComponent(page.title), '/');
  history.replaceState(null, '', parts.join(''));
}

export function preloadPage(page) {
  if (!page || preloadCache.value.has(page.id)) return;
  const m = new Map(preloadCache.value);
  m.set(page.id, page);
  preloadCache.value = m;
}

export function preloadPages(pages) {
  const m = new Map(preloadCache.value);
  let changed = false;
  for (const page of pages) {
    if (page && !m.has(page.id)) { m.set(page.id, page); changed = true; }
  }
  if (changed) preloadCache.value = m;
}

// Returns pages worth preloading at startup: current section (all) + last visited in each other section
export function getPreloadCandidates() {
  const { ui, notebooks } = appState.value;
  const nb = notebooks.find(n => n.id === ui.notebookId);
  if (!nb) return [];
  const results = [];
  function addTree(pages) {
    for (const p of pages) {
      if (p.id !== ui.pageId) results.push(p);
      if (p.children?.length) addTree(p.children);
    }
  }
  for (const sec of nb.sections) {
    if (sec.id === ui.sectionId) {
      addTree(sec.pages);
    } else {
      const lastId = lastPagePerSection.get(sec.id);
      const pg = lastId ? findInTree(sec.pages, lastId) : sec.pages[0];
      if (pg) results.push(pg);
    }
  }
  return results;
}

export function toggleSwitcher() { showSwitcher.value = !showSwitcher.value; }
export function closeSwitcher() { showSwitcher.value = false; }

// Load recents from config on init; also determine if a notebook will be opened
const _log = (...args) => { console.log('[store]', ...args); if (window.log) window.log('[store]', ...args); };
if (hasIPC) {
  window.notebook.getConfig().then(cfg => {
    _log('init getConfig result — notebookPath:', cfg.notebookPath, 'recents:', cfg.recentNotebooks?.length ?? 0);
    if (Array.isArray(cfg.recentNotebooks)) recentNotebooks.value = cfg.recentNotebooks;
    // If there's no saved notebook path, nothing will load — stop initializing now
    if (!cfg.notebookPath) {
      _log('no notebookPath — setting initializing=false (welcome screen)');
      initializing.value = false;
    }
    // If there is a path, initializing stays true until onStateChanged fires
  });
  // If the default notebook fails to open, show welcome screen
  window.notebook.onOpenFailed(() => {
    _log('onOpenFailed fired — setting initializing=false');
    initializing.value = false;
  });
} else {
  initializing.value = false;
}

// Shallow clone — new top-level reference triggers Preact signal, fn mutates nested objects in place
function update(fn) {
  const draft = { ...appState.value };
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

function setNotebookPath(p) {
  _notebookPath = p;
  const name = p ? p.replace(/\\/g, '/').split('/').pop() : null;
  document.title = name ? `Notebound - ${name}` : 'Notebound';
}

function persistUiState() {
  if (!hasIPC || !_notebookPath) return;
  clearTimeout(_uiSaveTimer);
  _uiSaveTimer = setTimeout(() => {
    const { ui } = appState.value;
    window.notebook.saveUiState(_notebookPath, {
      sectionId: ui.sectionId,
      pageId: ui.pageId,
      lastPagePerSection: Object.fromEntries(lastPagePerSection),
    });
  }, 500);
}

// ─── Navigation ──────────────────────────────────────────

// Remember last visited page per section (in-memory, session-only)
const lastPagePerSection = new Map();

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
    // Restore last visited page in this section, fall back to first page
    const lastId = lastPagePerSection.get(id);
    const lastPage = lastId && sec ? findInTree(sec.pages, lastId) : null;
    s.ui.pageId = lastPage?.id ?? sec?.pages[0]?.id ?? null;
  });
  persistUiState();
  syncHashUrl();
}

export function setActivePage(id) {
  const { sectionId } = appState.value.ui;
  if (sectionId) lastPagePerSection.set(sectionId, id);
  update(s => { s.ui.pageId = id; });
  persistUiState();
  syncHashUrl();
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
    { type: 'page-add', sectionId: sec.id, pageId: page.id, title: page.title, blocks: page.blocks },
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
    { type: 'page-add', sectionId: sec.id, pageId: page.id, title: page.title, blocks: page.blocks },
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
  sendOp({ type: 'page-add', sectionId: secId, pageId: pg.id, title: pg.title, parentPageId, blocks: pg.blocks });
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

// ─── Default block width ─────────────────────────────────
// Width is calibrated so this reference string fits on one line at the default font.
const DEFAULT_WIDTH_REF = "Yes. The real leverage of a local-first, log-replicated object model is not technical elegance — it's power realignment.";

let _defaultBlockWidth = 580; // fallback
if (typeof document !== 'undefined') {
  const _m = document.createElement('span');
  _m.style.cssText = 'position:absolute;visibility:hidden;white-space:nowrap;font:14px "Helvetica Neue",Arial,-apple-system,sans-serif;padding:0 8px';
  _m.textContent = DEFAULT_WIDTH_REF;
  document.body.appendChild(_m);
  _defaultBlockWidth = Math.ceil(_m.offsetWidth + 16); // +16 for block padding (8px each side)
  document.body.removeChild(_m);
}
export const DEFAULT_BLOCK_WIDTH = _defaultBlockWidth;

// ─── Block CRUD ──────────────────────────────────────────

export function addBlock(x, y, w = DEFAULT_BLOCK_WIDTH, type = 'text', extra = {}) {
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

export function updateBlockCrop(blockId, crop) {
  const pageId = appState.value.ui.pageId;
  update(s => {
    const pg = getActivePage(s);
    const blk = pg?.blocks.find(b => b.id === blockId);
    if (blk) blk.crop = crop;
  });
  sendOp({ type: 'block-update-crop', pageId, blockId, crop });
}

export function updateBlockBorder(blockId, border) {
  const pageId = appState.value.ui.pageId;
  update(s => {
    const pg = getActivePage(s);
    const blk = pg?.blocks.find(b => b.id === blockId);
    if (blk) blk.border = border || undefined;
  });
  sendOp({ type: 'block-update-border', pageId, blockId, border });
}

export function updateChecklistItems(blockId, items) {
  const pageId = appState.value.ui.pageId;
  update(s => {
    const pg = getActivePage(s);
    const blk = pg?.blocks.find(b => b.id === blockId);
    if (blk) blk.items = items;
  });
  sendOp({ type: 'block-checklist-update', pageId, blockId, items });
}

// Silent variant — keeps block.items in sync without triggering a re-render.
// Use for text-only saves (blur) to avoid re-render during focus switches.
export function updateChecklistItemsSilent(blockId, items) {
  const pageId = appState.value.ui.pageId;
  silent(s => {
    const pg = getActivePage(s);
    const blk = pg?.blocks.find(b => b.id === blockId);
    if (blk) blk.items = items;
  });
  sendOp({ type: 'block-checklist-update', pageId, blockId, items });
}

export function updateBlockCaption(blockId, caption) {
  const pageId = appState.value.ui.pageId;
  update(s => {
    const pg = getActivePage(s);
    const blk = pg?.blocks.find(b => b.id === blockId);
    if (blk) blk.caption = caption ?? undefined;
  });
  sendOp({ type: 'block-update-caption', pageId, blockId, caption });
}

export function addImageFromFile(file, x, y) {
  const objectUrl = URL.createObjectURL(file);
  const blk = addBlock(x, y, 300, 'image', { src: objectUrl });
  if (window.notebook) {
    file.arrayBuffer().then(buffer => {
      const meta = {
        filename: file.name || null,
        mimeType: file.type || null,
        size: file.size || null,
        lastModified: file.lastModified || null,
      };
      return window.notebook.saveBlob(buffer, meta);
    }).then(hash => {
      if (hash) updateBlockSrc(blk.id, 'blob:' + hash);
      URL.revokeObjectURL(objectUrl);
    });
  }
}

export async function addImageFromUrl(url, x, y) {
  const placeholder = addBlock(x, y, 300, 'loading');
  try {
    const { buffer, contentType, size } = await window.notebook.fetchImage(url);
    const filename = url.split('/').pop().split('?')[0];
    const meta = { filename, mimeType: contentType, size, lastModified: null };
    deleteBlock(placeholder.id);
    const hash = await window.notebook.saveBlob(buffer, meta);
    if (hash) { addBlock(x, y, 300, 'image', { src: 'blob:' + hash }); return; }
  } catch (err) {
    deleteBlock(placeholder.id);
    (window.log || console.log)('[addImageFromUrl] error:', err.message);
  }
}

export function updateBlockZ(blockId, z) {
  const pageId = appState.value.ui.pageId;
  update(s => {
    const pg = getActivePage(s);
    const blk = pg?.blocks.find(b => b.id === blockId);
    if (blk) blk.z = z;
  });
  sendOp({ type: 'block-z', pageId, blockId, z });
}

export function updatePageTree(sectionId, pages) {
  function toStructure(ps) {
    return ps.map(p => ({ id: p.id, children: toStructure(p.children ?? []) }));
  }
  sendOp({ type: 'page-tree-update', sectionId, pages: toStructure(pages) });
}

export function togglePageVisibility(pageId) {
  update(s => {
    const nb = s.notebooks.find(n => n.id === s.ui.notebookId);
    if (!nb) return;
    for (const sec of nb.sections) {
      const pg = findInTree(sec.pages, pageId);
      if (pg) { pg.hidden = !pg.hidden; break; }
    }
  });
  sendOp({ type: 'page-set-hidden', pageId, hidden: (() => {
    const nb = appState.value.notebooks.find(n => n.id === appState.value.ui.notebookId);
    if (!nb) return false;
    for (const sec of nb.sections) {
      const pg = findInTree(sec.pages, pageId);
      if (pg) return !!pg.hidden;
    }
    return false;
  })() });
}

export function jumpToPage(sectionId, pageId) {
  lastPagePerSection.set(sectionId, pageId);
  update(s => { s.ui.sectionId = sectionId; s.ui.pageId = pageId; });
  persistUiState();
}

export function updatePageView(panX, panY, zoom) {
  const pageId = appState.value.ui.pageId;
  silent(s => {
    const pg = getActivePage(s);
    if (pg) { pg.panX = panX; pg.panY = panY; pg.zoom = zoom; }
  });
  // Persist to local config (device-local, never synced)
  if (hasIPC && _notebookPath && pageId) {
    window.notebook.savePageView(_notebookPath, pageId, panX, panY, zoom);
  }
}

// Caret position memory: pageId → { blockId, offset }
export const lastCaretPerPage = new Map();

export function savePageCaret(pageId, blockId, offset) {
  if (hasIPC && _notebookPath && pageId) {
    window.notebook.savePageCaret(_notebookPath, pageId, blockId, offset);
  }
}

export function getNotebookPath() { return _notebookPath; }

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
  _log('openNotebook called, path:', notebookPath);
  const state = await window.notebook.open(notebookPath);
  _log('openNotebook IPC returned — notebooks:', state?.notebooks?.length,
    'sections:', state?.notebooks?.[0]?.sections?.length);
  if (state) {
    setNotebookPath(notebookPath);

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
      // Restore last-page-per-section map
      if (saved.lastPagePerSection) {
        for (const [secId, pgId] of Object.entries(saved.lastPagePerSection)) {
          lastPagePerSection.set(secId, pgId);
        }
      }
    } else {
      state.ui = {
        notebookId: nb?.id ?? null,
        sectionId: nb?.sections[0]?.id ?? null,
        pageId: nb?.sections[0]?.pages[0]?.id ?? null,
      };
    }

    _log('openNotebook setting appState — ui:', JSON.stringify(state.ui));
    appState.value = state;
    connected.value = true;
    closeSwitcher();
    // Persist with notebook title for recents
    const title = nb?.title || 'Untitled';
    _log('openNotebook saving config — path:', notebookPath, 'title:', title);
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

// ─── Claude Chat ─────────────────────────────────────────

const hasClaude = typeof window !== 'undefined' && window.claude;

export const claudeChat = signal({
  active: false,
  messages: [],
  streaming: false,
  position: { x: 100, y: 100 },
  error: null,
});

function updateChat(fn) {
  const draft = structuredClone(claudeChat.value);
  fn(draft);
  claudeChat.value = draft;
}

export async function startClaudeChat(x, y) {
  if (!hasClaude) return;
  // Close any existing session first
  if (claudeChat.value.active) {
    try { await window.claude.stop(); } catch {}
    window.claude.offStream();
  }

  try {
    const pageId = appState.value.ui?.pageId;
    await window.claude.start(pageId);
  } catch (err) {
    console.error('[claude] start failed:', err);
    return;
  }

  // Set up stream listener
  window.claude.onStream((data) => {
    if (data.type === 'text') {
      updateChat(c => {
        const last = c.messages[c.messages.length - 1];
        if (last && last.role === 'assistant') {
          last.content = data.content;
        }
      });
    } else if (data.type === 'tool_use') {
      updateChat(c => {
        const last = c.messages[c.messages.length - 1];
        if (last && last.role === 'assistant' && !last.content) {
          last.content = `*Using ${data.tool}...*`;
        }
      });
    } else if (data.type === 'done') {
      updateChat(c => {
        c.streaming = false;
        const last = c.messages[c.messages.length - 1];
        if (last && last.role === 'assistant' && data.result) {
          last.content = data.result;
        }
      });
    } else if (data.type === 'error') {
      updateChat(c => {
        c.streaming = false;
        c.error = data.message;
      });
    }
  });

  claudeChat.value = {
    active: true,
    messages: [],
    streaming: false,
    position: { x: x ?? 100, y: y ?? 100 },
    error: null,
  };
}

export function interruptClaude() {
  if (!hasClaude) return;
  window.claude.interrupt().catch(() => {});
  updateChat(c => { c.streaming = false; });
}

export function sendClaudeMessage(text) {
  if (!hasClaude || !claudeChat.value.active) return;

  // If streaming, interrupt current response first
  if (claudeChat.value.streaming) {
    window.claude.interrupt().catch(() => {});
  }

  updateChat(c => {
    c.messages.push({ role: 'user', content: text });
    c.messages.push({ role: 'assistant', content: '' });
    c.streaming = true;
    c.error = null;
  });

  window.claude.message(text).catch(err => {
    updateChat(c => {
      c.streaming = false;
      c.error = err.message;
    });
  });
}

export function closeClaudeChat() {
  if (hasClaude) {
    window.claude.stop().catch(() => {});
    window.claude.offStream();
  }
  claudeChat.value = {
    active: false,
    messages: [],
    streaming: false,
    position: { x: 100, y: 100 },
    error: null,
  };
}

export function updateClaudeChatPosition(x, y) {
  const c = claudeChat.value;
  claudeChat.value = { ...c, position: { x, y } };
}

// ─── Display Panel (MCP-controlled iframe) ────────────

export const displayPanel = signal({
  active: false,
  uri: null,
  position: { x: 480, y: 80 },
});

export function updateDisplayPanelPosition(x, y) {
  const d = displayPanel.value;
  displayPanel.value = { ...d, position: { x, y } };
}

export function closeDisplayPanel() {
  displayPanel.value = { ...displayPanel.value, active: false, uri: null };
}

// Listen for display commands from MCP server via main process
if (typeof window !== 'undefined' && window.display) {
  window.display.onCommand((cmd) => {
    console.log('[display] command:', cmd);
    if (cmd.action === 'open') {
      displayPanel.value = { ...displayPanel.value, active: true, uri: cmd.uri };
    } else if (cmd.action === 'refresh') {
      // Toggle uri to force iframe reload
      const d = displayPanel.value;
      if (d.active && d.uri) {
        displayPanel.value = { ...d, uri: d.uri + (d.uri.includes('?') ? '&' : '?') + '_r=' + Date.now() };
      }
    } else if (cmd.action === 'close') {
      displayPanel.value = { ...displayPanel.value, active: false, uri: null };
    }
  });
}

// ─── Listen for state changes (initial push + remote sync) ──

if (hasIPC) {
  window.notebook.onStateChanged(async (state) => {
    _log('onStateChanged fired — notebooks:', state?.notebooks?.length,
      'sections:', state?.notebooks?.[0]?.sections?.length,
      'nb[0].title:', state?.notebooks?.[0]?.title);
    if (!state || !state.notebooks) { _log('onStateChanged: no state/notebooks, ignoring'); return; }

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

      // If the incoming state already has valid UI (e.g. set by browser shim from URL hash), keep it
      if (state.ui?.sectionId && nb) {
        const sec = nb.sections.find(s => s.id === state.ui.sectionId);
        if (sec) {
          state.ui.notebookId = nb.id;
          restored = true;
        }
      }

      if (!restored && !_notebookPath) {
        try {
          const cfg = await window.notebook.getConfig();
          if (cfg.notebookPath) {
            setNotebookPath(cfg.notebookPath);
            const saved = cfg.uiPositions?.[cfg.notebookPath];
            if (saved && nb) {
              const sec = nb.sections.find(s => s.id === saved.sectionId);
              const page = sec ? findInTree(sec.pages, saved.pageId) : null;
              state.ui = {
                notebookId: nb.id,
                sectionId: sec?.id ?? nb.sections[0]?.id ?? null,
                pageId: page?.id ?? sec?.pages[0]?.id ?? null,
              };
              // Restore last-page-per-section map
              if (saved.lastPagePerSection) {
                for (const [secId, pgId] of Object.entries(saved.lastPagePerSection)) {
                  lastPagePerSection.set(secId, pgId);
                }
              }
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
    // Restore per-page pan/zoom from local config into the state
    if (_notebookPath) {
      try {
        const cfg = await window.notebook.getConfig();
        const views = cfg.pageViews?.[_notebookPath];
        if (views) {
          function applyViews(pages) {
            for (const pg of pages) {
              if (views[pg.id]) {
                const { panX, panY, zoom } = views[pg.id];
                if (panX != null) pg.panX = panX;
                if (panY != null) pg.panY = panY;
                if (zoom != null) pg.zoom = zoom;
              }
              if (pg.children?.length) applyViews(pg.children);
            }
          }
          for (const nb of state.notebooks) {
            for (const sec of nb.sections) applyViews(sec.pages);
          }
          // Restore caret positions from the same pageViews data
          for (const [pageId, v] of Object.entries(views)) {
            if (v.caretBlockId) {
              lastCaretPerPage.set(pageId, { blockId: v.caretBlockId, offset: v.caretOffset ?? 0 });
            }
          }
        }
      } catch {}
    }

    _log('onStateChanged applied — ui:', JSON.stringify(state.ui), '_notebookPath:', _notebookPath);
    appState.value = { ...state };
    connected.value = true;
    initializing.value = false;
  });
}
