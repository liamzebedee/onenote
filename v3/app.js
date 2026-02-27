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

// Multi-select: set of block IDs
let selectedBlockIds = new Set();

// Space key held → canvas pan mode
let spaceDown = false;

let dirHandle = null;
let saveTimer = null;

// ─────────────────────────────────────────────────────────
//  Utilities
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
const activePg  = () => findPage(ui.activePageId);

// Recursive page search
function findPage(pageId) {
  if (!pageId) return null;
  function search(pages) {
    for (const p of pages) {
      if (p.id === pageId) return p;
      if (p.children?.length) {
        const found = search(p.children);
        if (found) return found;
      }
    }
    return null;
  }
  for (const nb of state.notebooks)
    for (const sec of nb.sections) {
      const found = search(sec.pages);
      if (found) return found;
    }
  return null;
}

function findSection(sectionId) {
  for (const nb of state.notebooks)
    for (const sec of nb.sections)
      if (sec.id === sectionId) return sec;
  return null;
}

function findNotebookForSection(sectionId) {
  for (const nb of state.notebooks)
    for (const sec of nb.sections)
      if (sec.id === sectionId) return nb;
  return null;
}

// Remove a page from wherever it lives (section or parent page)
function removePageFromTree(pageId) {
  function removeFrom(arr) {
    const idx = arr.findIndex(p => p.id === pageId);
    if (idx >= 0) { arr.splice(idx, 1); return true; }
    for (const p of arr) {
      if (p.children?.length && removeFrom(p.children)) return true;
    }
    return false;
  }
  for (const nb of state.notebooks)
    for (const sec of nb.sections)
      if (removeFrom(sec.pages)) return;
}

function isDescendantOf(ancestorPage, pageId) {
  if (!ancestorPage.children?.length) return false;
  for (const c of ancestorPage.children) {
    if (c.id === pageId || isDescendantOf(c, pageId)) return true;
  }
  return false;
}

// ─────────────────────────────────────────────────────────
//  Default block management
// ─────────────────────────────────────────────────────────
function ensureDefaultBlock(page) {
  if (!page) return;
  // If page has a defaultBlockId that exists, nothing to do
  if (page.defaultBlockId && page.blocks.find(b => b.id === page.defaultBlockId)) return;

  // Create or recreate default block
  const defaultBlock = {
    id: page.defaultBlockId || uid(),
    x: 0, y: 0,
    width: 340,
    content: '',
    isDefault: true,
  };
  page.defaultBlockId = defaultBlock.id;
  // Insert at front
  page.blocks = [defaultBlock, ...page.blocks.filter(b => !b.isDefault)];
}

function createNewPage() {
  const id = uid();
  const defId = uid();
  return {
    id,
    title: 'Untitled Page',
    defaultBlockId: defId,
    blocks: [{
      id: defId, x: 0, y: 0, width: 340,
      content: '', isDefault: true,
    }],
    children: [],
    collapsed: false,
  };
}

// ─────────────────────────────────────────────────────────
//  History (undo / redo) — per-page snapshots
// ─────────────────────────────────────────────────────────
const pageHistory = new Map();

function getHistory(pageId) {
  if (!pageHistory.has(pageId)) pageHistory.set(pageId, { stack: [], cursor: -1 });
  return pageHistory.get(pageId);
}

function historyPush() {
  const page = activePg();
  if (!page) return;
  syncDOM();
  const h = getHistory(page.id);
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
  page.title   = snapshot.title;
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
  localStorage.setItem('onenote-v3', json);

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
  // Try v3 key first, fall back to v2 for migration
  const raw = localStorage.getItem('onenote-v3') || localStorage.getItem('onenote-v2');
  if (raw) {
    try { state = JSON.parse(raw); } catch { state = { notebooks: [] }; }
    // Migrate pages: ensure children array and defaultBlock
    for (const nb of state.notebooks)
      for (const sec of nb.sections)
        migratePages(sec.pages);
  }
}

