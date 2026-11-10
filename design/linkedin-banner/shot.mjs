// Exports the LinkedIn banner, light and dark, at 2x (3168x792, LinkedIn's 4:1): node design/linkedin-banner/shot.mjs
// Also writes preview-*.png: the banner inside a mock of LinkedIn's profile card, with the photo where LinkedIn puts it.
import { chromium } from '/Users/brianrebagliati/Documents/Work/mango-finanzas/mango/node_modules/playwright/index.mjs';
import { fileURLToPath } from 'node:url';

const HERE = fileURLToPath(new URL('.', import.meta.url));
const PHOTO = fileURLToPath(new URL('../../src/assets/heroLogoLight.png', import.meta.url));
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1584, height: 396 }, deviceScaleFactor: 2 });

for (const theme of ['light', 'dark']) {
  await p.goto(`file://${HERE}banner.html?theme=${theme}`);
  await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: `${HERE}linkedin-banner-${theme}.png` });
}

// Preview: LinkedIn's desktop profile card is ~804px wide, the banner 4:1 on top, a 152px photo 24px from the left.
const card = await b.newPage({ viewport: { width: 900, height: 420 }, deviceScaleFactor: 2 });
await card.goto(`file://${HERE}banner.html`); // a file:// origin, so the mock can load local images
for (const theme of ['light', 'dark']) {
  await card.setContent(`<!doctype html><html><body style="margin:0;background:#f3f2ef;font-family:-apple-system,system-ui,sans-serif">
    <div style="position:relative;width:804px;margin:24px auto;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 0 0 1px rgb(0 0 0/.08)">
      <img src="file://${HERE}linkedin-banner-${theme}.png" style="display:block;width:804px;height:201px">
      <img src="file://${PHOTO}" style="position:absolute;left:24px;top:96px;width:152px;height:152px;border-radius:50%;border:4px solid #fff;object-fit:cover;box-sizing:border-box">
      <div style="padding:64px 24px 24px">
        <div style="font-size:24px;font-weight:600;color:#000000e6">Brian Sittmann</div>
        <div style="font-size:16px;color:#000000e6;margin-top:4px">Java Backend Developer · Spring Boot · PostgreSQL</div>
        <div style="font-size:14px;color:#00000099;margin-top:6px">Dublin, County Dublin, Ireland</div>
      </div>
    </div></body></html>`);
  await card.waitForTimeout(300);
  await card.screenshot({ path: `${HERE}preview-${theme}.png` });
}
await b.close();
