#!/bin/sh
# Prints both CVs to public/ with headless Chrome. Run from anywhere: sh cv/build.sh
set -e
cd "$(dirname "$0")"
chrome="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

print() {
  "$chrome" --headless --disable-gpu --no-pdf-header-footer --allow-file-access-from-files \
    --virtual-time-budget=5000 --print-to-pdf="../public/$2" "file://$PWD/$1" 2>/dev/null
}

print cv.en.html Brian_Sittmann_Java_Developer_CV.pdf
print cv.es.html Brian_Sittmann_Desarrollador_Java_CV.pdf
