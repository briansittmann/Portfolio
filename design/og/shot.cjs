// Exports the Open Graph image in both languages: node design/og/shot.cjs
const { chromium } = require('/Users/brianrebagliati/Documents/Work/mango-finanzas/mango/node_modules/playwright');
const path = require('path');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  for (const lang of ['en', 'es']) {
    await p.goto('file://' + __dirname + '/og.html?lang=' + lang);
    await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(__dirname, `../../public/og.${lang}.png`) });
  }
  await b.close();
})();
