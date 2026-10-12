# KOR Bytes web (kor-bytes.com)

Sitio de KOR Bytes S.A.S., casa de software de Sincelejo (Colombia). Astro 6 estático servido por `server.mjs` (Node), desplegado con Dokploy: **cada push a `main` se publica solo** en ~1 a unos pocos minutos. Repositorio: `github.com/korozcolt/korbytes-web`. Todo el texto y la conversación son en español.

**Antes de cambiar nada visual, lee `DESIGN.md`. Para entender cómo se llegó aquí (qué se probó, qué falló, cuánto costó), lee `docs/PROCESO-RECORRIDO-PORTADA.md`. Lo abierto está en `PENDIENTES.md`.**

## Comandos

```bash
npm run dev                       # desarrollo (puerto 4321 por defecto)
npm run build                     # genera dist/ (también descarga las fuentes: necesita red)
npm run build && PORT=4400 node server.mjs   # probar producción con sus cabeceras, caché y CSP
```

`npm run check` (`astro check`) **se cae** por un fallo del runtime de Node; verifica con `npm run build` y en el navegador.

## Mapa rápido

- `src/pages/index.astro`: portada (cabecera, secciones, scripts). Otras páginas: landings (`[slug].astro`), guías, portafolio, legales.
- `src/components/Journey.astro` + `src/scripts/journey.js` + `src/data/journey.ts`: el recorrido en video atado al scroll.
- `src/components/CommandPalette.astro`: búsqueda `Ctrl/⌘ K`. `Logo.astro`: el logo. `Footer.astro`, `LeadForm.astro`, `WhatsAppFab.astro`.
- `src/data/site.ts` y `landings.ts`, `guides.ts`: contenido (cifras y nombres salen de aquí; no se duplican).
- `src/styles/global.css`: tokens de color y estilos base. `src/scripts/animate.js`: GSAP (palabras, contadores, apilado, proceso).
- `public/video/journey/` y `public/world/`: clips y fotogramas del recorrido. `public/images/og-default.jpg`: imagen para compartir (fuente: `scripts/og-image.html`).
- `source/journey/` (fuera de git, 67 MB): stills, clips crudos de Kling y prompts originales. Sin esto, regenerar un tramo cuesta dinero otra vez.

## Reglas que ya costaron un error (no repetir)

1. **Marca = logo oficial.** Colores: azul marino `#081c3c` y cian `#04b0e0` (único color de acción). El logo es siempre `public/images/logo-oficial-dark.png` vía `Logo.astro`; nunca reconstruirlo con texto ni inventar otro. El ámbar/naranja/cobalto no van en la interfaz (el ámbar solo vive en la luz del video).
2. **Fuentes: nunca el nombre literal.** Astro las autoaloja y les pone un sufijo hash; `font-family: "Familjen Grotesk"` no encontraría nada. Usar `var(--font-familjen)`, `var(--font-inter)`, `var(--font-mono)`.
3. **El video no puede competir con la carga de la página.** No se descarga nada hasta el primer scroll (escritorio rápido: 2.5 s tras `load`); en móvil, un clip a la vez y solo los cercanos. El preloader se retira cuando hay contenido real (tope 1.5 s). No volver a poner un contador de adorno.
4. **Caché `immutable` en `/video` y `/world`**: si se regenera un archivo, cámbiale el nombre.
5. **CSP** (`server.mjs`): los clips se reproducen desde `blob:`, por eso existe `media-src 'self' blob:`. Si se añade un dominio externo (scripts, imágenes, fuentes), actualizar el CSP.
6. **Revisar textos grandes a varios anchos** (390, 768, 1000, 1440, 1700 px). Un `overflow-wrap: anywhere` partió "Sincelejo" y solo se vio en una resolución.
7. **Enlaces dentro de párrafos van subrayados** (el cian casi no se distingue del gris: contraste 1:1). Ya hay una regla global `p a:not([class])`.
8. **Identificadores generados por el sistema**: anclas, slugs e ids se derivan del nombre, nunca se teclean (regla global del usuario).
9. **Antes de gastar dinero** (Monid para video, OpenRouter para imágenes) confirma con el usuario. Saldo de Monid al 2026-10-12: 3.20 USD (Kling 2.6 1080p de 5 s = 0.35 USD).

## Cómo medir rendimiento

Usar el **CLI oficial**: `npx -y lighthouse <url> --chrome-flags="--headless=new --no-sandbox"` (móvil por defecto; `--preset=desktop`). La herramienta Lighthouse de DevTools MCP **excluye la categoría de rendimiento**. Dos modos dan cifras muy distintas en el sitio publicado: el simulado (por defecto, móvil ~83) se infla con la latencia del servidor; con `--throttling-method=devtools` da 100. Explicación completa en la sección 9.5 del documento de proceso. Las páginas internas y la portada están en 99 o 100 en local.

## Flujo de trabajo con git

Una rama por tema (`feat/…`, `fix/…`, `perf/…`, `docs/…`), commits descriptivos con `Co-Authored-By`, y **solo se mergea a `main` (que despliega solo) cuando el usuario lo pide**. Se mergea con `--no-ff`. Tras cada cambio visual: comprobar en el navegador (escritorio y 390 px) antes de decir que está listo.

## NotebookLM

Cuaderno **"KOR Bytes S.A.S."** (id `ecfbceb1-ad80-412e-a879-e1c6ada9453f`, https://notebooklm.google.com/notebook/ecfbceb1-ad80-412e-a879-e1c6ada9453f). Las fuentes de NotebookLM **no se sincronizan solas**: cuando cambien `DESIGN.md`, `docs/PROCESO-RECORRIDO-PORTADA.md` o `docs/NOTEBOOKLM_KORBYTES_PORTADA_2026-10-12.md`, hay que volver a subirlas (borrar la fuente anterior y añadir el archivo con `source_add`, luego renombrarla). La ficha antigua `korbytes-web.md` (julio 2026) está marcada como obsoleta en el cuaderno.

## Estado (2026-10-12)

Todo lo descrito está en `main` y desplegado. Abierto: bajar el tiempo hasta el primer byte del servidor (~450 ms, evaluar CDN), decidir si los 47 MB de video van en git, resolver `astro check`, refrescar la caché de la imagen Open Graph en LinkedIn/Facebook/WhatsApp. Detalle en `PENDIENTES.md`.
