#!/usr/bin/env bun
// Build the browser bundle — outputs a self-contained static site to dist/
import { copyFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';

const outDir = join(dirname(import.meta.path), 'dist');
mkdirSync(outDir, { recursive: true });

// Bundle entry.js (includes shim + core app)
const result = await Bun.build({
  entrypoints: [join(dirname(import.meta.path), 'src', 'entry.js')],
  outdir: outDir,
  minify: true,
  naming: 'bundle.js',
});

if (!result.success) {
  console.error('Build failed:');
  for (const log of result.logs) console.error(log);
  process.exit(1);
}

// Copy index.html (browser version)
const indexSrc = join(dirname(import.meta.path), 'index.html');
copyFileSync(indexSrc, join(outDir, 'index.html'));

// Copy style.css from core
const cssSrc = join(dirname(import.meta.path), '..', 'core', 'style.css');
copyFileSync(cssSrc, join(outDir, 'style.css'));

console.log('Browser build complete → dist/');
