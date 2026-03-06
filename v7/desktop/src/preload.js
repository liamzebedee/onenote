// src/preload.ts
var import_electron = require("electron");
import_electron.contextBridge.exposeInMainWorld("log", (...args) => {
  import_electron.ipcRenderer.send("renderer:log", ...args);
});
import_electron.contextBridge.exposeInMainWorld("notebook", {
  open: (path) => import_electron.ipcRenderer.invoke("notebook:open", path),
  getState: () => import_electron.ipcRenderer.invoke("notebook:get-state"),
  applyOp: (op) => import_electron.ipcRenderer.send("notebook:apply-op", op),
  applyOps: (ops) => import_electron.ipcRenderer.send("notebook:apply-ops", ops),
  flush: () => {
    import_electron.ipcRenderer.send("notebook:flush");
  },
  saveBlob: (buffer, meta) => import_electron.ipcRenderer.invoke("notebook:save-blob", buffer, meta),
  getBlob: (hash) => import_electron.ipcRenderer.invoke("notebook:get-blob", hash),
  pickDirectory: () => import_electron.ipcRenderer.invoke("notebook:pick-directory"),
  pickSavePath: () => import_electron.ipcRenderer.invoke("notebook:pick-save-path"),
  getPath: () => import_electron.ipcRenderer.invoke("notebook:get-path"),
  fetchImage: (url) => import_electron.ipcRenderer.invoke("notebook:fetch-image", url),
  saveConfig: (info) => {
    import_electron.ipcRenderer.send("notebook:save-config", info);
  },
  getConfig: () => import_electron.ipcRenderer.invoke("notebook:get-config"),
  saveUiState: (notebookPath, uiState) => {
    import_electron.ipcRenderer.send("notebook:save-ui-state", notebookPath, uiState);
  },
  savePageView: (notebookPath, pageId, panX, panY, zoom) => {
    import_electron.ipcRenderer.send("notebook:save-page-view", notebookPath, pageId, panX, panY, zoom);
  },
  savePageCaret: (notebookPath, pageId, caretBlockId, caretOffset) => {
    import_electron.ipcRenderer.send("notebook:save-page-caret", notebookPath, pageId, caretBlockId, caretOffset);
  },
  openExternal: (url) => import_electron.ipcRenderer.invoke("shell:open-external", url),
  webPublish: () => import_electron.ipcRenderer.invoke("web:publish"),
  webOpenSite: () => import_electron.ipcRenderer.invoke("web:open-site"),
  webOpenDir: () => import_electron.ipcRenderer.invoke("web:open-dir"),
  getPublishUrl: () => import_electron.ipcRenderer.invoke("web:get-publish-url"),
  onCanvasZoom: (cb) => {
    import_electron.ipcRenderer.on("canvas:zoom", (_, dir) => cb(dir));
  },
  offCanvasZoom: () => {
    import_electron.ipcRenderer.removeAllListeners("canvas:zoom");
  },
  onStateChanged: (callback) => {
    import_electron.ipcRenderer.on("notebook:state-changed", (_event, state) => {
      callback(state);
    });
  },
  onOpenFailed: (callback) => {
    import_electron.ipcRenderer.on("notebook:open-failed", () => callback());
  },
  offStateChanged: () => {
    import_electron.ipcRenderer.removeAllListeners("notebook:state-changed");
  }
});
import_electron.contextBridge.exposeInMainWorld("windowControls", {
  minimize: () => import_electron.ipcRenderer.invoke("window:minimize"),
  maximize: () => import_electron.ipcRenderer.invoke("window:maximize"),
  close: () => import_electron.ipcRenderer.invoke("window:close")
});
import_electron.contextBridge.exposeInMainWorld("display", {
  onCommand: (cb) => {
    import_electron.ipcRenderer.on("display:command", (_event, cmd) => cb(cmd));
  },
  offCommand: () => {
    import_electron.ipcRenderer.removeAllListeners("display:command");
  }
});
import_electron.contextBridge.exposeInMainWorld("claude", {
  start: (pageId) => import_electron.ipcRenderer.invoke("claude:start", pageId),
  message: (text) => import_electron.ipcRenderer.invoke("claude:message", text),
  interrupt: () => import_electron.ipcRenderer.invoke("claude:interrupt"),
  stop: () => import_electron.ipcRenderer.invoke("claude:stop"),
  onStream: (cb) => {
    import_electron.ipcRenderer.on("claude:stream", (_event, data) => cb(data));
  },
  offStream: () => {
    import_electron.ipcRenderer.removeAllListeners("claude:stream");
  }
});
