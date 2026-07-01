# OneNote 2010 — UI Breakdown

Decomposition of the reference UI (`onenote2010guide.jpg`) into regions, components, and
behaviours. This is the *target* being reverse-engineered — Notebound does not aim for 1:1
Office-ribbon fidelity, but this catalogues everything visible so parity gaps are explicit.

The screen divides into a **top chrome band**, a **left notebook rail**, a **center content
canvas**, and a **right page rail**, wrapped by a window frame.

---

## 1. Window frame & title bar

- **App window chrome** — standard Win7/Aero frame: rounded top corners, drop shadow.
- **Title bar text** — active page title + app name: *"OneNote keeps track of stuff at Work,
  Home, or Sch — Microsoft OneNote"*. Title reflects the current page.
- **Window controls** — minimize / restore / close at top-right.
- **Quick Access Toolbar (QAT)** — tiny icon strip at the very top-left (back, undo/redo,
  dock-to-desktop, full-page view, customise chevron). Sits above/left of the ribbon tabs.
- **Help button** — blue `?` at the far right of the ribbon tab row.

## 2. Ribbon (command surface)

- **Ribbon tab strip** — `File` (backstage, coloured accent), `Home`, `Insert`, `Share`,
  `Draw`, `Review`, `View`, `Add-Ins`.
- **Contextual tab group** — *"Table Tools ▸ Layout"* appears only when a table is selected
  (yellow-tinted contextual header).
- **Home tab groups** (left→right), each a labelled group with a caption underneath:
  - **Clipboard** — Paste (large split button), Cut, Copy, Format Painter.
  - **Basic Text** — Font family combo (Calibri), font-size combo (11), Bold, Italic,
    Underline, Strikethrough, Subscript/Superscript, Text Highlight color, Font color,
    decrease/increase indent, alignment, Bullets, Numbering.
  - **Styles** — gallery of named styles: Heading 1, Heading 2, Heading 3 (scrollable list
    with a dropdown).
  - **Tags** — checkable tag gallery: To Do (Ctrl+1), Important (Ctrl+2), Question (Ctrl+3),
    plus **Find Tags** button.
  - **Outlook** — E-mail Page, Outlook Tasks, Meeting Details.
- **Ribbon collapse chevron** — minimises the ribbon to just the tab strip.

## 3. Left rail — Notebook Navigation Bar

- **Header** — *"Notebooks:"* label + collapse chevron (`‹`) to shrink the rail to a thin
  spine of vertical notebook spines.
- **Notebook list** — one row per open notebook, each with:
  - a coloured **notebook icon** (matches notebook colour),
  - the **notebook name** (e.g. OneNote 2010 Guide, Clients, Personal, Support, Software),
  - a **sync-status glyph** (green circular-arrows = synced),
  - a **dropdown chevron** (`⌄`) for per-notebook actions.
- **Active notebook** — highlighted row; its sections drive the section tabs.
- **Section groups & sections** — when expanded, a notebook reveals its sections nested in
  the rail (indented).
- **Unfiled Notes / Quick Notes** — pinned entry at the very bottom of the rail.
- **Collapsed state** — rail becomes a narrow column of rotated notebook spines (seen in the
  laptop mock inside the illustration).

## 4. Center — Section tab strip + Content canvas

### 4a. Section tab strip (top of the content area)
- **Section tabs** — angled, colour-coded tabs across the top (Math=pink, Biology=yellow,
  History=blue in the illustration; "OneNote Guide" in the live shot). Active tab is raised
  and merges into the page body colour.
- **New Section tab** — the `*` tab at the right end creates a new section.
- **Right slant / overlap** — tabs overlap with a chamfered top and slanted right edge; the
  active tab's colour tints the whole page body.

### 4b. Content canvas (the note surface)
- **Page title field** — large editable title at the top of the page.
- **Date / time stamp** — under the title (e.g. *Tuesday, September 15, 2009 — 10:18 AM*).
- **Note containers** — free-floating text blocks; drag by a top handle, resize by width.
  Content can be placed anywhere on an effectively infinite page.
- **Rich content** — headings, bullet/number lists, images, ink/drawings, tables, tags
  (checkboxes, stars), embedded files.
- **Rule lines / background** — optional ruled or grid page background.
- **Scrollbars** — vertical scrollbar (right of canvas) and horizontal scrollbar (bottom);
  a small **full-page/expand** control sits at the bottom-right corner.

## 5. Right rail — Page tabs

- **New Page button** — top of the rail, with a dropdown (`New Page`, New Subpage, New
  Page template).
- **Page tab list** — one tab per page in the active section, colour-tinted to match the
  section. The active page is highlighted.
- **Subpages** — pages can be demoted to subpages (indented under a parent), collapsible.
- **Page reordering** — pages drag up/down; subpage promote/demote.
- **Scroll / overflow** — the rail scrolls when there are many pages.

## 6. Search

- **Search All Notebooks** — search box at the top-right (*"Search All Notebooks (Ctrl+E)"*)
  with a scope dropdown and a magnifier. Searches across every notebook, section, and page;
  jumps to matches.

## 7. Global interactions & concepts (from the illustration)

- **Hierarchy** — *Notebooks → Sections (of a notebook) → Pages (in a section)*. This is the
  core mental model the guide page is teaching.
- **Multiple notebooks open at once**, colour-coded, each a folder on disk.
- **Docking / side-note mode** — OneNote can dock to the desktop edge as a small always-on
  capture window (implied by the QAT dock button).
- **Linked notes, tagging, and search** are the pillars of navigation.

---

## Region → component summary

| Region | Key components |
|---|---|
| Window frame | title text, min/restore/close, QAT, Help |
| Ribbon | tab strip, contextual tabs, Clipboard/Basic Text/Styles/Tags/Outlook groups, collapse |
| Left rail | Notebooks header, notebook rows (icon+name+sync+chevron), section groups, Unfiled Notes, collapse |
| Section strip | angled colour tabs, active-tab lift, new-section `*` |
| Canvas | page title, date stamp, note containers, rich content, rule lines, scrollbars |
| Right rail | New Page (+dropdown), page tabs, subpages, reordering, scroll |
| Search | Search-All-Notebooks box + scope |
