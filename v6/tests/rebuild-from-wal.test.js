import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { rebuildState } from '../src/snapshot.js';

const notebookDir = path.join(__dirname, 'fixtures', 'my-notebook.notebound');
const walDir = path.join(notebookDir, 'wal');

// Use a temp dir for snapshots (device-local cache, not inside .notebound)
let snapshotsDir;
beforeAll(() => {
  snapshotsDir = fs.mkdtempSync(path.join(os.tmpdir(), 'notebound-snap-test-'));
});
afterAll(() => {
  fs.rmSync(snapshotsDir, { recursive: true, force: true });
});

const meta = JSON.parse(fs.readFileSync(path.join(notebookDir, 'meta.json'), 'utf8'));
const notebookId = meta.notebookId;

describe('rebuild from WAL only (no snapshots)', () => {
  it('should rebuild the notebook with sections and pages', { timeout: 60000 }, () => {
    const { state } = rebuildState(snapshotsDir, walDir, notebookId, meta.name);

    expect(state.notebooks.length).toBeGreaterThan(0);

    const nb = state.notebooks.find(n => n.id === notebookId);
    expect(nb).toBeDefined();
    expect(nb.sections.length).toBeGreaterThan(0);

    const allPages = nb.sections.flatMap(s => s.pages);
    expect(allPages.length).toBeGreaterThan(0);
  });

  it('should have blocks on pages', { timeout: 60000 }, () => {
    const { state } = rebuildState(snapshotsDir, walDir, notebookId, meta.name);

    const allPages = state.notebooks.flatMap(n => n.sections.flatMap(s => s.pages));
    const pagesWithBlocks = allPages.filter(p => p.blocks && p.blocks.length > 0);
    expect(pagesWithBlocks.length).toBeGreaterThan(0);
  });

  it('should reconstruct the Bio section with Core concepts page', { timeout: 60000 }, () => {
    const { state } = rebuildState(snapshotsDir, walDir, notebookId, meta.name);

    const nb = state.notebooks.find(n => n.id === notebookId);
    const bioSection = nb.sections.find(s => s.title === 'Bio');
    expect(bioSection).toBeDefined();
    expect(bioSection.pages.length).toBe(3);

    const coreConceptsPage = bioSection.pages.find(p => p.title === 'Core concepts');
    expect(coreConceptsPage).toBeDefined();
    expect(coreConceptsPage.blocks.length).toBeGreaterThan(0);
    // Should contain biology content about DNA
    const textBlocks = coreConceptsPage.blocks.filter(b => b.html && b.html.length > 0);
    expect(textBlocks.length).toBeGreaterThan(0);
    expect(textBlocks.some(b => b.html.includes('DNA'))).toBe(true);

    const ideasPage = bioSection.pages.find(p => p.title === 'Ideas');
    expect(ideasPage).toBeDefined();

    const homeworkPage = bioSection.pages.find(p => p.title === 'Homework');
    expect(homeworkPage).toBeDefined();

    // The deleted page fa053582 should NOT be present
    const deletedPage = bioSection.pages.find(p => p.id === 'fa053582-3042-4fff-8130-d6c53563716d');
    expect(deletedPage).toBeUndefined();
  });

  it('should not duplicate text content in blocks', { timeout: 60000 }, () => {
    const { state } = rebuildState(snapshotsDir, walDir, notebookId, meta.name);

    const nb = state.notebooks.find(n => n.id === notebookId);
    const bioSection = nb.sections.find(s => s.title === 'Bio');
    const corePage = bioSection.pages.find(p => p.title === 'Core concepts');
    const textBlocks = corePage.blocks.filter(b => b.html && b.html.length > 0 && b.type === 'text');

    for (const blk of textBlocks) {
      // Extract plaintext
      const text = blk.html.replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]*>/g, '');
      // Check that no substantial substring (20+ chars) is repeated
      const lines = text.split('\n').filter(l => l.trim().length > 0);
      const seen = new Set();
      let duplicates = 0;
      for (const line of lines) {
        const normalized = line.trim();
        if (normalized.length >= 10) {
          if (seen.has(normalized)) duplicates++;
          seen.add(normalized);
        }
      }
      expect(duplicates, `block ${blk.id.substr(0, 8)} has duplicated lines`).toBe(0);
    }
  });
});
