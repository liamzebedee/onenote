'use strict';

// ─────────────────────────────────────────────────────────
//  State
// ─────────────────────────────────────────────────────────
let state = { notebooks: [] };

let ui = {
  activeNotebookId: null,
  activeSectionId: null,
  activePageId: null,
};

let view = { panX: 0, panY: 0, zoom: 1 };

let selectedBlockId = null;
let dirHandle = null;
let saveTimer = null;

// ─────────────────────────────────────────────────────────
//  Tiny utilities
// ─────────────────────────────────────────────────────────
const uid  = () => crypto.randomUUID?.() ?? (Date.now().toString(36) + Math.random().toString(36).slice(2));
const $    = (sel) => document.querySelector(sel);
const $$   = (sel) => [...document.querySelectorAll(sel)];
const mk   = (tag, props = {}) => Object.assign(document.createElement(tag), props);

// ─────────────────────────────────────────────────────────
//  Data accessors
// ─────────────────────────────────────────────────────────
const activeNb  = () => state.notebooks.find(n => n.id === ui.activeNotebookId);
const activeSec = () => activeNb()?.sections.find(s => s.id === ui.activeSectionId);
const activePg  = () => activeSec()?.pages.find(p => p.id === ui.activePageId);

function findPage(pageId) {
  for (const nb of state.notebooks)
    for (const sec of nb.sections) {
      const p = sec.pages.find(p => p.id === pageId);
      if (p) return p;
    }
  return null;
}

// ─────────────────────────────────────────────────────────
//  History (undo / redo) — per-page block snapshots
// ─────────────────────────────────────────────────────────
const pageHistory = new Map(); // pageId -> { stack: [], cursor: number }

function getHistory(pageId) {
  if (!pageHistory.has(pageId)) pageHistory.set(pageId, { stack: [], cursor: -1 });
  return pageHistory.get(pageId);
}

function historyPush() {
  const page = activePg();
  if (!page) return;
  syncDOM();
  const h = getHistory(page.id);
  // Truncate forward history
  h.stack.splice(h.cursor + 1);
  h.stack.push(JSON.parse(JSON.stringify({ blocks: page.blocks, title: page.title })));
  if (h.stack.length > 60) h.stack.shift();
  else h.cursor = h.stack.length - 1;
}

let textHistoryTimer = null;
function scheduleTextHistoryPush() {
  clearTimeout(textHistoryTimer);
  textHistoryTimer = setTimeout(historyPush, 1000);
}
function flushTextHistory() {
  if (textHistoryTimer) {
    clearTimeout(textHistoryTimer);
    textHistoryTimer = null;
    historyPush();
  }
}

function historyUndo() {
  flushTextHistory();
  const page = activePg();
  if (!page) return;
  const h = getHistory(page.id);
  if (h.cursor <= 0) return;
  h.cursor--;
  applyHistorySnapshot(page, h.stack[h.cursor]);
}

function historyRedo() {
  flushTextHistory();
  const page = activePg();
  if (!page) return;
  const h = getHistory(page.id);
  if (h.cursor >= h.stack.length - 1) return;
  h.cursor++;
  applyHistorySnapshot(page, h.stack[h.cursor]);
}

function applyHistorySnapshot(page, snapshot) {
  page.blocks = JSON.parse(JSON.stringify(snapshot.blocks));
  page.title = snapshot.title;
  renderCanvas();
  scheduleSave();
}

// ─────────────────────────────────────────────────────────
//  Persistence
// ─────────────────────────────────────────────────────────
function scheduleSave() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(doSave, 600);
}

function syncDOM() {
  const page = activePg();
  const titleEl = $('#page-title');
  if (titleEl && page) page.title = titleEl.textContent.trim() || 'Untitled';
  $$('.block[data-block-id]').forEach(el => {
    if (!page) return;
    const block = page.blocks.find(b => b.id === el.dataset.blockId);
    if (!block) return;
    const ce = el.querySelector('.block-content');
    if (ce) block.content = ce.innerHTML;
    block.x     = parseFloat(el.style.left)  || block.x;
    block.y     = parseFloat(el.style.top)   || block.y;
    block.width = parseFloat(el.style.width) || block.width;
  });
}

