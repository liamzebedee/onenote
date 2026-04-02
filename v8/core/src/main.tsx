import { render } from 'preact';
import { App } from './App.tsx';

// Suppress default browser context menu on the entire app
document.getElementById('app')!.addEventListener('contextmenu', (e: Event) => {
  e.preventDefault();
});

// Disable middle-click paste (Linux X11 selection clipboard)
document.addEventListener('mousedown', (e: MouseEvent) => { if (e.button === 1) e.preventDefault(); });
document.addEventListener('auxclick', (e: MouseEvent) => { if (e.button === 1) e.preventDefault(); });
document.addEventListener('click', (e: MouseEvent) => { if (e.button === 1) e.preventDefault(); });

render(<App />, document.getElementById('app')!);
