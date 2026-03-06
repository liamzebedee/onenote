#!/usr/bin/env bash
set -e
bun build ../core/src/main.jsx --outfile app/bundle.js --sourcemap=inline
ELECTRON_DISABLE_SANDBOX=1 npx electron .
