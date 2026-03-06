// Preload script -- exposes notebook API to renderer via contextBridge
import { contextBridge, ipcRenderer } from 'electron';
import type { Op, AppState, BlobMeta, ClaudeStreamData, DisplayCommand, UiPosition } from '../../core/src/types';

contextBridge.exposeInMainWorld('log', (...args: unknown[]) => {
  ipcRenderer.send('renderer:log', ...args);
});

contextBridge.exposeInMainWorld('notebook', {
  // Open a .notebound directory, returns materialized state
  open: (path: string): Promise<AppState | null> => ipcRenderer.invoke('notebook:open', path),

  // Get current state
  getState: (): Promise<AppState | null> => ipcRenderer.invoke('notebook:get-state'),

  // Apply a single operation (fire-and-forget, no response needed)
  applyOp: (op: Op): void => ipcRenderer.send('notebook:apply-op', op),

  // Apply multiple operations at once (fire-and-forget)
  applyOps: (ops: Op[]): void => ipcRenderer.send('notebook:apply-ops', ops),

  // Flush WAL (seal buffer)
  flush: (): void => { ipcRenderer.send('notebook:flush'); },

  // Store an attachment blob from ArrayBuffer + metadata, returns SHA-256 hash
  saveBlob: (buffer: ArrayBuffer, meta: BlobMeta): Promise<string | null> => ipcRenderer.invoke('notebook:save-blob', buffer, meta),

  // Get blob as data URL by hash
  getBlob: (hash: string): Promise<string | null> => ipcRenderer.invoke('notebook:get-blob', hash),

  // File dialogs
  pickDirectory: (): Promise<string | null> => ipcRenderer.invoke('notebook:pick-directory'),
  pickSavePath: (): Promise<string | null> => ipcRenderer.invoke('notebook:pick-save-path'),

  // Get notebook path
  getPath: (): Promise<string | null> => ipcRenderer.invoke('notebook:get-path'),

  // Fetch remote image (bypasses CORS)
  fetchImage: (url: string): Promise<{ buffer: ArrayBuffer; contentType: string; size: number }> => ipcRenderer.invoke('notebook:fetch-image', url),

  // Config (notebook path + window state)
  saveConfig: (info: { path: string; name: string } | string): void => { ipcRenderer.send('notebook:save-config', info); },
  getConfig: () => ipcRenderer.invoke('notebook:get-config'),

  // Save/restore UI navigation state per notebook (fire-and-forget)
  saveUiState: (notebookPath: string, uiState: UiPosition): void => { ipcRenderer.send('notebook:save-ui-state', notebookPath, uiState); },

  // Save per-page pan/zoom to local config (fire-and-forget)
  savePageView: (notebookPath: string, pageId: string, panX: number, panY: number, zoom: number): void => { ipcRenderer.send('notebook:save-page-view', notebookPath, pageId, panX, panY, zoom); },

  // Save per-page caret position to local config (fire-and-forget)
  savePageCaret: (notebookPath: string, pageId: string, caretBlockId: string, caretOffset: number): void => { ipcRenderer.send('notebook:save-page-caret', notebookPath, pageId, caretBlockId, caretOffset); },

  // Open URL in system browser
  openExternal: (url: string): Promise<void> => ipcRenderer.invoke('shell:open-external', url),

  // Web publish
  webPublish: (): Promise<{ url: string }> => ipcRenderer.invoke('web:publish'),
  webOpenSite: (): Promise<{ url: string }> => ipcRenderer.invoke('web:open-site'),
  webOpenDir: (): Promise<void> => ipcRenderer.invoke('web:open-dir'),
  getPublishUrl: (): Promise<string | null> => ipcRenderer.invoke('web:get-publish-url'),

  // Canvas zoom commands from menu
  onCanvasZoom: (cb: (dir: 'in' | 'out' | 'reset') => void): void => {
    ipcRenderer.on('canvas:zoom', (_: Electron.IpcRendererEvent, dir: 'in' | 'out' | 'reset') => cb(dir));
  },
  offCanvasZoom: (): void => { ipcRenderer.removeAllListeners('canvas:zoom'); },

  // Listen for state changes from sync
  onStateChanged: (callback: (state: AppState) => void): void => {
    ipcRenderer.on('notebook:state-changed', (_event: Electron.IpcRendererEvent, state: AppState) => {
      callback(state);
    });
  },

  // Listen for open failure (show welcome screen)
  onOpenFailed: (callback: () => void): void => {
    ipcRenderer.on('notebook:open-failed', () => callback());
  },

  // Remove state change listener
  offStateChanged: (): void => {
    ipcRenderer.removeAllListeners('notebook:state-changed');
  },
});

contextBridge.exposeInMainWorld('windowControls', {
  minimize: (): Promise<void> => ipcRenderer.invoke('window:minimize'),
  maximize: (): Promise<void> => ipcRenderer.invoke('window:maximize'),
  close: (): Promise<void> => ipcRenderer.invoke('window:close'),
});

contextBridge.exposeInMainWorld('display', {
  onCommand: (cb: (cmd: DisplayCommand) => void): void => {
    ipcRenderer.on('display:command', (_event: Electron.IpcRendererEvent, cmd: DisplayCommand) => cb(cmd));
  },
  offCommand: (): void => {
    ipcRenderer.removeAllListeners('display:command');
  },
});

contextBridge.exposeInMainWorld('claude', {
  start: (pageId: string): Promise<{ sessionId: string }> => ipcRenderer.invoke('claude:start', pageId),
  message: (text: string): Promise<void> => ipcRenderer.invoke('claude:message', text),
  interrupt: (): Promise<void> => ipcRenderer.invoke('claude:interrupt'),
  stop: (): Promise<void> => ipcRenderer.invoke('claude:stop'),
  onStream: (cb: (data: ClaudeStreamData) => void): void => {
    ipcRenderer.on('claude:stream', (_event: Electron.IpcRendererEvent, data: ClaudeStreamData) => cb(data));
  },
  offStream: (): void => {
    ipcRenderer.removeAllListeners('claude:stream');
  },
});
