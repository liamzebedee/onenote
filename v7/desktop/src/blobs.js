// Content-addressed blob store
// Immutable, no merge logic needed
// Each blob has an optional .meta.json sidecar for filename, mime type, etc.

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function hash(buffer) {
  return crypto.createHash('sha256').update(buffer).digest('hex');
}

function store(buffer, blobsDir, meta = null) {
  const h = hash(buffer);
  const filePath = path.join(blobsDir, h);
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(blobsDir, { recursive: true });
    const tmpPath = filePath + '.tmp';
    fs.writeFileSync(tmpPath, buffer);
    fs.renameSync(tmpPath, filePath);
  }
  // Write/update metadata sidecar
  if (meta) {
    const metaPath = filePath + '.meta.json';
    if (!fs.existsSync(metaPath)) {
      fs.writeFileSync(metaPath, JSON.stringify(meta));
    }
  }
  return h;
}

function get(h, blobsDir) {
  const filePath = path.join(blobsDir, h);
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath);
}

function getMeta(h, blobsDir) {
  const metaPath = path.join(blobsDir, h + '.meta.json');
  if (!fs.existsSync(metaPath)) return null;
  return JSON.parse(fs.readFileSync(metaPath, 'utf8'));
}

function exists(h, blobsDir) {
  return fs.existsSync(path.join(blobsDir, h));
}

module.exports = { store, get, getMeta, exists, hash };
