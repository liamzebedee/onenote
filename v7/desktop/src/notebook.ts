// .notebound Directory Manager
// Creates/opens notebook directory bundles

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { WAL } from './wal';
import { applyOp as modelApplyOp, findPageInState } from './model';
import { TextCRDT } from './crdt';
import { applyDiffsToHtml, applyTextChangeToHtml } from './htmlutils';
import { rebuildState, createSnapshot } from './snapshot';
import { SyncEngine } from './sync';
import type {
  AppState, Op, Block, Page, WALBatch, NotebookMeta, CRDTOp, TextDiff,
} from '../../core/src/types';

const MARKER_FILE = 'open.notebound';
const META_FILE = 'meta.json';
const SNAPSHOT_THRESHOLD = 50; // create snapshot when WAL batch count exceeds this

class NotebookManager {
  notebookPath: string | null;
  state: AppState | null;
  wal: WAL | null;
  sync: SyncEngine | null;
  deviceId: string | null;
  notebookId: string | undefined;
  appliedBatches: Set<string>;
  private _onStateChange: ((state: AppState) => void) | null;
  crdts: Map<string, TextCRDT>;
  snapshotCacheDir: string | null;

  constructor() {
    this.notebookPath = null;
    this.state = null;
    this.wal = null;
    this.sync = null;
    this.deviceId = null;
    this.appliedBatches = new Set();
    this._onStateChange = null;
    this.crdts = new Map();
    this.snapshotCacheDir = null;
  }

  // Create a new .notebound directory
  create(dirPath: string): NotebookMeta {
    fs.mkdirSync(dirPath, { recursive: true });
    fs.mkdirSync(path.join(dirPath, 'wal'), { recursive: true });
    fs.mkdirSync(path.join(dirPath, 'blobs'), { recursive: true });

    // Marker file
    fs.writeFileSync(path.join(dirPath, MARKER_FILE), '');

    const notebookId = crypto.randomUUID();
    const meta: NotebookMeta = {
      name: path.basename(dirPath, '.notebound'),
      createdAt: Date.now(),
      notebookId,
    };
    fs.writeFileSync(path.join(dirPath, META_FILE), JSON.stringify(meta, null, 2));

    return meta;
  }

