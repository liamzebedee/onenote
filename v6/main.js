const { app, BrowserWindow, Menu, nativeImage, screen } = require('electron');
const path = require('path');
const { config, initConfig, writeConfig } = require('./src/config');
const { setupIPC, closeNotebook, openDefault } = require('./src/ipc');

const isMac = process.platform === 'darwin';

// Set app name early so Linux WM_CLASS matches the .desktop file
app.name = 'notebound';
if (process.platform === 'linux') {
  app.setDesktopName('notebound.desktop');
}

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

function shutdown() {
  if (closed) return;
  closed = true;
  console.log('[main] shutdown — writing config, notebookPath:', config.notebookPath);
  writeConfig();
  closeNotebook();
}

function createWindow() {
  const configPath = path.join(app.getPath('userData'), 'config.json');
  initConfig(configPath);

  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  const opts = {
    width,
    height,
    x: 0,
    y: 0,
    autoHideMenuBar: true,
    minWidth: 800,
    minHeight: 560,
    ...(isMac ? {
      titleBarStyle: 'hiddenInset',
      trafficLightPosition: { x: 14, y: 13 },
    } : {
      frame: false,
    }),
    icon: nativeImage.createFromPath(path.join(__dirname, process.platform === 'darwin' ? 'icon.icns' : 'app/icon-256.png')),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      spellcheck: false,
      webSecurity: false,
      preload: path.join(__dirname, 'src', 'preload.js'),
    },
  };

  mainWindow = new BrowserWindow(opts);
  mainWindow.maximize();

  const userDataPath = app.getPath('userData');
  setupIPC(mainWindow, config.deviceId, userDataPath);

  mainWindow.on('close', shutdown);
  // Load the page first so the window appears immediately (shows spinner while notebook loads)
  mainWindow.loadFile(path.join(__dirname, 'app', 'index.html'));

  // Defer notebook open so the renderer can start painting before synchronous I/O begins
  console.log('[main] config.notebookPath:', config.notebookPath);
  if (config.notebookPath) {
    setImmediate(() => openDefault(mainWindow, config.notebookPath, config.deviceId, userDataPath));
  } else {
    console.log('[main] no notebookPath in config, will show welcome screen');
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
