# Favicon source. Usage, from the repo root (needs fonttools + brotli; Pillow for the .ico):
#   python design/favicon/build.py design/favicon && node design/favicon/raster.cjs design/favicon
# then: favicon.svg -> public/, apple-touch-icon.png -> public/, fav-{16,32,48}.png packed into public/favicon.ico.
# Outlines "bs" in Geist SemiBold and centres it on a cobalt circle (and a full-bleed square for Apple).
import sys
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen

font = TTFont('/Users/brianrebagliati/Documents/Work/Portfolio-v2/node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2')
font = instantiateVariableFont(font, {'wght': 600})
gs, cmap, hmtx = font.getGlyphSet(), font.getBestCmap(), font['hmtx']
upm = font['head'].unitsPerEm
track = -0.04 * upm  # tight, like the site's display type

# Lay out "bs" in font units, y up.
glyphs, x = [], 0
for ch in 'bs':
    name = cmap[ord(ch)]
    glyphs.append((name, x))
    x += hmtx[name][0] + track

bp = BoundsPen(gs)
for name, gx in glyphs:
    gs[name].draw(TransformPen(bp, (1, 0, 0, 1, gx, 0)))
xmin, ymin, xmax, ymax = bp.bounds

def svg(size, width_ratio, bg):
    # Scale so the pair spans `width_ratio` of the canvas; centre its box; flip y.
    k = size * width_ratio / (xmax - xmin)
    tx = size / 2 - k * (xmin + xmax) / 2
    ty = size / 2 + k * (ymin + ymax) / 2
    pen = SVGPathPen(gs, ntos=lambda v: f'{v:.1f}'.rstrip('0').rstrip('.'))
    for name, gx in glyphs:
        gs[name].draw(TransformPen(pen, (k, 0, 0, -k, tx + k * gx, ty)))
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size} {size}">'
            f'{bg}<path fill="#fff" d="{pen.getCommands()}"/></svg>\n')

out = sys.argv[1]
open(f'{out}/favicon.svg', 'w').write(svg(512, 0.6, '<circle cx="256" cy="256" r="256" fill="#4a5ff0"/>'))
open(f'{out}/apple-touch-icon.svg', 'w').write(svg(512, 0.46, '<rect width="512" height="512" fill="#2b44e0"/>'))
