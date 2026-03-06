var __create = Object.create;
var __getProtoOf = Object.getPrototypeOf;
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};

// main.ts
var import_electron2 = require("electron");
var import_path8 = __toESM(require("path"));

// src/config.ts
var import_fs = __toESM(require("fs"));
var import_crypto = __toESM(require("crypto"));
var _configPath = null;
var config = { deviceId: "" };
function initConfig(configPath) {
  _configPath = configPath;
  try {
    Object.assign(config, JSON.parse(import_fs.default.readFileSync(_configPath, "utf8")));
  } catch {}
  if (!config.deviceId) {
    config.deviceId = import_crypto.default.randomUUID();
    writeConfig();
  }
}
function writeConfig() {
  if (!_configPath)
    return;
  try {
    import_fs.default.writeFileSync(_configPath, JSON.stringify(config));
  } catch {}
}
var _writeTimer = null;
function debouncedWriteConfig() {
  if (_writeTimer)
    clearTimeout(_writeTimer);
  _writeTimer = setTimeout(writeConfig, 500);
}
function flushConfig() {
  if (_writeTimer) {
    clearTimeout(_writeTimer);
    _writeTimer = null;
  }
  writeConfig();
}

// src/ipc.ts
var import_electron = require("electron");
var import_os2 = __toESM(require("os"));
var import_path7 = __toESM(require("path"));
var import_fs8 = __toESM(require("fs"));
var import_net = __toESM(require("net"));
var import_child_process2 = require("child_process");

// src/notebook.ts
var import_fs5 = __toESM(require("fs"));
var import_path4 = __toESM(require("path"));
var import_crypto2 = __toESM(require("crypto"));

// src/wal.ts
var import_fs2 = __toESM(require("fs"));
var import_path = __toESM(require("path"));

class WAL {
  buffer;
  _sealTimer;
  constructor() {
    this.buffer = [];
    this._sealTimer = null;
  }
  append(op) {
    this.buffer.push(op);
    return op;
  }
  seal(deviceId, walDir) {
    if (this.buffer.length === 0)
      return null;
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `${deviceId}-${timestamp}.json`;
    const filePath = import_path.default.join(walDir, filename);
    const batch = {
      deviceId,
      sealedAt: Date.now(),
      ops: this.buffer.slice()
    };
    import_fs2.default.mkdirSync(walDir, { recursive: true });
    const tmpPath = filePath + ".tmp";
    import_fs2.default.writeFileSync(tmpPath, JSON.stringify(batch, null, 2));
    import_fs2.default.renameSync(tmpPath, filePath);
    this.buffer = [];
    return filename;
  }
  static readBatch(filePath) {
    const data = import_fs2.default.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  }
  static listBatches(walDir) {
    if (!import_fs2.default.existsSync(walDir))
      return [];
    return import_fs2.default.readdirSync(walDir).filter((f) => f.endsWith(".json") && !f.endsWith(".tmp")).sort((a, b) => {
      const tsA = a.slice(37);
      const tsB = b.slice(37);
      return tsA < tsB ? -1 : tsA > tsB ? 1 : a < b ? -1 : a > b ? 1 : 0;
    });
  }
  startAutoSeal(deviceId, walDir) {
    this.stopAutoSeal();
    this._sealTimer = setInterval(() => {
      if (this.buffer.length > 0) {
        this.seal(deviceId, walDir);
      }
    }, 30000);
  }
  stopAutoSeal() {
    if (this._sealTimer) {
      clearInterval(this._sealTimer);
      this._sealTimer = null;
    }
  }
  get pendingCount() {
    return this.buffer.length;
  }
}

// src/crdt.ts
class TextCRDT {
  deviceId;
  counter;
  nodes;
  _rootKey;
  ROOT_ID;
  _head;
  _tail;
  _pendingDeletes;
  constructor(deviceId) {
    this.deviceId = deviceId;
    this.counter = 0;
    this.nodes = new Map;
    this._rootKey = "__root__:0";
    this.ROOT_ID = { device: "__root__", counter: 0 };
    const rootNode = {
      id: this.ROOT_ID,
      char: "",
      deleted: true,
      parentId: null,
      _key: this._rootKey,
      _next: null,
      _prev: null
    };
    this.nodes.set(this._rootKey, rootNode);
    this._head = rootNode;
    this._tail = rootNode;
  }
  _key(id) {
    return id.device + ":" + id.counter;
  }
  _nextId() {
    this.counter++;
    return { device: this.deviceId, counter: this.counter };
  }
  _compareIds(a, b) {
    if (a.counter !== b.counter)
      return b.counter - a.counter;
    if (a.device < b.device)
      return 1;
    if (a.device > b.device)
      return -1;
    return 0;
  }
  insertAt(parentId, char) {
    if (!parentId)
      parentId = this.ROOT_ID;
    const id = this._nextId();
    const op = { type: "insert", id, parentId, char };
    this.apply(op);
    return op;
  }
  insertTextAt(pos, text) {
    const ops = [];
    let parentId = this._idAtVisiblePos(pos === 0 ? -1 : pos - 1);
    for (const char of text) {
      const op = this.insertAt(parentId, char);
      ops.push(op);
      parentId = op.id;
    }
    return ops;
  }
  deleteAt(pos) {
    const id = this._idAtVisiblePos(pos);
    if (!id || this._key(id) === this._rootKey)
      return null;
    const op = { type: "delete", id };
    this.apply(op);
    return op;
  }
  _idAtVisiblePos(pos) {
    if (pos === -1)
      return this.ROOT_ID;
    let visible = -1;
    let node = this._head;
    while (node) {
      if (!node.deleted && node._key !== this._rootKey) {
        visible++;
        if (visible === pos)
          return node.id;
      }
      node = node._next;
    }
    return null;
  }
  apply(op) {
    if (op.type === "insert") {
      this._applyInsert(op);
    } else if (op.type === "delete") {
      this._applyDelete(op);
    }
  }
  _insertAfter(after, node) {
    node._prev = after;
    node._next = after._next;
    if (after._next)
      after._next._prev = node;
    else
      this._tail = node;
    after._next = node;
  }
  _applyInsert(op) {
    const key = this._key(op.id);
    if (this.nodes.has(key))
      return;
    this.counter = Math.max(this.counter, op.id.counter);
    const node = {
      id: op.id,
      char: op.char,
      deleted: false,
      parentId: op.parentId,
      _key: key,
      _next: null,
      _prev: null
    };
    if (this._pendingDeletes && this._pendingDeletes.has(key)) {
      node.deleted = true;
      this._pendingDeletes.delete(key);
    }
    this.nodes.set(key, node);
    const parentKey = this._key(op.parentId);
    const parent = this.nodes.get(parentKey);
    if (!parent) {
      this._insertAfter(this._tail, node);
      return;
    }
    let cursor = parent._next;
    let insertAfter = parent;
    while (cursor) {
      const cursorParentKey = cursor.parentId ? this._key(cursor.parentId) : null;
      if (cursorParentKey === parentKey) {
        if (this._compareIds(op.id, cursor.id) > 0) {
          insertAfter = cursor;
          cursor = cursor._next;
          while (cursor && this._isDescendantOf(cursor, cursor._prev._key)) {
            insertAfter = cursor;
            cursor = cursor._next;
          }
        } else {
          break;
        }
      } else if (cursor.parentId && this._isDescendantOf(cursor, parentKey)) {
        insertAfter = cursor;
        cursor = cursor._next;
      } else {
        break;
      }
    }
    this._insertAfter(insertAfter, node);
  }
  _isDescendantOf(node, ancestorKey) {
    let current = node;
    const visited = new Set;
    while (current && current.parentId) {
      const parentKey = this._key(current.parentId);
      if (parentKey === ancestorKey)
        return true;
      if (visited.has(parentKey))
        return false;
      visited.add(parentKey);
      current = this.nodes.get(parentKey);
    }
    return false;
  }
  _applyDelete(op) {
    const key = this._key(op.id);
    const node = this.nodes.get(key);
    if (!node) {
      if (!this._pendingDeletes)
        this._pendingDeletes = new Set;
      this._pendingDeletes.add(key);
      return;
    }
    node.deleted = true;
  }
  getText() {
    let result = "";
    let node = this._head;
    while (node) {
      if (!node.deleted && node._key !== this._rootKey) {
        result += node.char;
      }
      node = node._next;
    }
    return result;
  }
  length() {
    let count = 0;
    let node = this._head;
    while (node) {
      if (!node.deleted && node._key !== this._rootKey)
        count++;
      node = node._next;
    }
    return count;
  }
  snapshot() {
    const nodes = [];
    let node = this._head;
    while (node) {
      nodes.push({
        id: node.id,
        char: node.char,
        deleted: node.deleted,
        parentId: node.parentId
      });
      node = node._next;
    }
    return {
      deviceId: this.deviceId,
      counter: this.counter,
      nodes
    };
  }
  static fromSnapshot(data) {
    const crdt = new TextCRDT(data.deviceId);
    crdt.counter = data.counter;
    crdt.nodes.clear();
    crdt._head = null;
    crdt._tail = null;
    let prev = null;
    for (const n of data.nodes) {
      const key = crdt._key(n.id);
      const node = {
        id: n.id,
        char: n.char,
        deleted: n.deleted,
        parentId: n.parentId,
        _key: key,
        _next: null,
        _prev: prev
      };
      if (prev)
        prev._next = node;
      else
        crdt._head = node;
      prev = node;
      crdt.nodes.set(key, node);
    }
    crdt._tail = prev;
    return crdt;
  }
}

