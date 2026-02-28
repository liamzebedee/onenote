import { signal } from '@preact/signals';
import { useEffect, useRef, useState } from 'preact/hooks';

// ── Global context menu state ────────────────────────────
export const contextMenu = signal(null);
// Shape: { x, y, items: [{ label, action, type?, confirmLabel? }] }
// type: 'separator' | 'rename' | 'confirm' | 'submenu' | undefined (normal)

export function openContextMenu(x, y, items) {
  contextMenu.value = { x, y, items };
}

export function closeContextMenu() {
  contextMenu.value = null;
}

export function openRenameMenu(x, y, currentName, onRename) {
  contextMenu.value = {
    x, y,
    items: [{ type: 'rename', value: currentName, action: onRename }],
  };
}

// ── Component ────────────────────────────────────────────
export function ContextMenu() {
  const menu = contextMenu.value;
  const ref = useRef(null);
  const [confirmId, setConfirmId] = useState(null);
  const [renameVal, setRenameVal] = useState('');
  const renameRef = useRef(null);

  // Reset confirm state when menu changes
  useEffect(() => {
    setConfirmId(null);
    if (menu) {
      const renameItem = menu.items.find(i => i.type === 'rename');
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
    function onDown(e) {
      if (ref.current && !ref.current.contains(e.target)) closeContextMenu();
    }
    function onKey(e) {
      if (e.key === 'Escape') closeContextMenu();
    }
    function onScroll() { closeContextMenu(); }
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

  function handleRenameSubmit(item) {
    const v = renameVal.trim();
    if (v && v !== item.value) item.action(v);
    closeContextMenu();
  }

  return (
    <div class="context-menu" ref={ref} style={{ left: x + 'px', top: y + 'px' }}>
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
                onInput={e => setRenameVal(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') handleRenameSubmit(item);
                  if (e.key === 'Escape') closeContextMenu();
                }}
              />
              <button class="context-menu-rename-ok" onClick={() => handleRenameSubmit(item)}>✓</button>
            </div>
          );
        }

        if (item.type === 'confirm') {
          const isConfirming = confirmId === i;
          return (
            <div
              key={i}
              class={`context-menu-item ${isConfirming ? 'context-menu-item--danger' : ''}`}
              onClick={() => {
                if (isConfirming) { item.action(); closeContextMenu(); }
                else setConfirmId(i);
              }}
            >
              {isConfirming ? (item.confirmLabel || 'Confirm delete?') : item.label}
            </div>
          );
        }

        if (item.type === 'submenu') {
          return (
            <div key={i} class="context-menu-item context-menu-submenu">
              <span>{item.label}</span>
              <span class="context-menu-arrow">▸</span>
              <div class="context-menu-sub">
                {item.children.map((child, j) => (
                  <div key={j} class="context-menu-item" onClick={() => { child.action(); closeContextMenu(); }}>
                    {child.label}
                  </div>
                ))}
              </div>
            </div>
          );
        }

        // Normal item
        return (
          <div key={i} class="context-menu-item" onClick={() => { item.action(); closeContextMenu(); }}>
            {item.label}
          </div>
        );
      })}
    </div>
  );
}
