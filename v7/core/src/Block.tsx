import { useRef, useEffect, useLayoutEffect, useContext, useState } from 'preact/hooks';
import { signal } from '@preact/signals';
import { CanvasCtx } from './Canvas.tsx';
import { openContextMenu } from './ContextMenu.tsx';
import { editingEnabled, updateBlockHtml, updateBlockHtmlLocal, updateBlockTextDiff, updateBlockType, deleteBlock, getActivePage, updateBlockCrop, updateBlockCaption, updateBlockBorder, updateChecklistItems, updateChecklistItemsSilent, uid } from './store.ts';
import { onBlockKeyDown, handleMarkdownInput } from './editor.ts';
import { pushUndo } from './undo.ts';
import { htmlToMarkdown } from './clipboard.ts';
import type { Block as BlockType, Page, ChecklistItem, CropData, TextDiff, MenuItem, CanvasContext } from './types.ts';
import type { JSX } from 'preact';

function computeTextDiff(oldText: string, newText: string): TextDiff[] {
  let p = 0;
  const minLen = Math.min(oldText.length, newText.length);
  while (p < minLen && oldText[p] === newText[p]) p++;
  let oldEnd = oldText.length;
  let newEnd = newText.length;
  while (oldEnd > p && newEnd > p && oldText[oldEnd - 1] === newText[newEnd - 1]) {
    oldEnd--; newEnd--;
  }
  const diffs: TextDiff[] = [];
  if (oldEnd > p) diffs.push({ type: 'delete', pos: p, count: oldEnd - p });
  const ins = newText.slice(p, newEnd);
  if (ins) diffs.push({ type: 'insert', pos: p, text: ins });
  return diffs;
}


// ─── Link context menu state ────────────────────────────
interface LinkMenuState {
  x: number;
  y: number;
  href: string;
  anchorEl: HTMLAnchorElement;
  blockId: string;
}

const linkMenu = signal<LinkMenuState | null>(null);