// src/htmlutils.ts
function getHtmlCharMap(html) {
  const map = [];
  let i = 0;
  while (i < html.length) {
    if (html[i] === "<") {
      const end = html.indexOf(">", i);
      const tag = end === -1 ? html.slice(i) : html.slice(i, end + 1);
      if (/^<br\s*\/?>$/i.test(tag)) {
        map.push({ start: i, end: end + 1 });
      }
      i = end === -1 ? html.length : end + 1;
    } else if (html[i] === "&") {
      const semi = html.indexOf(";", i);
      const entityEnd = semi === -1 ? i + 1 : semi + 1;
      map.push({ start: i, end: entityEnd });
      i = entityEnd;
    } else {
      map.push({ start: i, end: i + 1 });
      i++;
    }
  }
  return map;
}
function deleteHtmlChars(html, pos, count) {
  const map = getHtmlCharMap(html);
  const end = Math.min(pos + count, map.length);
  if (pos >= map.length || pos >= end)
    return html;
  let result = "";
  let lastEnd = 0;
  for (let i = pos;i < end; i++) {
    result += html.slice(lastEnd, map[i].start);
    lastEnd = map[i].end;
  }
  return result + html.slice(lastEnd);
}
function insertHtmlText(html, pos, text) {
  const map = getHtmlCharMap(html);
  const insertAt = pos < map.length ? map[pos].start : html.length;
  const escaped = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>");
  return html.slice(0, insertAt) + escaped + html.slice(insertAt);
}
function applyDiffsToHtml(html, diffs) {
  let result = html;
  for (const diff of diffs) {
    if (diff.type === "delete")
      result = deleteHtmlChars(result, diff.pos, diff.count);
    else if (diff.type === "insert")
      result = insertHtmlText(result, diff.pos, diff.text);
  }
  return result;
}
function applyTextChangeToHtml(html, oldText, newText) {
  if (oldText === newText)
    return html;
  let p = 0;
  const minLen = Math.min(oldText.length, newText.length);
  while (p < minLen && oldText[p] === newText[p])
    p++;
  let oldEnd = oldText.length, newEnd = newText.length;
  while (oldEnd > p && newEnd > p && oldText[oldEnd - 1] === newText[newEnd - 1]) {
    oldEnd--;
    newEnd--;
  }
  let result = html;
  if (oldEnd > p)
    result = deleteHtmlChars(result, p, oldEnd - p);
  const ins = newText.slice(p, newEnd);
  if (ins)
    result = insertHtmlText(result, p, ins);
  return result;
}

