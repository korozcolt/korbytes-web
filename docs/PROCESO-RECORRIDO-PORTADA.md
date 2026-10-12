# Cómo se construyó la portada de KOR Bytes: proceso completo

Documento de proceso. Cuenta cómo se llegó a la portada actual: el concepto, las imágenes y sus prompts, la generación de video, la codificación, el motor de scroll, la política de rendimiento, el rediseño de las demás secciones, los errores encontrados y cómo reproducirlo. Escrito entre el 2026-10-11 y el 2026-10-12, sobre el trabajo de esos días y el del 2026-10-10. Actualizado al cierre del 2026-10-12.

Complementa a:

- `DESIGN.md`: el sistema de diseño vigente (tokens, formas por sección, prohibiciones).
- `PRODUCT.md`: usuarios, propósito y personalidad de marca.
- `PENDIENTES.md`: tareas abiertas.

La referencia de método fue el proyecto Alfaro & Bolaño (`aldemarbolano/docs/proceso-creacion-web.md`). Allí el recorrido era una oficina real. Aquí es un recorrido conceptual, con imágenes generadas, y eso cambia varias decisiones (sección 3).

Al final, la sección 13 dice con honestidad qué no quedó registrado.

---

## Estado actual (léelo primero)

**Todo está en `main` y desplegado** (último commit de código: `2faf387`; documentación: `18d7116` y posteriores). No hay ramas con trabajo pendiente de mergear.

| Qué | Estado |
|---|---|
| Portada con recorrido de video atado al scroll (5 paradas, 4 clips) | Hecho |
| Rediseño de proyectos, clientes, proceso, cifras, fundador y FAQ | Hecho |
| Logo oficial en todo el sitio; paleta marino `#081c3c` y cian `#04b0e0` | Hecho (se corrigió un error mío, sección 8.1) |
| Cabecera de barra con subrayado activo e indicador de parada; paleta `Ctrl/⌘ K` | Hecho |
| Favicons nuevos (cuadrado cian con K) con parámetro de caché `?v=2` | Hecho |
| Imagen Open Graph nueva (caos → flujo → sistema) | Hecho |
| Rendimiento: fuentes autoalojadas, preloader honesto, imágenes por proximidad | Hecho |
| Lighthouse (local): 99 móvil y 100 escritorio en la portada; 100 en las otras 15 páginas | Medido |
| Lighthouse (sitio publicado, simulado): móvil 83; con throttling real: 100 | Medido, ver 9.5 |
| Versión móvil 9:16 nativa del video | **Descartada por decisión del usuario** |

**Cinco cosas que conviene saber antes de tocar el sitio** (el detalle y el porqué están en las secciones 8 a 10; las reglas condensadas, en `CLAUDE.md`):

1. Los colores y el logo salen del logo oficial; no inventar otros.
2. Las fuentes se usan con `var(--font-*)`, nunca con el nombre literal (Astro les pone un sufijo hash).
3. El video no debe competir con la carga: nada se descarga antes del primer scroll.
4. `/video` y `/world` tienen caché `immutable`: al regenerar un archivo, cambiarle el nombre.
5. Un texto grande se revisa a varios anchos; los enlaces dentro de párrafos van subrayados.

**Pendiente abierto** (lista completa en la sección 14 y en `PENDIENTES.md`): bajar el tiempo hasta el primer byte del servidor (~450 ms; evaluar un CDN), decidir si los 47 MB de video van en git, resolver `astro check` y refrescar la caché de la imagen Open Graph tras el despliegue.

**Fuentes que no están en git:** `source/journey/` (67 MB: stills, clips crudos de Kling y prompts). Existe solo en el disco local del autor. Los enlaces de Kling caducan a los 30 días, así que hay que hacer copia de seguridad si se quiere poder regenerar un tramo sin repetir el gasto.

---

## 1. Resumen en una página

**Qué es.** La portada de `kor-bytes.com` es un recorrido en video atado al scroll. Un video fijo a pantalla completa avanza o retrocede según el scroll. Cada parada muestra su texto cuando la cámara se detiene.

**Idea central.** El mensaje de marca es *"No hacemos software. Ordenamos operaciones."* El recorrido lo cuenta con imagen: del caos operativo (escritorio con papeles y hojas de cálculo) al sistema (sala de control, galería de productos PASS), hasta un escritorio al atardecer con el contacto.

**Cómo se logró, en cinco movimientos:**

1. Se definió el concepto "Operación → sistema" y 5 paradas (sección 3).
2. Se generaron 5 imágenes fijas (stills) con IA, todas con el mismo preámbulo de estilo (sección 4).
3. Con Monid y Kling 2.6 se generaron 4 clips de 5 s, cada uno entre dos stills vecinos (sección 5).
4. Los clips se recodificaron para scrub, con una versión móvil, y se adaptó el motor de scroll del proyecto de Aldemar (secciones 6 y 7).
5. Se rediseñó el resto de la página con el mismo lenguaje visual, se midió el rendimiento y se corrigieron los problemas (secciones 8 a 10).

**Costo de generación:** 1.40 USD en video (4 clips × 0.35) y unos centavos en imágenes (sección 4.4).

**Resultado medido** (detalle y límites en la sección 9): portada con Lighthouse oficial en local, **99 en móvil y 100 en escritorio**, CLS 0; las otras 15 páginas, 100. En el sitio publicado, con throttling real, 100 y LCP de ~1 s; con el modo simulado por defecto sale 83 porque el servidor tiene ~450 ms hasta el primer byte. Scrub fluido (p95 de 14 ms por frame). Clips de 16 MB en escritorio y 8.6 MB en móvil, y no se descarga ninguno hasta el primer scroll.

---

## 2. Línea de tiempo

| Fecha | Hito |
|---|---|
| 2026-10-10 | Lectura del documento de Aldemar y de los skills `scroll-world` y `landing-page-design`. Decisiones de concepto, presupuesto e identidad. |
| 2026-10-10 | Intentos de generar stills: Codex falla, Gemini 2.5 Flash Image sale feo, se cambia a `gpt-image-2.5-sunburst` por OpenRouter. Stills aprobados. |
| 2026-10-10 | 4 clips con Kling 2.6 vía Monid (1.40 USD). Codificación, motor, componente, evolución de marca, primera pasada de diseño. Rama `feat/scroll-journey-home`. |
| 2026-10-10 | Auditoría de rendimiento del video y recompresión. Merge a `main` (`bda9aa6`). |
| 2026-10-11 | Rediseño de proyectos, clientes, proceso, cifras, fundador y FAQ, y `DESIGN.md`. Merge a `main` (`28168a4`). |
| 2026-10-11 | Corrección de "Sincelejo" partido en dos líneas (`bf19429`). Este documento. |
| 2026-10-12 | El usuario señala que los colores de marca son los del logo y que el menú no parece de tecnología: paleta marino/cian, logo oficial en todo el sitio, cabecera nueva y paleta de comandos. |

