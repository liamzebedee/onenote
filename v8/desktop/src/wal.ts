// Write-Ahead Log (WAL)
// Appends ops to in-memory buffer, seals to immutable batch files

import fs from 'fs';
import path from 'path';
import type { Op, WALBatch } from '../../core/src/types';

class WAL {
  buffer: Op[];
  private _sealTimer: ReturnType<typeof setInterval> | null;

  constructor() {
    this.buffer = [];
    this._sealTimer = null;
  }

  // Append an op to the in-memory buffer
  append(op: Op): Op {
    this.buffer.push(op);
    return op;
  }

  // Seal the buffer to an immutable batch file
  // Returns the batch filename, or null if buffer was empty
  seal(deviceId: string, walDir: string): string | null {
    if (this.buffer.length === 0) return null;

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `${deviceId}-${timestamp}.json`;
    const filePath = path.join(walDir, filename);

    const batch: WALBatch = {
      deviceId,
      sealedAt: Date.now(),
      ops: this.buffer.slice(),
    };

    fs.mkdirSync(walDir, { recursive: true });
    // Write atomically: write to temp file, then rename
    const tmpPath = filePath + '.tmp';
    fs.writeFileSync(tmpPath, JSON.stringify(batch, null, 2));
    fs.renameSync(tmpPath, filePath);

    this.buffer = [];
    return filename;
  }

  // Read a batch file
  static readBatch(filePath: string): WALBatch {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data) as WALBatch;
  }

  // List all batch files in the WAL directory
  static listBatches(walDir: string): string[] {
    if (!fs.existsSync(walDir)) return [];
    return fs.readdirSync(walDir)
      .filter(f => f.endsWith('.json') && !f.endsWith('.tmp'))
      .sort((a, b) => {
        // Extract timestamp portion after the device UUID prefix
        // Filename format: <deviceId>-<ISO timestamp>.json
        // Device ID is a UUID (36 chars), followed by a dash, then the timestamp
        const tsA = a.slice(37);
        const tsB = b.slice(37);
        return tsA < tsB ? -1 : tsA > tsB ? 1 : a < b ? -1 : a > b ? 1 : 0;
      });
  }

  // Start auto-seal timer (every 30 seconds)
  startAutoSeal(deviceId: string, walDir: string): void {
    this.stopAutoSeal();
    this._sealTimer = setInterval(() => {
      if (this.buffer.length > 0) {
        this.seal(deviceId, walDir);
      }
    }, 30000);
  }

  stopAutoSeal(): void {
    if (this._sealTimer) {
      clearInterval(this._sealTimer);
      this._sealTimer = null;
    }
  }

  // Number of buffered (unsealed) ops
  get pendingCount(): number {
    return this.buffer.length;
  }
}

export { WAL };
