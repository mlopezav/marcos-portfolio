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

  // Las animaciones de aparición y las del hero dejan nodos a opacidad 0.
  // axe los descarta por invisibles o calcula el contraste sobre el color ya
  // mezclado, en ambos casos con un resultado que no refleja lo que se ve.
  // Una hoja con !important es más fiable que fijar estilos en línea: gana
  // también a las animaciones CSS con fill-mode `both`, que no se detienen
  // tocando temporizadores.
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation: none !important;
        transition: none !important;
      }
      .reveal, .stagger, .stagger > * {
        opacity: 1 !important;
        transform: none !important;
      }
      #hero-canvas { display: none !important; }
    `,
  });

  await page.evaluate(async () => {
    window.requestAnimationFrame = () => 0;
    for (let i = 1; i < 20000; i++) { clearTimeout(i); clearInterval(i); }
    // Recorrer la página deja que los observadores marquen las secciones
    // como visibles, igual que haría una persona.
    for (let y = 0; y < document.body.scrollHeight; y += 400) window.scrollTo(0, y);
    window.scrollTo(0, 0);
  });

  await new Promise((r) => setTimeout(r, 500));

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
      for (const n of v.nodes.slice(0, 12)) {
        console.log(`      -> ${n.target.join(', ').slice(0, 110)}`);
        // Sin los colores y el ratio que axe calculó, el informe no es
        // accionable: no se sabe qué par de colores hay que tocar.
        const d = [...(n.any || []), ...(n.all || [])].map((c) => c.data).find((x) => x && x.contrastRatio !== undefined);
        if (d) {
          console.log(
            `         texto ${d.fgColor} sobre ${d.bgColor} = ${d.contrastRatio}:1` +
            ` (exige ${d.expectedContrastRatio})` +
            (d.fontSize ? ` · ${d.fontSize}` : '') +
            (d.fontWeight ? ` ${d.fontWeight}` : '')
          );
        }
      }
      if (v.nodes.length > 12) console.log(`      ... y ${v.nodes.length - 12} nodo(s) más`);
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
