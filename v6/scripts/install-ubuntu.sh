#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
ICON_PATH="$PROJECT_DIR/app/icon-256.png"
NPX_PATH="$(which npx)"

mkdir -p ~/.local/share/applications

cat > ~/.local/share/applications/notebound.desktop <<EOF
[Desktop Entry]
Name=Notebound
Exec=$NPX_PATH electron $PROJECT_DIR --no-sandbox
Icon=$ICON_PATH
Type=Application
StartupWMClass=notebound
Categories=Office;
EOF

update-desktop-database ~/.local/share/applications 2>/dev/null || true

echo "Installed notebound.desktop (Icon=$ICON_PATH)"
