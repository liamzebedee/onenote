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
        {recents.length > 0 ? (
          <>
            <p class="welcome-subtitle">Recent notebooks</p>
            <div class="welcome-recents">
              {recents.map(r => (
                <div key={r.path} class="welcome-recent-item" onClick={() => openNotebook(r.path)}>
                  <div class="welcome-recent-name">{r.name}</div>
                  <div class="welcome-recent-path">{truncPath(r.path)}</div>
                </div>
              ))}
            </div>
            <div class="welcome-sep" />
          </>
        ) : (
          <p class="welcome-subtitle">Choose how to get started</p>
        )}
        <div class="welcome-buttons">
          <button class="welcome-btn welcome-btn--primary" onClick={createAndOpenNotebook}>
            Create New Notebook
          </button>
          <button class="welcome-btn welcome-btn--secondary" onClick={pickAndOpenNotebook}>
            Open Existing Notebook
          </button>
        </div>
      </div>
    </div>
  );
}
