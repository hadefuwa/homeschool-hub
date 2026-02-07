#!/usr/bin/env bash
set -euo pipefail

SOURCE_DIR="${1:-.}"
TARGET_DIR="${2:-../ks2-lab}"
REMOTE_URL="${3:-https://github.com/hadefuwa/ks2-lab.git}"

if [[ ! -d "$SOURCE_DIR" ]]; then
  echo "Source directory not found: $SOURCE_DIR" >&2
  exit 1
fi

mkdir -p "$TARGET_DIR"

# Copy project while excluding local build/cache artifacts and local videos.
rsync -a --delete \
  --exclude='.git' \
  --exclude='node_modules' \
  --exclude='dist' \
  --exclude='assets/videos' \
  "$SOURCE_DIR"/ "$TARGET_DIR"/

if [[ ! -d "$TARGET_DIR/.git" ]]; then
  git -C "$TARGET_DIR" init -b main >/dev/null
fi

# Ensure origin points to ks2-lab remote.
if git -C "$TARGET_DIR" remote get-url origin >/dev/null 2>&1; then
  git -C "$TARGET_DIR" remote set-url origin "$REMOTE_URL"
else
  git -C "$TARGET_DIR" remote add origin "$REMOTE_URL"
fi

echo "Created/updated $TARGET_DIR from $SOURCE_DIR"
echo "Excluded: .git, node_modules, dist, assets/videos"
echo "Configured origin: $(git -C "$TARGET_DIR" remote get-url origin)"
echo "Next steps:"
echo "  cd $TARGET_DIR"
echo "  npm install"
echo "  npm run build"
echo "  git add . && git commit -m 'Initial ks2-lab web baseline (no local videos)'"
echo "  git push -u origin main"
