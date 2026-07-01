import { signal } from '@preact/signals';
import { useRef, useEffect } from 'preact/hooks';
import { appState, getActivePage, addBlock, addImageFromFile, DEFAULT_BLOCK_WIDTH, uid, toggleSwitcher, findInTree } from './store.ts';
import { execFmt, setMarkAttr, setBlockAttr, indentBlocks, selectionFormat } from './editor.ts';
import type { JSX } from 'preact';

// ── Ribbon UI state (local, not persisted to the notebook) ──
export const activeRibbonTab = signal<string>('Home');
export const ribbonCollapsed = signal<boolean>(false);
// Which dropdown/popover is open ('color' | 'highlight' | 'font' | 'size' | null)
const openPicker = signal<string | null>(null);
// Screen-anchored position for the open dropdown. Dropdowns render position:fixed
// so they escape .ribbon-body's overflow:hidden (which was clipping them).
const pickerAnchor = signal<{ left: number; top: number; width: number }>({ left: 0, top: 0, width: 0 });

function togglePop(kind: string, e: MouseEvent): void {
  if (openPicker.value === kind) { openPicker.value = null; return; }
  const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
  pickerAnchor.value = { left: r.left, top: r.bottom, width: r.width };
  openPicker.value = kind;
}

function popStyle(): { position: 'fixed'; left: string; top: string; minWidth: string } {
  const a = pickerAnchor.value;
  return { position: 'fixed', left: a.left + 'px', top: (a.top + 1) + 'px', minWidth: a.width + 'px' };
}

const RIBBON_TABS = ['File', 'Home', 'Insert', 'Share', 'Draw', 'Review', 'View', 'Add-Ins'];

const FONT_FAMILIES = ['Calibri', 'Arial', 'Helvetica Neue', 'Georgia', 'Times New Roman', 'Courier New', 'Comic Sans MS', 'Verdana'];
const FONT_SIZES = ['8px', '9px', '10px', '11px', '12px', '14px', '16px', '18px', '20px', '24px', '28px', '36px', '48px', '72px'];
const TEXT_COLORS = [
  '#000000', '#434343', '#666666', '#999999', '#b7b7b7', '#cccccc', '#ffffff',
  '#e11d48', '#ea580c', '#d97706', '#ca8a04', '#16a34a', '#0891b2', '#2563eb', '#7c3aed', '#c026d3',
];
const HIGHLIGHT_COLORS = ['#fff3a3', '#ffd6a5', '#c8f7c5', '#b5e7ff', '#e0c3fc', '#ffc9de', '#d9d9d9', 'transparent'];

const isMac = typeof navigator !== 'undefined' && /Mac/.test(navigator.platform);

// ── Icon assets (SVGs live in core/assets/icons, symlinked to app/assets) ──
function Icon({ name, size = 16 }: { name: string; size?: number }): JSX.Element {
  return <img class="rbn-ico-img" src={`assets/icons/${name}.svg`} width={size} height={size} alt="" draggable={false} />;
}
function Caret(): JSX.Element {
  return <img class="rbn-caret" src="assets/icons/caret-down.svg" width="8" height="8" alt="" draggable={false} />;
}

// ── Share URL builder (moved from Canvas FormatToolbar) ──
async function buildShareUrl(): Promise<string | null> {
  const { ui, notebooks } = appState.value;
  const nb = notebooks.find(n => n.id === ui.notebookId);
  const sec = nb?.sections.find(s => s.id === ui.sectionId);
  const page = sec ? findInTree(sec.pages, ui.pageId) : null;
  if (!sec || !page) return null;
  const hash = `#!/${encodeURIComponent(sec.title)}/${encodeURIComponent(page.title)}/`;
  const qs = `?p=${page.id.slice(0, 6)}`;
  const base = window.__ghPagesUrl
    || (window.notebook?.getPublishUrl ? await window.notebook.getPublishUrl() : null)
    || (window.location ? window.location.origin + window.location.pathname : '');
  return base + hash + qs;
}

// ── Small building blocks ──────────────────────────────────

interface BtnProps {
  onClick?: (e: MouseEvent) => void;
  title?: string;
  disabled?: boolean;
  large?: boolean;
  active?: boolean;
  children: JSX.Element | string | (JSX.Element | string)[];
  draggable?: boolean;
  onDragStart?: (e: DragEvent) => void;
}

