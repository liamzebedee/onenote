import { useRef, useEffect, useLayoutEffect, useContext, useState } from 'preact/hooks';
import { signal } from '@preact/signals';
import { CanvasCtx } from './Canvas.jsx';
import { openContextMenu } from './ContextMenu.jsx';
import { updateBlockHtml, updateBlockHtmlLocal, updateBlockTextDiff, updateBlockType, deleteBlock, getActivePage, updateBlockCrop, updateBlockCaption, updateBlockBorder, updateChecklistItems, updateChecklistItemsSilent, uid } from './store.js';
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

// ─── URL linkifier ───────────────────────────────────────
const LINK_URL_RE = /https?:\/\/[^\s<>"{}|\\^`[\]]+(?<![.,;:!?])/g;

function linkifyText(text) {
  let hasUrl = false;
  const segments = [];
  let last = 0;
  LINK_URL_RE.lastIndex = 0;
  let m;
  while ((m = LINK_URL_RE.exec(text)) !== null) {
    hasUrl = true;
    const before = text.slice(last, m.index)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/\n/g, '<br>');
    segments.push(before);
    const url = m[0];
    const esc = url.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    segments.push(`<a href="${esc}">${esc}</a>`);
    last = m.index + url.length;
  }
  if (!hasUrl) return null;
  const trailing = text.slice(last)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/\n/g, '<br>');
  segments.push(trailing);
  return segments.join('');
}

// ─── HTML paste sanitizer ────────────────────────────────
const PASTE_ALLOWED = new Set([
  'p','br','h1','h2','h3','h4','h5','h6',
  'ul','ol','li',
  'b','strong','i','em','u','s','del','strike',
  'code','pre','blockquote',
  'a',
]);

function sanitizePastedHtml(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');

  function walk(node) {
    if (node.nodeType === Node.TEXT_NODE) return document.createTextNode(node.textContent);
    if (node.nodeType !== Node.ELEMENT_NODE) return null;

    const tag = node.tagName.toLowerCase();
    const children = document.createDocumentFragment();
    for (const child of [...node.childNodes]) {
      const r = walk(child);
      if (r) children.appendChild(r);
    }

    if (!PASTE_ALLOWED.has(tag)) return children; // unwrap unknown tags

    const out = document.createElement(
      tag === 'strong' ? 'b' : tag === 'em' ? 'i' : tag === 'strike' ? 's' : tag
    );
    if (tag === 'a') {
      const href = node.getAttribute('href');
      if (href) out.setAttribute('href', href);
    }
    out.appendChild(children);
    return out;
  }

  const frag = document.createDocumentFragment();
  for (const child of [...doc.body.childNodes]) {
    const r = walk(child);
    if (r) frag.appendChild(r);
  }
  const div = document.createElement('div');
  div.appendChild(frag);
  return div.innerHTML;
}

