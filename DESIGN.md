# Design System

Actualizado 2026-10-11. Describe lo que está implementado en `src/`, no una intención. Los tokens viven en `src/styles/global.css`.

## Theme

**Dark mode único.** Escena física: un decisor técnico revisando el sitio a las 10pm desde su oficina en Bogotá o Medellín, evaluando si esta empresa de Sincelejo puede ejecutar su proyecto. La pantalla se siente como una herramienta de precisión; el fondo desaparece y el contenido flota con autoridad.

**Idea central visual:** la portada es un recorrido en video que avanza con el scroll, del caos operativo al sistema (ver *Portada: recorrido*). Todo el resto del sitio hereda su paleta: azul noche de fondo, **ámbar** como único acento de acción, **cobalto** y **cian** como apoyo técnico.

## Color tokens

```css
--kb-bg:           #05090f;   /* fondo de página */
--kb-bg-raised:    #0a121c;   /* tarjetas, paneles */
--kb-bg-floating:  #0c141f;   /* superficies elevadas */

--kb-accent:       #f0a43a;   /* ámbar: CTA, enlaces, estados activos */
--kb-accent-soft:  #f5bd6a;
--kb-accent-muted: rgba(240,164,58,.14);
--kb-cobalt:       #3b5bdb;   /* resplandores de fondo, superficies de marca */
--kb-cobalt-deep:  #12245e;
--kb-cyan:         #38d0ee;   /* apoyo técnico (uso puntual) */

--kb-text:         #eef2f6;
--kb-text-strong:  #f4f7fa;
--kb-text-muted:   #8a97a8;
--kb-text-soft:    #718296;

--kb-line:         rgba(255,255,255,.07);
--kb-line-strong:  rgba(255,255,255,.16);
--kb-line-accent:  rgba(240,164,58,.45);
```

Historia: hasta 2026-10-10 el acento era naranja `#ff5b2e`. Cambió a ámbar para casar con la gradación del video (cobalto + ámbar) y con el cobalto de la marca. No quedan usos del naranja.

**Reglas de uso:** el ámbar es el único color de acción (botones primarios, estados, números de paso). Cobalto solo en fondos (`radial-gradient` suaves) y cian solo como detalle. Nunca tres acentos compitiendo en el mismo bloque.

## Typography

| Voz | Familia | Uso |
|---|---|---|
| Display | Familjen Grotesk 500/600/700 | H1 a H3, números grandes, citas |
| Cuerpo | Inter Tight 400/500/600 | Texto, navegación, botones |
| Mono | JetBrains Mono 400/500/700 | Eyebrows, etiquetas, chips, metadatos, contadores |

Carga desde Google Fonts con `media="print"` y cambio a `all` en `load` (no bloquea el primer pintado).

Escala fluida: `h1 clamp(2.6rem,7.4vw,6.2rem)`, `h2 clamp(1.9rem,4vw,3.6rem)`, `h3 clamp(1.18rem,1.7vw,1.55rem)`. Titulares enormes de impacto (manifiesto, cita del fundador, cifras) usan `clamp` propio en su sección.

## Portada: recorrido (scroll-world)

`src/components/Journey.astro` + `src/scripts/journey.js` + `src/data/journey.ts`.

- Un video fijo a pantalla completa avanza o retrocede con el scroll. 5 paradas unidas por 4 clips: **Inicio** (escritorio con papeles y hoja de cálculo) → **Operación** (líneas de luz que salen del portátil) → **Evidencia** (sala de control) → **PASS** (galería de verticales) → **Contacto** (escritorio al atardecer).
- Cada parada es un `<article>` renderizado en servidor (SEO, lector de pantalla, sin JS). La h1 es la de la parada 0. Las anclas se derivan del nombre (`#recorrido-<slug>`), nunca se escriben a mano.
- Los textos salen de `site.ts` (cifras y nombres de producto no se duplican).
- Tarjeta de vidrio (`backdrop-filter`) en las paradas 1 a 4; la portada flota sin caja sobre una viñeta.
- Sin JS: cada parada es una sección con su fotograma. Con `prefers-reduced-motion`: solo fotogramas fijos.
- Al terminar, `.after-journey::before` funde la última escena con el fondo de la página.

### Cómo se produjo (para regenerar)

1. Stills: OpenRouter, modelo `openai/gpt-image-2.5-sunburst` por `/api/v1/images`, 1536×1024, recortados a 16:9. Cohesión: mismo preámbulo de estilo (fotorrealista, bajo en luz, sombras cobalto, acentos ámbar, sin texto).
2. Clips: Monid, `kling` `/v1/video/kling-2.6-i2v`, 1080p, 5 s, sin audio, `first_frame` + `last_frame` con los stills vecinos. 0.35 USD por clip.
3. Codificación: escritorio 1920×1080 `crf 25 -g 8` (~4 MB/clip); móvil 1280×720 `crf 27 -g 4` (~2.1 MB/clip). Fotogramas fijos `public/world/stop-N(-m).webp`, extraídos del propio video para que el paso imagen→video no se note.
4. Caché `immutable` en `/video` y `/world`: si se regenera un clip, **cambiar el nombre del archivo**.

### Política de rendimiento del video (no negociable)

El video no puede competir con la carga de la página.

