#!/usr/bin/env node
/**
 * Auditoría de accesibilidad con axe-core sobre un navegador real.
 *
 * Se hace con Puppeteer en lugar de jsdom porque las reglas de contraste
 * necesitan un motor de render: sin layout ni color computado, axe no puede
 * evaluarlas. Y el contraste es justo donde esta página tuvo problemas.
 *
 * Dos detalles que hacen falta para que el resultado sea fiable:
 *  - Las animaciones de aparición dejan nodos a opacidad 0. axe los daría por
 *    ocultos y no los analizaría, así que se fuerzan visibles antes de medir.
 *  - El bucle del canvas y el efecto de tecleo compiten por CPU con el
 *    analizador y lo dejan sin terminar. Se detienen antes de lanzar axe.
 *
 * Uso:  node scripts/a11y.mjs <url> [url...]
 */
import puppeteer from 'puppeteer';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const axePath = require.resolve('axe-core/axe.min.js');

const urls = process.argv.slice(2);
if (!urls.length) {
  console.error('Uso: node scripts/a11y.mjs <url> [url...]');
  process.exit(2);
}

const browser = await puppeteer.launch({
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});

let total = 0;

for (const url of urls) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

  await page.evaluate(() => {
    window.requestAnimationFrame = () => 0;
    for (let i = 1; i < 20000; i++) { clearTimeout(i); clearInterval(i); }
    document.querySelectorAll('.reveal, .stagger, .stagger > *').forEach((e) => {
      e.style.opacity = '1';
      e.style.transform = 'none';
    });
  });

  await page.addScriptTag({ path: axePath });

  const { violations } = await page.evaluate(async () =>
    await window.axe.run(document, { resultTypes: ['violations'] })
  );

  console.log(`\n===== ${url} =====`);
  if (!violations.length) {
    console.log('  Sin violaciones');
  } else {
    for (const v of violations) {
      total += v.nodes.length;
      console.log(`  ${(v.impact || '?').toUpperCase()} | ${v.id} | ${v.nodes.length} nodo(s)`);
      console.log(`      ${v.help}`);
      console.log(`      ${v.helpUrl}`);
      v.nodes.slice(0, 5).forEach((n) => console.log(`      -> ${n.target.join(', ').slice(0, 120)}`));
    }
  }
  await page.close();
}

await browser.close();

if (total) {
  console.error(`\n✗ ${total} elemento(s) con problemas de accesibilidad.`);
  process.exit(1);
}
console.log('\n✓ Sin violaciones de accesibilidad.');
