import { useRef } from 'preact/hooks';
import { signal } from '@preact/signals';
import { appState, setActiveNotebook, setActiveSection, addNotebook, renameNotebook, deleteNotebook, reorderNotebooks, toggleSwitcher } from './store.ts';
import { openContextMenu, openRenameMenu } from './ContextMenu.tsx';
import type { Notebook, UIState } from './types.ts';
import type { JSX } from 'preact';

// Expanded vs collapsed (thin spine) — OneNote 2010 toggles between the two.
export const notebookRailCollapsed = signal<boolean>(false);

// Per-notebook colour, derived by index (until Notebook.color exists).
const NOTEBOOK_COLORS = ['#e0992e', '#cf5757', '#4f89cf', '#5aa85a', '#9866c6', '#2f9d9d', '#c765a1', '#c19a2e'];
// Section swatch colours (match the section-tab palette solids).
const SECTION_COLORS = ['#fce4b8', '#b8d4f0', '#c8e6c0', '#f0c0c0', '#d8c8f0', '#f0d8b0', '#b8e0e0', '#f0c8e0'];

function BookIcon({ color }: { color: string }): JSX.Element {
  // Two stacked notebooks, OneNote-style.
  return (
    <svg width="16" height="15" viewBox="0 0 16 15" style={{ display: 'block' }}>
      <rect x="1.5" y="3" width="9" height="10.5" rx="1.2" fill={color} opacity="0.55" />
      <rect x="4.5" y="1.5" width="9.5" height="11" rx="1.2" fill={color} stroke="#fff" stroke-width="0.6" />
      <rect x="4.5" y="1.5" width="2" height="11" rx="1" fill="rgba(0,0,0,0.18)" />
    </svg>
  );
}

function SyncIcon(): JSX.Element {
  // Green "synced" circular-arrows badge.
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="#3a9d3a" stroke-width="1.7">
      <path d="M12.5 8a4.5 4.5 0 0 1-7.7 3.2" stroke-linecap="round" />
      <path d="M3.5 8a4.5 4.5 0 0 1 7.7-3.2" stroke-linecap="round" />
      <path d="M11 2.2v2.6H8.4" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M5 13.8v-2.6h2.6" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  );
}

function notebookMenu(nb: Notebook, x: number, y: number, count: number): void {
  openContextMenu(x, y, [
    { label: 'Rename', action: () => openRenameMenu(x, y, nb.title, t => renameNotebook(nb.id, t)) },
    { type: 'separator' },
    {
      type: 'confirm', label: 'Close Notebook',
      confirmLabel: count <= 1 ? 'Cannot close last notebook' : `Close "${nb.title}"?`,
      action: () => { if (count > 1) deleteNotebook(nb.id); },
    },
  ]);
}

// ── Collapsed spine (vertical tabs) ────────────────────────
function CollapsedRail({ notebooks, ui }: { notebooks: Notebook[]; ui: UIState }): JSX.Element {
  const dragId = useRef<string | null>(null);
  return (
    <div id="notebook-bar">
      <button class="nb-expand" title="Expand notebooks" onClick={() => { notebookRailCollapsed.value = false; }}>
        <img src="assets/icons/chevron-right.svg" width="14" height="14" alt="" />
      </button>
      {notebooks.map(nb => (
        <div
          key={nb.id}
          class={['nb-tab', nb.id === ui.notebookId && 'nb-tab--active'].filter(Boolean).join(' ')}
          onClick={() => setActiveNotebook(nb.id)}
          onDblClick={(e: MouseEvent) => openRenameMenu(e.clientX, e.clientY, nb.title, t => renameNotebook(nb.id, t))}
          onContextMenu={(e: MouseEvent) => { e.preventDefault(); notebookMenu(nb, e.clientX, e.clientY, notebooks.length); }}
          draggable
          onDragStart={() => { dragId.current = nb.id; }}
          onDragOver={(e: DragEvent) => e.preventDefault()}
          onDrop={(e: DragEvent) => {
            e.preventDefault();
            if (!dragId.current || dragId.current === nb.id) return;
            const ids = notebooks.map(n => n.id);
            const from = ids.indexOf(dragId.current), to = ids.indexOf(nb.id);
            const next = [...ids]; next.splice(from, 1); next.splice(to, 0, dragId.current);
            reorderNotebooks(next); dragId.current = null;
          }}
        >{nb.title}</div>
      ))}
      <button class="nb-add" onClick={addNotebook} title="New notebook">+</button>
    </div>
  );
}

