#!/usr/bin/env node
// Migrate block positions: shift all blocks per page so the top-left starts at (0, 0).
// Writes a snapshot that includes ALL WAL batches, so nothing gets replayed on top.

import * as fs from 'fs';
import * as path from 'path';
import type { AppState, Page, Block, NotebookMeta } from '../../core/src/types.ts';

// These modules use CommonJS
const { rebuildState, createSnapshot } = require('../src/snapshot');
const { WAL } = require('../src/wal');

interface RebuildResult {
  state: AppState;
}

const notebookDir: string | undefined = process.argv[2];
if (!notebookDir) {
  console.error('Usage: node scripts/migrate-block-positions.ts <notebook.notebound>');
  process.exit(1);
}

const absNotebook: string = path.resolve(notebookDir);
const walDir: string = path.join(absNotebook, 'wal');
const snapshotsDir: string = path.join(absNotebook, 'snapshots');
const metaPath: string = path.join(absNotebook, 'meta.json');
const meta: NotebookMeta & { deviceId?: string } = JSON.parse(fs.readFileSync(metaPath, 'utf8'));

// Rebuild state from snapshot + WAL (the normal way the app does it)
const result: RebuildResult = rebuildState(snapshotsDir, walDir, meta.notebookId, meta.name);
const state: AppState = result.state;

let changed: number = 0;

function migratePages(pages: Page[]): void {
  for (const p of pages) {
    const blocks: Block[] = p.blocks || [];
    if (blocks.length) {
      const minX: number = Math.min(...blocks.map((b: Block) => b.x ?? 0));
      const minY: number = Math.min(...blocks.map((b: Block) => b.y ?? 0));
      if (minX > 0 || minY > 0) {
        for (const b of blocks) {
          if (minX > 0) b.x = (b.x ?? 0) - minX;
          if (minY > 0) b.y = (b.y ?? 0) - minY;
        }
        console.log(`  ${p.title}: shifted by (${-minX}, ${-minY})`);
        changed++;
      }
    }
    if (p.children?.length) migratePages(p.children);
  }
}

for (const nb of state.notebooks) {
  for (const sec of nb.sections) {
    console.log(`Section: ${sec.title}`);
    migratePages(sec.pages);
  }
}

if (changed === 0) {
  console.log('\nNo pages needed migration.');
  process.exit(0);
}

// Write snapshot that includes ALL WAL batches so none are replayed
const allBatches: string[] = WAL.listBatches(walDir);
const deviceId: string = meta.deviceId || '00000000-0000-0000-0000-000000000000';
const snapFile: string = createSnapshot(state, snapshotsDir, allBatches, deviceId);
console.log(`\nMigrated ${changed} pages. Snapshot: ${snapFile} (covers ${allBatches.length} WAL batches)`);
