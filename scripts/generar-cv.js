// Regenera osman-silva-cv.pdf a partir de index.html usando la hoja de estilos de impresión.
// Uso: npx -y -p playwright node scripts/generar-cv.js
const path = require('path');
const { chromium } = require('playwright');

(async () => {
  const root = path.resolve(__dirname, '..');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file://' + path.join(root, 'index.html'), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.emulateMedia({ media: 'print' });
  await page.pdf({ path: path.join(root, 'osman-silva-cv.pdf'), format: 'A4', printBackground: true, preferCSSPageSize: true });
  await browser.close();
  console.log('PDF generado: osman-silva-cv.pdf');
})();
