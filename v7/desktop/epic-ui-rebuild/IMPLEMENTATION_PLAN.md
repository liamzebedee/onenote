# Implementation Plan — Notebound → OneNote 2010 UI Parity

Companion to `UI_PARITY_PLAN.md`. That file is *what* to build; this is *how*, grounded in the
actual code. Every phase names the real files, functions, ops, and risks. Ordered by the
priority list in the parity plan.

Scope note: this rebuilds the **UI** to OneNote 2010 parity (ribbon and all) on top of the
existing data/op/CRDT engine. The engine is not being rewritten.

---

## 0. Architecture primer (what the plan relies on)

### 0.1 The three layers
```
UI (core/src/*.tsx)  ──optimistic mutation──▶ appState signal ──▶ Preact re-render
        │
        └── sendOp(op) ──▶ window.notebook.applyOp ──▶ desktop/src/model.ts applyOp() ──▶ WAL + snapshot
```
- `core/src/store.ts` — single source of UI truth (`appState` signal). Every mutator does
  `update()`/`silent()` locally **and** `sendOp(...)` / `sendOps(...)`.
- `desktop/src/model.ts` — `applyOp()` `switch` replays each op onto the persisted model.
- `core/src/types.ts` — shared shapes + the `OpType` union.

### 0.2 The persistence triple (memorise this recipe)
To persist any new field (section colour, page colour, block tag, font mark stored on a block):
1. **`types.ts`** — add the field to the interface + add the op name to `OpType`.
2. **`store.ts`** — add/extend a mutator: local mutation + `sendOp({ type, ... })`.
3. **`model.ts`** — add a `case '<op>':` that applies it to `state` (mind the `idx` fast-path
   index used by `_findBlockFast` / `idx.sections` / `idx.pages`).
- **Shortcut that already exists:** the generic `block-style` op does
  `Object.assign(block.styles, op.styles)` and `Block.styles?: Record<string,string>` is already
  in the type. Whole-block visual props can ride this without a new op.

### 0.3 ProseMirror is a schema filter — THE key constraint
- Each text block is a ProseMirror editor (`BlockEditor.tsx`), schema in `pm.ts`.
- `store.ts:707-713` intentionally does **not** re-serialize blocks on open, but on **edit/blur**
  a block is serialized via `serializeToHTML(schema)` — **anything not in the schema is dropped.**
- Therefore font colour / highlight / font family / font size / alignment / indent **must** be
  modelled as ProseMirror **marks (with attrs)** or **node attrs**, each with `parseDOM` +
  `toDOM`, or they will not survive the next edit. Raw `<span style>` injection is a trap.
- Toolbar → editor command path: `editor.ts::execFmt(cmd)` → `applyFormat(cmd)` →
  `FORMAT_COMMANDS[cmd]` dispatched to the focused `_activeView`. New commands slot into
  `FORMAT_COMMANDS` (or a new attr-command helper for parameterised marks like a colour value).
- Keyboard shortcuts live in `BlockEditor.tsx` `keymap({...})`.

### 0.4 Layout insertion points (`App.tsx` render tree)
```
<FormatToolbar/>            ← REPLACE with <Ribbon/> (titlebar + tabbed ribbon)
<SectionPanel/>             ← section tabs (keep)
<div id="body-row">
   <NotebookBar/>           ← re-enable here (currently commented at App.tsx:126)
   <div id="section-desk">
      <div id="canvas-area"><Canvas/></div>
      <PagesPanel/>         ← page rail (keep)
   </div>
</div>
```
Search box lives in the titlebar/ribbon chrome (top-right per OneNote).

### 0.5 Build / run
- Frontend: `bun build ../core/src/main.tsx --outfile app/bundle.js` (watch:
  `bun run watch:frontend`).
- Full app: `./dev.sh` (builds frontend + main + preload, launches Electron).
- All source is **TypeScript** (`.ts`/`.tsx`), not `.js`.
- **Never delete the user's `.notebound` dir when testing** (see project memory) — rebuild + relaunch only.

