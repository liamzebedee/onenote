import { useRef } from 'preact/hooks';
import { appState, setActiveSection, addSection, renameSection, deleteSection, reorderSections } from './store.js';

export function SectionPanel() {
  const { notebooks, ui } = appState.value;
  const nb = notebooks.find(n => n.id === ui.notebookId);
  const sections = nb?.sections ?? [];
  const dragId = useRef(null);

  return (
    <div id="sections-panel" class="panel">
      <div class="panel-label">Sections</div>
      <div class="panel-list">
        {sections.map(sec => (
          <div
            key={sec.id}
            class={['panel-item', sec.id === ui.sectionId && 'panel-item--active'].filter(Boolean).join(' ')}
            onClick={() => setActiveSection(sec.id)}
            onDblClick={() => { const t = prompt('Section name:', sec.title); if (t?.trim()) renameSection(nb.id, sec.id, t.trim()); }}
            onContextMenu={e => {
              e.preventDefault();
              if (sections.length <= 1) return alert('Cannot delete the last section.');
              if (confirm(`Delete "${sec.title}"?`)) deleteSection(nb.id, sec.id);
            }}
            draggable
            onDragStart={() => { dragId.current = sec.id; }}
            onDragOver={e => e.preventDefault()}
            onDrop={e => {
              e.preventDefault();
              if (!dragId.current || dragId.current === sec.id) return;
              const ids = sections.map(s => s.id);
              const from = ids.indexOf(dragId.current), to = ids.indexOf(sec.id);
              const next = [...ids]; next.splice(from, 1); next.splice(to, 0, dragId.current);
              reorderSections(nb.id, next);
              dragId.current = null;
            }}
          >{sec.title}</div>
        ))}
      </div>
      <div class="panel-footer">
        <button class="add-btn" onClick={() => addSection(nb?.id)}>+ Section</button>
      </div>
    </div>
  );
}
