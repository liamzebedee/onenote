## Design reuqirements

Note-taking app, local-first data like .onenote files, but cross-device sync.

Sync assumes ONE remote storage backend, which is a Dropbox-like synced directory, which is shared between devices for a single user. Intention in future is to make this agnostic, so Cloudflare/S3/Rsync backend can be used too.

## Sync and replication model

Locally, the app maintains a live database (the materialized notebook state) and a rolling write-ahead log (WAL). Every edit appends a semantic operation to the WAL and updates the local state immediately. Periodically (for example every 30 seconds or on close), the WAL is sealed into an immutable batch file. The remote store (Dropbox or rsync) contains only immutable WAL batch files and occasional immutable snapshots. No live database file is ever stored remotely, and no file is modified in place.

Sync is simple set reconciliation. On reconnect, a device lists remote snapshots and WAL batches. It downloads the newest snapshot, then applies all WAL batches created after that snapshot. It also uploads any local WAL batches the remote store does not yet have. Because files are immutable and additive, there is no “newer wins” logic and no locking. The state is always reconstructed as: snapshot plus all subsequent WAL batches.

Use case: editing on the plane. While offline, the laptop appends edits to its local WAL and updates its local database. Meanwhile, the desktop may have uploaded its own WAL batches earlier. When the laptop reconnects, it pulls the desktop’s missing WAL batches and applies them, and pushes its own offline WAL batches to the remote store. Nothing is overwritten; both sets of edits coexist as separate WAL files. Each device simply applies any batches it has not yet seen. The airplane edits are just another batch in the log.

Application to a notetaking data model. The WAL should contain semantic operations designed for replicated data, such as block-level edits or CRDT-based text operations. The data model assumes eventual consistency: if two devices edit different blocks, both operations apply cleanly; if they edit the same block concurrently, the CRDT or deterministic merge rule resolves it. This makes replay safe and order-independent across devices.

Attachments are handled separately. They are immutable blobs (e.g., PDFs, images) stored in the remote store under content-addressed filenames (such as a hash). The note only references the blob’s identifier. Blobs are uploaded and downloaded independently in the background and are never concurrently edited. Since they are immutable, they do not participate in merge logic; they are simply fetched when needed.

## Notebook container format.

A notebook is a directory bundle named <name>.notebound. It is not a single mutable database file. The directory contains:

open.notebound (small marker file, used for app association)

snapshots/ (immutable snapshot files)

wal/ (immutable WAL batch files)

blobs/ (immutable attachment blobs)

optional meta.json (notebook metadata)

The application never mutates files in place. It only appends new WAL batch files, creates new snapshots, and adds new blobs. All files inside the bundle are immutable once written.

On Linux (Ubuntu), the directory itself uses the .notebound extension. A custom MIME type (e.g., application/x-notebound) is registered for *.notebound, and a .desktop launcher associates that type with the Notebound application. Double-clicking the directory launches the app with that path as the notebook root. The open.notebound file is optional but can serve as a fallback entry point or metadata anchor.

From the user’s perspective, the notebook behaves like a single document. From the filesystem’s perspective, it is a folder of immutable files, which preserves the replication and sync model (WAL batches + snapshots + blobs) over Dropbox or rsync without requiring locking or in-place mutation.
