# Portfolio — Marcos López Ávila

Network, Infrastructure & Cybersecurity Engineer · Auditor Interno ISO/IEC 27001

[![Verificación](https://github.com/mlopezav/marcos-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/mlopezav/marcos-portfolio/actions/workflows/ci.yml)

Código del portfolio personal. Sitio estático, sin framework y sin proceso de
construcción: el contenido vive en un único `index.html` con el CSS y el
JavaScript en línea.

> **Pendiente:** sustituir esta línea por el enlace al sitio publicado, y hacer
> que coincida con la URL canónica y la de la imagen social declaradas en el
> `<head>` de `index.html`.

---

## Qué hay aquí

| Fichero | Qué es |
|---|---|
| `index.html` | El portfolio completo |
| `marcos-lopez-avila-portfolio.html` | Versión de una página para enviar por correo. Sin peticiones de red, sin JavaScript, imprimible |
| `assets/og-image.svg` · `.png` | Imagen de vista previa al compartir el enlace. El PNG se genera desde el SVG |
| `vercel.json` | Cabeceras de seguridad y política de contenido |
| `scripts/` | Verificación del hash de la política y auditoría de accesibilidad |
| `CV-elementos-TFM.md` | Material del TFM reutilizable en CV. Documentación interna |
| `CLAUDE.md` | Guía del repositorio |

## Verificación

No hay build, pero sí red de seguridad. Cuatro comprobaciones se ejecutan en
cada push y se pueden lanzar en local:

```bash
npm install
npm run check        # marcado válido + hash de la política de contenido
npm run serve        # en otra terminal
npm run check:a11y   # accesibilidad con axe sobre navegador real
```

| Comprobación | Herramienta |
|---|---|
| Validez del marcado | `html-validate` |
| Coherencia de la política de contenido | script propio |
| Accesibilidad, incluido contraste | `axe-core` sobre Chrome |
| Enlaces rotos | `lychee` |

## Decisiones que merecen una explicación

**Un solo fichero, sin build.** El sitio cabe en un documento y no justifica una
cadena de herramientas. A cambio hay que aceptar un `index.html` largo, así que
la disciplina se sostiene con los tokens de diseño en `:root` y con la
verificación automática, no con la estructura de carpetas.

**La política de contenido autoriza el script por su hash, no con
`'unsafe-inline'`.** Es el control fuerte, pero tiene un filo: si alguien edita
el JavaScript y no regenera el hash, el navegador bloquea el script y la página
pierde toda la interactividad **sin ningún error visible**. Por eso existe
`scripts/csp-hash.mjs`, que falla en integración continua antes de que eso
llegue a producción. Tras tocar el `<script>`:

```bash
npm run csp:write    # regenera el hash y actualiza vercel.json
```

Para los estilos sí se usa `'unsafe-inline'`: los atributos `style` sueltos no
se pueden cubrir con hashes, y la inyección de estilos es mucho menos peligrosa
que la de scripts. El resto de directivas quedan en `'none'`.

**El contraste se mide sobre el fondo real de cada componente, no sobre el de
la página.** Es una distinción que parece pedante hasta que falla: `--t3` daba
de sobra sobre el fondo general y se quedaba en 4.37:1 sobre los paneles con
tinte cian, porque ese tinte aclara el fondo. Hoy da 6.46:1 sobre `--bg` y
4.86:1 sobre el caso más estrecho. La auditoría corre sobre un navegador real y
no sobre jsdom precisamente porque las reglas de contraste necesitan motor de
render, y sin él este fallo no se ve.

**Las viñetas de lista se posicionan en absoluto, nunca con `display: flex`
sobre el `<li>`.** Con flex, cada `<strong>` o `<code>` dentro del texto se
convierte en una columna independiente y el párrafo se parte en trozos.

## Sobre el contenido

El trabajo de cliente se describe en abstracto. No se nombran proyectos,
programas de financiación, proveedores ni los componentes concretos de la
infraestructura que da a Internet.

Es una decisión deliberada y no una carencia: publicar la arquitectura de
seguridad de un sistema que no es mío sería un problema contractual, y además
transmitiría a cualquiera que lea esto justo lo contrario de lo que se supone
que demuestro. Mantener ese nivel de abstracción en cualquier contenido nuevo.

## Contacto

[lopezavmarcos@gmail.com](mailto:lopezavmarcos@gmail.com) ·
[LinkedIn](https://www.linkedin.com/in/marcoslopezavila/) ·
[GitHub](https://github.com/mlopezav)
