# Notebound

A local-first notebook app. Infinite canvas, rich text blocks, sections and pages — no cloud required.

The current version is **v6**.

## Requirements

- [Bun](https://bun.sh) — frontend build
- [Node.js](https://nodejs.org) v18+ — Electron runtime

## Install

```sh
cd v6
bun install
```

## Run

```sh
cd v6
./run.sh
```

Or via npm scripts:

```sh
cd v6
bun run dev
```

> On Linux, Electron requires `--no-sandbox`. `run.sh` handles this automatically.

## Build a distributable

```sh
cd v6
bun run dist
```

Output goes to `v6/out/`.

## Keyboard shortcuts

| Action | macOS | Linux |
|---|---|---|
| Next / previous section | `Cmd ←` / `Cmd →` | `Ctrl+Shift ←` / `Ctrl+Shift →` |
| Next / previous page | `Cmd ↑` / `Cmd ↓` | `Ctrl+Shift ↑` / `Ctrl+Shift ↓` |
| Quick jump (search pages) | `Cmd K` | `Ctrl+Shift K` |
| Undo / Redo | `Cmd Z` / `Cmd Shift Z` | `Ctrl Z` / `Ctrl Shift Z` |
| Zoom | `Ctrl+Scroll` | `Ctrl+Scroll` |
| Pan canvas | Two-finger swipe or `Space+drag` | Two-finger swipe or `Space+drag` |
| New block | Click empty canvas | Click empty canvas |
| Delete selected blocks | `Delete` / `Backspace` | `Delete` / `Backspace` |
| Quit | `Cmd Q` | `Ctrl Q` |
