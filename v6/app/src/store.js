import { signal } from '@preact/signals';

export const uid = () => crypto.randomUUID();

// ─── Default constructors ─────────────────────────────────

function mkBlock(x = 0, y = 0, w = 480) {
  return { id: uid(), x, y, w, html: '', type: 'text' };
}

function mkPage(title = 'Untitled Page') {
  const db = mkBlock(0, 0, 480);
  return { id: uid(), title, children: [], defaultBlockId: db.id, blocks: [db], panX: 0, panY: 0, zoom: 1, createdAt: Date.now() };
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
export const preloadCache = signal(new Map()); // pageId → page, for keep-alive pre-rendering

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
if (hasIPC) {
  window.notebook.getConfig().then(cfg => {
    if (Array.isArray(cfg.recentNotebooks)) recentNotebooks.value = cfg.recentNotebooks;
    // If there's no saved notebook path, nothing will load — stop initializing now
    if (!cfg.notebookPath) initializing.value = false;
    // If there is a path, initializing stays true until onStateChanged fires
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
}

export function setActivePage(id) {
  const { sectionId } = appState.value.ui;
  if (sectionId) lastPagePerSection.set(sectionId, id);
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

export function updateBlockCrop(blockId, crop) {
  const pageId = appState.value.ui.pageId;
  update(s => {
    const pg = getActivePage(s);
    const blk = pg?.blocks.find(b => b.id === blockId);
    if (blk) blk.crop = crop;
  });
  sendOp({ type: 'block-update-crop', pageId, blockId, crop });
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
      // Restore last-page-per-section map
      if (saved.lastPagePerSection) {
        for (const [secId, pgId] of Object.entries(saved.lastPagePerSection)) {
          lastPagePerSection.set(secId, pgId);
        }
      }
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
        // Append to last assistant message
        const last = c.messages[c.messages.length - 1];
        if (last && last.role === 'assistant') {
          last.content = data.content;
        }
      });
    } else if (data.type === 'done') {
      updateChat(c => {
        c.streaming = false;
        // Update last assistant message with final result
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

export function sendClaudeMessage(text) {
  if (!hasClaude || !claudeChat.value.active) return;

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
        }
      } catch {}
    }

    appState.value = { ...state };
    connected.value = true;
    initializing.value = false;
  });
}
