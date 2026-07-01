# UI Parity Plan — Notebound ↔ OneNote 2010

Goal: bring the Notebound UI to **full design parity** with the OneNote 2010 reference
(`onenote2010guide.jpg`) — ribbon and all. Everything visible in the reference is a parity
target. Checked = done in the current code; unchecked = remaining work. See
`ONENOTE_BREAKDOWN.md` and `NOTEBOUND_BREAKDOWN.md` for the full decomposition.

Legend: `[x]` done · `[ ]` to do.

---

## 1. Window frame & title bar

- [x] Custom draggable title bar (`#titlebar`) with app name
- [x] Custom window controls (min / max / close) on Linux/Windows
- [x] macOS native traffic-light handling
- [ ] Show the **active page title** in the title bar ("Page — Notebound")
- [ ] **Quick Access Toolbar** (top-left mini strip): back/forward, undo, redo, dock-to-desktop,
      full-page view, customise chevron
- [ ] **Back / forward navigation** history (arrows) + wired nav stack
- [ ] **Help (`?`) button** at the far right of the tab row

## 2. Ribbon (command surface — full parity)

Replace the single `#format-toolbar` with a **tabbed ribbon**: a tab strip, labelled command
groups with captions underneath, and a collapse chevron.

### Ribbon shell
- [ ] **Ribbon tab strip** — File, Home, Insert, Share, Draw, Review, View, Add-Ins
- [ ] **File backstage** (coloured accent tab → full-screen backstage view)
- [ ] **Contextual tabs** — "Table Tools ▸ Layout" appears only when a table is selected
      (yellow-tinted contextual header)
- [ ] **Ribbon collapse/expand** chevron (minimise to tab strip)
- [ ] **Grouped layout** — each group boxed with a caption label underneath

### Home tab — Clipboard group
- [ ] **Paste** (large split button + paste-options)
- [ ] **Cut**
- [ ] **Copy**
- [ ] **Format Painter**

### Home tab — Basic Text group
- [ ] **Font family** combo (Calibri default)
- [ ] **Font size** combo (11 default) + grow/shrink
- [x] **Bold / Italic / Underline / Strikethrough**
- [ ] **Subscript / Superscript**
- [ ] **Text highlight color** (with palette dropdown)
- [ ] **Font color** (with palette dropdown)
- [ ] **Decrease / increase indent**
- [ ] **Text alignment** (left / center / right)
- [x] **Bullets** list
- [x] **Numbering** list

### Home tab — Styles group
- [ ] **Styles gallery** — named-style list (Heading 1 / Heading 2 / Heading 3 …) with a
      scrollable gallery + dropdown (currently individual H1–H4 buttons exist as building blocks)
- [x] Heading levels applied to blocks (H1–H6 supported in editor)

### Home tab — Tags group
- [ ] **Tags gallery** — checkable gallery of tags
- [ ] **To Do** (Ctrl+1) — checkbox tag
- [ ] **Important** (Ctrl+2) — star tag
- [ ] **Question** (Ctrl+3) — question tag
- [ ] **Find Tags** button (tag summary panel)
- [ ] Inline tag markers rendered beside block content

### Home tab — Outlook group
- [ ] **E-mail Page**
- [ ] **Outlook Tasks**
- [ ] **Meeting Details**

### Other ribbon tabs (scaffold + core actions)
- [ ] **Insert** tab — image, table, file, link, screen clipping, date/time, symbol
- [ ] **Share** tab — publish / share link (Notebound already has publish plumbing to wire in)
- [ ] **Draw** tab — ink/pen tools, colours, eraser, shapes
- [ ] **Review** tab — spelling, translate, notes-search
- [ ] **View** tab — page background/rule lines, zoom, full page, docked window
- [ ] **Add-Ins** tab (placeholder)

### Existing toolbar features to migrate into the ribbon
- [x] Link / Unlink (button + Ctrl/Cmd+K) → move to Insert/Home
- [x] Checklist insert (`☑ List`) → becomes the To-Do tag
- [x] 📚 Notebooks button → File/View or the notebook rail
- [x] ✨ Claude wand → Notebound-specific ribbon control
- [x] Publish / Open / Folder / Share cluster → Share tab

## 3. Left rail — Notebook navigation

- [x] Vertical notebook tabs component built (`NotebookBar.tsx`) — active state, `+` add,
      drag-reorder, rename, delete
- [ ] **Re-enable `NotebookBar` in `App.tsx`** (currently commented out — biggest visible gap)
- [ ] "Notebooks:" **header label** + collapse chevron for the rail
- [ ] Per-notebook **colour icon**
- [ ] Per-notebook **sync-status glyph** (green circular-arrows when synced)
- [ ] Per-notebook **dropdown chevron** menu (rename / close / settings) surfaced inline
- [ ] Expandable **section list nested under each notebook** in the rail
- [ ] **Section groups** shown/expandable in the rail
- [ ] **Unfiled Notes / Quick Notes** pinned entry at the bottom
- [ ] Collapsed rail = thin vertical spine strip
- [x] Notebook switching flow exists (via `NotebookSwitcher` modal + 📚 toolbar button)

