// Content-addressed blob store
// Immutable, no merge logic needed
// Each blob has an optional .meta.json sidecar for filename, mime type, etc.

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import type { BlobMeta } from '../../core/src/types';

function hash(buffer: Buffer): string {
  return crypto.createHash('sha256').update(buffer).digest('hex');
}

function store(buffer: Buffer, blobsDir: string, meta: BlobMeta | null = null): string {
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

function get(h: string, blobsDir: string): Buffer | null {
  const filePath = path.join(blobsDir, h);
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath);
}

function getMeta(h: string, blobsDir: string): BlobMeta | null {
  const metaPath = path.join(blobsDir, h + '.meta.json');
  if (!fs.existsSync(metaPath)) return null;
  return JSON.parse(fs.readFileSync(metaPath, 'utf8')) as BlobMeta;
}

function exists(h: string, blobsDir: string): boolean {
  return fs.existsSync(path.join(blobsDir, h));
}

export { store, get, getMeta, exists, hash };
