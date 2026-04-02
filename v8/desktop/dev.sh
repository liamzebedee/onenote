#!/usr/bin/env bash
set -e
# Build frontend (Preact UI)
bun build ../core/src/main.tsx --outfile app/bundle.js --sourcemap=inline
# Build Electron main process + preload (TS → JS)
bun build main.ts --outfile main.js --target=node --format=cjs --external electron --packages=external
bun build src/preload.ts --outfile src/preload.js --target=node --format=cjs --external electron --packages=external
ELECTRON_DISABLE_SANDBOX=1 npx electron .
