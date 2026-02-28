const { app, BrowserWindow, Menu, screen, nativeImage } = require('electron');
const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');
const { setupIPC, closeNotebook, openDefault } = require('./src/ipc');

Menu.setApplicationMenu(Menu.buildFromTemplate([
  {
    label: app.name,
    submenu: [
      { role: 'quit' },
    ],
  },
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
    icon: nativeImage.createFromPath(path.join(__dirname, process.platform === 'darwin' ? 'icon.icns' : 'app/icon-256.png')),
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
