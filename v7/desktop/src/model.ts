// Notebook data model + semantic operations
// State uses the same nested format as the UI:
// { notebooks: [{ id, title, sections: [{ id, title, pages: [{ id, title, children, blocks, ... }] }] }], ui: { notebookId, sectionId, pageId } }
// Each op is idempotent -- applying twice has no additional effect

import crypto from 'crypto';
import { TextCRDT } from './crdt';
import { applyTextChangeToHtml } from './htmlutils';
import type {
  AppState, Block, Page, Section, Notebook, StateIndex, Op, OpType,
  PageTreeNode, ChecklistItem, CropData,
} from '../../core/src/types';

const uid = (): string => crypto.randomUUID();

// --- Tree helpers ---

function findInTree(pages: Page[], id: string): Page | null {
  for (const p of pages) {
    if (p.id === id) return p;
    if (p.children?.length) { const f = findInTree(p.children, id); if (f) return f; }
  }
  return null;
}

function removeFromTree(pages: Page[], id: string): Page[] {
  return pages.filter(p => p.id !== id).map(p => ({ ...p, children: removeFromTree(p.children ?? [], id) }));
}

function findPageInState(state: AppState, pageId: string): { page: Page; section: Section; notebook: Notebook } | null {
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

// --- Index helpers ---

function buildIndex(state: AppState): StateIndex {
  const idx: StateIndex = { pages: new Map(), sections: new Map(), blocks: new Map() };
  for (const nb of state.notebooks) {
    for (const sec of nb.sections) {
      idx.sections.set(sec.id, { section: sec, notebook: nb });
      _indexPages(idx, sec.pages, sec, nb);
    }
  }
  state._index = idx;
  return idx;
}

function _indexPages(idx: StateIndex, pages: Page[], sec: Section, nb: Notebook): void {
  for (const p of pages) {
    idx.pages.set(p.id, { page: p, section: sec, notebook: nb });
    for (const b of (p.blocks || [])) {
      idx.blocks.set(b.id, { block: b, page: p });
    }
    if (p.children?.length) _indexPages(idx, p.children, sec, nb);
  }
}

function _findBlockFast(state: AppState, pageId: string, blockId: string): { block: Block; page: Page } | null {
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

// --- Default constructors ---

function mkBlock(x: number = 0, y: number = 0, w: number = 480): Block {
  return { id: uid(), x, y, w, html: '', type: 'text' };
}

function mkPage(title: string = 'Untitled Page'): Page {
  return { id: uid(), title, children: [], blocks: [], panX: 0, panY: 0, zoom: 1 };
}

function mkSection(title: string = 'New Section'): Section {
  return { id: uid(), title, pages: [mkPage()] };
}

function mkNotebook(title: string = 'My Notebook'): Notebook {
  const sec = mkSection();
  return { id: uid(), title, sections: [sec] };
}

// --- Default state ---

function defaultState(): AppState {
  const nb = mkNotebook();
  return {
    notebooks: [nb],
    ui: { notebookId: nb.id, sectionId: nb.sections[0].id, pageId: nb.sections[0].pages[0].id },
  };
}

function emptyState(): AppState {
  return { notebooks: [], ui: { notebookId: null, sectionId: null, pageId: null } };
}

// --- Apply operation (idempotent) ---

function applyOp(state: AppState, op: Op): AppState {
  const idx = state._index;

  switch (op.type) {

    // -- Notebook ops --

    case 'notebook-add': {
      if (state.notebooks.find(n => n.id === (op as Record<string, unknown>).notebookId)) return state;
      const nb: Notebook = {
        id: op.notebookId as string,
        title: (op.title as string) || 'New Notebook',
        sections: (op.sections as Section[]) || [],
      };
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
        const nb = state.notebooks.find(n => n.id === (op.notebookId as string));
        if (nb) {
          for (const sec of nb.sections) {
            idx.sections.delete(sec.id);
            _removePageIndex(idx, sec.pages);
          }
        }
      }
      state.notebooks = state.notebooks.filter(n => n.id !== (op.notebookId as string));
      return state;
    }

    case 'notebook-rename': {
      const nb = state.notebooks.find(n => n.id === (op.notebookId as string));
      if (nb) nb.title = op.title as string;
      return state;
    }

    case 'notebook-reorder': {
      const notebookIds = op.notebookIds as string[] | undefined;
      if (notebookIds) {
        state.notebooks.sort((a, b) => notebookIds.indexOf(a.id) - notebookIds.indexOf(b.id));
      }
      return state;
    }

    // -- Section ops --

    case 'section-add': {
      const nb = state.notebooks.find(n => n.id === (op.notebookId as string));
      if (!nb) return state;
      if (nb.sections.find(s => s.id === (op.sectionId as string))) return state;
      const sec: Section = {
        id: op.sectionId as string,
        title: (op.title as string) || 'New Section',
        pages: (op.pages as Page[]) || [],
      };
      nb.sections.push(sec);
      if (idx) {
        idx.sections.set(sec.id, { section: sec, notebook: nb });
        _indexPages(idx, sec.pages, sec, nb);
      }
      return state;
    }

    case 'section-delete': {
      const nb = state.notebooks.find(n => n.id === (op.notebookId as string));
      if (!nb) return state;
      if (idx) {
        const sec = nb.sections.find(s => s.id === (op.sectionId as string));
        if (sec) {
          idx.sections.delete(sec.id);
          _removePageIndex(idx, sec.pages);
        }
      }
      nb.sections = nb.sections.filter(s => s.id !== (op.sectionId as string));
      return state;
    }

    case 'section-rename': {
      if (idx) {
        const entry = idx.sections.get(op.sectionId as string);
        if (entry) { entry.section.title = op.title as string; return state; }
      }
      for (const nb of state.notebooks) {
        const sec = nb.sections.find(s => s.id === (op.sectionId as string));
        if (sec) { sec.title = op.title as string; break; }
      }
      return state;
    }

    case 'section-reorder': {
      const nb = state.notebooks.find(n => n.id === (op.notebookId as string));
      const sectionIds = op.sectionIds as string[] | undefined;
      if (nb && sectionIds) {
        nb.sections.sort((a, b) => sectionIds.indexOf(a.id) - sectionIds.indexOf(b.id));
      }
      return state;
    }

    // -- Page ops --

    case 'page-add': {
      let targetSec: Section | null = null;
      let targetNb: Notebook | null = null;
      if (idx) {
        const entry = idx.sections.get(op.sectionId as string);
        if (entry) { targetSec = entry.section; targetNb = entry.notebook; }
      } else {
        for (const nb of state.notebooks) {
          const found = nb.sections.find(s => s.id === (op.sectionId as string));
          if (found) { targetSec = found; targetNb = nb; break; }
        }
      }
      if (!targetSec) return state;
      if (idx) {
        if (idx.pages.has(op.pageId as string)) return state; // idempotent
      } else {
        if (findInTree(targetSec.pages, op.pageId as string)) return state;
      }
      const page: Page = {
        id: op.pageId as string,
        title: (op.title as string) || 'Untitled Page',
        children: [],
        blocks: (op.blocks as Block[]) || [],
        panX: 0, panY: 0, zoom: 1,
      };
      if (op.parentPageId) {
        const parent = findInTree(targetSec.pages, op.parentPageId as string);
        if (parent) { parent.children = parent.children ?? []; parent.children.push(page); }
        else targetSec.pages.push(page);
      } else {
        targetSec.pages.push(page);
      }
      if (idx) {
        idx.pages.set(page.id, { page, section: targetSec, notebook: targetNb! });
        for (const b of page.blocks) {
          idx.blocks.set(b.id, { block: b, page });
        }
      }
      return state;
    }

    case 'page-delete': {
      if (idx) {
        const entry = idx.pages.get(op.pageId as string);
        if (entry) {
          entry.section.pages = removeFromTree(entry.section.pages, op.pageId as string);
          _removePageIndex(idx, [entry.page]);
        }
        return state;
      }
      for (const nb of state.notebooks) {
        for (const sec of nb.sections) {
          const found = findInTree(sec.pages, op.pageId as string);
          if (found) {
            sec.pages = removeFromTree(sec.pages, op.pageId as string);
            return state;
          }
        }
      }
      return state;
    }

    case 'page-rename': {
      const result = findPageInState(state, op.pageId as string);
      if (result) result.page.title = op.title as string;
      return state;
    }

    case 'page-move': {
      let extracted: Page | null = null;
      if (idx) {
        const entry = idx.pages.get(op.pageId as string);
        if (entry) {
          extracted = entry.page;
          entry.section.pages = removeFromTree(entry.section.pages, op.pageId as string);
          _removePageIndex(idx, [entry.page]);
        }
      } else {
        for (const nb of state.notebooks) {
          for (const sec of nb.sections) {
            const found = findInTree(sec.pages, op.pageId as string);
            if (found) {
              extracted = structuredClone(found);
              sec.pages = removeFromTree(sec.pages, op.pageId as string);
              break;
            }
          }
          if (extracted) break;
        }
      }
      if (!extracted) return state;
      let targetSec: Section | null = null;
      let targetNb: Notebook | null = null;
      if (idx) {
        const entry = idx.sections.get(op.targetSectionId as string);
        if (entry) { targetSec = entry.section; targetNb = entry.notebook; }
      } else {
        for (const nb of state.notebooks) {
          const found = nb.sections.find(s => s.id === (op.targetSectionId as string));
          if (found) { targetSec = found; targetNb = nb; break; }
        }
      }
      if (targetSec) {
        targetSec.pages.push(extracted);
        if (idx) _indexPages(idx, [extracted], targetSec, targetNb!);
      }
      return state;
    }

    case 'page-set-hidden': {
      const result = findPageInState(state, op.pageId as string);
      if (result) result.page.hidden = !!(op.hidden);
      return state;
    }

    case 'page-view': {
      const result = findPageInState(state, op.pageId as string);
      if (result) {
        const pg = result.page;
        if (op.panX != null) pg.panX = op.panX as number;
        if (op.panY != null) pg.panY = op.panY as number;
        if (op.zoom != null) pg.zoom = op.zoom as number;
      }
      return state;
    }

    case 'page-reorder': {
      let sec: Section | null = null;
      if (idx) {
        const entry = idx.sections.get(op.sectionId as string);
        if (entry) sec = entry.section;
      } else {
        for (const nb of state.notebooks) {
          const found = nb.sections.find(s => s.id === (op.sectionId as string));
          if (found) { sec = found; break; }
        }
      }
      const pageIds = op.pageIds as string[] | undefined;
      if (sec && pageIds) {
        const ordered: Page[] = [];
        for (const id of pageIds) {
          const p = sec.pages.find(pg => pg.id === id);
          if (p) ordered.push(p);
        }
        for (const p of sec.pages) {
          if (!pageIds.includes(p.id)) ordered.push(p);
        }
        sec.pages = ordered;
      }
      return state;
    }

    case 'page-tree-update': {
      let targetSec: Section | null = null;
      let targetNb: Notebook | null = null;
      if (idx) {
        const entry = idx.sections.get(op.sectionId as string);
        if (entry) { targetSec = entry.section; targetNb = entry.notebook; }
      } else {
        for (const nb of state.notebooks) {
          const found = nb.sections.find(s => s.id === (op.sectionId as string));
          if (found) { targetSec = found; targetNb = nb; break; }
        }
      }
      if (!targetSec) return state;
      const byId = new Map<string, Page>();
      function collect(pages: Page[]): void {
        for (const p of pages) { byId.set(p.id, p); collect(p.children ?? []); }
      }
      collect(targetSec.pages);
      function rebuild(treeNodes: PageTreeNode[]): Page[] {
        return treeNodes.map(p => {
          const ex = byId.get(p.id);
          if (!ex) return null;
          return { ...ex, children: rebuild(p.children ?? []) };
        }).filter(Boolean) as Page[];
      }
      // Remove old page index entries before rebuilding
      if (idx) _removePageIndex(idx, targetSec.pages);
      targetSec.pages = rebuild(op.pages as PageTreeNode[]);
      // Re-index new structure
      if (idx) _indexPages(idx, targetSec.pages, targetSec, targetNb!);
      return state;
    }

    // -- Block ops --

    case 'block-add': {
      const result = findPageInState(state, op.pageId as string);
      if (!result) return state;
      const block = op.block as Block;
      if (idx) {
        if (idx.blocks.has(block.id)) return state;
      } else {
        if (result.page.blocks.find(b => b.id === block.id)) return state;
      }
      result.page.blocks.push(block);
      if (idx) idx.blocks.set(block.id, { block, page: result.page });
      return state;
    }

    case 'block-delete': {
      if (idx) {
        const entry = idx.blocks.get(op.blockId as string);
        if (entry) {
          entry.page.blocks = entry.page.blocks.filter(b => b.id !== (op.blockId as string));
          idx.blocks.delete(op.blockId as string);
        }
        return state;
      }
      const result = findPageInState(state, op.pageId as string);
      if (!result) return state;
      result.page.blocks = result.page.blocks.filter(b => b.id !== (op.blockId as string));
      return state;
    }

    case 'block-move': {
      const entry = _findBlockFast(state, op.pageId as string, op.blockId as string);
      if (entry) { entry.block.x = op.x as number; entry.block.y = op.y as number; }
      return state;
    }

    case 'block-resize': {
      const entry = _findBlockFast(state, op.pageId as string, op.blockId as string);
      if (entry) entry.block.w = op.w as number;
      return state;
    }

    case 'block-update-html': {
      const entry = _findBlockFast(state, op.pageId as string, op.blockId as string);
      if (entry) entry.block.html = op.html as string;
      return state;
    }

    case 'block-update-type': {
      const entry = _findBlockFast(state, op.pageId as string, op.blockId as string);
      if (entry) entry.block.type = op.blockType as Block['type'];
      return state;
    }

    case 'block-update-src': {
      const entry = _findBlockFast(state, op.pageId as string, op.blockId as string);
      if (entry) entry.block.src = op.src as string;
      return state;
    }

    case 'block-update-crop': {
      const entry = _findBlockFast(state, op.pageId as string, op.blockId as string);
      if (entry) entry.block.crop = op.crop as CropData;
      return state;
    }

    case 'block-update-caption': {
      const entry = _findBlockFast(state, op.pageId as string, op.blockId as string);
      if (entry) {
        if (op.caption) entry.block.caption = op.caption as string;
        else delete entry.block.caption;
      }
      return state;
    }

    case 'block-checklist-update': {
      const entry = _findBlockFast(state, op.pageId as string, op.blockId as string);
      if (entry) entry.block.items = op.items as ChecklistItem[];
      return state;
    }

    case 'block-update-border': {
      const entry = _findBlockFast(state, op.pageId as string, op.blockId as string);
      if (entry) {
        if (op.border) entry.block.border = op.border as string | boolean;
        else delete entry.block.border;
      }
      return state;
    }

    case 'block-style': {
      const entry = _findBlockFast(state, op.pageId as string, op.blockId as string);
      if (entry) Object.assign(entry.block.styles || (entry.block.styles = {}), op.styles as Record<string, string>);
      return state;
    }

    case 'block-z': {
      const entry = _findBlockFast(state, op.pageId as string, op.blockId as string);
      if (entry) entry.block.z = op.z as number;
      return state;
    }

    // -- UI state (local only, not synced) --

    case 'ui-navigate': {
      if (op.notebookId !== undefined) state.ui.notebookId = op.notebookId as string | null;
      if (op.sectionId !== undefined) state.ui.sectionId = op.sectionId as string | null;
      if (op.pageId !== undefined) state.ui.pageId = op.pageId as string | null;
      return state;
    }

    case 'block-text-op': {
      const entry = _findBlockFast(state, op.pageId as string, op.blockId as string);
      if (!entry) return state;
      const blk = entry.block;
      let crdt: TextCRDT;
      // Fast path: reuse live CRDT cached on block during rebuild
      if (blk._crdt) {
        crdt = blk._crdt as TextCRDT;
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
      const crdtOps = (op.crdtOps || []) as import('../../core/src/types').CRDTOp[];
      for (const crdtOp of crdtOps) crdt.apply(crdtOp);
      const newText = crdt.getText();
      blk.html = applyTextChangeToHtml(blk.html || '', oldText, newText);
      // Cache live CRDT on block for subsequent ops
      blk._crdt = crdt;
      blk.crdt = null as unknown as undefined;
      return state;
    }

    default:
      console.warn('Unknown op type:', op.type);
      return state;
  }
}

function _removePageIndex(idx: StateIndex, pages: Page[]): void {
  for (const p of pages) {
    idx.pages.delete(p.id);
    for (const b of (p.blocks || [])) idx.blocks.delete(b.id);
    if (p.children?.length) _removePageIndex(idx, p.children);
  }
}

// Finalize state after rebuild: serialize cached CRDTs, remove index
function finalizeState(state: AppState): AppState {
  for (const nb of state.notebooks) {
    for (const sec of nb.sections) {
      _finalizePages(sec.pages);
    }
  }
  delete state._index;
  return state;
}

function _finalizePages(pages: Page[]): void {
  for (const p of pages) {
    // Serialize cached CRDTs
    for (const b of (p.blocks || [])) {
      if (b._crdt) {
        b.crdt = (b._crdt as TextCRDT).snapshot();
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

function makeOp(deviceId: string, type: OpType, payload: Record<string, unknown>): Op {
  return { id: uid(), deviceId, timestamp: Date.now(), type, ...payload };
}

export {
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