## 4. Center — Section tabs + Canvas

### Section tabs
- [x] Horizontal angled colour-coded tabs (`SectionPanel` + clip-path styling)
- [x] Active tab lift + merge into page body colour
- [x] 8-colour section palette
- [x] New-section `+` tab
- [x] Rename (double-click) / delete (confirm) / **drag-reorder**
- [x] Active section tints the page body (`#section-desk`)
- [ ] User-settable **section colour** (colour picker) instead of index-derived only
- [ ] **Section groups** (nesting sections)
- [ ] Match OneNote's `*` new-section glyph styling

### Canvas / content
- [x] Editable page **title** field
- [x] **Date stamp** under the title
- [x] Free-placement content surface (blocks)
- [x] **Pan** (space+drag / middle-click / empty-drag) and **zoom** (Ctrl+scroll + menu levels)
- [x] Rich text: H1–H6, P, bullet/numbered lists, blockquote, inline code, code blocks, links
- [x] Auto-linkify URLs
- [x] **Images** — drop from file/URL, resize, **crop**, **caption**, **border toggle**
- [x] **Checklists** / to-do blocks
- [x] Block move / multi-select / marquee / resize
- [x] **Duplicate (Ctrl+D)**, **z-order (`[`/`]`)**, **undo/redo (Ctrl+Z)**
- [x] Delete blocks (keyboard + selection)
- [x] Skeuomorphic file drag-in indicator
- [x] Cross-fade page transition + neighbour preloading
- [x] Custom thin scrollbars
- [ ] **Ruled / grid page background** option (OneNote rule lines)
- [ ] **Tables** (+ contextual "Table Tools ▸ Layout" ribbon tab)
- [ ] **Ink / drawing** layer (pairs with Draw ribbon tab)
- [ ] Inline **tag markers** on blocks (checkbox / star / question)
- [ ] Note-container **hover grip-bar** affordance to match OneNote (partly done via `.block-handle`)
- [ ] **Embedded file attachments** (beyond images)
- [ ] **Bottom-right full-page/expand** control

## 5. Right rail — Pages panel

- [x] Right-hand page rail (`#pages-panel`, section-tinted)
- [x] **+ New Page** button
- [x] Page list with active highlight
- [x] **Subpages** — nested, collapsible, tree guide lines
- [x] Inline rename
- [x] Right-click menu (Rename, Add Subpage, Move to Section, Delete / promote subpages)
- [x] **Drag-reorder + reparent** (before/after/as-child with drop indicators)
- [x] **Bulk multi-select + bulk delete** (with confirm dialog)
- [x] Scroll on overflow
- [ ] **New Page dropdown** split button (New Subpage / templates)
- [ ] Colour page tabs to the section tint like OneNote (currently translucent white)
- [ ] Promote/demote subpage via toolbar/keyboard (currently drag-only)

## 6. Search & navigation

- [x] **QuickJump** fuzzy page finder (Cmd+K) — title + section match, keyboard nav
- [x] Keyboard section/page navigation (Cmd/Ctrl+Shift + arrows)
- [ ] Persistent **Search box in the chrome** (top-right, "Search All Notebooks (Ctrl+E)")
      with a scope dropdown + magnifier
- [ ] **Full-text** search across block content (currently title-only)
- [ ] **Cross-notebook** search scope (currently active notebook only)

## 7. Notebound-only extras (keep alongside parity work)

- [x] Claude assistant chat (draggable, streaming, markdown)
- [x] Claude display/webview panel
- [x] ✨ Claude wand drag-to-canvas
- [x] Welcome screen (recents + open/create)
- [x] Web publish / static export / deep-link share

---

## Priority order (highest-impact parity gaps first)

1. **Re-enable the left `NotebookBar`** — restores the notebook rail; largest visible gap. (§3)
2. **Build the tabbed ribbon shell** — tab strip + grouped Home tab; migrate existing toolbar
   buttons into Clipboard / Basic Text / Styles groups. (§2)
3. **Basic Text parity** — font family/size, colour, highlight, indent, alignment, sub/superscript. (§2)
4. **Tags group + inline tag markers** — To-Do / Important / Question (Ctrl+1/2/3) + Find Tags. (§2, §4)
5. **Persistent search box** in the chrome + full-text/cross-notebook search. (§6)
6. **Notebook rail polish** — header + collapse, colour icons, sync glyph, Unfiled Notes. (§3)
7. **Page-tab colour tinting** + New-Page split dropdown. (§5)
8. **Insert / View tabs** — image/table/link/date; page background/rule lines/zoom. (§2, §4)
9. **Tables** (+ contextual Table Tools tab), then **Draw/ink**, then **Share/Review** tabs. (§2, §4)
10. **QAT + back/forward history + Help**; active page title in OS title bar. (§1)
11. Per-section **colour picker** + **section groups**. (§4)
