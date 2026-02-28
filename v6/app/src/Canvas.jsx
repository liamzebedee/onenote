import { createContext } from 'preact';
import { useRef, useEffect, useState, useCallback } from 'preact/hooks';
import { Block } from './Block.jsx';
import { appState, addBlock, deleteBlock, updateBlockPos, updateBlockWidth, updateBlockSrc, updatePageView, updatePageTitle, updatePageTitleAndRefresh, getActivePage, startClaudeChat } from './store.js';
import { pushUndo, applyUndo, applyRedo } from './undo.js';
import { execFmt } from './editor.js';

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
    <div id="format-toolbar">
      {btns.map((b, i) => b === null
        ? <span key={i} class="fmt-sep" />
        : <button key={b.cmd} class="fmt-btn" title={b.title} onMouseDown={e => { e.preventDefault(); execFmt(b.cmd); }}>{b.node}</button>
      )}
      <span class="fmt-sep" />
      <button
        class="fmt-btn fmt-btn--wand"
        title="Drag onto canvas to chat with Claude"
        draggable
        onDragStart={e => { e.dataTransfer.setData('application/x-notebound-claude', '1'); }}
      >✨</button>
      <span class="canvas-hint">Click to add block · Space+drag to pan · Ctrl+scroll zoom</span>
    </div>
  );
}

// ─── PageTitle ───────────────────────────────────────────

function PageTitle({ page, onEnter }) {
  const ref = useRef(null);
  const editing = useRef(false);

  useEffect(() => {
    if (ref.current && !editing.current) ref.current.textContent = page?.title ?? '';
  }, [page?.id, page?.title]);

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
      />
      {dateStr && <div class="page-date">{dateStr}</div>}
    </div>
  );
}

// ─── Canvas ──────────────────────────────────────────────

