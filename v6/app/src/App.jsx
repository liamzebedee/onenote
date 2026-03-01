import { useState, useEffect } from 'preact/hooks';
import { appState, connected, initializing, getActivePage, findInTree, setActiveSection, setActivePage, preloadPages, getPreloadCandidates } from './store.js';
import { NotebookBar } from './NotebookBar.jsx';
import { SectionPanel } from './SectionPanel.jsx';
import { PagesPanel } from './PagesPanel.jsx';
import { Canvas, FormatToolbar } from './Canvas.jsx';
import { ContextMenu } from './ContextMenu.jsx';
import { WelcomeScreen } from './WelcomeScreen.jsx';
import { NotebookSwitcher } from './NotebookSwitcher.jsx';
import { LinkContextMenu } from './Block.jsx';
import { ClaudeChat } from './ClaudeChat.jsx';
import { QuickJump } from './QuickJump.jsx';

// macOS uses Cmd alone; Linux/Windows uses Ctrl+Shift
const isMac = typeof navigator !== 'undefined' && /Mac/.test(navigator.platform);
function isNavMod(e) {
  if (isMac) return e.metaKey && !e.ctrlKey && !e.altKey && !e.shiftKey;
  return e.ctrlKey && e.shiftKey && !e.metaKey && !e.altKey;
}

function flatPages(pages) {
  const out = [];
  for (const p of pages) {
    out.push(p);
    if (p.children?.length) out.push(...flatPages(p.children));
  }
  return out;
}

export function App() {
  const [showJump, setShowJump] = useState(false);

  // Preload neighbouring pages once the app is idle after initial render
  useEffect(() => {
    const id = requestIdleCallback(() => preloadPages(getPreloadCandidates()), { timeout: 2000 });
    return () => cancelIdleCallback(id);
  }, [connected.value]);

  useEffect(() => {
    function onKey(e) {
      const editing = e.target.isContentEditable
        || e.target.tagName === 'INPUT'
        || e.target.tagName === 'TEXTAREA';

      // Cmd+K / Ctrl+Shift+K: quick jump (works even when editing is false)
      if (!editing && isNavMod(e) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        setShowJump(v => !v);
        return;
      }

      // Remaining nav shortcuts only fire when not editing text
      if (editing) return;
      if (!isNavMod(e)) return;

      const { ui, notebooks } = appState.value;
      const nb = notebooks.find(n => n.id === ui.notebookId);
      if (!nb) return;

      // Cmd+Left / Cmd+Right: previous / next section
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        const dir = e.key === 'ArrowLeft' ? -1 : 1;
        const idx = nb.sections.findIndex(s => s.id === ui.sectionId);
        const next = nb.sections[idx + dir];
        if (next) setActiveSection(next.id);
        return;
      }

      // Cmd+Up / Cmd+Down: previous / next page (flat order, respects tree)
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        const sec = nb.sections.find(s => s.id === ui.sectionId);
        if (!sec) return;
        const flat = flatPages(sec.pages);
        const idx = flat.findIndex(p => p.id === ui.pageId);
        const dir = e.key === 'ArrowUp' ? -1 : 1;
        const next = flat[idx + dir];
        if (next) setActivePage(next.id);
        return;
      }
    }

    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  if (initializing.value) return null;
  if (!connected.value) return <WelcomeScreen />;

  const state = appState.value;
  const { notebooks, ui } = state;
  const nb = notebooks.find(n => n.id === ui.notebookId);
  const sec = nb?.sections.find(s => s.id === ui.sectionId);
  const page = sec ? findInTree(sec.pages, ui.pageId) : null;

  const SECTION_COLORS = [
    '#fce4b8', '#b8d4f0', '#c8e6c0', '#f0c0c0',
    '#d8c8f0', '#f0d8b0', '#b8e0e0', '#f0c8e0',
  ];
  const secIdx = nb?.sections.findIndex(s => s.id === ui.sectionId) ?? 0;
  const sectionColor = nb ? SECTION_COLORS[secIdx % SECTION_COLORS.length] : '#e8e8e8';

  return (
    <>
      <FormatToolbar />
      <SectionPanel />
      <div id="body-row">
        <NotebookBar />
        <div id="section-desk" style={{ background: sectionColor }}>
          <div id="canvas-area">
            <Canvas page={page} />
          </div>
          <PagesPanel />
        </div>
      </div>
      <ContextMenu />
      <NotebookSwitcher />
      <LinkContextMenu />
      <ClaudeChat />
      {showJump && <QuickJump onClose={() => setShowJump(false)} />}
    </>
  );
}
