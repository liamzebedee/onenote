import { signal } from '@preact/signals';
import { useEffect, useRef, useState } from 'preact/hooks';
import type { JSX } from 'preact';
import type { MenuItem, MenuItemRename, MenuItemConfirm, MenuItemSubmenu, ContextMenuState } from './types.ts';

// ── Global context menu state ────────────────────────────
export const contextMenu = signal<ContextMenuState | null>(null);

export function openContextMenu(x: number, y: number, items: MenuItem[]): void {
  contextMenu.value = { x, y, items };
}

export function closeContextMenu(): void {
  contextMenu.value = null;
}

export function openRenameMenu(x: number, y: number, currentName: string, onRename: (newName: string) => void): void {
  contextMenu.value = {
    x, y,
    items: [{ type: 'rename', value: currentName, action: onRename }],
  };
}

// ── Component ────────────────────────────────────────────
export function ContextMenu(): JSX.Element | null {
  const menu = contextMenu.value;
  const ref = useRef<HTMLDivElement>(null);
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const [renameVal, setRenameVal] = useState<string>('');
  const renameRef = useRef<HTMLInputElement>(null);

  // Reset confirm state when menu changes
  useEffect(() => {
    setConfirmId(null);
    if (menu) {
      const renameItem = menu.items.find(i => i.type === 'rename') as MenuItemRename | undefined;
      if (renameItem) setRenameVal(renameItem.value || '');
    }
  }, [menu]);

  // Focus rename input
  useEffect(() => {
    if (menu && renameRef.current) {
      renameRef.current.focus();
      renameRef.current.select();
    }
  }, [menu]);

  // Close on outside click, escape, scroll
  useEffect(() => {
    if (!menu) return;
    function onDown(e: MouseEvent): void {
      if (ref.current && !ref.current.contains(e.target as Node)) closeContextMenu();
    }
    function onKey(e: KeyboardEvent): void {
      if (e.key === 'Escape') closeContextMenu();
    }
    function onScroll(): void { closeContextMenu(); }
    document.addEventListener('mousedown', onDown, true);
    document.addEventListener('keydown', onKey);
    window.addEventListener('scroll', onScroll, true);
    return () => {
      document.removeEventListener('mousedown', onDown, true);
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('scroll', onScroll, true);
    };
  }, [menu]);

  if (!menu) return null;

  // Clamp position to viewport
  const menuW = 200, menuH = menu.items.length * 32 + 8;
  const x = Math.min(menu.x, window.innerWidth - menuW - 4);
  const y = Math.min(menu.y, window.innerHeight - menuH - 4);

  function handleRenameSubmit(item: MenuItemRename): void {
    const v = renameVal.trim();
    if (v && v !== item.value) item.action(v);
    closeContextMenu();
  }

  return (
    <div class="context-menu" ref={ref} style={{ left: x + 'px', top: y + 'px' }} onMouseDown={(e: MouseEvent) => e.preventDefault()}>
      {menu.items.map((item, i) => {
        if (item.type === 'separator') {
          return <div key={i} class="context-menu-separator" />;
        }

        if (item.type === 'rename') {
          return (
            <div key={i} class="context-menu-rename">
              <input
                ref={renameRef}
                class="context-menu-input"
                value={renameVal}
                onInput={(e: Event) => setRenameVal((e.target as HTMLInputElement).value)}
                onKeyDown={(e: KeyboardEvent) => {
                  if (e.key === 'Enter') handleRenameSubmit(item);
                  if (e.key === 'Escape') closeContextMenu();
                }}
              />
              <button class="context-menu-rename-ok" onClick={() => handleRenameSubmit(item)}>✓</button>
            </div>
          );
        }

        if (item.type === 'confirm') {
          const confirmItem = item as MenuItemConfirm;
          const isConfirming = confirmId === i;
          return (
            <div
              key={i}
              class={`context-menu-item ${isConfirming ? 'context-menu-item--danger' : ''}`}
              onClick={() => {
                if (isConfirming) { confirmItem.action(); closeContextMenu(); }
                else setConfirmId(i);
              }}
            >
              {isConfirming ? (confirmItem.confirmLabel || 'Confirm delete?') : confirmItem.label}
            </div>
          );
        }

        if (item.type === 'submenu') {
          const submenuItem = item as MenuItemSubmenu;
          return (
            <div key={i} class="context-menu-item context-menu-submenu">
              <span>{submenuItem.label}</span>
              <span class="context-menu-arrow">▸</span>
              <div class="context-menu-sub">
                {submenuItem.children.map((child, j) => (
                  <div key={j} class="context-menu-item" onClick={() => { child.action(); closeContextMenu(); }}>
                    {child.label}
                  </div>
                ))}
              </div>
            </div>
          );
        }

        // Normal item (possibly disabled)
        if (item.disabled) {
          return (
            <div key={i} class="context-menu-item context-menu-item--disabled">
              {item.label}
            </div>
          );
        }
        return (
          <div key={i} class="context-menu-item" onClick={() => { item.action(); closeContextMenu(); }}>
            {item.label}
          </div>
        );
      })}
    </div>
  );
}
