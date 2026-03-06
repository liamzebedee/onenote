// Virtual filesystem builder for Claude agent
// Creates a temp directory with notebook content as HTML files

import fs from 'fs';
import path from 'path';
import os from 'os';
import crypto from 'crypto';
import type { AppState, Block, Page } from '../../core/src/types';

function sanitizeName(name: string): string {
  return name
    .replace(/[/\\\0]/g, '_')
    .replace(/[<>:"|?*]/g, '_')
    .slice(0, 200)
    .trim() || 'Untitled';
}

function deduplicate(name: string, existing: Set<string>): string {
  if (!existing.has(name)) { existing.add(name); return name; }
  let i = 2;
  while (existing.has(`${name} (${i})`)) i++;
  const deduped = `${name} (${i})`;
  existing.add(deduped);
  return deduped;
}

function blocksToHtml(blocks: Block[], blobsLinkDir: string): string {
  const sorted = [...blocks].sort((a, b) => (a.y - b.y) || (a.x - b.x));
  const parts: string[] = [];
  for (const b of sorted) {
    if (b.type === 'image' && b.src) {
      const src = b.src.startsWith('blob:')
        ? path.join(blobsLinkDir, b.src.slice(5))
        : b.src;
      parts.push(`<img src="${src}" />`);
    } else {
      parts.push(b.html || '');
    }
  }
  return parts.join('\n');
}

function writePages(
  pages: Page[],
  dir: string,
  blobsLinkDir: string,
  existing: Set<string>,
  pageMap: Map<string, string>,
): void {
  for (const page of pages) {
    const safeName = deduplicate(sanitizeName(page.title || 'Untitled Page'), existing);
    const html = blocksToHtml(page.blocks || [], blobsLinkDir);
    fs.writeFileSync(path.join(dir, safeName + '.html'), html, 'utf8');
    pageMap.set(page.id, dir);
    if (page.children && page.children.length > 0) {
      const childDir = path.join(dir, safeName);
      fs.mkdirSync(childDir, { recursive: true });
      const childNames = new Set<string>();
      writePages(page.children, childDir, blobsLinkDir, childNames, pageMap);
    }
  }
}

function getRunDir(): string {
  const xdg = process.env.XDG_RUNTIME_DIR;
  if (xdg) return path.join(xdg, 'notebound');
  // Fallback: ~/.cache/notebound/run
  return path.join(os.homedir(), '.cache', 'notebound', 'run');
}

interface VFSResult {
  sessionId: string;
  basePath: string;
  pageMap: Map<string, string>;
}

function createVFS(state: AppState, notebookDir: string): VFSResult {
  const sessionId = crypto.randomUUID();
  const basePath = path.join(getRunDir(), `project-${sessionId}`);
  fs.mkdirSync(basePath, { recursive: true });

  // Symlink blobs directory
  const blobsSrc = path.join(notebookDir, 'blobs');
  const blobsDst = path.join(basePath, '.blobs');
  if (fs.existsSync(blobsSrc)) {
    try { fs.symlinkSync(blobsSrc, blobsDst, 'dir'); } catch {}
  }

  // pageMap: pageId -> directory containing that page's .html file
  const pageMap = new Map<string, string>();

  const nb = state.notebooks?.[0];
  if (!nb) return { sessionId, basePath, pageMap };

  for (const sec of nb.sections || []) {
    const secName = sanitizeName(sec.title || 'Untitled Section');
    const secDir = path.join(basePath, secName);
    fs.mkdirSync(secDir, { recursive: true });
    const pageNames = new Set<string>();
    writePages(sec.pages || [], secDir, path.join(basePath, '.blobs'), pageNames, pageMap);
  }

  return { sessionId, basePath, pageMap };
}

function cleanupVFS(basePath: string): void {
  if (!basePath) return;
  const runDir = getRunDir();
  if (!basePath.startsWith(runDir)) return;
  try { fs.rmSync(basePath, { recursive: true, force: true }); } catch {}
}

export { createVFS, cleanupVFS };
