import { useState, useRef, useEffect, useCallback } from 'preact/hooks';
import { appState, setActivePage, addPage, renamePage, deletePage, movePage, findInTree } from './store.js';
import { openContextMenu } from './ContextMenu.jsx';

// ── Helpers for collecting page IDs from tree ──────
function flattenPageIds(pages) {
  const ids = [];
  for (const p of pages) {
    ids.push(p.id);
    if (p.children?.length) ids.push(...flattenPageIds(p.children));
  }
  return ids;
}

function getPageRange(pages, idA, idB) {
  const flat = flattenPageIds(pages);
  const a = flat.indexOf(idA), b = flat.indexOf(idB);
  if (a === -1 || b === -1) return [idB];
  const lo = Math.min(a, b), hi = Math.max(a, b);
  return flat.slice(lo, hi + 1);
}

// ── Drag state (module-level so siblings can share) ──────
const drag = { pageId: null, over: null, mode: null }; // mode: 'before' | 'child'

function deletePageWithChildren(page) {
  if (!page.children?.length) {
    deletePage(page.id);
    return;
  }
  // If page has children, promote them to siblings then delete parent
  const s = appState.value;
  const nb = s.notebooks.find(n => n.id === s.ui.notebookId);
  const sec = nb?.sections.find(sec => sec.id === s.ui.sectionId);
  if (!sec) return;
  function promoteChildren(pages) {
    for (let i = 0; i < pages.length; i++) {
      if (pages[i].id === page.id) {
        const children = pages[i].children ?? [];
        pages.splice(i, 1, ...children);
        return true;
      }
      if (promoteChildren(pages[i].children ?? [])) return true;
    }
    return false;
  }
  promoteChildren(sec.pages);
  appState.value = { ...appState.value };
}