// Ribbon button. Uses onMouseDown+preventDefault so the focused block editor
// keeps its selection when a formatting command fires.
function RBtn({ onClick, title, disabled, large, active, children, draggable, onDragStart }: BtnProps): JSX.Element {
  return (
    <button
      class={['rbn-btn', large && 'rbn-btn--large', active && 'rbn-btn--active'].filter(Boolean).join(' ')}
      title={title}
      disabled={disabled}
      draggable={draggable}
      onDragStart={onDragStart}
      onMouseDown={(e: MouseEvent) => { if (!draggable) { e.preventDefault(); onClick?.(e); } }}
    >{children}</button>
  );
}

// Icon-only button (no text label) — for the compact formatting toggles.
function IBtn({ icon, title, active, onClick }: { icon: string; title: string; active?: boolean; onClick: () => void }): JSX.Element {
  return (
    <RBtn title={title} active={active} onClick={onClick}><Icon name={icon} /></RBtn>
  );
}

// Icon + text label button (OneNote small-command style).
function LBtn({ icon, label, title, disabled, onClick }: { icon: string; label: string; title: string; disabled?: boolean; onClick?: () => void }): JSX.Element {
  return (
    <RBtn title={title} disabled={disabled} onClick={onClick}>
      <Icon name={icon} /><span class="rbn-lbl-inline">{label}</span>
    </RBtn>
  );
}

function Group({ label, children, col }: { label: string; children: JSX.Element | (JSX.Element | false | null)[]; col?: boolean }): JSX.Element {
  return (
    <div class="rbn-group">
      <div class={'rbn-group-body' + (col ? ' rbn-group-body--col' : '')}>{children}</div>
      <div class="rbn-group-caption">{label}</div>
    </div>
  );
}

