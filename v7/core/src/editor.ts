// ── Helpers ──────────────────────────────────────────────

interface SelectionInfo {
  sel: Selection;
  range: Range;
  node: Text;
  text: string;
  offset: number;
}

function getSelectionInfo(): SelectionInfo | null {
  const sel = window.getSelection();
  if (!sel?.rangeCount) return null;
  const range = sel.getRangeAt(0);
  const node = range.startContainer;
  if (node.nodeType !== Node.TEXT_NODE) return null;
  return { sel, range, node: node as Text, text: node.textContent!, offset: range.startOffset };
}

// Select text from `start` to `end` in a text node, then delete it
function eatText(sel: Selection, node: Text, start: number, end: number): void {
  const r = document.createRange();
  r.setStart(node, start);
  r.setEnd(node, end);
  sel.removeAllRanges();
  sel.addRange(r);
  document.execCommand('delete');
}

// Replace a regex match in a text node with a formatted element
function wrapMatch(sel: Selection, node: Text, match: RegExpMatchArray, tag: string): void {
  const idx = match.index!;
  const full = match[0];
  const inner = match[1];

  // Split node: before | <tag>inner</tag> | after
  const before = node.textContent!.slice(0, idx);
  const after  = node.textContent!.slice(idx + full.length);

  node.textContent = before;
  const el = document.createElement(tag);
  el.textContent = inner;
  node.parentNode!.insertBefore(el, node.nextSibling);
  const afterNode = document.createTextNode(after);
  el.after(afterNode);

  // Place cursor at start of after text
  const r = document.createRange();
  r.setStart(afterNode, 0);
  r.collapse(true);
  sel.removeAllRanges();
  sel.addRange(r);
}

// ── Rich text commands (toolbar) ─────────────────────────

export function execFmt(cmd: string): void {
  const map: Record<string, () => boolean | void> = {
    bold:          () => document.execCommand('bold'),
    italic:        () => document.execCommand('italic'),
    underline:     () => document.execCommand('underline'),
    strikethrough: () => document.execCommand('strikeThrough'),
    h1: () => document.execCommand('formatBlock', false, 'H1'),
    h2: () => document.execCommand('formatBlock', false, 'H2'),
    h3: () => document.execCommand('formatBlock', false, 'H3'),
    h4: () => document.execCommand('formatBlock', false, 'H4'),
    p:  () => document.execCommand('formatBlock', false, 'P'),
    ul: () => document.execCommand('insertUnorderedList'),
    ol: () => document.execCommand('insertOrderedList'),
    link: () => { const u = prompt('URL:'); if (u) document.execCommand('createLink', false, u); },
  };
  map[cmd]?.();
}

// ── Markdown shortcuts — called on `input` event ──────────
// Returns 'code' if block was converted to a code block, null otherwise.

