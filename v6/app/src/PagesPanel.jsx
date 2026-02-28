import { useState, useRef, useEffect } from 'preact/hooks';
import { appState, setActivePage, addPage, renamePage, deletePage, movePage, findInTree } from './store.js';
import { openContextMenu } from './ContextMenu.jsx';

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

function PageItem({ page, activeId, depth = 0, dragState, onDragChange, editingId, onStartEditing }) {
  const [open, setOpen] = useState(true);
  const hasKids = page.children?.length > 0;
  const isOver = dragState.over === page.id;
  const isOverAsChild = isOver && dragState.mode === 'child';
  const isEditing = editingId === page.id;
  const editRef = useRef(null);
  const [editVal, setEditVal] = useState(page.title);

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
          page.id === activeId && 'panel-item--active',
          isOver && !isOverAsChild && 'page-item--drop-before',
          isOverAsChild && 'page-item--drop-child',
        ].filter(Boolean).join(' ')}
        style={{ paddingLeft: (12 + depth * 16) + 'px' }}
        draggable
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => setActivePage(page.id)}
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
            <PageItem key={c.id} page={c} activeId={activeId} depth={depth + 1} dragState={dragState} onDragChange={onDragChange} editingId={editingId} onStartEditing={onStartEditing} />
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

  function onDragChange(id, mode) { setDragOver({ id, mode }); }

  const dragState = { over: dragOver.id, mode: dragOver.mode };

  return (
    <div id="pages-panel">
      <div class="panel-header">
        <button class="add-btn" onClick={() => addPage()}>+ New Page</button>
      </div>
      <div class="panel-list">
        {pages.map(pg => (
          <PageItem key={pg.id} page={pg} activeId={ui.pageId} dragState={dragState} onDragChange={onDragChange} editingId={editingId} onStartEditing={setEditingId} />
        ))}
      </div>
    </div>
  );
}
