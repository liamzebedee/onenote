import { useEffect, useRef } from 'preact/hooks';
import { showSwitcher, closeSwitcher, recentNotebooks, openNotebook, pickAndOpenNotebook, createAndOpenNotebook } from './store.ts';
import type { JSX } from 'preact';

export function NotebookSwitcher(): JSX.Element | null {
  if (!showSwitcher.value) return null;

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent): void => {
      if (ref.current && !ref.current.contains(e.target as Node)) closeSwitcher();
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const recents = recentNotebooks.value;

  const truncPath = (p: string): string => {
    const home = p.replace(/^\/home\/[^/]+/, '~');
    return home.length > 50 ? '...' + home.slice(-47) : home;
  };

  return (
    <div class="notebook-switcher" ref={ref}>
      {recents.length > 0 && (
        <>
          <div class="notebook-switcher-header">Recent Notebooks</div>
          {recents.map(r => (
            <div
              key={r.path}
              class="notebook-switcher-item"
              onClick={() => openNotebook(r.path)}
            >
              <div class="notebook-switcher-item-name">{r.name}</div>
              <div class="notebook-switcher-item-path">{truncPath(r.path)}</div>
            </div>
          ))}
          <div class="notebook-switcher-sep" />
        </>
      )}
      <div class="notebook-switcher-item" onClick={() => { closeSwitcher(); pickAndOpenNotebook(); }}>
        Open Existing Notebook...
      </div>
      <div class="notebook-switcher-item" onClick={() => { closeSwitcher(); createAndOpenNotebook(); }}>
        Create New Notebook...
      </div>
    </div>
  );
}
