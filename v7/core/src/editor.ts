import { applyFormat, toggleLink } from './pm';

// ── Rich text commands (toolbar) ─────────────────────────
//
// All block text is edited by ProseMirror, so toolbar buttons dispatch real PM
// commands against the focused block editor (see pm.ts). There is no
// document.execCommand / contentEditable formatting path anymore.

export function execFmt(cmd: string): void {
  if (cmd === 'link') { toggleLink(); return; }
  applyFormat(cmd);
}

// Parameterised formatting (colour, highlight, font, alignment, indent) + the
// live selection-format signal the ribbon reads to light up active buttons.
export { setMarkAttr, setBlockAttr, indentBlocks, selectionFormat } from './pm';
export type { SelectionFormat } from './pm';
