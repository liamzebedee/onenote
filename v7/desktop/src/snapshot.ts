// Snapshot Manager
// Creates and loads full state snapshots, rebuilds state from snapshot + WAL replay

import fs from 'fs';
import path from 'path';
import { WAL } from './wal';
import { emptyState, applyOp, buildIndex, finalizeState } from './model';
import type { AppState, Snapshot } from '../../core/src/types';

const MAX_SNAPSHOTS_PER_DEVICE = 3;

// Sort snapshot filenames by timestamp (chars after the 36-char UUID + '-' prefix).
// This mirrors WAL.listBatches() which does the same slice. Without this, lexicographic
// sort on the device-UUID prefix corrupts order (e.g. 'd1...' < 'f5...' regardless of date).
function sortByTimestamp(files: string[]): string[] {
  return files.slice().sort((a, b) => {
    const tsA = a.slice(37); // skip "{uuid}-"
    const tsB = b.slice(37);
    return tsA < tsB ? -1 : tsA > tsB ? 1 : 0;
  });
}

// Create a snapshot of the current state
function createSnapshot(
  state: AppState,
  snapshotsDir: string,
  includedBatches: string[] = [],
  deviceId?: string,
): string {
  fs.mkdirSync(snapshotsDir, { recursive: true });

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = deviceId ? `${deviceId}-${timestamp}.json` : `${timestamp}.json`;
  const filePath = path.join(snapshotsDir, filename);

  const snapshot: Snapshot = {
    createdAt: Date.now(),
    includedBatches,
    state,
  };

  const tmpPath = filePath + '.tmp';
  fs.writeFileSync(tmpPath, JSON.stringify(snapshot));
  fs.renameSync(tmpPath, filePath);

  // Prune old snapshots -- keep only the latest MAX_SNAPSHOTS_PER_DEVICE
  try {
    const allSnaps = sortByTimestamp(
      fs.readdirSync(snapshotsDir).filter(f => f.endsWith('.json') && !f.endsWith('.tmp'))
    );
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
function loadLatestSnapshot(snapshotsDir: string): Snapshot | null {
  if (!fs.existsSync(snapshotsDir)) return null;

  const files = sortByTimestamp(
    fs.readdirSync(snapshotsDir).filter(f => f.endsWith('.json') && !f.endsWith('.tmp'))
  );

  if (files.length === 0) return null;

  const latest = files[files.length - 1];
  const data = fs.readFileSync(path.join(snapshotsDir, latest), 'utf8');
  return JSON.parse(data) as Snapshot;
}

// Rebuild state from latest snapshot + WAL replay
function rebuildState(
  snapshotsDir: string,
  walDir: string,
  notebookId: string,
  notebookName: string,
): { state: AppState; appliedBatches: Set<string>; newBatchesReplayed: number; timings: Record<string, number> } {
  const t0 = performance.now();
  const timings: Record<string, number> = {};

  const snapshot = loadLatestSnapshot(snapshotsDir);
  timings.snapshotLoad = performance.now() - t0;

  let state: AppState;
  const appliedBatches = new Set<string>();

  if (snapshot) {
    state = snapshot.state;
    for (const b of (snapshot.includedBatches || [])) {
      appliedBatches.add(b);
    }
  } else {
    state = emptyState();
  }

  // Ensure the notebook exists in state -- it's the directory we opened
  if (notebookId && !state.notebooks.find(n => n.id === notebookId)) {
    state.notebooks.push({ id: notebookId, title: notebookName || 'Notebook', sections: [] });
  }

  // Build index for O(1) lookups during replay
  buildIndex(state);

  // Replay all WAL batches not included in the snapshot
  let newBatchesReplayed = 0;
  let totalOpsReplayed = 0;
  const t1 = performance.now();
  const batches = WAL.listBatches(walDir);
  timings.walList = performance.now() - t1;

  const t2 = performance.now();
  for (const batchFile of batches) {
    if (appliedBatches.has(batchFile)) continue;
    const batch = WAL.readBatch(path.join(walDir, batchFile));
    for (const op of batch.ops) {
      state = applyOp(state, op);
    }
    appliedBatches.add(batchFile);
    newBatchesReplayed++;
    totalOpsReplayed += batch.ops.length;
  }
  timings.walReplay = performance.now() - t2;
  timings.walBatchesReplayed = newBatchesReplayed;
  timings.walOpsReplayed = totalOpsReplayed;

  // Finalize: serialize cached CRDTs, remove index
  const t3 = performance.now();
  finalizeState(state);
  timings.finalize = performance.now() - t3;

  timings.total = performance.now() - t0;

  return { state, appliedBatches, newBatchesReplayed, timings };
}

export { createSnapshot, loadLatestSnapshot, rebuildState };