Commits relevantes: `50c9fea` (recorrido), `46c50ef` (rendimiento), `bda9aa6` (merge), `dc66aee` (secciones), `28168a4` (merge), `7c3f732` y `bf19429` (corrección).

---

## 3. Decisiones de concepto (las tomó el usuario)

Se le preguntó tres cosas, con una recomendación en cada una:

| Pregunta | Elegido |
|---|---|
| ¿Qué "mundo" recorre el scroll? | **Operación → sistema** (caos → flujo → panel → PASS → contacto). Descartados: la oficina real de KOR Bytes, un datacenter, un diorama isométrico PASS. |
| ¿Presupuesto de video? | Usar los **4.60 USD** que había en Monid. Cadena de 4 clips y margen para regenerar. Solo escritorio, con recorte vertical para móvil. |
| ¿Identidad visual? | **Evolución fuerte**: se permite cambiar paleta y tipografía. |

**Por qué "Operación → sistema" y no la oficina real.** En Aldemar, las fotos reales eran los fotogramas inicial y final de cada clip, así que el texto y el logo eran reales. Aquí no había fotos de un espacio que se quisiera mostrar, y el concepto de marca (ordenar operaciones) se cuenta mejor con una metáfora visual. El costo: todos los fotogramas son imágenes generadas. Por eso se prohibió texto en las imágenes, para que la IA no inventara letreros.

**Cámara.** Recorrido continuo hacia adelante, con cada clip definido por un fotograma inicial y uno final. Es una variante de la "arquitectura A" del skill `scroll-world`: la cámara nunca retrocede entre paradas.

**Las 5 paradas:**

| # | Parada | Escena | Mensaje |
|---|---|---|---|
| 0 | Inicio | Escritorio de noche con papeles, notas y una hoja de cálculo caótica | Quiénes somos (la h1) |
| 1 | Operación | Líneas de luz que salen del portátil por el pasillo | Del caos al flujo |
| 2 | Evidencia | Sala de control con pantalla curva | Sistemas reales, con estado real |
| 3 | PASS | Galería con paneles verticales de aplicaciones | Productos verticales sobre un núcleo común |
| 4 | Contacto | Escritorio junto a una ventana al atardecer | ¿Qué proceso quieres ordenar primero? |

Los textos y las cifras salen de `src/data/site.ts` (por ejemplo, "6 productos PASS" es `passProducts.length`), no se escribieron a mano. Así no hay cifras que se desactualicen.

---

## 4. Las imágenes

### 4.1 Preámbulo de estilo común

Todos los stills comparten este bloque, que es lo que da cohesión (versión final, tras un ajuste):

```
Photorealistic cinematic architectural photograph, 16:9 wide landscape, eye-level camera,
shallow depth of field, dark moody low-key lighting with deep cobalt blue shadows (#1b3a8f)
and warm amber (#e0a030) practical light accents, subtle film grain, ultra sharp, no people,
absolutely no text, no letters, no logos, no readable writing anywhere, screens show only
abstract geometric shapes and glowing lines, never any characters or words. Full-bleed frame,
no black bars or letterboxing.
```

La paleta cobalto y ámbar de las imágenes es la que dio origen a la paleta del sitio (sección 8.1).

### 4.2 Sujeto de cada still

Cada uno se concatena después del preámbulo (`Subject: ...`). Los archivos originales están en `source/journey/prompts/s0.txt` a `s4.txt`.

| Still | Sujeto |
|---|---|
| 0 | Escritorio de madera de operaciones, de noche, en una oficina tenue: pilas de carpetas, notas adhesivas, portátil con una hoja de cálculo caótica en pantalla, cables enredados, lámpara de escritorio ámbar, luz azul cobalto de ventana. "Operational chaos before software." |
| 1 | La misma oficina, pero el desorden se disolvió: escritorio limpio, portátil, finas líneas de luz cian y ámbar que salen de la pantalla y cruzan hacia un pasillo oscuro, tarjetas de estado translúcidas flotando (abstractas, sin texto). |
| 2 | Sala de control moderna con una pantalla curva enorme que muestra un panel de operaciones abstracto (gráficos, columnas kanban, puntos de estado en cobalto, cian, ámbar y esmeralda), pisos pulidos con reflejos, sillas vacías. |
| 3 | Galería larga y oscura con once paneles verticales grandes a cada lado, cada uno con una interfaz de aplicación abstracta distinta, piso con reflejos cobalto y ámbar, perspectiva simétrica de un punto de fuga. |
| 4 | Una estación de trabajo cálida junto a un ventanal al atardecer sobre el horizonte de una ciudad pequeña colombiana, portátil y teléfono con burbujas de chat abstractas, una taza de café. |

### 4.3 Modelos probados, en orden

| Intento | Resultado |
|---|---|
| Codex CLI 0.139.0 (`image_gen`, gratis con la suscripción de ChatGPT) | **Falló** en las 5 llamadas: el modelo `gpt-5.6-terra` exige una versión más nueva de Codex. No se generó ninguna imagen. |
| OpenRouter `google/gemini-2.5-flash-image` (0.039 USD por imagen) | **Descartado.** Salió poco agradable, con **texto inventado** pese a la orden de no ponerlo (en los paneles aparecían "CLINIC", "Logistics") y barras negras (*letterbox*) en la primera imagen. El usuario pidió un modelo más actual. |
| OpenRouter `google/gemini-nano-banana-2.1` | **No disponible**: error 429 (limitado por el proveedor) en 20 intentos seguidos. |
| OpenRouter `openai/gpt-image-2.5-sunburst` | **Elegido.** Fotorrealista, sin texto, cohesión alta. Usa el endpoint `/api/v1/images` (por `chat/completions` devuelve 404). |

Los modelos de imagen de OpenRouter se listan con `GET /api/v1/models?output_modalities=image`. Los más nuevos al 2026-10-10 eran, entre otros, `google/gemini-nano-banana-2.1`, `openai/gpt-image-2.5-sunburst`, `black-forest-labs/flux-3-image` y `bytedance-seed/seedream-5-0-*`.

**Parámetros finales:** `size: "1536x1024"`, `n: 1`. La salida es 3:2, así que se recortó a 16:9 con `crop=1536:864` y se escaló a 1920×1080 (`16x9_N.jpg`).

### 4.4 Costo de las imágenes

- Gemini 2.5 Flash Image: 5 imágenes, unos 0.19 USD (0.0388 cada una). Se descartaron.
- `gpt-image-2.5-sunburst`: 5 imágenes. **El costo no se midió** (no se leyó el campo de uso). Es del orden de centavos por imagen según el modelo, pero no hay cifra confirmada.

