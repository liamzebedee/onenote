import { useRef } from 'preact/hooks';
import { appState, setActiveSection, addSection, renameSection, deleteSection, reorderSections } from './store.ts';

const SECTION_COLORS = [
  '#fce4b8', '#b8d4f0', '#c8e6c0', '#f0c0c0',
  '#d8c8f0', '#f0d8b0', '#b8e0e0', '#f0c8e0',
];
import { openContextMenu, openRenameMenu } from './ContextMenu.tsx';
import type { JSX } from 'preact';

export function SectionPanel(): JSX.Element {
  const { notebooks, ui } = appState.value;
  const nb = notebooks.find(n => n.id === ui.notebookId);
  const sections = nb?.sections ?? [];
  const dragId = useRef<string | null>(null);
  return (
    <div id="section-tabs">
      {sections.map((sec, i) => (
        <div
          key={sec.id}
          class={['sec-tab', sec.id === ui.sectionId && 'sec-tab--active'].filter(Boolean).join(' ')}
          onClick={() => setActiveSection(sec.id)}
          onDblClick={(e: MouseEvent) => {
            openRenameMenu(e.clientX, e.clientY, sec.title, t => renameSection(nb!.id, sec.id, t));
          }}
          onContextMenu={(e: MouseEvent) => {
            e.preventDefault();
            openContextMenu(e.clientX, e.clientY, [
              { label: 'Rename', action: () => openRenameMenu(e.clientX, e.clientY, sec.title, t => renameSection(nb!.id, sec.id, t)) },
              { type: 'separator' },
              {
                type: 'confirm', label: 'Delete',
                confirmLabel: sections.length <= 1 ? 'Cannot delete last section' : `Delete "${sec.title}"?`,
                action: () => { if (sections.length > 1) deleteSection(nb!.id, sec.id); },
              },
            ]);
          }}
          draggable
          onDragStart={() => { dragId.current = sec.id; }}
          onDragOver={(e: DragEvent) => e.preventDefault()}
          onDrop={(e: DragEvent) => {
            e.preventDefault();
            if (!dragId.current || dragId.current === sec.id) return;
            const ids = sections.map(s => s.id);
            const from = ids.indexOf(dragId.current), to = ids.indexOf(sec.id);
            const next = [...ids]; next.splice(from, 1); next.splice(to, 0, dragId.current);
            reorderSections(nb!.id, next);
            dragId.current = null;
          }}
        >
          {i > 0 && <span class="sec-tab-left-corner" />}
          <div class="sec-tab-body">{sec.title}</div>
          <span class="sec-tab-right-corner" />
        </div>
      ))}
      <button class="sec-add" onClick={() => nb && addSection(nb.id)} title="New section">+</button>
    </div>
  );
}
