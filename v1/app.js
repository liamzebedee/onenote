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

// ─────────────────────────────────────────────────────────
//  Persistence
// ─────────────────────────────────────────────────────────
function scheduleSave() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(doSave, 600);
}

/** Read live DOM → state (blocks + page title) before save or page switch */
function syncDOM() {
  const page = activePg();
  // Page title
  const titleEl = $('#page-title');
  if (titleEl && page) {
    page.title = titleEl.textContent.trim() || 'Untitled';
  }
  // Block content + geometry
  $$('.block[data-block-id]').forEach(el => {
    if (!page) return;
    const block = page.blocks.find(b => b.id === el.dataset.blockId);
    if (!block) return;
    const ce = el.querySelector('.block-content');
    if (ce) block.content = ce.innerHTML;
    block.x      = parseFloat(el.style.left)      || block.x;
    block.y      = parseFloat(el.style.top)       || block.y;
    block.width  = parseFloat(el.style.width)     || block.width;
    block.height = parseFloat(el.style.minHeight) || block.height;
  });
}

async function doSave() {
  syncDOM();
  const json = JSON.stringify(state, null, 2);
  localStorage.setItem('onenote-v1', json);

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
  const raw = localStorage.getItem('onenote-v1');
  if (raw) {
    try { state = JSON.parse(raw); } catch { state = { notebooks: [] }; }
  }
}

async function openFolder() {
  if (!window.showDirectoryPicker) {
    alert('File System Access API is not available in this browser.\nData is saved in localStorage.');
    return;
  }
  try {
    dirHandle = await window.showDirectoryPicker({ mode: 'readwrite' });
    setStatus(`Opening ${dirHandle.name}…`);

    try {
      const fh   = await dirHandle.getFileHandle('notes.json');
      const file = await fh.getFile();
      state = JSON.parse(await file.text());

      // Reset navigation to first item
      ui.activeNotebookId = state.notebooks[0]?.id ?? null;
      ui.activeSectionId  = activeNb()?.sections[0]?.id ?? null;
      ui.activePageId     = activeSec()?.pages[0]?.id ?? null;
      view = { panX: 0, panY: 0, zoom: 1 };
      render();
      setStatus(`Loaded from ${dirHandle.name}`);
    } catch {
      // No existing file — save current state into the new folder
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
  scheduleSave();
  render();
}

function addSection() {
  const nb = activeNb();
  if (!nb) { alert('Create a notebook first.'); return; }
  const title = prompt('Section name:')?.trim() || 'New Section';
  const sec = { id: uid(), title, pages: [] };
  nb.sections.push(sec);
  ui.activeSectionId = sec.id;
  ui.activePageId    = null;
  scheduleSave();
  render();
}

function addPage() {
  const sec = activeSec();
  if (!sec) { alert('Create a section first.'); return; }
  const page = { id: uid(), title: 'Untitled Page', blocks: [] };
  sec.pages.push(page);
  ui.activePageId = page.id;
  view = { panX: 0, panY: 0, zoom: 1 };
  scheduleSave();
  render();
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
    page.title = t;
    scheduleSave();
    renderPages();
    // Update inline title if this is the active page
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
  scheduleSave();
  render();
}
function deleteSec(sec) {
  const nb = activeNb();
  if (!nb || !confirm(`Delete section "${sec.title}" and all its pages?`)) return;
  nb.sections = nb.sections.filter(s => s.id !== sec.id);
  if (ui.activeSectionId === sec.id) {
    ui.activeSectionId = nb.sections[0]?.id ?? null;
    ui.activePageId    = activeSec()?.pages[0]?.id ?? null;
  }
  scheduleSave();
  renderSections(); renderPages(); renderCanvas();
}
function deletePage(page) {
  const sec = activeSec();
  if (!sec || !confirm(`Delete page "${page.title}"?`)) return;
  sec.pages = sec.pages.filter(p => p.id !== page.id);
  if (ui.activePageId === page.id) {
    ui.activePageId = sec.pages[0]?.id ?? null;
  }
  scheduleSave();
  renderPages(); renderCanvas();
}

function deleteBlock(blockId) {
  const page = activePg();
  if (!page) return;
  page.blocks = page.blocks.filter(b => b.id !== blockId);
  if (selectedBlockId === blockId) selectedBlockId = null;
  scheduleSave();
  renderCanvas();
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
  // Close on next click anywhere
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
        { label: 'Rename',       action: () => renamePage(page) },
        'sep',
        { label: 'Delete page',  action: () => deletePage(page), danger: true },
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

  // Page title
  if (titleEl) {
    titleEl.contentEditable = 'true';
    titleEl.textContent = page.title;
    titleEl.oninput = () => {
      page.title = titleEl.textContent.trim() || 'Untitled';
      renderPages();
      scheduleSave();
    };
  }

  // Blocks
  page.blocks.forEach(b => inner.appendChild(makeBlockEl(b)));
}

// ─────────────────────────────────────────────────────────
//  Block DOM element
// ─────────────────────────────────────────────────────────
function makeBlockEl(block) {
  const wrapper = mk('div', { className: 'block' + (block.id === selectedBlockId ? ' selected' : '') });
  wrapper.dataset.blockId = block.id;
  wrapper.style.left      = block.x + 'px';
  wrapper.style.top       = block.y + 'px';
  wrapper.style.width     = block.width + 'px';
  wrapper.style.minHeight = block.height + 'px';

  // ── Header (drag handle)
  const header = mk('div', { className: 'block-header' });
  const delBtn = mk('button', { className: 'block-delete', title: 'Delete block' });
  delBtn.textContent = '×';
  delBtn.onclick = e => { e.stopPropagation(); deleteBlock(block.id); };
  header.appendChild(delBtn);

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
  });
  // Stop dblclick bubbling so canvas doesn't create a new block
  content.addEventListener('dblclick', e => e.stopPropagation());

  // ── Resize handle
  const resizeHandle = mk('div', { className: 'block-resize' });

  wrapper.appendChild(header);
  wrapper.appendChild(content);
  wrapper.appendChild(resizeHandle);

  addDragMove(header, wrapper, block);
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
      if (moved) scheduleSave();
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  });
}