// src/model.ts
function findInTree(pages, id) {
  for (const p of pages) {
    if (p.id === id)
      return p;
    if (p.children?.length) {
      const f = findInTree(p.children, id);
      if (f)
        return f;
    }
  }
  return null;
}
function removeFromTree(pages, id) {
  return pages.filter((p) => p.id !== id).map((p) => ({ ...p, children: removeFromTree(p.children ?? [], id) }));
}
function findPageInState(state, pageId) {
  const idx = state._index;
  if (idx) {
    const entry = idx.pages.get(pageId);
    if (entry)
      return entry;
    return null;
  }
  for (const nb of state.notebooks) {
    for (const sec of nb.sections) {
      const p = findInTree(sec.pages, pageId);
      if (p)
        return { page: p, section: sec, notebook: nb };
    }
  }
  return null;
}
function buildIndex(state) {
  const idx = { pages: new Map, sections: new Map, blocks: new Map };
  for (const nb of state.notebooks) {
    for (const sec of nb.sections) {
      idx.sections.set(sec.id, { section: sec, notebook: nb });
      _indexPages(idx, sec.pages, sec, nb);
    }
  }
  state._index = idx;
  return idx;
}
function _indexPages(idx, pages, sec, nb) {
  for (const p of pages) {
    idx.pages.set(p.id, { page: p, section: sec, notebook: nb });
    for (const b of p.blocks || []) {
      idx.blocks.set(b.id, { block: b, page: p });
    }
    if (p.children?.length)
      _indexPages(idx, p.children, sec, nb);
  }
}
function _findBlockFast(state, pageId, blockId) {
  const idx = state._index;
  if (idx) {
    const entry = idx.blocks.get(blockId);
    if (entry)
      return entry;
    return null;
  }
  const result = findPageInState(state, pageId);
  if (!result)
    return null;
  const blk = result.page.blocks.find((b) => b.id === blockId);
  if (!blk)
    return null;
  return { block: blk, page: result.page };
}
function emptyState() {
  return { notebooks: [], ui: { notebookId: null, sectionId: null, pageId: null } };
}
function applyOp(state, op) {
  const idx = state._index;
  switch (op.type) {
    case "notebook-add": {
      if (state.notebooks.find((n) => n.id === op.notebookId))
        return state;
      const nb = {
        id: op.notebookId,
        title: op.title || "New Notebook",
        sections: op.sections || []
      };
      state.notebooks.push(nb);
      if (idx) {
        for (const sec of nb.sections) {
          idx.sections.set(sec.id, { section: sec, notebook: nb });
          _indexPages(idx, sec.pages, sec, nb);
        }
      }
      return state;
    }
    case "notebook-delete": {
      if (idx) {
        const nb = state.notebooks.find((n) => n.id === op.notebookId);
        if (nb) {
          for (const sec of nb.sections) {
            idx.sections.delete(sec.id);
            _removePageIndex(idx, sec.pages);
          }
        }
      }
      state.notebooks = state.notebooks.filter((n) => n.id !== op.notebookId);
      return state;
    }
    case "notebook-rename": {
      const nb = state.notebooks.find((n) => n.id === op.notebookId);
      if (nb)
        nb.title = op.title;
      return state;
    }
    case "notebook-reorder": {
      const notebookIds = op.notebookIds;
      if (notebookIds) {
        state.notebooks.sort((a, b) => notebookIds.indexOf(a.id) - notebookIds.indexOf(b.id));
      }
      return state;
    }
    case "section-add": {
      const nb = state.notebooks.find((n) => n.id === op.notebookId);
      if (!nb)
        return state;
      if (nb.sections.find((s) => s.id === op.sectionId))
        return state;
      const sec = {
        id: op.sectionId,
        title: op.title || "New Section",
        pages: op.pages || []
      };
      nb.sections.push(sec);
      if (idx) {
        idx.sections.set(sec.id, { section: sec, notebook: nb });
        _indexPages(idx, sec.pages, sec, nb);
      }
      return state;
    }
    case "section-delete": {
      const nb = state.notebooks.find((n) => n.id === op.notebookId);
      if (!nb)
        return state;
      if (idx) {
        const sec = nb.sections.find((s) => s.id === op.sectionId);
        if (sec) {
          idx.sections.delete(sec.id);
          _removePageIndex(idx, sec.pages);
        }
      }
      nb.sections = nb.sections.filter((s) => s.id !== op.sectionId);
      return state;
    }
    case "section-rename": {
      if (idx) {
        const entry = idx.sections.get(op.sectionId);
        if (entry) {
          entry.section.title = op.title;
          return state;
        }
      }
      for (const nb of state.notebooks) {
        const sec = nb.sections.find((s) => s.id === op.sectionId);
        if (sec) {
          sec.title = op.title;
          break;
        }
      }
      return state;
    }
    case "section-reorder": {
      const nb = state.notebooks.find((n) => n.id === op.notebookId);
      const sectionIds = op.sectionIds;
      if (nb && sectionIds) {
        nb.sections.sort((a, b) => sectionIds.indexOf(a.id) - sectionIds.indexOf(b.id));
      }
      return state;
    }
    case "page-add": {
      let targetSec = null;
      let targetNb = null;
      if (idx) {
        const entry = idx.sections.get(op.sectionId);
        if (entry) {
          targetSec = entry.section;
          targetNb = entry.notebook;
        }
      } else {
        for (const nb of state.notebooks) {
          const found = nb.sections.find((s) => s.id === op.sectionId);
          if (found) {
            targetSec = found;
            targetNb = nb;
            break;
          }
        }
      }
      if (!targetSec)
        return state;
      if (idx) {
        if (idx.pages.has(op.pageId))
          return state;
      } else {
        if (findInTree(targetSec.pages, op.pageId))
          return state;
      }
      const page = {
        id: op.pageId,
        title: op.title || "Untitled Page",
        children: [],
        blocks: op.blocks || [],
        panX: 0,
        panY: 0,
        zoom: 1
      };
      if (op.parentPageId) {
        const parent = findInTree(targetSec.pages, op.parentPageId);
        if (parent) {
          parent.children = parent.children ?? [];
          parent.children.push(page);
        } else
          targetSec.pages.push(page);
      } else {
        targetSec.pages.push(page);
      }
      if (idx) {
        idx.pages.set(page.id, { page, section: targetSec, notebook: targetNb });
        for (const b of page.blocks) {
          idx.blocks.set(b.id, { block: b, page });
        }
      }
      return state;
    }
    case "page-delete": {
      if (idx) {
        const entry = idx.pages.get(op.pageId);
        if (entry) {
          entry.section.pages = removeFromTree(entry.section.pages, op.pageId);
          _removePageIndex(idx, [entry.page]);
        }
        return state;
      }
      for (const nb of state.notebooks) {
        for (const sec of nb.sections) {
          const found = findInTree(sec.pages, op.pageId);
          if (found) {
            sec.pages = removeFromTree(sec.pages, op.pageId);
            return state;
          }
        }
      }
      return state;
    }
    case "page-rename": {
      const result = findPageInState(state, op.pageId);
      if (result)
        result.page.title = op.title;
      return state;
    }
    case "page-move": {
      let extracted = null;
      if (idx) {
        const entry = idx.pages.get(op.pageId);
        if (entry) {
          extracted = entry.page;
          entry.section.pages = removeFromTree(entry.section.pages, op.pageId);
          _removePageIndex(idx, [entry.page]);
        }
      } else {
        for (const nb of state.notebooks) {
          for (const sec of nb.sections) {
            const found = findInTree(sec.pages, op.pageId);
            if (found) {
              extracted = structuredClone(found);
              sec.pages = removeFromTree(sec.pages, op.pageId);
              break;
            }
          }
          if (extracted)
            break;
        }
      }
      if (!extracted)
        return state;
      let targetSec = null;
      let targetNb = null;
      if (idx) {
        const entry = idx.sections.get(op.targetSectionId);
        if (entry) {
          targetSec = entry.section;
          targetNb = entry.notebook;
        }
      } else {
        for (const nb of state.notebooks) {
          const found = nb.sections.find((s) => s.id === op.targetSectionId);
          if (found) {
            targetSec = found;
            targetNb = nb;
            break;
          }
        }
      }
      if (targetSec) {
        targetSec.pages.push(extracted);
        if (idx)
          _indexPages(idx, [extracted], targetSec, targetNb);
      }
      return state;
    }
    case "page-set-hidden": {
      const result = findPageInState(state, op.pageId);
      if (result)
        result.page.hidden = !!op.hidden;
      return state;
    }
    case "page-view": {
      const result = findPageInState(state, op.pageId);
      if (result) {
        const pg = result.page;
        if (op.panX != null)
          pg.panX = op.panX;
        if (op.panY != null)
          pg.panY = op.panY;
        if (op.zoom != null)
          pg.zoom = op.zoom;
      }
      return state;
    }
    case "page-reorder": {
      let sec = null;
      if (idx) {
        const entry = idx.sections.get(op.sectionId);
        if (entry)
          sec = entry.section;
      } else {
        for (const nb of state.notebooks) {
          const found = nb.sections.find((s) => s.id === op.sectionId);
          if (found) {
            sec = found;
            break;
          }
        }
      }
      const pageIds = op.pageIds;
      if (sec && pageIds) {
        const ordered = [];
        for (const id of pageIds) {
          const p = sec.pages.find((pg) => pg.id === id);
          if (p)
            ordered.push(p);
        }
        for (const p of sec.pages) {
          if (!pageIds.includes(p.id))
            ordered.push(p);
        }
        sec.pages = ordered;
      }
      return state;
    }
    case "page-tree-update": {
      let collect = function(pages) {
        for (const p of pages) {
          byId.set(p.id, p);
          collect(p.children ?? []);
        }
      }, rebuild = function(treeNodes) {
        return treeNodes.map((p) => {
          const ex = byId.get(p.id);
          if (!ex)
            return null;
          return { ...ex, children: rebuild(p.children ?? []) };
        }).filter(Boolean);
      };
      let targetSec = null;
      let targetNb = null;
      if (idx) {
        const entry = idx.sections.get(op.sectionId);
        if (entry) {
          targetSec = entry.section;
          targetNb = entry.notebook;
        }
      } else {
        for (const nb of state.notebooks) {
          const found = nb.sections.find((s) => s.id === op.sectionId);
          if (found) {
            targetSec = found;
            targetNb = nb;
            break;
          }
        }
      }
      if (!targetSec)
        return state;
      const byId = new Map;
      collect(targetSec.pages);
      if (idx)
        _removePageIndex(idx, targetSec.pages);
      targetSec.pages = rebuild(op.pages);
      if (idx)
        _indexPages(idx, targetSec.pages, targetSec, targetNb);
      return state;
    }
    case "block-add": {
      const result = findPageInState(state, op.pageId);
      if (!result)
        return state;
      const block = op.block;
      if (idx) {
        if (idx.blocks.has(block.id))
          return state;
      } else {
        if (result.page.blocks.find((b) => b.id === block.id))
          return state;
      }
      result.page.blocks.push(block);
      if (idx)
        idx.blocks.set(block.id, { block, page: result.page });
      return state;
    }
    case "block-delete": {
      if (idx) {
        const entry = idx.blocks.get(op.blockId);
        if (entry) {
          entry.page.blocks = entry.page.blocks.filter((b) => b.id !== op.blockId);
          idx.blocks.delete(op.blockId);
        }
        return state;
      }
      const result = findPageInState(state, op.pageId);
      if (!result)
        return state;
      result.page.blocks = result.page.blocks.filter((b) => b.id !== op.blockId);
      return state;
    }
    case "block-move": {
      const entry = _findBlockFast(state, op.pageId, op.blockId);
      if (entry) {
        entry.block.x = op.x;
        entry.block.y = op.y;
      }
      return state;
    }
    case "block-resize": {
      const entry = _findBlockFast(state, op.pageId, op.blockId);
      if (entry)
        entry.block.w = op.w;
      return state;
    }
    case "block-update-html": {
      const entry = _findBlockFast(state, op.pageId, op.blockId);
      if (entry)
        entry.block.html = op.html;
      return state;
    }
    case "block-update-type": {
      const entry = _findBlockFast(state, op.pageId, op.blockId);
      if (entry)
        entry.block.type = op.blockType;
      return state;
    }
    case "block-update-src": {
      const entry = _findBlockFast(state, op.pageId, op.blockId);
      if (entry)
        entry.block.src = op.src;
      return state;
    }
    case "block-update-crop": {
      const entry = _findBlockFast(state, op.pageId, op.blockId);
      if (entry)
        entry.block.crop = op.crop;
      return state;
    }
    case "block-update-caption": {
      const entry = _findBlockFast(state, op.pageId, op.blockId);
      if (entry) {
        if (op.caption)
          entry.block.caption = op.caption;
        else
          delete entry.block.caption;
      }
      return state;
    }
    case "block-checklist-update": {
      const entry = _findBlockFast(state, op.pageId, op.blockId);
      if (entry)
        entry.block.items = op.items;
      return state;
    }
    case "block-update-border": {
      const entry = _findBlockFast(state, op.pageId, op.blockId);
      if (entry) {
        if (op.border)
          entry.block.border = op.border;
        else
          delete entry.block.border;
      }
      return state;
    }
    case "block-style": {
      const entry = _findBlockFast(state, op.pageId, op.blockId);
      if (entry)
        Object.assign(entry.block.styles || (entry.block.styles = {}), op.styles);
      return state;
    }
    case "block-z": {
      const entry = _findBlockFast(state, op.pageId, op.blockId);
      if (entry)
        entry.block.z = op.z;
      return state;
    }
    case "ui-navigate": {
      if (op.notebookId !== undefined)
        state.ui.notebookId = op.notebookId;
      if (op.sectionId !== undefined)
        state.ui.sectionId = op.sectionId;
      if (op.pageId !== undefined)
        state.ui.pageId = op.pageId;
      return state;
    }
    case "block-text-op": {
      const entry = _findBlockFast(state, op.pageId, op.blockId);
      if (!entry)
        return state;
      const blk = entry.block;
      let crdt;
      if (blk._crdt) {
        crdt = blk._crdt;
      } else if (blk.crdt) {
        crdt = TextCRDT.fromSnapshot(blk.crdt);
      } else {
        crdt = new TextCRDT("__replay__");
        if (blk.html) {
          const text = blk.html.replace(/<br\s*\/?>/gi, `
`).replace(/<[^>]*>/g, "");
          if (text)
            crdt.insertTextAt(0, text);
        }
      }
      const oldText = crdt.getText();
      const crdtOps = op.crdtOps || [];
      for (const crdtOp of crdtOps)
        crdt.apply(crdtOp);
      const newText = crdt.getText();
      blk.html = applyTextChangeToHtml(blk.html || "", oldText, newText);
      blk._crdt = crdt;
      blk.crdt = null;
      return state;
    }
    default:
      console.warn("Unknown op type:", op.type);
      return state;
  }
}
function _removePageIndex(idx, pages) {
  for (const p of pages) {
    idx.pages.delete(p.id);
    for (const b of p.blocks || [])
      idx.blocks.delete(b.id);
    if (p.children?.length)
      _removePageIndex(idx, p.children);
  }
}
function finalizeState(state) {
  for (const nb of state.notebooks) {
    for (const sec of nb.sections) {
      _finalizePages(sec.pages);
    }
  }
  delete state._index;
  return state;
}
function _finalizePages(pages) {
  for (const p of pages) {
    for (const b of p.blocks || []) {
      if (b._crdt) {
        b.crdt = b._crdt.snapshot();
        delete b._crdt;
      }
    }
    p.blocks = (p.blocks || []).filter((b) => b.type === "image" || b.html && b.html !== "<br>" && b.html.trim() !== "");
    if (p.children?.length)
      _finalizePages(p.children);
  }
}

