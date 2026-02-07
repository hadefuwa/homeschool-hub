#!/usr/bin/env bash
set -euo pipefail

SOURCE_DIR="${1:-.}"
TARGET_DIR="${2:-../ks2-lab}"
REMOTE_URL="${3:-https://github.com/hadefuwa/ks2-lab.git}"
COMMIT_MSG="${4:-Initial ks2-lab web baseline (no local videos)}"

"$(dirname "$0")/start-ks2-lab-copy.sh" "$SOURCE_DIR" "$TARGET_DIR" "$REMOTE_URL"

cd "$TARGET_DIR"

if [[ ! -d .git ]]; then
  git init -b main
  git remote add origin "$REMOTE_URL"
fi

git add .
if git diff --cached --quiet; then
  echo "No changes to commit in $TARGET_DIR"
else
  git commit -m "$COMMIT_MSG"
fi

# Push may fail in restricted environments without GitHub auth/network.
# We still try so this script works in normal local dev setups.
git push -u origin main

echo "Published $TARGET_DIR to $REMOTE_URL"