### 4.5 Manejo de la clave

La clave de OpenRouter se guardó en `~/.config/openrouter/key` (permisos 600) para que no pasara por el chat, pero **el usuario la pegó en la conversación al guardarla**. Quedó expuesta en ese registro. **El usuario la rotó el 2026-10-12.** Lección: las claves se guardan en un archivo local y no se pegan en el chat. Nunca se escribió en un archivo del repo.

---

## 5. Generación de video con Monid

### 5.1 Modelo y costo

`kling`, endpoint `/v1/video/kling-2.6-i2v`. Acepta `first_frame` y `last_frame`, que permite conectar dos stills.

| Resolución | USD por segundo |
|---|---|
| 720p, sin audio | 0.042 |
| **1080p, sin audio** | **0.07** |
| 1080p, con audio | 0.14 |

Un clip de 5 s en 1080p sin audio cuesta **0.35 USD**. Se generaron 4: **1.40 USD**. Saldo de Monid: de 4.60 a **3.20 USD** (verificado con `monid balance`). Un clip fallido o rechazado no cobra.

### 5.2 Los prompts

Bloque común (se sustituye `{m}` por el movimiento):

```
Steady gimbal first-person slow walk forward, single continuous shot without cuts. Camera at
eye level, smooth stabilized motion at a slow walking pace with very subtle natural sway,
constant speed, no zoom, no whip pans, no camera shake. Photorealistic dark modern office,
moody cobalt blue and warm amber lighting, cinematic architectural film look. {m} No people,
nothing moves in the scene except the camera. Keep all screens abstract and free of text.
```

Movimiento por clip:

| Clip | Movimiento |
|---|---|
| 0 → 1 | The camera glides forward along the cluttered desk, drifting gently right as the paper stacks and sticky notes dissolve into order, glowing cyan and amber light lines emerging from the laptop screen and flowing down the corridor ahead. |
| 1 → 2 | The camera follows the flowing light lines down the dark corridor, passing through glass doors and turning slightly right, arriving in a large control room with a curved wall display of abstract dashboards. |
| 2 → 3 | The camera continues forward across the control room floor past the empty workstations, turning gently left through a doorway into a long gallery hall lined with tall glowing vertical display panels, settling in symmetric perspective. |
| 3 → 4 | The camera walks slowly down the gallery between the glowing panels, then turns gently right through an opening into a warm workstation by a large window at dusk, easing to a soft stop facing the desk with laptop, phone and the evening city. |

Parámetros de todas las llamadas: `resolution: 1080p`, `duration: 5`, `audio: off`. El cuerpo completo de cada llamada está en `source/journey/prompts/clipN-body.json` (con las URLs temporales retiradas).

La estructura es deliberada, igual que en Aldemar: cámara a ritmo constante (sin zoom ni giros bruscos, para que el scrub se vea natural), "nada se mueve salvo la cámara", y pantallas abstractas y sin texto.

### 5.3 Runbook de comandos

Notas: usar `NO_COLOR=1`; en zsh `$var` no se divide en argumentos.

1. **Subir cada fotograma al almacenamiento de Monid (`sfs`)**, porque el endpoint pide URLs públicas:
   ```bash
   monid run -p sfs -e /put -i '{"path":"korbytes/f0.jpg","sizeBytes":<bytes>}' -w -j
   # tomar .output.uploadUrl y subir:
   curl -T 16x9_0.jpg "<uploadUrl>"          # debe responder HTTP 200
   ```
2. **Pedir una URL pública temporal:**
   ```bash
   monid run -p sfs -e /cat -i '{"path":"korbytes/f0.jpg","ttl":"1d"}' -w -j
   ```
3. **Generar el clip** (el único paso que gasta saldo):
   ```bash
   monid run -p kling -e /v1/video/kling-2.6-i2v -f body0.json -j
   ```
   con `{"prompt": ..., "media": [{"type":"first_frame","url":...},{"type":"last_frame","url":...}], "resolution":"1080p","duration":5,"audio":"off"}`.
4. **Sondear** hasta `COMPLETED` (3 a 5 minutos): `monid runs get -r <runId> -j`.
5. **Descargar** desde `.output.outputs[0].url` (el enlace caduca a los 30 días): `curl -sL -o clip.mp4 "<url>"`.

### 5.4 Resultados

Los 4 clips: H.264, 1920×1080, 24 fps, 122 fotogramas (5.08 s).

| Clip | Run en Monid |
|---|---|
| 0 → 1 | `01M4M1HBN6V77ZJDHJSWSM05ME` |
| 1 → 2 | `01M4M1HCJAP06YBBXQG9MQMF3N` |
| 2 → 3 | `01M4M1HDGZTMAGBDVV6H33N4N7` |
| 3 → 4 | `01M4M1HEDNTR1BJRJ592ATKXEQ` |

La revisión visual (una tira de 6 fotogramas por clip) mostró continuidad espacial coherente entre paradas y sin saltos. No se hizo el análisis de luma por fotograma que se hizo en Aldemar.

---

## 6. Costuras entre paradas

Igual que en Aldemar, la regla del skill `scroll-world` es que **las costuras sean fotograma idéntico**. Aquí:

- Cada clip se generó con `first_frame` y `last_frame`, que son los stills de dos paradas vecinas.
- Los **fotogramas fijos de la web (`stop-N.webp`) no son los stills generados, sino fotogramas extraídos del propio video**: el primero del clip N (parada N) y, para la última parada, el último del clip 3. Así el paso de la imagen fija al video no se nota (el video arranca exactamente en esa imagen).
- El motor aplica una fundición cruzada corta (7 % de la altura de ventana) entre una escena y la siguiente.

Diferencia con Aldemar: allí el primer y último fotograma eran fotos reales. Aquí son imágenes generadas, por eso el último fotograma real de un clip puede diferir un poco del siguiente. La fundición lo cubre.

---

## 7. Codificación y fotogramas fijos

### 7.1 Por qué recodificar

Mover `video.currentTime` con el scroll exige un video con puntos de búsqueda cercanos. Se usa un GOP corto (8 en escritorio, 4 en móvil) en lugar de todo-intra, que infla los archivos.

### 7.2 Parámetros finales

| Versión | Resolución | CRF | GOP | Peso por clip | Total |
|---|---|---|---|---|---|
| Escritorio (`clip-N.mp4`) | 1920×1080 | 25 | 8 | ~4.0 MB | 16.4 MB |
| Móvil (`clip-N-m.mp4`) | 1280×720 | 27 | 4 | ~2.1 MB | 8.6 MB |

Comandos:

