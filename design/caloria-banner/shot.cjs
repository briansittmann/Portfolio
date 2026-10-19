const { chromium } = require('/Users/brianrebagliati/Documents/Work/mango-finanzas/mango/node_modules/playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1408, height: 968 }, deviceScaleFactor: 1 });
  for (const lang of ['en', 'es']) {
    await p.goto('file://' + __dirname + '/banner.html?lang=' + lang);
    await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: __dirname + `/caloria-banner.${lang}.png` });
  }
  await b.close();
})();