function addDragResize(handle, wrapper, block) {
  handle.addEventListener('mousedown', e => {
    e.preventDefault();
    e.stopPropagation();
    const sx = e.clientX, sy = e.clientY, sw = block.width, sh = block.height;

    const onMove = e => {
      block.width  = Math.max(120, sw + (e.clientX - sx) / view.zoom);
      block.height = Math.max(50,  sh + (e.clientY - sy) / view.zoom);
      wrapper.style.width     = block.width + 'px';
      wrapper.style.minHeight = block.height + 'px';
    };
    const onUp = () => {
      scheduleSave();
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
function applyCanvasTransform() {
  $('#canvas-inner').style.transform =
    `translate(${view.panX}px, ${view.panY}px) scale(${view.zoom})`;
}

function createBlockAtCanvasPos(cx, cy, content = '<p></p>') {
  const page = activePg();
  if (!page) return null;
  const block = {
    id: uid(),
    x: cx - 125,
    y: cy - 18,
    width: 260,
    height: 80,
    content,
  };
  page.blocks.push(block);
  scheduleSave();
  const el = makeBlockEl(block);
  $('#canvas-inner').appendChild(el);
  selectedBlockId = block.id;
  el.classList.add('selected');
  return el;
}

// Convert screen coords (relative to canvas-container) → canvas coords
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

  // ── Deselect on click on bare canvas
  container.addEventListener('mousedown', e => {
    const onCanvas = e.target === container || e.target === $('#canvas-inner');
    if (onCanvas && e.button === 0) {
      selectedBlockId = null;
      $$('.block.selected').forEach(el => el.classList.remove('selected'));
    }
  });

  // ── Pan (left-drag on bare canvas OR middle-click drag)
  let isPanning = false, panStartX, panStartY, panStartVX, panStartVY;

  container.addEventListener('mousedown', e => {
    const onCanvas = e.target === container || e.target === $('#canvas-inner');
    if (e.button === 1 || (e.button === 0 && onCanvas)) {
      isPanning  = true;
      panStartX  = e.clientX;
      panStartY  = e.clientY;
      panStartVX = view.panX;
      panStartVY = view.panY;
      if (e.button === 1) e.preventDefault();
      container.style.cursor = 'grabbing';
    }
  });

  document.addEventListener('mousemove', e => {
    if (!isPanning) return;
    view.panX = panStartVX + (e.clientX - panStartX);
    view.panY = panStartVY + (e.clientY - panStartY);
    applyCanvasTransform();
  });

  document.addEventListener('mouseup', () => {
    if (isPanning) { isPanning = false; container.style.cursor = ''; }
  });

  // ── Zoom (Ctrl + wheel)
  container.addEventListener('wheel', e => {
    if (!(e.ctrlKey || e.metaKey)) return;
    e.preventDefault();
    const rect  = container.getBoundingClientRect();
    const mx    = e.clientX - rect.left;
    const my    = e.clientY - rect.top;
    const factor   = e.deltaY > 0 ? 0.9 : 1.1;
    const newZoom  = Math.max(0.2, Math.min(5, view.zoom * factor));
    const ratio    = newZoom / view.zoom;
    view.panX = mx + (view.panX - mx) * ratio;
    view.panY = my + (view.panY - my) * ratio;
    view.zoom = newZoom;
    applyCanvasTransform();
  }, { passive: false });

  // ── Double-click → create text block
  container.addEventListener('dblclick', e => {
    const onCanvas = e.target === container || e.target === $('#canvas-inner');
    if (!onCanvas) return;
    const page = activePg();
    if (!page) return;
    const rect = container.getBoundingClientRect();
    const { x, y } = screenToCanvas(e.clientX - rect.left, e.clientY - rect.top);
    const blockEl = createBlockAtCanvasPos(x, y);
    if (blockEl) setTimeout(() => blockEl.querySelector('.block-content').focus(), 10);
  });

  // ── Image drag-and-drop onto canvas
  container.addEventListener('dragover', e => {
    const hasFiles = [...e.dataTransfer.types].includes('Files');
    if (!hasFiles) return;
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
        createBlockAtCanvasPos(x + 130, y + 30,
          `<img src="${ev.target.result}" style="max-width:100%;height:auto;">`);
      };
      reader.readAsDataURL(file);
    });
  });

  // ── Image paste onto canvas (when not editing a block)
  document.addEventListener('paste', e => {
    if (document.activeElement?.classList.contains('block-content')) return;
    const images = [...e.clipboardData.items].filter(i => i.type.startsWith('image/'));
    if (!images.length || !activePg()) return;
    e.preventDefault();
    images.forEach(item => {
      const reader = new FileReader();
      reader.onload = ev => {
        createBlockAtCanvasPos(200 + Math.random() * 40, 150 + Math.random() * 40,
          `<img src="${ev.target.result}" style="max-width:100%;height:auto;">`);
      };
      reader.readAsDataURL(item.getAsFile());
    });
  });
}

