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
    icon: nativeImage.createFromPath(path.join(__dirname, process.platform === 'darwin' ? 'assets/icon.icns' : 'assets/icon-256.png')),
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

  // Suppress macOS native drag image (file thumbnails from Finder)
  if (process.platform === 'darwin') {
    mainWindow.webContents.on('did-finish-load', () => {
      try {
        const addon = require(path.join(__dirname, 'native', 'macos', 'build', 'Release', 'suppress_drag_image.node'));
        addon.suppressDragImage(mainWindow!.getNativeWindowHandle());
      } catch (e) {
        console.log('[native] drag image suppression unavailable:', (e as Error).message);
      }
    });
  }

  // Load the page first so the window appears immediately (shows spinner while notebook loads)
  mainWindow.loadFile(path.join(__dirname, 'app', 'index.html'));

  // Dev-only: capture the window contents to a PNG so screenshots don't depend
  // on window stacking. Enable with NB_CAPTURE=/path/to/out.png.
  if (process.env.NB_CAPTURE) {
    mainWindow.webContents.on('did-finish-load', () => {
      setTimeout(async () => {
        try {
          if (process.env.NB_CAPTURE_JS) {
            const res = await mainWindow!.webContents.executeJavaScript(process.env.NB_CAPTURE_JS);
            if (res !== undefined) console.log('[main] JS result:', res);
            await new Promise(r => setTimeout(r, 400));
          }
          const img = await mainWindow!.webContents.capturePage();
          require('fs').writeFileSync(process.env.NB_CAPTURE!, img.toPNG());
          console.log('[main] captured page to', process.env.NB_CAPTURE);
        } catch (e) { console.error('[main] capture failed', e); }
      }, 2500);
    });
  }

  // Defer notebook open so the renderer can start painting before synchronous I/O begins.
  // A notebook path passed on the command line (e.g. from the file manager / .desktop
  // file's %f) takes priority over the last-opened notebook in config.
  const startupPath = notebookPathFromArgv(process.argv) || config.notebookPath;
  console.log('[main] startup notebookPath:', startupPath, '(argv override:', notebookPathFromArgv(process.argv), ')');
  if (startupPath) {
    setImmediate(() => openDefault(mainWindow!, startupPath, config.deviceId, userDataPath));
  } else {
    console.log('[main] no notebookPath, will show welcome screen');
  }
}

// Extract a *.notebound notebook path passed on the command line (skipping flags
// and Electron's app-directory argument).
function notebookPathFromArgv(argv: string[]): string | null {
  for (const a of argv.slice(1)) {
    if (a.startsWith('-')) continue;
    if (a.endsWith('.notebound') || a.endsWith('.notebound/')) {
      return path.resolve(a.replace(/\/$/, ''));
    }
  }
  return null;
}

// --headless-profile: open the saved notebook, print timing report, quit.
// Usage: electron . -- --headless-profile
if (process.argv.includes('--headless-profile')) {
  app.whenReady().then(() => {
    const configPath = path.join(app.getPath('userData'), 'config.json');
    initConfig(configPath);
    const notebookPath = config.notebookPath;
    if (!notebookPath) {
      console.error('[headless] No notebookPath in config. Launch the app once first.');
      process.exit(1);
    }
    console.log('[headless] profiling:', notebookPath);
    // Create a hidden window just to satisfy Electron's requirement
    const win = new BrowserWindow({ show: false, webPreferences: { nodeIntegration: false, contextIsolation: true } });
    setupIPC(win, config.deviceId, app.getPath('userData'));
    const t0 = performance.now();
    openDefault(win, notebookPath, config.deviceId, app.getPath('userData'));
    const elapsed = performance.now() - t0;
    console.log(`[headless] openDefault total: ${elapsed.toFixed(1)}ms`);
    process.exit(0);
  });
} else if (!app.requestSingleInstanceLock()) {
  // Another instance is already running. It will receive our argv (including any
  // notebook path) via the 'second-instance' event below; we just exit.
  app.quit();
} else {
  // When a second launch happens (e.g. opening another .notebound from the file
  // manager), focus the existing window and switch it to the requested notebook.
  app.on('second-instance', (_event, argv) => {
    const p = notebookPathFromArgv(argv);
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
      if (p) openDefault(mainWindow, p, config.deviceId, app.getPath('userData'));
    }
  });
  app.whenReady().then(createWindow);
}

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