```bash
# escritorio
ffmpeg -i clipN.mp4 -an -vf "unsharp=5:5:0.6:5:5:0.0" -c:v libx264 -preset slow -crf 25 \
  -pix_fmt yuv420p -g 8 -keyint_min 8 -sc_threshold 0 -movflags +faststart clip-N.mp4
# móvil
ffmpeg -i clipN.mp4 -an -vf "scale=1280:720:flags=lanczos,unsharp=3:3:0.5" -c:v libx264 \
  -preset slow -crf 27 -pix_fmt yuv420p -g 4 -keyint_min 4 -sc_threshold 0 -movflags +faststart clip-N-m.mp4
```

### 7.3 Cómo se eligió el CRF

La primera codificación usó crf 20 (escritorio, 8 MB) y crf 23 (móvil, 3.5 MB), siguiendo el skill. Al auditar el rendimiento (sección 9) se probaron crf 20, 24 y 27 en escritorio y crf 23 y 27 en móvil sobre el mismo fotograma, ampliando un recorte de 640×360 con las líneas de luz (el detalle más exigente). **A ojo no se distinguen.** Se eligió crf 25 y 27 con margen. Una imagen oscura con degradados puede mostrar bandas con crf altos, así que si se regenera con otro contenido hay que repetir la comparación.

### 7.4 Fotogramas fijos

`public/world/stop-N.webp` (1920×1080, 108 a 144 KB) y `stop-N-m.webp` (960×540, 44 a 60 KB). Se extrajeron con ffmpeg a PNG y se convirtieron con Pillow, porque **este ffmpeg no trae el codificador `libwebp`**.

### 7.5 Móvil: recorte, no versión nativa

La versión móvil es un **recorte vertical del mismo video 16:9**, con un encuadre horizontal propio por parada (`focus`, interpolado entre paradas). Es el recurso de respaldo del skill. **Decisión del usuario (2026-10-12): la versión móvil se queda así**, porque le gusta como está y no ve necesaria una cadena 9:16 nativa. Es una opción abierta (costaría unos 1.40 USD), no una deuda. En pantallas estrechas se ve solo la franja central, con menos resolución efectiva.

---

## 8. El motor y la web

### 8.1 Evolución de marca (con una corrección)

Hasta el 2026-10-10 el sitio tenía un único acento naranja (`#ff5b2e`). Como el usuario eligió "evolución fuerte" y las imágenes ya traían cobalto y ámbar, ese día el acento pasó a **ámbar `#f0a43a`**, con cobalto como apoyo.

**Eso fue un error de criterio.** El usuario lo señaló el 2026-10-12: *los colores de la empresa son los del logo*. Medidos sobre el PNG oficial, son **azul marino `#081c3c`** y **cian `#04b0e0`**. Yo no había mirado el logo antes de decidir la paleta; la tomé de las imágenes generadas. Además la cabecera usaba una "K" cuadrada ámbar y un texto "KOR Bytes." inventados en lugar del logo oficial.

Correcciones del 2026-10-12:

- **Paleta:** cian `#04b0e0` como único color de acción, marino `#081c3c` como color de marca (CTA final) y superficies en un marino oscurecido (`#050d1a`, `#0a172b`, `#0e2038`). Ya no hay ámbar, cobalto ni naranja en la interfaz. El ámbar solo queda en la luz cálida de las escenas del video (no se regeneró: costaría dinero y el contraste cálido sobre cian funciona).
- **Logo:** componente `Logo.astro` con `logo-oficial-dark.png`, usado en cabecera, preloader, pie, 404 y las 7 cabeceras de páginas internas (antes cada una escribía "KOR Bytes." como texto).
- **Favicons e íconos de app:** regenerados desde `favicon-oficial.png` (cuadrado cian con la K). El origen mide 160 px, así que los de 192 y 512 px son un reescalado (bordes algo menos nítidos).
- **Cabecera:** se rediseñó (sección 8.5).

Hallazgo previo: `DESIGN.md` describía una paleta OKLCH, tipografías (Space Grotesk, DM Sans) y un sitio que **nunca se habían aplicado**; el código real usaba hex, Familjen Grotesk e Inter Tight. `DESIGN.md` se reescribió dos veces para describir lo implementado.

### 8.2 Motor de scroll

`src/scripts/journey.js`, copiado del de Aldemar. Lógica heredada: cadena de segmentos `hold` (parada fija con su texto) y `transit` (clip atado al scroll), suavizado del tiempo del video al 20 % por fotograma, carga de cada clip como `Blob` (siempre buscable, aunque el host no sirva rangos de bytes), seeks sin cola, cebado de iOS y fundición cruzada de costuras.

Pesos de scroll (en alturas de ventana): paradas 1.15, 1.05, 1.05, 1.05 y 2.6; cada tránsito 1.5. El recorrido completo mide unas **12.9 alturas de ventana**.

Accesibilidad: con `prefers-reduced-motion` solo se ven los fotogramas fijos; sin JavaScript, cada parada es una sección con su fotograma como fondo (en `<noscript>`).

### 8.3 Componente y datos

- `src/components/Journey.astro`: HTML de las paradas (renderizado en servidor), riel de paradas, barra de progreso y estilos globales.
- `src/data/journey.ts`: contenido de las paradas. Los textos y cifras salen de `site.ts`.
- Las anclas de las paradas se derivan del nombre (`#recorrido-<slug>`), nunca se escriben a mano. Se prefijan con `recorrido-` porque `#pass` y `#contacto` ya existen como secciones posteriores.
- La h1 de la página es la de la parada 0. Cada parada incluye una descripción de la escena solo para lectores de pantalla (`.sr-only`).

### 8.4 El resto de la portada

Qué se hizo y por qué (la tabla completa de formas por sección está en `DESIGN.md`):

- **Header:** pastilla de vidrio flotante sobre el video; en móvil, botón circular y panel desplegable.
- **Puente:** `.after-journey::before` funde la última escena con el fondo de la página (antes había un corte seco a negro).
- **Manifiesto:** frase enorme cuyas palabras se iluminan con el scroll (GSAP `scrub`).
- **PASS:** banda con el fotograma de la galería (parallax) y cuadrícula asimétrica.
- **Proyectos:** tarjetas apiladas con `position: sticky`. La anterior se hunde (escala 0.94) y se oscurece con una capa opaca.
- **Sitios reales:** bento de 12 columnas.
- **Proceso:** línea de progreso que se llena con el scroll.
- **Cifras:** banda sobre el fotograma de la sala de control, con contadores.
- **Fundador:** cita grande con revelado por palabra.
- **FAQ:** acordeón numerado con apertura animada.

Todo el movimiento usa `gsap.matchMedia()` y con `prefers-reduced-motion: reduce` el texto no se divide ni se anima.

### 8.5 Cabecera y paleta de comandos

