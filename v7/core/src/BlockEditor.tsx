import { useRef, useEffect, useLayoutEffect } from 'preact/hooks';
import { EditorState, Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { undo, redo, history } from 'prosemirror-history';
import { keymap } from 'prosemirror-keymap';
import { baseKeymap, toggleMark, chainCommands, exitCode } from 'prosemirror-commands';
import { splitListItem, liftListItem, sinkListItem } from 'prosemirror-schema-list';
import { schema, parseHTML, serializeToHTML, buildInputRules, linkifierPlugin, setActiveView, registerView, unregisterView, toggleLink, updateSelectionFormat, selectionFormat } from './pm';
import type { JSX } from 'preact';

interface BlockEditorProps {
  blockId: string;
  html: string;
  onUpdate: (html: string) => void;
  onFocus?: () => void;
  onBlur?: (html: string) => void;
  onClick?: (e: MouseEvent) => void;
  onContextMenu?: (e: MouseEvent) => void;
  blockType?: string;
}

export function BlockEditor({
  blockId,
  html,
  onUpdate,
  onFocus,
  onBlur,
  onClick,
  onContextMenu,
  blockType = 'text',
}: BlockEditorProps): JSX.Element {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const updateTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isUpdatingRef = useRef(false);
  // Latest html prop, so async callbacks compare against current truth.
  const htmlRef = useRef(html);
  htmlRef.current = html;

  // Initialize PM editor on mount
  useEffect(() => {
    if (!editorRef.current) return;

    const listItem = schema.nodes.list_item;
    const state = EditorState.create({
      doc: parseHTML(html),
      plugins: [
        history(),
        buildInputRules(),
        linkifierPlugin(),
        keymap({
          'Mod-z': undo,
          'Mod-y': redo,
          'Mod-Shift-z': redo,
          'Mod-b': toggleMark(schema.marks.strong),
          'Mod-i': toggleMark(schema.marks.em),
          'Mod-u': toggleMark(schema.marks.underline),
          'Mod-`': toggleMark(schema.marks.code),
          'Mod-.': toggleMark(schema.marks.superscript),
          'Mod-,': toggleMark(schema.marks.subscript),
          'Mod-k': (_s, _d, view) => toggleLink(view ?? null),
          // List editing
          'Enter': splitListItem(listItem),
          'Tab': sinkListItem(listItem),
          'Shift-Tab': liftListItem(listItem),
          // Shift-Enter / Mod-Enter: hard break (or exit code block)
          'Shift-Enter': chainCommands(exitCode, (state, dispatch) => {
            if (dispatch) {
              dispatch(state.tr.replaceSelectionWith(schema.nodes.hard_break.create()).scrollIntoView());
            }
            return true;
          }),
        }),
        keymap(baseKeymap),
      ],
    });

    const view = new EditorView(editorRef.current, {
      state,
      // Mark the editable element so existing .block-content CSS + selectors
      // (focus restore, caret save, link menu) keep working.
      attributes: { class: 'block-content' },
      dispatchTransaction(tr: Transaction) {
        // CRITICAL: apply against the view's *current* state, not the stale
        // closure state captured at creation time.
        const newState = view.state.apply(tr);
        view.updateState(newState);

        // Keep the ribbon's active-state in sync with the caret/selection.
        if (view.hasFocus() && (tr.docChanged || tr.selectionSet || tr.storedMarksSet)) {
          updateSelectionFormat(view);
        }

        if (!tr.docChanged) return;

        // Debounce HTML serialization while typing.
        if (updateTimerRef.current) clearTimeout(updateTimerRef.current);
        updateTimerRef.current = setTimeout(() => {
          isUpdatingRef.current = true;
          const newHtml = serializeToHTML(view.state.doc);
          htmlRef.current = newHtml;
          onUpdate(newHtml);
          isUpdatingRef.current = false;
        }, 50);
      },
      handleDOMEvents: {
        focus: () => { setActiveView(view); updateSelectionFormat(view); onFocus?.(); return false; },
        blur: () => {
          if (updateTimerRef.current) { clearTimeout(updateTimerRef.current); updateTimerRef.current = null; }
          selectionFormat.value = { ...selectionFormat.value, active: false };
          const out = serializeToHTML(view.state.doc);
          htmlRef.current = out;
          onBlur?.(out);
          return false;
        },
      },
    });

    viewRef.current = view;
    registerView(blockId, view);

    // Auto-focus a freshly created (empty) block so the user can type
    // immediately — but only if focus isn't already somewhere, so we don't
    // steal it from another editor when a populated page loads.
    const isEmpty = !html || html === '<p></p>' || html.trim() === '';
    const active = document.activeElement;
    if (isEmpty && (!active || active === document.body)) {
      view.focus();
    }

    return () => {
      if (updateTimerRef.current) clearTimeout(updateTimerRef.current);
      if (viewRef.current === view) viewRef.current = null;
      unregisterView(blockId, view);
      setActiveView(null);
      view.destroy();
    };
  }, []); // Only mount once

  // Sync external HTML changes (undo/redo/page-switch/remote updates).
  // Skip while our own edit is mid-flight or the editor is focused, to avoid
  // clobbering the caret.
  useLayoutEffect(() => {
    const view = viewRef.current;
    if (!view || isUpdatingRef.current) return;
    if (view.hasFocus()) return;

    const currentHtml = serializeToHTML(view.state.doc);
    if (currentHtml !== html) {
      const newState = EditorState.create({
        doc: parseHTML(html),
        plugins: view.state.plugins,
      });
      view.updateState(newState);
    }
  }, [html]);

  return (
    <div
      ref={editorRef}
      class="block-editor"
      data-block-type={blockType}
      onClick={onClick as any}
      onContextMenu={onContextMenu as any}
      onPointerDown={(e: PointerEvent) => e.stopPropagation()}
    />
  );
}
