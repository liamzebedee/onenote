import { useRef } from 'preact/hooks';
import { appState, setActiveNotebook, addNotebook, renameNotebook, deleteNotebook, reorderNotebooks } from './store.js';

export function NotebookBar() {
  const { notebooks, ui } = appState.value;
  const dragId = useRef(null);

  return (
    <div id="notebook-bar">
      {notebooks.map(nb => (
        <div
          key={nb.id}
          class={['nb-tab', nb.id === ui.notebookId && 'nb-tab--active'].filter(Boolean).join(' ')}
          onClick={() => setActiveNotebook(nb.id)}
          onDblClick={() => { const t = prompt('Notebook name:', nb.title); if (t?.trim()) renameNotebook(nb.id, t.trim()); }}
          onContextMenu={e => {
            e.preventDefault();
            if (notebooks.length <= 1) return alert('Cannot delete the last notebook.');
            if (confirm(`Delete "${nb.title}" and all contents?`)) deleteNotebook(nb.id);
          }}
          draggable
          onDragStart={() => { dragId.current = nb.id; }}
          onDragOver={e => e.preventDefault()}
          onDrop={e => {
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
    </div>
  );
}