---

## Phase 1 — Notebook rail (re-enable + parity polish)

**Goal:** restore the persistent left notebook navigation and bring it to OneNote layout.
**Priority-plan refs:** §3.

### 1a. Re-enable (quick win)
- `App.tsx:126` — uncomment `{editing && <NotebookBar />}` inside `#body-row` (first child).
- Verify against `store.ts` notebook CRUD (`addNotebook`, `renameNotebook`, `deleteNotebook`,
  `reorderNotebooks`, `setActiveNotebook`) — all already wired with ops. Expect this to "just work".

### 1b. Layout parity (new/expanded component)
- Add a **"Notebooks:" header** + collapse chevron; collapsed → thin spine (toggle a
  `collapsed` UI signal, local-only, persist to config like other UI prefs).
- Switch the rail from a 34px vertical-text spine to OneNote's horizontal-name rows **when
  expanded** (colour swatch + name + sync glyph + per-row chevron menu). Keep the vertical
  spine as the collapsed state.
- **Per-notebook colour**: new persisted field `Notebook.color?` → persistence triple
  (`notebook-set-color` op or reuse a metadata op). Drives the swatch + could seed section
  palette later.
- **Sync glyph**: static "synced" icon for now (real sync status is a later hook into
  `sync.ts`); wire to a simple state enum.
- **Per-notebook dropdown**: reuse `ContextMenu.tsx` (`openContextMenu`) — Rename / Delete
  already exist in `NotebookBar`; surface as an inline chevron in addition to right-click.
- **Unfiled Notes / Quick Notes**: pinned pseudo-section at rail bottom → maps to a reserved
  section id per notebook; create lazily on first quick note.
- **Section list nested under notebook** (expand notebook → its sections): render
  `nb.sections` under the active/expanded notebook row; clicking sets `setActiveSection`.

**Risks:** the vertical→horizontal rail is a real redesign, not a CSS tweak. Keep 1a shippable
on its own before starting 1b.

---

## Phase 2 — Ribbon shell + migrate existing toolbar

**Goal:** replace the single `#format-toolbar` with a tabbed, grouped ribbon; move today's
buttons into it with zero behaviour loss.
**Priority-plan refs:** §2 (shell, Clipboard, Styles skeleton).

### 2a. Ribbon shell (`Ribbon.tsx`, new)
- Structure: `#titlebar` (keep the existing drag region + window controls from
  `FormatToolbar`) → **ribbon tab strip** (File, Home, Insert, Share, Draw, Review, View,
  Add-Ins) → **active-tab body** of labelled **groups** (each group = box + caption).
- State: `activeRibbonTab` signal (UI-only). Collapse chevron → `ribbonCollapsed` signal
  (persist to config).
- CSS: new `#ribbon`, `.ribbon-tabstrip`, `.ribbon-group`, `.ribbon-group-caption`,
  `.ribbon-btn`, `.ribbon-btn--large` in `core/style.css`. Reuse existing `.fmt-btn` visual
  language as a base.
- Replace `<FormatToolbar/>` usage in `App.tsx`; delete/retire `FormatToolbar` once parity
  reached (keep its window-controls + share/publish logic — move into ribbon).

### 2b. Migrate existing controls (no new capability)
- **Home ▸ Basic Text** (existing): Bold/Italic/Underline/Strikethrough, H1–H4/P,
  bullet/numbered, Link — all already dispatch via `execFmt`. Straight port.
- **Home ▸ Tags** (existing seed): the `☑ List` checklist button becomes the **To-Do** tag
  control (Phase 4 expands it).
- **Share tab**: move Publish / Open / Folder / Share cluster (guarded by
  `window.notebook.webPublish`) out of the toolbar into the Share tab.
- **Notebound controls**: 📚 Notebooks (→ opens switcher or focuses rail), ✨ Claude wand
  (drag source) — place on Home or a Notebound-specific group.
