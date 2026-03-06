# Notebound v6 — Code Review Report

Generated 2026-03-05 by deep analysis of all 31 source files across `src/` and `app/src/`.

---

## Table of Contents

1. [Critical: Data Loss & Corruption](#1-critical-data-loss--corruption)
2. [Critical: Security Vulnerabilities](#2-critical-security-vulnerabilities)
3. [High: State Synchronization & Race Conditions](#3-high-state-synchronization--race-conditions)
4. [High: CRDT Correctness](#4-high-crdt-correctness)
5. [High: Editor / DOM Corruption](#5-high-editor--dom-corruption)
6. [High: Component Bugs](#6-high-component-bugs)
7. [Medium: Error Handling Gaps](#7-medium-error-handling-gaps)
8. [Medium: Resource Leaks](#8-medium-resource-leaks)
9. [Low: Minor Issues](#9-low-minor-issues)

---

## 1. Critical: Data Loss & Corruption

### 1.1 WAL is not actually write-ahead — crash loses up to 30s of edits
**`src/wal.js:9,68`**

Ops are held in an in-memory `this.buffer` array and only flushed to disk every 30 seconds by `seal()`. If the process crashes, all buffered ops are permanently lost. The name "Write-Ahead Log" is misleading — this is a batching buffer, not a crash-safety mechanism. A true WAL would `appendFileSync` on every `append()` call.

### 1.2 `finalizeState` deletes checklist blocks
**`src/model.js:563-565`**

The block filter keeps blocks only if `type === 'image'` OR `html` is non-empty. Checklist blocks store data in `items`, not `html`, so they are silently deleted during state finalization. Any future non-text, non-image block type will also be destroyed.

### 1.3 Hardcoded `'__replay__'` CRDT site ID causes cross-device collisions
**`src/model.js:512`** and **`src/notebook.js:240`**

When a block has no existing CRDT, a new one is created with site `'__replay__'` (model.js) or `this.deviceId` (notebook.js — correct). The model.js path means two devices replaying the same block both use `'__replay__'`, causing CRDT ID collisions and potential text corruption/loss.

### 1.4 Snapshot sorting picks wrong "latest" — loads stale state
**`src/snapshot.js:49-51`**

`loadLatestSnapshot` sorts filenames lexicographically. Since filenames are `<deviceId>-<timestamp>.json`, the sort orders by UUID first, then timestamp. The snapshot from the device whose UUID sorts last alphabetically is chosen, regardless of timestamp. This can load a stale snapshot, causing data loss when WAL ops that were already included get replayed on older state.

### 1.5 `_crdt` live objects leak into snapshot serialization
**`src/snapshot.js:26`** via **`src/model.js:523`**

`createSnapshot` calls `JSON.stringify` on the live state, which contains `_crdt` properties (live `TextCRDT` instances) on block objects. Serializing these produces garbage data in snapshots or throws, corrupting or preventing snapshot creation.

### 1.6 Snapshot/WAL drops `_pendingDeletes` — deletes lost on restore
**`src/crdt.js:231-256`**

`snapshot()` does not serialize `_pendingDeletes` and `fromSnapshot()` does not restore them. If a snapshot is taken while deletes are pending (received before their corresponding inserts), those deletes are silently lost. The character will reappear after restore.

### 1.7 `fromSnapshot` with empty nodes destroys root node — crash
**`src/crdt.js:234-236,254`**

If `data.nodes` is empty, the constructor's root node is cleared, `_head` and `_tail` are set to null. Any subsequent CRDT operation will null-dereference.

### 1.8 `config.json` non-atomic write + silent parse error = settings loss
**`src/config.js:16,26`**

`writeConfig` uses `writeFileSync` directly (no tmp+rename). A crash mid-write corrupts the file. `initConfig` silently swallows the parse error via `catch {}`, then subsequent writes overwrite the corrupted file with a near-empty config, destroying all settings.

### 1.9 WAL batch filename collision overwrites ops
**`src/wal.js:24-25`**

Filenames use `new Date().toISOString()` (millisecond precision). Two `seal()` calls in the same millisecond produce identical filenames; `renameSync` silently overwrites the first batch.

---

## 2. Critical: Security Vulnerabilities

### 2.1 XSS in Claude chat markdown renderer
**`app/src/ClaudeChat.jsx:10-16`**

`renderMarkdown` applies `escHtml` only inside fenced code blocks. Inline code, bold, italic, and list items are processed via regex substitution without escaping, then rendered via `dangerouslySetInnerHTML`. AI-generated content (or prompt injection) can execute arbitrary JavaScript in the renderer process.

### 2.2 `notebook:fetch-image` is an open SSRF proxy
**`src/ipc.js:156-163`**

Any URL is fetched from the main process with no scheme validation or private IP filtering. The renderer can make arbitrary HTTP/HTTPS requests to internal network addresses (cloud metadata endpoints, localhost services, etc.).

### 2.3 Path traversal in blob `get`/`getMeta`/`exists`
**`src/blobs.js:32-46`**

The hash parameter is joined directly into file paths with no validation. An IPC message with `../../etc/passwd` as the hash reads arbitrary files from the filesystem. Should validate as `/^[a-f0-9]{64}$/`.

### 2.4 `--dangerously-skip-permissions` always passed to Claude CLI
**`src/claude-agent.js:42`**

This flag bypasses all permission checks. If `--allowedTools` filtering has a bug in the CLI, any tool call would execute without guardrails.

---

## 3. High: State Synchronization & Race Conditions

### 3.1 `onStateChanged` overwrites all local optimistic state
**`app/src/store.js:918`**

When the backend pushes a new state via sync, `appState.value = { ...state }` replaces the entire app state. Any in-progress `silent()` mutations (block drags, text edits between keystrokes) are reverted. There is no reconciliation.

### 3.2 `update()` shallow-clones top level but mutates nested objects in-place
**`app/src/store.js:116-120`**

The shallow clone creates a new top-level object, but callback functions mutate nested objects (notebooks, sections, pages, blocks) that are shared references from the old state. This breaks referential equality checks and causes stale-closure bugs.

### 3.3 `notebook:apply-ops` partial failure leaves inconsistent state
**`src/ipc.js:93-100`**

If `applyOp` throws partway through a batch, some ops are applied and persisted to the WAL while others aren't. No rollback mechanism exists.

### 3.4 `notebook:open` does not close the previous notebook
**`src/notebook.js:52`** / **`src/ipc.js:57`**

Calling `open()` while a notebook is already open leaves the old WAL auto-seal timer running, the old sync watcher watching, and the old state overwritten. The old timer firing after `this.wal` is reassigned can corrupt data.

### 3.5 CRDT/HTML text drift causes garbage on remote sync
**`src/notebook.js:250-283`**

`_applyBlockTextDiff` updates HTML and CRDT text independently. HTML tags occupy positions in HTML but not in CRDT plain text. Over time the two representations drift. When a remote `block-text-op` arrives and `applyTextChangeToHtml` patches HTML using CRDT-derived text, the position mapping is wrong, producing garbled output.

### 3.6 `fs.watch` unreliable on Dropbox/network filesystems
**`src/sync.js:23`**

The default notebook lives in `~/Dropbox/Notes/`. `fs.watch` is notoriously unreliable on network-synced directories. Remote batch files can sit undetected until app restart. Needs a periodic polling fallback.

### 3.7 Transient batch read errors have no retry mechanism
**`src/sync.js:56-69`**

If `WAL.readBatch` throws (file being written, I/O hiccup), the batch is not added to `appliedBatches` but there is no mechanism to trigger another `_reconcile()` unless a new file event arrives. The batch is silently lost until restart.

### 3.8 `addImageFromUrl` adds block to wrong page after async fetch
**`app/src/store.js:539`**

After the async `fetchImage`/`saveBlob` calls, `addBlock` reads `appState.value.ui.pageId` internally. If the user navigated away during the fetch, the image block lands on the wrong page.

### 3.9 Concurrent `sendMessage` orphans child processes
**`src/claude-agent.js:17,56`**

No guard prevents a second `sendMessage` while one is in-flight. The second call overwrites `this.proc`, orphaning the prior child process whose stdout/stderr handlers still fire.

---

## 4. High: CRDT Correctness

### 4.1 Broken descendant skipping in sibling tie-breaking
**`src/crdt.js:148`**

The inner loop checks `this._isDescendantOf(cursor, cursor._prev._key)` — but `cursor._prev` is a moving target as the loop advances. Should check against a fixed sibling key captured before the loop. This produces incorrect ordering of concurrent inserts.

### 4.2 Orphan nodes placed at tail are never re-positioned
**`src/crdt.js:130-133`**

When an insert's parent hasn't arrived yet, the node is appended to the tail. There is no mechanism to reposition it when the parent eventually arrives. Out-of-order ops during sync produce permanently misplaced characters.

### 4.3 Device ID tie-breaking contradicts documented invariant
**`src/crdt.js:40-43`**

The comment says ties break by "counter DESC, device DESC" but the implementation produces the opposite ordering. Two concurrent inserts from different devices will appear in the wrong order.

### 4.4 `htmlutils.applyDiffsToHtml` does not adjust positions after each diff
**`src/htmlutils.js:60-67`**

Multiple diffs are applied sequentially but positions are not adjusted after inserts/deletes. The second diff uses positions relative to the original string, not the modified string, producing wrong results.

---

## 5. High: Editor / DOM Corruption

### 5.1 `wrapMatch` corrupts DOM when match is mid-text
**`app/src/editor.js:23-45`**

`match.index` is relative to the `before` substring (text before cursor), but `wrapMatch` slices `node.textContent` using it as if it indexes the full text. Text after the cursor is silently dropped or mangled.

### 5.2 `wrapMatch` doesn't fire `input` event — CRDT diff never sent
**`app/src/editor.js:23-45`**

Direct DOM manipulation on contentEditable doesn't fire `input` events. The bold/italic wrapping changes the visual DOM but `handleInput` in Block.jsx never runs. `prevTextRef` gets out of sync; the next keystroke produces a huge misaligned diff.

### 5.3 Backtick handler race between `setTimeout` and synchronous `input`
**`app/src/editor.js:240-242`**

`handleInlineCode` runs in a `setTimeout(0)` but the browser's `input` event fires synchronously before it. `handleMarkdownInput` (via `handleInput`) reads DOM state that `handleInlineCode` hasn't modified yet, then `handleInlineCode` restructures the DOM, invalidating the diff state.

### 5.4 `execCommand('delete')` fires spurious `input` events
**`app/src/editor.js` throughout**

Markdown shortcut conversion uses `execCommand('delete')` which fires extra `input` events with partially-mutated DOM, producing spurious diffs against `prevTextRef`.

### 5.5 Image paste does not call `preventDefault` — causes double-paste
**`app/src/clipboard.js:126-135`**

When HTML contains `<img>` tags, image blocks are created but `e.preventDefault()` is never called. The browser's default paste also fires, potentially inserting HTML and creating a spurious text block.

---

## 6. High: Component Bugs

### 6.1 Hooks called after early return — violates rules of hooks
**`app/src/ClaudeChat.jsx:31-35`**, **`app/src/NotebookSwitcher.jsx:5-14`**, **`app/src/DisplayPanel.jsx:6-8`**

`useRef`, `useEffect`, and `useCallback` are called after conditional early returns. When the condition toggles, hooks appear/disappear, breaking Preact's hook ordering and potentially causing crashes or state corruption.

### 6.2 `focusFirstBlock` crashes — `addBlock` returns undefined
**`app/src/Canvas.jsx:731-733`**

`addBlock` does not explicitly return a value after `update()`. `focusFirstBlock` calls `blk = addBlock(...)` then accesses `blk.id`, which throws on undefined.

### 6.3 PagesPanel Delete/Backspace handler lacks input guard
**`app/src/PagesPanel.jsx:335-348`**

The `keydown` listener on `window` for Delete/Backspace checks `!editingId` but does not check if the active element is contentEditable. Pressing Backspace while editing block text can trigger page deletion.

### 6.4 `doBulkDelete` iterates a mutating tree
**`app/src/PagesPanel.jsx:324-332`**

Iterates over selected IDs calling `deletePageWithChildren` for each, which mutates the page tree in-place and triggers state updates. Subsequent iterations search a mutated tree — pages can be skipped or double-deleted.

### 6.5 Block deleted on blur during interaction
**`app/src/Block.jsx:446-466`**

`handleBlur` deletes the block if HTML is empty. Blur fires when clicking from content to the drag handle within the same block, deleting the block mid-interaction.

### 6.6 Undo/redo changes are never persisted to backend
**`app/src/undo.js:22-28,31-37`** via **`app/src/Canvas.jsx:689-697`**

After `applyUndo`/`applyRedo`, the code only does a shallow clone to trigger re-render. It never sends ops via IPC. Undo/redo changes exist only in the renderer and are lost on restart.

### 6.7 Undo `resize` delta does not save/restore height
**`app/src/undo.js:60-62`**

The resize reverse delta captures `w` but never `h`. Undoing a resize that changed height silently drops the height change.

### 6.8 Every click/release on a block pushes a no-op undo entry
**`app/src/Canvas.jsx:395-404,425-428`**

`onBlockDragStart` and `onBlockResizeStart` always push undo entries, even for zero-distance interactions. This pollutes the undo stack.

---

## 7. Medium: Error Handling Gaps

### 7.1 `JSON.parse` crash on corrupt WAL batch — aborts entire load
**`src/wal.js:45-48`** and **`src/snapshot.js:56-57,87`**

`readBatch` and `loadLatestSnapshot` do `JSON.parse` with no try/catch. One corrupt file prevents the notebook from opening entirely. No fallback to older snapshots or skipping bad batches.

### 7.2 `blob getMeta` crashes on corrupt `.meta.json`
**`src/blobs.js:41`**

`JSON.parse` with no try/catch. A truncated metadata file (possible due to non-atomic writes — see 7.3) crashes the main process.

### 7.3 Blob metadata not written atomically
**`src/blobs.js:25-27`**

Unlike blob data (which uses tmp+rename), `writeFileSync(metaPath, ...)` writes directly. A crash mid-write leaves a corrupt `.meta.json`.

### 7.4 WAL auto-seal swallows no exceptions — crashes the process
**`src/wal.js:68-71`**

The `setInterval` callback has no try/catch. If `seal()` throws (disk full, permissions), the unhandled exception in a timer callback crashes the Electron main process.

### 7.5 Ops silently dropped when manager is null
**`src/ipc.js:88`**

If the renderer sends ops before a notebook is open (startup race), the op is silently dropped. The renderer's optimistic state diverges from the backend.

### 7.6 `addImageFromFile` doesn't handle `saveBlob` failure
**`app/src/store.js:512-529`**

No `.catch()` on the promise chain. On failure, the block remains with a temporary `objectUrl` that breaks on reload, and the object URL leaks.

### 7.7 `writeConfig` and `initConfig` silently swallow all errors
**`src/config.js:16,26`**

Both `catch {}` blocks discard every error with no logging.

---

## 8. Medium: Resource Leaks

### 8.1 `appliedBatches` set grows unboundedly
**`src/sync.js:54,62`** and **`src/snapshot.js:69,91`**

Every batch filename ever seen is added and never removed. Over weeks of use, this set grows monotonically, making snapshots progressively larger.

### 8.2 `preload.js` `onStateChanged` stacks listeners
**`src/preload.js:61-65`**

`ipcRenderer.on(...)` is called without removing prior listeners. Multiple calls to `onStateChanged` stack listeners. `onOpenFailed` (line 68-70) has no `off` method at all.

### 8.3 Unbounded page cache in Canvas
**`app/src/Canvas.jsx:243-244`**

`pageCacheRef` stores every visited page and never evicts entries. For users with many pages, this accumulates all visited page objects (including full block arrays) indefinitely.

### 8.4 `_pendingDeletes` in CRDT never cleaned up
**`src/crdt.js:121-124,182-185`**

If a delete's target insert never arrives (partial sync, corrupt WAL), `_pendingDeletes` grows unboundedly.

### 8.5 Orphaned `.tmp` files from interrupted snapshot/WAL writes
**`src/snapshot.js`** and **`src/wal.js`**

If `createSnapshot` or `seal()` crashes between `writeFileSync` and `renameSync`, orphan `.tmp` files accumulate forever.

### 8.6 MCP socket `data` accumulation — no size limit
**`src/ipc.js:194-196`**

Incoming socket data is accumulated into a string with no maximum size. A buggy or malicious client can exhaust process memory.

### 8.7 Claude agent stderr unbounded accumulation
**`src/claude-agent.js:97-101`**

`stderr += s` for the entire process lifetime. Verbose output can grow this string without bound.

---

## 9. Low: Minor Issues

### 9.1 `notebook-reorder` / `section-reorder` move unlisted items to front
**`src/model.js:154,203`**

`Array.indexOf` returns `-1` for IDs not in the reorder list, sorting them before everything else. `page-reorder` (line 343) handles this correctly by appending unlisted items at the end.

### 9.2 `contextBridge.exposeInMainWorld('log', fn)` may throw
**`src/preload.js:4`**

`exposeInMainWorld` requires the second argument to be an object, not a bare function.

### 9.3 Snapshot pruning is global, not per-device
**`src/snapshot.js:31-39`**

Despite the constant name `MAX_SNAPSHOTS_PER_DEVICE`, pruning keeps the latest N globally. Multi-device setups prune each other's snapshots.

### 9.4 WAL `listBatches` sort hardcodes deviceId length
**`src/wal.js:59`**

`a.slice(37)` assumes UUID (36 chars) + dash = 37. Any deviceId format change breaks batch ordering.

### 9.5 `interrupt()` nulls `proc` before `close` event fires
**`src/claude-agent.js:139-140`**

The `close` handler fires a stale `done`/`error` callback after `interrupt()` returns and `proc` is already null.

### 9.6 Blob `.tmp` filename shared across concurrent stores
**`src/blobs.js:16-20`**

Two concurrent `store()` calls with the same hash use the same `.tmp` filename. One can overwrite the other's partial write.

### 9.7 `QuickJump` shortcut blocked during editing
**`app/src/App.jsx:47`**

The `!editing` condition on line 47 prevents Cmd+K from working while typing, contradicting the apparent intent.

### 9.8 `deleteHtmlChars` / `handleInlineCode` offset-vs-index mismatch
**`app/src/editor.js:136-162`**

`m.index` is relative to the `before` substring but used to slice the full `node.textContent`.

### 9.9 Clipboard `data:` URL images silently discarded
**`app/src/clipboard.js:130`**

The filter `!src.startsWith('data:')` rejects all data URIs. Many apps (Google Docs, email clients) put `data:` URIs in pasted `<img>` tags.

### 9.10 `SECTION_COLORS` duplicated in three files
**`app/src/App.jsx:98`**, **`app/src/PagesPanel.jsx:4`**, **`app/src/SectionPanel.jsx:4`**

Three independent copies of the same array. Divergence causes inconsistent colors.

### 9.11 MCP server uses newline-delimited JSON instead of Content-Length framing
**`src/mcp-server.js:51-76`**

May violate the MCP protocol spec which expects HTTP-style `Content-Length` header framing.

### 9.12 `net` module shadowed by Electron's `net`
**`src/ipc.js:8,157`**

Top-level `const net = require('net')` (Node) is shadowed inside `notebook:fetch-image` by `const { net } = require('electron')`.

---

## Summary

| Severity | Count | Key Themes |
|----------|-------|------------|
| **Critical** | 13 | WAL not crash-safe, CRDT corruption, XSS, SSRF, path traversal, snapshot bugs |
| **High** | 22 | State desync, editor DOM corruption, hooks violations, undo not persisted |
| **Medium** | 14 | Missing error handling, resource leaks, no retry on sync failures |
| **Low** | 12 | Sorting bugs, dead code, minor UX issues |

The most impactful areas to address first:
1. **WAL crash safety** (1.1) — fundamental data durability gap
2. **Security** (2.1–2.4) — XSS, SSRF, path traversal
3. **CRDT correctness** (4.1–4.3) — convergence failures corrupt shared text
4. **Snapshot selection** (1.4) — wrong snapshot loaded on startup
5. **Editor input event handling** (5.1–5.4) — DOM corruption and lost diffs
