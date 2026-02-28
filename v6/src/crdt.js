// Custom character-level text CRDT (RGA-based)
// Each character has a unique ID { device, counter }
// Operations: insert(id, parentId, char), delete(id)
// Deterministic ordering: concurrent inserts with same parent
// break ties by (counter DESC, device DESC)

class TextCRDT {
  constructor(deviceId) {
    this.deviceId = deviceId;
    this.counter = 0;
    // Doubly-linked list stored as map: id-key -> { id, char, deleted, parentId }
    // Plus ordered array for efficient traversal
    this.nodes = new Map(); // key -> node
    this.order = []; // ordered node references
    this.ROOT_ID = { device: '__root__', counter: 0 };
    this.nodes.set(this._key(this.ROOT_ID), {
      id: this.ROOT_ID,
      char: '',
      deleted: true,
      parentId: null,
    });
    this.order.push(this.nodes.get(this._key(this.ROOT_ID)));
  }

  _key(id) {
    return `${id.device}:${id.counter}`;
  }

  _nextId() {
    this.counter++;
    return { device: this.deviceId, counter: this.counter };
  }

  // Compare two IDs for tie-breaking: higher counter wins, then higher device string
  _compareIds(a, b) {
    if (a.counter !== b.counter) return b.counter - a.counter; // DESC
    if (a.device < b.device) return 1;  // DESC
    if (a.device > b.device) return -1;
    return 0;
  }

  // Find the index of a node in the order array
  _indexOf(id) {
    const key = this._key(id);
    return this.order.findIndex(n => this._key(n.id) === key);
  }

  // Insert a character after parentId
  // Returns the op for replication
  insertAt(parentId, char) {
    const id = this._nextId();
    const op = { type: 'insert', id, parentId, char };
    this.apply(op);
    return op;
  }

  // Insert text at a cursor position (0-based index in visible text)
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

  // Delete the character at visible position
  deleteAt(pos) {
    const id = this._idAtVisiblePos(pos);
    if (!id || this._key(id) === this._key(this.ROOT_ID)) return null;
    const op = { type: 'delete', id };
    this.apply(op);
    return op;
  }

  // Get the ID of the character at a visible text position
  // pos = -1 returns ROOT_ID (for inserting at start)
  _idAtVisiblePos(pos) {
    if (pos === -1) return this.ROOT_ID;
    let visible = -1;
    for (const node of this.order) {
      if (!node.deleted && this._key(node.id) !== this._key(this.ROOT_ID)) {
        visible++;
        if (visible === pos) return node.id;
      }
    }
    return null;
  }

  // Apply an operation (idempotent, order-independent)
  apply(op) {
    if (op.type === 'insert') {
      return this._applyInsert(op);
    } else if (op.type === 'delete') {
      return this._applyDelete(op);
    }
  }

  _applyInsert(op) {
    const key = this._key(op.id);

    // Idempotent: if already exists, skip
    if (this.nodes.has(key)) return;

    // Update counter to stay ahead
    if (op.id.device === this.deviceId) {
      this.counter = Math.max(this.counter, op.id.counter);
    } else {
      this.counter = Math.max(this.counter, op.id.counter);
    }

    const node = {
      id: op.id,
      char: op.char,
      deleted: false,
      parentId: op.parentId,
    };

    this.nodes.set(key, node);

    // Find insertion position: after parent, before any node that
    // isn't a child of the same parent or has lower priority
    const parentIdx = this._indexOf(op.parentId);
    if (parentIdx === -1) {
      // Parent not yet applied — append to end (will be ordered correctly on rebuild)
      this.order.push(node);
      return;
    }

    // Scan right from parent to find correct position among siblings
    let insertIdx = parentIdx + 1;
    while (insertIdx < this.order.length) {
      const existing = this.order[insertIdx];
      // Check if this node is also a child of the same parent
      if (existing.parentId && this._key(existing.parentId) === this._key(op.parentId)) {
        // Same parent — compare priority
        if (this._compareIds(op.id, existing.id) > 0) {
          // Existing has higher priority, insert before it... wait no.
          // compareIds > 0 means existing wins (has higher priority = goes first)
          // So we need to go past it
          insertIdx++;
          // But also skip over existing's descendants
          insertIdx = this._skipDescendants(insertIdx, existing.id);
        } else {
          // Our node has higher priority, insert here
          break;
        }
      } else if (existing.parentId && this._isDescendantOf(existing, op.parentId)) {
        // This node is a descendant of a sibling — skip it
        insertIdx++;
      } else {
        // Different parent entirely — insert here
        break;
      }
    }

    this.order.splice(insertIdx, 0, node);
  }

  _isDescendantOf(node, ancestorId) {
    const ancestorKey = this._key(ancestorId);
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

  _skipDescendants(startIdx, parentId) {
    let idx = startIdx;
    while (idx < this.order.length) {
      if (this._isDescendantOf(this.order[idx], parentId)) {
        idx++;
      } else {
        break;
      }
    }
    return idx;
  }

  _applyDelete(op) {
    const key = this._key(op.id);
    const node = this.nodes.get(key);
    if (!node) {
      // Node not yet seen — store as pending delete
      if (!this._pendingDeletes) this._pendingDeletes = new Set();
      this._pendingDeletes.add(key);
      return;
    }
    node.deleted = true;
  }

  // Materialize visible text
  getText() {
    let result = '';
    const rootKey = this._key(this.ROOT_ID);
    for (const node of this.order) {
      if (!node.deleted && this._key(node.id) !== rootKey) {
        result += node.char;
      }
    }
    return result;
  }

  // Get visible character count
  length() {
    let count = 0;
    const rootKey = this._key(this.ROOT_ID);
    for (const node of this.order) {
      if (!node.deleted && this._key(node.id) !== rootKey) count++;
    }
    return count;
  }

  // Serialize for snapshot
  snapshot() {
    return {
      deviceId: this.deviceId,
      counter: this.counter,
      nodes: this.order.map(n => ({
        id: n.id,
        char: n.char,
        deleted: n.deleted,
        parentId: n.parentId,
      })),
    };
  }

  // Restore from snapshot
  static fromSnapshot(data) {
    const crdt = new TextCRDT(data.deviceId);
    crdt.counter = data.counter;
    crdt.nodes.clear();
    crdt.order = [];
    for (const n of data.nodes) {
      const node = { id: n.id, char: n.char, deleted: n.deleted, parentId: n.parentId };
      crdt.nodes.set(crdt._key(n.id), node);
      crdt.order.push(node);
    }
    return crdt;
  }
}

module.exports = { TextCRDT };