export function handleMarkdownInput(el: HTMLElement): 'code' | null {
  const info = getSelectionInfo();
  if (!info) return null;
  const { sel, range, node, text, offset } = info;
  const before = text.slice(0, offset);

  // ── Block-level triggers (at start of line) ───────────

  // Headings: # ## ### #### + space
  const hMatch = before.match(/^(#{1,4}) $/);
  if (hMatch) {
    eatText(sel, node, 0, offset);
    document.execCommand('formatBlock', false, `H${hMatch[1].length}`);
    return null;
  }

  // Unordered list: "- " or "* "
  if (before === '- ' || before === '* ') {
    eatText(sel, node, 0, offset);
    document.execCommand('insertUnorderedList');
    return null;
  }

  // Ordered list: "1. " etc.
  if (/^\d+\. $/.test(before)) {
    eatText(sel, node, 0, offset);
    document.execCommand('insertOrderedList');
    return null;
  }

  // Blockquote: "> "
  if (before === '> ') {
    eatText(sel, node, 0, offset);
    document.execCommand('formatBlock', false, 'BLOCKQUOTE');
    return null;
  }

  // Code block: "``` "
  if (before === '``` ') {
    eatText(sel, node, 0, offset);
    el.setAttribute('data-code', '1');
    el.classList.add('code-block');
    return 'code'; // caller should persist block.type
  }

  // ── Inline triggers (pattern completed with space) ────

  // **bold** or __bold__ — ended just before cursor
  const boldM = before.match(/\*\*(.+?)\*\*$/) || before.match(/__(.+?)__$/);
  if (boldM) {
    wrapMatch(sel, node, boldM, 'strong');
    return null;
  }

  // *italic* or _italic_ (single, not double)
  const italicM = before.match(/(?<!\*)\*([^*\n]+)\*$/) || before.match(/(?<!_)_([^_\n]+)_$/);
  if (italicM) {
    wrapMatch(sel, node, italicM, 'em');
    return null;
  }

  return null;
}

// ── Inline code — called after backtick input ─────────────

export function handleInlineCode(el: HTMLElement): boolean {
  const info = getSelectionInfo();
  if (!info) return false;
  const { sel, range, node, offset } = info;
  const before = node.textContent!.slice(0, offset);
  // Detect `text` pattern ending at cursor
  const m = before.match(/`([^`\n]+)`$/);
  if (!m) return false;

  const idx = m.index!;
  const inner = m[1];
  const before2 = node.textContent!.slice(0, idx);
  const after = node.textContent!.slice(idx + m[0].length);

  node.textContent = before2;
  const code = document.createElement('code');
  code.textContent = inner;
  node.parentNode!.insertBefore(code, node.nextSibling);
  const afterNode = document.createTextNode(after || '\u200B');
  code.after(afterNode);

  const r = document.createRange();
  r.setStart(afterNode, 0);
  r.collapse(true);
  sel.removeAllRanges();
  sel.addRange(r);
  return true;
}

// ── List key handling ─────────────────────────────────────

export function handleListKey(e: KeyboardEvent): boolean {
  const container = window.getSelection()?.getRangeAt(0)?.startContainer;
  const li = container && (
    container.nodeType === Node.ELEMENT_NODE
      ? (container as Element).closest('li')
      : (container as Node).parentElement?.closest('li')
  );
  if (!li) return false;

  if (e.key === 'Tab') {
    e.preventDefault();
    document.execCommand(e.shiftKey ? 'outdent' : 'indent');
    return true;
  }

  if (e.key === 'Enter' && li.textContent!.trim() === '') {
    // Check if truly at top level: parent is UL/OL whose parent is NOT an LI
    const listEl = li.parentElement;
    const isTopLevel = listEl && (listEl.tagName === 'UL' || listEl.tagName === 'OL')
      && listEl.parentElement?.tagName !== 'LI';
    if (isTopLevel) {
      e.preventDefault();
      document.execCommand('outdent');
      document.execCommand('formatBlock', false, 'P');
      return true;
    }
    if (!isTopLevel) {
      // Nested empty item — just deindent
      e.preventDefault();
      document.execCommand('outdent');
      return true;
    }
  }

  if (e.key === 'Backspace' && li.textContent!.trim() === '') {
    e.preventDefault();
    document.execCommand('outdent');
    return true;
  }

  return false;
}

// ── Code block tab ────────────────────────────────────────

function handleCodeTab(e: KeyboardEvent, el: HTMLElement): boolean {
  if (!el.getAttribute('data-code')) return false;
  if (e.key !== 'Tab') return false;
  e.preventDefault();
  document.execCommand('insertText', false, '  ');
  return true;
}

// ── Main keydown dispatcher ───────────────────────────────
// Call from block's onKeyDown. Returns true if handled.

export function onBlockKeyDown(e: KeyboardEvent, el: HTMLElement): boolean {
  const mod = e.ctrlKey || e.metaKey;

  // Explicit format shortcuts (belt-and-suspenders alongside native handling)
  if (mod && !e.shiftKey && !e.altKey) {
    if (e.key === 'b') { e.preventDefault(); document.execCommand('bold'); return true; }
    if (e.key === 'i') { e.preventDefault(); document.execCommand('italic'); return true; }
    if (e.key === 'u') { e.preventDefault(); document.execCommand('underline'); return true; }
  }

  if (handleCodeTab(e, el)) return true;
  if (handleListKey(e)) return true;

  // Prevent Tab from escaping the block (scrollable containers are implicitly focusable)
  if (e.key === 'Tab') { e.preventDefault(); return true; }

  // Backtick → inline code (check after char is inserted)
  if (e.key === '`') {
    setTimeout(() => handleInlineCode(el), 0);
  }

  return false;
}
