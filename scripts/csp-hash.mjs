#!/usr/bin/env node
/**
 * Calcula el hash CSP del bloque <script> en línea de index.html y comprueba
 * que coincide con el declarado en vercel.json.
 *
 * Por qué existe: la política de contenido autoriza ese script por su hash,
 * no con 'unsafe-inline'. Es el control fuerte de la política, pero tiene un
 * filo: si alguien edita el JavaScript y no actualiza el hash, el navegador
 * bloquea el script y la página pierde TODA la interactividad en silencio,
 * sin error visible. Este script convierte ese fallo silencioso en un fallo
 * ruidoso de integración continua.
 *
 * Uso:
 *   node scripts/csp-hash.mjs           comprueba (sale con 1 si no coincide)
 *   node scripts/csp-hash.mjs --write   actualiza vercel.json con el hash real
 */
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';

const HTML = 'index.html';
const VERCEL = 'vercel.json';

const html = readFileSync(HTML, 'utf8');

// Solo el <script> ejecutable. Los bloques application/ld+json son datos,
// el navegador no los ejecuta y la directiva script-src no les aplica.
// El contenido del elemento incluye los saltos de línea que rodean al código:
// recortarlos produce un hash que el navegador rechaza. `<script>` sin
// atributos no coincide con el bloque application/ld+json.
const m = html.match(/<script>([\s\S]*?)<\/script>/);
if (!m) {
  console.error(`✗ No se encontró el bloque <script> en línea de ${HTML}`);
  process.exit(1);
}

const hash = 'sha256-' + createHash('sha256').update(m[1], 'utf8').digest('base64');

const vercel = JSON.parse(readFileSync(VERCEL, 'utf8'));
const cspHeader = vercel.headers
  ?.flatMap((h) => h.headers ?? [])
  .find((h) => h.key.toLowerCase() === 'content-security-policy');

if (!cspHeader) {
  console.error(`✗ No hay cabecera Content-Security-Policy en ${VERCEL}`);
  process.exit(1);
}

if (process.argv.includes('--write')) {
  cspHeader.value = cspHeader.value.replace(
    /'sha256-[A-Za-z0-9+/=]+'/,
    `'${hash}'`
  );
  writeFileSync(VERCEL, JSON.stringify(vercel, null, 2) + '\n');
  console.log(`✓ ${VERCEL} actualizado con ${hash}`);
  process.exit(0);
}

if (cspHeader.value.includes(`'${hash}'`)) {
  console.log(`✓ El hash del script coincide con la política: ${hash}`);
  process.exit(0);
}

const declarado = cspHeader.value.match(/'sha256-[A-Za-z0-9+/=]+'/)?.[0] ?? '(ninguno)';
console.error('✗ El hash del script NO coincide con la política.');
console.error(`  Declarado en ${VERCEL}: ${declarado}`);
console.error(`  Real en ${HTML}:        '${hash}'`);
console.error('');
console.error('  Si el cambio en el JavaScript es intencionado, ejecuta:');
console.error('      node scripts/csp-hash.mjs --write');
console.error('  y commitea el vercel.json resultante. Sin esto, el navegador');
console.error('  bloqueará el script y la página quedará sin interactividad.');
process.exit(1);
