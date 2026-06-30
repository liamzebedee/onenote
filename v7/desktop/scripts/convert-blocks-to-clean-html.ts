#!/usr/bin/env bun
// Normalize every text/code block's HTML through the ProseMirror schema, giving
// uniform, clean markup (no inline styles/margins/padding, only the editor's own
// tags; <br> preserved as hard breaks). Identical in effect to opening every
// block in the editor and letting it re-serialize.
//
// Usage:
//   bun scripts/convert-blocks-to-clean-html.ts <notebook.notebound> [--apply]
//
// Without --apply it is a read-only dry run: prints stats, sample diffs, and
// flags any block whose visible text would change (potential content loss).
// With --apply it writes block-update-html ops to the WAL (back up first!).

import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { JSDOM } from 'jsdom';
import type { AppState, Page, Block } from '../../core/src/types.ts';

// ── DOM for ProseMirror (Node has none) ─────────────────────
const dom = new JSDOM('<!doctype html><html><body></body></html>');
(globalThis as any).window = dom.window;
(globalThis as any).document = dom.window.document;
(globalThis as any).navigator = dom.window.navigator;

const { parseHTML, serializeToHTML } = await import('../../core/src/pm.ts');
const { rebuildState } = require('../src/snapshot');

const notebookDir = process.argv[2];
const APPLY = process.argv.includes('--apply');
if (!notebookDir) {
  console.error('Usage: bun scripts/convert-blocks-to-clean-html.ts <notebook.notebound> [--apply]');
  process.exit(1);
}

const abs = path.resolve(notebookDir);
const meta = JSON.parse(fs.readFileSync(path.join(abs, 'meta.json'), 'utf8'));
const tmpSnap = path.join(os.tmpdir(), 'nb-convert-snap-' + Date.now());
fs.mkdirSync(tmpSnap, { recursive: true });
const { state }: { state: AppState } = rebuildState(tmpSnap, path.join(abs, 'wal'), meta.notebookId, meta.name);
fs.rmSync(tmpSnap, { recursive: true, force: true });

function visibleText(html: string): string {
  const d = document.createElement('div');
  d.innerHTML = html || '';
  return (d.textContent || '').replace(/\s+/g, ' ').trim();
}
function clean(html: string): string {
  return serializeToHTML(parseHTML(html || ''));
}

interface Change { pageId: string; pageTitle: string; blockId: string; before: string; after: string; textChanged: boolean; flags: string[]; }
const changes: Change[] = [];
let total = 0, unchanged = 0;

function walk(pages: Page[]): void {
  for (const page of pages) {
    for (const b of (page.blocks || []) as Block[]) {
      if (b.type !== 'text' && b.type !== 'code') continue;
      total++;
      const before = b.html || '';
      const after = clean(before);
      if (after === before) { unchanged++; continue; }
      const flags: string[] = [];
      if (/<h[56][\s>]/i.test(before)) flags.push('h5/h6→downgraded');
      if (/<img[\s>]/i.test(before)) flags.push('inline-img-dropped');
      if (/<table[\s>]/i.test(before)) flags.push('table-dropped');
      const textChanged = visibleText(before) !== visibleText(after);
      changes.push({ pageId: page.id, pageTitle: page.title, blockId: b.id, before, after, textChanged, flags });
    }
    if (page.children?.length) walk(page.children);
  }
}
for (const nb of state.notebooks) for (const sec of nb.sections) walk(sec.pages);

// ── Report ──────────────────────────────────────────────────
const textChangedBlocks = changes.filter(c => c.textChanged);
const flagged = changes.filter(c => c.flags.length);
console.log(`\n=== ${meta.name}  (${abs}) ===`);
console.log(`text/code blocks: ${total}`);
console.log(`  unchanged (already clean): ${unchanged}`);
console.log(`  would change formatting:   ${changes.length}`);
console.log(`  ⚠ visible TEXT would change: ${textChangedBlocks.length}`);
console.log(`  ⚠ flagged (lossy tags):      ${flagged.length}`);

const sample = changes.slice(0, 6);
console.log(`\n--- sample formatting diffs (first ${sample.length}) ---`);
for (const c of sample) {
  console.log(`\n[${c.pageTitle}] ${c.blockId}${c.flags.length ? '  FLAGS:' + c.flags.join(',') : ''}`);
  console.log(`  before: ${c.before.slice(0, 180)}`);
  console.log(`  after : ${c.after.slice(0, 180)}`);
}
if (textChangedBlocks.length) {
  console.log(`\n--- ⚠ blocks where visible text changes (first 8) ---`);
  for (const c of textChangedBlocks.slice(0, 8)) {
    console.log(`\n[${c.pageTitle}] ${c.blockId} ${c.flags.join(',')}`);
    console.log(`  textBefore: ${visibleText(c.before).slice(0, 160)}`);
    console.log(`  textAfter : ${visibleText(c.after).slice(0, 160)}`);
  }
}

if (!APPLY) {
  console.log(`\n(DRY RUN — nothing written. Re-run with --apply to commit.)`);
  process.exit(0);
}

// ── Apply ───────────────────────────────────────────────────
const { NotebookManager } = require('../src/notebook');
const cfg = JSON.parse(fs.readFileSync(path.join(os.homedir(), '.config', 'notebound', 'config.json'), 'utf8'));
const deviceId = cfg.deviceId || 'convert-script';
const userData = path.join(os.homedir(), '.config', 'notebound');

const m = new NotebookManager();
m.open(abs, deviceId, userData);
let applied = 0;
for (const c of changes) {
  m.applyOp({ type: 'block-update-html', pageId: c.pageId, blockId: c.blockId, html: c.after });
  applied++;
}
m.flush();
m.close();
console.log(`\n✅ APPLIED ${applied} block updates to ${meta.name} and sealed the WAL.`);
