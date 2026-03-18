# Canvas Scroll Architecture: Native vs. Custom

## Problem

Scrolling (panning) the canvas feels slow on macOS trackpad. The current implementation intercepts `wheel` events and manually updates a CSS transform, bypassing the browser's native scroll engine entirely. The browser's momentum physics, acceleration curves, and trackpad integration never fire.

## Current architecture

`#canvas-inner` has `transform: translate(-panX*zoom, -panY*zoom) scale(zoom)` with `transform-origin: 0 0`. `panX`/`panY` are world-space coordinates stored in `viewRef`. Every wheel tick manually updates them and calls `applyTransform()`. The custom scrollbars (`hScrollRef`, `vScrollRef`) are drawn manually.

Coordinate conversion:
```
canvasX = (clientX - rect.left) / zoom + panX
canvasY = (clientY - rect.top)  / zoom + panY
```

## Proposed: Native scroll

Make `#canvas-container` use `overflow: scroll`. The browser handles momentum, deceleration, and trackpad physics for free. `scrollLeft`/`scrollTop` replace `panX*zoom`/`panY*zoom`.

New coordinate conversion:
```
canvasX = (clientX - rect.left + scrollLeft) / zoom
canvasY = (clientY - rect.top  + scrollTop)  / zoom
```

Persisted `panX`/`panY` stay in world space: restore with `container.scrollLeft = page.panX * page.zoom`.

---

## Key problems with native scroll

### 1. CSS transform doesn't affect layout

`transform: scale(zoom)` is purely visual — it doesn't affect the element's layout size. The browser computes the scrollable area from layout dimensions, not visual dimensions. So a `scale(2)` on `#canvas-inner` won't make the scroll area twice as large.

**Consequence:** You need a separate "sizer" div whose layout dimensions track `totalCanvasWidth * zoom` × `totalCanvasHeight * zoom`. This must be recomputed on every zoom change and every block mutation, replacing the current `updateScrollbars()`.

Structure:
```html
<div id="canvas-container" style="overflow:scroll">
  <div id="canvas-sizer" style="width: totalW*zoom; height: totalH*zoom; position:relative">
    <div id="canvas-inner" style="position:absolute; top:0; left:0; transform:scale(zoom); transform-origin:0 0">
      {blocks}
    </div>
  </div>
</div>
```

### 2. Zoom anchoring requires scroll adjustment

When ctrl+scrolling to zoom, you must adjust `scrollLeft`/`scrollTop` to keep the canvas point under the mouse stable. Math:

```
cx = (mx + scrollLeft) / zoom        // canvas point under mouse
cy = (my + scrollTop)  / zoom

newScrollLeft = cx * nz - mx         // nz = new zoom
newScrollTop  = cy * nz - my
```

**Order of operations matters:** resize the sizer div BEFORE setting scrollLeft/scrollTop. If the scroll area is smaller than the target scroll position, the browser clamps it silently.

### 3. macOS rubber-band overscroll

On macOS, native scroll elastic-bounces at the edges. For a canvas with a hard left/top edge (panX/panY ≥ 0), this looks wrong — the canvas bounces and reveals the container background.

**Fix:** `overscroll-behavior: none` on `#canvas-container`. This is mandatory.

### 4. Space+drag panning

The existing `startPan()` manually updates `panX`/`panY` via `pointermove`. In the native scroll world, it instead sets `container.scrollLeft` and `container.scrollTop` during drag. This loses momentum for the drag gesture (momentum only applies to native two-finger swipe), which is acceptable since drag-to-pan is an intentional slow interaction.

Need an `isPanning` flag to prevent the `scroll` event handler from fighting with the drag update.

### 5. Passive wheel listeners

Chrome 56+ makes wheel listeners on scrollable elements passive by default, which means `e.preventDefault()` for ctrl+zoom may be ignored. Preact's `onWheel` prop attaches non-passive listeners, so this is fine — but if migrating to `addEventListener` in a `useEffect`, must use `{ passive: false }`.

---

## What goes away

- `applyTransform()` — deleted
- `updateScrollbars()` — replaced by `updateSizerSize()`
- `hScrollRef`, `vScrollRef`, `.canvas-scroll-thumb` divs — deleted
- `scrollHideTimer` — deleted
- `.canvas-scroll-thumb` CSS — deleted
- The `panX + e.deltaX/zoom` logic in `handleWheel` — deleted (browser handles it)

## What stays custom

- **Ctrl+wheel zoom** — still a wheel handler, still custom. Zoom is inherently non-scrollable.
- **Space+drag pan** — still a pointermove handler, but adjusts scrollLeft/scrollTop instead of panX/panY.
- **Sizer div resizing** — must run on zoom, block add/move/resize.

## CSS changes

```css
#canvas-container {
  overflow: scroll;
  overscroll-behavior: none;    /* no macOS elastic bounce */
  scrollbar-width: thin;        /* Firefox */
  scrollbar-color: rgba(0,0,0,.18) transparent;
}
#canvas-container::-webkit-scrollbar { width: 5px; height: 5px; }
#canvas-container::-webkit-scrollbar-thumb {
  background: rgba(0,0,0,.18);
  border-radius: 3px;
}
```

## Verdict

**Worth doing.** The primary win — native trackpad momentum on macOS — is real and substantial. The sizer div complexity is the main added burden, but it replaces the existing `updateScrollbars()` logic at roughly the same call sites. The coordinate math stays clean. The zoom path is unchanged in character (still custom), just with an added scroll adjustment.

The refactor touches:
- `Canvas.jsx`: `applyTransform`, `updateScrollbars`, `handleWheel`, `startPan`, `toCanvas`, JSX structure
- `style.css`: `#canvas-container`, `#canvas-inner`, remove `.canvas-scroll-thumb`

Estimated scope: ~80 lines changed, ~60 lines deleted.