function migratePages(pages) {
  for (const p of pages) {
    if (!p.children) p.children = [];
    if (p.collapsed === undefined) p.collapsed = false;
    ensureDefaultBlock(p);
    migratePages(p.children);
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
      for (const nb of state.notebooks)
        for (const sec of nb.sections)
          migratePages(sec.pages);
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
  const page = createNewPage();
  sec.pages.push(page);
  ui.activePageId = page.id;
  view = { panX: 0, panY: 0, zoom: 1 };
  scheduleSave(); renderPages(); renderCanvas();
}

function addSubpage(parentPageId) {
  const parent = findPage(parentPageId);
  if (!parent) return;
  if (!parent.children) parent.children = [];
  const newPage = createNewPage();
  parent.children.push(newPage);
  parent.collapsed = false;
  ui.activePageId = newPage.id;
  view = { panX: 0, panY: 0, zoom: 1 };
  scheduleSave();
  renderPages();
  renderCanvas();
}

function movePageToSection(pageId, targetSectionId) {
  const page = findPage(pageId);
  if (!page) return;
  removePageFromTree(pageId);
  const targetSec = findSection(targetSectionId);
  if (targetSec) {
    targetSec.pages.push(page);
    ui.activeSectionId = targetSectionId;
    ui.activePageId = page.id;
    scheduleSave();
    renderSections();
    renderPages();
    renderCanvas();
  }
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
  const hasChildren = page.children?.length > 0;
  const msg = hasChildren
    ? `Delete page "${page.title}" and all its subpages?`
    : `Delete page "${page.title}"?`;
  if (!confirm(msg)) return;
  const wasActive = ui.activePageId === page.id || isDescendantOf(page, ui.activePageId);
  removePageFromTree(page.id);
  if (wasActive) {
    ui.activePageId = activeSec()?.pages[0]?.id ?? null;
  }
  scheduleSave(); renderPages(); renderCanvas();
}

function deleteBlock(blockId) {
  const page = activePg();
  if (!page) return;
  const block = page.blocks.find(b => b.id === blockId);
  if (block?.isDefault) return; // Cannot delete default block
  historyPush();
  page.blocks = page.blocks.filter(b => b.id !== blockId);
  selectedBlockIds.delete(blockId);
  updateBlockSelection();
  scheduleSave(); renderCanvas();
}

// ─────────────────────────────────────────────────────────
//  Block selection
// ─────────────────────────────────────────────────────────
function updateBlockSelection() {
  $$('.block[data-block-id]').forEach(el => {
    el.classList.toggle('selected', selectedBlockIds.has(el.dataset.blockId));
  });
}

function selectBlock(blockId, additive = false) {
  if (!additive) selectedBlockIds.clear();
  selectedBlockIds.add(blockId);
  updateBlockSelection();
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
    } else if (item.header) {
      const mi = mk('div', { className: 'ctx-item muted' });
      mi.textContent = item.label;
      menu.appendChild(mi);
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

function showPageCtxMenu(e, page) {
  const nb = findNotebookForSection(ui.activeSectionId);
  const otherSections = (nb?.sections ?? []).filter(s => s.id !== ui.activeSectionId);

  const items = [
    { label: 'Rename',      action: () => renamePage(page) },
    { label: 'Add subpage', action: () => addSubpage(page.id) },
  ];

  if (otherSections.length > 0) {
    items.push('sep');
    items.push({ label: 'Move to section', header: true });
    otherSections.forEach(s => {
      items.push({ label: s.title, action: () => movePageToSection(page.id, s.id) });
    });
  }

  items.push('sep');
  items.push({ label: 'Delete page', action: () => deletePage(page), danger: true });
  showCtxMenu(e, items);
}

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

function renderPageItem(page, depth, container) {
  const hasChildren = page.children?.length > 0;
  const isActive = page.id === ui.activePageId;

  const item = mk('div', {
    className: 'list-item page-item' + (isActive ? ' active' : ''),
  });
  item.dataset.pageId = page.id;
  // Indent based on depth (base 12px + 16px per level)
  item.style.paddingLeft = (depth * 16 + (hasChildren ? 4 : 20)) + 'px';

  if (hasChildren) {
    const toggle = mk('span', { className: 'page-toggle' });
    toggle.textContent = page.collapsed ? '▶' : '▼';
    toggle.title = page.collapsed ? 'Expand' : 'Collapse';
    toggle.onclick = e => {
      e.stopPropagation();
      page.collapsed = !page.collapsed;
      scheduleSave();
      renderPages();
    };
    item.appendChild(toggle);
  }

  const label = mk('span', { className: 'page-label' });
  label.textContent = page.title;
  item.appendChild(label);

  item.onclick = () => switchPage(page.id);
  item.ondblclick = e => { e.stopPropagation(); renamePage(page); };
  item.oncontextmenu = e => { e.preventDefault(); showPageCtxMenu(e, page); };

  container.appendChild(item);

  if (hasChildren && !page.collapsed) {
    page.children.forEach(child => renderPageItem(child, depth + 1, container));
  }
}

function renderPages() {
  const list = $('#pages-list');
  list.innerHTML = '';
  (activeSec()?.pages ?? []).forEach(page => renderPageItem(page, 0, list));
}

function renderCanvas() {
  const inner = $('#canvas-inner');
  inner.innerHTML = '';
  selectedBlockIds.clear();
  applyCanvasTransform();

  const page = activePg();
  const titleEl = $('#page-title');
  const titleBar = $('#page-title-bar');

  if (!page) {
    if (titleEl) { titleEl.contentEditable = 'false'; titleEl.textContent = ''; }
    if (titleBar) titleBar.onclick = null;
    const empty = mk('div', { className: 'canvas-empty' });
    empty.innerHTML =
      '<p>No page selected</p>' +
      '<p style="font-size:12px;margin-top:6px;color:#ccc">Create a notebook, section, and page to get started</p>';
    inner.appendChild(empty);
    return;
  }

  ensureDefaultBlock(page);

  if (titleEl) {
    titleEl.contentEditable = 'true';
    titleEl.textContent = page.title;
    titleEl.oninput = () => {
      page.title = titleEl.textContent.trim() || 'Untitled';
      renderPages(); scheduleSave();
    };
    titleEl.onkeydown = e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        // Move focus to default block
        const defBlock = page.blocks.find(b => b.isDefault);
        if (defBlock) {
          const defEl = inner.querySelector(`.block[data-block-id="${defBlock.id}"] .block-content`);
          if (defEl) {
            defEl.focus();
            // Move cursor to end
            const range = document.createRange();
            range.selectNodeContents(defEl);
            range.collapse(false);
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
          }
        }
      }
    };
  }

  // Entire title bar area is a click target for the title
  if (titleBar) {
    titleBar.onclick = e => {
      if (e.target === titleBar) {
        titleEl.focus();
        const range = document.createRange();
        range.selectNodeContents(titleEl);
        range.collapse(false);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
      }
    };
  }

  page.blocks.forEach(b => inner.appendChild(makeBlockEl(b)));

  if (getHistory(page.id).stack.length === 0) historyPush();
}

