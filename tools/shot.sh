#!/usr/bin/env bash
# Controlebeeld van een scène met headless Chrome, plus console-fouten.
# gebruik: tools/shot.sh <scene-id> <step> <uitvoer.png> [lang=nl] [extra-query] [breedte=1600] [hoogte=900]
# vb:      tools/shot.sh translatie 6 /tmp/t6.png nl "&t=..."
# 3D-scènes: VTB=25000 tools/shot.sh nucleosoom 1 /tmp/n.png   (langere virtuele laadtijd)
set -u
SCENE="$1"; STEP="$2"; OUT="$3"; LANGV="${4:-nl}"; EXTRA="${5:-}"; W="${6:-1600}"; H="${7:-900}"
CHROME="/c/Program Files/Google/Chrome/Application/chrome.exe"
URL="http://localhost:5173/app/index.html?scene=${SCENE}&lang=${LANGV}&step=${STEP}&freeze=1${EXTRA}"
WOUT="$(cygpath -w "$OUT" 2>/dev/null || echo "$OUT")"
PROFILE="$(mktemp -d)"
timeout 90 "$CHROME" --headless=new --use-angle=swiftshader --enable-unsafe-swiftshader --hide-scrollbars --user-data-dir="$(cygpath -w "$PROFILE")" \
  --window-size="${W},${H}" --virtual-time-budget="${VTB:-8000}" --enable-logging=stderr --v=0 \
  --screenshot="$WOUT" "$URL" 2>&1 | grep -iE "Uncaught|SyntaxError|TypeError|ReferenceError|Failed to load|404" | grep -v "favicon" | head -20
rm -rf "$PROFILE"
echo "shot: $OUT"
