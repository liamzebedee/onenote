// Per-page undo/redo stacks (in-memory)
const stacks = new Map();

function get(pageId) {
  if (!stacks.has(pageId)) stacks.set(pageId, { past: [], future: [] });
  return stacks.get(pageId);
}

export function pushUndo(page) {
  const s = get(page.id);
  s.past.push(JSON.stringify(page.blocks));
  s.future = [];
  if (s.past.length > 100) s.past.shift();
}

export function applyUndo(page) {
  const s = get(page.id);
  if (!s.past.length) return null;
  s.future.push(JSON.stringify(page.blocks));
  return JSON.parse(s.past.pop());
}

export function applyRedo(page) {
  const s = get(page.id);
  if (!s.future.length) return null;
  s.past.push(JSON.stringify(page.blocks));
  return JSON.parse(s.future.pop());
}
