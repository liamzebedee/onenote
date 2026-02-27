import { appState, getActivePage, findInTree } from './store.js';
import { NotebookBar } from './NotebookBar.jsx';
import { SectionPanel } from './SectionPanel.jsx';
import { PagesPanel } from './PagesPanel.jsx';
import { Canvas } from './Canvas.jsx';

export function App() {
  const state = appState.value;
  const { notebooks, ui } = state;
  const nb = notebooks.find(n => n.id === ui.notebookId);
  const sec = nb?.sections.find(s => s.id === ui.sectionId);
  const page = sec ? findInTree(sec.pages, ui.pageId) : null;

  return (
    <>
      <NotebookBar />
      <div id="main">
        <SectionPanel />
        <PagesPanel />
        <div id="canvas-area">
          <Canvas page={page} />
        </div>
      </div>
    </>
  );
}