// ── Expanded panel (OneNote 2010 look) ─────────────────────
export function NotebookBar(): JSX.Element {
  const { notebooks, ui } = appState.value;
  const dragId = useRef<string | null>(null);

  if (notebookRailCollapsed.value) return <CollapsedRail notebooks={notebooks} ui={ui} />;

  return (
    <div id="notebook-panel">
      <div class="nbp-header">
        <span class="nbp-header-label">Notebooks</span>
        <button class="nbp-header-btn" title="Collapse" onClick={() => { notebookRailCollapsed.value = true; }}>
          <img src="assets/icons/chevron-left.svg" width="14" height="14" alt="" />
        </button>
      </div>
      <div class="nbp-list">
        {notebooks.map((nb, i) => {
          const isActive = nb.id === ui.notebookId;
          return (
            <div key={nb.id}>
              <div
                class={['nbp-item', isActive && 'nbp-item--active'].filter(Boolean).join(' ')}
                onClick={() => setActiveNotebook(nb.id)}
                onDblClick={(e: MouseEvent) => openRenameMenu(e.clientX, e.clientY, nb.title, t => renameNotebook(nb.id, t))}
                onContextMenu={(e: MouseEvent) => { e.preventDefault(); notebookMenu(nb, e.clientX, e.clientY, notebooks.length); }}
                draggable
                onDragStart={() => { dragId.current = nb.id; }}
                onDragOver={(e: DragEvent) => e.preventDefault()}
                onDrop={(e: DragEvent) => {
                  e.preventDefault();
                  if (!dragId.current || dragId.current === nb.id) return;
                  const ids = notebooks.map(n => n.id);
                  const from = ids.indexOf(dragId.current), to = ids.indexOf(nb.id);
                  const next = [...ids]; next.splice(from, 1); next.splice(to, 0, dragId.current);
                  reorderNotebooks(next); dragId.current = null;
                }}
              >
                <span class="nbp-icon"><BookIcon color={NOTEBOOK_COLORS[i % NOTEBOOK_COLORS.length]} /></span>
                <span class="nbp-name">{nb.title}</span>
                <span class="nbp-sync" title="Synced"><SyncIcon /></span>
                <button
                  class="nbp-chevron"
                  title="Notebook options"
                  onClick={(e: MouseEvent) => { e.stopPropagation(); notebookMenu(nb, e.clientX, e.clientY, notebooks.length); }}
                ><img src="assets/icons/caret-down.svg" width="9" height="9" alt="" /></button>
              </div>
              {/* Open notebook: show its sections nested underneath (OneNote-style). */}
              {isActive && nb.sections.length > 0 && (
                <div class="nbp-sections">
                  {nb.sections.map((sec, si) => (
                    <div
                      key={sec.id}
                      class={['nbp-section', sec.id === ui.sectionId && 'nbp-section--active'].filter(Boolean).join(' ')}
                      onClick={() => setActiveSection(sec.id)}
                    >
                      <span class="nbp-section-dot" style={{ background: SECTION_COLORS[si % SECTION_COLORS.length] }} />
                      <span class="nbp-section-name">{sec.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <button class="nbp-add-row" onClick={addNotebook}>
        <span class="nbp-icon"><img src="assets/icons/plus.svg" width="14" height="14" alt="" /></span><span>New Notebook</span>
      </button>
      <button class="nbp-unfiled" onClick={() => toggleSwitcher()} title="Open or switch notebook file">
        <span class="nbp-icon"><img src="assets/icons/folder.svg" width="14" height="14" alt="" /></span><span>Open Notebook…</span>
      </button>
    </div>
  );
}
