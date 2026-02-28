import { useRef, useEffect, useContext, useState } from 'preact/hooks';
import { CanvasCtx } from './Canvas.jsx';
import { updateBlockHtml, updateBlockType, deleteBlock, getActivePage } from './store.js';
import { onBlockKeyDown, handleMarkdownInput } from './editor.js';
import { pushUndo } from './undo.js';

export function Block({ block, page }) {
  const ctx = useContext(CanvasCtx);
  const contentRef = useRef(null);
  const isDefault = block.id === page.defaultBlockId;
  const isImage   = block.type === 'image';
  const isLoading = block.type === 'loading';
  const isSelected = ctx.selectedIds.has(block.id);

  // Resolve blob: references to data URLs
  const [resolvedSrc, setResolvedSrc] = useState(null);
  useEffect(() => {
    if (!isImage) return;
    const src = block.src || '';
    if (src.startsWith('blob:') && window.notebook) {
      const hash = src.slice(5);
      window.notebook.getBlob(hash).then(dataUrl => {
        if (dataUrl) setResolvedSrc(dataUrl);
      });
    } else {
      setResolvedSrc(src);
    }
  }, [block.src, isImage]);

  // Sync content when block.html changes externally (undo/page-switch)
  useEffect(() => {
    const el = contentRef.current;
    if (el && el.innerHTML !== block.html) el.innerHTML = block.html;
  }, [block.html]);

  // Track HTML at focus time for undo deltas
  const undoTimer = useRef(null);
  const htmlAtFocus = useRef(null);

  const handleInput = () => {
    const el = contentRef.current;
    if (!el) return;

    // Try markdown shortcuts — returns 'code' if block converted
    const result = handleMarkdownInput(el);
    if (result === 'code') updateBlockType(block.id, 'code');

    // Save HTML to store (silent)
    updateBlockHtml(block.id, el.innerHTML);

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
    ctx.onBlockFocus?.(block.id);
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
          onPointerDown={(e) => e.stopPropagation()}
          suppressContentEditableWarning
        />
      )}
    </div>
  );
}
