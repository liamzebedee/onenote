// Browser entry point — loads shim first, then boots the core app.
// The shim sets window.notebook before store.js evaluates.
import './shim.js';
import '../../core/src/main.jsx';