export function Canvas({ page }) {
  const containerRef = useRef(null);
  const innerRef = useRef(null);
  const marqueeRef = useRef(null);
  const hScrollRef = useRef(null);
  const vScrollRef = useRef(null);
  const scrollHideTimer = useRef(null);
  const viewRef = useRef({ panX: 0, panY: 0, zoom: 1 });
  const spaceHeld = useRef(false);

  // Selected block IDs — stored in state so blocks re-render with selection style
  const [selectedIds, setSelectedIds] = useState(new Set());
  const selectedRef = useRef(selectedIds);

  function setSelected(ids) {
    selectedRef.current = ids;
    setSelectedIds(new Set(ids));
  }

  // Sync view when page changes
  useEffect(() => {
    if (!page) return;
    viewRef.current = { panX: page.panX ?? 0, panY: page.panY ?? 0, zoom: page.zoom ?? 1 };
    applyTransform();
    setSelected(new Set());
  }, [page?.id]);

  function applyTransform() {
    if (!innerRef.current) return;
    const { panX, panY, zoom } = viewRef.current;
    innerRef.current.style.transform = `translate(${-panX * zoom}px, ${-panY * zoom}px) scale(${zoom})`;
    updateScrollbars();
  }

  function updateScrollbars() {
    if (!containerRef.current) return;

    const { panX, panY, zoom } = viewRef.current;
    const rect = containerRef.current.getBoundingClientRect();
    const viewW = rect.width / zoom;
    const viewH = rect.height / zoom;

    // Total world = union of content bounds and current viewport
    let maxX = 0, maxY = 0;
    if (page?.blocks?.length) {
      for (const b of page.blocks) {
        maxX = Math.max(maxX, b.x + (b.w || 480));
        maxY = Math.max(maxY, b.y + 300);
      }
    }
    const totalW = Math.max(maxX + 100, panX + viewW);
    const totalH = Math.max(maxY + 100, panY + viewH);

    // Only show if panned away from origin (there's something to scroll back to)
    const showH = panX > 1 || maxX + 100 > viewW;
    const showV = panY > 1 || maxY + 100 > viewH;

    if (showH || showV) {
      containerRef.current.classList.add('scrollbar-active');
      clearTimeout(scrollHideTimer.current);
      scrollHideTimer.current = setTimeout(() => {
        containerRef.current?.classList.remove('scrollbar-active');
      }, 1200);
    }

    // Horizontal thumb
    if (hScrollRef.current) {
      if (!showH) {
        hScrollRef.current.style.display = 'none';
      } else {
        hScrollRef.current.style.display = '';
        const trackW = rect.width - 14;
        const ratio = viewW / totalW;
        const thumbW = Math.max(30, ratio * trackW);
        const thumbX = (panX / totalW) * trackW;
        hScrollRef.current.style.width = thumbW + 'px';
        hScrollRef.current.style.left = Math.max(4, thumbX + 4) + 'px';
      }
    }

    // Vertical thumb
    if (vScrollRef.current) {
      if (!showV) {
        vScrollRef.current.style.display = 'none';
      } else {
        vScrollRef.current.style.display = '';
        const trackH = rect.height - 14;
        const ratio = viewH / totalH;
        const thumbH = Math.max(30, ratio * trackH);
        const thumbY = (panY / totalH) * trackH;
        vScrollRef.current.style.height = thumbH + 'px';
        vScrollRef.current.style.top = Math.max(4, thumbY + 4) + 'px';
      }
    }
  }

  function toCanvas(clientX, clientY) {
    const rect = containerRef.current.getBoundingClientRect();
    const { panX, panY, zoom } = viewRef.current;
    return { x: (clientX - rect.left) / zoom + panX, y: (clientY - rect.top) / zoom + panY };
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

    // Default block cannot be moved
    if (pg.defaultBlockId === blockId) return;

    if (!selectedRef.current.has(blockId)) {
      if (!e.shiftKey) setSelected(new Set([blockId]));
      else setSelected(new Set([...selectedRef.current, blockId]));
    }

    const ids = selectedRef.current.has(blockId)
      ? [...selectedRef.current]
      : [blockId];

    // Snapshot original positions from DOM
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
        el.style.top = Math.max(0, orig.y + dy) + 'px';
      }
    }

    function onUp() {
      // Save old positions as undo delta, then commit new positions
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
    const origW = parseInt(el.style.width) || 480;
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

  // ── Pan ───────────────────────────────────────────────────

  function startPan(startX, startY) {
    const origPan = { ...viewRef.current };
    function onMove(e) {
      const dx = (e.clientX - startX) / viewRef.current.zoom;
      const dy = (e.clientY - startY) / viewRef.current.zoom;
      viewRef.current.panX = Math.max(0, origPan.panX - dx);
      viewRef.current.panY = Math.max(0, origPan.panY - dy);
      applyTransform();
    }
    function onUp() {
      updatePageView(viewRef.current.panX, viewRef.current.panY, viewRef.current.zoom);
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', onUp);
    }
    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', onUp);
  }

  // ── Marquee ───────────────────────────────────────────────

  function startMarquee(startClientX, startClientY) {
    const startScreen = toScreen(startClientX, startClientY);
    const startCanvas = toCanvas(startClientX, startClientY);

    const mq = marqueeRef.current;
    if (mq) { mq.style.display = 'block'; mq.style.cssText += '; left:0;top:0;width:0;height:0'; }

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
    // Middle button or space held → pan
    if (e.button === 1 || (e.button === 0 && spaceHeld.current)) {
      e.preventDefault();
      startPan(e.clientX, e.clientY);
      return;
    }
    if (e.button !== 0) return;

    // Blur any focused block so marquee selection + Delete key works
    if (document.activeElement && document.activeElement !== document.body) {
      document.activeElement.blur();
    }

    // Left click on empty canvas — might be marquee or create-block
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
        // Clean single click → create block
        setSelected(new Set());
        const pos = toCanvas(startX, startY);
        addBlock(pos.x, pos.y);
        // Focus the new block after Preact renders it
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

  // ── Wheel ─────────────────────────────────────────────────

  function handleWheel(e) {
    e.preventDefault();
    const { panX, panY, zoom } = viewRef.current;

    // Normalize delta to pixels across platforms/input devices.
    // macOS trackpad: deltaMode=0 with small values (~1–5px per tick).
    // Linux mouse: often deltaMode=1 (lines) or deltaMode=0 with ~100px per tick.
    let dx = e.deltaX, dy = e.deltaY;
    if (e.deltaMode === 1) { dx *= 16; dy *= 16; }   // line mode → px
    if (e.deltaMode === 2) { dx *= 400; dy *= 400; }  // page mode → px
    // Amplify small pixel-mode deltas (macOS trackpad sends ~1–20px per event)
    if (e.deltaMode === 0 && Math.abs(dy) < 50 && Math.abs(dx) < 50) { dx *= 3; dy *= 3; }

    if (e.ctrlKey || e.metaKey) {
      const factor = dy < 0 ? 1.1 : 0.9;
      const rect = containerRef.current.getBoundingClientRect();
      const mx = e.clientX - rect.left, my = e.clientY - rect.top;
      const cx = mx / zoom + panX, cy = my / zoom + panY;
      const nz = Math.max(0.2, Math.min(4, zoom * factor));
      viewRef.current = { panX: Math.max(0, cx - mx/nz), panY: Math.max(0, cy - my/nz), zoom: nz };
    } else {
      viewRef.current = { panX: Math.max(0, panX + dx/zoom), panY: Math.max(0, panY + dy/zoom), zoom };
    }
    applyTransform();
    updatePageView(viewRef.current.panX, viewRef.current.panY, viewRef.current.zoom);
  }

  // ── Space key ────────────────────────────────────────────

  useEffect(() => {
    function onKeyDown(e) {
      if (e.code === 'Space' && !e.target.isContentEditable && e.target.tagName !== 'INPUT') {
        spaceHeld.current = true;
        if (containerRef.current) containerRef.current.style.cursor = 'grab';
      }
      // Delete selected blocks
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedRef.current.size && !e.target.isContentEditable) {
        e.preventDefault();
        const pg = getActivePage();
        if (!pg) return;
        const defaultId = pg.defaultBlockId;
        const toDelete = [...selectedRef.current].filter(id => id !== defaultId);
        if (!toDelete.length) return;
        const deleted = toDelete.map(id => pg.blocks.find(b => b.id === id)).filter(Boolean).map(b => ({ ...b }));
        pushUndo(pg.id, { type: 'delete', blocks: deleted });
        for (const id of toDelete) deleteBlock(id);
        setSelected(new Set());
      }
      // Undo/redo
      const mod = e.ctrlKey || e.metaKey;
      if (mod && e.key === 'z' && !e.target.isContentEditable) {
        e.preventDefault();
        e.shiftKey ? doRedo() : doUndo();
      }
    }
    function onKeyUp(e) {
      if (e.code === 'Space') {
        spaceHeld.current = false;
        if (containerRef.current) containerRef.current.style.cursor = '';
      }
    }
    function onPaste(e) {
      // If pasting inside a contentEditable, let the browser handle it
      if (e.target.isContentEditable) return;

      const items = [...(e.clipboardData?.items || [])];
      const imageItem = items.find(item => item.type.startsWith('image/'));
      if (!imageItem) return;

      e.preventDefault();
      const file = imageItem.getAsFile();
      if (!file) return;

      // Place at center of current viewport
      const { panX, panY, zoom } = viewRef.current;
      const rect = containerRef.current?.getBoundingClientRect();
      const cx = rect ? (rect.width / 2) / zoom + panX : 100;
      const cy = rect ? (rect.height / 2) / zoom + panY : 100;
      addImageFromFile(file, cx, cy);
    }

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    document.addEventListener('paste', onPaste);
    return () => { document.removeEventListener('keydown', onKeyDown); document.removeEventListener('keyup', onKeyUp); document.removeEventListener('paste', onPaste); };
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

  // ── Image drop ───────────────────────────────────────────

  function addImageFromFile(file, x, y) {
    // Show immediately using object URL
    const objectUrl = URL.createObjectURL(file);
    const blk = addBlock(x, y, 300, 'image', { src: objectUrl });

    // Save blob in background, update src to persistent reference
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

  async function addImageFromUrl(url, x, y) {
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

  const IMAGE_URL_RE = /\.(png|jpe?g|gif|webp|svg|bmp|ico|avif)(\?|$)/i;

  function handleDrop(e) {
    e.preventDefault();

    // Check for Claude chat drop
    if (e.dataTransfer.types.includes('application/x-notebound-claude')) {
      startClaudeChat(e.clientX - 180, e.clientY - 20);
      return;
    }

    const pos = toCanvas(e.clientX, e.clientY);

    // Check for image URL in text/uri-list first
    const uri = (e.dataTransfer.getData('text/uri-list') || '').trim();
    if (uri && !uri.startsWith('#') && IMAGE_URL_RE.test(uri)) {
      addImageFromUrl(uri, pos.x, pos.y);
      return;
    }

    // Fall back to dropped files
    const files = [...e.dataTransfer.files].filter(f => f.type.startsWith('image/'));
    if (!files.length) return;
    files.forEach((file, i) => {
      addImageFromFile(file, pos.x + i * 20, pos.y + i * 20);
    });
  }

  // ── Context for blocks ───────────────────────────────────

  function focusDefaultBlock() {
    const pg = getActivePage();
    if (!pg?.defaultBlockId) return;
    const el = innerRef.current?.querySelector(`[data-block-id="${pg.defaultBlockId}"] .block-content`);
    el?.focus();
  }

  const ctx = {
    selectedIds,
    onBlockDragStart,
    onBlockResizeStart,
    onImgResizeStart,
    onBlockFocus: (id) => {},
    onBlockBlur: (id) => {},
    undo: doUndo,
    redo: doRedo,
  };

  return (
    <>
      <PageTitle page={page} onEnter={focusDefaultBlock} />
      <CanvasCtx.Provider value={ctx}>
        <div
          ref={containerRef}
          id="canvas-container"
          onPointerDown={handlePointerDown}
          onWheel={handleWheel}
          onDragOver={e => { if (e.dataTransfer.types.includes('Files') || e.dataTransfer.types.includes('application/x-notebound-claude')) e.preventDefault(); }}
          onDrop={handleDrop}
        >
          <div ref={marqueeRef} id="marquee-rect" />
          <div ref={innerRef} id="canvas-inner" style={{ transformOrigin: '0 0' }}>
            {page?.blocks.map(b => <Block key={b.id} block={b} page={page} />)}
          </div>
          <div ref={hScrollRef} class="canvas-scroll-thumb canvas-scroll-thumb-h" />
          <div ref={vScrollRef} class="canvas-scroll-thumb canvas-scroll-thumb-v" />
        </div>
      </CanvasCtx.Provider>
    </>
  );
}
