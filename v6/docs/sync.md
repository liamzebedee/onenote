# Notebound Sync Engine — Technical Design

## Overview

The Notebound sync engine provides local-first persistence and cross-device sync for the v6 note-taking app. Notebooks are stored as `.notebound` directory bundles containing immutable WAL batch files, snapshots, and content-addressed blobs. Sync happens automatically over a shared filesystem (Dropbox) — no server required.

## Architecture

```
Electron Main Process (Node.js)
├── NotebookManager     — opens/creates .notebound dirs, orchestrates everything
├── WAL                 — appends ops, seals batches, reads batch files
├── SnapshotManager     — creates/loads snapshots from materialized state
├── SyncEngine          — file watcher + set reconciliation
├── BlobStore           — content-addressed blob storage (SHA-256)
└── CRDT                — custom text CRDT for block-level conflict resolution

IPC Bridge (contextBridge)
└── exposes: openNotebook, applyOp, getState, onStateChange, etc.

Renderer (Preact)
└── existing UI, wired to IPC instead of in-memory store
```

## .notebound Directory Format

```
MyNotebook.notebound/
├── open.notebound          # marker file (app association)
├── meta.json               # { name, createdAt, deviceId }
├── snapshots/
│   └── <timestamp>.json    # full materialized state
├── wal/
│   └── <deviceId>-<timestamp>.json  # immutable op batches
└── blobs/
    └── <sha256-hash>       # immutable attachments
```

All files inside the bundle are **immutable once written**. No file is ever modified in place. This is critical for Dropbox/rsync compatibility.

## Custom Text CRDT (src/crdt.js)

Character-level CRDT based on RGA (Replicated Growable Array):

- **Character ID**: `{ device: string, counter: number }` — Lamport-like unique ID
- **Operations**: `insert(id, parentId, char)` and `delete(id)`
- **State**: Linked list of characters with tombstones for deletes
- **Tie-breaking**: When two inserts share the same parent, order by `(counter DESC, device DESC)` — higher counter wins left position, device breaks remaining ties
- **Properties**: `apply(op)` is idempotent and commutative (order-independent)
- **Serialization**: `snapshot()` returns the character list; `fromSnapshot(data)` restores it
- **Materialization**: `getText()` walks the list, skipping tombstones

Device ID is a UUID generated once per device, stored in `meta.json`.

## Data Model (src/model.js)

### Structure

- **Notebook** → sections (ordered array)
- **Section** → pages (ordered array, supports tree via `children`)
- **Page** → blocks (map by block ID), title, panX, panY, zoom
- **Block** → id, type, x, y, w, html/content, styles

### Semantic Operations

Each op has: `{ id, deviceId, timestamp, type, ...payload }`

| Type | Payload |
|------|---------|
| `section-add` | `{ sectionId, title, index }` |
| `section-delete` | `{ sectionId }` |
| `section-rename` | `{ sectionId, title }` |
| `section-reorder` | `{ sectionIds }` |
| `page-add` | `{ sectionId, pageId, title, parentPageId?, index }` |
| `page-delete` | `{ sectionId, pageId }` |
| `page-rename` | `{ pageId, title }` |
| `page-reorder` | `{ sectionId, pageIds }` |
| `block-add` | `{ pageId, block: { id, type, x, y, w, html } }` |
| `block-delete` | `{ pageId, blockId }` |
| `block-move` | `{ pageId, blockId, x, y }` |
| `block-resize` | `{ pageId, blockId, w }` |
| `block-text-op` | `{ pageId, blockId, crdtOp }` |
| `block-style` | `{ pageId, blockId, styles }` |
| `block-update-html` | `{ pageId, blockId, html }` |

`applyOp(state, op)` applies an operation to materialized state. Must be idempotent — applying the same op twice has no additional effect.

## WAL System (src/wal.js)

- **In-memory buffer**: Array of ops since last seal
- **`append(op)`**: Push op to buffer, return op
- **`seal(deviceId, walDir)`**: Write buffer to `wal/<deviceId>-<timestamp>.json`, clear buffer. Returns filename.
- **`readBatch(filePath)`**: Parse a batch file, return `{ deviceId, sealedAt, ops }`
- **`listBatches(walDir)`**: List all `.json` files in `wal/` directory
- **Batch format**: `{ deviceId, sealedAt, ops: [...] }`
- **Auto-seal**: Every 30 seconds via `setInterval`, and on app close
- Batch filenames use ISO timestamp with device prefix for uniqueness

## Snapshot Manager (src/snapshot.js)

- **`createSnapshot(state, snapshotsDir, walBatches)`**: Serialize full state + manifest of included WAL batches to `snapshots/<timestamp>.json`
- **`loadLatestSnapshot(snapshotsDir)`**: Find newest snapshot file, deserialize and return
- **`rebuildState(snapshotsDir, walDir, applyOp)`**: Load latest snapshot, replay all WAL batches created after snapshot timestamp, return materialized state
- Snapshot includes: sections, pages, blocks (with full state), plus `includedBatches` manifest
- Create snapshots: on close, or when WAL batch count > 50

## Sync Engine (src/sync.js)

Uses `fs.watch` on the `.notebound/wal/` directory:

- **On new file in `wal/`**: If not from this device and not already applied, read batch and apply ops to local state
- **Push**: After sealing a local WAL batch, it's already in the directory — Dropbox picks it up
- **Pull**: File watcher detects new files from other devices
- **Startup reconciliation**: List all batches, determine which are post-snapshot, apply any missing ones
- **Applied set**: Track applied batch filenames in memory to avoid re-application
- **Debounce**: File watcher events are debounced (100ms) to batch rapid changes

## Blob Store (src/blobs.js)

- **`store(buffer, blobsDir)`**: SHA-256 hash the content, write to `blobs/<hash>`, return hash
- **`get(hash, blobsDir)`**: Read blob by hash
- **`exists(hash, blobsDir)`**: Check if blob exists locally
- Content-addressed, immutable, no merge logic needed

## IPC Bridge (src/ipc.js + preload.js)

### Main process handlers (ipc.js)

- `notebook:open(path)` — open or create a .notebound directory, return state
- `notebook:get-state()` — return current materialized state
- `notebook:apply-op(op)` — apply user edit: append to WAL + update state + notify renderer
- `notebook:save-blob(buffer)` — store blob, return hash
- `notebook:get-blob(hash)` — retrieve blob data

### Renderer API (preload.js)

```js
window.notebook = {
  open(path) {},
  getState() {},
  applyOp(op) {},
  onStateChanged(callback) {},
  saveBlob(buffer) {},
  getBlob(hash) {},
}
```

### Events

- `notebook:state-changed` — pushed to renderer when sync brings in remote ops

## Renderer Integration (store.js)

- Replace localStorage persistence with IPC calls
- `applyOp()` sends semantic ops through IPC to main process
- On `state-changed` event, update Preact signal to trigger re-render
- Startup: call `notebook:open` then `notebook:get-state` to hydrate UI

## Verification Plan

1. **CRDT convergence**: Two instances, concurrent inserts/deletes, verify same `getText()`
2. **WAL round-trip**: Append ops, seal, read batch, verify ops match
3. **Snapshot + rebuild**: Create state, snapshot, add more WAL, rebuild, verify
4. **Cross-device sync**: Edit on device A, Dropbox syncs, device B picks up via watcher
5. **Offline resilience**: Edit while disconnected, reconnect, verify merge
