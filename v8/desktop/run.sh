#!/usr/bin/env bash
set -ex
cd "$(dirname "$0")"

# --clear-cache: delete all snapshot caches so state rebuilds from WAL
if [[ " $* " == *" --clear-cache "* ]] || [[ " $* " == *" --cc "* ]]; then
  echo "Clearing snapshot caches..."
  if [ "$(uname)" = "Darwin" ]; then
    rm -r ~/Library/Application\ Support/notebound/snapshots/*/
  else
    rm -r ~/.config/notebound/snapshots/*/
  fi
  # Remove the flag from args so electron doesn't see it
  set -- $(echo "$@" | sed 's/--clear-cache//g; s/--cc//g')
fi

bun run build:frontend
bun run build:main

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
  npx electron . --no-sandbox --trace-warnings "$@"
else
  npx electron --trace-warnings . "$@"
fi
