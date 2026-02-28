import { createAndOpenNotebook, pickAndOpenNotebook } from './store.js';

export function WelcomeScreen() {
  return (
    <div class="welcome-overlay">
      <div class="welcome-card">
        <h1 class="welcome-title">Notebound</h1>
        <p class="welcome-subtitle">Choose how to get started</p>
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
