// Notebook data model + semantic operations
// State uses the same nested format as the UI:
// { notebooks: [{ id, title, sections: [{ id, title, pages: [{ id, title, children, blocks, ... }] }] }], ui: { notebookId, sectionId, pageId } }
// Each op is idempotent — applying twice has no additional effect

const uid = () => require('crypto').randomUUID();

// ─── Tree helpers ────────────────────────────────────────

function findInTree(pages, id) {
  for (const p of pages) {
    if (p.id === id) return p;
    if (p.children?.length) { const f = findInTree(p.children, id); if (f) return f; }
  }
  return null;
}

function removeFromTree(pages, id) {
  return pages.filter(p => p.id !== id).map(p => ({ ...p, children: removeFromTree(p.children ?? [], id) }));
}

function findPageInState(state, pageId) {
  // Fast path: use index if available
  const idx = state._index;
  if (idx) {
    const entry = idx.pages.get(pageId);
    if (entry) return entry;
    return null;
  }
  for (const nb of state.notebooks) {
    for (const sec of nb.sections) {
      const p = findInTree(sec.pages, pageId);
      if (p) return { page: p, section: sec, notebook: nb };
    }
  }
  return null;
}

// ─── Index helpers ───────────────────────────────────────

function buildIndex(state) {
  const idx = { pages: new Map(), sections: new Map(), blocks: new Map() };
  for (const nb of state.notebooks) {
    for (const sec of nb.sections) {
      idx.sections.set(sec.id, { section: sec, notebook: nb });
      _indexPages(idx, sec.pages, sec, nb);
    }
  }
  state._index = idx;
  return idx;
}

function _indexPages(idx, pages, sec, nb) {
  for (const p of pages) {
    idx.pages.set(p.id, { page: p, section: sec, notebook: nb });
    for (const b of (p.blocks || [])) {
      idx.blocks.set(b.id, { block: b, page: p });
    }
    if (p.children?.length) _indexPages(idx, p.children, sec, nb);
  }
}

function _findBlockFast(state, pageId, blockId) {
  const idx = state._index;
  if (idx) {
    const entry = idx.blocks.get(blockId);
    if (entry) return entry;
    return null;
  }
  const result = findPageInState(state, pageId);
  if (!result) return null;
  const blk = result.page.blocks.find(b => b.id === blockId);
  if (!blk) return null;
  return { block: blk, page: result.page };
}

// ─── Default constructors ────────────────────────────────

function mkBlock(x = 0, y = 0, w = 480) {
  return { id: uid(), x, y, w, html: '', type: 'text' };
}

function mkPage(title = 'Untitled Page') {
  return { id: uid(), title, children: [], blocks: [], panX: 0, panY: 0, zoom: 1 };
}

function mkSection(title = 'New Section') {
  return { id: uid(), title, pages: [mkPage()] };
}

function mkNotebook(title = 'My Notebook') {
  const sec = mkSection();
  return { id: uid(), title, sections: [sec] };
}

// ─── Default state ───────────────────────────────────────

function defaultState() {
  const nb = mkNotebook();
  return {
    notebooks: [nb],
    ui: { notebookId: nb.id, sectionId: nb.sections[0].id, pageId: nb.sections[0].pages[0].id },
  };
}

function emptyState() {
  return { notebooks: [], ui: { notebookId: null, sectionId: null, pageId: null } };
}

// ─── Apply operation (idempotent) ────────────────────────

