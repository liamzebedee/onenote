import { useState, useRef, useEffect, useCallback } from 'preact/hooks';
import { appState, editingEnabled, setActivePage, addPage, renamePage, deletePage, movePage, findInTree, updatePageTree, preloadPage, togglePageVisibility } from './store.ts';
import type { Page, MenuItem, MenuItemNormal } from './types.ts';
import type { JSX } from 'preact';

const SECTION_COLORS = [
  '#fce4b8', '#b8d4f0', '#c8e6c0', '#f0c0c0',
  '#d8c8f0', '#f0d8b0', '#b8e0e0', '#f0c8e0',
];
import { openContextMenu } from './ContextMenu.tsx';

// ── Helpers for collecting page IDs from tree ──────
function flattenPageIds(pages: Page[]): string[] {
  const ids: string[] = [];
  for (const p of pages) {
    ids.push(p.id);
    if (p.children?.length) ids.push(...flattenPageIds(p.children));
  }
  return ids;
}

function isDescendantOf(pages: Page[], ancestorId: string, targetId: string): boolean {
  const ancestor = findInTree(pages, ancestorId);
  if (!ancestor || !ancestor.children?.length) return false;
  return !!findInTree(ancestor.children, targetId);
}

function getPageRange(pages: Page[], idA: string, idB: string): string[] {
  const flat = flattenPageIds(pages);
  const a = flat.indexOf(idA), b = flat.indexOf(idB);
  if (a === -1 || b === -1) return [idB];
  const lo = Math.min(a, b), hi = Math.max(a, b);
  return flat.slice(lo, hi + 1);
}

// ── Drag state (module-level so siblings can share) ──────
const drag: { pageId: string | null; over: string | null; mode: string | null } = { pageId: null, over: null, mode: null };

