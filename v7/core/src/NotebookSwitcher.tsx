import { useEffect } from 'preact/hooks';
import { showSwitcher, closeSwitcher, recentNotebooks, openNotebook, pickAndOpenNotebook, createAndOpenNotebook, getNotebookPath } from './store.ts';
import type { JSX } from 'preact';

const truncPath = (p: string): string => {
  const home = p.replace(/^\/Users\/[^/]+/, '~').replace(/^\/home\/[^/]+/, '~');
  return home.length > 52 ? '…' + home.slice(-49) : home;
};

export function NotebookSwitcher(): JSX.Element | null {
  if (!showSwitcher.value) return null;

  const currentPath = getNotebookPath();
  const recents = recentNotebooks.value;

  useEffect(() => {
    function onKey(e: KeyboardEvent): void { if (e.key === 'Escape') closeSwitcher(); }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div class="nbsw-overlay" onMouseDown={(e: MouseEvent) => { if (e.target === e.currentTarget) closeSwitcher(); }}>
      <div class="nbsw-panel">
        <div class="nbsw-head">
          <span class="nbsw-title">Open Notebook</span>
          <button class="nbsw-close" title="Close" onClick={closeSwitcher}>
            <svg width="11" height="11" viewBox="0 0 11 11"><line x1="1" y1="1" x2="10" y2="10" stroke="currentColor" stroke-width="1.4" /><line x1="10" y1="1" x2="1" y2="10" stroke="currentColor" stroke-width="1.4" /></svg>
          </button>
        </div>

        <div class="nbsw-label">Recent Notebooks</div>
        <div class="nbsw-list">
          {recents.map(r => (
            <div
              key={r.path}
              class={'nbsw-item' + (r.path === currentPath ? ' nbsw-item--active' : '')}
              onClick={() => openNotebook(r.path)}
            >
              <img class="nbsw-icon" src="assets/icons/notebooks.svg" width="22" height="22" alt="" />
              <div class="nbsw-text">
                <div class="nbsw-name">{r.name}</div>
                <div class="nbsw-path">{truncPath(r.path)}</div>
              </div>
              {r.path === currentPath && <span class="nbsw-current">Current</span>}
            </div>
          ))}
          {recents.length === 0 && <div class="nbsw-empty">No recent notebooks.</div>}
        </div>

        <div class="nbsw-actions">
          <button class="nbsw-action" onClick={() => { closeSwitcher(); pickAndOpenNotebook(); }}>
            <img src="assets/icons/folder.svg" width="16" height="16" alt="" />
            <span>Open Other Notebook…</span>
          </button>
          <button class="nbsw-action" onClick={() => { closeSwitcher(); createAndOpenNotebook(); }}>
            <img src="assets/icons/plus.svg" width="16" height="16" alt="" />
            <span>Create New Notebook…</span>
          </button>
        </div>
      </div>
    </div>
  );
}
