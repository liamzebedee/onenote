import { useRef } from 'preact/hooks';
import { appState, setActiveNotebook, addNotebook, renameNotebook, deleteNotebook, reorderNotebooks, toggleSwitcher } from './store.ts';
import { openContextMenu, openRenameMenu } from './ContextMenu.tsx';
import type { JSX } from 'preact';

export function NotebookBar(): JSX.Element {
  const { notebooks, ui } = appState.value;
  const dragId = useRef<string | null>(null);

  return (
    <div id="notebook-bar">
      {notebooks.map(nb => (
        <div
          key={nb.id}
          class={['nb-tab', nb.id === ui.notebookId && 'nb-tab--active'].filter(Boolean).join(' ')}
          onClick={() => setActiveNotebook(nb.id)}
          onDblClick={(e: MouseEvent) => {
            openRenameMenu(e.clientX, e.clientY, nb.title, t => renameNotebook(nb.id, t));
          }}
          onContextMenu={(e: MouseEvent) => {
            e.preventDefault();
            openContextMenu(e.clientX, e.clientY, [
              { label: 'Rename', action: () => openRenameMenu(e.clientX, e.clientY, nb.title, t => renameNotebook(nb.id, t)) },
              { type: 'separator' },
              {
                type: 'confirm', label: 'Delete',
                confirmLabel: notebooks.length <= 1 ? 'Cannot delete last notebook' : `Delete "${nb.title}"?`,
                action: () => { if (notebooks.length > 1) deleteNotebook(nb.id); },
              },
            ]);
          }}
          draggable
          onDragStart={() => { dragId.current = nb.id; }}
          onDragOver={(e: DragEvent) => e.preventDefault()}
          onDrop={(e: DragEvent) => {
            e.preventDefault();
            if (!dragId.current || dragId.current === nb.id) return;
            const ids = notebooks.map(n => n.id);
            const from = ids.indexOf(dragId.current), to = ids.indexOf(nb.id);
            const next = [...ids]; next.splice(from, 1); next.splice(to, 0, dragId.current);
            reorderNotebooks(next);
            dragId.current = null;
          }}
        >{nb.title}</div>
      ))}
      <button class="nb-add" onClick={addNotebook} title="New notebook">+</button>
      <div style="flex:1" />
      <button class="nb-switch" onClick={toggleSwitcher} title="Switch notebook file">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
          <path d="M1 3.5A1.5 1.5 0 0 1 2.5 2h3.879a1.5 1.5 0 0 1 1.06.44l1.122 1.12A1.5 1.5 0 0 0 9.62 4H13.5A1.5 1.5 0 0 1 15 5.5v7a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 12.5v-9z"/>
        </svg>
      </button>
    </div>
  );
}
