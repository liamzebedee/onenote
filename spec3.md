# V3 Changes from V2 Feedback

## Page title → canvas navigation
- Pressing Enter from the page title moves focus to the **default block** — a single persistent text block anchored directly below the title, left-aligned, present on every page.
- The default block is always the first block. It cannot be deleted or repositioned relative to the title area.

## Canvas coordinate system (correction)
- The canvas extends **right and down from the title only**. The origin is at the top-left corner immediately below the page title bar.
- Content can never appear above the title or to the left of the left edge. Panning/scrolling up or left of the origin is not allowed.
- This was partially implemented in V2 but the coordinate model needs to reflect the title bar as the true top boundary, not the viewport top.

## List controls (Google Docs-style)
- Lists support **sublists** via indentation.
- **Tab** inside a list item indents it (creates a sub-item).
- **Shift+Tab** inside a list item deindents it.
- **Backspace** on an empty list item line deindents it one level (or removes the list item if already at top level).
- **Enter** on an empty list item at top level exits the list and inserts a normal paragraph.
- **Delete** and **Backspace** behave naturally for merging lines.
- All other standard list behaviors match Google Docs.

## Headings
- Support heading levels **H1 through H4** (four levels, not three).
- Markdown shortcut: `#### ` → H4.

## Preformatted / code formatting
- **Inline code**: wrapping text in single backticks (`` `text` ``) formats it as inline `<code>` on the closing backtick.
- **Code block**: typing ```` ``` ```` at the start of a line followed by Space or Enter converts the current block into a preformatted code block (`<pre><code>`).
- Code blocks display in a monospace font with a subtle background, no rich-text formatting applied inside them.
- Tab inside a code block inserts literal spaces (e.g. 2 or 4), not a list indent.
- Markdown shortcut summary: `` ` `` … `` ` `` → inline code; ```` ``` ```` + Space/Enter → code block.

## Empty block cleanup
- When a block loses focus (blur), if its content is empty, the block is **automatically deleted**.
- Applies both to newly created blocks and to blocks whose content was fully deleted.

## Click + drag behavior (correction)
- **Click + drag** on the canvas performs a **selection drag** (marquee/rubber-band select), not panning.
- **Space + click + drag** pans the canvas (like Figma/Sketch).
- Middle-click drag still pans.

## Marquee (rubber-band) selection
- Dragging on the canvas draws a selection rectangle.
- Any block **whose bounding box intersects** the selection rectangle becomes selected (all content within highlighted).
- Multiple selected blocks can be:
  - **Bulk deleted** (Delete/Backspace key).
  - **Bulk moved** by dragging any one of the selected blocks — all selected blocks move together.
- Clicking on an empty canvas area deselects all.

## Images as first-class movable objects
- Images within a block are **independently movable** on the canvas — they are not just inline content.
- An image can be dragged out of its block to become a standalone image object, or dragged into another block.
- Images have **transform controls** (resize handles on corners/edges).
- When a block contains **only a single image** (no other content):
  - The block chrome (border, handle bar) is hidden entirely.
  - Only the image's own resize/move handles are shown.
  - Moving the image moves the block implicitly.

## Page title area
- The title area uses **padding only**, no margin.
- Clicking **anywhere in the title area** begins editing the title (the entire area is a click target).

## Page reordering and moving
- Pages can be **reordered** within a section by dragging (already listed in SPEC.md but clarified here).
- Pages can be **moved between sections** (drag a page from the page list into a different section, or via a context menu option "Move to section…").

## Subpages
- A page can have **subpages** nested beneath it, forming a tree of arbitrary depth.
- In the pages list, subpages appear indented under their parent page.
- A parent page can be expanded/collapsed to show or hide its subpages.
- Subpages are created via a context menu on a page ("Add subpage") or by dragging an existing page onto another page.
- Subpages inherit the same canvas and block model as top-level pages.
- Deleting a parent page prompts whether to delete all subpages or promote them to siblings.

## Page title underline
- The underline beneath the page title is **not full-width**. It is a short line that:
  - Has a minimum length (enough to look intentional, e.g. ~120px).
  - Grows to match the width of the title text when the title is longer than the minimum.
  - Never extends beyond the title text width.
- Implemented as a bottom border on the title element sized to fit its content (e.g. `display: inline-block` with a bottom border, or a pseudo-element matching text width).
