import { createAndOpenNotebook, pickAndOpenNotebook, openNotebook, recentNotebooks } from './store.js';

const truncPath = (p) => {
  const home = p.replace(/^\/Users\/[^/]+/, '~').replace(/^\/home\/[^/]+/, '~');
  return home.length > 48 ? '...' + home.slice(-45) : home;
};

export function WelcomeScreen() {
  const recents = recentNotebooks.value;

  return (
    <div class="welcome-overlay">
      <div class="welcome-card">
        <h1 class="welcome-title">Notebound</h1>
        <p class="welcome-subtitle">{recents.length > 0 ? 'Open a notebook to get started' : 'Choose how to get started'}</p>
        <div class="welcome-list">
          {recents.map(r => (
            <div key={r.path} class="welcome-list-item welcome-list-item--notebook" onClick={() => openNotebook(r.path)}>
              <div class="welcome-list-item-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="2" y="2" width="12" height="12" rx="2" fill="var(--active-color)" opacity="0.15"/>
                  <rect x="2" y="2" width="12" height="12" rx="2" stroke="var(--active-color)" stroke-width="1.2"/>
                  <line x1="5" y1="5.5" x2="11" y2="5.5" stroke="var(--active-color)" stroke-width="1" stroke-linecap="round"/>
                  <line x1="5" y1="8" x2="11" y2="8" stroke="var(--active-color)" stroke-width="1" stroke-linecap="round"/>
                  <line x1="5" y1="10.5" x2="9" y2="10.5" stroke="var(--active-color)" stroke-width="1" stroke-linecap="round"/>
                </svg>
              </div>
              <div class="welcome-list-item-text">
                <div class="welcome-list-item-name">{r.name}</div>
                <div class="welcome-list-item-path">{truncPath(r.path)}</div>
              </div>
            </div>
          ))}
          {recents.length > 0 && <div class="welcome-list-sep" />}
          <div class="welcome-list-item welcome-list-item--action" onClick={pickAndOpenNotebook}>
            Open Existing Notebook...
          </div>
          <div class="welcome-list-item welcome-list-item--action" onClick={createAndOpenNotebook}>
            Create New Notebook...
          </div>
        </div>
      </div>
    </div>
  );
}
