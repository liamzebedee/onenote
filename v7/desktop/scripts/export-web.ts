#!/usr/bin/env node
// Export a .notebound directory to a static web site.
// Usage: node scripts/export-web.ts <notebook.notebound> <output-dir>
//
// Output:
//   output-dir/
//     index.html
//     bundle.js
//     style.css
//     notebook.json
//     blobs/
//       <hash>
//       <hash>.meta.json

import * as fs from 'fs';
import * as path from 'path';
import type { AppState, Page, Block, NotebookMeta } from '../../core/src/types.ts';

// The snapshot module uses CommonJS — import with require
const { rebuildState } = require('../src/snapshot');

interface RebuildResult {
  state: AppState;
}

export function exportNotebook(notebookDir: string, outputDir: string): string {
  const absNotebook: string = path.resolve(notebookDir);
  const absOutput: string = path.resolve(outputDir);
  const browserDist: string = path.join(__dirname, '..', '..', 'browser', 'dist');

  if (!fs.existsSync(absNotebook)) {
    throw new Error('Notebook directory not found: ' + absNotebook);
  }

  // 1. Rebuild state from WAL
  const walDir: string = path.join(absNotebook, 'wal');
  const metaPath: string = path.join(absNotebook, 'meta.json');
  const meta: NotebookMeta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));

  const tmpSnapDir: string = path.join(absOutput, '.snap-tmp');
  fs.mkdirSync(tmpSnapDir, { recursive: true });

  const result: RebuildResult = rebuildState(tmpSnapDir, walDir, meta.notebookId, meta.name);
  const state: AppState = result.state;

  // Clean up internal fields before export
  delete state._index;
  function cleanBlocks(pages: Page[]): void {
    for (const p of pages) {
      for (const b of (p.blocks || [])) {
        delete b._crdt;
        delete b.crdt;
      }
      if (p.children?.length) cleanBlocks(p.children);
    }
  }
  for (const nb of state.notebooks) {
    for (const sec of nb.sections) cleanBlocks(sec.pages);
  }

  // Migration: shift all blocks so the top-left block starts at (0, 0)
  function migrateBlocks(pages: Page[]): void {
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
        }
      }
      if (p.children?.length) migrateBlocks(p.children);
    }
  }
  for (const nb of state.notebooks) {
    for (const sec of nb.sections) migrateBlocks(sec.pages);
  }

  // Filter out hidden pages
  function filterHidden(pages: Page[]): Page[] {
    return pages.filter((p: Page) => !p.hidden).map((p: Page) => ({
      ...p,
      children: p.children?.length ? filterHidden(p.children) : p.children,
    }));
  }
  for (const nb of state.notebooks) {
    for (const sec of nb.sections) {
      sec.pages = filterHidden(sec.pages);
    }
  }

  // Set default UI navigation
  const nb = state.notebooks[0];
  if (nb) {
    state.ui = {
      notebookId: nb.id,
      sectionId: nb.sections[0]?.id ?? null,
      pageId: nb.sections[0]?.pages[0]?.id ?? null,
    };
  }

  // 2. Write notebook.json
  fs.mkdirSync(absOutput, { recursive: true });
  fs.writeFileSync(path.join(absOutput, 'notebook.json'), JSON.stringify(state));

  // 3. Copy blobs
  const blobsSrc: string = path.join(absNotebook, 'blobs');
  const blobsDst: string = path.join(absOutput, 'blobs');
  if (fs.existsSync(blobsSrc)) {
    fs.mkdirSync(blobsDst, { recursive: true });
    for (const file of fs.readdirSync(blobsSrc)) {
      fs.copyFileSync(path.join(blobsSrc, file), path.join(blobsDst, file));
    }
  }

  // 4. Copy browser dist (index.html, bundle.js, style.css)
  if (fs.existsSync(browserDist)) {
    for (const file of fs.readdirSync(browserDist)) {
      if (file === 'index.html') {
        let html: string = fs.readFileSync(path.join(browserDist, file), 'utf8');
        // Cache-bust resource URLs
        const v: number = Date.now();
        html = html.replace('href="style.css"', `href="style.css?v=${v}"`);
        html = html.replace('src="bundle.js"', `src="bundle.js?v=${v}"`);
        // Inject GitHub Pages URL if publish config has a remote
        const publish = meta.publish;
        if (publish?.remote) {
          const match: RegExpMatchArray | null = publish.remote.match(/github\.com[:/]([^/]+)\/([^/.]+)/);
          if (match) {
            const ghUrl: string = `https://${match[1]}.github.io/${match[2]}/`;
            html = html.replace('</head>', `  <script>window.__ghPagesUrl=${JSON.stringify(ghUrl)}</script>\n</head>`);
          }
        }
        fs.writeFileSync(path.join(absOutput, file), html);
      } else {
        fs.copyFileSync(path.join(browserDist, file), path.join(absOutput, file));
      }
    }
  } else {
    throw new Error('browser/dist/ not found. Run "cd browser && bun run build" first.');
  }

  // 5. Clean up temp snapshot dir
  fs.rmSync(tmpSnapDir, { recursive: true, force: true });

  return absOutput;
}

// CLI mode
if (require.main === module) {
  const notebookDir: string | undefined = process.argv[2];
  const outputDir: string | undefined = process.argv[3];

  if (!notebookDir || !outputDir) {
    console.error('Usage: node scripts/export-web.ts <notebook.notebound> <output-dir>');
    process.exit(1);
  }

  const out: string = exportNotebook(notebookDir, outputDir);
  console.log('Export complete:', out);
}
