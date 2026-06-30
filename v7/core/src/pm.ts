import { Schema, DOMParser as PMDOMParser, DOMSerializer, Node as PMNode, MarkType, NodeType } from 'prosemirror-model';
import { EditorState, Plugin, Transaction } from 'prosemirror-state';
import {
  inputRules, wrappingInputRule, textblockTypeInputRule,
  smartQuotes, ellipsis, emDash, InputRule,
} from 'prosemirror-inputrules';

// ─── ProseMirror Schema ──────────────────────────────────────
export const schema = new Schema({
  nodes: {
    doc: { content: 'block+' },
    paragraph: {
      group: 'block',
      content: 'inline*',
      parseDOM: [{ tag: 'p' }, { tag: 'div', priority: 10 }],
      toDOM() { return ['p', 0]; },
    },
    heading: {
      group: 'block',
      content: 'inline*',
      attrs: { level: { default: 1 } },
      parseDOM: [
        { tag: 'h1', getAttrs() { return { level: 1 }; } },
        { tag: 'h2', getAttrs() { return { level: 2 }; } },
        { tag: 'h3', getAttrs() { return { level: 3 }; } },
        { tag: 'h4', getAttrs() { return { level: 4 }; } },
      ],
      toDOM(node) { return [`h${node.attrs.level}`, 0]; },
    },
    code_block: {
      group: 'block',
      content: 'text*',
      parseDOM: [{ tag: 'pre' }],
      toDOM() { return ['pre', ['code', 0]]; },
    },
    blockquote: {
      group: 'block',
      content: 'block+',
      parseDOM: [{ tag: 'blockquote' }],
      toDOM() { return ['blockquote', 0]; },
    },
    bullet_list: {
      group: 'block',
      content: 'list_item+',
      parseDOM: [{ tag: 'ul' }],
      toDOM() { return ['ul', 0]; },
    },
    ordered_list: {
      group: 'block',
      content: 'list_item+',
      attrs: { start: { default: 1 } },
      parseDOM: [{ tag: 'ol', getAttrs: (dom: any) => ({ start: parseInt(dom.getAttribute('start') || '1') }) }],
      toDOM(node) { return node.attrs.start === 1 ? ['ol', 0] : ['ol', { start: node.attrs.start }, 0]; },
    },
    list_item: {
      group: 'list_content',
      content: 'paragraph block*',
      parseDOM: [{ tag: 'li' }],
      toDOM() { return ['li', 0]; },
    },
    text: { group: 'inline' },
    hard_break: {
      inline: true,
      group: 'inline',
      selectable: false,
      parseDOM: [{ tag: 'br' }],
      toDOM() { return ['br']; },
    },
  },
  marks: {
    strong: {
      parseDOM: [{ tag: 'strong' }, { tag: 'b' }, { style: 'font-weight', getAttrs: (v: any) => /^(bold(er)?|[5-9]\d{2,})$/.test(v) && null }],
      toDOM() { return ['strong', 0]; },
    },
    em: {
      parseDOM: [{ tag: 'i' }, { tag: 'em' }, { style: 'font-style=italic' }],
      toDOM() { return ['em', 0]; },
    },
    underline: {
      parseDOM: [{ tag: 'u' }, { style: 'text-decoration=underline' }],
      toDOM() { return ['u', 0]; },
    },
    strikethrough: {
      parseDOM: [{ tag: 's' }, { tag: 'del' }, { tag: 'strike' }, { style: 'text-decoration=line-through' }],
      toDOM() { return ['s', 0]; },
    },
    code: {
      parseDOM: [{ tag: 'code' }],
      toDOM() { return ['code', 0]; },
    },
    link: {
      attrs: { href: { default: '' } },
      inclusive: false,
      parseDOM: [{ tag: 'a[href]', getAttrs: (dom: any) => ({ href: dom.getAttribute('href') }) }],
      toDOM(mark) { return ['a', { href: mark.attrs.href }, 0]; },
    },
  },
});

