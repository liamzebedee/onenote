# V2 Changes from V1 Feedback

## Block creation
- Single click on the canvas creates a new text block (not double-click).

## Canvas appearance
- The canvas background is pure white — no gray.
- Pages are infinite in all directions but scroll is constrained to top-left origin: the canvas extends right and down only. No scrolling left of or above the origin.

## Block chrome
- Blocks have no visible border or background at rest — they appear as floating content on the canvas.
- On hover, a minimal border appears (thin, low-contrast).
- The drag handle is a narrow bar at the top of the block only, visible on hover. Blocks do not look like Post-its or cards.

## Block resize
- Resize handle is at the **top-right** corner of the block, not bottom-right.
- Resize only affects **width** — height is determined by content.

## Smart text formatting (markdown-style input)
- Formatting triggers automatically as the user types, OneNote/Google Docs style:
  - `# ` → H1
  - `## ` → H2
  - `### ` → H3
  - `- ` or `* ` → unordered list item
  - `1. ` → ordered list item
  - `> ` → blockquote (if supported)
  - `**text**` or `__text__` → bold (on space/enter after closing delimiter)
  - `*text*` or `_text_` → italic
- The raw trigger characters are consumed and replaced with the formatted output.

## Undo / redo
- Full undo/redo buffer scoped per page.
- Standard Ctrl+Z / Ctrl+Shift+Z (and Cmd equivalents on Mac).
- Covers: block creation, deletion, movement, resize, and text edits within blocks.
