const { app, BrowserWindow, Menu, screen, nativeImage, shell } = require('electron');
const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');
const { setupIPC, closeNotebook, openDefault } = require('./src/ipc');

const isMac = process.platform === 'darwin';

Menu.setApplicationMenu(Menu.buildFromTemplate([
  ...(isMac ? [{
    label: 'Notebound',
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideOthers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' },
    ],
  }] : []),
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { role: 'selectAll' },
    ],
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'Zoom In',
        accelerator: 'CmdOrCtrl+=',
        click: () => { const w = BrowserWindow.getFocusedWindow(); if (w) w.webContents.send('canvas:zoom', 'in'); },
      },
      {
        label: 'Zoom In',
        accelerator: 'CmdOrCtrl+Plus',
        visible: false,
        click: () => { const w = BrowserWindow.getFocusedWindow(); if (w) w.webContents.send('canvas:zoom', 'in'); },
      },
      {
        label: 'Zoom Out',
        accelerator: 'CmdOrCtrl+-',
        click: () => { const w = BrowserWindow.getFocusedWindow(); if (w) w.webContents.send('canvas:zoom', 'out'); },
      },
      {
        label: 'Actual Size',
        accelerator: 'CmdOrCtrl+0',
        click: () => { const w = BrowserWindow.getFocusedWindow(); if (w) w.webContents.send('canvas:zoom', 'reset'); },
      },
      { type: 'separator' },
      { role: 'togglefullscreen' },
    ],
  },
  ...(isMac ? [{
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      { role: 'zoom' },
      { type: 'separator' },
      { role: 'front' },
    ],
  }] : []),
  {
    label: 'Help',
    submenu: [
      {
        label: 'Toggle DevTools',
        accelerator: 'F12',
        click: (_, win) => { if (win) win.webContents.toggleDevTools(); },
      },
    ],
  },
]));

let mainWindow = null;
let closed = false;

const configPath = path.join(app.getPath('userData'), 'config.json');

function loadConfig() {
  try {
    return JSON.parse(fs.readFileSync(configPath, 'utf8'));
  } catch {
    return {};
  }
}

function getOrCreateDeviceId() {
  const config = loadConfig();
  if (config.deviceId) return config.deviceId;
  const deviceId = crypto.randomUUID();
  try { fs.writeFileSync(configPath, JSON.stringify({ ...config, deviceId })); } catch {}
  return deviceId;
}

function saveConfig(extra = {}) {
  const existing = loadConfig();
  const merged = { ...existing, ...extra };

  if (mainWindow) {
    const isFullScreen = mainWindow.isFullScreen();
    const isMaximized = mainWindow.isMaximized();
    const bounds = isFullScreen || isMaximized ? (mainWindow._normalBounds || mainWindow.getNormalBounds()) : mainWindow.getBounds();
    merged.window = { ...bounds, isFullScreen, isMaximized };
  }

  try { fs.writeFileSync(configPath, JSON.stringify(merged)); } catch {}
}

function shutdown() {
  if (closed) return;
  closed = true;
  saveConfig();
  closeNotebook();
}

function createWindow() {
  const config = loadConfig();
  const saved = config.window || null;
  const opts = {
    autoHideMenuBar: true,
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 560,
    ...(isMac ? {
      titleBarStyle: 'hiddenInset',
      trafficLightPosition: { x: 14, y: 13 },
    } : {}),
    icon: nativeImage.createFromPath(path.join(__dirname, process.platform === 'darwin' ? 'icon.icns' : 'app/icon-256.png')),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'src', 'preload.js'),
    },
  };

  if (saved) {
    // Restore size (clamped to minimums)
    if (saved.width && saved.height) {
      opts.width  = Math.max(opts.minWidth,  saved.width);
      opts.height = Math.max(opts.minHeight, saved.height);
    }

    // Validate position: the window must substantially overlap at least one display
    if (saved.x != null && saved.y != null) {
      const winRect = { x: saved.x, y: saved.y, w: opts.width, h: opts.height };
      const displays = screen.getAllDisplays();
      const onScreen = displays.some(d => {
        const b = d.workArea;
        const ox = Math.max(0, Math.min(winRect.x + winRect.w, b.x + b.width)  - Math.max(winRect.x, b.x));
        const oy = Math.max(0, Math.min(winRect.y + winRect.h, b.y + b.height) - Math.max(winRect.y, b.y));
        return ox * oy > 10000; // at least ~100×100 px overlap
      });
      if (onScreen) {
        opts.x = saved.x;
        opts.y = saved.y;
      }
    }
  }

  mainWindow = new BrowserWindow(opts);

  // Centre if we couldn't restore a valid position
  if (opts.x == null) mainWindow.center();

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

  const deviceId = getOrCreateDeviceId();

  // Set up IPC handlers (pass configPath so IPC can read/write config)
  setupIPC(mainWindow, configPath, deviceId);

  mainWindow.on('close', shutdown);
  // Load the page first so the window appears immediately (shows spinner while notebook loads)
  mainWindow.loadFile(path.join(__dirname, 'app', 'index.html'));

  // Defer notebook open so the renderer can start painting before synchronous I/O begins
  if (config.notebookPath) {
    setImmediate(() => openDefault(mainWindow, config.notebookPath, deviceId));
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  app.quit();
});

app.on('before-quit', shutdown);

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// Catch signals — electron on Linux can get SIGTERM/SIGINT
process.on('SIGTERM', () => { shutdown(); process.exit(0); });
process.on('SIGINT', () => { shutdown(); process.exit(0); });
process.on('exit', shutdown);
