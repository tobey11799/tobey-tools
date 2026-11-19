#!/usr/bin/env bash
# Regenerate install.js and cross-tab-search.ini from search.js.
# The script is embedded as single-line base64 because CopyQ silently fails to
# register a global shortcut when the command text contains a newline.
set -euo pipefail
cd "$(dirname "$0")"

B64=$(base64 < search.js | tr -d '\n')
CMD="copyq: eval(str(fromBase64('${B64}')))"

sed "s|__B64__|${B64}|" install.template.js > install.js

cat > cross-tab-search.ini <<EOF
[Command]
Command="
    ${CMD}"
GlobalShortcut=ctrl+f4
InternalId=cross_tab_search
IsGlobalShortcut=true
Name=Search all tabs
EOF

echo "generated install.js and cross-tab-search.ini"