// src/snapshot.ts
var import_fs3 = __toESM(require("fs"));
var import_path2 = __toESM(require("path"));
var MAX_SNAPSHOTS_PER_DEVICE = 3;
function createSnapshot(state, snapshotsDir, includedBatches = [], deviceId) {
  import_fs3.default.mkdirSync(snapshotsDir, { recursive: true });
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const filename = deviceId ? `${deviceId}-${timestamp}.json` : `${timestamp}.json`;
  const filePath = import_path2.default.join(snapshotsDir, filename);
  const snapshot = {
    createdAt: Date.now(),
    includedBatches,
    state
  };
  const tmpPath = filePath + ".tmp";
  import_fs3.default.writeFileSync(tmpPath, JSON.stringify(snapshot));
  import_fs3.default.renameSync(tmpPath, filePath);
  try {
    const allSnaps = import_fs3.default.readdirSync(snapshotsDir).filter((f) => f.endsWith(".json") && !f.endsWith(".tmp")).sort();
    if (allSnaps.length > MAX_SNAPSHOTS_PER_DEVICE) {
      const toDelete = allSnaps.slice(0, allSnaps.length - MAX_SNAPSHOTS_PER_DEVICE);
      for (const f of toDelete) {
        import_fs3.default.unlinkSync(import_path2.default.join(snapshotsDir, f));
      }
    }
  } catch {}
  return filename;
}
function loadLatestSnapshot(snapshotsDir) {
  if (!import_fs3.default.existsSync(snapshotsDir))
    return null;
  const files = import_fs3.default.readdirSync(snapshotsDir).filter((f) => f.endsWith(".json") && !f.endsWith(".tmp")).sort();
  if (files.length === 0)
    return null;
  const latest = files[files.length - 1];
  const data = import_fs3.default.readFileSync(import_path2.default.join(snapshotsDir, latest), "utf8");
  return JSON.parse(data);
}
function rebuildState(snapshotsDir, walDir, notebookId, notebookName) {
  const snapshot = loadLatestSnapshot(snapshotsDir);
  let state;
  const appliedBatches = new Set;
  if (snapshot) {
    state = snapshot.state;
    for (const b of snapshot.includedBatches || []) {
      appliedBatches.add(b);
    }
  } else {
    state = emptyState();
  }
  if (notebookId && !state.notebooks.find((n) => n.id === notebookId)) {
    state.notebooks.push({ id: notebookId, title: notebookName || "Notebook", sections: [] });
  }
  buildIndex(state);
  const batches = WAL.listBatches(walDir);
  for (const batchFile of batches) {
    if (appliedBatches.has(batchFile))
      continue;
    const batch = WAL.readBatch(import_path2.default.join(walDir, batchFile));
    for (const op of batch.ops) {
      state = applyOp(state, op);
    }
    appliedBatches.add(batchFile);
  }
  finalizeState(state);
  return { state, appliedBatches };
}

// src/sync.ts
var import_fs4 = __toESM(require("fs"));
var import_path3 = __toESM(require("path"));
class SyncEngine {
  manager;
  walDir;
  _watcher;
  _debounceTimer;
  constructor(notebookManager, walDir) {
    this.manager = notebookManager;
    this.walDir = walDir;
    this._watcher = null;
    this._debounceTimer = null;
  }
  start() {
    if (!import_fs4.default.existsSync(this.walDir)) {
      import_fs4.default.mkdirSync(this.walDir, { recursive: true });
    }
    try {
      this._watcher = import_fs4.default.watch(this.walDir, (eventType, filename) => {
        if (!filename || !filename.endsWith(".json") || filename.endsWith(".tmp"))
          return;
        if (this._debounceTimer)
          clearTimeout(this._debounceTimer);
        this._debounceTimer = setTimeout(() => {
          this._reconcile();
        }, 100);
      });
      this._watcher.on("error", (err) => {
        console.error("Sync watcher error:", err);
      });
    } catch (err) {
      console.error("Failed to start file watcher:", err);
    }
  }
  stop() {
    if (this._watcher) {
      this._watcher.close();
      this._watcher = null;
    }
    if (this._debounceTimer)
      clearTimeout(this._debounceTimer);
  }
  _reconcile() {
    const batches = WAL.listBatches(this.walDir);
    for (const batchFile of batches) {
      if (this.manager.appliedBatches.has(batchFile))
        continue;
      try {
        const batch = WAL.readBatch(import_path3.default.join(this.walDir, batchFile));
        if (batch.deviceId === this.manager.deviceId) {
          this.manager.appliedBatches.add(batchFile);
          continue;
        }
        this.manager.applyRemoteBatch(batchFile, batch);
      } catch (err) {
        console.error(`Failed to read batch ${batchFile}:`, err);
      }
    }
  }
  reconcile() {
    this._reconcile();
  }
}

// src/notebook.ts
var MARKER_FILE = "open.notebound";
var META_FILE = "meta.json";
var SNAPSHOT_THRESHOLD = 50;