export function LinkContextMenu(): JSX.Element | null {
  const m = linkMenu.value;
  if (!m) return null;

  const close = (): void => { linkMenu.value = null; };

  const openLink = (): void => {
    if (window.notebook?.openExternal) window.notebook.openExternal(m.href);
    close();
  };

  const editLink = (): void => {
    const url = prompt('Edit URL:', m.href);
    if (url != null) {
      m.anchorEl.href = url;
      // persist html change
      const blockEl = m.anchorEl.closest('.block-content') as HTMLElement | null;
      if (blockEl) {
        updateBlockHtml(m.blockId, blockEl.innerHTML);
      }
    }
    close();
  };

  const removeLink = (): void => {
    const parent = m.anchorEl.parentNode!;
    while (m.anchorEl.firstChild) parent.insertBefore(m.anchorEl.firstChild, m.anchorEl);
    parent.removeChild(m.anchorEl);
    const blockEl = (parent as HTMLElement).closest('.block-content') as HTMLElement | null;
    if (blockEl) {
      updateBlockHtml(m.blockId, blockEl.innerHTML);
    }
    close();
  };

  return (
    <div class="link-menu" style={{ left: m.x + 'px', top: m.y + 'px' }} onMouseDown={(e: MouseEvent) => e.stopPropagation()}>
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

function linkifyText(text: string): string | null {
  let hasUrl = false;
  const segments: string[] = [];
  let last = 0;
  LINK_URL_RE.lastIndex = 0;
  let m: RegExpExecArray | null;
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

function sanitizePastedHtml(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html');

  function walk(node: Node): Node | null {
    if (node.nodeType === Node.TEXT_NODE) return document.createTextNode(node.textContent || '');
    if (node.nodeType !== Node.ELEMENT_NODE) return null;

    const el = node as HTMLElement;
    const tag = el.tagName.toLowerCase();
    const children = document.createDocumentFragment();
    for (const child of [...el.childNodes]) {
      const r = walk(child);
      if (r) children.appendChild(r);
    }

    if (!PASTE_ALLOWED.has(tag)) return children; // unwrap unknown tags

    const out = document.createElement(
      tag === 'strong' ? 'b' : tag === 'em' ? 'i' : tag === 'strike' ? 's' : tag
    );
    if (tag === 'a') {
      const href = el.getAttribute('href');
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

interface BlockProps {
  block: BlockType;
  page: Page;
}

export function Block({ block, page }: BlockProps): JSX.Element {
  const ctx = useContext(CanvasCtx)!;
  const contentRef = useRef<HTMLDivElement>(null);
  const isImage     = block.type === 'image';
  const isLoading   = block.type === 'loading';
  const isChecklist = block.type === 'checklist';
  const isSelected = ctx.selectedIds.has(block.id);

  // Resolve notebook blob refs ("blob:<sha256>") to data URLs.
  // Object URLs ("blob:null/...") and other srcs are used directly.
  const isNotebookBlob = (s: string): boolean => s.startsWith('blob:') && !s.includes('/');
  const rawSrc = block.src || '';
  const [resolvedSrc, setResolvedSrc] = useState<string | null>(isNotebookBlob(rawSrc) ? null : rawSrc);

  // Image crop state
  const [naturalSize, setNaturalSize] = useState<{ w: number; h: number } | null>(null);
  const [cropping, setCropping] = useState<boolean>(false);
  const [pendingCrop, setPendingCrop] = useState<{ x: number; y: number; w: number; h: number } | null>(null);
  const pendingCropRef = useRef<{ x: number; y: number; w: number; h: number } | null>(null);

  // Border local state — drives immediate visual feedback; store is source of truth on mount/undo
  const [borderOn, setBorderOn] = useState<boolean>(!!block.border);
  useEffect(() => { setBorderOn(!!block.border); }, [block.border]);

  // Checklist item DOM refs (itemId → span element)
  const itemRefs = useRef<Record<string, HTMLSpanElement>>({});

  const toggleBorder = (): void => {
    const next = !borderOn;
    setBorderOn(next);
    updateBlockBorder(block.id, next);
  };

  // ── Checklist handlers ───────────────────────────────────

  // Read current text from DOM refs (may be ahead of block.items during typing)
  const getItemsWithDOMText = (): ChecklistItem[] =>
    (block.items || []).map(i => ({ ...i, text: itemRefs.current[i.id]?.textContent ?? i.text }));

  const toggleCheckItem = (itemId: string): void => {
    const items = getItemsWithDOMText().map(i =>
      i.id === itemId ? { ...i, checked: !i.checked } : i
    );
    updateChecklistItems(block.id, items);
  };

  const handleItemKeyDown = (e: KeyboardEvent, itemId: string): void => {
    const mod = e.ctrlKey || e.metaKey;
    if (mod && e.key === 'z') { e.preventDefault(); e.shiftKey ? ctx.redo() : ctx.undo(); return; }

    const items = block.items || [];
    const idx = items.findIndex(i => i.id === itemId);

    if (e.key === 'Enter') {
      e.preventDefault();
      const newItem: ChecklistItem = { id: uid(), text: '', checked: false };
      const current = getItemsWithDOMText();
      const newItems = [...current.slice(0, idx + 1), newItem, ...current.slice(idx + 1)];
      updateChecklistItems(block.id, newItems);
      requestAnimationFrame(() => itemRefs.current[newItem.id]?.focus());
      return;
    }

    if (e.key === 'Backspace' && (e.target as HTMLElement).textContent === '') {
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
          window.getSelection()!.removeAllRanges();
          window.getSelection()!.addRange(r);
        }
      });
      return;
    }
  };

  const handleItemBlur = (): void => {
    // Save text silently (no re-render) to keep store in sync
    updateChecklistItemsSilent(block.id, getItemsWithDOMText());
  };

  // Legend state
  const captionRef = useRef<HTMLDivElement>(null);
  const [captionEditing, setLegendEditing] = useState<boolean>(false);
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
  const undoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const htmlAtFocus = useRef<string | null>(null);
  const prevTextRef = useRef<string | null>(null);

  const handleInput = (): void => {
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
    if (undoTimer.current !== null) clearTimeout(undoTimer.current);
    undoTimer.current = setTimeout(() => {
      if (htmlAtFocus.current != null && htmlAtFocus.current !== el.innerHTML) {
        pushUndo(page.id, { type: 'html', id: block.id, html: htmlAtFocus.current });
        htmlAtFocus.current = el.innerHTML;
      }
    }, 1500);
  };

  const handleKeyDown = (e: KeyboardEvent): void => {
    const mod = e.ctrlKey || e.metaKey;

    // Undo / redo
    if (mod && e.key === 'z') {
      e.preventDefault();
      e.shiftKey ? ctx.redo() : ctx.undo();
      return;
    }

    onBlockKeyDown(e, contentRef.current!);
  };

  const handleFocus = (): void => {
    htmlAtFocus.current = block.html;
    prevTextRef.current = contentRef.current?.innerText || '';
    ctx.onBlockFocus?.(block.id);
  };

  const handleContentClick = (e: MouseEvent): void => {
    const anchor = (e.target as HTMLElement).closest('a[href]') as HTMLAnchorElement | null;
    if (!anchor) return;
    e.preventDefault();
    if (window.notebook?.openExternal) window.notebook.openExternal(anchor.href);
  };

  const handleContentContextMenu = (e: MouseEvent): void => {
    const anchor = (e.target as HTMLElement).closest('a[href]') as HTMLAnchorElement | null;
    if (anchor) {
      e.preventDefault();
      e.stopPropagation();
      linkMenu.value = { x: e.clientX, y: e.clientY, href: anchor.href, anchorEl: anchor, blockId: block.id };
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    const selText = window.getSelection()?.toString() || '';
    const items: MenuItem[] = [];
    if (selText) {
      items.push({ label: 'Copy', action: () => document.execCommand('copy') });
      const sel = window.getSelection();
      const range = sel?.rangeCount ? sel.getRangeAt(0) : null;
      const div = document.createElement('div');
      if (range) div.appendChild(range.cloneContents());
      const md = htmlToMarkdown(div.innerHTML);
      items.push({ label: 'Copy as Markdown', action: () => navigator.clipboard.writeText(md) });
    } else {
      items.push({ label: 'Copy', disabled: true, action: () => {} });
      items.push({ label: 'Copy as Markdown', disabled: true, action: () => {} });
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

  const handleImageContextMenu = (e: MouseEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    const items: MenuItem[] = [
      { label: 'Copy', action: () => {
        const img = (e.target as HTMLElement).closest('.img-frame')?.querySelector('img');
        if (!img) return;
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        canvas.getContext('2d')!.drawImage(img, 0, 0);
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

  const handleCopy = (e: ClipboardEvent): void => {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed) return;
    const range = sel.getRangeAt(0);
    const div = document.createElement('div');
    div.appendChild(range.cloneContents());
    const selectedHtml = div.innerHTML;
    const markdown = htmlToMarkdown(selectedHtml);
    if (!markdown) return;
    e.preventDefault();
    e.clipboardData!.setData('text/plain', sel.toString());
    e.clipboardData!.setData('text/html', selectedHtml);
    e.clipboardData!.setData('text/markdown', markdown);
  };

  const handlePaste = (e: ClipboardEvent): void => {
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

  const handleBlur = (): void => {
    if (undoTimer.current !== null) clearTimeout(undoTimer.current);
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

  const handleImgLoad = (e: Event): void => {
    const img = e.target as HTMLImageElement;
    setNaturalSize({ w: img.naturalWidth, h: img.naturalHeight });
  };

  const handleImgDoubleClick = (e: MouseEvent): void => {
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
    const onKey = (e: KeyboardEvent): void => {
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
    const sel = window.getSelection()!;
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
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Enter' && !captionEditing && !cropping && !(document.activeElement as HTMLElement)?.isContentEditable) {
        e.preventDefault();
        setLegendEditing(true);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isSelected, isImage, captionEditing, cropping]);

  const handleLegendKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Enter') { e.preventDefault(); captionRef.current?.blur(); }
    if (e.key === 'Escape') {
      if (captionRef.current) captionRef.current.innerText = block.caption || '';
      captionRef.current?.blur();
    }
  };

  const handleLegendBlur = (): void => {
    const text = captionRef.current?.innerText?.trim() || '';
    setLegendEditing(false);
    updateBlockCaption(block.id, text || undefined);
  };

  // Checklist: sync text from store when items change externally (undo/remote sync)
  useLayoutEffect(() => {
    if (!isChecklist) return;
    for (const item of (block.items || [])) {
      const el = itemRefs.current[item.id];
      if (el && el.textContent !== item.text) el.textContent = item.text;
    }
  }, [block.items]);

  const startCropDrag = (e: PointerEvent, dir: string): void => {
    e.preventDefault();
    e.stopPropagation();
    const zoom = ctx.getZoom();
    const imgScale = block.w / nw!; // canvas px per natural px
    const startX = e.clientX, startY = e.clientY;
    const origCrop = { ...pendingCropRef.current! };

    function onMove(e2: PointerEvent): void {
      const dx = (e2.clientX - startX) / zoom / imgScale;
      const dy = (e2.clientY - startY) / zoom / imgScale;
      let { x, y, w, h } = origCrop;
      if (dir.includes('e')) w = Math.max(20, Math.min(nw! - x, w + dx));
      if (dir.includes('w')) {
        const d = Math.max(-x, Math.min(w - 20, dx));
        x += d; w -= d;
      }
      if (dir.includes('s')) h = Math.max(20, Math.min(nh! - y, h + dy));
      if (dir.includes('n')) {
        const d = Math.max(-y, Math.min(h - 20, dy));
        y += d; h -= d;
      }
      const nc = { x, y, w, h };
      pendingCropRef.current = nc;
      setPendingCrop(nc);
    }

    function onUp(): void {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', onUp);
      const fc = pendingCropRef.current!;
      const isFullImage = fc.x <= 2 && fc.y <= 2 && fc.w >= nw! - 2 && fc.h >= nh! - 2;
      const cropToSave = isFullImage ? undefined : { ...fc, nw: nw!, nh: nh! };
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
  const handleBlockPointerDown = (e: PointerEvent): void => {
    // Always stop propagation — no canvas actions should fire from block interactions
    e.stopPropagation();
    if (cropping) return;

    // If click lands outside content/handles, initiate drag+select
    const onContent = (e.target as HTMLElement).closest('.block-content, .block-handle, .block-resize, .img-resize, .block-drag-overlay, .img-border-btn, .block-checklist');
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
          onPointerDown={(e: PointerEvent) => { e.stopPropagation(); ctx.onBlockDragStart(e, block.id); }}
        />
      )}

      {/* Resize handle — top-right, width only, hidden for image blocks */}
      {!isImage && (
        <div
          class="block-resize"
          onPointerDown={(e: PointerEvent) => { e.stopPropagation(); ctx.onBlockResizeStart(e, block.id); }}
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
                onPointerDown={(e: PointerEvent) => e.stopPropagation()}
                onClick={(e: MouseEvent) => { e.stopPropagation(); toggleBorder(); }}
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
                        onPointerDown={(e: PointerEvent) => startCropDrag(e, dir)}
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
                onPointerDown={(e: PointerEvent) => { e.stopPropagation(); ctx.onImgResizeStart(e, block.id, dir); }}
              />
            ))}

            {/* Drag overlay — hidden during crop; dblclick enters crop mode */}
            {!cropping && (
              <div
                class="block-drag-overlay"
                onPointerDown={(e: PointerEvent) => { e.stopPropagation(); ctx.onBlockDragStart(e, block.id); }}
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
              onPointerDown={(e: PointerEvent) => e.stopPropagation()}
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
                onPointerDown={(e: PointerEvent) => e.stopPropagation()}
                onClick={(e: MouseEvent) => { e.stopPropagation(); toggleCheckItem(item.id); }}
              />
              <span
                ref={(el: HTMLSpanElement | null) => { if (el) itemRefs.current[item.id] = el; else delete itemRefs.current[item.id]; }}
                class="cb-text"
                contentEditable="true"
                data-placeholder="List item"
                data-item-id={item.id}
                onKeyDown={(e: KeyboardEvent) => handleItemKeyDown(e, item.id)}
                onBlur={handleItemBlur}
                onPointerDown={(e: PointerEvent) => e.stopPropagation()}
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
          onCopy={handleCopy}
          onPaste={handlePaste}
          onContextMenu={handleContentContextMenu}
          onPointerDown={(e: PointerEvent) => e.stopPropagation()}
        />
      )}
    </div>
  );
}