- Keep the `canvas-hint` text somewhere unobtrusive (status area or View tab tooltip).

**Risks:** the ribbon is the largest single component. Land 2a+2b (visual reshuffle, same
features) before adding new formatting in Phase 3, so nothing regresses.

---

## Phase 3 — Basic Text parity (new formatting → PM schema work)

**Goal:** font family, font size, colour, highlight, sub/superscript, alignment, indent.
**Priority-plan refs:** §2 Basic Text. **This is the schema-heavy phase — see §0.3.**

### 3a. New ProseMirror marks (`pm.ts`)
Add marks with attrs + `parseDOM`/`toDOM` so they round-trip HTML:
- `fontColor` — `attrs:{color}`, `toDOM → ['span',{style:`color:${color}`},0]`,
  `parseDOM:[{style:'color', getAttrs}]`.
- `highlight` — `attrs:{color}`, `toDOM → ['span',{style:`background-color:${color}`},0]`.
- `fontFamily` — `attrs:{family}`; `fontSize` — `attrs:{size}` (both `span style` marks).
- `subscript` / `superscript` — `toDOM → ['sub'/'sup',0]` (mutually exclusive; excludes group).
Register each in the schema `marks` block.

### 3b. Parameterised command helper (`editor.ts`)
- `FORMAT_COMMANDS` currently holds nullary `Command`s. Add
  `applyMarkAttr(markName, attrs)` that builds `toggleMark(markType, attrs)` (mirrors how
  `toggleLink` passes `{href}`), for colour/size/family values chosen from a picker.
- Toggle semantics for colour/highlight: applying a new value replaces; clicking the active
  swatch removes the mark.

### 3c. Node attrs for paragraph/heading (`pm.ts`)
- **Alignment**: add `attrs:{align:{default:null}}` to `paragraph` + `heading`;
  `toDOM` emits `style="text-align:..."`; `parseDOM` reads it. Command = a `setNodeAttr`-style
  transaction over the selected block range (custom command, since `setBlockType` won't do attrs
  alone — use `tr.setNodeMarkup`/`setBlockAttr` helper).
- **Indent**: model as a numeric `indent` attr on paragraph/heading (`margin-left` step in
  `toDOM`) with increase/decrease commands, OR reuse list sink/lift for list contexts. Numeric
  attr is simpler and matches OneNote's free indent.

### 3d. Ribbon UI (`Ribbon.tsx`)
- Font family combo (curated font list), font size combo (+ grow/shrink A▲/A▼).
- Colour + highlight split-buttons with a small palette dropdown (new `ColorPicker` popover;
  can reuse `ContextMenu` positioning patterns).
- Alignment segmented control, indent +/- buttons, sub/superscript toggles.
- **Active-state reflection**: buttons should light up from the current selection's marks —
  add a lightweight "selection format" read from `_activeView` (query marks at selection) that
  the ribbon subscribes to (a signal updated on PM selection change; add a small plugin or use
  the existing focus/blur hooks).

### 3e. Keyboard shortcuts (`BlockEditor.tsx`)
- Add `Mod-Shift-...` bindings to match (e.g. highlight, sub/superscript) alongside existing
  `Mod-b/i/u`.

**Risks:** (1) schema changes affect **all** existing content — test that old blocks still
parse and that new marks survive save/reload. (2) Colour/size pickers need careful toggle vs
replace logic. (3) Selection-driven active states require a PM selection listener that doesn't
thrash Preact.

---

## Phase 4 — Tags group + inline tag markers

**Goal:** To-Do (Ctrl+1), Important/star (Ctrl+2), Question (Ctrl+3), Find Tags.
**Priority-plan refs:** §2 Tags, §4 inline markers.