async function doSave() {
  syncDOM();
  const json = JSON.stringify(state, null, 2);
  localStorage.setItem('onenote-v2', json);

  if (dirHandle) {
    try {
      const fh = await dirHandle.getFileHandle('notes.json', { create: true });
      const w  = await fh.createWritable();
      await w.write(json);
      await w.close();
      setStatus(`Saved · ${dirHandle.name}`);
    } catch (e) {
      setStatus(`Save error: ${e.message}`);
    }
  } else {
    setStatus('Saved (browser storage)');
  }
}

function loadFromStorage() {
  const raw = localStorage.getItem('onenote-v2');
  if (raw) {
    try { state = JSON.parse(raw); } catch { state = { notebooks: [] }; }
  }
}

async function openFolder() {
  if (!window.showDirectoryPicker) {
    alert('File System Access API not available in this browser.\nData is saved in localStorage.');
    return;
  }
  try {
    dirHandle = await window.showDirectoryPicker({ mode: 'readwrite' });
    setStatus(`Opening ${dirHandle.name}…`);
    try {
      const fh   = await dirHandle.getFileHandle('notes.json');
      const file = await fh.getFile();
      state = JSON.parse(await file.text());
      ui.activeNotebookId = state.notebooks[0]?.id ?? null;
      ui.activeSectionId  = activeNb()?.sections[0]?.id ?? null;
      ui.activePageId     = activeSec()?.pages[0]?.id ?? null;
      view = { panX: 0, panY: 0, zoom: 1 };
      render();
      setStatus(`Loaded from ${dirHandle.name}`);
    } catch {
      await doSave();
    }
  } catch (e) {
    if (e.name !== 'AbortError') setStatus(`Error: ${e.message}`);
  }
}

function setStatus(msg) {
  const el = $('#storage-status');
  if (el) el.textContent = msg;
}

// ─────────────────────────────────────────────────────────
//  CRUD helpers
// ─────────────────────────────────────────────────────────
function addNotebook() {
  const title = prompt('Notebook name:')?.trim();
  if (!title) return;
  const nb = { id: uid(), title, sections: [] };
  state.notebooks.push(nb);
  ui.activeNotebookId = nb.id;
  ui.activeSectionId  = null;
  ui.activePageId     = null;
  scheduleSave(); render();
}

function addSection() {
  const nb = activeNb();
  if (!nb) { alert('Create a notebook first.'); return; }
  const title = prompt('Section name:')?.trim() || 'New Section';
  const sec = { id: uid(), title, pages: [] };
  nb.sections.push(sec);
  ui.activeSectionId = sec.id;
  ui.activePageId    = null;
  scheduleSave(); render();
}

function addPage() {
  const sec = activeSec();
  if (!sec) { alert('Create a section first.'); return; }
  const page = { id: uid(), title: 'Untitled Page', blocks: [] };
  sec.pages.push(page);
  ui.activePageId = page.id;
  view = { panX: 0, panY: 0, zoom: 1 };
  scheduleSave(); render();
}

function renameNb(nb) {
  const t = prompt('Rename notebook:', nb.title)?.trim();
  if (t && t !== nb.title) { nb.title = t; scheduleSave(); renderNotebookBar(); }
}
function renameSec(sec) {
  const t = prompt('Rename section:', sec.title)?.trim();
  if (t && t !== sec.title) { sec.title = t; scheduleSave(); renderSections(); }
}
function renamePage(page) {
  const t = prompt('Rename page:', page.title)?.trim();
  if (t && t !== page.title) {
    page.title = t; scheduleSave(); renderPages();
    if (page.id === ui.activePageId) {
      const el = $('#page-title');
      if (el) el.textContent = t;
    }
  }
}

