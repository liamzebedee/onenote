#!/usr/bin/env node
// Export a .notebound directory to a static web site.
// Usage: node scripts/export-web.js <notebook.notebound> <output-dir>
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

const fs = require('fs');
const path = require('path');
const { rebuildState } = require('../src/snapshot');

function exportNotebook(notebookDir, outputDir) {
  const absNotebook = path.resolve(notebookDir);
  const absOutput = path.resolve(outputDir);
  const browserDist = path.join(__dirname, '..', '..', 'browser', 'dist');

  if (!fs.existsSync(absNotebook)) {
    throw new Error('Notebook directory not found: ' + absNotebook);
  }

  // 1. Rebuild state from WAL
  const walDir = path.join(absNotebook, 'wal');
  const metaPath = path.join(absNotebook, 'meta.json');
  const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));

  const tmpSnapDir = path.join(absOutput, '.snap-tmp');
  fs.mkdirSync(tmpSnapDir, { recursive: true });

  const result = rebuildState(tmpSnapDir, walDir, meta.notebookId, meta.name);
  const state = result.state;

  // Clean up internal fields before export
  delete state._index;
  function cleanBlocks(pages) {
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

  // Migration: normalize default text blocks to x=0
  function migrateBlocks(pages) {
    for (const p of pages) {
      for (const b of (p.blocks || [])) {
        if (b.type === 'text' && b.y === 0 && (b.x === 28 || b.x === 16)) b.x = 0;
      }
      if (p.children?.length) migrateBlocks(p.children);
    }
  }
  for (const nb of state.notebooks) {
    for (const sec of nb.sections) migrateBlocks(sec.pages);
  }

  // Filter out hidden pages
  function filterHidden(pages) {
    return pages.filter(p => !p.hidden).map(p => ({
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
  const blobsSrc = path.join(absNotebook, 'blobs');
  const blobsDst = path.join(absOutput, 'blobs');
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
        let html = fs.readFileSync(path.join(browserDist, file), 'utf8');
        // Cache-bust resource URLs
        const v = Date.now();
        html = html.replace('href="style.css"', `href="style.css?v=${v}"`);
        html = html.replace('src="bundle.js"', `src="bundle.js?v=${v}"`);
        // Inject GitHub Pages URL if publish config has a remote
        const publish = meta.publish;
        if (publish?.remote) {
          const match = publish.remote.match(/github\.com[:/]([^/]+)\/([^/.]+)/);
          if (match) {
            const ghUrl = `https://${match[1]}.github.io/${match[2]}/`;
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

module.exports = { exportNotebook };

// CLI mode
if (require.main === module) {
  const notebookDir = process.argv[2];
  const outputDir = process.argv[3];

  if (!notebookDir || !outputDir) {
    console.error('Usage: node scripts/export-web.js <notebook.notebound> <output-dir>');
    process.exit(1);
  }

  const out = exportNotebook(notebookDir, outputDir);
  console.log('Export complete:', out);
}
