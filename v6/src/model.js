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
  for (const nb of state.notebooks) {
    for (const sec of nb.sections) {
      const p = findInTree(sec.pages, pageId);
      if (p) return { page: p, section: sec, notebook: nb };
    }
  }
  return null;
}

// ─── Default constructors ────────────────────────────────

function mkBlock(x = 0, y = 0, w = 480) {
  return { id: uid(), x, y, w, html: '', type: 'text' };
}

function mkPage(title = 'Untitled Page') {
  const db = mkBlock(0, 0, 480);
  return { id: uid(), title, children: [], defaultBlockId: db.id, blocks: [db], panX: 0, panY: 0, zoom: 1 };
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
  switch (op.type) {

    // ── Notebook ops ──────────────────────────────────────

    case 'notebook-add': {
      if (state.notebooks.find(n => n.id === op.notebookId)) return state;
      const nb = { id: op.notebookId, title: op.title || 'New Notebook', sections: op.sections || [] };
      state.notebooks.push(nb);
      return state;
    }

    case 'notebook-delete': {
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
      return state;
    }

    case 'section-delete': {
      const nb = state.notebooks.find(n => n.id === op.notebookId);
      if (!nb) return state;
      nb.sections = nb.sections.filter(s => s.id !== op.sectionId);
      return state;
    }

    case 'section-rename': {
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
      // Find the target section
      let targetSec = null;
      for (const nb of state.notebooks) {
        targetSec = nb.sections.find(s => s.id === op.sectionId);
        if (targetSec) break;
      }
      if (!targetSec) return state;
      if (findInTree(targetSec.pages, op.pageId)) return state; // idempotent
      const page = {
        id: op.pageId,
        title: op.title || 'Untitled Page',
        children: [],
        defaultBlockId: op.defaultBlockId || null,
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
      return state;
    }

    case 'page-delete': {
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
      // Move page to a different section
      let extracted = null;
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
      if (!extracted) return state;
      for (const nb of state.notebooks) {
        const targetSec = nb.sections.find(s => s.id === op.targetSectionId);
        if (targetSec) { targetSec.pages.push(extracted); break; }
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
      // Reorder top-level pages in a section
      for (const nb of state.notebooks) {
        const sec = nb.sections.find(s => s.id === op.sectionId);
        if (sec && op.pageIds) {
          // Only reorder pages that are in the list, keep others at end
          const ordered = [];
          for (const id of op.pageIds) {
            const p = sec.pages.find(pg => pg.id === id);
            if (p) ordered.push(p);
          }
          for (const p of sec.pages) {
            if (!op.pageIds.includes(p.id)) ordered.push(p);
          }
          sec.pages = ordered;
          break;
        }
      }
      return state;
    }

    case 'page-tree-update': {
      // Direct tree mutation for drag-and-drop reordering
      // op.sectionId, op.pages = new pages array (full tree)
      for (const nb of state.notebooks) {
        const sec = nb.sections.find(s => s.id === op.sectionId);
        if (sec) { sec.pages = op.pages; break; }
      }
      return state;
    }

    // ── Block ops ─────────────────────────────────────────

    case 'block-add': {
      const result = findPageInState(state, op.pageId);
      if (!result) return state;
      if (result.page.blocks.find(b => b.id === op.block.id)) return state;
      result.page.blocks.push(op.block);
      return state;
    }

    case 'block-delete': {
      const result = findPageInState(state, op.pageId);
      if (!result) return state;
      result.page.blocks = result.page.blocks.filter(b => b.id !== op.blockId);
      return state;
    }

    case 'block-move': {
      const result = findPageInState(state, op.pageId);
      if (!result) return state;
      const blk = result.page.blocks.find(b => b.id === op.blockId);
      if (blk) { blk.x = op.x; blk.y = op.y; }
      return state;
    }

    case 'block-resize': {
      const result = findPageInState(state, op.pageId);
      if (!result) return state;
      const blk = result.page.blocks.find(b => b.id === op.blockId);
      if (blk) blk.w = op.w;
      return state;
    }

    case 'block-update-html': {
      const result = findPageInState(state, op.pageId);
      if (!result) return state;
      const blk = result.page.blocks.find(b => b.id === op.blockId);
      if (blk) blk.html = op.html;
      return state;
    }

    case 'block-update-type': {
      const result = findPageInState(state, op.pageId);
      if (!result) return state;
      const blk = result.page.blocks.find(b => b.id === op.blockId);
      if (blk) blk.type = op.blockType;
      return state;
    }

    case 'block-update-src': {
      const result = findPageInState(state, op.pageId);
      if (!result) return state;
      const blk = result.page.blocks.find(b => b.id === op.blockId);
      if (blk) blk.src = op.src;
      return state;
    }

    case 'block-style': {
      const result = findPageInState(state, op.pageId);
      if (!result) return state;
      const blk = result.page.blocks.find(b => b.id === op.blockId);
      if (blk) Object.assign(blk.styles || (blk.styles = {}), op.styles);
      return state;
    }

    // ── UI state (local only, not synced) ─────────────────

    case 'ui-navigate': {
      if (op.notebookId !== undefined) state.ui.notebookId = op.notebookId;
      if (op.sectionId !== undefined) state.ui.sectionId = op.sectionId;
      if (op.pageId !== undefined) state.ui.pageId = op.pageId;
      return state;
    }

    default:
      console.warn('Unknown op type:', op.type);
      return state;
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
  uid,
};
