import { createContext } from 'preact';
import { useRef, useEffect, useLayoutEffect, useState, useCallback } from 'preact/hooks';
import { Block } from './Block.jsx';
import { appState, addBlock, deleteBlock, updateBlockPos, updateBlockWidth, updateBlockSrc, updateBlockZ, addImageFromFile, addImageFromUrl, updatePageView, updatePageTitle, updatePageTitleAndRefresh, getActivePage, startClaudeChat, preloadCache, savePageCaret, lastCaretPerPage, DEFAULT_BLOCK_WIDTH, uid } from './store.js';
import { openContextMenu } from './ContextMenu.jsx';
import { pushUndo, applyUndo, applyRedo } from './undo.js';
import { execFmt } from './editor.js';
import { initPasteHandler } from './clipboard.js';

export const CanvasCtx = createContext(null);

// ─── FormatToolbar ───────────────────────────────────────

export function FormatToolbar() {
  const btns = [
    { cmd: 'bold',          node: <b>B</b>,   title: 'Bold' },
    { cmd: 'italic',        node: <i>I</i>,   title: 'Italic' },
    { cmd: 'underline',     node: <u>U</u>,   title: 'Underline' },
    { cmd: 'strikethrough', node: <s>S</s>,   title: 'Strikethrough' },
    null,
    { cmd: 'h1', node: 'H1', title: 'Heading 1' },
    { cmd: 'h2', node: 'H2', title: 'Heading 2' },
    { cmd: 'h3', node: 'H3', title: 'Heading 3' },
    { cmd: 'h4', node: 'H4', title: 'Heading 4' },
    { cmd: 'p',  node: 'P',  title: 'Paragraph' },
    null,
    { cmd: 'ul', node: '• List', title: 'Bullet list' },
    { cmd: 'ol', node: '1. List', title: 'Numbered list' },
    { cmd: 'link', node: '⌘K', title: 'Insert link' },
  ];
  return (
    <>
      <div id="titlebar">
        <span class="toolbar-title">Notebound</span>
        {!/Mac/.test(navigator.platform) && (
          <div class="window-controls">
            <button class="wc-btn wc-minimize" onClick={() => window.windowControls.minimize()} title="Minimize">
              <svg width="10" height="1" viewBox="0 0 10 1"><rect width="10" height="1" fill="currentColor"/></svg>
            </button>
            <button class="wc-btn wc-maximize" onClick={() => window.windowControls.maximize()} title="Maximize">
              <svg width="10" height="10" viewBox="0 0 10 10"><rect x="0.5" y="0.5" width="9" height="9" fill="none" stroke="currentColor" stroke-width="1"/></svg>
            </button>
            <button class="wc-btn wc-close" onClick={() => window.windowControls.close()} title="Close">
              <svg width="10" height="10" viewBox="0 0 10 10"><line x1="0" y1="0" x2="10" y2="10" stroke="currentColor" stroke-width="1.2"/><line x1="10" y1="0" x2="0" y2="10" stroke="currentColor" stroke-width="1.2"/></svg>
            </button>
          </div>
        )}
      </div>
      <div id="format-toolbar">
        {btns.map((b, i) => b === null
          ? <span key={i} class="fmt-sep" />
          : <button key={b.cmd} class="fmt-btn" title={b.title} onMouseDown={e => { e.preventDefault(); execFmt(b.cmd); }}>{b.node}</button>
        )}
        <span class="fmt-sep" />
        <button
          class="fmt-btn"
          title="Add checklist"
          onMouseDown={e => {
            e.preventDefault();
            const pg = getActivePage();
            let y = 60;
            if (pg?.blocks?.length) {
              y = Math.max(...pg.blocks.map(b => b.y + 100)) + 40;
            }
            const itemId = uid();
            addBlock(28, y, DEFAULT_BLOCK_WIDTH, 'checklist', { items: [{ id: itemId, text: '', checked: false }] });
            requestAnimationFrame(() => {
              const el = document.querySelector(`[data-item-id="${itemId}"]`);
              el?.focus();
            });
          }}
        >☑ List</button>
        <span class="fmt-sep" />
        <button
          class="fmt-btn fmt-btn--wand"
          title="Drag onto canvas to chat with Claude"
          draggable
          onDragStart={e => { e.dataTransfer.setData('application/x-notebound-claude', '1'); }}
        >✨</button>
        <span class="canvas-hint">Click to add block · Space+drag to pan · Ctrl+scroll zoom</span>
        {window.notebook?.webPublish && (
          <>
            <span class="fmt-sep" />
            <button class="fmt-btn fmt-btn--publish" title="Publish to web" onMouseDown={async e => {
              e.preventDefault();
              const btn = e.currentTarget;
              btn.textContent = '⏳';
              try { await window.notebook.webPublish(); btn.textContent = '🌐 Publish'; }
              catch (err) { btn.textContent = '🌐 Publish'; console.error('Publish failed:', err); }
            }}>🌐 Publish</button>
            <button class="fmt-btn" title="Open published site" onMouseDown={e => {
              e.preventDefault();
              window.notebook.webOpenSite();
            }}>↗ Open</button>
          </>
        )}
      </div>
    </>
  );
}