function PageItem({ page, activeId, depth = 0, dragState, onDragChange, editingId, onStartEditing, selected, onSelect, onBulkDelete }) {
  const [open, setOpen] = useState(true);
  const hasKids = page.children?.length > 0;
  const isOver = dragState.over === page.id;
  const isOverAsChild = isOver && dragState.mode === 'child';
  const isEditing = editingId === page.id;
  const editRef = useRef(null);
  const [editVal, setEditVal] = useState(page.title);
  const isSelected = selected?.has(page.id);

  useEffect(() => {
    if (isEditing) {
      setEditVal(page.title);
      if (editRef.current) {
        editRef.current.focus();
        editRef.current.select();
      }
    }
  }, [isEditing]);

  function commitEdit() {
    const v = editVal.trim() || 'Untitled Page';
    if (v !== page.title) renamePage(page.id, v);
    onStartEditing(null);
  }

  function onDragStart(e) {
    e.stopPropagation();
    drag.pageId = page.id;
    e.dataTransfer.effectAllowed = 'move';
  }

  function onDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    if (drag.pageId === page.id) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const rel = (e.clientY - rect.top) / rect.height;
    const mode = (rel > 0.3 && rel < 0.7) ? 'child' : 'before';
    if (dragState.over !== page.id || dragState.mode !== mode) {
      onDragChange(page.id, mode);
    }
  }

  function onDragLeave(e) {
    if (!e.currentTarget.contains(e.relatedTarget)) onDragChange(null, null);
  }

  function onDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    const fromId = drag.pageId;
    drag.pageId = null;
    onDragChange(null, null);
    if (!fromId || fromId === page.id) return;

    if (dragState.mode === 'child') {
      import('./store.js').then(m => {
        const s = m.appState.value;
        const nb = s.notebooks.find(n => n.id === s.ui.notebookId);
        const sec = nb?.sections.find(sec => sec.id === s.ui.sectionId);
        if (!sec) return;
        let extracted = null;
        function extract(pages) {
          for (let i = 0; i < pages.length; i++) {
            if (pages[i].id === fromId) { [extracted] = pages.splice(i, 1); return true; }
            if (extract(pages[i].children ?? [])) return true;
          }
          return false;
        }
        extract(sec.pages);
        if (!extracted) return;
        const target = m.findInTree(sec.pages, page.id);
        if (target) { target.children = target.children ?? []; target.children.push(extracted); }
        m.appState.value = { ...m.appState.value };
      });
    } else {
      import('./store.js').then(m => {
        const s = m.appState.value;
        const nb = s.notebooks.find(n => n.id === s.ui.notebookId);
        const sec = nb?.sections.find(sec => sec.id === s.ui.sectionId);
        if (!sec) return;
        let extracted = null;
        function extract(pages) {
          for (let i = 0; i < pages.length; i++) {
            if (pages[i].id === fromId) { [extracted] = pages.splice(i, 1); return true; }
            if (extract(pages[i].children ?? [])) return true;
          }
          return false;
        }
        extract(sec.pages);
        if (!extracted) return;
        function insertBefore(pages) {
          for (let i = 0; i < pages.length; i++) {
            if (pages[i].id === page.id) { pages.splice(i, 0, extracted); return true; }
            if (insertBefore(pages[i].children ?? [])) return true;
          }
          return false;
        }
        insertBefore(sec.pages);
        m.appState.value = { ...m.appState.value };
      });
    }
  }

  function openPageContextMenu(e) {
    e.preventDefault();

    // If this page is part of a bulk selection, show bulk menu
    if (selected?.size > 1 && selected.has(page.id)) {
      openContextMenu(e.clientX, e.clientY, [
        {
          type: 'confirm', label: `Delete ${selected.size} pages`,
          confirmLabel: `Delete ${selected.size} pages?`,
          action: onBulkDelete,
        },
      ]);
      return;
    }

    const nb = appState.value.notebooks.find(n => n.id === appState.value.ui.notebookId);
    const sections = nb?.sections ?? [];

    const moveChildren = sections
      .filter(s => s.id !== appState.value.ui.sectionId)
      .map(s => ({ label: s.title, action: () => movePage(page.id, s.id) }));

    const items = [
      { label: 'Rename', action: () => onStartEditing(page.id) },
      { label: 'Add Subpage', action: () => addPage(page.id) },
    ];

    if (moveChildren.length > 0) {
      items.push({ type: 'submenu', label: 'Move to Section', children: moveChildren });
    }

    items.push({ type: 'separator' });

    if (page.children?.length) {
      items.push({
        type: 'confirm', label: 'Delete (promote subpages)',
        confirmLabel: `Delete "${page.title}"?`,
        action: () => deletePageWithChildren(page),
      });
    } else {
      items.push({
        type: 'confirm', label: 'Delete',
        confirmLabel: `Delete "${page.title}"?`,
        action: () => deletePage(page.id),
      });
    }

    openContextMenu(e.clientX, e.clientY, items);
  }

  return (
    <div class="page-item-wrap">
      <div
        class={[
          'panel-item page-item',
          page.id === activeId && !selected?.size && 'panel-item--active',
          isSelected && 'panel-item--selected',
          isOver && !isOverAsChild && 'page-item--drop-before',
          isOverAsChild && 'page-item--drop-child',
        ].filter(Boolean).join(' ')}
        style={{ paddingLeft: (12 + depth * 16) + 'px' }}
        draggable
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={e => {
          if (e.ctrlKey || e.metaKey || e.shiftKey) {
            e.preventDefault();
            onSelect(page.id, e);
          } else {
            if (selected?.size) onSelect(null); // clear selection on plain click
            setActivePage(page.id);
          }
        }}
        onDblClick={e => {
          e.stopPropagation();
          onStartEditing(page.id);
        }}
        onContextMenu={openPageContextMenu}
      >
        <span
          class="page-expand"
          style={{ visibility: hasKids ? 'visible' : 'hidden' }}
          onClick={e => { e.stopPropagation(); setOpen(o => !o); }}
        >{open ? '▾' : '▸'}</span>
        {isEditing ? (
          <input
            ref={editRef}
            class="page-title-edit"
            value={editVal}
            onInput={e => setEditVal(e.target.value)}
            onBlur={commitEdit}
            onKeyDown={e => {
              if (e.key === 'Enter') { e.preventDefault(); commitEdit(); }
              if (e.key === 'Escape') { e.preventDefault(); onStartEditing(null); }
            }}
            onClick={e => e.stopPropagation()}
          />
        ) : (
          <span class="page-title-text">{page.title}</span>
        )}
      </div>
      {hasKids && open && (
        <div class="subpages">
          {page.children.map(c => (
            <PageItem key={c.id} page={c} activeId={activeId} depth={depth + 1} dragState={dragState} onDragChange={onDragChange} editingId={editingId} onStartEditing={onStartEditing} selected={selected} onSelect={onSelect} onBulkDelete={onBulkDelete} />
          ))}
        </div>
      )}
    </div>
  );
}