// ─────────────────────────────────────────────────────────
//  Block image-only detection
// ─────────────────────────────────────────────────────────
function isImageOnlyContent(html) {
  if (!html?.trim()) return false;
  const div = document.createElement('div');
  div.innerHTML = html;
  const nodes = [...div.childNodes].filter(n =>
    n.nodeType === Node.ELEMENT_NODE ||
    (n.nodeType === Node.TEXT_NODE && n.textContent.trim())
  );
  return nodes.length === 1 && nodes[0].nodeName === 'IMG';
}

// ─────────────────────────────────────────────────────────
//  Block DOM element
// ─────────────────────────────────────────────────────────
function makeBlockEl(block) {
  const isDefault  = !!block.isDefault;
  const isCodeBlk  = !!block.isCode;
  const isImgOnly  = isImageOnlyContent(block.content);

  let cls = 'block';
  if (isDefault)  cls += ' default-block';
  if (isCodeBlk)  cls += ' code-block';
  if (isImgOnly)  cls += ' image-only';
  if (selectedBlockIds.has(block.id)) cls += ' selected';

  const wrapper = mk('div', { className: cls });
  wrapper.dataset.blockId = block.id;
  wrapper.style.left  = block.x + 'px';
  wrapper.style.top   = block.y + 'px';
  wrapper.style.width = block.width + 'px';

  // ── Drag handle (top)
  if (!isDefault) {
    const handle = mk('div', { className: 'block-handle' });
    const delBtn = mk('button', { className: 'block-delete', title: 'Delete block' });
    delBtn.textContent = '×';
    delBtn.onclick = e => { e.stopPropagation(); deleteBlock(block.id); };
    handle.appendChild(delBtn);
    addDragMove(handle, wrapper, block);
    wrapper.appendChild(handle);
  }

  // ── Width-only resize handle (top-right)
  if (!isDefault) {
    const resizeHandle = mk('div', { className: 'block-resize' });
    addDragResize(resizeHandle, wrapper, block);
    wrapper.appendChild(resizeHandle);
  }

  // ── Content
  const content = mk('div', { className: 'block-content' });
  content.contentEditable = 'true';
  content.innerHTML = block.content || '';
  content.spellcheck = !isCodeBlk;

  content.addEventListener('focus', () => {
    selectBlock(block.id);
  });

  content.addEventListener('blur', () => {
    block.content = content.innerHTML;
    // Auto-delete empty non-default blocks
    if (!block.isDefault) {
      const isEmpty = content.textContent.trim() === '' && !content.querySelector('img');
      if (isEmpty) {
        deleteBlock(block.id);
        return;
      }
    }
    scheduleSave();
    // Update image-only class
    wrapper.classList.toggle('image-only', isImageOnlyContent(block.content));
  });

  content.addEventListener('input', () => {
    block.content = content.innerHTML;
    scheduleSave();
    scheduleTextHistoryPush();
    wrapper.classList.toggle('image-only', isImageOnlyContent(block.content));
  });

  content.addEventListener('keydown', e => {
    if (isCodeBlk) {
      handleCodeBlockKeys(e, content);
    } else {
      tryMarkdownFormat(e, content, wrapper, block);
      handleListKeys(e, content);
    }
  });

  // Inline markdown triggers on keyup
  content.addEventListener('keyup', e => {
    if (isCodeBlk) return;
    if (e.key === '`') tryInlineCode(content);
    if (e.key === '*' || e.key === '_') tryInlineMarkdown(content);
  });

  wrapper.appendChild(content);

  return wrapper;
}

