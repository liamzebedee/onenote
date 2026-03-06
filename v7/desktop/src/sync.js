// Sync Engine
// Watches .notebound/wal/ for new batch files from other devices
// Uses native fs.watch with debouncing

const fs = require('fs');
const path = require('path');
const { WAL } = require('./wal');

class SyncEngine {
  constructor(notebookManager, walDir) {
    this.manager = notebookManager;
    this.walDir = walDir;
    this._watcher = null;
    this._debounceTimer = null;
  }

  start() {
    if (!fs.existsSync(this.walDir)) {
      fs.mkdirSync(this.walDir, { recursive: true });
    }

    try {
      this._watcher = fs.watch(this.walDir, (eventType, filename) => {
        if (!filename || !filename.endsWith('.json') || filename.endsWith('.tmp')) return;

        // Debounce: batch rapid file events
        clearTimeout(this._debounceTimer);
        this._debounceTimer = setTimeout(() => {
          this._reconcile();
        }, 100);
      });

      this._watcher.on('error', (err) => {
        console.error('Sync watcher error:', err);
      });
    } catch (err) {
      console.error('Failed to start file watcher:', err);
    }
  }

  stop() {
    if (this._watcher) {
      this._watcher.close();
      this._watcher = null;
    }
    clearTimeout(this._debounceTimer);
  }

  // Check for any new batch files and apply them
  _reconcile() {
    const batches = WAL.listBatches(this.walDir);

    for (const batchFile of batches) {
      if (this.manager.appliedBatches.has(batchFile)) continue;

      try {
        const batch = WAL.readBatch(path.join(this.walDir, batchFile));

        // Skip our own device's batches that we already have in memory
        // (they were applied when the ops were created)
        if (batch.deviceId === this.manager.deviceId) {
          this.manager.appliedBatches.add(batchFile);
          continue;
        }

        this.manager.applyRemoteBatch(batchFile, batch);
      } catch (err) {
        console.error(`Failed to read batch ${batchFile}:`, err);
      }
    }
  }

  // Manual full reconciliation (e.g., on startup)
  reconcile() {
    this._reconcile();
  }
}

module.exports = { SyncEngine };
