// Write-Ahead Log (WAL)
// Appends ops to in-memory buffer, seals to immutable batch files

const fs = require('fs');
const path = require('path');

class WAL {
  constructor() {
    this.buffer = [];
    this._sealTimer = null;
  }

  // Append an op to the in-memory buffer
  append(op) {
    this.buffer.push(op);
    return op;
  }

  // Seal the buffer to an immutable batch file
  // Returns the batch filename, or null if buffer was empty
  seal(deviceId, walDir) {
    if (this.buffer.length === 0) return null;

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `${deviceId}-${timestamp}.json`;
    const filePath = path.join(walDir, filename);

    const batch = {
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
  static readBatch(filePath) {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  }

  // List all batch files in the WAL directory
  static listBatches(walDir) {
    if (!fs.existsSync(walDir)) return [];
    return fs.readdirSync(walDir)
      .filter(f => f.endsWith('.json') && !f.endsWith('.tmp'))
      .sort(); // lexicographic sort = chronological since timestamp is in filename
  }

  // Start auto-seal timer (every 30 seconds)
  startAutoSeal(deviceId, walDir) {
    this.stopAutoSeal();
    this._sealTimer = setInterval(() => {
      if (this.buffer.length > 0) {
        this.seal(deviceId, walDir);
      }
    }, 30000);
  }

  stopAutoSeal() {
    if (this._sealTimer) {
      clearInterval(this._sealTimer);
      this._sealTimer = null;
    }
  }

  // Number of buffered (unsealed) ops
  get pendingCount() {
    return this.buffer.length;
  }
}

module.exports = { WAL };