export function Block({ block, page }) {
  const ctx = useContext(CanvasCtx);
  const contentRef = useRef(null);
  const isImage     = block.type === 'image';
  const isLoading   = block.type === 'loading';
  const isChecklist = block.type === 'checklist';
  const isSelected = ctx.selectedIds.has(block.id);

  // Resolve notebook blob refs ("blob:<sha256>") to data URLs.
  // Object URLs ("blob:null/...") and other srcs are used directly.
  const isNotebookBlob = (s) => s.startsWith('blob:') && !s.includes('/');
  const rawSrc = block.src || '';
  const [resolvedSrc, setResolvedSrc] = useState(isNotebookBlob(rawSrc) ? null : rawSrc);

  // Image crop state
  const [naturalSize, setNaturalSize] = useState(null);
  const [cropping, setCropping] = useState(false);
  const [pendingCrop, setPendingCrop] = useState(null);
  const pendingCropRef = useRef(null);

  // Border local state — drives immediate visual feedback; store is source of truth on mount/undo
  const [borderOn, setBorderOn] = useState(!!block.border);
  useEffect(() => { setBorderOn(!!block.border); }, [block.border]);

  // Checklist item DOM refs (itemId → span element)
  const itemRefs = useRef({});

  const toggleBorder = () => {
    const next = !borderOn;
    setBorderOn(next);
    updateBlockBorder(block.id, next);
  };

  // ── Checklist handlers ───────────────────────────────────

  // Read current text from DOM refs (may be ahead of block.items during typing)
  const getItemsWithDOMText = () =>
    (block.items || []).map(i => ({ ...i, text: itemRefs.current[i.id]?.textContent ?? i.text }));

  const toggleCheckItem = (itemId) => {
    const items = getItemsWithDOMText().map(i =>
      i.id === itemId ? { ...i, checked: !i.checked } : i
    );
    updateChecklistItems(block.id, items);
  };

  const handleItemKeyDown = (e, itemId) => {
    const mod = e.ctrlKey || e.metaKey;
    if (mod && e.key === 'z') { e.preventDefault(); e.shiftKey ? ctx.redo() : ctx.undo(); return; }

    const items = block.items || [];
    const idx = items.findIndex(i => i.id === itemId);

    if (e.key === 'Enter') {
      e.preventDefault();
      const newItem = { id: uid(), text: '', checked: false };
      const current = getItemsWithDOMText();
      const newItems = [...current.slice(0, idx + 1), newItem, ...current.slice(idx + 1)];
      updateChecklistItems(block.id, newItems);
      requestAnimationFrame(() => itemRefs.current[newItem.id]?.focus());
      return;
    }

    if (e.key === 'Backspace' && e.target.textContent === '') {
      e.preventDefault();
      if (items.length <= 1) { deleteBlock(block.id); return; }
      const prevItem = items[Math.max(0, idx - 1)];
      const newItems = getItemsWithDOMText().filter(i => i.id !== itemId);
      updateChecklistItems(block.id, newItems);
      requestAnimationFrame(() => {
        const el = itemRefs.current[prevItem.id];
        if (el) {
          el.focus();
          const r = document.createRange();
          r.selectNodeContents(el);
          r.collapse(false);
          window.getSelection().removeAllRanges();
          window.getSelection().addRange(r);
        }
      });
      return;
    }
  };

  const handleItemBlur = () => {
    // Save text silently (no re-render) to keep store in sync
    updateChecklistItemsSilent(block.id, getItemsWithDOMText());
  };

  // Legend state
  const captionRef = useRef(null);
  const [captionEditing, setLegendEditing] = useState(false);
  // Effective natural size: prefer freshly loaded, fall back to stored dims in crop data
  const nw = naturalSize?.w ?? block.crop?.nw ?? null;
  const nh = naturalSize?.h ?? block.crop?.nh ?? null;
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
  useLayoutEffect(() => {
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
    e.preventDefault();
    if (window.notebook?.openExternal) window.notebook.openExternal(anchor.href);
  };

  const handleContentContextMenu = (e) => {
    const anchor = e.target.closest('a[href]');
    if (anchor) {
      e.preventDefault();
      e.stopPropagation();
      linkMenu.value = { x: e.clientX, y: e.clientY, href: anchor.href, anchorEl: anchor, blockId: block.id };
      return;
    }
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
  };

  const handleImageContextMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const items = [
      { label: 'Copy', action: () => {
        const img = e.target.closest('.img-frame')?.querySelector('img');
        if (!img) return;
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        canvas.getContext('2d').drawImage(img, 0, 0);
        canvas.toBlob(blob => {
          if (blob) navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
        });
      }},
      { label: 'Paste', action: () => {
        navigator.clipboard.readText().then(text => {
          if (text) document.execCommand('insertText', false, text);
        });
      }},
    ];
    openContextMenu(e.clientX, e.clientY, items);
  };

  const handlePaste = (e) => {
    if ([...(e.clipboardData?.items || [])].some(i => i.type.startsWith('image/'))) return;
    e.preventDefault();
    const text = e.clipboardData?.getData('text/plain') || '';
    const trimmed = text.trim();
    const isPureUrl = /^https?:\/\/\S+$/.test(trimmed);

    // Pure URL: check before HTML so clipboard HTML from the source doesn't bypass linkification
    if (isPureUrl) {
      const sel = window.getSelection();
      if (sel && !sel.isCollapsed) {
        // Wrap existing selection as a link
        document.execCommand('createLink', false, trimmed);
      } else {
        const esc = trimmed.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        document.execCommand('insertHTML', false, `<a href="${esc}">${esc}</a>`);
      }
      return;
    }

    const html = e.clipboardData?.getData('text/html');
    if (html) {
      document.execCommand('insertHTML', false, sanitizePastedHtml(html));
      return;
    }

    if (!text) return;
    // Linkify any URLs in plain text, otherwise insert as-is
    const linked = linkifyText(text);
    if (linked) {
      document.execCommand('insertHTML', false, linked);
    } else {
      document.execCommand('insertText', false, text);
    }
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

    if (isEmpty) {
      deleteBlock(block.id);
    } else {
      updateBlockHtml(block.id, html);
    }
    ctx.onBlockBlur?.(block.id);
  };

  // ── Image crop ───────────────────────────────────────────

  const handleImgLoad = (e) => {
    setNaturalSize({ w: e.target.naturalWidth, h: e.target.naturalHeight });
  };

  const handleImgDoubleClick = (e) => {
    if (!nw || !nh) return;
    e.stopPropagation();
    const initCrop = block.crop
      ? { x: block.crop.x, y: block.crop.y, w: block.crop.w, h: block.crop.h }
      : { x: 0, y: 0, w: nw, h: nh };
    pendingCropRef.current = initCrop;
    setPendingCrop(initCrop);
    setCropping(true);
  };

  // Escape cancels crop mode
  useEffect(() => {
    if (!cropping) return;
    const onKey = (e) => {
      if (e.key === 'Escape') { setCropping(false); setPendingCrop(null); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [cropping]);

  // Legend: sync content from store (undo/page-switch)
  useLayoutEffect(() => {
    const el = captionRef.current;
    if (el && el.innerText !== (block.caption || '')) {
      el.innerText = block.caption || '';
    }
  }, [block.caption]);

  // Legend: focus when editing starts
  useEffect(() => {
    if (!captionEditing || !captionRef.current) return;
    const el = captionRef.current;
    el.focus();
    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }, [captionEditing]);

  // Legend: stop editing when block is deselected
  useEffect(() => {
    if (!isSelected) setLegendEditing(false);
  }, [isSelected]);

  // Legend: Enter key on selected image starts caption editing
  useEffect(() => {
    if (!isSelected || !isImage) return;
    const onKey = (e) => {
      if (e.key === 'Enter' && !captionEditing && !cropping && !document.activeElement?.isContentEditable) {
        e.preventDefault();
        setLegendEditing(true);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isSelected, isImage, captionEditing, cropping]);

  const handleLegendKeyDown = (e) => {
    if (e.key === 'Enter') { e.preventDefault(); captionRef.current?.blur(); }
    if (e.key === 'Escape') {
      if (captionRef.current) captionRef.current.innerText = block.caption || '';
      captionRef.current?.blur();
    }
  };

  const handleLegendBlur = () => {
    const text = captionRef.current?.innerText?.trim() || '';
    setLegendEditing(false);
    updateBlockCaption(block.id, text || null);
  };

  // Checklist: sync text from store when items change externally (undo/remote sync)
  useLayoutEffect(() => {
    if (!isChecklist) return;
    for (const item of (block.items || [])) {
      const el = itemRefs.current[item.id];
      if (el && el.textContent !== item.text) el.textContent = item.text;
    }
  }, [block.items]);

  const startCropDrag = (e, dir) => {
    e.preventDefault();
    e.stopPropagation();
    const zoom = ctx.getZoom();
    const imgScale = block.w / nw; // canvas px per natural px
    const startX = e.clientX, startY = e.clientY;
    const origCrop = { ...pendingCropRef.current };

    function onMove(e2) {
      const dx = (e2.clientX - startX) / zoom / imgScale;
      const dy = (e2.clientY - startY) / zoom / imgScale;
      let { x, y, w, h } = origCrop;
      if (dir.includes('e')) w = Math.max(20, Math.min(nw - x, w + dx));
      if (dir.includes('w')) {
        const d = Math.max(-x, Math.min(w - 20, dx));
        x += d; w -= d;
      }
      if (dir.includes('s')) h = Math.max(20, Math.min(nh - y, h + dy));
      if (dir.includes('n')) {
        const d = Math.max(-y, Math.min(h - 20, dy));
        y += d; h -= d;
      }
      const nc = { x, y, w, h };
      pendingCropRef.current = nc;
      setPendingCrop(nc);
    }

    function onUp() {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', onUp);
      const fc = pendingCropRef.current;
      const isFullImage = fc.x <= 2 && fc.y <= 2 && fc.w >= nw - 2 && fc.h >= nh - 2;
      const cropToSave = isFullImage ? null : { ...fc, nw, nh };
      const pg = getActivePage();
      if (pg) pushUndo(pg.id, { type: 'crop', id: block.id, crop: block.crop ?? null });
      updateBlockCrop(block.id, cropToSave);
      setCropping(false);
    }

    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', onUp);
  };

  // Clicking anywhere on the block (outside content) starts a drag/select
  // and crucially STOPS propagation so canvas doesn't create a new block
  const handleBlockPointerDown = (e) => {
    // Always stop propagation — no canvas actions should fire from block interactions
    e.stopPropagation();
    if (cropping) return;

    // If click lands outside content/handles, initiate drag+select
    const onContent = e.target.closest('.block-content, .block-handle, .block-resize, .img-resize, .block-drag-overlay, .img-border-btn, .block-checklist');
    if (!onContent) {
      ctx.onBlockDragStart(e, block.id);
    }
  };

  return (
    <div
      class={['block', isImage && 'block--image', isLoading && 'block--loading', isSelected && 'block--selected'].filter(Boolean).join(' ')}
      data-block-id={block.id}
      style={{ left: block.x + 'px', top: block.y + 'px', width: block.w + 'px', zIndex: block.z ?? 0 }}
      onPointerDown={handleBlockPointerDown}
    >
      {/* Drag handle — hidden for image blocks */}
      {!isImage && (
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
          {/* Image area — contains frame, resize handles, and drag overlay */}
          <div class="img-media-area">
            {/* Border toggle button — visible when selected */}
            {isSelected && !cropping && (
              <button
                class={`img-border-btn${borderOn ? ' img-border-btn--active' : ''}`}
                title="Toggle border"
                onPointerDown={e => e.stopPropagation()}
                onClick={e => { e.stopPropagation(); toggleBorder(); }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="1.5" y="1.5" width="13" height="13" rx="1"
                    stroke={borderOn ? '#8a4f00' : '#888'}
                    stroke-width={block.border ? '2' : '1.5'}
                    fill="none"
                  />
                </svg>
              </button>
            )}

            {/* Image frame — handles crop rendering */}
            <div
              class="img-frame"
              style={(!cropping && block.crop && nw) ? {
                position: 'relative', overflow: 'hidden',
                height: `${block.crop.h * block.w / block.crop.w}px`,
                outline: borderOn ? '1px solid #000' : undefined,
              } : { position: 'relative', overflow: cropping ? 'hidden' : undefined, outline: borderOn ? '1px solid #000' : undefined }}
            >
              <img
                src={resolvedSrc || ''}
                draggable={false}
                onLoad={handleImgLoad}
                style={(!cropping && block.crop && nw) ? {
                  position: 'absolute',
                  width: `${nw * block.w / block.crop.w}px`,
                  maxWidth: 'none',
                  left: `${-block.crop.x * block.w / block.crop.w}px`,
                  top: `${-block.crop.y * block.w / block.crop.w}px`,
                } : { width: '100%', display: 'block' }}
              />
              {/* Crop overlay — shown while in crop mode */}
              {cropping && pendingCrop && nw && nh && (
                <div class="crop-overlay">
                  <div
                    class="crop-box"
                    style={{
                      left:   `${pendingCrop.x * (block.w / nw)}px`,
                      top:    `${pendingCrop.y * (block.w / nw)}px`,
                      width:  `${pendingCrop.w * (block.w / nw)}px`,
                      height: `${pendingCrop.h * (block.w / nw)}px`,
                    }}
                  >
                    {['n','s','e','w','ne','nw','se','sw'].map(dir => (
                      <div
                        key={dir}
                        class={`crop-handle crop-handle--${dir}`}
                        onPointerDown={(e) => startCropDrag(e, dir)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Corner resize handles — hidden during crop */}
            {!cropping && ['nw', 'ne', 'sw', 'se'].map(dir => (
              <div
                key={dir}
                class={`img-resize img-resize--${dir}`}
                onPointerDown={(e) => { e.stopPropagation(); ctx.onImgResizeStart(e, block.id, dir); }}
              />
            ))}

            {/* Drag overlay — hidden during crop; dblclick enters crop mode */}
            {!cropping && (
              <div
                class="block-drag-overlay"
                onPointerDown={(e) => { e.stopPropagation(); ctx.onBlockDragStart(e, block.id); }}
                onDblClick={handleImgDoubleClick}
                onContextMenu={handleImageContextMenu}
              />
            )}
          </div>

          {/* Legend — below image */}
          {(block.caption || captionEditing) ? (
            <div
              ref={captionRef}
              class="img-caption"
              contentEditable="true"
              data-placeholder="Add a caption…"
              onKeyDown={handleLegendKeyDown}
              onBlur={handleLegendBlur}
              onPointerDown={(e) => e.stopPropagation()}
              suppressContentEditableWarning
            />
          ) : isSelected && !cropping && (
            <div class="img-caption-hint">Press [Enter] to add caption</div>
          )}
        </>
      ) : isChecklist ? (
        <div class="block-checklist">
          {(block.items || []).map(item => (
            <div key={item.id} class={`cb-row${item.checked ? ' cb-row--checked' : ''}`}>
              <button
                class={`cb-check${item.checked ? ' cb-check--checked' : ''}`}
                onPointerDown={e => e.stopPropagation()}
                onClick={e => { e.stopPropagation(); toggleCheckItem(item.id); }}
              />
              <span
                ref={el => { if (el) itemRefs.current[item.id] = el; else delete itemRefs.current[item.id]; }}
                class="cb-text"
                contentEditable="true"
                data-placeholder="List item"
                data-item-id={item.id}
                onKeyDown={e => handleItemKeyDown(e, item.id)}
                onBlur={handleItemBlur}
                onPointerDown={e => e.stopPropagation()}
                suppressContentEditableWarning
              />
            </div>
          ))}
        </div>
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
          onPaste={handlePaste}
          onContextMenu={handleContentContextMenu}
          onPointerDown={(e) => e.stopPropagation()}
          suppressContentEditableWarning
        />
      )}
    </div>
  );
}
