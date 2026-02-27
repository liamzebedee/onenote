# Onenote Replacement — Requirements

## Idea

A local-first note-taking app that replaces OneNote. Notes are organized in a notebook/section/page hierarchy. Each page is a spatial canvas where content blocks can be freely positioned and dragged around. All data lives on the local filesystem — no cloud, no sync, no accounts.

---

## Functional Requirements

### Hierarchy
- The app organizes notes into **Notebooks**, **Sections**, and **Pages**, in that order.
- Each notebook, section, and page has an editable **title**.
- The user can create, rename, and delete notebooks, sections, and pages.
- The user can **reorder** notebooks, sections, and pages.

### UI Layout

The app has a fixed chrome resembling OneNote:

```
┌──────────────────────────────────────────────────────────────────────────┐
│  [Work]  Personal  Finance  Reading                                      │  ← Notebooks
├────────────────┬───────────────┬─────────────────────────────────────────┤
│ Sections       │ Pages         │                                         │
│                │               │  Page Title                             │
│  Projects      │  Alpha launch │                                         │
│  Meetings      │  Beta plan    │   ┌─────────────────┐                  │
│  Planning      │  Retro notes  │   │ Text block       │                  │
│                │  Q1 goals     │   │ with rich text  │                  │
│                │               │   └─────────────────┘                  │
│                │               │                                         │
│                │               │            ┌───────────┐               │
│                │               │            │  image    │               │
│                │               │            │  block    │               │
│                │               │            └───────────┘               │
│                │               │                                         │
│                │               │  ┌──────────────┐                      │
│                │               │  │ another text │                      │
│                │               │  │ block        │                      │
│                │               │  └──────────────┘                      │
└────────────────┴───────────────┴─────────────────────────────────────────┘
```

- **Top bar**: lists all notebooks. The active notebook is highlighted. Switching notebooks updates the section list.
- **Left column**: lists the sections within the active notebook.
- **Middle column**: lists the pages within the active section.
- **Right content pane**: displays the canvas for the active page.

All four areas (notebook bar, section list, page list, and blocks on the canvas) support reordering by dragging.

### Pages & Canvas
- Each page is a **free-form 2D canvas** — content blocks are positioned freely, not in a linear flow.
- The canvas is unbounded; the user can pan in any direction.
- The user can **zoom** the canvas in and out.

### Content Blocks
- Content blocks are the atomic unit of a page. Each block has a position and size on the canvas.
- **Everything on the canvas lives inside a block** — there is no content floating outside of one.
- Blocks can be created by clicking on the canvas (creates an empty text block) or by dragging an image onto the canvas (creates a block containing that image).
- Within a block, content is a vertical sequence of elements — text lines and images. For example, dragging an image onto the canvas creates a block with that image in it; clicking that image and pressing Enter adds a new text line below it within the same block.
- The user can create new blocks, move them by dragging, resize them, and delete them.
- Multiple blocks can be selected and moved together.

### Block Content
Within a block, the user can author:
- Headings (at least three levels)
- Body text
- Bold, italic, underline, strikethrough
- Unordered lists, ordered lists
- Hyperlinks
- Images (inline within the block's content flow)

- Images can be added by dragging a file onto the canvas, which creates a new block containing that image.
- Images can also be dragged or pasted into an existing block, adding them to that block's content sequence.
- A block containing only an image is valid.
- Images can be resized.

### Persistence
- All data is stored on the **local filesystem** only.
- Changes are saved automatically without requiring a manual save action.
- The user can configure where on their filesystem notes are stored.

---

## Non-Functional Requirements

- **Local-only**: no network requests, no external services, no authentication.
- **Performance**: opening a page and rendering its canvas should feel instant for typical page sizes.
- **Reliability**: data must not be lost or corrupted on crash or unexpected quit. Writes should be safe (no partial writes left as the canonical file).
- **Desktop-first**: the app targets desktop (macOS initially). No mobile requirement.
- **Offline-always**: the app must be fully functional with no internet connection at all times.
