import { useCallback } from 'preact/hooks';
import { displayPanel, updateDisplayPanelPosition, closeDisplayPanel } from './store.js';

export function DisplayPanel() {
  const panel = displayPanel.value;
  if (!panel.active || !panel.uri) return null;

  const onDragStart = useCallback((e) => {
    e.preventDefault();
    const startX = e.clientX, startY = e.clientY;
    const origX = panel.position.x, origY = panel.position.y;

    function onMove(e2) {
      updateDisplayPanelPosition(
        origX + (e2.clientX - startX),
        origY + (e2.clientY - startY)
      );
    }
    function onUp() {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', onUp);
    }
    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', onUp);
  }, [panel.position.x, panel.position.y]);

  return (
    <div
      class="display-panel"
      style={{ left: panel.position.x + 'px', top: panel.position.y + 'px' }}
    >
      <div class="dp-titlebar" onPointerDown={onDragStart}>
        <span class="dp-title">Display</span>
        <button class="dp-close" onClick={closeDisplayPanel}>x</button>
      </div>
      <iframe class="dp-iframe" src={panel.uri} />
    </div>
  );
}
