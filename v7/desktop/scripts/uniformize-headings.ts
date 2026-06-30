#!/usr/bin/env bun
// Uniformize headings across a notebook:
//   - per page, the FIRST heading-like element -> H1, every other heading -> H2
//   - heading-like bold-only paragraphs (short / numbered like "3.2.") -> promoted to H2
//   - <pre> blocks are NOT auto-changed; they're listed for manual judging
//
// Usage: bun scripts/uniformize-headings.ts <notebook.notebound> [--apply] [--overrides file.json]
// Dry run prints a full before/after report and writes /tmp/uniformize-changes.json.

import * as fs from 'fs'; import * as path from 'path'; import * as os from 'os';
import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!doctype html><body></body>');
(globalThis as any).window = dom.window;
(globalThis as any).document = dom.window.document;
(globalThis as any).navigator = dom.window.navigator;
const { parseHTML, serializeToHTML } = await import('../../core/src/pm.ts');
const { rebuildState } = require('../src/snapshot');

const abs = path.resolve(process.argv[2]);
const APPLY = process.argv.includes('--apply');
const ovIdx = process.argv.indexOf('--overrides');
const overrides: Record<string, string> = ovIdx > -1 ? JSON.parse(fs.readFileSync(process.argv[ovIdx + 1], 'utf8')) : {};
const D = document;

const meta = JSON.parse(fs.readFileSync(path.join(abs, 'meta.json'), 'utf8'));
const tmp = path.join(os.tmpdir(), 'uh' + Date.now()); fs.mkdirSync(tmp, { recursive: true });
const { state } = rebuildState(tmp, path.join(abs, 'wal'), meta.notebookId, meta.name);
fs.rmSync(tmp, { recursive: true, force: true });

const ftext = (el: any) => (el.textContent || '').replace(/ /g, ' ').trim();
function isBoldOnlyP(p: any): boolean {
  if (p.tagName !== 'P') return false;
  if (p.querySelector('em,i,a')) return false;
  const txt = ftext(p); if (!txt) return false;
  let bold = ''; p.querySelectorAll('strong,b').forEach((s: any) => bold += s.textContent);
  return bold.replace(/ /g, ' ').trim() === txt;
}
function headingLike(txt: string): boolean {
  const t = txt.trim();
  if (/^\(?\d+(\.\d+)*[.)]/.test(t)) return true;          // "3.2.", "1)", "(1)" — numbered section
  if (/\.$/.test(t)) return false;                          // ends in a period → sentence, not heading
  if (t.length <= 55 && !/[.!?]\s+\S/.test(t)) return true; // short label, no internal sentence break
  return false;
}
function rename(el: any, tag: string, plainText = false): any {
  const n = D.createElement(tag);
  if (plainText) n.textContent = ftext(el);
  else while (el.firstChild) n.appendChild(el.firstChild);
  el.replaceWith(n);
  return n;
}

interface Change { pageId: string; pageTitle: string; blockId: string; before: string; after: string; notes: string[]; }
const changes: Change[] = [];
const preBlocks: { pageId: string; pageTitle: string; blockId: string; text: string }[] = [];

function transformPage(page: any): void {
  let pageHasH1 = false;
  let seenBody = false; // any real body content seen → later headings can't be the page H1
  for (const b of (page.blocks || [])) {
    if (b.type !== 'text' && b.type !== 'code') continue;
    if (overrides[b.id] != null) {
      if (overrides[b.id] !== b.html) changes.push({ pageId: page.id, pageTitle: page.title, blockId: b.id, before: b.html, after: overrides[b.id], notes: ['manual-override'] });
      seenBody = true;
      continue;
    }
    const wrap = D.createElement('div'); wrap.innerHTML = b.html || '';
    const notes: string[] = [];
    for (const el of Array.from(wrap.children) as any[]) {
      const tag = el.tagName.toLowerCase();
      if (el.tagName === 'PRE') {
        preBlocks.push({ pageId: page.id, pageTitle: page.title, blockId: b.id, text: ftext(el).slice(0, 200) });
        seenBody = true;
        continue;
      }
      const isHeadingTag = /^h[1-6]$/.test(tag);
      const isBoldHeading = isBoldOnlyP(el) && headingLike(ftext(el));
      if (isHeadingTag || isBoldHeading) {
        // H1 only for the page's top heading (before any body content); else H2.
        const target = (!pageHasH1 && !seenBody) ? 'h1' : 'h2';
        pageHasH1 = pageHasH1 || target === 'h1';
        if (isBoldHeading) { rename(el, target, true); notes.push(`bold-p->${target} "${ftext(el).slice(0, 40)}"`); }
        else if (tag !== target) { rename(el, target); notes.push(`${tag}->${target}`); }
      } else if (ftext(el)) {
        seenBody = true; // non-empty, non-heading element = body content
      }
    }
    // Re-normalize through PM so output stays canonical/uniform
    const after = serializeToHTML(parseHTML(wrap.innerHTML));
    if (after !== b.html) changes.push({ pageId: page.id, pageTitle: page.title, blockId: b.id, before: b.html, after, notes });
  }
  for (const c of (page.children || [])) transformPage(c);
}
for (const nb of state.notebooks) for (const s of nb.sections) for (const p of s.pages) transformPage(p);

// ── Report ──────────────────────────────────────────────────
console.log(`\n===== HEADING CHANGES (${changes.length} blocks) =====`);
let lastPage = '';
for (const c of changes) {
  if (c.pageTitle !== lastPage) { console.log(`\n## ${c.pageTitle}`); lastPage = c.pageTitle; }
  console.log(`  ${c.blockId.slice(0, 8)}  ${c.notes.join(' | ')}`);
}
console.log(`\n===== <PRE> BLOCKS TO JUDGE (${preBlocks.length}) =====`);
for (const p of preBlocks) console.log(`  [${p.pageTitle}] ${p.blockId.slice(0, 8)}: ${JSON.stringify(p.text.slice(0, 90))}`);

fs.writeFileSync('/tmp/uniformize-changes.json', JSON.stringify(changes, null, 2));
fs.writeFileSync('/tmp/uniformize-pre.json', JSON.stringify(preBlocks, null, 2));
console.log(`\nwrote /tmp/uniformize-changes.json (${changes.length}) and /tmp/uniformize-pre.json (${preBlocks.length})`);

if (!APPLY) { console.log('\n(DRY RUN — nothing written.)'); process.exit(0); }

const { NotebookManager } = require('../src/notebook');
const cfg = JSON.parse(fs.readFileSync(path.join(os.homedir(), '.config', 'notebound', 'config.json'), 'utf8'));
const m = new NotebookManager();
m.open(abs, cfg.deviceId || 'uniformize', path.join(os.homedir(), '.config', 'notebound'));
for (const c of changes) m.applyOp({ type: 'block-update-html', pageId: c.pageId, blockId: c.blockId, html: c.after });
m.flush(); m.close();
console.log(`\n✅ APPLIED ${changes.length} block updates.`);
