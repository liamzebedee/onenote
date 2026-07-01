# Notebound — UI Breakdown

Decomposition of the *current* Notebound UI as implemented in `core/src/` + `core/style.css`.
This mirrors `ONENOTE_BREAKDOWN.md` region-for-region so the two can be diffed in
`UI_PARITY_PLAN.md`.

Notebound shares OneNote's mental model — **Notebooks → Sections → Pages → Blocks** — but the
canvas is a free-floating **block** surface (not note containers), and the command surface is
a single slim **format toolbar** rather than an Office ribbon.

**Component map** (`core/src/`):
- `App.tsx` — root layout, global nav keybindings, section colouring.
- `Canvas.tsx` — `FormatToolbar`, `#titlebar`, `PageTitle`, infinite pan/zoom canvas, block
  drag/resize/marquee/undo, file-drop, Claude-wand drop.
- `Block.tsx` — text / image / checklist / loading blocks, image crop, captions, link menu.
- `BlockEditor.tsx` — ProseMirror-backed rich text editor (`pm.ts`).
- `SectionPanel.tsx` — horizontal section tabs (`#section-tabs`).
- `PagesPanel.tsx` — right-hand page tree with subpages, drag, bulk-select.
- `NotebookBar.tsx` — vertical notebook tabs (**currently disabled** in `App.tsx`).
- `NotebookSwitcher.tsx` — modal to switch/open/create `.notebound` files.
- `WelcomeScreen.tsx` — first-run / no-notebook screen.
- `QuickJump.tsx` — Cmd/Ctrl-K fuzzy page jump.
- `ContextMenu.tsx` — shared right-click menu (rename / confirm-delete / submenu).
- `ClaudeChat.tsx` + `DisplayPanel.tsx` — draggable Claude assistant + webview panel.

---

## 1. Window frame & title bar — `#titlebar` (Canvas.tsx `FormatToolbar`)

- **Drag region** — `-webkit-app-region: drag`, 38px tall, centered app title "Notebound".
- **Window controls** — custom minimize / maximize / close SVG buttons (Linux/Windows only;
  hidden on macOS which uses native traffic lights). Wired to `window.windowControls`.
- **No Quick Access Toolbar**, no Help button, no per-page title in the OS title bar.

## 2. Command surface — `#format-toolbar` (Canvas.tsx)

A single horizontal toolbar (not a tabbed ribbon). Buttons:
- **📚 Notebooks** — opens the `NotebookSwitcher` modal.
- **Inline text formatting** — Bold, Italic, Underline, Strikethrough.
- **Block styles** — H1, H2, H3, H4, P.
- **Lists** — bullet (`• List`), numbered (`1. List`).
- **🔗 Link** — link/unlink selection (also Ctrl/Cmd+K).
- **☑ List** — insert a checklist block.
- **✨ Claude wand** — draggable onto the canvas to start a Claude chat.
- **Canvas hint** — "Click to add block · Space+drag to pan · Ctrl+scroll zoom".
- **Publish cluster** (only when `window.notebook.webPublish` exists) — 🌐 Publish, ↗ Open,
  📂 Folder, 🔗 Share (copies a deep link to the page).
- Whole toolbar only renders when `editingEnabled` (hidden in read-only/published view).

## 3. Left rail — Notebook navigation

- **`NotebookBar.tsx`** exists: vertical rotated notebook tabs (`writing-mode: vertical-lr`),
  active highlight, `+` add, drag-reorder, right-click rename/delete, and a switch-file
  button. **BUT it is commented out** in `App.tsx` (`{/* {editing && <NotebookBar />} */}`),
  so there is currently **no persistent left rail** in the running app.
- Notebook switching is instead done through the **📚 Notebooks toolbar button →
  `NotebookSwitcher` modal** (recents grid + Open Existing / New Notebook).
- No per-notebook sync glyph, no colour icons, no section-groups nesting, no Unfiled Notes.

## 4. Center — Section strip + Canvas

### 4a. Section tabs — `SectionPanel.tsx` / `#section-tabs`
- Horizontal, **angled colour-coded tabs** matching OneNote 2010: clip-path chamfered top +
  slanted right edge, 8-colour palette cycling by index, active tab **lifts taller** and
  merges into the page body (drop-shadow outline trick).
- **`+` new-section** button at the end.
- Interactions: click to activate, double-click to rename (inline menu), right-click →
  rename / delete (confirm), **drag to reorder**.