class NotebookManager {
  notebookPath;
  state;
  wal;
  sync;
  deviceId;
  notebookId;
  appliedBatches;
  _onStateChange;
  crdts;
  snapshotCacheDir;
  constructor() {
    this.notebookPath = null;
    this.state = null;
    this.wal = null;
    this.sync = null;
    this.deviceId = null;
    this.appliedBatches = new Set;
    this._onStateChange = null;
    this.crdts = new Map;
    this.snapshotCacheDir = null;
  }
  create(dirPath) {
    import_fs5.default.mkdirSync(dirPath, { recursive: true });
    import_fs5.default.mkdirSync(import_path4.default.join(dirPath, "wal"), { recursive: true });
    import_fs5.default.mkdirSync(import_path4.default.join(dirPath, "blobs"), { recursive: true });
    import_fs5.default.writeFileSync(import_path4.default.join(dirPath, MARKER_FILE), "");
    const notebookId = import_crypto2.default.randomUUID();
    const meta = {
      name: import_path4.default.basename(dirPath, ".notebound"),
      createdAt: Date.now(),
      notebookId
    };
    import_fs5.default.writeFileSync(import_path4.default.join(dirPath, META_FILE), JSON.stringify(meta, null, 2));
    return meta;
  }
  open(dirPath, deviceId, userDataPath) {
    this.notebookPath = dirPath;
    if (!import_fs5.default.existsSync(dirPath)) {
      this.create(dirPath);
    }
    for (const sub of ["wal", "blobs"]) {
      import_fs5.default.mkdirSync(import_path4.default.join(dirPath, sub), { recursive: true });
    }
    const markerPath = import_path4.default.join(dirPath, MARKER_FILE);
    if (!import_fs5.default.existsSync(markerPath)) {
      import_fs5.default.writeFileSync(markerPath, "");
    }
    const metaPath = import_path4.default.join(dirPath, META_FILE);
    if (!import_fs5.default.existsSync(metaPath)) {
      this.create(dirPath);
    }
    const meta = JSON.parse(import_fs5.default.readFileSync(metaPath, "utf8"));
    if (!meta.notebookId) {
      meta.notebookId = this._detectNotebookId(import_path4.default.join(dirPath, "wal")) || import_crypto2.default.randomUUID();
      import_fs5.default.writeFileSync(metaPath, JSON.stringify(meta, null, 2));
    }
    this.deviceId = deviceId || import_crypto2.default.randomUUID();
    this.notebookId = meta.notebookId;
    if (userDataPath) {
      this.snapshotCacheDir = import_path4.default.join(userDataPath, "snapshots", meta.notebookId);
    } else {
      this.snapshotCacheDir = import_path4.default.join(dirPath, "snapshots");
    }
    import_fs5.default.mkdirSync(this.snapshotCacheDir, { recursive: true });
    const walDir = import_path4.default.join(dirPath, "wal");
    const result = rebuildState(this.snapshotCacheDir, walDir, meta.notebookId, meta.name);
    this.state = result.state;
    this.appliedBatches = result.appliedBatches;
    this._migrateBlockPositions();
    this.wal = new WAL;
    this.wal.startAutoSeal(this.deviceId, walDir);
    this.sync = new SyncEngine(this, walDir);
    this.sync.start();
    return this.state;
  }
  _migrateBlockPositions() {
    function migratePages(pages) {
      for (const pg of pages) {
        for (const b of pg.blocks || []) {
          if (b.type === "text" && b.y === 0 && (b.x === 28 || b.x === 16)) {
            b.x = 0;
          }
        }
        if (pg.children?.length)
          migratePages(pg.children);
      }
    }
    for (const nb of this.state.notebooks || []) {
      for (const sec of nb.sections || []) {
        migratePages(sec.pages || []);
      }
    }
  }
  _detectNotebookId(walDir) {
    const batches = WAL.listBatches(walDir);
    for (const file of batches) {
      const batch = WAL.readBatch(import_path4.default.join(walDir, file));
      for (const op of batch.ops) {
        if (op.notebookId)
          return op.notebookId;
      }
    }
    return null;
  }
  applyOp(op) {
    if (!op.deviceId)
      op.deviceId = this.deviceId;
    if (!op.timestamp)
      op.timestamp = Date.now();
    if (!op.id)
      op.id = import_crypto2.default.randomUUID();
    if (op.type === "block-text-diff")
      return this._applyBlockTextDiff(op);
    if (op.type === "block-text-op") {
      this._applyBlockTextOp(op);
      this.wal.append(op);
      return this.state;
    }
    if (op.type === "page-view") {
      this.state = applyOp(this.state, op);
      return this.state;
    }
    this.state = applyOp(this.state, op);
    this.wal.append(op);
    return this.state;
  }
  applyRemoteBatch(batchFile, batch) {
    if (this.appliedBatches.has(batchFile))
      return;
    for (const op of batch.ops) {
      if (op.type === "block-text-op") {
        this._applyBlockTextOp(op);
      } else {
        this.state = applyOp(this.state, op);
      }
    }
    this.appliedBatches.add(batchFile);
    if (this._onStateChange)
      this._onStateChange(this.state);
  }
  getState() {
    return this.state;
  }
  onStateChange(callback) {
    this._onStateChange = callback;
  }
  flush() {
    if (!this.wal || !this.notebookPath)
      return;
    const walDir = import_path4.default.join(this.notebookPath, "wal");
    const filename = this.wal.seal(this.deviceId, walDir);
    if (filename) {
      this.appliedBatches.add(filename);
    }
    const batchCount = WAL.listBatches(walDir).length;
    if (batchCount > SNAPSHOT_THRESHOLD && this.snapshotCacheDir) {
      this._serializeCrdts();
      createSnapshot(this.state, this.snapshotCacheDir, Array.from(this.appliedBatches), this.deviceId);
    }
  }
  close() {
    console.log("[notebound] NotebookManager.close() called, path:", this.notebookPath, "wal:", !!this.wal, "pending:", this.wal?.pendingCount);
    if (this.sync) {
      this.sync.stop();
      this.sync = null;
    }
    if (this.wal) {
      this.wal.stopAutoSeal();
      if (this.notebookPath) {
        const walDir = import_path4.default.join(this.notebookPath, "wal");
        const filename = this.wal.seal(this.deviceId, walDir);
        console.log("[notebound] sealed WAL batch:", filename);
        if (filename)
          this.appliedBatches.add(filename);
        if (this.snapshotCacheDir) {
          this._serializeCrdts();
          const snapFile = createSnapshot(this.state, this.snapshotCacheDir, Array.from(this.appliedBatches), this.deviceId);
          console.log("[notebound] created snapshot:", snapFile);
        }
      }
      this.wal = null;
    }
    this.notebookPath = null;
    this.snapshotCacheDir = null;
    this.state = null;
    this.deviceId = null;
  }
  _getOrInitCrdt(blockId) {
    let crdt = this.crdts.get(blockId);
    if (crdt)
      return crdt;
    let blk = null;
    for (const nb of this.state.notebooks) {
      for (const sec of nb.sections) {
        blk = this._findBlockInPages(sec.pages, blockId);
        if (blk)
          break;
      }
      if (blk)
        break;
    }
    if (blk?.crdt) {
      crdt = TextCRDT.fromSnapshot(blk.crdt);
    } else {
      crdt = new TextCRDT(this.deviceId);
      if (blk?.html) {
        const text = blk.html.replace(/<br\s*\/?>/gi, `
`).replace(/<[^>]*>/g, "");
        if (text)
          crdt.insertTextAt(0, text);
      }
    }
    this.crdts.set(blockId, crdt);
    return crdt;
  }
  _applyBlockTextDiff(diffOp) {
    const pageId = diffOp.pageId;
    const blockId = diffOp.blockId;
    const diffs = diffOp.diffs;
    const crdt = this._getOrInitCrdt(blockId);
    const crdtOps = [];
    for (const diff of diffs) {
      if (diff.type === "insert") {
        const ops = crdt.insertTextAt(diff.pos, diff.text);
        crdtOps.push(...ops);
      } else if (diff.type === "delete") {
        for (let i = 0;i < diff.count; i++) {
          const op = crdt.deleteAt(diff.pos);
          if (op)
            crdtOps.push(op);
        }
      }
    }
    if (crdtOps.length === 0)
      return this.state;
    const result = findPageInState(this.state, pageId);
    if (result) {
      const blk = result.page.blocks.find((b) => b.id === blockId);
      if (blk)
        blk.html = applyDiffsToHtml(blk.html || "", diffs);
    }
    const walOp = {
      id: import_crypto2.default.randomUUID(),
      deviceId: this.deviceId,
      timestamp: Date.now(),
      type: "block-text-op",
      pageId,
      blockId,
      crdtOps
    };
    this.wal.append(walOp);
    return this.state;
  }
  _applyBlockTextOp(op) {
    const crdt = this._getOrInitCrdt(op.blockId);
    const oldText = crdt.getText();
    const crdtOps = op.crdtOps || [];
    for (const crdtOp of crdtOps)
      crdt.apply(crdtOp);
    const newText = crdt.getText();
    if (oldText !== newText) {
      const result = findPageInState(this.state, op.pageId);
      if (result) {
        const blk = result.page.blocks.find((b) => b.id === op.blockId);
        if (blk)
          blk.html = applyTextChangeToHtml(blk.html || "", oldText, newText);
      }
    }
  }
  _serializeCrdts() {
    const walkPages = (pages) => {
      for (const page of pages) {
        for (const blk of page.blocks || []) {
          const crdt = this.crdts.get(blk.id);
          if (crdt)
            blk.crdt = crdt.snapshot();
        }
        if (page.children?.length)
          walkPages(page.children);
      }
    };
    for (const nb of this.state.notebooks) {
      for (const sec of nb.sections)
        walkPages(sec.pages);
    }
  }
  _findBlockInPages(pages, blockId) {
    for (const page of pages) {
      const blk = page.blocks?.find((b) => b.id === blockId);
      if (blk)
        return blk;
      if (page.children?.length) {
        const found = this._findBlockInPages(page.children, blockId);
        if (found)
          return found;
      }
    }
    return null;
  }
  get walDir() {
    return this.notebookPath ? import_path4.default.join(this.notebookPath, "wal") : null;
  }
  get snapshotsDir() {
    return this.snapshotCacheDir || null;
  }
  get blobsDir() {
    return this.notebookPath ? import_path4.default.join(this.notebookPath, "blobs") : null;
  }
}

// src/blobs.ts
var import_fs6 = __toESM(require("fs"));
var import_path5 = __toESM(require("path"));
var import_crypto3 = __toESM(require("crypto"));
function hash(buffer) {
  return import_crypto3.default.createHash("sha256").update(buffer).digest("hex");
}
function store(buffer, blobsDir, meta = null) {
  const h = hash(buffer);
  const filePath = import_path5.default.join(blobsDir, h);
  if (!import_fs6.default.existsSync(filePath)) {
    import_fs6.default.mkdirSync(blobsDir, { recursive: true });
    const tmpPath = filePath + ".tmp";
    import_fs6.default.writeFileSync(tmpPath, buffer);
    import_fs6.default.renameSync(tmpPath, filePath);
  }
  if (meta) {
    const metaPath = filePath + ".meta.json";
    if (!import_fs6.default.existsSync(metaPath)) {
      import_fs6.default.writeFileSync(metaPath, JSON.stringify(meta));
    }
  }
  return h;
}
function get(h, blobsDir) {
  const filePath = import_path5.default.join(blobsDir, h);
  if (!import_fs6.default.existsSync(filePath))
    return null;
  return import_fs6.default.readFileSync(filePath);
}
function getMeta(h, blobsDir) {
  const metaPath = import_path5.default.join(blobsDir, h + ".meta.json");
  if (!import_fs6.default.existsSync(metaPath))
    return null;
  return JSON.parse(import_fs6.default.readFileSync(metaPath, "utf8"));
}

