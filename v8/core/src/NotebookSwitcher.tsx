import { useEffect } from 'preact/hooks';
import { showSwitcher, closeSwitcher, recentNotebooks, openNotebook, pickAndOpenNotebook, createAndOpenNotebook, getNotebookPath } from './store.ts';
import type { JSX } from 'preact';

function BookIcon(): JSX.Element {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

export function NotebookSwitcher(): JSX.Element | null {
  if (!showSwitcher.value) return null;

  const currentPath = getNotebookPath();
  const recents = recentNotebooks.value;

  useEffect(() => {
    function onKey(e: KeyboardEvent): void {
      if (e.key === 'Escape') closeSwitcher();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div
      class="nb-picker-overlay"
      onMouseDown={(e: MouseEvent) => { if (e.target === e.currentTarget) closeSwitcher(); }}
    >
      <div class="nb-picker-modal">
        <div class="nb-picker-header">
          <span class="nb-picker-title">Switch Notebook</span>
          <button class="nb-picker-close" onClick={closeSwitcher}>✕</button>
        </div>
        {recents.length > 0 && (
          <div class="nb-picker-grid">
            {recents.map(r => (
              <div
                key={r.path}
                class={['nb-picker-card', r.path === currentPath && 'nb-picker-card--active'].filter(Boolean).join(' ')}
                onClick={() => openNotebook(r.path)}
              >
                <div class="nb-picker-icon"><BookIcon /></div>
                <div class="nb-picker-name">{r.name}</div>
              </div>
            ))}
          </div>
        )}
        {recents.length === 0 && (
          <p class="nb-picker-empty">No recent notebooks.</p>
        )}
        <div class="nb-picker-footer">
          <button class="nb-picker-action" onClick={() => { closeSwitcher(); pickAndOpenNotebook(); }}>
            Open Existing…
          </button>
          <button class="nb-picker-action" onClick={() => { closeSwitcher(); createAndOpenNotebook(); }}>
            New Notebook…
          </button>
        </div>
      </div>
    </div>
  );
}