- The active section colour tints the whole **`#section-desk`** body behind the canvas.

### 4b. Canvas — `Canvas.tsx` + `Block.tsx`
- **Page title** — large 26px editable `#page-title` with dotted border + "Page title"
  placeholder; **date stamp** below (full weekday/month/day). Enter jumps into first block.
- **Infinite canvas** — free pan (space+drag / middle-click / drag empty area when not
  editing), **zoom** via Ctrl+scroll and menu zoom in/out/reset (fixed levels 0.5–2.0),
  per-page pan/zoom persisted.
- **Blocks** (absolutely positioned, free placement):
  - **Text block** — ProseMirror rich text: H1–H6, P, bullet/numbered lists, blockquote,
    code + code-block, inline code, links (auto-linkify URLs), drag handle, width resize.
  - **Image block** — drop from file or URL, corner-resize, **crop** (double-click, 8 handles),
    **caption/legend** (Enter to add), **border toggle**.
  - **Checklist block** — checkable items, Enter=new item, Backspace=merge/delete.
  - **Loading block** — spinner placeholder (e.g. while Claude generates).
- **Selection** — click, marquee drag, Shift-add, Ctrl+A select-all, Escape deselect.
- **Block ops** — move (multi-select), width/image resize, delete, **duplicate (Ctrl+D)**,
  **z-order (`[` / `]`)**, **undo/redo (Ctrl+Z / Shift)** per page.
- **File drag-in** — skeuomorphic "paper" drag indicator with parallax flap; drops images
  onto the canvas at cursor. URL image drops supported.
- **Page transition** — cross-fade between pages; neighbouring pages preloaded on idle.
- **Link context menu** — right-click a link → Open / Edit / Remove (`Block.tsx`).
- **Selection context menu** — right-click selected text → Search Google / Ask ChatGPT.
- **Scrollbars** — thin custom scrollbars on the canvas container.

## 5. Right rail — Pages panel — `PagesPanel.tsx` / `#pages-panel`

- **+ New Page** button header.
- **Page tree** — pages with **collapsible subpages** (nested, tree guide lines, expand
  arrows), active-page highlight, section-tinted translucent rows.
- **Interactions** — click to open, inline rename, right-click menu (Rename, Add Subpage,
  **Move to Section** submenu, Delete / Delete-promote-subpages).
- **Drag & drop** — reorder + reparent (before / after / **as child**, with drop indicators).
- **Bulk select** — Ctrl/Shift multi-select, bulk delete with confirm dialog + keyboard
  (Delete/Backspace to confirm, Escape to clear).
- Fixed **200px** width.

## 6. Search / navigation — `QuickJump.tsx`

- **Cmd+K / Ctrl+Shift+K** opens a **fuzzy page jump** modal (searches page + section titles
  across the active notebook, arrow-key nav, Enter to jump). This is Notebound's analogue of
  OneNote's "Search All Notebooks" — but it is **title-only, single-notebook, modal**, not a
  persistent full-text search box.
- **Global nav keys** (`App.tsx`) — Cmd/Ctrl+Shift + ←/→ = prev/next section; +↑/↓ =
  prev/next page (flat tree order).

## 7. Assistant & extras (no OneNote equivalent)

- **ClaudeChat** — draggable floating chat panel; markdown rendering, streaming, dropped onto
  canvas via the ✨ wand.
- **DisplayPanel** — draggable webview/iframe panel Claude can render pages into.
- **WelcomeScreen** — first-run overlay: recent notebooks list + Open / Create actions.
- **Web publish/export** — publish notebook to a static site, deep-link sharing.

---

## Region → component summary

| Region | Notebound status |
|---|---|
| Window frame | `#titlebar` + custom window controls; no QAT/Help/per-page OS title |
| Command surface | single `#format-toolbar` (no ribbon/tabs, no font family/size, no highlight/color, no tags/Outlook/clipboard group) |
| Left rail | `NotebookBar` **built but disabled**; switching via modal instead |
| Section strip | `SectionPanel` — full parity on look + reorder/rename/delete |
| Canvas | free **block** canvas w/ pan/zoom, rich text, images+crop, checklists, undo — richer than note-containers in some ways, different model |
| Right rail | `PagesPanel` — pages + subpages + drag + bulk ops (strong parity) |
| Search | `QuickJump` modal (title-only, single notebook) |
| Extras | Claude chat, display panel, welcome, web publish |
