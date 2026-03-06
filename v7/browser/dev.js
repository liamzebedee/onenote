#!/usr/bin/env bun
// Dev server — serves the browser app with live rebuild.
// Usage: bun run dev.js [notebook-dir]
// If notebook-dir is provided, serves notebook.json and blobs/ from it.
import { join, dirname } from 'path';
import { existsSync, readFileSync, readdirSync, statSync } from 'fs';

const ROOT = dirname(import.meta.path);
const CORE = join(ROOT, '..', 'core');

// Optional: point at a .notebound directory for live preview
const notebookDir = process.argv[2] || null;

// Build on startup
async function buildBundle() {
  const result = await Bun.build({
    entrypoints: [join(ROOT, 'src', 'entry.js')],
    outdir: join(ROOT, 'dist'),
    sourcemap: 'inline',
    naming: 'bundle.js',
  });
  if (!result.success) {
    console.error('Build failed:');
    for (const log of result.logs) console.error(log);
  }
  return result.success;
}

await buildBundle();

const server = Bun.serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);
    let pathname = url.pathname === '/' ? '/index.html' : url.pathname;

    // Serve notebook.json from .notebound directory
    if (pathname === '/notebook.json' && notebookDir) {
      try {
        const { exportNotebookState } = await import('./export-state.js');
        const json = exportNotebookState(notebookDir);
        return new Response(json, { headers: { 'content-type': 'application/json' } });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
      }
    }

    // Serve blobs from .notebound/blobs/
    if (pathname.startsWith('/blobs/') && notebookDir) {
      const blobPath = join(notebookDir, pathname);
      const file = Bun.file(blobPath);
      if (await file.exists()) {
        // Try to read mime from sidecar
        const metaPath = blobPath + '.meta.json';
        let mime = 'application/octet-stream';
        try {
          const meta = JSON.parse(readFileSync(metaPath, 'utf8'));
          if (meta.mimeType) mime = meta.mimeType;
        } catch {}
        return new Response(file, { headers: { 'content-type': mime } });
      }
      return new Response('Not found', { status: 404 });
    }

    // Serve built bundle
    if (pathname === '/bundle.js') {
      const file = Bun.file(join(ROOT, 'dist', 'bundle.js'));
      if (await file.exists()) return new Response(file, { headers: { 'content-type': 'application/javascript' } });
    }

    // Serve index.html
    if (pathname === '/index.html') {
      const file = Bun.file(join(ROOT, 'index.html'));
      if (await file.exists()) return new Response(file, { headers: { 'content-type': 'text/html' } });
    }

    // Serve style.css from core
    if (pathname === '/style.css') {
      const file = Bun.file(join(CORE, 'style.css'));
      if (await file.exists()) return new Response(file, { headers: { 'content-type': 'text/css' } });
    }

    // Serve icon.svg from desktop
    if (pathname === '/icon.svg') {
      const file = Bun.file(join(ROOT, '..', 'desktop', 'icon.svg'));
      if (await file.exists()) return new Response(file, { headers: { 'content-type': 'image/svg+xml' } });
    }

    return new Response('Not found', { status: 404 });
  },
});

console.log(`Notebound web dev server: http://localhost:${server.port}`);
if (notebookDir) console.log(`Serving notebook from: ${notebookDir}`);
else console.log('No notebook directory specified. Pass a .notebound path as argument.');