// ─── PageTitle ───────────────────────────────────────────

function getCaretOffset(el) {
  const sel = window.getSelection();
  if (!sel.rangeCount || !el.contains(sel.anchorNode)) return 0;
  const range = document.createRange();
  range.selectNodeContents(el);
  range.setEnd(sel.anchorNode, sel.anchorOffset);
  return range.toString().length;
}

function setCaretOffset(el, offset) {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  let pos = 0;
  while (walker.nextNode()) {
    const node = walker.currentNode;
    const len = node.textContent.length;
    if (pos + len >= offset) {
      const sel = window.getSelection();
      const range = document.createRange();
      range.setStart(node, Math.min(offset - pos, len));
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
      return;
    }
    pos += len;
  }
}

function hasNonEmptyBlocks(page) {
  return page.blocks.some(b => b.type === 'image' || (b.html && b.html !== '<br>' && b.html.trim() !== ''));
}

function PageTitle({ page, onEnter }) {
  const ref = useRef(null);
  const editing = useRef(false);

  useLayoutEffect(() => {
    if (ref.current && !editing.current) ref.current.textContent = page?.title ?? '';
  }, [page?.id, page?.title]);

  // On page switch: restore last caret position, or focus title if empty page
  useEffect(() => {
    if (!page) return;
    if (hasNonEmptyBlocks(page)) {
      const saved = lastCaretPerPage.get(page.id);
      if (saved) {
        requestAnimationFrame(() => {
          const el = document.querySelector(`[data-block-id="${saved.blockId}"] .block-content`);
          if (el) {
            el.focus();
            setCaretOffset(el, saved.offset);
          }
        });
        return;
      }
    }
    // Empty page — focus title at end
    const el = ref.current;
    if (el) {
      el.focus();
      const sel = window.getSelection();
      sel.selectAllChildren(el);
      sel.collapseToEnd();
    }
  }, [page?.id]);

  if (!page) return <div id="page-title-bar" />;

  const dateStr = page.createdAt
    ? new Date(page.createdAt).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    : null;

  return (
    <div id="page-title-bar" onClick={() => ref.current?.focus()}>
      <div
        ref={ref}
        id="page-title"
        contentEditable
        suppressContentEditableWarning
        onFocus={() => { editing.current = true; }}
        onBlur={e => {
          editing.current = false;
          const title = e.target.textContent.trim() || 'Untitled Page';
          updatePageTitleAndRefresh(page.id, title);
        }}
        onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); onEnter?.(); } }}
        onInput={e => { updatePageTitle(page.id, e.target.textContent); }}
        onContextMenu={e => {
          e.preventDefault();
          e.stopPropagation();
          const selText = window.getSelection().toString();
          const items = [];
          if (selText) {
            items.push({ label: 'Copy', action: () => document.execCommand('copy') });
          } else {
            items.push({ label: 'Copy', disabled: true });
          }
          items.push({ label: 'Paste', action: () => {
            navigator.clipboard.readText().then(text => {
              if (text) document.execCommand('insertText', false, text);
            });
          }});
          if (selText) {
            items.push({ type: 'separator' });
            const q = encodeURIComponent(selText);
            items.push({ label: 'Search with Google', action: () => {
              window.notebook?.openExternal('https://www.google.com/search?q=' + q);
            }});
            items.push({ label: 'Ask ChatGPT', action: () => {
              window.notebook?.openExternal('https://chatgpt.com/?q=' + q);
            }});
          }
          openContextMenu(e.clientX, e.clientY, items);
        }}
      />
      {dateStr && <div class="page-date">{dateStr}</div>}
    </div>
  );
}

