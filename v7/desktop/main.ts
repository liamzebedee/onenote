import { app, BrowserWindow, Menu, MenuItem, BaseWindow, nativeImage, screen, type MenuItemConstructorOptions } from 'electron';
import path from 'path';
import { config, initConfig, writeConfig, flushConfig } from './src/config';
import { setupIPC, closeNotebook, openDefault } from './src/ipc';

const isMac = process.platform === 'darwin';

// Set app name early so Linux WM_CLASS matches the .desktop file
app.name = 'notebound';
if (process.platform === 'linux') {
  (app as { setDesktopName?: (name: string) => void }).setDesktopName?.('notebound.desktop');
}

const template: MenuItemConstructorOptions[] = [
  ...(isMac ? [{
    label: 'Notebound',
    submenu: [
      { role: 'about' as const },
      { type: 'separator' as const },
      { role: 'services' as const },
      { type: 'separator' as const },
      { role: 'hide' as const },
      { role: 'hideOthers' as const },
      { role: 'unhide' as const },
      { type: 'separator' as const },
      { role: 'quit' as const },
    ],
  } satisfies MenuItemConstructorOptions] : []),
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' as const },
      { role: 'redo' as const },
      { type: 'separator' as const },
      { role: 'cut' as const },
      { role: 'copy' as const },
      { role: 'paste' as const },
      { role: 'selectAll' as const },
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
      { role: 'minimize' as const },
      { role: 'zoom' as const },
      { type: 'separator' as const },
      { role: 'front' as const },
    ],
  } satisfies MenuItemConstructorOptions] : []),
  {
    label: 'Help',
    submenu: [
      {
        label: 'Toggle DevTools',
        accelerator: 'F12',
        click: (_menuItem: MenuItem, win?: BaseWindow) => {
          if (win && 'webContents' in win) (win as BrowserWindow).webContents.toggleDevTools();
        },
      },
    ],
  },
];

Menu.setApplicationMenu(Menu.buildFromTemplate(template));

let mainWindow: BrowserWindow | null = null;
let closed = false;

function shutdown(): void {
  if (closed) return;
  closed = true;
  console.log('[main] shutdown -- writing config, notebookPath:', config.notebookPath);
  flushConfig();
  closeNotebook();
}

function createWindow(): void {
  const configPath = path.join(app.getPath('userData'), 'config.json');
  initConfig(configPath);

  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  const opts: Electron.BrowserWindowConstructorOptions = {
    width,
    height,
    x: 0,
    y: 0,
    autoHideMenuBar: true,
    minWidth: 800,
    minHeight: 560,
    ...(isMac ? {
      titleBarStyle: 'hiddenInset' as const,
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
    setImmediate(() => openDefault(mainWindow!, config.notebookPath!, config.deviceId, userDataPath));
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

// Catch signals -- electron on Linux can get SIGTERM/SIGINT
process.on('SIGTERM', () => { shutdown(); process.exit(0); });
process.on('SIGINT', () => { shutdown(); process.exit(0); });
process.on('exit', shutdown);