function deleteNb(nb) {
  if (!confirm(`Delete notebook "${nb.title}" and all its contents?`)) return;
  state.notebooks = state.notebooks.filter(n => n.id !== nb.id);
  if (ui.activeNotebookId === nb.id) {
    ui.activeNotebookId = state.notebooks[0]?.id ?? null;
    ui.activeSectionId  = activeNb()?.sections[0]?.id ?? null;
    ui.activePageId     = activeSec()?.pages[0]?.id ?? null;
  }
  scheduleSave(); render();
}
function deleteSec(sec) {
  const nb = activeNb();
  if (!nb || !confirm(`Delete section "${sec.title}" and all its pages?`)) return;
  nb.sections = nb.sections.filter(s => s.id !== sec.id);
  if (ui.activeSectionId === sec.id) {
    ui.activeSectionId = nb.sections[0]?.id ?? null;
    ui.activePageId    = activeSec()?.pages[0]?.id ?? null;
  }
  scheduleSave(); renderSections(); renderPages(); renderCanvas();
}
function deletePage(page) {
  const sec = activeSec();
  if (!sec || !confirm(`Delete page "${page.title}"?`)) return;
  sec.pages = sec.pages.filter(p => p.id !== page.id);
  if (ui.activePageId === page.id) ui.activePageId = sec.pages[0]?.id ?? null;
  scheduleSave(); renderPages(); renderCanvas();
}

function deleteBlock(blockId) {
  const page = activePg();
  if (!page) return;
  historyPush(); // push before deletion so it can be undone
  page.blocks = page.blocks.filter(b => b.id !== blockId);
  if (selectedBlockId === blockId) selectedBlockId = null;
  scheduleSave(); renderCanvas();
}

// ─────────────────────────────────────────────────────────
//  Navigation
// ─────────────────────────────────────────────────────────
function switchNotebook(nbId) {
  if (nbId === ui.activeNotebookId) return;
  syncDOM();
  ui.activeNotebookId = nbId;
  ui.activeSectionId  = activeNb()?.sections[0]?.id ?? null;
  ui.activePageId     = activeSec()?.pages[0]?.id ?? null;
  view = { panX: 0, panY: 0, zoom: 1 };
  render();
}
function switchSection(secId) {
  if (secId === ui.activeSectionId) return;
  syncDOM();
  ui.activeSectionId = secId;
  ui.activePageId    = activeSec()?.pages[0]?.id ?? null;
  view = { panX: 0, panY: 0, zoom: 1 };
  renderSections(); renderPages(); renderCanvas();
}
function switchPage(pageId) {
  if (pageId === ui.activePageId) return;
  syncDOM();
  ui.activePageId = pageId;
  view = { panX: 0, panY: 0, zoom: 1 };
  renderPages(); renderCanvas();
}

// ─────────────────────────────────────────────────────────
//  Context menu
// ─────────────────────────────────────────────────────────
function showCtxMenu(e, items) {
  removeCtxMenu();
  const menu = mk('div', { id: 'ctx-menu' });
  menu.style.left = e.clientX + 'px';
  menu.style.top  = e.clientY + 'px';
  items.forEach(item => {
    if (item === 'sep') {
      menu.appendChild(mk('div', { className: 'ctx-sep' }));
    } else {
      const mi = mk('div', { className: 'ctx-item' + (item.danger ? ' danger' : '') });
      mi.textContent = item.label;
      mi.onclick = () => { removeCtxMenu(); item.action(); };
      menu.appendChild(mi);
    }
  });
  document.body.appendChild(menu);
  requestAnimationFrame(() =>
    document.addEventListener('mousedown', removeCtxMenu, { once: true }));
}
function removeCtxMenu() { $('#ctx-menu')?.remove(); }

// ─────────────────────────────────────────────────────────
//  Render
// ─────────────────────────────────────────────────────────
function render() {
  renderNotebookBar();
  renderSections();
  renderPages();
  renderCanvas();
}

function renderNotebookBar() {
  const list = $('#notebooks-list');
  list.innerHTML = '';
  state.notebooks.forEach(nb => {
    const tab = mk('div', { className: 'notebook-tab' + (nb.id === ui.activeNotebookId ? ' active' : '') });
    tab.textContent = nb.title;
    tab.title = 'Click to open · Right-click for options';
    tab.onclick = () => switchNotebook(nb.id);
    tab.ondblclick = e => { e.stopPropagation(); renameNb(nb); };
    tab.oncontextmenu = e => {
      e.preventDefault();
      showCtxMenu(e, [
        { label: 'Rename',          action: () => renameNb(nb) },
        'sep',
        { label: 'Delete notebook', action: () => deleteNb(nb), danger: true },
      ]);
    };
    list.appendChild(tab);
  });
}

