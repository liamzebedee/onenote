// Delta-based undo/redo — stores only what changed
const stacks = new Map();

function get(pageId) {
  if (!stacks.has(pageId)) stacks.set(pageId, { past: [], future: [] });
  return stacks.get(pageId);
}

// Push a delta onto the undo stack.
// Deltas: { type: 'move', moves: [{ id, x, y }] }
//         { type: 'resize', id, w, (x, y)? }
//         { type: 'html', id, html }
//         { type: 'add', block }        — a block was added (undo = remove it)
//         { type: 'delete', blocks }    — blocks were deleted (undo = re-add them)
export function pushUndo(pageId, delta) {
  const s = get(pageId);
  s.past.push(delta);
  s.future = [];
  if (s.past.length > 200) s.past.shift();
}

export function applyUndo(pageId, page) {
  const s = get(pageId);
  if (!s.past.length) return false;
  const delta = s.past.pop();
  const reverse = apply(page, delta);
  if (reverse) s.future.push(reverse);
  return true;
}

export function applyRedo(pageId, page) {
  const s = get(pageId);
  if (!s.future.length) return false;
  const delta = s.future.pop();
  const reverse = apply(page, delta);
  if (reverse) s.past.push(reverse);
  return true;
}

// Apply a delta to page.blocks, return the reverse delta
function apply(page, delta) {
  const blocks = page.blocks;

  if (delta.type === 'move') {
    const rev = [];
    for (const m of delta.moves) {
      const b = blocks.find(b => b.id === m.id);
      if (b) {
        rev.push({ id: b.id, x: b.x, y: b.y });
        b.x = m.x;
        b.y = m.y;
      }
    }
    return { type: 'move', moves: rev };
  }

  if (delta.type === 'resize') {
    const b = blocks.find(b => b.id === delta.id);
    if (!b) return null;
    const rev = { type: 'resize', id: b.id, w: b.w };
    if (delta.x != null) { rev.x = b.x; rev.y = b.y; b.x = delta.x; b.y = delta.y; }
    b.w = delta.w;
    return rev;
  }

  if (delta.type === 'html') {
    const b = blocks.find(b => b.id === delta.id);
    if (!b) return null;
    const rev = { type: 'html', id: b.id, html: b.html };
    b.html = delta.html;
    return rev;
  }

  if (delta.type === 'add') {
    // A block was added — undo by removing it
    const rev = { type: 'delete', blocks: [blocks.find(b => b.id === delta.id)].filter(Boolean) };
    page.blocks = blocks.filter(b => b.id !== delta.id);
    return rev.blocks.length ? rev : null;
  }

  if (delta.type === 'delete') {
    // Blocks were deleted — undo by re-adding them
    const ids = delta.blocks.map(b => b.id);
    page.blocks = [...blocks, ...delta.blocks];
    return { type: 'deleteForward', ids };
  }

  if (delta.type === 'deleteForward') {
    // Redo of delete
    const removed = blocks.filter(b => delta.ids.includes(b.id));
    page.blocks = blocks.filter(b => !delta.ids.includes(b.id));
    return { type: 'delete', blocks: removed };
  }

  return null;
}
