#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SERVER_DIR="$ROOT_DIR/tools/mcp-search-analytics"
VENV_PYTHON="$SERVER_DIR/.venv/bin/python"

if [[ ! -x "$VENV_PYTHON" ]]; then
  echo "[ERROR] Python virtualenv not found at $VENV_PYTHON" >&2
  exit 1
fi

exec "$VENV_PYTHON" "$SERVER_DIR/unified_analytics_server.py"