function applyOp(state, op) {
  const idx = state._index;

  switch (op.type) {

    // ── Notebook ops ──────────────────────────────────────

    case 'notebook-add': {
      if (state.notebooks.find(n => n.id === op.notebookId)) return state;
      const nb = { id: op.notebookId, title: op.title || 'New Notebook', sections: op.sections || [] };
      state.notebooks.push(nb);
      if (idx) {
        for (const sec of nb.sections) {
          idx.sections.set(sec.id, { section: sec, notebook: nb });
          _indexPages(idx, sec.pages, sec, nb);
        }
      }
      return state;
    }

    case 'notebook-delete': {
      if (idx) {
        const nb = state.notebooks.find(n => n.id === op.notebookId);
        if (nb) {
          for (const sec of nb.sections) {
            idx.sections.delete(sec.id);
            _removePageIndex(idx, sec.pages);
          }
        }
      }
      state.notebooks = state.notebooks.filter(n => n.id !== op.notebookId);
      return state;
    }

    case 'notebook-rename': {
      const nb = state.notebooks.find(n => n.id === op.notebookId);
      if (nb) nb.title = op.title;
      return state;
    }

    case 'notebook-reorder': {
      if (op.notebookIds) {
        state.notebooks.sort((a, b) => op.notebookIds.indexOf(a.id) - op.notebookIds.indexOf(b.id));
      }
      return state;
    }

    // ── Section ops ───────────────────────────────────────

    case 'section-add': {
      const nb = state.notebooks.find(n => n.id === op.notebookId);
      if (!nb) return state;
      if (nb.sections.find(s => s.id === op.sectionId)) return state;
      const sec = { id: op.sectionId, title: op.title || 'New Section', pages: op.pages || [] };
      nb.sections.push(sec);
      if (idx) {
        idx.sections.set(sec.id, { section: sec, notebook: nb });
        _indexPages(idx, sec.pages, sec, nb);
      }
      return state;
    }

    case 'section-delete': {
      const nb = state.notebooks.find(n => n.id === op.notebookId);
      if (!nb) return state;
      if (idx) {
        const sec = nb.sections.find(s => s.id === op.sectionId);
        if (sec) {
          idx.sections.delete(sec.id);
          _removePageIndex(idx, sec.pages);
        }
      }
      nb.sections = nb.sections.filter(s => s.id !== op.sectionId);
      return state;
    }

    case 'section-rename': {
      if (idx) {
        const entry = idx.sections.get(op.sectionId);
        if (entry) { entry.section.title = op.title; return state; }
      }
      for (const nb of state.notebooks) {
        const sec = nb.sections.find(s => s.id === op.sectionId);
        if (sec) { sec.title = op.title; break; }
      }
      return state;
    }

    case 'section-reorder': {
      const nb = state.notebooks.find(n => n.id === op.notebookId);
      if (nb && op.sectionIds) {
        nb.sections.sort((a, b) => op.sectionIds.indexOf(a.id) - op.sectionIds.indexOf(b.id));
      }
      return state;
    }

    // ── Page ops ──────────────────────────────────────────

    case 'page-add': {
      let targetSec = null;
      let targetNb = null;
      if (idx) {
        const entry = idx.sections.get(op.sectionId);
        if (entry) { targetSec = entry.section; targetNb = entry.notebook; }
      } else {
        for (const nb of state.notebooks) {
          targetSec = nb.sections.find(s => s.id === op.sectionId);
          if (targetSec) { targetNb = nb; break; }
        }
      }
      if (!targetSec) return state;
      if (idx) {
        if (idx.pages.has(op.pageId)) return state; // idempotent
      } else {
        if (findInTree(targetSec.pages, op.pageId)) return state;
      }
      const page = {
        id: op.pageId,
        title: op.title || 'Untitled Page',
        children: [],
        blocks: op.blocks || [],
        panX: 0, panY: 0, zoom: 1,
      };
      if (op.parentPageId) {
        const parent = findInTree(targetSec.pages, op.parentPageId);
        if (parent) { parent.children = parent.children ?? []; parent.children.push(page); }
        else targetSec.pages.push(page);
      } else {
        targetSec.pages.push(page);
      }
      if (idx) {
        idx.pages.set(page.id, { page, section: targetSec, notebook: targetNb });
        for (const b of page.blocks) {
          idx.blocks.set(b.id, { block: b, page });
        }
      }
      return state;
    }

    case 'page-delete': {
      if (idx) {
        const entry = idx.pages.get(op.pageId);
        if (entry) {
          entry.section.pages = removeFromTree(entry.section.pages, op.pageId);
          _removePageIndex(idx, [entry.page]);
        }
        return state;
      }
      for (const nb of state.notebooks) {
        for (const sec of nb.sections) {
          const found = findInTree(sec.pages, op.pageId);
          if (found) {
            sec.pages = removeFromTree(sec.pages, op.pageId);
            return state;
          }
        }
      }
      return state;
    }

    case 'page-rename': {
      const result = findPageInState(state, op.pageId);
      if (result) result.page.title = op.title;
      return state;
    }

    case 'page-move': {
      let extracted = null;
      if (idx) {
        const entry = idx.pages.get(op.pageId);
        if (entry) {
          // Remove page from current section and index, then re-add to target
          // We move the original object (no clone needed since removeFromTree detaches it)
          extracted = entry.page;
          entry.section.pages = removeFromTree(entry.section.pages, op.pageId);
          _removePageIndex(idx, [entry.page]);
        }
      } else {
        for (const nb of state.notebooks) {
          for (const sec of nb.sections) {
            const found = findInTree(sec.pages, op.pageId);
            if (found) {
              extracted = structuredClone(found);
              sec.pages = removeFromTree(sec.pages, op.pageId);
              break;
            }
          }
          if (extracted) break;
        }
      }
      if (!extracted) return state;
      let targetSec = null, targetNb = null;
      if (idx) {
        const entry = idx.sections.get(op.targetSectionId);
        if (entry) { targetSec = entry.section; targetNb = entry.notebook; }
      } else {
        for (const nb of state.notebooks) {
          targetSec = nb.sections.find(s => s.id === op.targetSectionId);
          if (targetSec) { targetNb = nb; break; }
        }
      }
      if (targetSec) {
        targetSec.pages.push(extracted);
        if (idx) _indexPages(idx, [extracted], targetSec, targetNb);
      }
      return state;
    }

    case 'page-view': {
      const result = findPageInState(state, op.pageId);
      if (result) {
        const pg = result.page;
        if (op.panX != null) pg.panX = op.panX;
        if (op.panY != null) pg.panY = op.panY;
        if (op.zoom != null) pg.zoom = op.zoom;
      }
      return state;
    }

    case 'page-reorder': {
      let sec = null;
      if (idx) {
        const entry = idx.sections.get(op.sectionId);
        if (entry) sec = entry.section;
      } else {
        for (const nb of state.notebooks) {
          sec = nb.sections.find(s => s.id === op.sectionId);
          if (sec) break;
        }
      }
      if (sec && op.pageIds) {
        const ordered = [];
        for (const id of op.pageIds) {
          const p = sec.pages.find(pg => pg.id === id);
          if (p) ordered.push(p);
        }
        for (const p of sec.pages) {
          if (!op.pageIds.includes(p.id)) ordered.push(p);
        }
        sec.pages = ordered;
      }
      return state;
    }

    case 'page-tree-update': {
      let targetSec = null, targetNb = null;
      if (idx) {
        const entry = idx.sections.get(op.sectionId);
        if (entry) { targetSec = entry.section; targetNb = entry.notebook; }
      } else {
        for (const nb of state.notebooks) {
          targetSec = nb.sections.find(s => s.id === op.sectionId);
          if (targetSec) { targetNb = nb; break; }
        }
      }
      if (!targetSec) return state;
      const byId = new Map();
      function collect(pages) {
        for (const p of pages) { byId.set(p.id, p); collect(p.children ?? []); }
      }
      collect(targetSec.pages);
      function rebuild(pages) {
        return pages.map(p => {
          const ex = byId.get(p.id);
          if (!ex) return null;
          return { ...ex, children: rebuild(p.children ?? []) };
        }).filter(Boolean);
      }
      // Remove old page index entries before rebuilding
      if (idx) _removePageIndex(idx, targetSec.pages);
      targetSec.pages = rebuild(op.pages);
      // Re-index new structure
      if (idx) _indexPages(idx, targetSec.pages, targetSec, targetNb);
      return state;
    }

    // ── Block ops ─────────────────────────────────────────

    case 'block-add': {
      const result = findPageInState(state, op.pageId);
      if (!result) return state;
      if (idx) {
        if (idx.blocks.has(op.block.id)) return state;
      } else {
        if (result.page.blocks.find(b => b.id === op.block.id)) return state;
      }
      result.page.blocks.push(op.block);
      if (idx) idx.blocks.set(op.block.id, { block: op.block, page: result.page });
      return state;
    }

    case 'block-delete': {
      if (idx) {
        const entry = idx.blocks.get(op.blockId);
        if (entry) {
          entry.page.blocks = entry.page.blocks.filter(b => b.id !== op.blockId);
          idx.blocks.delete(op.blockId);
        }
        return state;
      }
      const result = findPageInState(state, op.pageId);
      if (!result) return state;
      result.page.blocks = result.page.blocks.filter(b => b.id !== op.blockId);
      return state;
    }

    case 'block-move': {
      const entry = _findBlockFast(state, op.pageId, op.blockId);
      if (entry) { entry.block.x = op.x; entry.block.y = op.y; }
      return state;
    }

    case 'block-resize': {
      const entry = _findBlockFast(state, op.pageId, op.blockId);
      if (entry) entry.block.w = op.w;
      return state;
    }

    case 'block-update-html': {
      const entry = _findBlockFast(state, op.pageId, op.blockId);
      if (entry) entry.block.html = op.html;
      return state;
    }

    case 'block-update-type': {
      const entry = _findBlockFast(state, op.pageId, op.blockId);
      if (entry) entry.block.type = op.blockType;
      return state;
    }

    case 'block-update-src': {
      const entry = _findBlockFast(state, op.pageId, op.blockId);
      if (entry) entry.block.src = op.src;
      return state;
    }

    case 'block-update-crop': {
      const entry = _findBlockFast(state, op.pageId, op.blockId);
      if (entry) entry.block.crop = op.crop;
      return state;
    }

    case 'block-update-caption': {
      const entry = _findBlockFast(state, op.pageId, op.blockId);
      if (entry) {
        if (op.caption) entry.block.caption = op.caption;
        else delete entry.block.caption;
      }
      return state;
    }

    case 'block-checklist-update': {
      const entry = _findBlockFast(state, op.pageId, op.blockId);
      if (entry) entry.block.items = op.items;
      return state;
    }

    case 'block-update-border': {
      const entry = _findBlockFast(state, op.pageId, op.blockId);
      if (entry) {
        if (op.border) entry.block.border = op.border;
        else delete entry.block.border;
      }
      return state;
    }

    case 'block-style': {
      const entry = _findBlockFast(state, op.pageId, op.blockId);
      if (entry) Object.assign(entry.block.styles || (entry.block.styles = {}), op.styles);
      return state;
    }

    case 'block-z': {
      const entry = _findBlockFast(state, op.pageId, op.blockId);
      if (entry) entry.block.z = op.z;
      return state;
    }

    // ── UI state (local only, not synced) ─────────────────

    case 'ui-navigate': {
      if (op.notebookId !== undefined) state.ui.notebookId = op.notebookId;
      if (op.sectionId !== undefined) state.ui.sectionId = op.sectionId;
      if (op.pageId !== undefined) state.ui.pageId = op.pageId;
      return state;
    }

    case 'block-text-op': {
      const { TextCRDT } = require('./crdt');
      const { applyTextChangeToHtml } = require('./htmlutils');
      const entry = _findBlockFast(state, op.pageId, op.blockId);
      if (!entry) return state;
      const blk = entry.block;
      let crdt;
      // Fast path: reuse live CRDT cached on block during rebuild
      if (blk._crdt) {
        crdt = blk._crdt;
      } else if (blk.crdt) {
        crdt = TextCRDT.fromSnapshot(blk.crdt);
      } else {
        crdt = new TextCRDT('__replay__');
        if (blk.html) {
          const text = blk.html.replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]*>/g, '');
          if (text) crdt.insertTextAt(0, text);
        }
      }
      const oldText = crdt.getText();
      for (const crdtOp of (op.crdtOps || [])) crdt.apply(crdtOp);
      const newText = crdt.getText();
      blk.html = applyTextChangeToHtml(blk.html || '', oldText, newText);
      // Cache live CRDT on block for subsequent ops
      blk._crdt = crdt;
      blk.crdt = null; // mark snapshot as stale
      return state;
    }

    default:
      console.warn('Unknown op type:', op.type);
      return state;
  }
}

