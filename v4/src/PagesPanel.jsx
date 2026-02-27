import { useState, useRef } from 'preact/hooks';
import { appState, setActivePage, addPage, renamePage, deletePage, movePage, findInTree } from './store.js';

// ── Drag state (module-level so siblings can share) ──────
const drag = { pageId: null, over: null, mode: null }; // mode: 'before' | 'child'

function deletePageWithChildren(page) {
  if (!page.children?.length) {
    if (confirm(`Delete "${page.title}"?`)) deletePage(page.id);
    return;
  }
  const choice = confirm(
    `"${page.title}" has ${page.children.length} subpage(s).\n\nOK = delete all subpages\nCancel = promote subpages to siblings`
  );
  if (choice) {
    // Delete entire subtree
    deletePage(page.id);
  } else {
    // Promote children, then delete parent
    // We do this by moving each child up in the tree before deleting parent
    import('./store.js').then(m => {
      // Promote each child to be a sibling of the parent
      const { appState: st } = m;
      const s = st.value;
      const nb = s.notebooks.find(n => n.id === s.ui.notebookId);
      const sec = nb?.sections.find(sec => sec.id === s.ui.sectionId);
      if (!sec) return;
      // Find parent in pages tree and splice children out
      function promoteChildren(pages) {
        for (let i = 0; i < pages.length; i++) {
          if (pages[i].id === page.id) {
            const children = pages[i].children ?? [];
            pages.splice(i, 1, ...children); // replace parent with its children
            return true;
          }
          if (promoteChildren(pages[i].children ?? [])) return true;
        }
        return false;
      }
      promoteChildren(sec.pages);
      st.value = { ...st.value };
      // Trigger save
      import('./store.js').then(m2 => m2.updatePageView(0, 0, 1)); // tiny save trigger
    });
  }
}

function PageItem({ page, activeId, depth = 0, dragState, onDragChange }) {
  const [open, setOpen] = useState(true);
  const hasKids = page.children?.length > 0;
  const isOver = dragState.over === page.id;
  const isOverAsChild = isOver && dragState.mode === 'child';

  function onDragStart(e) {
    e.stopPropagation();
    drag.pageId = page.id;
    e.dataTransfer.effectAllowed = 'move';
  }

  function onDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    if (drag.pageId === page.id) return;
    // Top 30% or bottom 30% = reorder; middle 40% = nest as child
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
      // Move fromId as subpage of page.id
      import('./store.js').then(m => {
        const s = m.appState.value;
        const nb = s.notebooks.find(n => n.id === s.ui.notebookId);
        const sec = nb?.sections.find(sec => sec.id === s.ui.sectionId);
        if (!sec) return;

        // Extract the page from tree
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

        // Find target and append child
        const target = m.findInTree(sec.pages, page.id);
        if (target) { target.children = target.children ?? []; target.children.push(extracted); }
        m.appState.value = { ...m.appState.value };
      });
    } else {
      // Reorder: move fromId to appear before page.id in flat list
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
          const t = prompt('Page name:', page.title);
          if (t?.trim()) renamePage(page.id, t.trim());
        }}
        onContextMenu={e => {
          e.preventDefault();
          const action = prompt('rename / delete / subpage / move', 'rename');
          if (!action) return;
          if (action === 'rename') { const t = prompt('Name:', page.title); if (t?.trim()) renamePage(page.id, t.trim()); }
          else if (action === 'delete') deletePageWithChildren(page);
          else if (action === 'subpage') addPage(page.id);
          else if (action === 'move') {
            const nb = appState.value.notebooks.find(n => n.id === appState.value.ui.notebookId);
            const opts = nb?.sections.map(s => `${s.id}: ${s.title}`).join('\n') ?? '';
            const input = prompt('Target section ID:\n' + opts);
            if (input) movePage(page.id, input.split(':')[0].trim());
          }
        }}
      >
        <span
          class="page-expand"
          style={{ visibility: hasKids ? 'visible' : 'hidden' }}
          onClick={e => { e.stopPropagation(); setOpen(o => !o); }}
        >{open ? '▾' : '▸'}</span>
        <span class="page-title-text">{page.title}</span>
      </div>
      {hasKids && open && (
        <div class="subpages">
          {page.children.map(c => (
            <PageItem key={c.id} page={c} activeId={activeId} depth={depth + 1} dragState={dragState} onDragChange={onDragChange} />
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

  function onDragChange(id, mode) { setDragOver({ id, mode }); }

  const dragState = { over: dragOver.id, mode: dragOver.mode };

  return (
    <div id="pages-panel" class="panel">
      <div class="panel-label">Pages</div>
      <div class="panel-list">
        {pages.map(pg => (
          <PageItem key={pg.id} page={pg} activeId={ui.pageId} dragState={dragState} onDragChange={onDragChange} />
        ))}
      </div>
      <div class="panel-footer">
        <button class="add-btn" onClick={() => addPage()}>+ Page</button>
      </div>
    </div>
  );
}
