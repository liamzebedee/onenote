import { render } from 'preact';
import { App } from './App.jsx';

// Suppress default browser context menu on the entire app
document.getElementById('app').addEventListener('contextmenu', e => {
  e.preventDefault();
});

render(<App />, document.getElementById('app'));