// ─── Canvas ──────────────────────────────────────────────

export function Canvas({ page }) {
  const containerRef = useRef(null);   // scroll container
  const sizerRef = useRef(null);       // sets scrollable extent
  const innerRef = useRef(null);       // scaled content div
  const marqueeRef = useRef(null);
  const viewRef = useRef({ zoom: 1 }); // only zoom; pan lives in scrollLeft/scrollTop
  const pageRef = useRef(page);
  const spaceHeld = useRef(false);
  const scrollSaveTimer = useRef(null);

  // Page transition: fade out old, then fade in new
  const [transition, setTransition] = useState(null); // { outId, inId, phase: 'out'|'in' }
  const prevPageIdRef = useRef(page?.id);
  const transitionTimers = useRef({});

  useEffect(() => {
    const newId = page?.id;
    const oldId = prevPageIdRef.current;
    if (!newId || !oldId || newId === oldId) { prevPageIdRef.current = newId; return; }
    prevPageIdRef.current = newId;
    clearTimeout(transitionTimers.current.t1);
    clearTimeout(transitionTimers.current.t2);
    setTransition({ outId: oldId, inId: newId, phase: 'out' });
    transitionTimers.current.t1 = setTimeout(() => {
      setTransition({ outId: oldId, inId: newId, phase: 'in' });
      transitionTimers.current.t2 = setTimeout(() => setTransition(null), 125);
    }, 125);
  }, [page?.id]);

  // Keep-alive cache: pageId → page object. Grows as pages are visited.
  // Blocks are never unmounted — inactive pages are hidden with display:none.
  // preloadCache (signal) holds pages pre-rendered before the user visits them.
  // pageCacheRef holds visited pages; it overrides preloadCache for the same pageId.
  const pageCacheRef = useRef(new Map());
  if (page) pageCacheRef.current.set(page.id, page);
  const cachedPages = [...new Map([...preloadCache.value, ...pageCacheRef.current]).values()];

  // Selected block IDs
  const [selectedIds, setSelectedIds] = useState(new Set());
  const selectedRef = useRef(selectedIds);

  // Keep pageRef current on every render
  useEffect(() => { pageRef.current = page; });

  function setSelected(ids) {
    selectedRef.current = ids;
    setSelectedIds(new Set(ids));
  }

  // ── Sizer: sets scrollable area to match scaled content ──

  function updateSizer(targetScrollLeft, targetScrollTop) {
    if (!sizerRef.current || !containerRef.current) return;
    const pg = pageRef.current;
    const { zoom } = viewRef.current;
    let maxX = 0, maxY = 0;
    if (pg?.blocks?.length) {
      for (const b of pg.blocks) {
        maxX = Math.max(maxX, b.x + (b.w || DEFAULT_BLOCK_WIDTH));
        maxY = Math.max(maxY, b.y + 300);
      }
    }
    const rect = containerRef.current.getBoundingClientRect();
    const sl = targetScrollLeft ?? containerRef.current.scrollLeft;
    const st = targetScrollTop  ?? containerRef.current.scrollTop;
    // Total world size must accommodate: all blocks + enough to scroll to target position
    const totalW = Math.max(maxX + 200, (sl + rect.width)  / zoom + 200);
    const totalH = Math.max(maxY + 200, (st + rect.height) / zoom + 200);
    sizerRef.current.style.width  = (totalW * zoom) + 'px';
    sizerRef.current.style.height = (totalH * zoom) + 'px';
  }

  // ── Fixed zoom levels (menu zoom in/out/reset) ───────────

  const ZOOM_LEVELS = [0.5, 0.6, 0.75, 0.8, 1.0, 1.25, 1.5, 2.0];

  function applyZoom(nz) {
    const el = containerRef.current;
    if (!el || !innerRef.current) return;
    const { zoom } = viewRef.current;
    const mx = el.clientWidth / 2;
    const my = el.clientHeight / 2;
    const cx = (mx + el.scrollLeft) / zoom;
    const cy = (my + el.scrollTop) / zoom;
    const newScrollLeft = Math.max(0, cx * nz - mx);
    const newScrollTop  = Math.max(0, cy * nz - my);
    viewRef.current = { zoom: nz };
    innerRef.current.style.transform = `scale(${nz})`;
    updateSizer(newScrollLeft, newScrollTop);
    el.scrollLeft = newScrollLeft;
    el.scrollTop  = newScrollTop;
    updatePageView(newScrollLeft / nz, newScrollTop / nz, nz);
  }

  useEffect(() => {
    function onZoom(dir) {
      const cur = viewRef.current.zoom;
      let nz;
      if (dir === 'reset') {
        nz = 1.0;
      } else if (dir === 'in') {
        nz = ZOOM_LEVELS.find(l => l > cur + 0.01) ?? ZOOM_LEVELS[ZOOM_LEVELS.length - 1];
      } else {
        nz = [...ZOOM_LEVELS].reverse().find(l => l < cur - 0.01) ?? ZOOM_LEVELS[0];
      }
      applyZoom(nz);
    }
    window.notebook?.onCanvasZoom(onZoom);
    return () => window.notebook?.offCanvasZoom();
  }, []);

  // ── Sync view when page changes ──────────────────────────

  useLayoutEffect(() => {
    if (!page || !containerRef.current || !innerRef.current) return;
    const zoom = page.zoom ?? 1;
    viewRef.current = { zoom };
    innerRef.current.style.transform = `scale(${zoom})`;
    const targetLeft = (page.panX ?? 0) * zoom;
    const targetTop  = (page.panY ?? 0) * zoom;
    // Size sizer with target scroll before applying scroll (prevents browser clamping)
    updateSizer(targetLeft, targetTop);
    containerRef.current.scrollLeft = targetLeft;
    containerRef.current.scrollTop  = targetTop;
    setSelected(new Set());
  }, [page?.id]);

  // Recompute sizer whenever blocks change (add/resize/move)
  useEffect(() => { updateSizer(); }, [page?.blocks]);

  // ── Coordinate helpers ───────────────────────────────────

  function toCanvas(clientX, clientY) {
    const rect = containerRef.current.getBoundingClientRect();
    const { zoom } = viewRef.current;
    return {
      x: (clientX - rect.left + containerRef.current.scrollLeft) / zoom,
      y: (clientY - rect.top  + containerRef.current.scrollTop)  / zoom,
    };
  }

  function toScreen(clientX, clientY) {
    const rect = containerRef.current.getBoundingClientRect();
    return { x: clientX - rect.left, y: clientY - rect.top };
  }

  // ── Block drag ──────────────────────────────────────────

  const onBlockDragStart = useCallback((e, blockId) => {
    e.preventDefault();
    if (document.activeElement && document.activeElement !== document.body) {
      document.activeElement.blur();
    }
    const pg = getActivePage();
    if (!pg) return;

    if (!selectedRef.current.has(blockId)) {
      if (!e.shiftKey) setSelected(new Set([blockId]));
      else setSelected(new Set([...selectedRef.current, blockId]));
    }

    const ids = selectedRef.current.has(blockId)
      ? [...selectedRef.current]
      : [blockId];

    const origPos = new Map();
    for (const id of ids) {
      const el = innerRef.current?.querySelector(`[data-block-id="${id}"]`);
      if (el) origPos.set(id, { x: parseInt(el.style.left), y: parseInt(el.style.top) });
    }

    const startX = e.clientX, startY = e.clientY;
    const { zoom } = viewRef.current;

    function onMove(e2) {
      const dx = (e2.clientX - startX) / zoom;
      const dy = (e2.clientY - startY) / zoom;
      for (const [id, orig] of origPos) {
        const el = innerRef.current?.querySelector(`[data-block-id="${id}"]`);
        if (!el) continue;
        el.style.left = Math.max(0, orig.x + dx) + 'px';
        el.style.top  = Math.max(0, orig.y + dy) + 'px';
      }
    }

    function onUp() {
      const moves = [];
      for (const [id, orig] of origPos) {
        moves.push({ id, x: orig.x, y: orig.y });
        const el = innerRef.current?.querySelector(`[data-block-id="${id}"]`);
        if (el) updateBlockPos(id, parseInt(el.style.left), parseInt(el.style.top));
      }
      pushUndo(pg.id, { type: 'move', moves });
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', onUp);
    }

    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', onUp);
  }, []);

  // ── Block resize ─────────────────────────────────────────

  const onBlockResizeStart = useCallback((e, blockId) => {
    e.preventDefault();
    const el = innerRef.current?.querySelector(`[data-block-id="${blockId}"]`);
    if (!el) return;
    const origW = parseInt(el.style.width) || DEFAULT_BLOCK_WIDTH;
    const startX = e.clientX;
    const pg = getActivePage();

    function onMove(e2) {
      const dx = (e2.clientX - startX) / viewRef.current.zoom;
      el.style.width = Math.max(120, origW + dx) + 'px';
    }
    function onUp() {
      if (pg) pushUndo(pg.id, { type: 'resize', id: blockId, w: origW });
      updateBlockWidth(blockId, parseInt(el.style.width));
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', onUp);
    }
    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', onUp);
  }, []);

  // ── Image resize ─────────────────────────────────────────

  const onImgResizeStart = useCallback((e, blockId, dir) => {
    e.preventDefault();
    const el = innerRef.current?.querySelector(`[data-block-id="${blockId}"]`);
    if (!el) return;
    const origW = el.offsetWidth;
    const origX = parseInt(el.style.left);
    const origY = parseInt(el.style.top);
    const startX = e.clientX;
    const pg = getActivePage();

    function onMove(e2) {
      const dx = (e2.clientX - startX) / viewRef.current.zoom;
      const newW = Math.max(40, origW + (dir.includes('e') ? dx : -dx));
      el.style.width = newW + 'px';
      if (dir.includes('w')) el.style.left = (origX - (newW - origW)) + 'px';
    }
    function onUp() {
      if (pg) pushUndo(pg.id, { type: 'resize', id: blockId, w: origW, x: origX, y: origY });
      updateBlockWidth(blockId, parseInt(el.style.width));
      updateBlockPos(blockId, parseInt(el.style.left), parseInt(el.style.top));
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', onUp);
    }
    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', onUp);
  }, []);

  // ── Pan (space+drag / middle-click) ──────────────────────

  function startPan(startClientX, startClientY) {
    const origLeft = containerRef.current.scrollLeft;
    const origTop  = containerRef.current.scrollTop;
    function onMove(e) {
      const dx = e.clientX - startClientX;
      const dy = e.clientY - startClientY;
      containerRef.current.scrollLeft = Math.max(0, origLeft - dx);
      containerRef.current.scrollTop  = Math.max(0, origTop  - dy);
    }
    function onUp() {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', onUp);
    }
    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', onUp);
  }

  // ── Marquee ───────────────────────────────────────────────

  function startMarquee(startClientX, startClientY) {
    const startScreen  = toScreen(startClientX, startClientY);
    const startCanvas  = toCanvas(startClientX, startClientY);

    const mq = marqueeRef.current;
    if (mq) { mq.style.display = 'block'; mq.style.left = '0'; mq.style.top = '0'; mq.style.width = '0'; mq.style.height = '0'; }

    function onMove(e) {
      const cur = toScreen(e.clientX, e.clientY);
      const x = Math.min(startScreen.x, cur.x);
      const y = Math.min(startScreen.y, cur.y);
      const w = Math.abs(cur.x - startScreen.x);
      const h = Math.abs(cur.y - startScreen.y);
      if (mq) { mq.style.left = x+'px'; mq.style.top = y+'px'; mq.style.width = w+'px'; mq.style.height = h+'px'; }
    }

    function onUp(e) {
      if (mq) mq.style.display = 'none';
      const endCanvas = toCanvas(e.clientX, e.clientY);
      const rx = Math.min(startCanvas.x, endCanvas.x);
      const ry = Math.min(startCanvas.y, endCanvas.y);
      const rw = Math.abs(endCanvas.x - startCanvas.x);
      const rh = Math.abs(endCanvas.y - startCanvas.y);

      if (rw > 4 || rh > 4) {
        const hits = new Set();
        innerRef.current?.querySelectorAll('.block').forEach(el => {
          const bx = parseInt(el.style.left), by = parseInt(el.style.top);
          const bw = el.offsetWidth, bh = el.offsetHeight;
          if (bx < rx+rw && bx+bw > rx && by < ry+rh && by+bh > ry) hits.add(el.dataset.blockId);
        });
        setSelected(hits);
      } else {
        setSelected(new Set());
      }

      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', onUp);
    }

    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', onUp);
  }

  // ── Canvas pointer down ───────────────────────────────────

  function handlePointerDown(e) {
    if (e.button === 1 || (e.button === 0 && spaceHeld.current)) {
      e.preventDefault();
      startPan(e.clientX, e.clientY);
      return;
    }
    if (e.button !== 0) return;

    if (document.activeElement && document.activeElement !== document.body) {
      document.activeElement.blur();
    }

    e.preventDefault();
    const startX = e.clientX, startY = e.clientY;
    let moved = false;
    let marqueeActive = false;

    function onMove(e2) {
      const dx = e2.clientX - startX, dy = e2.clientY - startY;
      if (!moved && Math.sqrt(dx*dx + dy*dy) > 4) {
        moved = true;
        marqueeActive = true;
        startMarquee(startX, startY);
      }
    }

    function onUp(e2) {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', onUp);
      if (!marqueeActive) {
        setSelected(new Set());
        const pos = toCanvas(startX, startY);
        addBlock(pos.x, pos.y);
        requestAnimationFrame(() => {
          const pg = getActivePage();
          if (!pg) return;
          const lastBlock = pg.blocks[pg.blocks.length - 1];
          if (!lastBlock) return;
          const el = innerRef.current?.querySelector(`[data-block-id="${lastBlock.id}"] .block-content`);
          el?.focus();
        });
      }
    }

    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', onUp);
  }

  // ── Scroll: save pan state (debounced) ───────────────────

  function handleScroll() {
    updateSizer();
    const { zoom } = viewRef.current;
    const panX = containerRef.current.scrollLeft / zoom;
    const panY = containerRef.current.scrollTop  / zoom;
    clearTimeout(scrollSaveTimer.current);
    scrollSaveTimer.current = setTimeout(() => {
      updatePageView(panX, panY, zoom);
    }, 150);
  }

  // ── Wheel: zoom only (pan is native) ─────────────────────

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    function onWheel(e) {
      if (!e.ctrlKey && !e.metaKey) return; // native scroll handles pan
      e.preventDefault();

      const { zoom } = viewRef.current;
      const rect = el.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const factor = e.deltaY < 0 ? 1.1 : 0.9;
      const nz = Math.max(0.2, Math.min(4, zoom * factor));

      // Canvas point under mouse — keep this fixed after zoom
      const cx = (mx + el.scrollLeft) / zoom;
      const cy = (my + el.scrollTop)  / zoom;
      const newScrollLeft = Math.max(0, cx * nz - mx);
      const newScrollTop  = Math.max(0, cy * nz - my);

      viewRef.current = { zoom: nz };
      innerRef.current.style.transform = `scale(${nz})`;

      // Resize sizer BEFORE setting scroll so browser doesn't clamp the position
      updateSizer(newScrollLeft, newScrollTop);
      el.scrollLeft = newScrollLeft;
      el.scrollTop  = newScrollTop;

      updatePageView(newScrollLeft / nz, newScrollTop / nz, nz);
    }

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  // ── Space key / Delete / Undo / Paste ────────────────────

  useEffect(() => {
    function onKeyDown(e) {
      if (e.code === 'Space' && !e.target.isContentEditable && e.target.tagName !== 'INPUT') {
        spaceHeld.current = true;
        if (containerRef.current) containerRef.current.style.cursor = 'grab';
      }
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedRef.current.size && !e.target.isContentEditable) {
        e.preventDefault();
        const pg = getActivePage();
        if (!pg) return;
        const toDelete = [...selectedRef.current];
        if (!toDelete.length) return;
        const deleted = toDelete.map(id => pg.blocks.find(b => b.id === id)).filter(Boolean).map(b => ({ ...b }));
        pushUndo(pg.id, { type: 'delete', blocks: deleted });
        for (const id of toDelete) deleteBlock(id);
        setSelected(new Set());
      }
      const mod = e.ctrlKey || e.metaKey;
      if (mod && e.key === 'z' && !e.target.isContentEditable) {
        e.preventDefault();
        e.shiftKey ? doRedo() : doUndo();
      }
      if ((e.key === '[' || e.key === ']') && selectedRef.current.size && !e.target.isContentEditable) {
        e.preventDefault();
        const pg = getActivePage();
        if (!pg) return;
        for (const id of selectedRef.current) {
          const blk = pg.blocks.find(b => b.id === id);
          if (!blk) continue;
          updateBlockZ(id, (blk.z ?? 0) + (e.key === ']' ? 1 : -1));
        }
      }
    }
    function onKeyUp(e) {
      if (e.code === 'Space') {
        spaceHeld.current = false;
        if (containerRef.current) containerRef.current.style.cursor = '';
      }
    }
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    const cleanupPaste = initPasteHandler({
      getContainer: () => containerRef.current,
      getView: () => viewRef.current,
    });
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
      cleanupPaste();
    };
  }, []);

  // ── Undo/Redo ────────────────────────────────────────────

  function doUndo() {
    const pg = getActivePage();
    if (!pg) return;
    if (!applyUndo(pg.id, pg)) return;
    appState.value = { ...appState.value };
  }

  function doRedo() {
    const pg = getActivePage();
    if (!pg) return;
    if (!applyRedo(pg.id, pg)) return;
    appState.value = { ...appState.value };
  }

  const IMAGE_URL_RE = /\.(png|jpe?g|gif|webp|svg|bmp|ico|avif)(\?|$)/i;

  function handleDrop(e) {
    e.preventDefault();

    if (e.dataTransfer.types.includes('application/x-notebound-claude')) {
      startClaudeChat(e.clientX - 180, e.clientY - 20);
      return;
    }

    const pos = toCanvas(e.clientX, e.clientY);

    const uri = (e.dataTransfer.getData('text/uri-list') || '').trim();
    if (uri && !uri.startsWith('#') && IMAGE_URL_RE.test(uri)) {
      addImageFromUrl(uri, pos.x, pos.y);
      return;
    }

    const files = [...e.dataTransfer.files].filter(f => f.type.startsWith('image/'));
    if (!files.length) return;
    files.forEach((file, i) => {
      addImageFromFile(file, pos.x + i * 20, pos.y + i * 20);
    });
  }

  // ── Context for blocks ───────────────────────────────────

  function focusFirstBlock() {
    const pg = getActivePage();
    if (!pg) return;
    let blk = pg.blocks.find(b => b.type === 'text' && b.x === 28 && b.y === 0);
    if (!blk) {
      blk = addBlock(28, 0);
    }
    const id = blk.id;
    // Force Canvas re-render so the block appears in the DOM
    setSelected(new Set());
    requestAnimationFrame(() => {
      const el = innerRef.current?.querySelector(`[data-block-id="${id}"] .block-content`);
      if (el) el.focus();
    });
  }

  const ctx = {
    selectedIds,
    onBlockDragStart,
    onBlockResizeStart,
    onImgResizeStart,
    onBlockFocus: (id) => {},
    onBlockBlur: (id) => {
      if (!page) return;
      const el = innerRef.current?.querySelector(`[data-block-id="${id}"] .block-content`);
      const offset = el ? getCaretOffset(el) : 0;
      lastCaretPerPage.set(page.id, { blockId: id, offset });
      savePageCaret(page.id, id, offset);
    },
    undo: doUndo,
    redo: doRedo,
    getZoom: () => viewRef.current.zoom,
  };

  return (
    <>
      <PageTitle page={page} onEnter={focusFirstBlock} />
      <CanvasCtx.Provider value={ctx}>
        <div id="canvas-wrapper">
          <div
            ref={containerRef}
            id="canvas-container"
            onPointerDown={handlePointerDown}
            onScroll={handleScroll}
            onDragOver={e => { if (e.dataTransfer.types.includes('Files') || e.dataTransfer.types.includes('application/x-notebound-claude')) e.preventDefault(); }}
            onDrop={handleDrop}
          >
            <div ref={sizerRef} id="canvas-sizer">
              <div ref={innerRef} id="canvas-inner" style={{ transformOrigin: '0 0' }}>
                {cachedPages.map(p => {
                  let style;
                  if (transition) {
                    // Only the incoming page at phase='in' is visible (opacity:1, transitions from 0)
                    // Everything else: opacity:0 (outgoing transitions 1→0, others stay hidden)
                    const showing = p.id === transition.inId && transition.phase === 'in';
                    style = showing ? undefined : { opacity: 0, pointerEvents: 'none' };
                  } else {
                    style = p.id !== page?.id ? { opacity: 0, pointerEvents: 'none' } : undefined;
                  }
                  return (
                    <div key={p.id} class="page-layer" style={style}>
                      {p.blocks.map(b => <Block key={b.id} block={b} page={p} />)}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div ref={marqueeRef} id="marquee-rect" />
        </div>
      </CanvasCtx.Provider>
    </>
  );
}