// ─── HTML ↔ ProseMirror Conversion ──────────────────────────

/**
 * Parse HTML string into a ProseMirror document.
 * Handles edge cases: empty content, malformed HTML, etc.
 */
export function parseHTML(html: string): PMNode {
  if (!html || typeof html !== 'string') {
    return schema.node('doc', {}, [schema.node('paragraph')]);
  }

  const trimmed = html.trim();
  if (!trimmed) {
    return schema.node('doc', {}, [schema.node('paragraph')]);
  }

  try {
    const div = document.createElement('div');
    div.innerHTML = trimmed;

    // Use ProseMirror's DOM parser
    const parser = PMDOMParser.fromSchema(schema);
    const doc = parser.parse(div);

    // Ensure we always have at least one block
    if (!doc.content.size) {
      return schema.node('doc', {}, [schema.node('paragraph')]);
    }

    return doc;
  } catch (e) {
    console.error('Failed to parse HTML:', e, html);
    return schema.node('doc', {}, [schema.node('paragraph')]);
  }
}

/**
 * Serialize a ProseMirror document to HTML string.
 */
export function serializeToHTML(doc: PMNode): string {
  try {
    const serializer = DOMSerializer.fromSchema(schema);
    const fragment = serializer.serializeFragment(doc.content);
    const div = document.createElement('div');
    div.appendChild(fragment);
    const html = div.innerHTML;
    return html || '<p></p>';
  } catch (e) {
    console.error('Failed to serialize to HTML:', e);
    return '<p></p>';
  }
}

// ─── Markdown Shortcuts (Input Rules) ───────────────────────

/**
 * Input rule that wraps the matched text in a mark (e.g. **bold** → bold).
 * The full match (including the markup characters) is replaced with just the
 * captured inner text, which then carries the mark.
 */
function markInputRule(regexp: RegExp, markType: MarkType): InputRule {
  return new InputRule(regexp, (state, match, start, end) => {
    const inner = match[1];
    if (!inner) return null;
    const fullStart = start;
    const tr = state.tr;
    // Replace the whole match with the inner text.
    tr.delete(fullStart, end);
    tr.insertText(inner, fullStart);
    const mark = markType.create();
    tr.addMark(fullStart, fullStart + inner.length, mark);
    // Clear stored mark so subsequent typing isn't marked.
    tr.removeStoredMark(markType);
    return tr;
  });
}

/**
 * Build the full set of markdown input rules for the editor.
 * Block-level rules fire on space; mark rules fire on the closing delimiter.
 */
