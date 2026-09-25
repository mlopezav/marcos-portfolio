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

## Flujo de trabajo con Git y despliegue

El repositorio está conectado a Vercel. **El despliegue lo dispara un push, así
que la rama sobre la que se trabaja determina si algo sale a producción.**

```
WSL  →  dev  →  GitHub/dev  →  Vercel Preview  →  revisión  →  PR  →  main  →  Vercel Production
```

| Rama | Papel | Efecto de un push |
|---|---|---|
| `dev` | Desarrollo e integración. **Es la rama de trabajo por defecto** | Preview Deployment en Vercel |
| `main` | Producción. Solo versiones estables y revisadas | Production Deployment en Vercel |

### Reglas

1. **Comprobar la rama antes de tocar nada:** `git branch --show-current`.
   Si aparece `main`, cambiar a `dev` antes de modificar ficheros.
2. Las modificaciones normales van en `dev`, nunca directamente en `main`.
3. **No hacer push nunca.** Lo ejecuta siempre Marcos, también en `dev`.
4. No fusionar `dev` en `main` sin autorización expresa. La promoción se hace
   por Pull Request, una vez validado el Preview Deployment.
5. Nunca `git push --force` sobre `main`.
6. Antes de preparar un commit, revisar `git diff` y confirmar que no entran
   ficheros accidentales, secretos, credenciales ni artefactos de Windows
   (`*:Zone.Identifier`).
7. Mantener el `.gitignore` al día.
8. Mensajes de commit con Conventional Commits: `feat:`, `fix:`, `docs:`,
   `refactor:`, `ci:`, `chore:`, con ámbito entre paréntesis cuando aporte
   (`fix(a11y):`, `feat(seo):`).
9. `main` debe estar siempre desplegable.

## Verificación

No hay build, pero sí red de seguridad. `npm install` y luego:

| Comando | Qué comprueba |
|---|---|
| `npm run check` | Marcado válido y hash de la política de contenido |
| `npm run check:html` | Solo el marcado |
| `npm run check:csp` | Que el hash de `vercel.json` coincide con el `<script>` real |
| `npm run check:a11y` | Accesibilidad con axe sobre navegador real (requiere `npm run serve` en otra terminal) |
| `npm run csp:write` | Regenera el hash tras editar el JavaScript |

Lo mismo se ejecuta en GitHub Actions en cada push, más comprobación de enlaces rotos.

**Si editas el bloque `<script>`, ejecuta `npm run csp:write` y commitea el
`vercel.json`.** La política autoriza ese script por su hash: si no coincide, el
navegador lo bloquea y la página pierde toda la interactividad sin error visible.

## Cómo trabajar aquí

- No hay nada que compilar. Para previsualizar, abrir `index.html` en el
  navegador o `npm run serve`.
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
- Los tokens de texto cumplen WCAG AA **sobre el fondo real de cada
  componente**, no sobre `--bg`. Es el error que costó dos rondas de CI: `--t3`
  pasaba sobre el fondo de página pero fallaba sobre `.arch-value`, que lleva un
  tinte cian encima de `--card` y sube el fondo a `#10283a`. Si se cambian, hay
  que recalcular contra cada superficie: `--t3` da 6.46:1 sobre `--bg` y 4.86:1
  sobre `.arch-value`; `--t4` da 4.66:1 sobre `.tech`.
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