// Insert the current date/time as a new text block on the active page.
function insertDateTime(): void {
  const pg = getActivePage();
  let y = 60;
  if (pg?.blocks?.length) y = Math.max(...pg.blocks.map(b => b.y + 100)) + 40;
  const dateStr = new Date().toLocaleString(undefined, {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
  addBlock(0, y, DEFAULT_BLOCK_WIDTH, 'text', { html: `<p>${dateStr}</p>` });
}

function insertChecklist(): void {
  const pg = getActivePage();
  let y = 60;
  if (pg?.blocks?.length) y = Math.max(...pg.blocks.map(b => b.y + 100)) + 40;
  const itemId = uid();
  addBlock(0, y, DEFAULT_BLOCK_WIDTH, 'checklist', { items: [{ id: itemId, text: '', checked: false }] });
  requestAnimationFrame(() => {
    (document.querySelector(`[data-item-id="${itemId}"]`) as HTMLElement | null)?.focus();
  });
}

// ── Titlebar (drag region + search + window controls) ──────

function Titlebar(): JSX.Element {
  return (
    <div id="titlebar">
      <span class="toolbar-title">Notebound</span>
      {!isMac && (
        <div class="window-controls">
          <button class="wc-btn wc-minimize" onClick={() => window.windowControls!.minimize()} title="Minimize">
            <svg width="10" height="1" viewBox="0 0 10 1"><rect width="10" height="1" fill="currentColor" /></svg>
          </button>
          <button class="wc-btn wc-maximize" onClick={() => window.windowControls!.maximize()} title="Maximize">
            <svg width="10" height="10" viewBox="0 0 10 10"><rect x="0.5" y="0.5" width="9" height="9" fill="none" stroke="currentColor" stroke-width="1" /></svg>
          </button>
          <button class="wc-btn wc-close" onClick={() => window.windowControls!.close()} title="Close">
            <svg width="10" height="10" viewBox="0 0 10 10"><line x1="0" y1="0" x2="10" y2="10" stroke="currentColor" stroke-width="1.2" /><line x1="10" y1="0" x2="0" y2="10" stroke="currentColor" stroke-width="1.2" /></svg>
          </button>
        </div>
      )}
    </div>
  );
}

// ── Tab bodies ─────────────────────────────────────────────

// Colour palette popover, anchored under its ribbon button.
function ColorPopover({ kind }: { kind: 'color' | 'highlight' }): JSX.Element | null {
  if (openPicker.value !== kind) return null;
  const colors = kind === 'color' ? TEXT_COLORS : HIGHLIGHT_COLORS;
  const markName = kind === 'color' ? 'fontColor' : 'highlight';
  const pick = (c: string): void => {
    if (c === 'transparent') setMarkAttr(markName, null);
    else setMarkAttr(markName, { color: c });
    openPicker.value = null;
  };
  return (
    <div class="rbn-color-pop" style={popStyle()} onMouseDown={(e: MouseEvent) => e.preventDefault()}>
      <div class="rbn-swatch-grid">
        {colors.map(c => (
          <button
            key={c}
            class={'rbn-swatch' + (c === 'transparent' ? ' rbn-swatch--none' : '')}
            title={c === 'transparent' ? 'No colour' : c}
            style={c === 'transparent' ? undefined : { background: c }}
            onMouseDown={(e: MouseEvent) => { e.preventDefault(); pick(c); }}
          />
        ))}
      </div>
      <button class="rbn-color-clear" onMouseDown={(e: MouseEvent) => { e.preventDefault(); setMarkAttr(markName, null); openPicker.value = null; }}>
        {kind === 'color' ? 'Automatic' : 'No highlight'}
      </button>
    </div>
  );
}

function stepFontSize(dir: 1 | -1): void {
  const cur = selectionFormat.value.fontSize ?? '14px';
  let idx = FONT_SIZES.indexOf(cur);
  if (idx === -1) idx = FONT_SIZES.indexOf('14px');
  const ni = Math.max(0, Math.min(FONT_SIZES.length - 1, idx + dir));
  setMarkAttr('fontSize', { size: FONT_SIZES[ni] });
}

// OneNote-style font-name combo: bordered white field + caret + dropdown list,
// each option rendered in its own typeface.
function FontCombo(): JSX.Element {
  const cur = selectionFormat.value.fontFamily ?? 'Calibri';
  const open = openPicker.value === 'font';
  return (
    <div
      class={'rbn-combo rbn-combo--font' + (open ? ' rbn-combo--open' : '')}
      onMouseDown={(e: MouseEvent) => { e.preventDefault(); togglePop('font', e); }}
    >
      <span class="rbn-combo-val" style={{ fontFamily: cur }}>{cur}</span>
      <span class="rbn-combo-caret"><Caret /></span>
      {open && (
        <div class="rbn-combo-pop" style={popStyle()} onMouseDown={(e: MouseEvent) => e.stopPropagation()}>
          {FONT_FAMILIES.map(fam => (
            <button
              key={fam}
              class={'rbn-combo-opt' + (fam === cur ? ' is-sel' : '')}
              style={{ fontFamily: fam }}
              onMouseDown={(e: MouseEvent) => { e.preventDefault(); e.stopPropagation(); setMarkAttr('fontFamily', { family: fam }); openPicker.value = null; }}
            >{fam}</button>
          ))}
        </div>
      )}
    </div>
  );
}

// OneNote-style font-size combo.
function SizeCombo(): JSX.Element {
  const cur = selectionFormat.value.fontSize ?? '11px';
  const open = openPicker.value === 'size';
  return (
    <div
      class={'rbn-combo rbn-combo--size' + (open ? ' rbn-combo--open' : '')}
      onMouseDown={(e: MouseEvent) => { e.preventDefault(); togglePop('size', e); }}
    >
      <span class="rbn-combo-val">{parseInt(cur)}</span>
      <span class="rbn-combo-caret"><Caret /></span>
      {open && (
        <div class="rbn-combo-pop rbn-combo-pop--size" style={popStyle()} onMouseDown={(e: MouseEvent) => e.stopPropagation()}>
          {FONT_SIZES.map(s => (
            <button
              key={s}
              class={'rbn-combo-opt' + (s === cur ? ' is-sel' : '')}
              onMouseDown={(e: MouseEvent) => { e.preventDefault(); e.stopPropagation(); setMarkAttr('fontSize', { size: s }); openPicker.value = null; }}
            >{parseInt(s)}</button>
          ))}
        </div>
      )}
    </div>
  );
}

function HomeTab({ fileInputRef }: { fileInputRef: preact.RefObject<HTMLInputElement> }): JSX.Element {
  const f = selectionFormat.value; // reactive: drives active-button states
  const align = f.align || 'left';
  return (
    <>
      <Group label="Clipboard">
        <RBtn large title="Paste" onClick={() => { try { document.execCommand('paste'); } catch {} }}>
          <Icon name="paste" size={22} /><span class="rbn-lbl">Paste</span>
        </RBtn>
        <div class="rbn-col">
          <LBtn icon="cut" label="Cut" title="Cut" onClick={() => { try { document.execCommand('cut'); } catch {} }} />
          <LBtn icon="copy" label="Copy" title="Copy" onClick={() => { try { document.execCommand('copy'); } catch {} }} />
          <LBtn icon="format-painter" label="Format Painter" title="Format Painter (coming soon)" disabled />
        </div>
      </Group>

      <Group label="Basic Text" col>
        <div class="rbn-row">
          <FontCombo />
          <SizeCombo />
          <IBtn icon="grow-font" title="Grow font" onClick={() => stepFontSize(1)} />
          <IBtn icon="shrink-font" title="Shrink font" onClick={() => stepFontSize(-1)} />
        </div>
        <div class="rbn-row">
          <IBtn icon="bold" title="Bold (Ctrl+B)" active={f.bold} onClick={() => execFmt('bold')} />
          <IBtn icon="italic" title="Italic (Ctrl+I)" active={f.italic} onClick={() => execFmt('italic')} />
          <IBtn icon="underline" title="Underline (Ctrl+U)" active={f.underline} onClick={() => execFmt('underline')} />
          <IBtn icon="strikethrough" title="Strikethrough" active={f.strikethrough} onClick={() => execFmt('strikethrough')} />
          <IBtn icon="subscript" title="Subscript (Ctrl+,)" active={f.subscript} onClick={() => execFmt('subscript')} />
          <IBtn icon="superscript" title="Superscript (Ctrl+.)" active={f.superscript} onClick={() => execFmt('superscript')} />
          <span class="rbn-color-wrap">
            <RBtn title="Text colour" onClick={(e: MouseEvent) => togglePop('color', e)}>
              <Icon name="font-color" /><Caret />
            </RBtn>
            <ColorPopover kind="color" />
          </span>
          <span class="rbn-color-wrap">
            <RBtn title="Highlight" active={!!f.highlight} onClick={(e: MouseEvent) => togglePop('highlight', e)}>
              <Icon name="highlight" /><Caret />
            </RBtn>
            <ColorPopover kind="highlight" />
          </span>
        </div>
        <div class="rbn-row">
          <IBtn icon="bullet-list" title="Bullet list" onClick={() => execFmt('ul')} />
          <IBtn icon="numbered-list" title="Numbered list" onClick={() => execFmt('ol')} />
          <span class="rbn-sep" />
          <IBtn icon="indent-decrease" title="Decrease indent" onClick={() => indentBlocks(-1)} />
          <IBtn icon="indent-increase" title="Increase indent" onClick={() => indentBlocks(1)} />
          <span class="rbn-sep" />
          <IBtn icon="align-left" title="Align left" active={align === 'left'} onClick={() => setBlockAttr('align', 'left')} />
          <IBtn icon="align-center" title="Align centre" active={align === 'center'} onClick={() => setBlockAttr('align', 'center')} />
          <IBtn icon="align-right" title="Align right" active={align === 'right'} onClick={() => setBlockAttr('align', 'right')} />
          <IBtn icon="link" title="Link / Unlink (Ctrl+K)" active={f.link} onClick={() => execFmt('link')} />
        </div>
      </Group>

      <Group label="Styles">
        <div class="rbn-style-gallery">
          <button class={'rbn-style-item rbn-style-item--h1' + (f.heading === 1 ? ' is-active' : '')}
            title="Heading 1" onMouseDown={(e: MouseEvent) => { e.preventDefault(); execFmt('h1'); }}>Heading 1</button>
          <button class={'rbn-style-item rbn-style-item--h2' + (f.heading === 2 ? ' is-active' : '')}
            title="Heading 2" onMouseDown={(e: MouseEvent) => { e.preventDefault(); execFmt('h2'); }}>Heading 2</button>
          <button class={'rbn-style-item rbn-style-item--h3' + (f.heading === 3 ? ' is-active' : '')}
            title="Heading 3" onMouseDown={(e: MouseEvent) => { e.preventDefault(); execFmt('h3'); }}>Heading 3</button>
          <button class={'rbn-style-item rbn-style-item--p' + (f.active && f.heading === null ? ' is-active' : '')}
            title="Normal text" onMouseDown={(e: MouseEvent) => { e.preventDefault(); execFmt('p'); }}>Normal</button>
        </div>
      </Group>

      <Group label="Tags">
        <div class="rbn-tag-gallery">
          {/* To Do inserts a checklist. Important/Question are visual placeholders
              until per-block tag markers land (Phase 4); they insert a checklist for now. */}
          <button class="rbn-tag-item" title="To Do (Ctrl+1)" onMouseDown={(e: MouseEvent) => { e.preventDefault(); insertChecklist(); }}>
            <Icon name="tag-todo" /><span>To Do</span>
          </button>
          <button class="rbn-tag-item" title="Important (Ctrl+2)" onMouseDown={(e: MouseEvent) => { e.preventDefault(); insertChecklist(); }}>
            <Icon name="tag-important" /><span>Important</span>
          </button>
          <button class="rbn-tag-item" title="Question (Ctrl+3)" onMouseDown={(e: MouseEvent) => { e.preventDefault(); insertChecklist(); }}>
            <Icon name="tag-question" /><span>Question</span>
          </button>
        </div>
      </Group>

      <Group label="Notebound">
        <LBtn icon="notebooks" label="Notebooks" title="Switch notebook" onClick={() => toggleSwitcher()} />
        <RBtn title="Drag onto the canvas to chat with Claude" draggable
          onDragStart={(e: DragEvent) => { e.dataTransfer!.setData('application/x-notebound-claude', '1'); }}>
          <Icon name="claude" /><span class="rbn-lbl-inline">Claude</span>
        </RBtn>
      </Group>
    </>
  );
}

function InsertTab({ fileInputRef }: { fileInputRef: preact.RefObject<HTMLInputElement> }): JSX.Element {
  return (
    <>
      <Group label="Images">
        <RBtn large title="Insert a picture from a file" onClick={() => fileInputRef.current?.click()}>
          <Icon name="picture" size={22} /><span class="rbn-lbl">Picture</span>
        </RBtn>
      </Group>
      <Group label="Links">
        <LBtn icon="link" label="Link" title="Link / Unlink selection (Ctrl+K)" onClick={() => execFmt('link')} />
      </Group>
      <Group label="Lists">
        <LBtn icon="tag-todo" label="Checklist" title="Insert a checklist" onClick={insertChecklist} />
      </Group>
      <Group label="Time Stamp">
        <LBtn icon="datetime" label="Date & Time" title="Insert the current date & time" onClick={insertDateTime} />
      </Group>
    </>
  );
}

function ShareTab(): JSX.Element {
  const canPublish = !!window.notebook?.webPublish;
  if (!canPublish) {
    return <div class="rbn-empty">Publishing is not available for this notebook.</div>;
  }
  const doShare = (e: MouseEvent): void => {
    buildShareUrl().then(url => {
      if (!url) return;
      navigator.clipboard.writeText(url).then(() => {
        const btn = e.currentTarget as HTMLButtonElement;
        const orig = btn.textContent; btn.textContent = 'Copied!';
        setTimeout(() => { btn.textContent = orig; }, 1500);
      });
    });
  };
  return (
    <>
      <Group label="Web">
        <RBtn large title="Publish this notebook to the web" onClick={async () => {
          try { await window.notebook.webPublish!(); } catch (err) { console.error('Publish failed:', err); }
        }}>
          <Icon name="publish" size={22} /><span class="rbn-lbl">Publish</span>
        </RBtn>
        <div class="rbn-col">
          <LBtn icon="open-site" label="Open Site" title="Open the published site" onClick={async () => {
            const url = await buildShareUrl(); if (url) window.notebook.openExternal(url);
          }} />
          <LBtn icon="folder" label="Folder" title="Open the export folder on disk" onClick={() => window.notebook.webOpenDir!()} />
          <RBtn title="Copy a link to this page" onClick={doShare}><Icon name="link" /><span class="rbn-lbl-inline">Copy Link</span></RBtn>
        </div>
      </Group>
    </>
  );
}

function ViewTab(): JSX.Element {
  const zoom = (dir: 'in' | 'out' | 'reset'): void => {
    window.dispatchEvent(new CustomEvent('notebound:zoom', { detail: dir }));
  };
  return (
    <>
      <Group label="Zoom">
        <LBtn icon="zoom-in" label="Zoom In" title="Zoom in" onClick={() => zoom('in')} />
        <LBtn icon="zoom-out" label="Zoom Out" title="Zoom out" onClick={() => zoom('out')} />
        <LBtn icon="zoom-reset" label="100%" title="Reset zoom to 100%" onClick={() => zoom('reset')} />
      </Group>
      <Group label="Ribbon">
        <LBtn icon="collapse" label="Collapse" title="Minimize the ribbon" onClick={() => { ribbonCollapsed.value = true; }} />
      </Group>
    </>
  );
}

function FileTab(): JSX.Element {
  return (
    <>
      <Group label="Notebook">
        <RBtn large title="Open or create a notebook" onClick={() => toggleSwitcher()}>
          <Icon name="notebooks" size={22} /><span class="rbn-lbl">Notebooks</span>
        </RBtn>
      </Group>
    </>
  );
}

function PlaceholderTab({ name }: { name: string }): JSX.Element {
  return <div class="rbn-empty">{name} tools are coming soon.</div>;
}

// ── Ribbon root ────────────────────────────────────────────

export function Ribbon(): JSX.Element {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const tab = activeRibbonTab.value;
  const collapsed = ribbonCollapsed.value;

  // Close colour popovers on outside-click / Escape.
  useEffect(() => {
    function onDown(e: MouseEvent): void {
      if (!(e.target as HTMLElement).closest('.rbn-color-wrap, .rbn-combo')) openPicker.value = null;
    }
    function onKey(e: KeyboardEvent): void { if (e.key === 'Escape') openPicker.value = null; }
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); };
  }, []);

  return (
    <>
      <Titlebar />
      <div id="ribbon" class={collapsed ? 'ribbon--collapsed' : ''}>
        <div class="ribbon-tabstrip">
          {RIBBON_TABS.map(t => (
            <button
              key={t}
              class={['ribbon-tab', t === tab && 'ribbon-tab--active', t === 'File' && 'ribbon-tab--file'].filter(Boolean).join(' ')}
              onMouseDown={(e: MouseEvent) => {
                e.preventDefault();
                if (collapsed) ribbonCollapsed.value = false;
                activeRibbonTab.value = t;
              }}
            >{t}</button>
          ))}
          <div style="flex:1" />
          <button
            class="ribbon-collapse"
            title={collapsed ? 'Expand the ribbon' : 'Minimize the ribbon'}
            onMouseDown={(e: MouseEvent) => { e.preventDefault(); ribbonCollapsed.value = !collapsed; }}
          >
            <img class={'rbn-collapse-ico' + (collapsed ? ' is-collapsed' : '')} src="assets/icons/collapse.svg" width="12" height="12" alt="" />
          </button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          style={{ display: 'none' }}
          onChange={(e: Event) => {
            const input = e.target as HTMLInputElement;
            const files = [...(input.files || [])].filter(f => f.type.startsWith('image/'));
            const pg = getActivePage();
            let y = 60;
            if (pg?.blocks?.length) y = Math.max(...pg.blocks.map(b => b.y + 100)) + 40;
            files.forEach((f, i) => addImageFromFile(f, 40 + i * 20, y + i * 20));
            input.value = '';
          }}
        />
        {!collapsed && (
          <div class="ribbon-body">
            {tab === 'File' && <FileTab />}
            {tab === 'Home' && <HomeTab fileInputRef={fileInputRef} />}
            {tab === 'Insert' && <InsertTab fileInputRef={fileInputRef} />}
            {tab === 'Share' && <ShareTab />}
            {tab === 'View' && <ViewTab />}
            {tab === 'Draw' && <PlaceholderTab name="Draw" />}
            {tab === 'Review' && <PlaceholderTab name="Review" />}
            {tab === 'Add-Ins' && <PlaceholderTab name="Add-Ins" />}
          </div>
        )}
      </div>
    </>
  );
}
