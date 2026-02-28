import { useRef } from 'preact/hooks';
import { appState, setActiveSection, addSection, renameSection, deleteSection, reorderSections } from './store.js';
import { openContextMenu, openRenameMenu } from './ContextMenu.jsx';

export function SectionPanel() {
  const { notebooks, ui } = appState.value;
  const nb = notebooks.find(n => n.id === ui.notebookId);
  const sections = nb?.sections ?? [];
  const dragId = useRef(null);

  return (
    <div id="section-tabs">
      {sections.map(sec => (
        <div
          key={sec.id}
          class={['sec-tab', sec.id === ui.sectionId && 'sec-tab--active'].filter(Boolean).join(' ')}
          onClick={() => setActiveSection(sec.id)}
          onDblClick={e => {
            openRenameMenu(e.clientX, e.clientY, sec.title, t => renameSection(nb.id, sec.id, t));
          }}
          onContextMenu={e => {
            e.preventDefault();
            openContextMenu(e.clientX, e.clientY, [
              { label: 'Rename', action: () => openRenameMenu(e.clientX, e.clientY, sec.title, t => renameSection(nb.id, sec.id, t)) },
              { type: 'separator' },
              {
                type: 'confirm', label: 'Delete',
                confirmLabel: sections.length <= 1 ? 'Cannot delete last section' : `Delete "${sec.title}"?`,
                action: () => { if (sections.length > 1) deleteSection(nb.id, sec.id); },
              },
            ]);
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
      <button class="sec-add" onClick={() => addSection(nb?.id)} title="New section">+</button>
    </div>
  );
}
