#!/usr/bin/env bash
set -ex
cd "$(dirname "$0")"
bun run build:frontend

# On Linux, install a .desktop file so the dock/taskbar picks up our icon
if [ "$(uname)" = "Linux" ]; then
  ICON_PATH="$(pwd)/app/icon-256.png"
  DESKTOP_FILE="$HOME/.local/share/applications/notebound.desktop"
  mkdir -p "$HOME/.local/share/applications"
  cat > "$DESKTOP_FILE" <<EOF
[Desktop Entry]
Name=Notebound
Exec=$(which npx) electron $(pwd) --no-sandbox
Icon=$ICON_PATH
Type=Application
StartupWMClass=notebound
Categories=Office;
EOF
  update-desktop-database "$HOME/.local/share/applications" 2>/dev/null || true
  npx electron . --no-sandbox "$@"
else
  npx electron . "$@"
fi
