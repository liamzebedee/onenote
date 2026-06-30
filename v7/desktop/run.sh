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

# On Linux, install desktop integration so the dock/taskbar picks up our icon
# and .notebound folders can be opened in Notebound.
if [ "$(uname)" = "Linux" ]; then
  APPDIR="$(pwd)"
  ICON_PATH="$APPDIR/app/icon-256.png"
  ELECTRON_BIN="$APPDIR/node_modules/electron/dist/electron"

  # .desktop file — passes the selected file (%f) so a .notebound folder opens
  # in Notebound, and advertises the custom MIME type.
  DESKTOP_FILE="$HOME/.local/share/applications/notebound.desktop"
  mkdir -p "$HOME/.local/share/applications"
  cat > "$DESKTOP_FILE" <<EOF
[Desktop Entry]
Name=Notebound
Exec=$ELECTRON_BIN $APPDIR --no-sandbox %f
Icon=$ICON_PATH
Type=Application
StartupWMClass=notebound
Categories=Office;
MimeType=application/x-notebound;
EOF
  update-desktop-database "$HOME/.local/share/applications" 2>/dev/null || true

  # Custom MIME type for *.notebound (used by file managers other than Nautilus,
  # and by `gio open` / `xdg-open` on a path).
  mkdir -p "$HOME/.local/share/mime/packages"
  cat > "$HOME/.local/share/mime/packages/notebound.xml" <<'XML'
<?xml version="1.0" encoding="UTF-8"?>
<mime-info xmlns="http://www.freedesktop.org/standards/shared-mime-info">
  <mime-type type="application/x-notebound">
    <comment>Notebound Notebook</comment>
    <glob pattern="*.notebound"/>
  </mime-type>
</mime-info>
XML
  update-mime-database "$HOME/.local/share/mime" 2>/dev/null || true
  xdg-mime default notebound.desktop application/x-notebound 2>/dev/null || true

  # Nautilus (GNOME) treats directories specially and won't open a folder as an
  # app on double-click, so install a right-click script: Scripts → Open in Notebound.
  mkdir -p "$HOME/.local/share/nautilus/scripts"
  SCRIPT_FILE="$HOME/.local/share/nautilus/scripts/Open in Notebound"
  cat > "$SCRIPT_FILE" <<EOF
#!/usr/bin/env bash
ELECTRON="$ELECTRON_BIN"
path="\$(printf '%s' "\$NAUTILUS_SCRIPT_SELECTED_FILE_PATHS" | head -n1)"
[ -z "\$path" ] && path="\$1"
exec "\$ELECTRON" "$APPDIR" --no-sandbox "\$path"
EOF
  chmod +x "$SCRIPT_FILE"

  npx electron . --no-sandbox --trace-warnings "$@"
else
  npx electron --trace-warnings . "$@"
fi
