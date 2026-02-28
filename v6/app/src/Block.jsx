import { useRef, useEffect, useContext, useState } from 'preact/hooks';
import { signal } from '@preact/signals';
import { CanvasCtx } from './Canvas.jsx';
import { updateBlockHtml, updateBlockHtmlLocal, updateBlockTextDiff, updateBlockType, deleteBlock, getActivePage } from './store.js';
import { onBlockKeyDown, handleMarkdownInput } from './editor.js';
import { pushUndo } from './undo.js';

function computeTextDiff(oldText, newText) {
  let p = 0;
  const minLen = Math.min(oldText.length, newText.length);
  while (p < minLen && oldText[p] === newText[p]) p++;
  let oldEnd = oldText.length;
  let newEnd = newText.length;
  while (oldEnd > p && newEnd > p && oldText[oldEnd - 1] === newText[newEnd - 1]) {
    oldEnd--; newEnd--;
  }
  const diffs = [];
  if (oldEnd > p) diffs.push({ type: 'delete', pos: p, count: oldEnd - p });
  const ins = newText.slice(p, newEnd);
  if (ins) diffs.push({ type: 'insert', pos: p, text: ins });
  return diffs;
}

// ─── Link context menu state ────────────────────────────
const linkMenu = signal(null); // { x, y, href, anchorEl, blockId }

export function LinkContextMenu() {
  const m = linkMenu.value;
  if (!m) return null;

  const close = () => { linkMenu.value = null; };

  const openLink = () => {
    if (window.notebook?.openExternal) window.notebook.openExternal(m.href);
    close();
  };

  const editLink = () => {
    const url = prompt('Edit URL:', m.href);
    if (url != null) {
      m.anchorEl.href = url;
      // persist html change
      const blockEl = m.anchorEl.closest('.block-content');
      if (blockEl) {
        updateBlockHtml(m.blockId, blockEl.innerHTML);
      }
    }
    close();
  };

  const removeLink = () => {
    const parent = m.anchorEl.parentNode;
    while (m.anchorEl.firstChild) parent.insertBefore(m.anchorEl.firstChild, m.anchorEl);
    parent.removeChild(m.anchorEl);
    const blockEl = parent.closest('.block-content');
    if (blockEl) {
      updateBlockHtml(m.blockId, blockEl.innerHTML);
    }
    close();
  };

  return (
    <div class="link-menu" style={{ left: m.x + 'px', top: m.y + 'px' }} onMouseDown={e => e.stopPropagation()}>
      <div class="link-menu-url" title={m.href}>{m.href.length > 40 ? m.href.slice(0, 37) + '...' : m.href}</div>
      <div class="link-menu-actions">
        <button class="link-menu-btn" onClick={openLink}>Open</button>
        <button class="link-menu-btn" onClick={editLink}>Edit</button>
        <button class="link-menu-btn link-menu-btn--danger" onClick={removeLink}>Remove</button>
      </div>
    </div>
  );
}

// Close link menu on any click outside
if (typeof document !== 'undefined') {
  document.addEventListener('mousedown', () => { linkMenu.value = null; });
}

