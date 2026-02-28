// .notebound Directory Manager
// Creates/opens notebook directory bundles

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { WAL } = require('./wal');
const { defaultState, applyOp, makeOp } = require('./model');
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
  open(dirPath) {
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
    let meta;
    if (fs.existsSync(metaPath)) {
      meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
      // Each device gets its own deviceId on first open
      // But we store ONE deviceId per meta.json — for multi-device,
      // each device should store its own ID separately
      if (!meta.deviceId) {
        meta.deviceId = crypto.randomUUID();
        fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2));
      }
    } else {
      meta = this.create(dirPath);
    }

    this.deviceId = meta.deviceId;

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

    // Initialize WAL
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

    // Apply to local state
    this.state = applyOp(this.state, op);

    // Append to WAL
    this.wal.append(op);

    return this.state;
  }

  // Apply a remote batch (from sync)
  applyRemoteBatch(batchFile, batch) {
    if (this.appliedBatches.has(batchFile)) return;

    for (const op of batch.ops) {
      this.state = applyOp(this.state, op);
    }
    this.appliedBatches.add(batchFile);

    // Notify renderer
    if (this._onStateChange) {
      this._onStateChange(this.state);
    }
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
        const snapFile = createSnapshot(this.state, snapshotsDir, Array.from(this.appliedBatches));
        console.log('[notebound] created snapshot:', snapFile);
      }
      this.wal = null;
    }

    this.notebookPath = null;
    this.state = null;
    this.deviceId = null;
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
