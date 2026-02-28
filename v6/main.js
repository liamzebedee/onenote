const { app, BrowserWindow, Menu, screen } = require('electron');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { setupIPC, closeNotebook, openDefault } = require('./src/ipc');

Menu.setApplicationMenu(null);

let mainWindow = null;
let closed = false;

const windowStatePath = path.join(app.getPath('userData'), 'window-state.json');

function loadWindowState() {
  try {
    return JSON.parse(fs.readFileSync(windowStatePath, 'utf8'));
  } catch {
    return null;
  }
}

function saveWindowState() {
  if (!mainWindow) return;
  const isFullScreen = mainWindow.isFullScreen();
  const isMaximized = mainWindow.isMaximized();
  // Save normal bounds (not the fullscreen/maximized bounds)
  const bounds = isFullScreen || isMaximized ? (mainWindow._normalBounds || mainWindow.getNormalBounds()) : mainWindow.getBounds();
  const state = { ...bounds, isFullScreen, isMaximized };
  try { fs.writeFileSync(windowStatePath, JSON.stringify(state)); } catch {}
}

function shutdown() {
  if (closed) return;
  closed = true;
  saveWindowState();
  closeNotebook();
}

function createWindow() {
  const saved = loadWindowState();
  const opts = {
    autoHideMenuBar: true,
    width: 1200,
    height: 800,
    icon: path.join(__dirname, 'app', 'icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'src', 'preload.js'),
    },
  };

  if (saved) {
    // Validate that the saved position is still on a visible display
    const displays = screen.getAllDisplays();
    const visible = displays.some(d => {
      const b = d.bounds;
      return saved.x >= b.x && saved.y >= b.y &&
             saved.x < b.x + b.width && saved.y < b.y + b.height;
    });
    if (visible) {
      opts.x = saved.x;
      opts.y = saved.y;
    }
    opts.width = saved.width;
    opts.height = saved.height;
  }

  mainWindow = new BrowserWindow(opts);

  if (saved?.isFullScreen) {
    mainWindow.setFullScreen(true);
  } else if (saved?.isMaximized) {
    mainWindow.maximize();
  }

  // Track normal bounds so we can save them even when fullscreen/maximized
  mainWindow.on('resize', () => {
    if (!mainWindow.isFullScreen() && !mainWindow.isMaximized()) {
      mainWindow._normalBounds = mainWindow.getBounds();
    }
  });
  mainWindow.on('move', () => {
    if (!mainWindow.isFullScreen() && !mainWindow.isMaximized()) {
      mainWindow._normalBounds = mainWindow.getBounds();
    }
  });

  // Set up IPC handlers
  setupIPC(mainWindow);

  // Open default notebook immediately (before renderer even loads)
  const defaultPath = path.join(os.homedir(), 'Dropbox', 'Notes', 'My Notebook.notebound');
  openDefault(mainWindow, defaultPath);

  mainWindow.on('close', shutdown);
  mainWindow.loadFile(path.join(__dirname, 'app', 'index.html'));
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('before-quit', shutdown);

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// Catch signals — electron on Linux can get SIGTERM/SIGINT
process.on('SIGTERM', () => { shutdown(); process.exit(0); });
process.on('SIGINT', () => { shutdown(); process.exit(0); });
process.on('exit', shutdown);