export function buildInputRules(): Plugin {
  const rules = [
    ...smartQuotes,
    ellipsis,
    emDash,

    // # Heading … #### Heading
    textblockTypeInputRule(/^(#{1,4})\s$/, schema.nodes.heading, match => ({ level: match[1].length })),

    // ``` → code block
    textblockTypeInputRule(/^```$/, schema.nodes.code_block),

    // > Blockquote
    wrappingInputRule(/^\s*>\s$/, schema.nodes.blockquote),

    // "- ", "* ", "+ " → bullet list
    wrappingInputRule(/^\s*([-*+])\s$/, schema.nodes.bullet_list),

    // "1. " → ordered list
    wrappingInputRule(
      /^(\d+)\.\s$/,
      schema.nodes.ordered_list,
      match => ({ start: +match[1] }),
      (match, node) => node.childCount + node.attrs.start === +match[1],
    ),

    // **bold** / __bold__  (listed before italic so it wins on the 2nd '*')
    markInputRule(/(?:\*\*|__)([^*_]+)(?:\*\*|__)$/, schema.marks.strong),
    // *italic* / _italic_  — the lookbehind stops a single '*' from firing on the
    // first closing star of "**bold*" (which would italicise instead of bolding).
    markInputRule(/(?<![*_])(?:\*|_)([^*_]+)(?:\*|_)$/, schema.marks.em),
    // `code`
    markInputRule(/`([^`]+)`$/, schema.marks.code),
    // ~~strike~~
    markInputRule(/~~([^~]+)~~$/, schema.marks.strikethrough),
  ];
  return inputRules({ rules });
}

// ─── Linkifier Plugin ───────────────────────────────────────

const LINK_URL_RE = /https?:\/\/[^\s<>"{}|\\^`[\]]+(?<![.,;:!?])/g;

/**
 * Linkifier plugin: automatically wraps URLs in link marks.
 */
export function linkifierPlugin(): Plugin {
  return new Plugin({
    props: {
      handleTextInput(view: any, from: number, to: number, text: string) {
        if (!/[\s\n]/.test(text)) return false;

        const $from = view.state.doc.resolve(from);
        const node = $from.parent;
        const line = node.textContent.slice(0, $from.parentOffset + text.length);

        let match;
        LINK_URL_RE.lastIndex = 0;
        const matches: Array<{ start: number; end: number; url: string }> = [];

        while ((match = LINK_URL_RE.exec(line)) !== null) {
          matches.push({
            start: $from.start() + match.index,
            end: $from.start() + match.index + match[0].length,
            url: match[0],
          });
        }

        if (matches.length === 0) return false;

        let tr = view.state.tr;
        for (const m of matches) {
          tr = tr.addMark(m.start, m.end, schema.marks.link.create({ href: m.url }));
        }

        view.dispatch(tr);
        return false; // Let PM handle the text input normally
      },
    },
  });
}

// ─── Active-view registry + toolbar commands ────────────────
//
// The format toolbar (and any global keybinding) needs to act on whichever
// block editor currently has focus. Each BlockEditor registers its view on
// focus and clears it on blur, so toolbar buttons can dispatch real
// ProseMirror commands instead of the old document.execCommand (which does
// not work with a PM-controlled contentEditable).

import { toggleMark, setBlockType, wrapIn } from 'prosemirror-commands';
import { wrapInList } from 'prosemirror-schema-list';
import type { EditorView } from 'prosemirror-view';
import type { Command } from 'prosemirror-state';
import type { ResolvedPos } from 'prosemirror-model';

let _activeView: EditorView | null = null;
// Per-block view registry, so non-focus actions (e.g. the right-click link
// menu) can dispatch ProseMirror commands into the correct block's editor.
const _viewsByBlock = new Map<string, EditorView>();

export function setActiveView(view: EditorView | null): void {
  _activeView = view;
}
export function getActiveView(): EditorView | null {
  return _activeView;
}
export function registerView(blockId: string, view: EditorView): void {
  _viewsByBlock.set(blockId, view);
}
export function unregisterView(blockId: string, view: EditorView): void {
  if (_viewsByBlock.get(blockId) === view) _viewsByBlock.delete(blockId);
}
export function getViewForBlock(blockId: string): EditorView | null {
  return _viewsByBlock.get(blockId) ?? null;
}

const heading = (level: number): Command => setBlockType(schema.nodes.heading, { level });

const FORMAT_COMMANDS: Record<string, Command> = {
  bold:          toggleMark(schema.marks.strong),
  italic:        toggleMark(schema.marks.em),
  underline:     toggleMark(schema.marks.underline),
  strikethrough: toggleMark(schema.marks.strikethrough),
  code:          toggleMark(schema.marks.code),
  h1: heading(1),
  h2: heading(2),
  h3: heading(3),
  h4: heading(4),
  p:  setBlockType(schema.nodes.paragraph),
  ul: wrapInList(schema.nodes.bullet_list),
  ol: wrapInList(schema.nodes.ordered_list),
  blockquote: wrapIn(schema.nodes.blockquote),
};

/**
 * Run a named formatting command against the focused block editor.
 * Returns true if a command ran. `link` is handled by the caller (needs a URL).
 */
export function applyFormat(cmd: string): boolean {
  const view = _activeView;
  if (!view) return false;
  const command = FORMAT_COMMANDS[cmd];
  if (!command) return false;
  view.focus();
  return command(view.state, view.dispatch, view);
}

// ─── Link helpers ───────────────────────────────────────────

/** Find the contiguous range of `markType` around a resolved position. */
function getMarkRange($pos: ResolvedPos, markType: MarkType): { from: number; to: number } | null {
  const parent = $pos.parent;
  const start = parent.childAfter($pos.parentOffset);
  if (!start.node) return null;
  const mark = start.node.marks.find(m => m.type === markType);
  if (!mark) return null;

  let startIndex = $pos.index();
  let startPos = $pos.start() + start.offset;
  while (startIndex > 0 && mark.isInSet(parent.child(startIndex - 1).marks)) {
    startIndex--;
    startPos -= parent.child(startIndex).nodeSize;
  }

  let endIndex = $pos.indexAfter();
  let endPos = startPos + start.node.nodeSize;
  while (endIndex < parent.childCount && mark.isInSet(parent.child(endIndex).marks)) {
    endPos += parent.child(endIndex).nodeSize;
    endIndex++;
  }
  return { from: startPos, to: endPos };
}

/** Is the link mark present in the current selection / at the cursor? */
export function linkIsActive(view: EditorView | null = _activeView): boolean {
  if (!view) return false;
  const { state } = view;
  const { from, to, empty, $from } = state.selection;
  const markType = schema.marks.link;
  if (empty) return !!markType.isInSet(state.storedMarks || $from.marks());
  return state.doc.rangeHasMark(from, to, markType);
}

/**
 * Toggle a link on the focused editor:
 *  - selection is already linked → unlink it
 *  - cursor sits inside a link (no selection) → unlink that link
 *  - non-empty selection, no link → prompt for a URL and link it
 */
export function toggleLink(view: EditorView | null = _activeView): boolean {
  if (!view) return false;
  view.focus();
  const markType = schema.marks.link;
  const { state } = view;
  const { from, to, empty, $from } = state.selection;

  if (linkIsActive(view)) {
    let range: { from: number; to: number } | null = empty ? getMarkRange($from, markType) : { from, to };
    if (!range) return false;
    view.dispatch(state.tr.removeMark(range.from, range.to, markType));
    return true;
  }

  if (empty) return false; // nothing selected to link
  const href = window.prompt('Link URL:', 'https://');
  if (href == null || href.trim() === '') return false;
  return toggleMark(markType, { href: href.trim() })(view.state, view.dispatch, view);
}

/**
 * Remove the link wrapping the given DOM anchor inside a block's editor.
 * Returns the block's new serialized HTML (for persistence), or null.
 */
export function removeLinkAtDOM(blockId: string, anchorEl: HTMLElement): string | null {
  const view = getViewForBlock(blockId);
  if (!view) return null;
  const markType = schema.marks.link;
  const pos = view.posAtDOM(anchorEl, 0);
  const range = getMarkRange(view.state.doc.resolve(pos), markType);
  if (!range) return null;
  view.dispatch(view.state.tr.removeMark(range.from, range.to, markType));
  return serializeToHTML(view.state.doc);
}

/**
 * Change the href of the link wrapping the given DOM anchor.
 * Returns the block's new serialized HTML (for persistence), or null.
 */
export function setLinkHrefAtDOM(blockId: string, anchorEl: HTMLElement, href: string): string | null {
  const view = getViewForBlock(blockId);
  if (!view) return null;
  const markType = schema.marks.link;
  const pos = view.posAtDOM(anchorEl, 0);
  const range = getMarkRange(view.state.doc.resolve(pos), markType);
  if (!range) return null;
  const tr = view.state.tr
    .removeMark(range.from, range.to, markType)
    .addMark(range.from, range.to, markType.create({ href }));
  view.dispatch(tr);
  return serializeToHTML(view.state.doc);
}