function renderSections() {
  const list = $('#sections-list');
  list.innerHTML = '';
  (activeNb()?.sections ?? []).forEach(sec => {
    const item = mk('div', { className: 'list-item' + (sec.id === ui.activeSectionId ? ' active' : '') });
    item.textContent = sec.title;
    item.onclick = () => switchSection(sec.id);
    item.ondblclick = e => { e.stopPropagation(); renameSec(sec); };
    item.oncontextmenu = e => {
      e.preventDefault();
      showCtxMenu(e, [
        { label: 'Rename',         action: () => renameSec(sec) },
        'sep',
        { label: 'Delete section', action: () => deleteSec(sec), danger: true },
      ]);
    };
    list.appendChild(item);
  });
}

function renderPages() {
  const list = $('#pages-list');
  list.innerHTML = '';
  (activeSec()?.pages ?? []).forEach(page => {
    const item = mk('div', { className: 'list-item' + (page.id === ui.activePageId ? ' active' : '') });
    item.textContent = page.title;
    item.onclick = () => switchPage(page.id);
    item.ondblclick = e => { e.stopPropagation(); renamePage(page); };
    item.oncontextmenu = e => {
      e.preventDefault();
      showCtxMenu(e, [
        { label: 'Rename',      action: () => renamePage(page) },
        'sep',
        { label: 'Delete page', action: () => deletePage(page), danger: true },
      ]);
    };
    list.appendChild(item);
  });
}

function renderCanvas() {
  const inner = $('#canvas-inner');
  inner.innerHTML = '';
  selectedBlockId = null;
  applyCanvasTransform();

  const page = activePg();
  const titleEl = $('#page-title');

  if (!page) {
    if (titleEl) { titleEl.contentEditable = 'false'; titleEl.textContent = ''; }
    const empty = mk('div', { className: 'canvas-empty' });
    empty.innerHTML =
      '<p>No page selected</p>' +
      '<p style="font-size:12px;margin-top:6px;color:#ccc">Create a notebook, section, and page to get started</p>';
    inner.appendChild(empty);
    return;
  }

  if (titleEl) {
    titleEl.contentEditable = 'true';
    titleEl.textContent = page.title;
    titleEl.oninput = () => {
      page.title = titleEl.textContent.trim() || 'Untitled';
      renderPages(); scheduleSave();
    };
  }

  page.blocks.forEach(b => inner.appendChild(makeBlockEl(b)));

  // Initialize history for this page on first visit
  if (getHistory(page.id).stack.length === 0) historyPush();
}

// ─────────────────────────────────────────────────────────
//  Block DOM element
// ─────────────────────────────────────────────────────────
function makeBlockEl(block) {
  const wrapper = mk('div', { className: 'block' + (block.id === selectedBlockId ? ' selected' : '') });
  wrapper.dataset.blockId = block.id;
  wrapper.style.left  = block.x + 'px';
  wrapper.style.top   = block.y + 'px';
  wrapper.style.width = block.width + 'px';
  // Height is content-determined (no height style)

  // ── Narrow drag handle (top, visible on hover)
  const handle = mk('div', { className: 'block-handle' });
  const delBtn = mk('button', { className: 'block-delete', title: 'Delete block' });
  delBtn.textContent = '×';
  delBtn.onclick = e => { e.stopPropagation(); deleteBlock(block.id); };
  handle.appendChild(delBtn);

  // ── Width-only resize handle (top-right corner, visible on hover)
  const resizeHandle = mk('div', { className: 'block-resize' });

  // ── Content
  const content = mk('div', { className: 'block-content' });
  content.contentEditable = 'true';
  content.innerHTML = block.content || '';
  content.spellcheck = true;

  content.addEventListener('focus', () => {
    selectedBlockId = block.id;
    wrapper.classList.add('selected');
  });
  content.addEventListener('blur', () => {
    block.content = content.innerHTML;
    scheduleSave();
  });
  content.addEventListener('input', () => {
    block.content = content.innerHTML;
    scheduleSave();
    scheduleTextHistoryPush();
  });

  // Markdown shortcuts on keydown (space triggers block-level)
  content.addEventListener('keydown', e => tryMarkdownFormat(e, content));
  // Inline markdown on keyup (* and _)
  content.addEventListener('keyup', e => {
    if (e.key === '*' || e.key === '_') tryInlineMarkdown(content);
  });

  wrapper.appendChild(handle);
  wrapper.appendChild(resizeHandle);
  wrapper.appendChild(content);

  addDragMove(handle, wrapper, block);
  addDragResize(resizeHandle, wrapper, block);

  return wrapper;
}

