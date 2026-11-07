#!/usr/bin/env bash
# Controlebeeld van een willekeurige pagina (headless Chrome). gebruik: tools/shot-url.sh <pad?query> <uitvoer.png> [breedte] [hoogte]
set -u
CHROME="/c/Program Files/Google/Chrome/Application/chrome.exe"
URL="http://localhost:5173/$1"; OUT="$2"; W="${3:-1440}"; H="${4:-900}"
WOUT="$(cygpath -w "$OUT" 2>/dev/null || echo "$OUT")"; PROFILE="$(mktemp -d)"
timeout 90 "$CHROME" --headless=new --use-angle=swiftshader --enable-unsafe-swiftshader --hide-scrollbars --user-data-dir="$(cygpath -w "$PROFILE")" \
  --window-size="${W},${H}" --virtual-time-budget="${VTB:-6000}" --enable-logging=stderr --v=0 --screenshot="$WOUT" "$URL" 2>&1 | grep -iE "Uncaught|SyntaxError|TypeError|ReferenceError|Failed to load|404" | grep -v favicon | head -20
rm -rf "$PROFILE"; echo "shot: $OUT"
