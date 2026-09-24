# CLAUDE.md

Guía para Claude Code (claude.ai/code) al trabajar en este repositorio.

## Descripción del proyecto

Portfolio personal estático de Marcos López Ávila (Network, Infrastructure &
Cybersecurity Engineer). No hay sistema de construcción, gestor de paquetes,
framework ni suite de tests: el sitio es un único `index.html` con bloques
`<style>` y `<script>` en línea. Se despliega como ficheros estáticos, sin
componente de servidor.

## Ficheros

| Fichero | Qué es |
|---|---|
| `index.html` | El portfolio completo. CSS en línea en `<head>`, JS en línea antes de `</body>` |
| `marcos-lopez-avila-portfolio.html` | Versión autónoma de una página, para enviar por correo o mensaje. Sin peticiones de red, sin JavaScript, imprimible |
| `assets/og-image.png` | Imagen de vista previa social (1200×630). Se genera desde `og-image.svg` |
| `assets/og-image.svg` | Fuente editable de la imagen anterior |
| `CV-elementos-TFM.md` | Material del TFM reutilizable en CV. Documentación, no se publica |

## Cómo trabajar aquí

- No hay nada que instalar, compilar ni lintar. Para previsualizar, abrir
  `index.html` en el navegador o servir con `python3 -m http.server`.
- Todo el CSS vive en el único bloque `<style>` del `<head>` y todo el JS en el
  único `<script>` antes de `</body>`. No hay ficheros CSS o JS externos.
- El contenido está en español (`lang="es"`).
- Las dos versiones del portfolio deben mantenerse sincronizadas en contenido.
  Si se cambia un proyecto o una competencia en `index.html`, hay que replicarlo
  en `marcos-lopez-avila-portfolio.html`.

## Arquitectura

1. **`<head>`** — SEO, Open Graph, favicon en línea y datos estructurados JSON-LD
   de tipo `Person`, más el bloque `<style>` global.
2. **`<body>`** — nav fijo y una secuencia de `<section>` dentro de `<main>`, en
   este orden: `hero` → `about` → `experience` → `skills` → `arquitecturas`
   (diagramas en SVG en línea) → `projects` → `education` → `contact`, y `<footer>`.
3. **`<script>` en línea** — se ejecuta en `DOMContentLoaded` y conecta
   comportamientos independientes, cada uno protegido con `if (element)`:
   barra de progreso y estado del nav, enlace activo con `IntersectionObserver`,
   menú móvil, efecto de máquina de escribir, fondo animado en `<canvas>`,
   animaciones de aparición al hacer scroll, y cifras que se recalculan solas
   (año del footer y años de experiencia desde `data-since`).

### Convenciones de CSS

- Los tokens de diseño (colores, fuentes, curvas de animación) son propiedades
  personalizadas en `:root`, al principio del bloque `<style>`. Reutilizarlos
  (`--bg`, `--cyan`, `--amber`, `--t1`…`--t4`, `--fd`/`--fm`/`--fb`) en lugar de
  escribir colores o fuentes nuevas.
- Los tokens de texto cumplen WCAG AA sobre sus fondos. Si se cambian, hay que
  recalcular el contraste: `--t3` da 5.82:1 y `--t4` 4.66:1.
- Fuentes: `Syne` (titulares), `IBM Plex Mono` (etiquetas), `Instrument Sans` (texto).

### Accesibilidad

El marcado usa `aria-label`/`aria-labelledby`, enlace de salto, estilos
`:focus-visible` y respeto a `prefers-reduced-motion`. Hay que preservar estos
patrones al añadir secciones o elementos interactivos. En concreto:

- El menú móvil se oculta con `visibility: hidden`, no solo con `opacity`, para
  que sus enlaces salgan del orden de tabulación.
- El texto animado del hero lleva `aria-hidden` y va acompañado de un texto
  estático `.sr-only`. No usar `aria-live` sobre texto que cambia carácter a carácter.
- Las viñetas de lista se posicionan en absoluto, nunca con `display: flex` sobre
  el `<li>`: con flex, cada `<strong>` o `<code>` del texto se convierte en una
  columna y el párrafo se rompe.

## Contenido

El portfolio describe trabajo de cliente en abstracto, sin nombrar proyectos,
convocatorias, proveedores ni componentes concretos de la infraestructura.
Mantener ese nivel de abstracción en cualquier contenido nuevo.
