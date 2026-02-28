// .notebound Directory Manager
// Creates/opens notebook directory bundles

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { WAL } = require('./wal');
const { defaultState, applyOp: modelApplyOp, makeOp, findPageInState } = require('./model');
const { TextCRDT } = require('./crdt');
const { applyDiffsToHtml, applyTextChangeToHtml } = require('./htmlutils');
const { rebuildState, createSnapshot } = require('./snapshot');
const { SyncEngine } = require('./sync');

const MARKER_FILE = 'open.notebound';
const META_FILE = 'meta.json';
const SNAPSHOT_THRESHOLD = 50; // create snapshot when WAL batch count exceeds this

class NotebookManager {
  constructor() {
    this.notebookPath = null;
    this.state = null;
    this.wal = null;
    this.sync = null;
    this.deviceId = null;
    this.appliedBatches = new Set();
    this._onStateChange = null; // callback for renderer notification
    this.crdts = new Map();
  }

  // Create a new .notebound directory
  create(dirPath) {
    fs.mkdirSync(dirPath, { recursive: true });
    fs.mkdirSync(path.join(dirPath, 'snapshots'), { recursive: true });
    fs.mkdirSync(path.join(dirPath, 'wal'), { recursive: true });
    fs.mkdirSync(path.join(dirPath, 'blobs'), { recursive: true });

    // Marker file
    fs.writeFileSync(path.join(dirPath, MARKER_FILE), '');

    // Generate device ID
    const deviceId = crypto.randomUUID();
    const meta = {
      name: path.basename(dirPath, '.notebound'),
      createdAt: Date.now(),
      deviceId,
    };
    fs.writeFileSync(path.join(dirPath, META_FILE), JSON.stringify(meta, null, 2));

    return meta;
  }

  // Open an existing .notebound directory (or create if it doesn't exist)
  open(dirPath, deviceId) {
    this.notebookPath = dirPath;

    // Create if doesn't exist
    if (!fs.existsSync(dirPath)) {
      this.create(dirPath);
    }

    // Ensure subdirectories exist
    for (const sub of ['snapshots', 'wal', 'blobs']) {
      fs.mkdirSync(path.join(dirPath, sub), { recursive: true });
    }

    // Ensure marker file
    const markerPath = path.join(dirPath, MARKER_FILE);
    if (!fs.existsSync(markerPath)) {
      fs.writeFileSync(markerPath, '');
    }

    // Load or create meta
    const metaPath = path.join(dirPath, META_FILE);
    if (!fs.existsSync(metaPath)) {
      this.create(dirPath);
    }

    // deviceId is per-machine, passed in from local config (not from shared meta.json)
    this.deviceId = deviceId || crypto.randomUUID();

    // Rebuild state from snapshots + WAL
    const snapshotsDir = path.join(dirPath, 'snapshots');
    const walDir = path.join(dirPath, 'wal');
    const result = rebuildState(snapshotsDir, walDir);
    this.state = result.state;
    this.appliedBatches = result.appliedBatches;

    // If state is empty (no notebooks), initialize with defaults
    if (!this.state.notebooks || this.state.notebooks.length === 0) {
      this.state = defaultState();
    }

    // Initialize WAL (CRDTs are lazy — created on first edit)
    this.wal = new WAL();
    this.wal.startAutoSeal(this.deviceId, walDir);

    // Start sync engine (file watcher)
    this.sync = new SyncEngine(this, walDir);
    this.sync.start();

    return this.state;
  }

  // Apply a user operation
  applyOp(op) {
    if (!op.deviceId) op.deviceId = this.deviceId;
    if (!op.timestamp) op.timestamp = Date.now();
    if (!op.id) op.id = crypto.randomUUID();
    if (op.type === 'block-text-diff') return this._applyBlockTextDiff(op);
    if (op.type === 'block-text-op') {
      this._applyBlockTextOp(op);
      this.wal.append(op);
      return this.state;
    }
    // page-view is device-local UI state — apply in memory, never sync
    if (op.type === 'page-view') {
      this.state = modelApplyOp(this.state, op);
      return this.state;
    }
    this.state = modelApplyOp(this.state, op);
    this.wal.append(op);
    return this.state;
  }

  // Apply a remote batch (from sync)
  applyRemoteBatch(batchFile, batch) {
    if (this.appliedBatches.has(batchFile)) return;
    for (const op of batch.ops) {
      if (op.type === 'block-text-op') {
        this._applyBlockTextOp(op);
      } else {
        this.state = modelApplyOp(this.state, op);
      }
    }
    this.appliedBatches.add(batchFile);
    if (this._onStateChange) this._onStateChange(this.state);
  }

  // Get current state
  getState() {
    return this.state;
  }

  // Set callback for state changes (from sync)
  onStateChange(callback) {
    this._onStateChange = callback;
  }