function addDragMove(handle, wrapper, block) {
  handle.addEventListener('mousedown', e => {
    if (e.target.classList.contains('block-delete')) return;
    e.preventDefault();
    selectedBlockId = block.id;
    wrapper.classList.add('selected');

    const sx = e.clientX, sy = e.clientY, bx = block.x, by = block.y;
    let moved = false;

    const onMove = e => {
      moved = true;
      block.x = bx + (e.clientX - sx) / view.zoom;
      block.y = by + (e.clientY - sy) / view.zoom;
      wrapper.style.left = block.x + 'px';
      wrapper.style.top  = block.y + 'px';
    };
    const onUp = () => {
      if (moved) { historyPush(); scheduleSave(); }
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  });
}

// Width-only resize from top-right handle
function addDragResize(handle, wrapper, block) {
  handle.addEventListener('mousedown', e => {
    e.preventDefault();
    e.stopPropagation();
    const sx = e.clientX, sw = block.width;

    const onMove = e => {
      block.width = Math.max(120, sw + (e.clientX - sx) / view.zoom);
      wrapper.style.width = block.width + 'px';
    };
    const onUp = () => {
      historyPush(); scheduleSave();
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  });
}

// ─────────────────────────────────────────────────────────
//  Canvas transform
// ─────────────────────────────────────────────────────────
function clampView() {
  view.panX = Math.max(0, view.panX);
  view.panY = Math.max(0, view.panY);
}

function applyCanvasTransform() {
  clampView();
  $('#canvas-inner').style.transform =
    `translate(${view.panX}px, ${view.panY}px) scale(${view.zoom})`;
}

function createBlockAtCanvasPos(cx, cy) {
  const page = activePg();
  if (!page) return null;
  const block = {
    id: uid(),
    x: cx - 125,
    y: cy - 18,
    width: 260,
    content: '',
  };
  historyPush(); // push before creation
  page.blocks.push(block);
  scheduleSave();
  const el = makeBlockEl(block);
  $('#canvas-inner').appendChild(el);
  selectedBlockId = block.id;
  el.classList.add('selected');
  historyPush(); // push after creation (so undo removes the block)
  return el;
}

function screenToCanvas(sx, sy) {
  return {
    x: (sx - view.panX) / view.zoom,
    y: (sy - view.panY) / view.zoom,
  };
}

// ─────────────────────────────────────────────────────────
//  Canvas interaction events
// ─────────────────────────────────────────────────────────
function bindCanvasEvents() {
  const container = $('#canvas-container');
  const inner = () => $('#canvas-inner');

  // Unified mousedown: click = create block, drag = pan
  container.addEventListener('mousedown', e => {
    const onCanvas = e.target === container || e.target === inner();
    if (!onCanvas) return;

    if (e.button === 1) {
      // Middle-click pan
      e.preventDefault();
      startPan(e, container);
      return;
    }

    if (e.button !== 0) return;

    // Deselect immediately
    selectedBlockId = null;
    $$('.block.selected').forEach(el => el.classList.remove('selected'));

    const startX = e.clientX, startY = e.clientY;
    let dragging = false;
    let panStartVX = view.panX, panStartVY = view.panY;

    const onMove = ev => {
      const dx = ev.clientX - startX, dy = ev.clientY - startY;
      if (!dragging && Math.hypot(dx, dy) > 5) dragging = true;
      if (dragging) {
        view.panX = Math.max(0, panStartVX + dx);
        view.panY = Math.max(0, panStartVY + dy);
        applyCanvasTransform();
        container.style.cursor = 'grabbing';
      }
    };

    const onUp = ev => {
      container.style.cursor = '';
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);

      if (!dragging) {
        // Pure click → create block
        const page = activePg();
        if (!page) return;
        const rect = container.getBoundingClientRect();
        const { x, y } = screenToCanvas(ev.clientX - rect.left, ev.clientY - rect.top);
        const blockEl = createBlockAtCanvasPos(x, y);
        if (blockEl) setTimeout(() => blockEl.querySelector('.block-content').focus(), 10);
      }
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  });

  // Zoom (Ctrl + wheel)
  container.addEventListener('wheel', e => {
    if (!(e.ctrlKey || e.metaKey)) return;
    e.preventDefault();
    const rect   = container.getBoundingClientRect();
    const mx     = e.clientX - rect.left;
    const my     = e.clientY - rect.top;
    const factor = e.deltaY > 0 ? 0.9 : 1.1;
    const newZoom = Math.max(0.2, Math.min(5, view.zoom * factor));
    const ratio   = newZoom / view.zoom;
    view.panX = Math.max(0, mx + (view.panX - mx) * ratio);
    view.panY = Math.max(0, my + (view.panY - my) * ratio);
    view.zoom = newZoom;
    applyCanvasTransform();
  }, { passive: false });

  // Image drag-and-drop onto canvas
  container.addEventListener('dragover', e => {
    if (![...e.dataTransfer.types].includes('Files')) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    container.classList.add('drag-over');
  });
  container.addEventListener('dragleave', () => container.classList.remove('drag-over'));
  container.addEventListener('drop', e => {
    e.preventDefault();
    container.classList.remove('drag-over');
    const page = activePg();
    if (!page) return;
    const images = [...e.dataTransfer.files].filter(f => f.type.startsWith('image/'));
    if (!images.length) return;
    const rect = container.getBoundingClientRect();
    images.forEach((file, i) => {
      const reader = new FileReader();
      reader.onload = ev => {
        const { x, y } = screenToCanvas(e.clientX - rect.left + i * 20, e.clientY - rect.top + i * 20);
        const block = { id: uid(), x: x - 100, y: y - 50, width: 280,
          content: `<img src="${ev.target.result}" style="max-width:100%;height:auto;">` };
        historyPush();
        page.blocks.push(block);
        scheduleSave();
        const el = makeBlockEl(block);
        $('#canvas-inner').appendChild(el);
        historyPush();
      };
      reader.readAsDataURL(file);
    });
  });

  // Image paste onto canvas (when not editing a block)
  document.addEventListener('paste', e => {
    if (document.activeElement?.classList.contains('block-content')) return;
    const images = [...e.clipboardData.items].filter(i => i.type.startsWith('image/'));
    if (!images.length || !activePg()) return;
    e.preventDefault();
    images.forEach(item => {
      const reader = new FileReader();
      reader.onload = ev => {
        const block = {
          id: uid(), x: 160 + Math.random() * 40, y: 120 + Math.random() * 40, width: 280,
          content: `<img src="${ev.target.result}" style="max-width:100%;height:auto;">`,
        };
        const page = activePg();
        if (!page) return;
        historyPush();
        page.blocks.push(block);
        scheduleSave();
        const el = makeBlockEl(block);
        $('#canvas-inner').appendChild(el);
        historyPush();
      };
      reader.readAsDataURL(item.getAsFile());
    });
  });
}

function startPan(e, container) {
  const sx = e.clientX, sy = e.clientY;
  const pvx = view.panX, pvy = view.panY;
  container.style.cursor = 'grabbing';
  const onMove = ev => {
    view.panX = Math.max(0, pvx + (ev.clientX - sx));
    view.panY = Math.max(0, pvy + (ev.clientY - sy));
    applyCanvasTransform();
  };
  const onUp = () => {
    container.style.cursor = '';
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onUp);
  };
  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', onUp);
}

// ─────────────────────────────────────────────────────────
//  Markdown formatting (block-level)
// ─────────────────────────────────────────────────────────
function tryMarkdownFormat(e, contentEl) {
  if (e.key !== ' ') return;

  const sel = window.getSelection();
  if (!sel || !sel.isCollapsed) return;

  const range = sel.getRangeAt(0);
  const node = range.startContainer;
  if (node.nodeType !== Node.TEXT_NODE) return;

  const before = node.textContent.slice(0, range.startOffset);
  // Only apply if the entire text in this text node before cursor matches
  if (node.textContent.slice(0, range.startOffset) !== before) return;

  // Block-level triggers (entire content of the current node before cursor)
  const map = {
    '#':   () => { e.preventDefault(); clearAndFormat(node, range, sel, 'h1'); },
    '##':  () => { e.preventDefault(); clearAndFormat(node, range, sel, 'h2'); },
    '###': () => { e.preventDefault(); clearAndFormat(node, range, sel, 'h3'); },
    '-':   () => { e.preventDefault(); clearAndFormatList(node, range, sel, 'ul'); },
    '*':   () => { e.preventDefault(); clearAndFormatList(node, range, sel, 'ul'); },
    '1.':  () => { e.preventDefault(); clearAndFormatList(node, range, sel, 'ol'); },
    '>':   () => { e.preventDefault(); clearAndFormat(node, range, sel, 'blockquote'); },
  };

  if (map[before]) map[before]();
}

function clearAndFormat(node, range, sel, tag) {
  // Delete the trigger characters
  const del = document.createRange();
  del.setStart(node, 0);
  del.setEnd(node, range.startOffset);
  sel.removeAllRanges();
  sel.addRange(del);
  document.execCommand('delete');
  // Apply block format
  document.execCommand('formatBlock', false, tag);
}

function clearAndFormatList(node, range, sel, listType) {
  const del = document.createRange();
  del.setStart(node, 0);
  del.setEnd(node, range.startOffset);
  sel.removeAllRanges();
  sel.addRange(del);
  document.execCommand('delete');
  if (listType === 'ul') document.execCommand('insertUnorderedList');
  else document.execCommand('insertOrderedList');
}

// ─────────────────────────────────────────────────────────
//  Markdown formatting (inline: ** and *)
// ─────────────────────────────────────────────────────────
function tryInlineMarkdown(contentEl) {
  const sel = window.getSelection();
  if (!sel || !sel.isCollapsed) return;

  const range = sel.getRangeAt(0);
  const node = range.startContainer;
  if (node.nodeType !== Node.TEXT_NODE) return;

  const text = node.textContent;
  const pos = range.startOffset;
  const upTo = text.slice(0, pos);

  // Bold: **text** (ending at cursor)
  const boldMatch = /\*\*([^*]+)\*\*$/.exec(upTo);
  if (boldMatch) {
    applyInlineTag(node, pos - boldMatch[0].length, pos, boldMatch[1], 'strong', sel);
    return;
  }

  // Bold: __text__
  const bold2Match = /__([^_]+)__$/.exec(upTo);
  if (bold2Match) {
    applyInlineTag(node, pos - bold2Match[0].length, pos, bold2Match[1], 'strong', sel);
    return;
  }

  // Italic: *text* (not preceded by *)
  const italicMatch = /(?<!\*)\*([^*]+)\*$/.exec(upTo);
  if (italicMatch) {
    applyInlineTag(node, pos - italicMatch[0].length, pos, italicMatch[1], 'em', sel);
    return;
  }

  // Italic: _text_
  const italic2Match = /(?<!_)_([^_]+)_$/.exec(upTo);
  if (italic2Match) {
    applyInlineTag(node, pos - italic2Match[0].length, pos, italic2Match[1], 'em', sel);
  }
}

function applyInlineTag(node, start, end, innerText, tagName, sel) {
  const before = node.textContent.slice(0, start);
  const after  = node.textContent.slice(end);
  const parent = node.parentNode;

  const frag = document.createDocumentFragment();
  if (before) frag.appendChild(document.createTextNode(before));
  const el = document.createElement(tagName);
  el.textContent = innerText;
  frag.appendChild(el);
  const afterNode = document.createTextNode(after);
  frag.appendChild(afterNode);

  parent.replaceChild(frag, node);

  // Place cursor right after the formatted element (at start of afterNode)
  const r = document.createRange();
  r.setStart(afterNode, 0);
  r.collapse(true);
  sel.removeAllRanges();
  sel.addRange(r);
}

// ─────────────────────────────────────────────────────────
//  Format toolbar
// ─────────────────────────────────────────────────────────
function applyFormat(cmd) {
  switch (cmd) {
    case 'bold':          document.execCommand('bold'); break;
    case 'italic':        document.execCommand('italic'); break;
    case 'underline':     document.execCommand('underline'); break;
    case 'strikethrough': document.execCommand('strikeThrough'); break;
    case 'h1': document.execCommand('formatBlock', false, 'h1'); break;
    case 'h2': document.execCommand('formatBlock', false, 'h2'); break;
    case 'h3': document.execCommand('formatBlock', false, 'h3'); break;
    case 'p':  document.execCommand('formatBlock', false, 'p'); break;
    case 'ul': document.execCommand('insertUnorderedList'); break;
    case 'ol': document.execCommand('insertOrderedList'); break;
    case 'link': {
      const sel = window.getSelection();
      if (!sel?.rangeCount) break;
      const url = prompt('Enter URL:')?.trim();
      if (url) document.execCommand('createLink', false, url);
      break;
    }
  }
}

function bindToolbar() {
  $$('.fmt-btn[data-cmd]').forEach(btn => {
    btn.addEventListener('mousedown', e => {
      e.preventDefault();
      applyFormat(btn.dataset.cmd);
    });
  });

  $('#add-block-btn').addEventListener('click', () => {
    const page = activePg();
    if (!page) return;
    const blockEl = createBlockAtCanvasPos(
      (260 - view.panX) / view.zoom,
      (80  - view.panY) / view.zoom
    );
    if (blockEl) setTimeout(() => blockEl.querySelector('.block-content').focus(), 10);
  });
}

// ─────────────────────────────────────────────────────────
//  Keyboard shortcuts
// ─────────────────────────────────────────────────────────
function bindKeyboard() {
  document.addEventListener('keydown', e => {
    const inBlock = document.activeElement?.classList.contains('block-content');
    const mod = e.ctrlKey || e.metaKey;

    if (mod) {
      // Undo
      if (e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        historyUndo();
        return;
      }
      // Redo
      if ((e.key === 'z' && e.shiftKey) || e.key === 'y') {
        e.preventDefault();
        historyRedo();
        return;
      }

      if (!e.shiftKey) {
        switch (e.key.toLowerCase()) {
          case 'b': if (inBlock) { e.preventDefault(); applyFormat('bold'); }      break;
          case 'i': if (inBlock) { e.preventDefault(); applyFormat('italic'); }    break;
          case 'u': if (inBlock) { e.preventDefault(); applyFormat('underline'); } break;
          case 's': e.preventDefault(); doSave(); break;
          case '=': case '+':
            e.preventDefault();
            view.zoom = Math.min(5, view.zoom * 1.15);
            applyCanvasTransform(); break;
          case '-':
            e.preventDefault();
            view.zoom = Math.max(0.2, view.zoom / 1.15);
            applyCanvasTransform(); break;
          case '0':
            e.preventDefault();
            view.zoom = 1; view.panX = 0; view.panY = 0;
            applyCanvasTransform(); break;
        }
      }
    }

    if (e.key === 'Escape') {
      removeCtxMenu();
      $$('.block.selected').forEach(el => el.classList.remove('selected'));
      selectedBlockId = null;
      document.activeElement?.blur?.();
    }

    if ((e.key === 'Delete' || e.key === 'Backspace') && selectedBlockId && !inBlock) {
      e.preventDefault();
      deleteBlock(selectedBlockId);
    }
  });
}

// ─────────────────────────────────────────────────────────
//  Init
// ─────────────────────────────────────────────────────────
function createDefaultData() {
  const nbId = uid(), secId = uid(), pgId = uid();
  state.notebooks = [{
    id: nbId, title: 'Personal',
    sections: [{
      id: secId, title: 'General',
      pages: [{
        id: pgId, title: 'Welcome',
        blocks: [{
          id: uid(), x: 60, y: 80, width: 360,
          content:
            '<h2>Welcome to Notes!</h2>' +
            '<p>Click anywhere on the canvas to create a new block.</p>' +
            '<p>Drag the canvas to pan. Use # + space for headings.</p>',
        }],
      }],
    }],
  }];
}

function bindEvents() {
  $('#add-notebook-btn').onclick = addNotebook;
  $('#add-section-btn').onclick  = addSection;
  $('#add-page-btn').onclick     = addPage;
  $('#open-folder-btn').onclick  = openFolder;
  bindToolbar();
  bindCanvasEvents();
  bindKeyboard();
}

document.addEventListener('DOMContentLoaded', () => {
  loadFromStorage();
  if (state.notebooks.length === 0) createDefaultData();

  ui.activeNotebookId = state.notebooks[0]?.id ?? null;
  ui.activeSectionId  = activeNb()?.sections[0]?.id ?? null;
  ui.activePageId     = activeSec()?.pages[0]?.id ?? null;

  bindEvents();
  render();
  setStatus('Ready · data saved in browser storage · click "Open Folder" to use local files');
});