### 4a. Data model
- A tag is a per-block or per-paragraph marker. Two options:
  - **Block-level** (simpler, fits current model): `Block.tags?: string[]` via persistence
    triple (new `block-tags-update` op). Renders an icon gutter on the block.
  - **Paragraph-level** (closer to OneNote): a `tag` node attr in `pm.ts` on paragraph/heading.
  - **Recommendation:** start block-level (reuses `Block`, `Canvas`/`Block.tsx` render), since
    Notebound's unit is the block, not the OneNote note-line.
- The existing **checklist** block already covers the To-Do checkbox case — unify: To-Do tag
  toggles a checkbox marker; keep checklist blocks as the multi-item variant.

### 4b. UI
- Tags gallery in Home ▸ Tags (icons: check, star, `?`). Clicking tags the selected block(s).
- Inline marker rendered in `Block.tsx` (small icon left of content, like `.block-handle`
  positioning).
- **Find Tags**: a panel (reuse `QuickJump` modal pattern) listing all tagged blocks across the
  notebook, grouped by tag, click-to-jump (`jumpToPage`). Requires a tag index walk over
  `appState`.
- Shortcuts Ctrl+1/2/3 in the global keymap (`App.tsx` keydown handler or block keymap).

**Risks:** deciding block vs paragraph granularity up front — changing later is a migration.

---

## Phase 5 — Search box + full-text, cross-notebook

**Goal:** persistent chrome search (OneNote "Search All Notebooks / Ctrl+E") upgrading QuickJump.
**Priority-plan refs:** §6.

- **Chrome search box**: add to ribbon/titlebar top-right; Ctrl+E focuses it. Reuse
  `QuickJump.tsx` result UI as a dropdown.
- **Full-text**: current QuickJump matches page/section **titles** only. Extend to block
  content: walk `page.blocks[].html` (strip tags) + `items[].text` + `caption`. For large
  notebooks, build an in-memory index (Map pageId→lowercased text) rebuilt on state change;
  keep it in `store.ts`.
- **Cross-notebook scope**: iterate all `appState.notebooks`, not just the active one; add a
  scope dropdown (This Section / This Notebook / All Notebooks).
- Result click → `jumpToPage` (extend to also switch notebook when cross-notebook).

**Risks:** full-text over big notebooks — debounce + incremental index, don't scan on every
keystroke.

---

## Phase 6 — Page rail parity polish

**Goal:** New-Page split dropdown, section-tinted page tabs, promote/demote controls.
**Priority-plan refs:** §5.

- **New Page split button** in `PagesPanel.tsx` header: New Page / New Subpage / (later)
  templates. `addPage(parentId)` already supports subpages.
- **Colour page tabs to section tint**: `PagesPanel` already imports `SECTION_COLORS`; tint
  rows with the active section colour instead of translucent white (CSS + pass colour in).
- **Promote/demote subpage** via buttons/keyboard (Tab/Shift-Tab in rail): reuse the existing
  tree reparent logic in `PagesPanel` `onDrop` (extract into a `reparent(pageId, mode)` helper,
  call from keyboard too). Persists via `updatePageTree`.

**Risks:** low — mostly reuse of existing drag/reparent + `addPage` code.

---

## Phase 7 — Insert & View tabs (core actions)

**Goal:** populate two more ribbon tabs with real, mostly-existing actions.
**Priority-plan refs:** §2 Insert/View, §4 backgrounds.

- **Insert**: Image (reuse `addImageFromFile`/`addImageFromUrl` via a file picker), Link
  (`toggleLink`), Table (Phase 9), Date/Time (insert stamp text into active block), File
  attachment (later), Checklist.
- **View**: Zoom in/out/reset (already wired via `window.notebook.onCanvasZoom` +
  `applyZoom` in `Canvas.tsx` — expose buttons), Rule Lines / Grid background (new:
  `Page.background?` field via persistence triple → CSS background on `#canvas-container` /
  page-layer), Full-page toggle, ribbon collapse.

**Risks:** ruled background is a new persisted page field (triple) + must render under
free-positioned blocks without hurting pan/zoom.

---

## Phase 8 — Section colour picker + section groups

