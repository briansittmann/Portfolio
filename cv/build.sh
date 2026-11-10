#!/bin/sh
# Prints the CVs to public/ with headless Chrome. Run from anywhere: sh cv/build.sh
# cv.*.html is the general backend CV the site links to; cv-java.*.html is the Java-only variant, kept at the
# old file names so links already shared keep working.
set -e
cd "$(dirname "$0")"
chrome="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

print() {
  "$chrome" --headless --disable-gpu --no-pdf-header-footer --allow-file-access-from-files \
    --virtual-time-budget=5000 --print-to-pdf="../public/$2" "file://$PWD/$1" 2>/dev/null
}

print cv.en.html Brian_Sittmann_Backend_Developer_CV.pdf
print cv.es.html Brian_Sittmann_Desarrollador_Backend_CV.pdf
print cv-java.en.html Brian_Sittmann_Java_Developer_CV.pdf
print cv-java.es.html Brian_Sittmann_Desarrollador_Java_CV.pdf
