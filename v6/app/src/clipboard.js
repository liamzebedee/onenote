import { addBlock, addImageFromFile, addImageFromUrl } from './store.js';

function canvasCenter(container, view) {
  const { zoom } = view;
  const rect = container?.getBoundingClientRect();
  return {
    x: rect ? (rect.width  / 2 + container.scrollLeft) / zoom : 100,
    y: rect ? (rect.height / 2 + container.scrollTop)  / zoom : 100,
  };
}

function pasteInsertPoint(container, view) {
  const { zoom } = view;
  if (!container) return { x: 40, y: 40, w: 600 };
  const margin = 40;
  return {
    x: (container.scrollLeft / zoom) + margin,
    y: (container.scrollTop  / zoom) + margin,
    w: Math.round(container.clientWidth * (2 / 3) / zoom),
  };
}

function toHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br>');
}

// Register a document-level paste handler.
// Handles images (→ image block) and plain text with no focused block (→ text block).
// Returns a cleanup function.
export function initPasteHandler({ getContainer, getView }) {
  function onPaste(e) {
    const items = [...(e.clipboardData?.items || [])];

    // Actual files (e.g. copied from Finder) — same path as drag/drop, preserves GIF/WebP/etc.
    const pastedFiles = [...(e.clipboardData?.files || [])].filter(f => f.type.startsWith('image/'));
    if (pastedFiles.length) {
      e.preventDefault();
      const { x, y } = canvasCenter(getContainer(), getView());
      pastedFiles.forEach((file, i) => addImageFromFile(file, x + i * 20, y + i * 20));
      return;
    }

    // Clipboard image data (screenshots, copied images from browsers) — fallback to items
    const imageItem = items.find(i => i.type.startsWith('image/'));
    if (imageItem) {
      e.preventDefault();
      const file = imageItem.getAsFile();
      if (!file) return;
      const { x, y } = canvasCenter(getContainer(), getView());
      addImageFromFile(file, x, y);
      return;
    }

    // Extract <img> tags from HTML → image blocks
    const html = e.clipboardData?.getData('text/html') || '';
    if (html && addImageFromUrl) {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const srcs = [...doc.querySelectorAll('img')]
        .map(img => img.src)
        .filter(src => src && !src.startsWith('data:'));
      if (srcs.length) {
        const { x, y } = canvasCenter(getContainer(), getView());
        srcs.forEach((src, i) => addImageFromUrl(src, x + i * 20, y + i * 20));
      }
    }

    // Text: only when no contenteditable block is focused (Block.jsx handles that case)
    if (document.activeElement?.closest('[contenteditable]')) return;
    const text = e.clipboardData?.getData('text/plain') || '';
    if (!text.trim()) return;
    e.preventDefault();
    const { x, y, w } = pasteInsertPoint(getContainer(), getView());
    addBlock(x, y, w, 'text', { html: toHtml(text) });
  }

  document.addEventListener('paste', onPaste);
  return () => document.removeEventListener('paste', onPaste);
}