El usuario dijo que el menú principal parecía "de un restaurante o una cafetería" y no de una empresa tecnológica, y pidió usar la skill de UI/UX para darle un toque propio. La causa era la forma: una píldora de vidrio flotante, centrada y redondeada, con enlaces en texto corriente.

Qué se hizo, guiado por `ui-ux-pro-max` (estado activo visible, orden de tabulación lógico, foco visible, objetivos táctiles de 44 px, `prefers-reduced-motion`):

- **Barra a todo el ancho** de 60 px con borde inferior, en lugar de píldora. Esquinas de 8 px en botones, no completamente redondeadas.
- **Navegación en JetBrains Mono**, mayúsculas, con **subrayado cian que se desliza** bajo la sección activa (detección por `IntersectionObserver`) y `aria-current="location"`.
- **Indicador de parada:** mientras dura el video, la cabecera muestra `02 / 05 OPERACIÓN` y sigue al motor (evento `journey:stop`). Se oculta al salir del recorrido.
- **Búsqueda `Ctrl/⌘ K`:** paleta de comandos (`CommandPalette.astro`) con `<dialog>` modal nativo. Busca sobre secciones, soluciones (landings), guías y acciones de contacto, todo derivado de los datos del sitio. También abre con `/`. Combobox accesible, con flechas, Enter y Esc.
- **Móvil:** botón de menú de 44 px que se transforma en X, panel a ancho completo con enlaces numerados, y una fila "Buscar en el sitio".
- La nav pasó de 5 enlaces genéricos ("Inicio", "Ecosistema PASS"…) a 5 directos: PASS, Servicios, Proyectos, Proceso, Contacto (el logo ya lleva al inicio).

Problema encontrado al probarlo: el filtro de la paleta ocultaba las opciones con el atributo `hidden`, pero el `display: flex` del CSS lo anulaba y se veían todas. Se corrigió con una regla `[hidden] { display: none }`.

Qué **no** se hizo: la paleta solo existe en la portada; las páginas internas conservan su cabecera simple (con el logo oficial). No se probó el atajo con un teclado físico en Windows (el texto cambia a "Ctrl" por detección de plataforma; se verificó en Mac).

---

## 9. Rendimiento

### 9.1 El problema

Se pidió expresamente que los videos no afecten el rendimiento. La primera versión no lo garantizaba: el motor precargaba los 4 clips en segundo plano sin esperar al usuario (**32 MB en escritorio y 14.7 MB en móvil**). En móvil emulado con Slow 4G, el primer clip (3.3 MB) no había terminado a los 15 s, compitiendo con la propia página.

### 9.2 La política (ahora implementada)

- **Nada de video se descarga hasta el primer scroll o gesto.** Solo en escritorio con buena conexión, 2.5 s después del evento `load`.
- **Móvil y ahorro de datos** (`saveData`, 2G, 3G): nunca hay precarga masiva; se piden solo los clips cercanos al scroll, **de uno en uno**.
- **Escritorio:** máximo dos clips en vuelo, y la precarga en reposo ya no se salta un clip cuando hay otro descargándose.
- Clips más livianos (sección 7.3): 16.4 MB y 8.6 MB en total.
- Los clips se descargan como `Blob`, por eso el CSP necesita `media-src 'self' blob:` (sección 10).

### 9.3 Medición

Build de producción servido con `server.mjs`, Chrome DevTools, móvil emulado (390×844, DPR 3), Slow 4G, CPU 4× más lenta:

| Métrica | Resultado |
|---|---|
| LCP | 978 ms (TTFB 99 ms, retraso de renderizado 879 ms) |
| CLS | 0.00 |
| Videos pedidos tras 8 s sin scroll | 0 |
| Clips descargados al hacer scroll por las dos primeras paradas | 2, de uno en uno |
| Scrub durante scroll continuo (315 frames) | p50 13.3 ms, p95 14.3 ms, un frame largo (134 ms) |

**Límites de esta medición, para ser fiel:**

- La emulación de red no aplicó el límite a las descargas de video (`fetch`), así que los **tiempos de descarga no son representativos**. Los tamaños sí lo son.
- El primer valor de tamaño de clip que se leyó en el navegador (3.2 MB) era la **copia antigua en caché** (la caché es `immutable`), no el archivo nuevo de 2.1 MB. Los pesos verdaderos se confirmaron con `stat` sobre los archivos.
- **No se midió en un iPhone real**, que es lo más frágil del scrub.
- No se ejecutó Lighthouse completo sobre la página final (solo la traza de rendimiento).


### 9.4 Lighthouse tras la cabecera nueva (2026-10-12)

Build de producción servido con `server.mjs`, portada, escritorio y móvil:

| Categoría | Escritorio | Móvil |
|---|---|---|
| Accesibilidad | 100 | 100 |
| Buenas prácticas | 100 | 100 |
| SEO | 100 | 100 |
| Navegación para agentes | 100 | 100 |

Primera pasada: accesibilidad 96, con tres fallos reales que eran míos y se corrigieron:

- `aria-label` en los `<p>` con revelado por palabra (no permitido en un párrafo sin rol). Se quitó; los `<span>` por palabra se leen en orden con normalidad.
- El botón de búsqueda tenía un `aria-label` que no incluía su texto visible "Buscar" (criterio *label in name*). Se quitó el `aria-label` y el texto "Buscar" queda siempre en el DOM (oculto visualmente en pantallas estrechas con la técnica de *visually hidden*).
- Un fallo de "árbol de accesibilidad mal formado" que desapareció al corregir los dos anteriores.

Esta herramienta de Lighthouse **no incluye la categoría de rendimiento**, así que esos números siguen siendo los de la sección 9.3.

### 9.5 Lighthouse de rendimiento y optimización (2026-10-12)

Hasta aquí no existía una medición de rendimiento con Lighthouse real (la herramienta de DevTools usada antes la excluye). Se usó el **CLI oficial `lighthouse` 13.5** con Chrome headless, la configuración estándar de móvil (Slow 4G simulado, CPU 4× más lenta) y de escritorio, contra el build de producción servido por `server.mjs` y contra el sitio publicado.

**Antes** (portada):

| | Móvil | Escritorio |
|---|---|---|
| Rendimiento (local) | **78** | 99 |
| Rendimiento (sitio publicado) | **72** | 99 |
| FCP / LCP (móvil, simulado) | 2.9 s / 4.6 s (publicado: 3.1 s / 5.3 s) | 0.2 s / 0.8 s |
| CLS (móvil) | 0.023 | 0.004 |
| Peso transferido (móvil) | 626 KB | 9.1 MB |

**Causas encontradas** (con la película de fotogramas de Lighthouse y el desglose de LCP):

