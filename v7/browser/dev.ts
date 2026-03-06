#!/usr/bin/env bun
// Dev server — serves the browser app with live rebuild.
// Usage: bun run dev.ts [notebook-dir]
// If notebook-dir is provided, serves notebook.json and blobs/ from it.
import { join, dirname } from 'path';
import { existsSync, readFileSync } from 'fs';

const ROOT: string = dirname(import.meta.path);
const CORE: string = join(ROOT, '..', 'core');

// Optional: point at a .notebound directory for live preview
const notebookDir: string | null = process.argv[2] || null;

// Build on startup
async function buildBundle(): Promise<boolean> {
  const result = await Bun.build({
    entrypoints: [join(ROOT, 'src', 'entry.ts')],
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

interface BlobMeta {
  mimeType?: string;
}

const server = Bun.serve({
  port: 3000,
  async fetch(req: Request): Promise<Response> {
    const url = new URL(req.url);
    let pathname: string = url.pathname === '/' ? '/index.html' : url.pathname;

    // Serve notebook.json from .notebound directory
    if (pathname === '/notebook.json' && notebookDir) {
      try {
        const { exportNotebookState } = await import('./export-state.ts');
        const json: string = exportNotebookState(notebookDir);
        return new Response(json, { headers: { 'content-type': 'application/json' } });
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        return new Response(JSON.stringify({ error: message }), { status: 500 });
      }
    }

    // Serve blobs from .notebound/blobs/
    if (pathname.startsWith('/blobs/') && notebookDir) {
      const blobPath: string = join(notebookDir, pathname);
      const file = Bun.file(blobPath);
      if (await file.exists()) {
        // Try to read mime from sidecar
        const metaPath: string = blobPath + '.meta.json';
        let mime: string = 'application/octet-stream';
        try {
          const meta: BlobMeta = JSON.parse(readFileSync(metaPath, 'utf8'));
          if (meta.mimeType) mime = meta.mimeType;
        } catch { /* no sidecar */ }
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
