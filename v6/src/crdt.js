// Custom character-level text CRDT (RGA-based)
// Each character has a unique ID { device, counter }
// Operations: insert(id, parentId, char), delete(id)
// Deterministic ordering: concurrent inserts with same parent
// break ties by (counter DESC, device DESC)
//
// Uses a doubly-linked list for O(1) insert instead of array splice.

class TextCRDT {
  constructor(deviceId) {
    this.deviceId = deviceId;
    this.counter = 0;
    this.nodes = new Map(); // key -> node
    this._rootKey = '__root__:0';
    this.ROOT_ID = { device: '__root__', counter: 0 };
    const rootNode = {
      id: this.ROOT_ID,
      char: '',
      deleted: true,
      parentId: null,
      _key: this._rootKey,
      _next: null,
      _prev: null,
    };
    this.nodes.set(this._rootKey, rootNode);
    this._head = rootNode;
    this._tail = rootNode;
  }

  _key(id) {
    return id.device + ':' + id.counter;
  }

  _nextId() {
    this.counter++;
    return { device: this.deviceId, counter: this.counter };
  }

  _compareIds(a, b) {
    if (a.counter !== b.counter) return b.counter - a.counter;
    if (a.device < b.device) return 1;
    if (a.device > b.device) return -1;
    return 0;
  }

  // Insert a character after parentId
  insertAt(parentId, char) {
    const id = this._nextId();
    const op = { type: 'insert', id, parentId, char };
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
    if (!id || this._key(id) === this._rootKey) return null;
    const op = { type: 'delete', id };
    this.apply(op);
    return op;
  }

  _idAtVisiblePos(pos) {
    if (pos === -1) return this.ROOT_ID;
    let visible = -1;
    let node = this._head;
    while (node) {
      if (!node.deleted && node._key !== this._rootKey) {
        visible++;
        if (visible === pos) return node.id;
      }
      node = node._next;
    }
    return null;
  }

  apply(op) {
    if (op.type === 'insert') {
      return this._applyInsert(op);
    } else if (op.type === 'delete') {
      return this._applyDelete(op);
    }
  }

  // Insert node after `after` in the linked list
  _insertAfter(after, node) {
    node._prev = after;
    node._next = after._next;
    if (after._next) after._next._prev = node;
    else this._tail = node;
    after._next = node;
  }

  _applyInsert(op) {
    const key = this._key(op.id);
    if (this.nodes.has(key)) return;

    this.counter = Math.max(this.counter, op.id.counter);

    const node = {
      id: op.id,
      char: op.char,
      deleted: false,
      parentId: op.parentId,
      _key: key,
      _next: null,
      _prev: null,
    };

    if (this._pendingDeletes && this._pendingDeletes.has(key)) {
      node.deleted = true;
      this._pendingDeletes.delete(key);
    }

    this.nodes.set(key, node);

    const parentKey = this._key(op.parentId);
    const parent = this.nodes.get(parentKey);
    if (!parent) {
      // Parent not yet applied — append to tail
      this._insertAfter(this._tail, node);
      return;
    }

    // Scan right from parent to find correct position among siblings
    let cursor = parent._next;
    let insertAfter = parent;
    while (cursor) {
      const cursorParentKey = cursor.parentId ? this._key(cursor.parentId) : null;
      if (cursorParentKey === parentKey) {
        // Same parent — compare priority
        if (this._compareIds(op.id, cursor.id) > 0) {
          // Existing has higher priority, skip past it and its descendants
          insertAfter = cursor;
          cursor = cursor._next;
          // Skip descendants
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
    const visited = new Set();
    while (current && current.parentId) {
      const parentKey = this._key(current.parentId);
      if (parentKey === ancestorKey) return true;
      if (visited.has(parentKey)) return false;
      visited.add(parentKey);
      current = this.nodes.get(parentKey);
    }
    return false;
  }

  _applyDelete(op) {
    const key = this._key(op.id);
    const node = this.nodes.get(key);
    if (!node) {
      if (!this._pendingDeletes) this._pendingDeletes = new Set();
      this._pendingDeletes.add(key);
      return;
    }
    node.deleted = true;
  }

  getText() {
    let result = '';
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
      if (!node.deleted && node._key !== this._rootKey) count++;
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
        parentId: node.parentId,
      });
      node = node._next;
    }
    return {
      deviceId: this.deviceId,
      counter: this.counter,
      nodes,
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
        _prev: prev,
      };
      if (prev) prev._next = node;
      else crdt._head = node;
      prev = node;
      crdt.nodes.set(key, node);
    }
    crdt._tail = prev;
    return crdt;
  }
}

module.exports = { TextCRDT };