- Nada se descarga hasta el primer scroll o gesto. Solo escritorio con buena conexión empieza 2.5 s después de `load`.
- Móvil y ahorro de datos: nunca precarga masiva; un clip a la vez y solo los cercanos al scroll. Escritorio: máximo dos en vuelo.
- Los clips se descargan como `Blob` (siempre buscables aunque el host no sirva `Range`). Por eso el CSP necesita `media-src 'self' blob:` (en `server.mjs`).
- Medido en móvil, Slow 4G, CPU 4× más lenta: LCP 978 ms, CLS 0.00, scrub p95 14 ms por frame.
- La versión móvil es un recorte del 16:9 con encuadre horizontal propio por parada (`focus`). Una cadena 9:16 nativa es la mejora pendiente.

## Surface architecture

1. **Escena** (portada): el video. Texto sobre vidrio oscuro, sin fondos planos compitiendo.
2. **Plana** (la mayoría de secciones): `--kb-bg`, con resplandores cobalto muy suaves (`radial-gradient`, nunca en el borde superior de una sección para no crear escalón visible).
3. **Elevada** (tarjetas): `--kb-bg-raised`, borde `--kb-line`, esquinas 22px (`--kb-radius-lg`). Borde **o** sombra, no ambos con blur grande.
4. **Banda con imagen** (PASS, cifras): un fotograma del recorrido a todo el ancho con parallax suave y degradado a `--kb-bg` arriba y abajo, para continuar la historia del video.
5. **Drenched** (CTA final): fondo con resplandor cobalto y ámbar sobre `--kb-bg-raised`.

## Layout y composición por sección

Cada sección tiene una forma propia (regla: nada de cuadrículas idénticas repetidas).

| Sección | Forma |
|---|---|
| Manifiesto | Frase enorme cuyas palabras se iluminan con el scroll + 3 prácticas en fila |
| Servicios | Cuadrícula de 3, con índice, etiqueta y chips por tarjeta |
| PASS | Banda con parallax + cuadrícula asimétrica 4/2, 2/4, 3/3 |
| Proyectos | Tarjetas que se apilan (`position: sticky`); la anterior se hunde (scale .94 y oscurece) al llegar la siguiente. En ≤980px: columna estática |
| Sitios reales | Bento de 12 columnas con anchos 7/5, 4/4/4, 5/7, 6/6 |
| Proceso | Título fijo a la izquierda y línea vertical que se llena con el scroll; cada paso se enciende al alcanzarlo |
| Cifras | Banda sobre el fotograma de la sala de control, números con contador |
| Fundador | Cita grande con revelado por palabra, y debajo nombre y texto |
| FAQ | Título fijo a la izquierda, acordeón numerado con apertura animada |

Breakpoint principal: `980px` (todo a una columna, menú hamburguesa, sticky desactivado). `640px`: bento a una columna, relleno reducido.

## Components

- **Header:** pastilla de vidrio flotante (`position: fixed`), se oscurece al hacer scroll. En móvil, botón circular y panel desplegable propio.
- **Botón primario:** pastilla ámbar con texto `--kb-bg`. **Fantasma:** borde `--kb-line-strong`, hover ámbar.
- **Chips:** mono 0.7rem, fondo blanco al 5%.
- **WhatsApp flotante:** se oculta en móvil durante el recorrido para no tapar los CTA de las paradas.
- **Riel de paradas** (escritorio) y **barra de progreso** superior del recorrido.

## Motion

Narrativo, no decorativo. GSAP + ScrollTrigger (`src/scripts/animate.js`); todo dentro de `gsap.matchMedia()`.

1. **Recorrido** de la portada (video atado al scroll).
2. **Manifiesto y cita del fundador:** palabras que pasan de opacidad .14 a 1 con scrub.
3. **Proyectos apilados** y **línea de proceso** con scrub.
4. **Contadores** (`data-count`) al entrar, **parallax** en bandas (`data-parallax`), **reveal con stagger** en cuadrículas (`data-reveal-stagger`).

Easing por defecto `cubic-bezier(0.16,1,0.3,1)`; duraciones 200 a 520 ms. Con `prefers-reduced-motion: reduce`: no se divide ni anima ningún texto, los pasos del proceso quedan encendidos, el recorrido muestra solo fotogramas.

## Absolute bans

1. Texto con degradado (`background-clip: text`).
2. Glassmorphism como estilo por defecto: solo header, menú móvil y tarjetas del recorrido.
3. Eyebrow en cada sección: máximo uno cada tres.
4. Cuadrículas de tarjetas idénticas.
5. Borde + sombra con blur ≥ 16px a la vez.
6. `border-radius` de 32px o más en tarjetas.
7. Fondos de cuadrícula decorativos o rayas repetidas.
8. Bordes laterales de acento (`side-stripe`).
9. Plantilla "métrica héroe" (número enorme + etiqueta + degradado).
10. Tarjetas dentro de tarjetas.
11. **Identificadores escritos a mano:** anclas, slugs e ids se derivan del nombre, nunca los teclea una persona.
12. **Video que compita con la carga de la página** (ver política de rendimiento).

## Implementation tech

- **Framework:** Astro (SSR con adaptador Node, servidor propio `server.mjs` con caché, gzip y CSP).
- **Estilos:** CSS vanilla con custom properties.
- **Animación:** GSAP core + ScrollTrigger; motor propio `journey.js` para el video.
- **Iconos:** Phosphor Icons.
- **Imágenes:** capturas reales de clientes (WebP con `srcset`), mockups de proyectos y fotogramas del recorrido.

## Pendientes de diseño

- Versión móvil nativa 9:16 del recorrido (hoy es recorte del 16:9).
- Probar el scrub en un iPhone real (iOS Safari).
- Imagen Open Graph nueva con la marca actual (hoy usa el logo).
- Light mode: evaluado y descartado por ahora; el sitio es dark único.
