// Renders favicon.svg to fav-{16,32,48,256}.png and apple-touch-icon.svg to a 180px PNG, in the folder given as argument.
const { chromium } = require('/Users/brianrebagliati/Documents/Work/mango-finanzas/mango/node_modules/playwright')
const fs = require('fs')
const S = process.argv[2]
;(async () => {
  const b = await chromium.launch()
  const shot = async (file, size, out) => {
    const p = await b.newPage({ viewport: { width: size, height: size } })
    await p.setContent(`<style>*{margin:0}body{background:transparent}</style><img src="data:image/svg+xml;base64,${fs.readFileSync(file).toString('base64')}" width="${size}" height="${size}" style="display:block">`)
    await p.screenshot({ path: out, omitBackground: true })
    await p.close()
  }
  for (const n of [16, 32, 48, 256]) await shot(`${S}/favicon.svg`, n, `${S}/fav-${n}.png`)
  await shot(`${S}/apple-touch-icon.svg`, 180, `${S}/apple-touch-icon.png`)
  await b.close()
})()
