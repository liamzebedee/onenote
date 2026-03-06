import { useState, useEffect } from 'preact/hooks';
import { appState, connected, initializing, editingEnabled, getActivePage, findInTree, setActiveSection, setActivePage, preloadPages, getPreloadCandidates } from './store.ts';
import { NotebookBar } from './NotebookBar.tsx';
import { SectionPanel } from './SectionPanel.tsx';
import { PagesPanel } from './PagesPanel.tsx';
import { Canvas, FormatToolbar } from './Canvas.tsx';
import { ContextMenu } from './ContextMenu.tsx';
import { WelcomeScreen } from './WelcomeScreen.tsx';
import { NotebookSwitcher } from './NotebookSwitcher.tsx';
import { LinkContextMenu } from './Block.tsx';
import { ClaudeChat } from './ClaudeChat.tsx';
import { DisplayPanel } from './DisplayPanel.tsx';
import { QuickJump } from './QuickJump.tsx';
import type { Page } from './types.ts';
import type { JSX } from 'preact';

// macOS uses Cmd alone; Linux/Windows uses Ctrl+Shift
const isMac = typeof navigator !== 'undefined' && /Mac/.test(navigator.platform);
function isNavMod(e: KeyboardEvent): boolean {
  if (isMac) return e.metaKey && !e.ctrlKey && !e.altKey && !e.shiftKey;
  return e.ctrlKey && e.shiftKey && !e.metaKey && !e.altKey;
}

function flatPages(pages: Page[]): Page[] {
  const out: Page[] = [];
  for (const p of pages) {
    out.push(p);
    if (p.children?.length) out.push(...flatPages(p.children));
  }
  return out;
}

function BrandHeader(): JSX.Element {
  return (
    <div id="brand-header">
      <img class="brand-icon" src="icon.svg" alt="" />
      <span class="brand-name">Notebound</span>
      <span class="brand-sep">—</span>
      <span class="brand-tagline">enjoy colour again</span>
    </div>
  );
}

export function App(): JSX.Element | null {
  const [showJump, setShowJump] = useState<boolean>(false);

  // Preload neighbouring pages once the app is idle after initial render
  useEffect(() => {
    const id = requestIdleCallback(() => preloadPages(getPreloadCandidates()), { timeout: 2000 });
    return () => cancelIdleCallback(id);
  }, [connected.value]);

  useEffect(() => {
    function onKey(e: KeyboardEvent): void {
      const target = e.target as HTMLElement;
      const editing = target.isContentEditable
        || target.tagName === 'INPUT'
        || target.tagName === 'TEXTAREA';

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

  const editing = editingEnabled.value;

  return (
    <>
      {editing && <FormatToolbar />}
      <SectionPanel />
      <div id="body-row">
        {editing && <NotebookBar />}
        <div id="section-desk" style={{ background: sectionColor }}>
          <div id="canvas-area">
            <Canvas page={page} />
          </div>
          <PagesPanel />
        </div>
      </div>
      <ContextMenu />
      {editing && <NotebookSwitcher />}
      <LinkContextMenu />
      {editing && <ClaudeChat />}
      {editing && <DisplayPanel />}
      {showJump && <QuickJump onClose={() => setShowJump(false)} />}
    </>
  );
}
