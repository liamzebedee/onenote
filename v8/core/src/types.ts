// Shared type definitions for Notebound

// ─── Core data model ─────────────────────────────────────

export interface Block {
  id: string;
  x: number;
  y: number;
  w: number;
  z?: number;
  html: string;
  type: 'text' | 'image' | 'code' | 'loading' | 'checklist';
  src?: string;
  crop?: CropData;
  caption?: string;
  border?: string | boolean;
  items?: ChecklistItem[];
  styles?: Record<string, string>;
  // CRDT fields (used during rebuild/snapshot)
  crdt?: CRDTSnapshot;
  _crdt?: unknown;
}

export interface CropData {
  x: number;
  y: number;
  w: number;
  h: number;
  nw?: number;
  nh?: number;
}

export interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
}

export interface Page {
  id: string;
  title: string;
  children: Page[];
  blocks: Block[];
  panX: number;
  panY: number;
  zoom: number;
  createdAt?: number;
  hidden?: boolean;
}

export interface Section {
  id: string;
  title: string;
  pages: Page[];
}

export interface Notebook {
  id: string;
  title: string;
  sections: Section[];
}

export interface UIState {
  notebookId: string | null;
  sectionId: string | null;
  pageId: string | null;
}

export interface AppState {
  notebooks: Notebook[];
  ui: UIState;
  _index?: StateIndex;
}

// ─── State index (for O(1) lookups during rebuild) ───────

export interface StateIndex {
  pages: Map<string, { page: Page; section: Section; notebook: Notebook }>;
  sections: Map<string, { section: Section; notebook: Notebook }>;
  blocks: Map<string, { block: Block; page: Page }>;
}

// ─── Operations ──────────────────────────────────────────

export type OpType =
  | 'notebook-add' | 'notebook-delete' | 'notebook-rename' | 'notebook-reorder'
  | 'section-add' | 'section-delete' | 'section-rename' | 'section-reorder'
  | 'page-add' | 'page-delete' | 'page-rename' | 'page-move' | 'page-reorder'
  | 'page-tree-update' | 'page-set-hidden' | 'page-view'
  | 'block-add' | 'block-delete' | 'block-move' | 'block-resize'
  | 'block-update-html' | 'block-update-type' | 'block-update-src'
  | 'block-update-crop' | 'block-update-caption' | 'block-update-border'
  | 'block-checklist-update' | 'block-style' | 'block-z'
  | 'block-text-diff' | 'block-text-op'
  | 'ui-navigate';

export interface Op {
  id?: string;
  deviceId?: string;
  timestamp?: number;
  type: OpType;
  [key: string]: unknown;
}

// ─── WAL batch ───────────────────────────────────────────

export interface WALBatch {
  deviceId: string;
  sealedAt: number;
  ops: Op[];
}

// ─── Snapshot ────────────────────────────────────────────

export interface Snapshot {
  createdAt: number;
  includedBatches: string[];
  state: AppState;
}

// ─── CRDT types ──────────────────────────────────────────

export interface CRDTId {
  device: string;
  counter: number;
}

export interface CRDTInsertOp {
  type: 'insert';
  id: CRDTId;
  parentId: CRDTId;
  char: string;
}

export interface CRDTDeleteOp {
  type: 'delete';
  id: CRDTId;
}

export type CRDTOp = CRDTInsertOp | CRDTDeleteOp;

export interface CRDTNode {
  id: CRDTId;
  char: string;
  deleted: boolean;
  parentId: CRDTId | null;
}

export interface CRDTSnapshot {
  deviceId: string;
  counter: number;
  nodes: CRDTNode[];
}

// ─── Text diff ───────────────────────────────────────────

export interface TextInsertDiff {
  type: 'insert';
  pos: number;
  text: string;
}

export interface TextDeleteDiff {
  type: 'delete';
  pos: number;
  count: number;
}

export type TextDiff = TextInsertDiff | TextDeleteDiff;

// ─── Undo deltas ─────────────────────────────────────────

export interface MoveDelta {
  type: 'move';
  moves: { id: string; x: number; y: number }[];
}

export interface ResizeDelta {
  type: 'resize';
  id: string;
  w: number;
  x?: number;
  y?: number;
}

export interface HtmlDelta {
  type: 'html';
  id: string;
  html: string;
}

export interface AddDelta {
  type: 'add';
  id: string;
  block?: Block;
}

export interface DeleteDelta {
  type: 'delete';
  blocks: Block[];
}

export interface DeleteForwardDelta {
  type: 'deleteForward';
  ids: string[];
}

export interface ChecklistDelta {
  type: 'checklist';
  id: string;
  items: ChecklistItem[];
}

export interface CropDelta {
  type: 'crop';
  id: string;
  crop: CropData | null;
}

export type UndoDelta =
  | MoveDelta | ResizeDelta | HtmlDelta
  | AddDelta | DeleteDelta | DeleteForwardDelta
  | ChecklistDelta | CropDelta;

// ─── Config ──────────────────────────────────────────────

export interface RecentNotebook {
  path: string;
  name: string;
  lastOpened?: number;
}

export interface PageViewConfig {
  panX?: number;
  panY?: number;
  zoom?: number;
  caretBlockId?: string;
  caretOffset?: number;
}

export interface UiPosition {
  sectionId: string;
  pageId: string;
  lastPagePerSection?: Record<string, string>;
}

