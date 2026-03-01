// Snapshot Manager
// Creates and loads full state snapshots, rebuilds state from snapshot + WAL replay

const fs = require('fs');
const path = require('path');
const { WAL } = require('./wal');
const { emptyState, applyOp, buildIndex, finalizeState } = require('./model');

const MAX_SNAPSHOTS_PER_DEVICE = 3;

// Create a snapshot of the current state
function createSnapshot(state, snapshotsDir, includedBatches = [], deviceId) {
  fs.mkdirSync(snapshotsDir, { recursive: true });

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = deviceId ? `${deviceId}-${timestamp}.json` : `${timestamp}.json`;
  const filePath = path.join(snapshotsDir, filename);

  const snapshot = {
    createdAt: Date.now(),
    includedBatches,
    state,
  };

  const tmpPath = filePath + '.tmp';
  fs.writeFileSync(tmpPath, JSON.stringify(snapshot));
  fs.renameSync(tmpPath, filePath);

  // Prune old snapshots — keep only the latest MAX_SNAPSHOTS_PER_DEVICE
  try {
    const allSnaps = fs.readdirSync(snapshotsDir)
      .filter(f => f.endsWith('.json') && !f.endsWith('.tmp'))
      .sort();
    if (allSnaps.length > MAX_SNAPSHOTS_PER_DEVICE) {
      const toDelete = allSnaps.slice(0, allSnaps.length - MAX_SNAPSHOTS_PER_DEVICE);
      for (const f of toDelete) {
        fs.unlinkSync(path.join(snapshotsDir, f));
      }
    }
  } catch {}

  return filename;
}

// Load the latest snapshot from the snapshots directory
function loadLatestSnapshot(snapshotsDir) {
  if (!fs.existsSync(snapshotsDir)) return null;

  const files = fs.readdirSync(snapshotsDir)
    .filter(f => f.endsWith('.json') && !f.endsWith('.tmp'))
    .sort();

  if (files.length === 0) return null;

  const latest = files[files.length - 1];
  const data = fs.readFileSync(path.join(snapshotsDir, latest), 'utf8');
  return JSON.parse(data);
}

// Rebuild state from latest snapshot + WAL replay
function rebuildState(snapshotsDir, walDir, notebookId, notebookName) {
  const snapshot = loadLatestSnapshot(snapshotsDir);
  let state;
  let appliedBatches = new Set();

  if (snapshot) {
    state = snapshot.state;
    for (const b of (snapshot.includedBatches || [])) {
      appliedBatches.add(b);
    }
  } else {
    state = emptyState();
  }

  // Ensure the notebook exists in state — it's the directory we opened
  if (notebookId && !state.notebooks.find(n => n.id === notebookId)) {
    state.notebooks.push({ id: notebookId, title: notebookName || 'Notebook', sections: [] });
  }

  // Build index for O(1) lookups during replay
  buildIndex(state);

  // Replay all WAL batches not included in the snapshot
  const batches = WAL.listBatches(walDir);
  for (const batchFile of batches) {
    if (appliedBatches.has(batchFile)) continue;
    const batch = WAL.readBatch(path.join(walDir, batchFile));
    for (const op of batch.ops) {
      state = applyOp(state, op);
    }
    appliedBatches.add(batchFile);
  }

  // Finalize: serialize cached CRDTs, remove index
  finalizeState(state);

  return { state, appliedBatches };
}

module.exports = { createSnapshot, loadLatestSnapshot, rebuildState };