// src/claude-vfs.ts
var import_fs7 = __toESM(require("fs"));
var import_path6 = __toESM(require("path"));
var import_os = __toESM(require("os"));
var import_crypto4 = __toESM(require("crypto"));
function sanitizeName(name) {
  return name.replace(/[/\\\0]/g, "_").replace(/[<>:"|?*]/g, "_").slice(0, 200).trim() || "Untitled";
}
function deduplicate(name, existing) {
  if (!existing.has(name)) {
    existing.add(name);
    return name;
  }
  let i = 2;
  while (existing.has(`${name} (${i})`))
    i++;
  const deduped = `${name} (${i})`;
  existing.add(deduped);
  return deduped;
}
function blocksToHtml(blocks, blobsLinkDir) {
  const sorted = [...blocks].sort((a, b) => a.y - b.y || a.x - b.x);
  const parts = [];
  for (const b of sorted) {
    if (b.type === "image" && b.src) {
      const src = b.src.startsWith("blob:") ? import_path6.default.join(blobsLinkDir, b.src.slice(5)) : b.src;
      parts.push(`<img src="${src}" />`);
    } else {
      parts.push(b.html || "");
    }
  }
  return parts.join(`
`);
}
function writePages(pages, dir, blobsLinkDir, existing, pageMap) {
  for (const page of pages) {
    const safeName = deduplicate(sanitizeName(page.title || "Untitled Page"), existing);
    const html = blocksToHtml(page.blocks || [], blobsLinkDir);
    import_fs7.default.writeFileSync(import_path6.default.join(dir, safeName + ".html"), html, "utf8");
    pageMap.set(page.id, dir);
    if (page.children && page.children.length > 0) {
      const childDir = import_path6.default.join(dir, safeName);
      import_fs7.default.mkdirSync(childDir, { recursive: true });
      const childNames = new Set;
      writePages(page.children, childDir, blobsLinkDir, childNames, pageMap);
    }
  }
}
function getRunDir() {
  const xdg = process.env.XDG_RUNTIME_DIR;
  if (xdg)
    return import_path6.default.join(xdg, "notebound");
  return import_path6.default.join(import_os.default.homedir(), ".cache", "notebound", "run");
}
function createVFS(state, notebookDir) {
  const sessionId = import_crypto4.default.randomUUID();
  const basePath = import_path6.default.join(getRunDir(), `project-${sessionId}`);
  import_fs7.default.mkdirSync(basePath, { recursive: true });
  const blobsSrc = import_path6.default.join(notebookDir, "blobs");
  const blobsDst = import_path6.default.join(basePath, ".blobs");
  if (import_fs7.default.existsSync(blobsSrc)) {
    try {
      import_fs7.default.symlinkSync(blobsSrc, blobsDst, "dir");
    } catch {}
  }
  const pageMap = new Map;
  const nb = state.notebooks?.[0];
  if (!nb)
    return { sessionId, basePath, pageMap };
  for (const sec of nb.sections || []) {
    const secName = sanitizeName(sec.title || "Untitled Section");
    const secDir = import_path6.default.join(basePath, secName);
    import_fs7.default.mkdirSync(secDir, { recursive: true });
    const pageNames = new Set;
    writePages(sec.pages || [], secDir, import_path6.default.join(basePath, ".blobs"), pageNames, pageMap);
  }
  return { sessionId, basePath, pageMap };
}
function cleanupVFS(basePath) {
  if (!basePath)
    return;
  const runDir = getRunDir();
  if (!basePath.startsWith(runDir))
    return;
  try {
    import_fs7.default.rmSync(basePath, { recursive: true, force: true });
  } catch {}
}

// src/claude-agent.ts
var import_child_process = require("child_process");
var import_crypto5 = __toESM(require("crypto"));

class ClaudeAgent {
  cwd;
  context;
  mcpConfigPath;
  sessionId;
  firstMessage;
  proc;
  constructor(cwd, context, mcpConfigPath) {
    this.cwd = cwd;
    this.context = context || "";
    this.mcpConfigPath = mcpConfigPath || null;
    this.sessionId = import_crypto5.default.randomUUID();
    this.firstMessage = true;
    this.proc = null;
  }
  sendMessage(text, onData) {
    console.log("[claude] <- user:", text);
    let prompt = text;
    if (this.firstMessage && this.context) {
      prompt = this.context + `

` + text;
    }
    const args = [
      "-p",
      prompt,
      "--output-format",
      "stream-json",
      "--verbose",
      "--model",
      "haiku"
    ];
    if (this.firstMessage) {
      args.push("--session-id", this.sessionId);
      this.firstMessage = false;
    } else {
      args.push("--resume", this.sessionId);
    }
    args.push("--allowedTools", "Read", "Glob", "Grep", "mcp__notebound-display__display_webpage", "mcp__notebound-display__refresh_webpage", "mcp__notebound-display__close_webpage", "--dangerously-skip-permissions");
    if (this.mcpConfigPath) {
      args.push("--strict-mcp-config", "--mcp-config", this.mcpConfigPath);
    }
    const env = { ...process.env };
    delete env.CLAUDECODE;
    delete env.CLAUDE_CODE;
    const cmdStr = ["claude", ...args].map((a) => /[\s"']/.test(a) ? JSON.stringify(a) : a).join(" ");
    console.log("[claude] $", cmdStr);
    this.proc = import_child_process.spawn("claude", args, {
      cwd: this.cwd,
      env,
      stdio: ["ignore", "pipe", "pipe"]
    });
    let buffer = "";
    this.proc.stdout.on("data", (chunk) => {
      const raw = chunk.toString();
      console.log("[claude] raw stdout (%d bytes):", raw.length, raw.slice(0, 300));
      buffer += raw;
      const lines = buffer.split(`
`);
      buffer = lines.pop();
      for (const line of lines) {
        if (!line.trim())
          continue;
        try {
          const data = JSON.parse(line);
          if (data.type === "assistant") {
            const content = data.message?.content || [];
            const texts = content.filter((c) => c.type === "text").map((c) => c.text);
            const toolUses = content.filter((c) => c.type === "tool_use");
            if (texts.length) {
              console.log("[claude] -> text:", texts.join("").slice(0, 200));
              onData({ type: "text", content: texts.join("") });
            }
            if (toolUses.length) {
              for (const tu of toolUses) {
                console.log("[claude] -> tool_use:", tu.name, JSON.stringify(tu.input).slice(0, 200));
                onData({ type: "tool_use", tool: tu.name, input: tu.input });
              }
            }
          } else if (data.type === "result") {
            console.log("[claude] -> done, cost:", data.total_cost_usd, "result:", (data.result || "").slice(0, 200));
            onData({ type: "done", result: data.result || "", cost: data.total_cost_usd ?? null });
          }
        } catch {}
      }
    });
    let stderr = "";
    this.proc.stderr.on("data", (chunk) => {
      const s = chunk.toString();
      stderr += s;
      if (s.trim())
        console.log("[claude] stderr:", s.trim().slice(0, 300));
    });
    this.proc.on("close", (code) => {
      console.log("[claude] process closed, code:", code);
      let gotResult = false;
      if (buffer.trim()) {
        try {
          const data = JSON.parse(buffer);
          if (data.type === "assistant") {
            const content = data.message?.content || [];
            const texts = content.filter((c) => c.type === "text").map((c) => c.text);
            if (texts.length)
              onData({ type: "text", content: texts.join("") });
          } else if (data.type === "result") {
            onData({ type: "done", result: data.result || "", cost: data.total_cost_usd ?? null });
            gotResult = true;
          }
        } catch {}
      }
      if (code !== 0 && stderr) {
        onData({ type: "error", message: stderr.slice(0, 500) });
      } else if (!gotResult) {
        onData({ type: "done", result: "", cost: null });
      }
      this.proc = null;
    });
    this.proc.on("error", (err) => {
      console.error("[claude] spawn error:", err.message);
      onData({ type: "error", message: err.message });
      this.proc = null;
    });
  }
  interrupt() {
    if (!this.proc)
      return;
    const p = this.proc;
    this.proc = null;
    try {
      p.kill("SIGINT");
    } catch {}
    setTimeout(() => {
      try {
        if (!p.killed)
          p.kill("SIGKILL");
      } catch {}
    }, 500);
  }
  kill() {
    this.interrupt();
  }
}

// src/ipc.ts
var manager = null;
var mainWindow = null;
var _deviceId = null;
var _claudeAgent = null;
var _claudeVfsPath = null;
var _claudePageMap = null;
var _userDataPath = null;
var _mcpSocketServer = null;
var _mcpSocketPath = null;
function _findPage(pages, id) {
  for (const p of pages) {
    if (p.id === id)
      return p;
    if (p.children?.length) {
      const f = _findPage(p.children, id);
      if (f)
        return f;
    }
  }
  return null;
}
function setupIPC(win, deviceId, userDataPath) {
  mainWindow = win;
  _deviceId = deviceId;
  _userDataPath = userDataPath;
  manager = new NotebookManager;
  import_electron.ipcMain.handle("window:minimize", () => mainWindow.minimize());
  import_electron.ipcMain.handle("window:maximize", () => {
    if (mainWindow.isMaximized())
      mainWindow.unmaximize();
    else
      mainWindow.maximize();
  });
  import_electron.ipcMain.handle("window:close", () => mainWindow.close());
  import_electron.ipcMain.on("renderer:log", (_event, ...args) => {
    console.log("[renderer]", ...args);
  });
  import_electron.ipcMain.handle("notebook:open", async (_event, notebookPath) => {
    console.log("[ipc] notebook:open called, path:", notebookPath);
    if (manager.notebookPath) {
      console.log("[ipc] closing existing notebook:", manager.notebookPath);
      manager.close();
    }
    if (notebookPath === "__default__") {
      const dropbox = import_path7.default.join(import_os2.default.homedir(), "Dropbox", "Notes");
      notebookPath = import_path7.default.join(dropbox, "My Notebook.notebound");
    }
    const state = manager.open(notebookPath, _deviceId, _userDataPath);
    console.log("[ipc] notebook:open result -- notebooks:", state?.notebooks?.length, "sections:", state?.notebooks?.[0]?.sections?.length, "ui:", JSON.stringify(state?.ui));
    manager.onStateChange((newState) => {
      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.webContents.send("notebook:state-changed", newState);
      }
    });
    return state;
  });
  import_electron.ipcMain.handle("notebook:get-state", async () => {
    return manager ? manager.getState() : null;
  });
  import_electron.ipcMain.on("notebook:apply-op", (_event, op) => {
    if (manager)
      manager.applyOp(op);
  });
  import_electron.ipcMain.on("notebook:apply-ops", (_event, ops) => {
    if (!manager)
      return;
    for (const op of ops)
      manager.applyOp(op);
  });
  import_electron.ipcMain.on("notebook:flush", () => {
    if (manager)
      manager.flush();
  });
  import_electron.ipcMain.handle("notebook:save-blob", async (_event, data, meta) => {
    if (!manager || !manager.blobsDir)
      return null;
    const buffer = Buffer.from(data);
    const blobMeta = { mimeType: meta?.mimeType || "application/octet-stream", ...meta };
    return store(buffer, manager.blobsDir, blobMeta);
  });
  import_electron.ipcMain.handle("notebook:get-blob", async (_event, hash2) => {
    if (!manager || !manager.blobsDir)
      return null;
    const data = get(hash2, manager.blobsDir);
    if (!data)
      return null;
    const meta = getMeta(hash2, manager.blobsDir);
    const mimeType = meta?.mimeType || "application/octet-stream";
    return `data:${mimeType};base64,${data.toString("base64")}`;
  });
  import_electron.ipcMain.handle("notebook:pick-directory", async () => {
    const result = await import_electron.dialog.showOpenDialog(mainWindow, {
      properties: ["openDirectory"],
      title: "Open Notebook",
      buttonLabel: "Open Notebook"
    });
    if (result.canceled || result.filePaths.length === 0)
      return null;
    return result.filePaths[0];
  });
  import_electron.ipcMain.handle("notebook:pick-save-path", async () => {
    const result = await import_electron.dialog.showSaveDialog(mainWindow, {
      title: "Create New Notebook",
      defaultPath: "MyNotebook.notebound",
      buttonLabel: "Create"
    });
    if (result.canceled)
      return null;
    let p = result.filePath;
    if (!p.endsWith(".notebound"))
      p += ".notebound";
    return p;
  });
  import_electron.ipcMain.handle("notebook:get-path", async () => {
    return manager ? manager.notebookPath : null;
  });
  import_electron.ipcMain.handle("notebook:fetch-image", async (_event, url) => {
    const resp = await import_electron.net.fetch(url);
    if (!resp.ok)
      throw new Error("fetch failed: " + resp.status);
    const contentType = resp.headers.get("content-type") || "image/png";
    const buffer = Buffer.from(await resp.arrayBuffer());
    return { buffer, contentType, size: buffer.length };
  });
  import_electron.ipcMain.on("notebook:save-config", (_event, info) => {
    const notebookPath = typeof info === "string" ? info : info.path;
    const name = typeof info === "object" && info.name || import_path7.default.basename(notebookPath, ".notebound");
    console.log("[ipc] save-config -- path:", notebookPath, "name:", name);
    config.notebookPath = notebookPath;
    const recents = Array.isArray(config.recentNotebooks) ? config.recentNotebooks : [];
    const entry = { path: notebookPath, name, lastOpened: Date.now() };
    const filtered = recents.filter((r) => r.path !== notebookPath);
    filtered.unshift(entry);
    config.recentNotebooks = filtered.slice(0, 10);
    writeConfig();
    console.log("[ipc] config written, notebookPath now:", config.notebookPath);
  });
  function startMcpSocket() {
    if (_mcpSocketServer)
      return _mcpSocketPath;
    const runDir = process.env.XDG_RUNTIME_DIR ? import_path7.default.join(process.env.XDG_RUNTIME_DIR, "notebound") : import_path7.default.join(import_os2.default.homedir(), ".cache", "notebound", "run");
    import_fs8.default.mkdirSync(runDir, { recursive: true });
    _mcpSocketPath = import_path7.default.join(runDir, `display-${process.pid}.sock`);
    try {
      import_fs8.default.unlinkSync(_mcpSocketPath);
    } catch {}
    _mcpSocketServer = import_net.default.createServer((conn) => {
      let data = "";
      conn.on("error", () => {});
      conn.on("data", (chunk) => {
        data += chunk.toString();
      });
      conn.on("end", () => {
        try {
          const cmd = JSON.parse(data.trim());
          console.log("[mcp-socket] received:", cmd);
          if (mainWindow && !mainWindow.isDestroyed()) {
            mainWindow.webContents.send("display:command", cmd);
          }
        } catch (err) {
          console.error("[mcp-socket] parse error:", err.message);
        }
        try {
          conn.end();
        } catch {}
      });
    });
    _mcpSocketServer.listen(_mcpSocketPath, () => {
      console.log("[mcp-socket] listening on", _mcpSocketPath);
    });
    return _mcpSocketPath;
  }
  function stopMcpSocket() {
    if (_mcpSocketServer) {
      _mcpSocketServer.close();
      _mcpSocketServer = null;
    }
    if (_mcpSocketPath) {
      try {
        import_fs8.default.unlinkSync(_mcpSocketPath);
      } catch {}
      _mcpSocketPath = null;
    }
  }
  import_electron.ipcMain.handle("claude:start", async (_event, pageId) => {
    if (_claudeAgent) {
      _claudeAgent.kill();
      _claudeAgent = null;
    }
    if (_claudeVfsPath) {
      cleanupVFS(_claudeVfsPath);
      _claudeVfsPath = null;
    }
    _claudePageMap = null;
    if (!manager || !manager.state)
      throw new Error("No notebook open");
    const { sessionId, basePath, pageMap } = createVFS(manager.state, manager.notebookPath);
    _claudeVfsPath = basePath;
    _claudePageMap = pageMap;
    const cwd = pageId && pageMap.get(pageId) || basePath;
    const socketPath = startMcpSocket();
    const mcpConfig = {
      mcpServers: {
        "notebound-display": {
          command: "bun",
          args: ["run", import_path7.default.join(import_electron.app.getAppPath(), "src", "mcp-server.ts")],
          env: { NOTEBOUND_SOCKET: socketPath }
        }
      }
    };
    const mcpConfigPath = import_path7.default.join(import_path7.default.dirname(socketPath), `mcp-config-${process.pid}.json`);
    import_fs8.default.writeFileSync(mcpConfigPath, JSON.stringify(mcpConfig), "utf8");
    const state = manager.state;
    const nb = state.notebooks?.[0];
    let context = "You are a helpful assistant with read-only access to a Notebound notebook.";
    if (nb) {
      context += `
Notebook: "${nb.title}"`;
      if (pageId) {
        for (const sec of nb.sections || []) {
          const page = _findPage(sec.pages, pageId);
          if (page) {
            context += `
Current section: "${sec.title}"`;
            context += `
Current page: "${page.title}"`;
            break;
          }
        }
      }
    }
    context += `
Your working directory contains the notebook content as HTML files organized by section.`;
    context += `

You have access to a display panel tool (notebound-display MCP) that can show webpages in the app. When you want to show the user a webpage or HTML file, use the display_webpage tool. You can also refresh or close the display panel.`;
    _claudeAgent = new ClaudeAgent(cwd, context, mcpConfigPath);
    console.log("[claude] started session, VFS at", basePath, "cwd:", cwd, "mcp:", mcpConfigPath);
    return { sessionId };
  });
  import_electron.ipcMain.handle("claude:message", async (_event, text) => {
    console.log("[ipc] claude:message received, agent exists:", !!_claudeAgent);
    if (!_claudeAgent)
      throw new Error("No Claude session");
    _claudeAgent.sendMessage(text, (data) => {
      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.webContents.send("claude:stream", data);
      }
    });
  });
  import_electron.ipcMain.handle("claude:interrupt", async () => {
    if (_claudeAgent)
      _claudeAgent.interrupt();
  });
  import_electron.ipcMain.handle("claude:stop", async () => {
    if (_claudeAgent) {
      _claudeAgent.kill();
      _claudeAgent = null;
    }
    if (_claudeVfsPath) {
      cleanupVFS(_claudeVfsPath);
      _claudeVfsPath = null;
    }
    console.log("[claude] session stopped");
  });
  import_electron.ipcMain.handle("shell:open-external", async (_event, url) => {
    if (typeof url === "string" && (url.startsWith("http://") || url.startsWith("https://"))) {
      import_electron.shell.openExternal(url);
    }
  });
  function execAsync(cmd, opts) {
    return new Promise((resolve, reject) => {
      import_child_process2.exec(cmd, opts, (err, stdout, stderr) => {
        if (err) {
          err.stderr = stderr;
          reject(err);
        } else
          resolve(stdout);
      });
    });
  }
  function getPublishConfig() {
    if (!manager || !manager.notebookPath)
      return null;
    const metaPath = import_path7.default.join(manager.notebookPath, "meta.json");
    const meta = JSON.parse(import_fs8.default.readFileSync(metaPath, "utf8"));
    return meta.publish || null;
  }
  function ghPagesUrl(remote) {
    const match = remote.match(/github\.com[:/]([^/]+)\/([^/.]+)/);
    if (match)
      return `https://${match[1]}.github.io/${match[2]}/`;
    return null;
  }
  async function ensureGitRepo(exportDir, remote) {
    const gitDir = import_path7.default.join(exportDir, ".git");
    if (!import_fs8.default.existsSync(gitDir)) {
      import_fs8.default.mkdirSync(exportDir, { recursive: true });
      await execAsync("git init", { cwd: exportDir });
      await execAsync(`git remote add origin ${remote}`, { cwd: exportDir });
      try {
        await execAsync("git fetch origin && git checkout -b main origin/main", { cwd: exportDir });
      } catch {}
    }
  }
  import_electron.ipcMain.handle("web:publish", async () => {
    if (!manager || !manager.notebookPath)
      throw new Error("No notebook open");
    const pub = getPublishConfig();
    if (!pub)
      throw new Error('No publish config in meta.json. Add a "publish" field with "remote" and "exportDir".');
    const { remote, exportDir } = pub;
    await ensureGitRepo(exportDir, remote);
    try {
      await execAsync("git pull --rebase origin main", { cwd: exportDir });
    } catch {}
    await new Promise((resolve, reject) => {
      const script = import_path7.default.join(import_electron.app.getAppPath(), "scripts", "export-web.ts");
      const child = import_child_process2.spawn("bun", ["run", script, manager.notebookPath, exportDir], { stdio: ["ignore", "pipe", "pipe"] });
      let stderr = "";
      child.stderr?.on("data", (chunk) => {
        stderr += chunk.toString();
      });
      child.on("exit", (code) => {
        if (code === 0)
          return resolve();
        console.error("[web:publish] export-web failed (exit " + code + `):
` + stderr);
        reject(new Error("Export failed (exit " + code + "): " + stderr.trim()));
      });
      child.on("error", (err) => {
        console.error("[web:publish] export-web error:", err);
        reject(err);
      });
    });
    await execAsync("git add -A", { cwd: exportDir });
    await execAsync('git commit -m "update" --allow-empty', { cwd: exportDir });
    await execAsync("git push -u origin main", { cwd: exportDir });
    return { url: ghPagesUrl(remote) };
  });
  import_electron.ipcMain.handle("web:open-dir", async () => {
    const pub = getPublishConfig();
    if (!pub)
      throw new Error("No publish config");
    import_electron.shell.openPath(pub.exportDir);
  });
  import_electron.ipcMain.handle("web:open-site", async () => {
    const pub = getPublishConfig();
    if (!pub)
      throw new Error("No publish config");
    const url = ghPagesUrl(pub.remote);
    if (url)
      import_electron.shell.openExternal(url);
    return { url };
  });
  import_electron.ipcMain.handle("web:get-publish-url", async () => {
    const pub = getPublishConfig();
    return pub?.remote ? ghPagesUrl(pub.remote) : null;
  });
  import_electron.ipcMain.on("notebook:save-ui-state", (_event, notebookPath, uiState) => {
    if (!config.uiPositions)
      config.uiPositions = {};
    config.uiPositions[notebookPath] = uiState;
    debouncedWriteConfig();
  });
  import_electron.ipcMain.on("notebook:save-page-view", (_event, notebookPath, pageId, panX, panY, zoom) => {
    if (!config.pageViews)
      config.pageViews = {};
    if (!config.pageViews[notebookPath])
      config.pageViews[notebookPath] = {};
    const existing = config.pageViews[notebookPath][pageId] || {};
    config.pageViews[notebookPath][pageId] = { ...existing, panX, panY, zoom };
    debouncedWriteConfig();
  });
  import_electron.ipcMain.on("notebook:save-page-caret", (_event, notebookPath, pageId, caretBlockId, caretOffset) => {
    if (!config.pageViews)
      config.pageViews = {};
    if (!config.pageViews[notebookPath])
      config.pageViews[notebookPath] = {};
    const existing = config.pageViews[notebookPath][pageId] || {};
    config.pageViews[notebookPath][pageId] = { ...existing, caretBlockId, caretOffset };
    debouncedWriteConfig();
  });
  import_electron.ipcMain.handle("notebook:get-config", async () => {
    console.log("[ipc] get-config -- notebookPath:", config.notebookPath, "recents:", config.recentNotebooks?.length ?? 0);
    return config;
  });
}
function openDefault(win, notebookPath, deviceId, userDataPath) {
  mainWindow = win;
  _deviceId = deviceId;
  _userDataPath = userDataPath;
  console.log("[notebound] openDefault called, path:", notebookPath, "manager:", !!manager);
  try {
    if (!manager)
      manager = new NotebookManager;
    if (manager.notebookPath)
      manager.close();
    manager.open(notebookPath, deviceId, userDataPath);
    config.notebookPath = notebookPath;
    writeConfig();
    console.log("[notebound] notebook opened, state notebooks:", manager.state?.notebooks?.length);
  } catch (err) {
    console.error("[notebound] openDefault failed:", err.message);
    const notify = () => {
      if (win && !win.isDestroyed()) {
        win.webContents.send("notebook:open-failed");
      }
    };
    if (win.webContents.isLoading()) {
      win.webContents.once("did-finish-load", notify);
    } else {
      notify();
    }
    return;
  }
  manager.onStateChange((newState) => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send("notebook:state-changed", newState);
    }
  });
  const pushInitialState = () => {
    if (manager.state && win && !win.isDestroyed()) {
      win.webContents.send("notebook:state-changed", manager.state);
    }
  };
  if (win.webContents.isLoading()) {
    win.webContents.once("did-finish-load", pushInitialState);
  } else {
    pushInitialState();
  }
}
function closeNotebook() {
  console.log("[notebound] closeNotebook called, manager exists:", !!manager, "path:", manager?.notebookPath);
  if (_claudeAgent) {
    _claudeAgent.kill();
    _claudeAgent = null;
  }
  if (_claudeVfsPath) {
    cleanupVFS(_claudeVfsPath);
    _claudeVfsPath = null;
  }
  if (_mcpSocketServer) {
    _mcpSocketServer.close();
    _mcpSocketServer = null;
  }
  if (_mcpSocketPath) {
    try {
      import_fs8.default.unlinkSync(_mcpSocketPath);
    } catch {}
    try {
      import_fs8.default.unlinkSync(_mcpSocketPath.replace(".sock", "").replace("display-", "mcp-config-") + ".json");
    } catch {}
    _mcpSocketPath = null;
  }
  if (manager) {
    manager.close();
    console.log("[notebound] notebook closed, WAL sealed + snapshot written");
  }
}