function _removePageIndex(idx, pages) {
  for (const p of pages) {
    idx.pages.delete(p.id);
    for (const b of (p.blocks || [])) idx.blocks.delete(b.id);
    if (p.children?.length) _removePageIndex(idx, p.children);
  }
}

// Finalize state after rebuild: serialize cached CRDTs, remove index
function finalizeState(state) {
  for (const nb of state.notebooks) {
    for (const sec of nb.sections) {
      _finalizePages(sec.pages);
    }
  }
  delete state._index;
  return state;
}

function _finalizePages(pages) {
  for (const p of pages) {
    // Serialize cached CRDTs
    for (const b of (p.blocks || [])) {
      if (b._crdt) {
        b.crdt = b._crdt.snapshot();
        delete b._crdt;
      }
    }
    // Strip empty non-image blocks
    p.blocks = (p.blocks || []).filter(b =>
      b.type === 'image' || (b.html && b.html !== '<br>' && b.html.trim() !== '')
    );
    if (p.children?.length) _finalizePages(p.children);
  }
}

function makeOp(deviceId, type, payload) {
  return { id: uid(), deviceId, timestamp: Date.now(), type, ...payload };
}

module.exports = {
  emptyState,
  defaultState,
  mkBlock,
  mkPage,
  mkSection,
  mkNotebook,
  applyOp,
  makeOp,
  findInTree,
  removeFromTree,
  findPageInState,
  buildIndex,
  finalizeState,
  uid,
};