  // Seal WAL and optionally create snapshot
  flush() {
    if (!this.wal || !this.notebookPath) return;

    const walDir = path.join(this.notebookPath, 'wal');
    const filename = this.wal.seal(this.deviceId, walDir);
    if (filename) {
      this.appliedBatches.add(filename);
    }

    // Check if we should create a snapshot
    const batchCount = WAL.listBatches(walDir).length;
    if (batchCount > SNAPSHOT_THRESHOLD) {
      const snapshotsDir = path.join(this.notebookPath, 'snapshots');
      this._serializeCrdts();
      createSnapshot(this.state, snapshotsDir, Array.from(this.appliedBatches));
    }
  }

  // Close the notebook
  close() {
    console.log('[notebound] NotebookManager.close() called, path:', this.notebookPath, 'wal:', !!this.wal, 'pending:', this.wal?.pendingCount);
    if (this.sync) {
      this.sync.stop();
      this.sync = null;
    }

    if (this.wal) {
      this.wal.stopAutoSeal();
      // Final seal
      if (this.notebookPath) {
        const walDir = path.join(this.notebookPath, 'wal');
        const filename = this.wal.seal(this.deviceId, walDir);
        console.log('[notebound] sealed WAL batch:', filename);
        if (filename) this.appliedBatches.add(filename);

        // Create a snapshot on close
        const snapshotsDir = path.join(this.notebookPath, 'snapshots');
        this._serializeCrdts();
        const snapFile = createSnapshot(this.state, snapshotsDir, Array.from(this.appliedBatches));
        console.log('[notebound] created snapshot:', snapFile);
      }
      this.wal = null;
    }

    this.notebookPath = null;
    this.state = null;
    this.deviceId = null;
  }

  // Lazily initialize a block's CRDT on first edit
  _getOrInitCrdt(blockId) {
    let crdt = this.crdts.get(blockId);
    if (crdt) return crdt;

    // Find block to seed the CRDT from its current content
    let blk = null;
    for (const nb of this.state.notebooks) {
      for (const sec of nb.sections) {
        blk = this._findBlockInPages(sec.pages, blockId);
        if (blk) break;
      }
      if (blk) break;
    }

    if (blk?.crdt) {
      crdt = TextCRDT.fromSnapshot(blk.crdt);
    } else {
      crdt = new TextCRDT(this.deviceId);
      if (blk?.html) {
        const text = blk.html.replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]*>/g, '');
        if (text) crdt.insertTextAt(0, text);
      }
    }
    this.crdts.set(blockId, crdt);
    return crdt;
  }

  _applyBlockTextDiff(diffOp) {
    const { pageId, blockId, diffs } = diffOp;
    let crdt = this._getOrInitCrdt(blockId);
    const crdtOps = [];
    for (const diff of diffs) {
      if (diff.type === 'insert') {
        const ops = crdt.insertTextAt(diff.pos, diff.text);
        crdtOps.push(...ops);
      } else if (diff.type === 'delete') {
        for (let i = 0; i < diff.count; i++) {
          const op = crdt.deleteAt(diff.pos);
          if (op) crdtOps.push(op);
        }
      }
    }
    if (crdtOps.length === 0) return this.state;
    // Apply diffs to HTML preserving formatting tags
    const result = findPageInState(this.state, pageId);
    if (result) {
      const blk = result.page.blocks.find(b => b.id === blockId);
      if (blk) blk.html = applyDiffsToHtml(blk.html || '', diffs);
    }
    const walOp = {
      id: crypto.randomUUID(),
      deviceId: this.deviceId,
      timestamp: Date.now(),
      type: 'block-text-op',
      pageId,
      blockId,
      crdtOps,
    };
    this.wal.append(walOp);
    return this.state;
  }

  _applyBlockTextOp(op) {
    let crdt = this._getOrInitCrdt(op.blockId);
    const oldText = crdt.getText();
    for (const crdtOp of (op.crdtOps || [])) crdt.apply(crdtOp);
    const newText = crdt.getText();
    if (oldText !== newText) {
      const result = findPageInState(this.state, op.pageId);
      if (result) {
        const blk = result.page.blocks.find(b => b.id === op.blockId);
        if (blk) blk.html = applyTextChangeToHtml(blk.html || '', oldText, newText);
      }
    }
  }

  _serializeCrdts() {
    const walkPages = (pages) => {
      for (const page of pages) {
        for (const blk of (page.blocks || [])) {
          const crdt = this.crdts.get(blk.id);
          if (crdt) blk.crdt = crdt.snapshot();
        }
        if (page.children?.length) walkPages(page.children);
      }
    };
    for (const nb of this.state.notebooks) {
      for (const sec of nb.sections) walkPages(sec.pages);
    }
  }

  _findBlockInPages(pages, blockId) {
    for (const page of pages) {
      const blk = page.blocks?.find(b => b.id === blockId);
      if (blk) return blk;
      if (page.children?.length) {
        const found = this._findBlockInPages(page.children, blockId);
        if (found) return found;
      }
    }
    return null;
  }

  get walDir() {
    return this.notebookPath ? path.join(this.notebookPath, 'wal') : null;
  }

  get snapshotsDir() {
    return this.notebookPath ? path.join(this.notebookPath, 'snapshots') : null;
  }

  get blobsDir() {
    return this.notebookPath ? path.join(this.notebookPath, 'blobs') : null;
  }
}

module.exports = { NotebookManager };
