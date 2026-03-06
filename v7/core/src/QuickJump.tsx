import { useState, useEffect, useLayoutEffect, useRef } from 'preact/hooks';
import { appState, jumpToPage } from './store.ts';
import type { JSX } from 'preact';
import type { Page } from './types.ts';

interface FlatPage {
  pageId: string;
  pageTitle: string;
  sectionId: string;
  sectionTitle: string;
}

function flattenPages(pages: Page[], sectionId: string, sectionTitle: string): FlatPage[] {
  const out: FlatPage[] = [];
  for (const p of pages) {
    out.push({ pageId: p.id, pageTitle: p.title, sectionId, sectionTitle });
    if (p.children?.length) out.push(...flattenPages(p.children, sectionId, sectionTitle));
  }
  return out;
}

interface QuickJumpProps {
  onClose: () => void;
}

export function QuickJump({ onClose }: QuickJumpProps): JSX.Element {
  const { notebooks, ui } = appState.value;
  const nb = notebooks.find(n => n.id === ui.notebookId);

  const allPages: FlatPage[] = [];
  if (nb) {
    for (const sec of nb.sections) {
      allPages.push(...flattenPages(sec.pages, sec.id, sec.title));
    }
  }

  const [query, setQuery] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const q = query.trim().toLowerCase();
  const results = q
    ? allPages.filter(r =>
        r.pageTitle.toLowerCase().includes(q) ||
        r.sectionTitle.toLowerCase().includes(q)
      )
    : allPages;

  // Default highlight: current page (or 0)
  const initIdx = allPages.findIndex(r => r.pageId === ui.pageId);
  const [activeIdx, setActiveIdx] = useState<number>(Math.max(0, initIdx));
  const clampedIdx = Math.min(activeIdx, results.length - 1);

  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(() => { setActiveIdx(0); }, [query]);

  // Scroll active result into view
  useLayoutEffect(() => {
    listRef.current?.children[clampedIdx]?.scrollIntoView({ block: 'nearest' });
  }, [clampedIdx]);

  // Scroll to current page on open (before any query)
  useLayoutEffect(() => {
    if (!q) listRef.current?.children[clampedIdx]?.scrollIntoView({ block: 'center' });
  }, []);

  function select(result: FlatPage): void {
    jumpToPage(result.sectionId, result.pageId);
    onClose();
  }

  function handleKeyDown(e: KeyboardEvent): void {
    if (e.key === 'Escape') { e.preventDefault(); onClose(); return; }
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx(i => Math.min(i + 1, results.length - 1)); return; }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setActiveIdx(i => Math.max(i - 1, 0)); return; }
    if (e.key === 'Enter' && results[clampedIdx]) { e.preventDefault(); select(results[clampedIdx]); return; }
  }

  return (
    <div class="qj-overlay" onMouseDown={(e: MouseEvent) => { if (e.target === e.currentTarget) onClose(); }}>
      <div class="qj-modal">
        <input
          ref={inputRef}
          class="qj-input"
          placeholder="Jump to page…"
          value={query}
          onInput={(e: Event) => setQuery((e.target as HTMLInputElement).value)}
          onKeyDown={handleKeyDown}
        />
        <div ref={listRef} class="qj-list">
          {results.map((r, i) => (
            <div
              key={r.pageId}
              class={['qj-item', i === clampedIdx && 'qj-item--active'].filter(Boolean).join(' ')}
              onMouseDown={() => select(r)}
              onMouseEnter={() => setActiveIdx(i)}
            >
              <span class="qj-section">{r.sectionTitle}</span>
              <span class="qj-sep">›</span>
              <span class="qj-title">{r.pageTitle}</span>
            </div>
          ))}
          {results.length === 0 && <div class="qj-empty">No pages found</div>}
        </div>
      </div>
    </div>
  );
}