function deletePageWithChildren(page: Page): void {
  if (!page.children?.length) {
    deletePage(page.id);
    return;
  }
  // If page has children, promote them to siblings then delete parent
  const s = appState.value;
  const nb = s.notebooks.find(n => n.id === s.ui.notebookId);
  const sec = nb?.sections.find(sec => sec.id === s.ui.sectionId);
  if (!sec) return;
  function promoteChildren(pages: Page[]): boolean {
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
  updatePageTree(sec.id, sec.pages);
}

interface DragState {
  over: string | null;
  mode: string | null;
}

interface PageItemProps {
  page: Page;
  activeId: string | null;
  depth?: number;
  dragState: DragState;
  onDragChange: (id: string | null, mode: string | null) => void;
  editingId: string | null;
  onStartEditing: (id: string | null) => void;
  selected: Set<string>;
  onSelect: (pageId: string | null, e?: MouseEvent) => void;
  onBulkDelete: () => void;
}

function PageItem({ page, activeId, depth = 0, dragState, onDragChange, editingId, onStartEditing, selected, onSelect, onBulkDelete }: PageItemProps): JSX.Element {
  const [open, setOpen] = useState<boolean>(true);
  const hasKids = (page.children?.length ?? 0) > 0;
  const isOver = dragState.over === page.id;
  const dropMode = isOver ? dragState.mode : null;
  const isEditing = editingId === page.id;
  const editRef = useRef<HTMLInputElement>(null);
  const [editVal, setEditVal] = useState<string>(page.title);
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

  function commitEdit(): void {
    const v = editVal.trim() || 'Untitled Page';
    if (v !== page.title) renamePage(page.id, v);
    onStartEditing(null);
  }

  function onDragStart(e: DragEvent): void {
    e.stopPropagation();
    drag.pageId = page.id;
    e.dataTransfer!.effectAllowed = 'move';
  }

  function onDragEnd(): void {
    drag.pageId = null;
    onDragChange(null, null);
  }

  function onDragOver(e: DragEvent): void {
    e.preventDefault();
    e.stopPropagation();
    if (drag.pageId === page.id) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const rel = (e.clientY - rect.top) / rect.height;
    const mode = rel < 0.3 ? 'before' : rel > 0.7 ? 'after' : 'child';
    if (dragState.over !== page.id || dragState.mode !== mode) {
      onDragChange(page.id, mode);
    }
  }

  function onDragLeave(e: DragEvent): void {
    if (!(e.currentTarget as HTMLElement).contains(e.relatedTarget as Node)) onDragChange(null, null);
  }

  function onDrop(e: DragEvent): void {
    e.preventDefault();
    e.stopPropagation();
    const fromId = drag.pageId;
    const mode = dragState.mode;
    drag.pageId = null;
    onDragChange(null, null);
    if (!fromId || fromId === page.id) return;

    const s = appState.value;
    const nb = s.notebooks.find(n => n.id === s.ui.notebookId);
    const sec = nb?.sections.find(sec => sec.id === s.ui.sectionId);
    if (!sec) return;
    if (isDescendantOf(sec.pages, fromId, page.id)) return;

    let extracted: Page | null = null;
    function extract(pages: Page[]): boolean {
      for (let i = 0; i < pages.length; i++) {
        if (pages[i].id === fromId) { [extracted] = pages.splice(i, 1); return true; }
        if (extract(pages[i].children ?? [])) return true;
      }
      return false;
    }
    extract(sec.pages);
    if (!extracted) return;

    if (mode === 'child') {
      const target = findInTree(sec.pages, page.id);
      if (target) { target.children = target.children ?? []; target.children.push(extracted); }
    } else if (mode === 'before') {
      function insertBefore(pages: Page[]): boolean {
        for (let i = 0; i < pages.length; i++) {
          if (pages[i].id === page.id) { pages.splice(i, 0, extracted!); return true; }
          if (insertBefore(pages[i].children ?? [])) return true;
        }
        return false;
      }
      insertBefore(sec.pages);
    } else {
      // 'after' — insert after target at same level
      function insertAfter(pages: Page[]): boolean {
        for (let i = 0; i < pages.length; i++) {
          if (pages[i].id === page.id) { pages.splice(i + 1, 0, extracted!); return true; }
          if (insertAfter(pages[i].children ?? [])) return true;
        }
        return false;
      }
      insertAfter(sec.pages);
    }

    appState.value = { ...appState.value };
    updatePageTree(sec.id, sec.pages);
  }

  function openPageContextMenu(e: MouseEvent): void {
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

    const moveChildren: MenuItemNormal[] = sections
      .filter(s => s.id !== appState.value.ui.sectionId)
      .map(s => ({ label: s.title, action: () => movePage(page.id, s.id) }));

    const items: MenuItem[] = [
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

  const lineLeft = 10 + depth * 16 + 8; // center of the expand arrow

  return (
    <div class="page-item-wrap">
      <div
        class={[
          'panel-item page-item',
          page.id === activeId && !selected?.size && 'panel-item--active',
          isSelected && 'panel-item--selected',
          dropMode === 'before' && 'page-item--drop-before',
          dropMode === 'child' && 'page-item--drop-child',
          dropMode === 'after' && 'page-item--drop-after',
        ].filter(Boolean).join(' ')}
        style={{ paddingLeft: (10 + depth * 16) + 'px' }}
        draggable
        onMouseEnter={() => preloadPage(page)}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={(e: MouseEvent) => {
          if (e.ctrlKey || e.metaKey || e.shiftKey) {
            e.preventDefault();
            onSelect(page.id, e);
          } else {
            if (selected?.size) onSelect(null); // clear selection on plain click
            setActivePage(page.id);
          }
        }}
        onContextMenu={openPageContextMenu}
      >
        {hasKids && open && (
          <div class="tree-line" style={{
            position: 'absolute', left: lineLeft + 'px', top: '50%', bottom: '-1px',
            borderLeft: '1px solid rgba(0,0,0,0.22)', pointerEvents: 'none',
          }} />
        )}
        <span
          class="page-expand"
          style={{ visibility: hasKids ? 'visible' : 'hidden' }}
          onClick={(e: MouseEvent) => { e.stopPropagation(); setOpen(o => !o); }}
        >{open ? '▾' : '▸'}</span>
        {isEditing ? (
          <input
            ref={editRef}
            class="page-title-edit"
            value={editVal}
            onInput={(e: Event) => setEditVal((e.target as HTMLInputElement).value)}
            onBlur={commitEdit}
            onKeyDown={(e: KeyboardEvent) => {
              if (e.key === 'Enter') { e.preventDefault(); commitEdit(); }
              if (e.key === 'Escape') { e.preventDefault(); onStartEditing(null); }
            }}
            onClick={(e: MouseEvent) => e.stopPropagation()}
          />
        ) : (
          <span class="page-title-text">{page.title}</span>
        )}
      </div>
      {hasKids && (
        <div class={'subpages-wrap' + (open ? '' : ' subpages-wrap--closed')}>
          <div class="subpages">
            {page.children.map((c, i) => {
              const isLast = i === page.children.length - 1;
              const childLineLeft = 10 + (depth + 1) * 16 + 8;
              return (
                <div key={c.id} class="tree-row">
                  <div class="tree-line" style={{
                    position: 'absolute', left: lineLeft + 'px', top: 0,
                    bottom: isLast ? 'calc(100% - 12px)' : '0',
                    borderLeft: '1px solid rgba(0,0,0,0.22)', pointerEvents: 'none',
                  }} />
                  <div class="tree-line" style={{
                    position: 'absolute', left: lineLeft + 'px', top: '12px',
                    width: (childLineLeft - lineLeft) + 'px',
                    borderTop: '1px solid rgba(0,0,0,0.22)', pointerEvents: 'none',
                  }} />
                  <PageItem page={c} activeId={activeId} depth={depth + 1} dragState={dragState} onDragChange={onDragChange} editingId={editingId} onStartEditing={onStartEditing} selected={selected} onSelect={onSelect} onBulkDelete={onBulkDelete} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export function PagesPanel(): JSX.Element {
  const { notebooks, ui } = appState.value;
  const nb  = notebooks.find(n => n.id === ui.notebookId);
  const sec = nb?.sections.find(s => s.id === ui.sectionId);
  const pages = sec?.pages ?? [];

  const [dragOver, setDragOver] = useState<{ id: string | null; mode: string | null }>({ id: null, mode: null });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const lastSelectedRef = useRef<string | null>(null);

  // Clear selection when section changes
  useEffect(() => { setSelected(new Set()); lastSelectedRef.current = null; }, [ui.sectionId]);

  function onDragChange(id: string | null, mode: string | null): void { setDragOver({ id, mode }); }

  const onSelect = useCallback((pageId: string | null, e?: MouseEvent) => {
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

  function doBulkDelete(): void {
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
    function onKey(e: KeyboardEvent): void {
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

  const dragState: DragState = { over: dragOver.id, mode: dragOver.mode };

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
          <div class="confirm-dialog" onClick={(e: MouseEvent) => e.stopPropagation()}>
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
