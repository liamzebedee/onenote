#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"
bun run build:frontend
if [ "$(uname)" = "Linux" ]; then
  npx electron . --no-sandbox "$@"
else
  npx electron . "$@"
fi