**Priority-plan refs:** §4.
- **User-settable section colour**: today colour is index-derived
  (`SECTION_COLORS[idx % n]` in `App.tsx`/`SectionPanel.tsx`/`PagesPanel.tsx`). Add
  `Section.color?` (triple; new `section-set-color` op). Fall back to index when unset. Add a
  colour swatch to the section right-click menu (`ContextMenu`).
- **Section groups**: structural change — a group contains sections. New nesting in
  `Notebook.sections` (or a `groups` array). Non-trivial: touches `model.ts` section ops,
  `SectionPanel` rendering, and the notebook rail. Schedule last; may defer.

**Risks:** section groups are the deepest data-model change here — isolate and spec separately.

---

## Phase 9 — Heavy content types (tables, ink) + remaining ribbon tabs

**Priority-plan refs:** §2 Draw/Review, §4 tables/ink.
- **Tables**: new block `type:'table'` (or PM table nodes via `prosemirror-tables`). Contextual
  "Table Tools ▸ Layout" ribbon tab appears when a table block is selected (ribbon already has
  a contextual-tab slot from Phase 2). Largest content feature — spec separately.
- **Draw/Ink**: canvas ink layer + Draw ribbon tab (pen/colour/eraser). New block type or an
  overlay `<canvas>`. Big; likely a separate epic.
- **Review**: spell-check (browser-native), notes search (reuse Phase 5).

---

## Phase 10 — Chrome finishers

**Priority-plan refs:** §1.
- **Active page title in OS title bar**: extend `setNotebookPath`/`document.title` logic in
  `store.ts` to append the active page title; update on `setActivePage`.
- **QAT** (mini undo/redo/dock strip) top-left; wire undo/redo to canvas undo (`doUndo`/`doRedo`
  in `Canvas.tsx` — needs a global-accessible handle, or route through `_activeView`/store).
- **Back/forward nav history**: add a nav stack in `store.ts` (push on `setActivePage`), arrows
  in the QAT/titlebar.
- **Help button**: opens a help/about overlay.

---

## Dependency graph & sequencing

```
Phase 1a (uncomment rail) ─── shippable immediately, no deps
Phase 2 (ribbon shell) ────── unblocks 3,4,7 (they add ribbon controls)
Phase 3 (Basic Text) ──────── depends on 2 + pm.ts schema work (§0.3)
Phase 4 (Tags) ────────────── depends on 2; data-model decision up front
Phase 5 (Search) ──────────── independent of ribbon (can parallel 3/4)
Phase 6 (Page rail) ───────── independent (reuses existing code)
Phase 7 (Insert/View) ─────── depends on 2
Phase 8 (colours/groups) ──── colour independent; groups is deep, defer
Phase 9 (tables/ink) ──────── depends on 2 contextual-tab slot; large, separate epics
Phase 10 (chrome) ─────────── depends on 2; polish
```

**Recommended order to ship value fast:** 1a → 2a/2b → 3 → 4 → 5 → 6 → 1b → 7 → 8 → 10 → 9.

## Cross-cutting risks
- **PM schema is global** (§0.3): every schema change must be tested against existing content
  for silent data loss on edit/reload. This is the #1 correctness risk.
- **Persistence triple drift**: forgetting the `model.ts` handler means UI works but nothing
  persists/syncs. Add a checklist to every field PR.
- **Op/CRDT compat**: text CRDT (`block-text-op`) is separate from HTML ops; new inline marks
  ride the HTML path (`block-update-html`) — confirm marks survive the CRDT text path too.
- **Ribbon scope creep**: keep each ribbon group behind its own phase; never block a ship on a
  half-built tab.

## Testing per phase
- Build: `bun run watch:frontend`; run: `./dev.sh`. Do **not** touch the user's `.notebound`.
- For each persisted feature: create → reload app → confirm it survived (exercises the full
  op → WAL → snapshot → rebuild path), then edit an old block to confirm no mark loss.
- Manual UI pass against `onenote2010guide.jpg` per region.