export interface AppConfig {
  deviceId: string;
  notebookPath?: string;
  recentNotebooks?: RecentNotebook[];
  uiPositions?: Record<string, UiPosition>;
  pageViews?: Record<string, Record<string, PageViewConfig>>;
}

// ─── Claude chat ─────────────────────────────────────────

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ClaudeChatState {
  active: boolean;
  messages: ChatMessage[];
  streaming: boolean;
  position: { x: number; y: number };
  error: string | null;
}

export interface DisplayPanelState {
  active: boolean;
  uri: string | null;
  position: { x: number; y: number };
}

// ─── Context menu ────────────────────────────────────────

export interface MenuItemNormal {
  type?: undefined;
  label: string;
  action: () => void;
  disabled?: boolean;
}

export interface MenuItemSeparator {
  type: 'separator';
}

export interface MenuItemRename {
  type: 'rename';
  value: string;
  action: (newName: string) => void;
}

export interface MenuItemConfirm {
  type: 'confirm';
  label: string;
  confirmLabel?: string;
  action: () => void;
}

export interface MenuItemSubmenu {
  type: 'submenu';
  label: string;
  children: MenuItemNormal[];
}

export type MenuItem =
  | MenuItemNormal | MenuItemSeparator | MenuItemRename
  | MenuItemConfirm | MenuItemSubmenu;

export interface ContextMenuState {
  x: number;
  y: number;
  items: MenuItem[];
}

// ─── Canvas context ──────────────────────────────────────

export interface CanvasContext {
  selectedIds: Set<string>;
  onBlockDragStart: (e: PointerEvent, blockId: string) => void;
  onBlockResizeStart: (e: PointerEvent, blockId: string) => void;
  onImgResizeStart: (e: PointerEvent, blockId: string, dir: string) => void;
  onBlockFocus?: (id: string) => void;
  onBlockBlur?: (id: string) => void;
  undo: () => void;
  redo: () => void;
  getZoom: () => number;
}

// ─── window.notebook API (platform bridge) ───────────────

export interface NotebookAPI {
  _browserShim?: boolean;
  open: (path: string) => Promise<AppState | null>;
  getState: () => Promise<AppState | null>;
  getPath: () => Promise<string | null>;
  applyOp: (op: Op) => void;
  applyOps: (ops: Op[]) => void;
  flush: () => void;
  saveBlob: (buffer: ArrayBuffer, meta: BlobMeta) => Promise<string | null>;
  getBlob: (hash: string) => Promise<string | null>;
  pickDirectory: () => Promise<string | null>;
  pickSavePath: () => Promise<string | null>;
  fetchImage: (url: string) => Promise<{ buffer: ArrayBuffer; contentType: string; size: number }>;
  saveConfig: (info: { path: string; name: string } | string) => void;
  getConfig: () => Promise<AppConfig>;
  saveUiState: (notebookPath: string, uiState: UiPosition) => void;
  savePageView: (notebookPath: string, pageId: string, panX: number, panY: number, zoom: number) => void;
  savePageCaret: (notebookPath: string, pageId: string, blockId: string, offset: number) => void;
  openExternal: (url: string) => void;
  webPublish?: () => Promise<{ url: string }>;
  webOpenDir?: () => void;
  webOpenSite?: () => Promise<{ url: string }>;
  getPublishUrl?: () => Promise<string | null>;
  onCanvasZoom: (cb: (dir: 'in' | 'out' | 'reset') => void) => void;
  offCanvasZoom: () => void;
  onStateChanged: (cb: (state: AppState) => void) => void;
  onOpenFailed: (cb: () => void) => void;
  offStateChanged: () => void;
}

export interface BlobMeta {
  mimeType?: string;
  filename?: string | null;
  size?: number | null;
  lastModified?: number | null;
}

export interface ClaudeAPI {
  start: (pageId: string) => Promise<{ sessionId: string }>;
  message: (text: string) => Promise<void>;
  interrupt: () => Promise<void>;
  stop: () => Promise<void>;
  onStream: (cb: (data: ClaudeStreamData) => void) => void;
  offStream: () => void;
}

export type ClaudeStreamData =
  | { type: 'text'; content: string }
  | { type: 'tool_use'; tool: string; input: unknown }
  | { type: 'done'; result: string; cost: number | null }
  | { type: 'error'; message: string };

export interface DisplayAPI {
  onCommand: (cb: (cmd: DisplayCommand) => void) => void;
  offCommand: () => void;
}

export type DisplayCommand =
  | { action: 'open'; uri: string }
  | { action: 'refresh' }
  | { action: 'close' };

export interface WindowControlsAPI {
  minimize: () => void;
  maximize: () => void;
  close: () => void;
}

// ─── Global window augmentation ──────────────────────────

declare global {
  interface Window {
    notebook: NotebookAPI;
    claude?: ClaudeAPI;
    display?: DisplayAPI;
    windowControls?: WindowControlsAPI;
    log?: (...args: unknown[]) => void;
    __ghPagesUrl?: string;
  }
}

// ─── Notebook meta.json ──────────────────────────────────

export interface NotebookMeta {
  name: string;
  createdAt: number;
  notebookId: string;
  publish?: {
    remote: string;
    exportDir: string;
  };
}

// ─── Page tree structure (for page-tree-update op) ───────

export interface PageTreeNode {
  id: string;
  children: PageTreeNode[];
}