1. **El preloader.** Existía de antes: un contador falso 0 → 100 % de 1.4 s fijos que tapaba la página. El contenido real (titular, botones) solo se veía a ~1.5 s. La captura de Lighthouse lo mostró fotograma a fotograma.
2. **La imagen de portada se descubría tarde**: la crea el motor con JavaScript, así que el navegador no la pedía hasta ejecutar el script.
3. **Fuentes desde Google Fonts** con cambio tardío tras el evento `load`: dos viajes a otros dominios, y el titular (el elemento LCP) se repintaba al llegar la tipografía, lo que también movía el diseño (CLS).
4. **Las 5 imágenes fijas se pedían a la vez** al montar el motor (unos 250 KB en móvil), aunque solo se vea una.
5. (Sin tocar) Google Tag Manager aporta unos 73 KB de JavaScript sin usar; son de terceros y tienen un costo de bloqueo de 0 ms, así que se dejó.

**Cambios:**

- **Preloader honesto:** se quitó el contador. Se retira en cuanto las tipografías están listas y la imagen de portada está decodificada (con red rápida es casi instantáneo; con red lenta sigue siendo una pantalla de carga real), con un **tope de 1.5 s** para no bloquear nunca. Se agregó `<noscript>` para ocultarlo sin JavaScript (antes, sin JS, tapaba la página para siempre).
- **`<link rel="preload">` de la imagen de portada** (versión móvil o escritorio según el ancho), con `fetchpriority="high"`.
- **Fuentes autoalojadas** con la API de fuentes de Astro 6 (`fonts` en `astro.config.mjs`): se descargan en el build, se sirven desde nuestro dominio, se precargan las dos críticas (Familjen Grotesk e Inter Tight) y llevan métricas de respaldo ajustadas para que el cambio de tipografía no mueva el diseño.
- **Imágenes fijas por proximidad:** al montar solo se pide la primera; las demás se piden cuando el scroll se acerca (2.5 alturas antes y 1.5 después). Verificado: tras un salto largo, la imagen de la parada aparece cargada en menos de 700 ms.

**Trampa importante descubierta en el proceso:** la API de fuentes de Astro nombra las familias con un sufijo hash (`"Familjen Grotesk-b30e965a2cb06af0"`). El CSS que decía `font-family: "Familjen Grotesk"` **no las habría encontrado** y todo el sitio habría caído a la tipografía del sistema, sin errores visibles en el build. Se migraron las 67 declaraciones a las variables `var(--font-familjen)`, `var(--font-inter)` y `var(--font-mono)`. **Regla nueva: nunca escribir el nombre literal de una fuente en el CSS; usar siempre esas variables.**

**Después** (build de producción local; móvil = mediana de 3 corridas, que dieron 99, 99 y 99):

| | Móvil | Escritorio |
|---|---|---|
| Rendimiento | **99** | **100** |
| FCP / LCP (simulado) | 1.2 s / ~2.0 s | 0.3 s / 0.5 s |
| CLS | **0** | **0** |
| TBT | 0 a 6 ms | 0 ms |
| Peso transferido | **419 KB** | 8.6 MB* |
| Accesibilidad, buenas prácticas, SEO | 100, 100, 100 | 100, 100, 100 |

\* El peso de escritorio incluye los dos primeros clips de video, que se piden 2.5 s después de `load` por la política de la sección 9.2. Es intencional y no afectó la nota.

**Las 16 páginas del sitio** (móvil, mismo método, build local): 15 sacan **100 en rendimiento, accesibilidad, buenas prácticas y SEO**; la portada saca 99 en rendimiento y 100 en lo demás. LCP entre 1.6 s y 1.9 s y CLS 0 en todas. Páginas medidas: portada, las 7 landings, las 3 guías y el índice de guías, portafolio, software a medida en Sincelejo, programador en Sincelejo y aviso legal (la 404 también dio 100 en una medición aparte).

**Hallazgo de accesibilidad que apareció al medir las páginas internas:** cuatro páginas sacaban 95 o 96 por el criterio *link-in-text-block*. Al cambiar el acento a cian, los enlaces dentro de párrafos quedaron con un contraste de **1.02:1 frente al texto gris que los rodea** (el cian y el gris tienen casi la misma luminosidad), así que solo se distinguían por color. Antes, con ámbar, no se notaba. Se corrigió en un solo lugar para todo el sitio: `p a:not([class])` va subrayado en `global.css`. Es una consecuencia directa de la paleta nueva que el Lighthouse de la portada no habría detectado.

**Medición en el sitio publicado (2026-10-12, tras el despliegue).** Se confirmó que el despliegue estaba en vivo (sin referencias a Google Fonts y con los `preload` nuevos) y se midió `kor-bytes.com` con el mismo Lighthouse:

| Método | Rendimiento móvil de la portada | FCP / LCP |
|---|---|---|
| Lighthouse por defecto (red **simulada**), 3 corridas | **83, 83, 84** | 1.6 s / 4.4 s |
| Lighthouse con throttling **real** de Chrome, 2 corridas | **100, 100** | 1.0 a 1.15 s |
| Traza de DevTools con Slow 4G y CPU 4× | n/a | **LCP 726 ms**, CLS 0 |
| Build local, simulado (referencia) | 99 | 1.2 s / 2.0 s |
| Escritorio, simulado | **100** | 0.35 s / 0.54 s |

Páginas internas en móvil, simulado, sitio publicado: landings 81, guía 92, portafolio 90, software a medida 92, aviso legal 99. Accesibilidad, buenas prácticas y SEO: 100 en todas.

**Por qué el sitio publicado da 83 y el local 99, con el mismo código.** No es el código. El modo por defecto de Lighthouse no frena la red de verdad: *estima* los tiempos a partir de un modelo y de lo que observa. Cuando el servidor ya tiene latencia propia (aquí el documento tarda ~450 ms en llegar al primer byte desde esta máquina; en local, ~120 ms), el modelo la multiplica por cada paso de la cadena de carga, y el LCP simulado se infla hasta 4.4 s. Con throttling real, el mismo sitio saca 100 y la traza de DevTools da LCP de 726 ms. Los números "reales" son los segundos y terceros de la tabla; el 83 es lo que mostrará PageSpeed Insights por defecto.

**Qué significa en la práctica:**

- La experiencia real del visitante es buena (LCP bajo 1.2 s con red lenta y CPU 4× más lenta).
- Si lo que importa es **la nota que muestra PageSpeed Insights**, el factor que la limita ya no es el código sino el **tiempo hasta el primer byte** del servidor. Bajarlo es de infraestructura, no de la web: servir desde un CDN (por ejemplo Cloudflare, plan gratuito) delante del servidor, o un servidor más cercano al visitante. No se hizo ni se probó; es una recomendación, no un resultado.
- Google evalúa la posición con datos de **usuarios reales** (Core Web Vitals en CrUX), no con esta nota de laboratorio. Para este sitio todavía no hay datos de campo.