// main.ts
var __dirname = "/home/liam/Documents/projects/onenote/v7/desktop";
var isMac = process.platform === "darwin";
import_electron2.app.name = "notebound";
if (process.platform === "linux") {
  import_electron2.app.setDesktopName?.("notebound.desktop");
}
var template = [
  ...isMac ? [{
    label: "Notebound",
    submenu: [
      { role: "about" },
      { type: "separator" },
      { role: "services" },
      { type: "separator" },
      { role: "hide" },
      { role: "hideOthers" },
      { role: "unhide" },
      { type: "separator" },
      { role: "quit" }
    ]
  }] : [],
  {
    label: "Edit",
    submenu: [
      { role: "undo" },
      { role: "redo" },
      { type: "separator" },
      { role: "cut" },
      { role: "copy" },
      { role: "paste" },
      { role: "selectAll" }
    ]
  },
  {
    label: "View",
    submenu: [
      {
        label: "Zoom In",
        accelerator: "CmdOrCtrl+=",
        click: () => {
          const w = import_electron2.BrowserWindow.getFocusedWindow();
          if (w)
            w.webContents.send("canvas:zoom", "in");
        }
      },
      {
        label: "Zoom In",
        accelerator: "CmdOrCtrl+Plus",
        visible: false,
        click: () => {
          const w = import_electron2.BrowserWindow.getFocusedWindow();
          if (w)
            w.webContents.send("canvas:zoom", "in");
        }
      },
      {
        label: "Zoom Out",
        accelerator: "CmdOrCtrl+-",
        click: () => {
          const w = import_electron2.BrowserWindow.getFocusedWindow();
          if (w)
            w.webContents.send("canvas:zoom", "out");
        }
      },
      {
        label: "Actual Size",
        accelerator: "CmdOrCtrl+0",
        click: () => {
          const w = import_electron2.BrowserWindow.getFocusedWindow();
          if (w)
            w.webContents.send("canvas:zoom", "reset");
        }
      }
    ]
  },
  ...isMac ? [{
    label: "Window",
    submenu: [
      { role: "minimize" },
      { role: "zoom" },
      { type: "separator" },
      { role: "front" }
    ]
  }] : [],
  {
    label: "Help",
    submenu: [
      {
        label: "Toggle DevTools",
        accelerator: "F12",
        click: (_menuItem, win) => {
          if (win && "webContents" in win)
            win.webContents.toggleDevTools();
        }
      }
    ]
  }
];
import_electron2.Menu.setApplicationMenu(import_electron2.Menu.buildFromTemplate(template));
var mainWindow2 = null;
var closed = false;
function shutdown() {
  if (closed)
    return;
  closed = true;
  console.log("[main] shutdown -- writing config, notebookPath:", config.notebookPath);
  flushConfig();
  closeNotebook();
}
function createWindow() {
  const configPath = import_path8.default.join(import_electron2.app.getPath("userData"), "config.json");
  initConfig(configPath);
  const { width, height } = import_electron2.screen.getPrimaryDisplay().workAreaSize;
  const opts = {
    width,
    height,
    x: 0,
    y: 0,
    autoHideMenuBar: true,
    minWidth: 800,
    minHeight: 560,
    ...isMac ? {
      titleBarStyle: "hiddenInset",
      trafficLightPosition: { x: 14, y: 13 }
    } : {
      frame: false
    },
    icon: import_electron2.nativeImage.createFromPath(import_path8.default.join(__dirname, process.platform === "darwin" ? "icon.icns" : "app/icon-256.png")),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      spellcheck: false,
      webSecurity: false,
      preload: import_path8.default.join(__dirname, "src", "preload.js")
    }
  };
  mainWindow2 = new import_electron2.BrowserWindow(opts);
  mainWindow2.maximize();
  const userDataPath = import_electron2.app.getPath("userData");
  setupIPC(mainWindow2, config.deviceId, userDataPath);
  mainWindow2.on("close", shutdown);
  mainWindow2.loadFile(import_path8.default.join(__dirname, "app", "index.html"));
  console.log("[main] config.notebookPath:", config.notebookPath);
  if (config.notebookPath) {
    setImmediate(() => openDefault(mainWindow2, config.notebookPath, config.deviceId, userDataPath));
  } else {
    console.log("[main] no notebookPath in config, will show welcome screen");
  }
}
import_electron2.app.whenReady().then(createWindow);
import_electron2.app.on("window-all-closed", () => {
  import_electron2.app.quit();
});
import_electron2.app.on("before-quit", shutdown);
import_electron2.app.on("activate", () => {
  if (import_electron2.BrowserWindow.getAllWindows().length === 0)
    createWindow();
});
process.on("SIGTERM", () => {
  shutdown();
  process.exit(0);
});
process.on("SIGINT", () => {
  shutdown();
  process.exit(0);
});
process.on("exit", shutdown);
