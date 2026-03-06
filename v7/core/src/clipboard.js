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

// ── HTML → Markdown conversion ────────────────────────────

// Splits a <li>'s children into inline text vs nested list, returning "text\n  - subitem" form
function _liToMd(li, indent) {
  let text = '';
  let nested = '';
  for (const c of li.childNodes) {
    if (c.nodeType === Node.ELEMENT_NODE && (c.tagName === 'UL' || c.tagName === 'OL'))
      nested += '\n' + _nodeToMd(c, indent + '    ');
    else
      text += _nodeToMd(c, indent);
  }
  return text.trim() + nested.trimEnd();
}

function _nodeToMd(node, indent = '') {
  if (node.nodeType === Node.TEXT_NODE) return node.textContent;
  if (node.nodeType !== Node.ELEMENT_NODE) return '';
  const tag = node.tagName.toLowerCase();
  const inner = () => [...node.childNodes].map(c => _nodeToMd(c, indent)).join('');
  switch (tag) {
    case 'strong': case 'b':              return `**${inner()}**`;
    case 'em':     case 'i':              return `*${inner()}*`;
    case 's':      case 'strike': case 'del': return `~~${inner()}~~`;
    case 'code':                          return `\`${inner()}\``;
    case 'a': { const href = node.getAttribute('href') || ''; const t = inner(); return href ? `[${t}](${href})` : t; }
    case 'br':  return '\n';
    case 'h1':  return `# ${inner()}\n\n`;
    case 'h2':  return `## ${inner()}\n\n`;
    case 'h3':  return `### ${inner()}\n\n`;
    case 'h4':  return `#### ${inner()}\n\n`;
    case 'h5':  return `##### ${inner()}\n\n`;
    case 'h6':  return `###### ${inner()}\n\n`;
    case 'ul': {
      let r = '';
      for (const c of node.childNodes) {
        if (c.nodeType !== Node.ELEMENT_NODE) continue;
        if (c.tagName === 'LI') r += `${indent}- ${_liToMd(c, indent)}\n`;
        else if (c.tagName === 'UL' || c.tagName === 'OL') r += _nodeToMd(c, indent + '    ');
      }
      return r + (indent ? '' : '\n');
    }
    case 'ol': {
      let r = ''; let i = 1;
      for (const c of node.childNodes) {
        if (c.nodeType !== Node.ELEMENT_NODE) continue;
        if (c.tagName === 'LI') r += `${indent}${i++}. ${_liToMd(c, indent)}\n`;
        else if (c.tagName === 'UL' || c.tagName === 'OL') r += _nodeToMd(c, indent + '    ');
      }
      return r + (indent ? '' : '\n');
    }
    case 'li':  return `${indent}- ${_liToMd(node, indent)}\n`;
    case 'p':   return `${inner()}\n\n`;
    case 'div': {
      if (node.childNodes.length === 1 && node.firstChild?.nodeName === 'BR') return '\n';
      const c = inner(); return c ? `${c}\n` : '';
    }
    default:    return inner();
  }
}

export function htmlToMarkdown(html) {
  const wrap = new DOMParser().parseFromString(`<div>${html}</div>`, 'text/html').body.firstChild;
  return _nodeToMd(wrap).replace(/\n{3,}/g, '\n\n').trim();
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