**No se pudo confirmar con PageSpeed Insights:** la API pública sin clave devolvió "cuota diaria excedida", así que no hay una medición hecha desde los servidores de Google.

**CLS residual:** con throttling real aparece un CLS de 0.023 (por debajo del umbral de "bueno", que es 0.1), causado por el cambio de la tipografía Familjen Grotesk en la tarjeta del titular. Con el modo simulado marca 0. No se persiguió.

**Límites, para ser fiel:**

- Son números de **laboratorio** (Lighthouse con red y CPU simuladas), no de usuarios reales. No hay datos de campo (CrUX) para este sitio.
- El "después" principal se midió sobre el build local; el sitio publicado se midió después del despliegue y está en el bloque de arriba.
- La nota de móvil de la portada sube a 99 y no a 100; no se investigó el punto que falta.

---

## 10. Problemas encontrados y cómo se resolvieron

| Problema | Causa | Arreglo |
|---|---|---|
| Codex no generaba imágenes | Codex 0.139.0 exigía una versión más nueva para `gpt-5.6-terra` | Se usó OpenRouter (4.3) |
| Imágenes con texto inventado y barras negras | Limitación de Gemini 2.5 Flash Image | Se cambió a `gpt-image-2.5-sunburst`, y el preámbulo ahora pide "no black bars" |
| Error 404 al usar `gpt-image` por `chat/completions` | Los modelos de imagen puros viven en `/api/v1/images` | Se usó ese endpoint |
| `ffmpeg` sin `libwebp` | Compilación sin ese codificador | PNG con ffmpeg y conversión con Pillow |
| `astro check` se cae | Fallo del propio runtime de Node, no del código | Se verificó con `npm run build` y pruebas en navegador. **No se resolvió**, queda como deuda |
| **Los videos habrían fallado en producción** | El CSP del servidor (`default-src 'self'`) bloquea `blob:` en `media-src`. En desarrollo no hay CSP | Se agregó `media-src 'self' blob:` en `server.mjs` y se verificó la cabecera |
| Precarga masiva en móvil | El motor precargaba los 4 clips en reposo | Política de la sección 9.2 |
| Escalón visible tras el recorrido | El resplandor cobalto del manifiesto empezaba justo en el borde superior | Se movió el centro del degradado a media sección |
| FAB de WhatsApp tapaba los CTA de las paradas en móvil | Botón flotante fijo | Se oculta en móvil mientras dura el recorrido (`html:has(.journey.is-ready:not(.is-past))`) |
| Icono de menú móvil se veía como una raya, y el menú abierto deformaba la pastilla | Estilos heredados | Botón circular y panel desplegable propio |
| Primera letra del eyebrow recortada | `overflow: hidden` de la tarjeta de la portada | `overflow: visible` solo en la primera parada |
| Tarjeta apilada translúcida dejaba ver la de abajo | Se animaba `opacity` en la tarjeta que se hunde | Se anima una capa opaca (`--dim`) en lugar de la opacidad |
| El navegador seguía ejecutando el JS viejo tras editar | Caché del servidor de desarrollo | Recarga con parámetro nuevo; en producción no ocurre |
| Título del proceso se superponía a los pasos en móvil | `position: sticky` también en una columna | `sticky` solo desde 981 px (también en FAQ) |
| Rendimiento móvil de 78 (72 en producción) | Preloader con contador falso, imagen de portada descubierta tarde, fuentes de Google con cambio tardío, 5 imágenes a la vez | Sección 9.5: móvil 99 y CLS 0 |
| Las fuentes autoalojadas no se habrían aplicado | Astro nombra las familias con un sufijo hash; el CSS usaba el nombre literal | Migradas 67 declaraciones a `var(--font-*)`; regla nueva en `DESIGN.md` |
| 4 páginas con accesibilidad 95 a 96 | Enlaces cian dentro de párrafos grises: contraste 1.02:1, solo se distinguían por color | Subrayado global de `p a:not([class])` |
| Preloader tapaba la página sin JavaScript | Se retiraba solo por script | `<noscript>` que lo oculta |
| **"Sincelejo" partido en "Sincelej / o"** | **Error mío:** al reducir el tamaño añadí `overflow-wrap: anywhere` | Se quitó, y los datos de texto usan un tamaño menor sin salto de línea. Verificado a 390, 1000 y 1700 px |

Sobre el último: se había revisado esa banda en una sola resolución. Los textos grandes se verifican a varios anchos antes de darlos por cerrados.

---

## 11. Despliegue y control de versiones

- Repositorio: `github.com/korozcolt/korbytes-web`.
- Se trabajó siempre en ramas (`feat/scroll-journey-home`, `feat/visual-sections`, `fix/facts-word-wrap`) y se mezcló a `main` solo cuando el usuario lo pidió. Cada merge fue `--no-ff`.
- **Despliegue:** `main` se publica automáticamente en Dokploy al hacer push (tarda de uno a unos pocos minutos). **Verificado el 2026-10-12:** tras el merge de las optimizaciones, la versión nueva (sin referencias a Google Fonts y con los `preload`) estuvo en `kor-bytes.com` en cerca de un minuto. Las medidas de la sección 9.5 se hicieron sobre ese despliegue.
- Los 47 MB de video y los fotogramas están versionados en git (`public/video/journey/`, `public/world/`). Queda abierta la decisión de si eso es lo correcto a largo plazo (sección 14).
- Las fuentes originales (stills, clips crudos de Kling, prompts) están en `source/journey/` y **están fuera de git** (`.gitignore`, 67 MB). Sin ellas no se puede regenerar un tramo sin repetir el gasto.

---

## Imagen Open Graph (2026-10-12)

**Qué es:** la imagen de vista previa que aparece al compartir un enlace en WhatsApp, LinkedIn, X o Slack. Hasta este día `og:image` y `twitter:image` apuntaban a `logo-oficial.png`: texto azul marino sobre fondo transparente, casi invisible sobre un fondo oscuro, y sin ninguna señal de la identidad nueva.

**Concepto:** contar la historia del sitio en una sola imagen. Tres fotogramas del recorrido unidos como una tira (**caos → flujo → sistema**), el primero desaturado y los otros a color, separados por líneas cian que se desvanecen antes del texto. Sobre ellos, los tres pasos al estilo del riel del recorrido, el logo oficial arriba y el titular de marca abajo: *"No hacemos software. Ordenamos operaciones."* en blanco y cian.

**Cómo se hizo:**