function addDragMove(handle, wrapper, block) {
  handle.addEventListener('mousedown', e => {
    if (e.target.classList.contains('block-delete')) return;
    e.preventDefault();

    // Determine moving set
    let movingIds;
    if (selectedBlockIds.has(block.id)) {
      movingIds = new Set(selectedBlockIds);
    } else {
      selectedBlockIds.clear();
      selectedBlockIds.add(block.id);
      updateBlockSelection();
      movingIds = new Set([block.id]);
    }

    const page = activePg();
    const startPos = new Map();
    movingIds.forEach(id => {
      const b = page.blocks.find(b => b.id === id);
      if (b && !b.isDefault) startPos.set(id, { x: b.x, y: b.y });
    });

    const sx = e.clientX, sy = e.clientY;
    let moved = false;

    const onMove = ev => {
      const dx = (ev.clientX - sx) / view.zoom;
      const dy = (ev.clientY - sy) / view.zoom;
      if (Math.hypot(dx, dy) > 2) moved = true;
      startPos.forEach(({ x, y }, id) => {
        const b = page.blocks.find(b => b.id === id);
        if (!b) return;
        b.x = x + dx;
        b.y = y + dy;
        const el = document.querySelector(`.block[data-block-id="${id}"]`);
        if (el) { el.style.left = b.x + 'px'; el.style.top = b.y + 'px'; }
      });
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

function addDragResize(handle, wrapper, block) {
  handle.addEventListener('mousedown', e => {
    e.preventDefault();
    e.stopPropagation();
    const sx = e.clientX, sw = block.width;

    const onMove = ev => {
      block.width = Math.max(120, sw + (ev.clientX - sx) / view.zoom);
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

function screenToCanvas(sx, sy) {
  return {
    x: (sx - view.panX) / view.zoom,
    y: (sy - view.panY) / view.zoom,
  };
}

function createBlockAtCanvasPos(cx, cy) {
  const page = activePg();
  if (!page) return null;
  const block = {
    id: uid(),
    x: Math.max(0, cx - 125),
    y: Math.max(0, cy - 18),
    width: 260,
    content: '',
  };
  historyPush();
  page.blocks.push(block);
  scheduleSave();
  const el = makeBlockEl(block);
  $('#canvas-inner').appendChild(el);
  selectedBlockIds.clear();
  selectedBlockIds.add(block.id);
  updateBlockSelection();
  historyPush();
  return el;
}

// ─────────────────────────────────────────────────────────
//  Canvas interaction events
// ─────────────────────────────────────────────────────────
function bindCanvasEvents() {
  const container = $('#canvas-container');
  const marqueeEl = $('#marquee-rect');

  container.addEventListener('mousedown', e => {
    const onCanvas = e.target === container || e.target === $('#canvas-inner');
    if (!onCanvas) return;

    // Middle-click → pan
    if (e.button === 1) {
      e.preventDefault();
      startPan(e, container);
      return;
    }

    if (e.button !== 0) return;

    // Space+drag → pan
    if (spaceDown) {
      e.preventDefault();
      startPan(e, container);
      return;
    }

    // Left click on canvas → marquee or single-click create
    const rect  = container.getBoundingClientRect();
    const startX = e.clientX - rect.left;
    const startY = e.clientY - rect.top;
    let dragging = false;

    const page = activePg();

    const onMove = ev => {
      const dx = ev.clientX - rect.left - startX;
      const dy = ev.clientY - rect.top  - startY;
      if (!dragging && Math.hypot(dx, dy) > 5) dragging = true;
      if (dragging) {
        const left   = Math.min(startX, ev.clientX - rect.left);
        const top    = Math.min(startY, ev.clientY - rect.top);
        const width  = Math.abs(ev.clientX - rect.left - startX);
        const height = Math.abs(ev.clientY - rect.top  - startY);
        marqueeEl.style.display = 'block';
        marqueeEl.style.left   = left   + 'px';
        marqueeEl.style.top    = top    + 'px';
        marqueeEl.style.width  = width  + 'px';
        marqueeEl.style.height = height + 'px';
      }
    };

    const onUp = ev => {
      marqueeEl.style.display = 'none';
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);

      if (dragging) {
        // Marquee select
        if (page) {
          const endX = ev.clientX - rect.left;
          const endY = ev.clientY - rect.top;
          const { x: mx, y: my } = screenToCanvas(Math.min(startX, endX), Math.min(startY, endY));
          const mw = Math.abs(endX - startX) / view.zoom;
          const mh = Math.abs(endY - startY) / view.zoom;

          selectedBlockIds.clear();
          page.blocks.forEach(block => {
            const blockEl = document.querySelector(`.block[data-block-id="${block.id}"]`);
            if (!blockEl) return;
            const bx = block.x, by = block.y;
            const bw = block.width;
            const bh = blockEl.offsetHeight;
            if (bx < mx + mw && bx + bw > mx && by < my + mh && by + bh > my) {
              selectedBlockIds.add(block.id);
            }
          });
          updateBlockSelection();
        }
      } else {
        // Pure click → deselect all, then create new block
        selectedBlockIds.clear();
        updateBlockSelection();
        if (page) {
          const { x, y } = screenToCanvas(startX, startY);
          const blockEl = createBlockAtCanvasPos(x, y);
          if (blockEl) setTimeout(() => blockEl.querySelector('.block-content').focus(), 10);
        }
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

  // Image drag-and-drop
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
        const block = {
          id: uid(), x: Math.max(0, x - 100), y: Math.max(0, y - 50), width: 280,
          content: `<img src="${ev.target.result}" style="max-width:100%;height:auto;">`,
        };
        historyPush();
        page.blocks.push(block);
        scheduleSave();
        $('#canvas-inner').appendChild(makeBlockEl(block));
        historyPush();
      };
      reader.readAsDataURL(file);
    });
  });

  // Paste image when not editing a block
  document.addEventListener('paste', e => {
    if (document.activeElement?.classList.contains('block-content')) return;
    const images = [...e.clipboardData.items].filter(i => i.type.startsWith('image/'));
    if (!images.length || !activePg()) return;
    e.preventDefault();
    images.forEach(item => {
      const reader = new FileReader();
      reader.onload = ev => {
        const page = activePg();
        if (!page) return;
        const block = {
          id: uid(), x: 160 + Math.random() * 40, y: 120 + Math.random() * 40, width: 280,
          content: `<img src="${ev.target.result}" style="max-width:100%;height:auto;">`,
        };
        historyPush();
        page.blocks.push(block);
        scheduleSave();
        $('#canvas-inner').appendChild(makeBlockEl(block));
        historyPush();
      };
      reader.readAsDataURL(item.getAsFile());
    });
  });
}

function startPan(e, container) {
  container.classList.add('panning');
  const sx = e.clientX, sy = e.clientY;
  const pvx = view.panX, pvy = view.panY;

  const onMove = ev => {
    view.panX = Math.max(0, pvx + (ev.clientX - sx));
    view.panY = Math.max(0, pvy + (ev.clientY - sy));
    applyCanvasTransform();
  };
  const onUp = () => {
    container.classList.remove('panning');
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onUp);
  };
  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', onUp);
}

// ─────────────────────────────────────────────────────────
//  Code block key handling
// ─────────────────────────────────────────────────────────
function handleCodeBlockKeys(e, contentEl) {
  if (e.key === 'Tab') {
    e.preventDefault();
    document.execCommand('insertText', false, '  ');
  }
}

// ─────────────────────────────────────────────────────────
//  List key handling (Tab / Shift+Tab sublists)
// ─────────────────────────────────────────────────────────
function isInsideList(contentEl) {
  const sel = window.getSelection();
  if (!sel?.rangeCount) return false;
  let node = sel.getRangeAt(0).commonAncestorContainer;
  while (node && node !== contentEl) {
    if (node.nodeName === 'LI') return true;
    node = node.parentNode;
  }
  return false;
}

function handleListKeys(e, contentEl) {
  if (e.key !== 'Tab') return;
  if (!isInsideList(contentEl)) return;
  e.preventDefault();
  if (e.shiftKey) {
    document.execCommand('outdent');
  } else {
    document.execCommand('indent');
  }
}

// ─────────────────────────────────────────────────────────
//  Markdown formatting — block-level
// ─────────────────────────────────────────────────────────
function tryMarkdownFormat(e, contentEl, wrapper, block) {
  // Code block: ``` + Space or Enter when full content is ```
  if (e.key === ' ' || e.key === 'Enter') {
    const text = contentEl.textContent;
    if (text === '```') {
      e.preventDefault();
      block.isCode = true;
      block.content = '';
      contentEl.innerHTML = '';
      wrapper.classList.add('code-block');
      wrapper.classList.remove('default-block');
      contentEl.spellcheck = false;
      return;
    }
  }

  if (e.key !== ' ') return;

  const sel = window.getSelection();
  if (!sel || !sel.isCollapsed) return;

  const range = sel.getRangeAt(0);
  const node = range.startContainer;
  if (node.nodeType !== Node.TEXT_NODE) return;

  const before = node.textContent.slice(0, range.startOffset);

  const map = {
    '#':    () => { e.preventDefault(); clearAndFormat(node, range, sel, 'h1'); },
    '##':   () => { e.preventDefault(); clearAndFormat(node, range, sel, 'h2'); },
    '###':  () => { e.preventDefault(); clearAndFormat(node, range, sel, 'h3'); },
    '####': () => { e.preventDefault(); clearAndFormat(node, range, sel, 'h4'); },
    '-':    () => { e.preventDefault(); clearAndFormatList(node, range, sel, 'ul'); },
    '*':    () => { e.preventDefault(); clearAndFormatList(node, range, sel, 'ul'); },
    '1.':   () => { e.preventDefault(); clearAndFormatList(node, range, sel, 'ol'); },
    '>':    () => { e.preventDefault(); clearAndFormat(node, range, sel, 'blockquote'); },
  };

  if (map[before]) map[before]();
}

function clearAndFormat(node, range, sel, tag) {
  const del = document.createRange();
  del.setStart(node, 0);
  del.setEnd(node, range.startOffset);
  sel.removeAllRanges();
  sel.addRange(del);
  document.execCommand('delete');
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
//  Inline markdown (** * _ __ and ` `)
// ─────────────────────────────────────────────────────────
function tryInlineCode(contentEl) {
  const sel = window.getSelection();
  if (!sel?.isCollapsed) return;
  const range = sel.getRangeAt(0);
  const node = range.startContainer;
  if (node.nodeType !== Node.TEXT_NODE) return;
  const upTo = node.textContent.slice(0, range.startOffset);
  const match = /`([^`]+)`$/.exec(upTo);
  if (match) {
    applyInlineTag(node, range.startOffset - match[0].length, range.startOffset, match[1], 'code', sel);
  }
}

function tryInlineMarkdown(contentEl) {
  const sel = window.getSelection();
  if (!sel?.isCollapsed) return;
  const range = sel.getRangeAt(0);
  const node = range.startContainer;
  if (node.nodeType !== Node.TEXT_NODE) return;
  const upTo = node.textContent.slice(0, range.startOffset);

  const boldMatch  = /\*\*([^*]+)\*\*$/.exec(upTo);
  if (boldMatch)  { applyInlineTag(node, range.startOffset - boldMatch[0].length,  range.startOffset, boldMatch[1],  'strong', sel); return; }

  const bold2Match = /__([^_]+)__$/.exec(upTo);
  if (bold2Match) { applyInlineTag(node, range.startOffset - bold2Match[0].length, range.startOffset, bold2Match[1], 'strong', sel); return; }

  const italicMatch = /(?<!\*)\*([^*]+)\*$/.exec(upTo);
  if (italicMatch) { applyInlineTag(node, range.startOffset - italicMatch[0].length, range.startOffset, italicMatch[1], 'em', sel); return; }

  const italic2Match = /(?<!_)_([^_]+)_$/.exec(upTo);
  if (italic2Match) { applyInlineTag(node, range.startOffset - italic2Match[0].length, range.startOffset, italic2Match[1], 'em', sel); }
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
    case 'h4': document.execCommand('formatBlock', false, 'h4'); break;
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
  const container = $('#canvas-container');

  // Track Space key for pan mode
  document.addEventListener('keydown', e => {
    if (e.key === ' ' && !document.activeElement?.classList.contains('block-content')
                      && document.activeElement !== $('#page-title')) {
      spaceDown = true;
      container.classList.add('pan-mode');
    }
  });
  document.addEventListener('keyup', e => {
    if (e.key === ' ') {
      spaceDown = false;
      container.classList.remove('pan-mode');
      container.classList.remove('panning');
    }
  });

  document.addEventListener('keydown', e => {
    const inBlock = document.activeElement?.classList.contains('block-content');
    const inTitle = document.activeElement === $('#page-title');
    const mod = e.ctrlKey || e.metaKey;

    if (mod) {
      if (e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        historyUndo();
        return;
      }
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
      selectedBlockIds.clear();
      updateBlockSelection();
      if (!inTitle) document.activeElement?.blur?.();
    }

    if ((e.key === 'Delete' || e.key === 'Backspace') && !inBlock && !inTitle && selectedBlockIds.size > 0) {
      e.preventDefault();
      const page = activePg();
      if (!page) return;
      historyPush();
      page.blocks = page.blocks.filter(b => !selectedBlockIds.has(b.id) || b.isDefault);
      selectedBlockIds.clear();
      scheduleSave();
      renderCanvas();
    }
  });
}

// ─────────────────────────────────────────────────────────
//  Init
// ─────────────────────────────────────────────────────────
function createDefaultData() {
  const nbId = uid(), secId = uid();
  const welcomePage = createNewPage();
  welcomePage.title = 'Welcome';
  welcomePage.blocks = [
    {
      id: welcomePage.defaultBlockId,
      x: 0, y: 0, width: 400,
      content:
        '<h2>Welcome to Notes!</h2>' +
        '<p>This is your default block — always here, always first.</p>',
      isDefault: true,
    },
    {
      id: uid(), x: 60, y: 120, width: 340,
      content:
        '<p>Click anywhere on the canvas to create a new block.</p>' +
        '<p>Hold <strong>Space</strong> and drag to pan · <strong>Ctrl+scroll</strong> to zoom.</p>' +
        '<p>Drag on empty canvas to select multiple blocks.</p>',
    },
  ];

  state.notebooks = [{
    id: nbId, title: 'Personal',
    sections: [{
      id: secId, title: 'General',
      pages: [welcomePage],
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
