import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { rebuildState } from '../src/snapshot.js';
import { WAL } from '../src/wal.js';

const notebookDir = path.join(__dirname, 'fixtures', 'my-notebook.notebound');
const walDir = path.join(notebookDir, 'wal');
const meta = JSON.parse(fs.readFileSync(path.join(notebookDir, 'meta.json'), 'utf8'));
const notebookId = meta.notebookId;

let snapshotsDir;
beforeAll(() => {
  snapshotsDir = fs.mkdtempSync(path.join(os.tmpdir(), 'notebound-bench-'));
});
afterAll(() => {
  fs.rmSync(snapshotsDir, { recursive: true, force: true });
});

describe('WAL rebuild benchmarks', () => {
  it('benchmark: full WAL rebuild', { timeout: 120000 }, () => {
    // Warm up
    rebuildState(snapshotsDir, walDir, notebookId, meta.name);
    // Clean snapshots for fresh rebuild
    for (const f of fs.readdirSync(snapshotsDir)) fs.unlinkSync(path.join(snapshotsDir, f));

    const runs = 3;
    const times = [];
    for (let i = 0; i < runs; i++) {
      const tmpSnap = fs.mkdtempSync(path.join(os.tmpdir(), 'notebound-bench-run-'));
      const start = performance.now();
      const { state } = rebuildState(tmpSnap, walDir, notebookId, meta.name);
      const elapsed = performance.now() - start;
      times.push(elapsed);
      fs.rmSync(tmpSnap, { recursive: true, force: true });
    }

    const avg = times.reduce((a, b) => a + b, 0) / times.length;
    const min = Math.min(...times);
    console.log(`\n  WAL rebuild (${WAL.listBatches(walDir).length} batches):`);
    console.log(`    avg: ${avg.toFixed(0)}ms  min: ${min.toFixed(0)}ms  runs: [${times.map(t => t.toFixed(0) + 'ms').join(', ')}]`);

    // Target: under 2 seconds
    expect(min).toBeLessThan(2000);
  });

  it('benchmark: WAL listBatches + readBatch I/O', { timeout: 30000 }, () => {
    const start = performance.now();
    const batches = WAL.listBatches(walDir);
    const listTime = performance.now() - start;

    const readStart = performance.now();
    let totalOps = 0;
    for (const f of batches) {
      const batch = WAL.readBatch(path.join(walDir, f));
      totalOps += batch.ops.length;
    }
    const readTime = performance.now() - readStart;

    console.log(`\n  I/O breakdown:`);
    console.log(`    listBatches: ${listTime.toFixed(0)}ms (${batches.length} files)`);
    console.log(`    readBatch (all): ${readTime.toFixed(0)}ms (${totalOps} ops)`);
  });

  it('benchmark: op application by type (with index)', { timeout: 120000 }, () => {
    const { applyOp, emptyState, buildIndex } = require('../src/model.js');
    const batches = WAL.listBatches(walDir);

    // Load all ops
    const allOps = [];
    for (const f of batches) {
      const batch = WAL.readBatch(path.join(walDir, f));
      allOps.push(...batch.ops);
    }

    // Time per type
    let state = emptyState();
    state.notebooks.push({ id: notebookId, title: meta.name, sections: [] });
    buildIndex(state);

    const timings = {};
    for (const op of allOps) {
      const start = performance.now();
      state = applyOp(state, op);
      const elapsed = performance.now() - start;
      if (!timings[op.type]) timings[op.type] = { count: 0, total: 0 };
      timings[op.type].count++;
      timings[op.type].total += elapsed;
    }

    console.log(`\n  Per-type timings (with index):`);
    const sorted = Object.entries(timings).sort((a, b) => b[1].total - a[1].total);
    let total = 0;
    for (const [type, t] of sorted) {
      total += t.total;
      console.log(`    ${type}: ${t.total.toFixed(0)}ms (${t.count} ops, ${(t.total / t.count).toFixed(2)}ms/op)`);
    }
    console.log(`    TOTAL: ${total.toFixed(0)}ms`);
  });
});