  // Open an existing .notebound directory (or create if it doesn't exist)
  // userDataPath: local app data dir for device-local caches (snapshots)
  open(dirPath: string, deviceId: string, userDataPath: string): AppState {
    this.notebookPath = dirPath;

    // Create if doesn't exist
    if (!fs.existsSync(dirPath)) {
      this.create(dirPath);
    }

    // Ensure subdirectories exist
    for (const sub of ['wal', 'blobs']) {
      fs.mkdirSync(path.join(dirPath, sub), { recursive: true });
    }

    // Ensure marker file
    const markerPath = path.join(dirPath, MARKER_FILE);
    if (!fs.existsSync(markerPath)) {
      fs.writeFileSync(markerPath, '');
    }

    // Load or create meta
    const metaPath = path.join(dirPath, META_FILE);
    if (!fs.existsSync(metaPath)) {
      this.create(dirPath);
    }
    const meta: NotebookMeta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));

    // Migrate: ensure meta has a notebookId
    if (!meta.notebookId) {
      meta.notebookId = this._detectNotebookId(path.join(dirPath, 'wal')) || crypto.randomUUID();
      fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2));
    }

    // deviceId is per-machine, passed in from local config (not from shared meta.json)
    this.deviceId = deviceId || crypto.randomUUID();
    this.notebookId = meta.notebookId;

    // Snapshot cache lives in local userData, not in the shared .notebound bundle
    if (userDataPath) {
      this.snapshotCacheDir = path.join(userDataPath, 'snapshots', meta.notebookId);
    } else {
      // Fallback for tests or CLI usage without Electron
      this.snapshotCacheDir = path.join(dirPath, 'snapshots');
    }
    fs.mkdirSync(this.snapshotCacheDir, { recursive: true });

    // Rebuild state from snapshots + WAL
    const walDir = path.join(dirPath, 'wal');
    const result = rebuildState(this.snapshotCacheDir, walDir, meta.notebookId, meta.name);
    this.state = result.state;
    this.appliedBatches = result.appliedBatches;

    // Migration: normalize default text blocks to x=0
    this._migrateBlockPositions();

    // Initialize WAL (CRDTs are lazy -- created on first edit)
    this.wal = new WAL();
    this.wal.startAutoSeal(this.deviceId, walDir);

    // Start sync engine (file watcher)
    this.sync = new SyncEngine(this, walDir);
    this.sync.start();

    return this.state;
  }

  // Migration: normalize default text blocks to x=0
  private _migrateBlockPositions(): void {
    function migratePages(pages: Page[]): void {
      for (const pg of pages) {
        for (const b of pg.blocks || []) {
          if (b.type === 'text' && b.y === 0 && (b.x === 28 || b.x === 16)) {
            b.x = 0;
          }
        }
        if (pg.children?.length) migratePages(pg.children);
      }
    }
    for (const nb of this.state!.notebooks || []) {
      for (const sec of nb.sections || []) {
        migratePages(sec.pages || []);
      }
    }
  }

  // Scan WAL ops to find the notebookId used by existing data (migration only)
  private _detectNotebookId(walDir: string): string | null {
    const batches = WAL.listBatches(walDir);
    for (const file of batches) {
      const batch = WAL.readBatch(path.join(walDir, file));
      for (const op of batch.ops) {
        if (op.notebookId) return op.notebookId as string;
      }
    }
    return null;
  }

  // Apply a user operation
  applyOp(op: Op): AppState {
    if (!op.deviceId) op.deviceId = this.deviceId!;
    if (!op.timestamp) op.timestamp = Date.now();
    if (!op.id) op.id = crypto.randomUUID();
    if (op.type === 'block-text-diff') return this._applyBlockTextDiff(op);
    if (op.type === 'block-text-op') {
      this._applyBlockTextOp(op);
      this.wal!.append(op);
      return this.state!;
    }
    // page-view is device-local UI state -- apply in memory, never sync
    if (op.type === 'page-view') {
      this.state = modelApplyOp(this.state!, op);
      return this.state;
    }
    this.state = modelApplyOp(this.state!, op);
    this.wal!.append(op);
    return this.state;
  }

  // Apply a remote batch (from sync)
  applyRemoteBatch(batchFile: string, batch: WALBatch): void {
    if (this.appliedBatches.has(batchFile)) return;
    for (const op of batch.ops) {
      if (op.type === 'block-text-op') {
        this._applyBlockTextOp(op);
      } else {
        this.state = modelApplyOp(this.state!, op);
      }
    }
    this.appliedBatches.add(batchFile);
    if (this._onStateChange) this._onStateChange(this.state!);
  }

  // Get current state
  getState(): AppState | null {
    return this.state;
  }

  // Set callback for state changes (from sync)
  onStateChange(callback: (state: AppState) => void): void {
    this._onStateChange = callback;
  }

  // Seal WAL and optionally create snapshot
  flush(): void {
    if (!this.wal || !this.notebookPath) return;

    const walDir = path.join(this.notebookPath, 'wal');
    const filename = this.wal.seal(this.deviceId!, walDir);
    if (filename) {
      this.appliedBatches.add(filename);
    }

    // Check if we should create a snapshot
    const batchCount = WAL.listBatches(walDir).length;
    if (batchCount > SNAPSHOT_THRESHOLD && this.snapshotCacheDir) {
      this._serializeCrdts();
      createSnapshot(this.state!, this.snapshotCacheDir, Array.from(this.appliedBatches), this.deviceId!);
    }
  }

  // Close the notebook
  close(): void {
    console.log('[notebound] NotebookManager.close() called, path:', this.notebookPath, 'wal:', !!this.wal, 'pending:', this.wal?.pendingCount);
    if (this.sync) {
      this.sync.stop();
      this.sync = null;
    }

    if (this.wal) {
      this.wal.stopAutoSeal();
      // Final seal
      if (this.notebookPath) {
        const walDir = path.join(this.notebookPath, 'wal');
        const filename = this.wal.seal(this.deviceId!, walDir);
        console.log('[notebound] sealed WAL batch:', filename);
        if (filename) this.appliedBatches.add(filename);

        // Create a snapshot on close (in local device cache)
        if (this.snapshotCacheDir) {
          this._serializeCrdts();
          const snapFile = createSnapshot(this.state!, this.snapshotCacheDir, Array.from(this.appliedBatches), this.deviceId!);
          console.log('[notebound] created snapshot:', snapFile);
        }
      }
      this.wal = null;
    }

    this.notebookPath = null;
    this.snapshotCacheDir = null;
    this.state = null;
    this.deviceId = null;
  }

  // Lazily initialize a block's CRDT on first edit
  private _getOrInitCrdt(blockId: string): TextCRDT {
    let crdt = this.crdts.get(blockId);
    if (crdt) return crdt;

    // Find block to seed the CRDT from its current content
    let blk: Block | null = null;
    for (const nb of this.state!.notebooks) {
      for (const sec of nb.sections) {
        blk = this._findBlockInPages(sec.pages, blockId);
        if (blk) break;
      }
      if (blk) break;
    }

    if (blk?.crdt) {
      crdt = TextCRDT.fromSnapshot(blk.crdt);
    } else {
      crdt = new TextCRDT(this.deviceId!);
      if (blk?.html) {
        const text = blk.html.replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]*>/g, '');
        if (text) crdt.insertTextAt(0, text);
      }
    }
    this.crdts.set(blockId, crdt);
    return crdt;
  }

  private _applyBlockTextDiff(diffOp: Op): AppState {
    const pageId = diffOp.pageId as string;
    const blockId = diffOp.blockId as string;
    const diffs = diffOp.diffs as TextDiff[];
    const crdt = this._getOrInitCrdt(blockId);
    const crdtOps: CRDTOp[] = [];
    for (const diff of diffs) {
      if (diff.type === 'insert') {
        const ops = crdt.insertTextAt(diff.pos, diff.text);
        crdtOps.push(...ops);
      } else if (diff.type === 'delete') {
        for (let i = 0; i < diff.count; i++) {
          const op = crdt.deleteAt(diff.pos);
          if (op) crdtOps.push(op);
        }
      }
    }
    if (crdtOps.length === 0) return this.state!;
    // Apply diffs to HTML preserving formatting tags
    const result = findPageInState(this.state!, pageId);
    if (result) {
      const blk = result.page.blocks.find(b => b.id === blockId);
      if (blk) blk.html = applyDiffsToHtml(blk.html || '', diffs);
    }
    const walOp: Op = {
      id: crypto.randomUUID(),
      deviceId: this.deviceId!,
      timestamp: Date.now(),
      type: 'block-text-op',
      pageId,
      blockId,
      crdtOps,
    };
    this.wal!.append(walOp);
    return this.state!;
  }

  private _applyBlockTextOp(op: Op): void {
    const crdt = this._getOrInitCrdt(op.blockId as string);
    const oldText = crdt.getText();
    const crdtOps = (op.crdtOps || []) as CRDTOp[];
    for (const crdtOp of crdtOps) crdt.apply(crdtOp);
    const newText = crdt.getText();
    if (oldText !== newText) {
      const result = findPageInState(this.state!, op.pageId as string);
      if (result) {
        const blk = result.page.blocks.find(b => b.id === (op.blockId as string));
        if (blk) blk.html = applyTextChangeToHtml(blk.html || '', oldText, newText);
      }
    }
  }

  private _serializeCrdts(): void {
    const walkPages = (pages: Page[]): void => {
      for (const page of pages) {
        for (const blk of (page.blocks || [])) {
          const crdt = this.crdts.get(blk.id);
          if (crdt) blk.crdt = crdt.snapshot();
        }
        if (page.children?.length) walkPages(page.children);
      }
    };
    for (const nb of this.state!.notebooks) {
      for (const sec of nb.sections) walkPages(sec.pages);
    }
  }

  private _findBlockInPages(pages: Page[], blockId: string): Block | null {
    for (const page of pages) {
      const blk = page.blocks?.find(b => b.id === blockId);
      if (blk) return blk;
      if (page.children?.length) {
        const found = this._findBlockInPages(page.children, blockId);
        if (found) return found;
      }
    }
    return null;
  }

  get walDir(): string | null {
    return this.notebookPath ? path.join(this.notebookPath, 'wal') : null;
  }

  get snapshotsDir(): string | null {
    return this.snapshotCacheDir || null;
  }

  get blobsDir(): string | null {
    return this.notebookPath ? path.join(this.notebookPath, 'blobs') : null;
  }
}

export { NotebookManager };
