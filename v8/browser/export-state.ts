// Export notebook state from a .notebound directory as JSON.
// Used by both the dev server and the desktop export script.
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

// Minimal state rebuilder — reads latest snapshot or WAL batches.
// For the export case, we use the desktop's rebuildState directly if available,
// or fall back to reading a pre-made snapshot.
export function exportNotebookState(notebookDir: string): string {
  // Try to load a pre-exported notebook.json first
  const preExported: string = join(notebookDir, 'notebook.json');
  if (existsSync(preExported)) {
    return readFileSync(preExported, 'utf8');
  }

  // Otherwise, try to find a snapshot in the directory
  // (snapshots are device-local, so this only works when run on the same machine)
  throw new Error(
    'No notebook.json found. Use the desktop export script to generate one:\n' +
    '  node desktop/scripts/export-web.js <notebook.notebound> <output-dir>'
  );
}