export function Block({ block, page }) {
  const ctx = useContext(CanvasCtx);
  const contentRef = useRef(null);
  const isDefault = block.id === page.defaultBlockId;
  const isImage   = block.type === 'image';
  const isLoading = block.type === 'loading';
  const isSelected = ctx.selectedIds.has(block.id);

  // Resolve notebook blob refs ("blob:<sha256>") to data URLs.
  // Object URLs ("blob:null/...") and other srcs are used directly.
  const isNotebookBlob = (s) => s.startsWith('blob:') && !s.includes('/');
  const rawSrc = block.src || '';
  const [resolvedSrc, setResolvedSrc] = useState(isNotebookBlob(rawSrc) ? null : rawSrc);
  useEffect(() => {
    if (!isImage) return;
    if (isNotebookBlob(rawSrc)) {
      const hash = rawSrc.slice(5);
      window.notebook.getBlob(hash).then(dataUrl => {
        if (dataUrl) setResolvedSrc(dataUrl);
      });
    } else {
      setResolvedSrc(rawSrc);
    }
  }, [rawSrc, isImage]);

  // Sync content when block.html changes externally (undo/page-switch)
  useEffect(() => {
    const el = contentRef.current;
    if (el && el.innerHTML !== block.html) {
      el.innerHTML = block.html;
      prevTextRef.current = el.innerText || '';
    }
  }, [block.html]);

  // Track HTML at focus time for undo deltas
  const undoTimer = useRef(null);
  const htmlAtFocus = useRef(null);
  const prevTextRef = useRef(null);

  const handleInput = () => {
    const el = contentRef.current;
    if (!el) return;

    // Try markdown shortcuts — returns 'code' if block converted
    const result = handleMarkdownInput(el);
    if (result === 'code') updateBlockType(block.id, 'code');

    // Compute character-level diff for CRDT sync
    const newText = el.innerText || '';
    const oldText = prevTextRef.current ?? '';
    const diffs = computeTextDiff(oldText, newText);
    prevTextRef.current = newText;
    updateBlockHtmlLocal(block.id, el.innerHTML);
    updateBlockTextDiff(block.id, diffs);

    // Debounced undo snapshot while typing (every ~1.5 s of inactivity)
    clearTimeout(undoTimer.current);
    undoTimer.current = setTimeout(() => {
      if (htmlAtFocus.current != null && htmlAtFocus.current !== el.innerHTML) {
        pushUndo(page.id, { type: 'html', id: block.id, html: htmlAtFocus.current });
        htmlAtFocus.current = el.innerHTML;
      }
    }, 1500);
  };

  const handleKeyDown = (e) => {
    const mod = e.ctrlKey || e.metaKey;

    // Undo / redo
    if (mod && e.key === 'z') {
      e.preventDefault();
      e.shiftKey ? ctx.redo() : ctx.undo();
      return;
    }

    onBlockKeyDown(e, contentRef.current);
  };

  const handleFocus = () => {
    htmlAtFocus.current = block.html;
    prevTextRef.current = contentRef.current?.innerText || '';
    ctx.onBlockFocus?.(block.id);
  };

  const handleContentClick = (e) => {
    const anchor = e.target.closest('a[href]');
    if (!anchor) return;
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      if (window.notebook?.openExternal) window.notebook.openExternal(anchor.href);
    }
  };

  const handleContentContextMenu = (e) => {
    const anchor = e.target.closest('a[href]');
    if (!anchor) return;
    e.preventDefault();
    e.stopPropagation();
    linkMenu.value = { x: e.clientX, y: e.clientY, href: anchor.href, anchorEl: anchor, blockId: block.id };
  };

  const handleBlur = () => {
    clearTimeout(undoTimer.current);
    const el = contentRef.current;
    if (!el) return;

    const html = el.innerHTML;
    const isEmpty = !html || html === '<br>' || html.trim() === '';

    // Push undo delta if content changed during this edit session
    if (htmlAtFocus.current != null && htmlAtFocus.current !== html) {
      pushUndo(page.id, { type: 'html', id: block.id, html: htmlAtFocus.current });
    }
    htmlAtFocus.current = null;

    if (isEmpty && !isDefault) {
      deleteBlock(block.id);
    } else {
      updateBlockHtml(block.id, html);
    }
    ctx.onBlockBlur?.(block.id);
  };

  // Clicking anywhere on the block (outside content) starts a drag/select
  // and crucially STOPS propagation so canvas doesn't create a new block
  const handleBlockPointerDown = (e) => {
    // Always stop propagation — no canvas actions should fire from block interactions
    e.stopPropagation();

    // If click lands outside content/handles, initiate drag+select
    const onContent = e.target.closest('.block-content, .block-handle, .block-resize, .img-resize, .block-drag-overlay');
    if (!onContent) {
      ctx.onBlockDragStart(e, block.id);
    }
  };

  return (
    <div
      class={['block', isDefault && 'block--default', isImage && 'block--image', isLoading && 'block--loading', isSelected && 'block--selected'].filter(Boolean).join(' ')}
      data-block-id={block.id}
      style={{ left: block.x + 'px', top: block.y + 'px', width: block.w + 'px' }}
      onPointerDown={handleBlockPointerDown}
    >
      {/* Drag handle — hidden for default block and image blocks */}
      {!isDefault && !isImage && (
        <div
          class="block-handle"
          onPointerDown={(e) => { e.stopPropagation(); ctx.onBlockDragStart(e, block.id); }}
        />
      )}

      {/* Resize handle — top-right, width only, hidden for image blocks */}
      {!isImage && (
        <div
          class="block-resize"
          onPointerDown={(e) => { e.stopPropagation(); ctx.onBlockResizeStart(e, block.id); }}
        />
      )}

      {isLoading ? (
        <div class="block-loading"><div class="block-loading-spinner" /></div>
      ) : isImage ? (
        <>
          <img src={resolvedSrc || ''} draggable={false} style={{ width: '100%', display: 'block' }} />
          {['nw', 'ne', 'sw', 'se'].map(dir => (
            <div
              key={dir}
              class={`img-resize img-resize--${dir}`}
              onPointerDown={(e) => { e.stopPropagation(); ctx.onImgResizeStart(e, block.id, dir); }}
            />
          ))}
          <div
            class="block-drag-overlay"
            onPointerDown={(e) => { e.stopPropagation(); ctx.onBlockDragStart(e, block.id); }}
          />
        </>
      ) : (
        <div
          ref={contentRef}
          class={['block-content', block.type === 'code' && 'code-block'].filter(Boolean).join(' ')}
          contentEditable="true"
          data-placeholder="Start typing…"
          data-code={block.type === 'code' ? '1' : undefined}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onClick={handleContentClick}
          onContextMenu={handleContentContextMenu}
          onPointerDown={(e) => e.stopPropagation()}
          suppressContentEditableWarning
        />
      )}
    </div>
  );
}