export function PagesPanel() {
  const { notebooks, ui } = appState.value;
  const nb  = notebooks.find(n => n.id === ui.notebookId);
  const sec = nb?.sections.find(s => s.id === ui.sectionId);
  const pages = sec?.pages ?? [];

  const [dragOver, setDragOver] = useState({ id: null, mode: null });
  const [editingId, setEditingId] = useState(null);
  const [selected, setSelected] = useState(new Set());
  const [confirmDelete, setConfirmDelete] = useState(false);
  const lastSelectedRef = useRef(null);

  // Clear selection when section changes
  useEffect(() => { setSelected(new Set()); lastSelectedRef.current = null; }, [ui.sectionId]);

  function onDragChange(id, mode) { setDragOver({ id, mode }); }

  const onSelect = useCallback((pageId, e) => {
    if (pageId === null) { setSelected(new Set()); lastSelectedRef.current = null; return; }
    setSelected(prev => {
      const next = new Set(prev);
      if (e?.shiftKey && lastSelectedRef.current) {
        const range = getPageRange(pages, lastSelectedRef.current, pageId);
        for (const id of range) next.add(id);
      } else if (e?.ctrlKey || e?.metaKey) {
        if (next.has(pageId)) next.delete(pageId); else next.add(pageId);
      } else {
        next.clear();
        next.add(pageId);
      }
      lastSelectedRef.current = pageId;
      return next;
    });
  }, [pages]);

  function doBulkDelete() {
    for (const id of selected) {
      const pg = findInTree(pages, id);
      if (pg) deletePageWithChildren(pg);
      else deletePage(id);
    }
    setSelected(new Set());
    setConfirmDelete(false);
  }

  // Keyboard: Delete/Backspace to confirm, Escape to clear
  useEffect(() => {
    function onKey(e) {
      if (selected.size && (e.key === 'Delete' || e.key === 'Backspace') && !editingId) {
        e.preventDefault();
        setConfirmDelete(true);
      }
      if (e.key === 'Escape') {
        if (confirmDelete) setConfirmDelete(false);
        else if (selected.size) setSelected(new Set());
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected, editingId, confirmDelete]);

  const dragState = { over: dragOver.id, mode: dragOver.mode };

  return (
    <div id="pages-panel">
      <div class="panel-header">
        <button class="add-btn" onClick={() => addPage()}>+ New Page</button>
      </div>
      <div class="panel-list">
        {pages.map(pg => (
          <PageItem key={pg.id} page={pg} activeId={ui.pageId} dragState={dragState} onDragChange={onDragChange} editingId={editingId} onStartEditing={setEditingId} selected={selected} onSelect={onSelect} onBulkDelete={doBulkDelete} />
        ))}
      </div>
      {confirmDelete && (
        <div class="confirm-overlay" onClick={() => setConfirmDelete(false)}>
          <div class="confirm-dialog" onClick={e => e.stopPropagation()}>
            <p>Delete {selected.size} page{selected.size > 1 ? 's' : ''}?</p>
            <p class="confirm-sub">This cannot be undone. Subpages will be promoted.</p>
            <div class="confirm-buttons">
              <button class="confirm-cancel" onClick={() => setConfirmDelete(false)}>Cancel</button>
              <button class="confirm-delete" onClick={doBulkDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