// ─────────────────────────────────────────────────────────
//  Format toolbar
// ─────────────────────────────────────────────────────────
function applyFormat(cmd) {
  switch (cmd) {
    case 'bold':          document.execCommand('bold');  break;
    case 'italic':        document.execCommand('italic'); break;
    case 'underline':     document.execCommand('underline'); break;
    case 'strikethrough': document.execCommand('strikeThrough'); break;
    case 'h1': document.execCommand('formatBlock', false, 'h1'); break;
    case 'h2': document.execCommand('formatBlock', false, 'h2'); break;
    case 'h3': document.execCommand('formatBlock', false, 'h3'); break;
    case 'p':  document.execCommand('formatBlock', false, 'p');  break;
    case 'ul': document.execCommand('insertUnorderedList'); break;
    case 'ol': document.execCommand('insertOrderedList');  break;
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
      e.preventDefault(); // Don't steal focus from contenteditable
      applyFormat(btn.dataset.cmd);
    });
  });

  // "+ Block" button
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

    if (mod && !e.shiftKey) {
      switch (e.key.toLowerCase()) {
        case 'b': if (inBlock) { e.preventDefault(); applyFormat('bold'); }      break;
        case 'i': if (inBlock) { e.preventDefault(); applyFormat('italic'); }    break;
        case 'u': if (inBlock) { e.preventDefault(); applyFormat('underline'); } break;
        case 's': e.preventDefault(); doSave(); break;
        case '=': case '+':
          // Zoom in
          e.preventDefault();
          view.zoom = Math.min(5, view.zoom * 1.15);
          applyCanvasTransform(); break;
        case '-':
          // Zoom out
          e.preventDefault();
          view.zoom = Math.max(0.2, view.zoom / 1.15);
          applyCanvasTransform(); break;
        case '0':
          // Reset zoom
          e.preventDefault();
          view.zoom = 1; view.panX = 0; view.panY = 0;
          applyCanvasTransform(); break;
      }
    }

    if (e.key === 'Escape') {
      removeCtxMenu();
      $$('.block.selected').forEach(el => el.classList.remove('selected'));
      selectedBlockId = null;
      document.activeElement?.blur?.();
    }

    // Delete selected block with Delete/Backspace when not in a text field
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
          id: uid(), x: 60, y: 80, width: 360, height: 130,
          content:
            '<h2>Welcome to Notes!</h2>' +
            '<p>Double-click anywhere on the canvas to create a new block.</p>' +
            '<p>Drag images onto the canvas to create image blocks.</p>',
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