- Plantilla HTML en `scripts/og-image.html` (1200×630), con las tipografías del sitio (Familjen Grotesk, Inter Tight, JetBrains Mono), los fotogramas `public/world/stop-0/1/2.webp` y `logo-oficial-dark.png`. No introduce ningún color fuera de la marca (marino `#050d1a`, cian `#04b0e0`).
- Captura con un navegador a 1200×630 y exportación a JPEG: `public/images/og-default.jpg`, **115 KB** (WhatsApp recomienda menos de 300 KB).
- `BaseLayout.astro` apunta `og:image` y `twitter:image` a ese archivo, e incluye `og:image:width`, `og:image:height`, `og:image:type` y un texto alternativo descriptivo.

**Cómo regenerarla:**

```bash
python3 -m http.server 4500                     # desde la raíz del repo
# abrir http://localhost:4500/scripts/og-image.html con viewport 1200x630,
# esperar a que carguen las fuentes y capturar; exportar a JPEG calidad ~86
```

**Verificado:** miniatura reducida a 300 px (el titular se lee) y recorte tipo X/Twitter 2:1 (queda dentro de la zona segura: los márgenes son de 38 px arriba y 44 px abajo).

**No verificado, para ser fiel:** no pude comprobar cómo la muestran WhatsApp, LinkedIn o X en vivo, porque esas plataformas guardan la vista previa en caché y hay que pedirles que la refresquen (depurador de LinkedIn, *Sharing Debugger* de Facebook, y en WhatsApp a veces solo se actualiza compartiendo el enlace con un parámetro nuevo). Tampoco se generó una imagen distinta por página: todas comparten esta.

---

## NotebookLM (2026-10-12)

El proyecto tiene su cuaderno **"KOR Bytes S.A.S."** (id `ecfbceb1-ad80-412e-a879-e1c6ada9453f`). Se agregaron tres fuentes, todas verificadas como procesadas:

| Fuente en el cuaderno | Archivo del repo |
|---|---|
| korbytes-web — Estado actual: portada, marca y rendimiento (2026-10-12) | `docs/NOTEBOOKLM_KORBYTES_PORTADA_2026-10-12.md` (resumen con preguntas y respuestas, escrito para NotebookLM) |
| korbytes-web — Proceso completo de la portada con video (2026-10-12) | `docs/PROCESO-RECORRIDO-PORTADA.md` (este documento) |
| korbytes-web — DESIGN.md sistema de diseño vigente (2026-10-12) | `DESIGN.md` |

**Hallazgo:** el cuaderno ya tenía una ficha `korbytes-web.md` de julio de 2026 que describe un sitio anterior (Three.js, anime.js, Space Grotesk y DM Sans, tokens OKLCH, rutas `servicios/` y `casos/`, 11 verticales PASS). Contradice al sitio actual en casi todo. Primero se **renombró como `[OBSOLETO, julio 2026]`** (borrar es irreversible y no se había pedido) y, cuando el usuario lo autorizó, **se borró el 2026-10-12**. El cuaderno ya no contiene datos contradictorios sobre la web.

**Verificación:** se le preguntó al cuaderno por los colores, las tipografías, las tecnologías y el Lighthouse móvil; respondió correctamente y citó solo las fuentes nuevas, sin usar la obsoleta. Esa prueba además delató un error de `DESIGN.md` (decía "SSR con adaptador Node" cuando el sitio es estático servido por Node), que se corrigió y se volvió a subir esa fuente (se borró y re-subió la que yo había agregado).

**Mantenimiento:** las fuentes de NotebookLM no se sincronizan solas. Si cambian esos tres archivos, hay que volver a subirlos.

---

## 12. Cómo reproducir o continuar

**Regenerar un clip** (cuesta 0.35 USD; confirmar antes de gastar):

1. `monid balance`.
2. Subir el fotograma inicial y final con `sfs` y pedir sus URLs (5.3, pasos 1 y 2). Los stills están en `source/journey/stills/`.
3. Generar y descargar el clip (pasos 3 a 5) con el cuerpo de `source/journey/prompts/clipN-body.json`.
4. Recodificar a las dos versiones (7.2) y compararlas con la actual a ojo (7.3).
5. Guardar en `public/video/journey/` **con un nombre nuevo** (caché `immutable` de un año) y actualizar las rutas en `Journey.astro`.
6. Extraer de nuevo los fotogramas fijos (7.4) si cambió el primer o último fotograma.

**Cambiar el contenido de una parada:** editar `src/data/journey.ts`. Las cifras y nombres de producto vienen de `site.ts`.

**Cambiar el peso de scroll de una parada:** `holds` y `transit` en `Journey.astro`.

**Probar en local:** `npm run dev` (puerto 4321 por defecto). Para probar el servidor de producción con sus cabeceras: `npm run build && PORT=4400 node server.mjs`.

**Cambios de marca:** los tokens están en `src/styles/global.css`; el sistema completo en `DESIGN.md`.

---

## 13. Qué no quedó registrado

Para ser fiel, esto no se puede reconstruir con certeza:

- **El costo real de las 5 imágenes de `gpt-image-2.5-sunburst`**: no se leyó el campo de uso. (Las de Gemini sí: 0.0388 USD cada una.)
- **El análisis de costuras por luma** que se hizo en Aldemar no se repitió aquí; la verificación fue visual.
- **Los prompts literales del usuario** durante la sesión. Sí se conservan sus decisiones y reacciones (por ejemplo, "usa un modelo más actual", "ojo con la versión mobile", "aquí hay un error").
- **Los reintentos fallidos con Gemini Nano Banana 2.1**: solo consta que dieron 429, no qué ventana de tiempo cubrió.
- **Datos de campo (CrUX) y el rendimiento de las páginas internas.** El Lighthouse de rendimiento sí se midió el 2026-10-12 (sección 9.5), pero solo en laboratorio y solo en la portada.
- **El tiempo exacto de cada despliegue** (solo se observó uno, de ~1 minuto, el 2026-10-12).

---

## 14. Pendientes abiertos

Cerrados el 2026-10-12: rotar la clave de OpenRouter, probar el scrub en un iPhone real (ambos confirmados por el usuario), la imagen Open Graph, el Lighthouse de rendimiento, y la versión móvil 9:16 (decisión de no hacerla).

1. **Decidir si los 47 MB de video van en git** o en otro almacenamiento (CDN o bucket).
2. **Resolver `astro check`**, que se cae por un fallo del runtime de Node.
3. **Bajar el tiempo hasta el primer byte** del servidor (~450 ms medidos desde aquí): es lo que limita la nota simulada de PageSpeed (83 en móvil). Opción a evaluar: CDN delante del servidor (por ejemplo Cloudflare, plan gratuito).
5. **Refrescar la caché de la imagen Open Graph** en LinkedIn, Facebook y WhatsApp tras el despliegue.
