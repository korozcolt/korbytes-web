# Cómo se construyó la portada de KOR Bytes: proceso completo

Documento de proceso. Cuenta cómo se llegó a la portada actual: el concepto, las imágenes y sus prompts, la generación de video, la codificación, el motor de scroll, la política de rendimiento, el rediseño de las demás secciones, los errores encontrados y cómo reproducirlo. Escrito el 2026-10-11, sobre el trabajo del 2026-10-10 y 2026-10-11.

Complementa a:

- `DESIGN.md`: el sistema de diseño vigente (tokens, formas por sección, prohibiciones).
- `PRODUCT.md`: usuarios, propósito y personalidad de marca.
- `PENDIENTES.md`: tareas abiertas.

La referencia de método fue el proyecto Alfaro & Bolaño (`aldemarbolano/docs/proceso-creacion-web.md`). Allí el recorrido era una oficina real. Aquí es un recorrido conceptual, con imágenes generadas, y eso cambia varias decisiones (sección 3).

Al final, la sección 13 dice con honestidad qué no quedó registrado.

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

**Resultado medido** (móvil emulado, Slow 4G, CPU 4× más lenta, build de producción): LCP 978 ms, CLS 0.00, scrub con p95 de 14 ms por frame. Peso total de clips: 16 MB en escritorio y 8.6 MB en móvil, y no se descarga ninguno hasta el primer scroll (sección 9).

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

La clave de OpenRouter se guardó en `~/.config/openrouter/key` (permisos 600) para que no pasara por el chat, pero **el usuario la pegó en la conversación al guardarla**. Quedó expuesta en ese registro. **Hay que rotarla** (sección 14). Nunca se escribió en un archivo del repo.

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

La versión móvil es un **recorte vertical del mismo video 16:9**, con un encuadre horizontal propio por parada (`focus`, interpolado entre paradas). Es el recurso de respaldo del skill. **Una cadena 9:16 nativa sigue pendiente** y es la mejora de calidad móvil más grande (costaría unos 1.40 USD más). En pantallas estrechas se ve solo la franja central, con menos resolución efectiva.

---

## 8. El motor y la web

### 8.1 Evolución de marca

Hasta el 2026-10-10 el sitio tenía un único acento naranja (`#ff5b2e`). Como el usuario eligió "evolución fuerte" y las imágenes ya traían cobalto y ámbar, el acento pasó a **ámbar `#f0a43a`**, con cobalto (`#3b5bdb`) y cian (`#38d0ee`) como apoyo. No quedan usos del naranja en `src/` ni en el manifiesto.

Hallazgo: `DESIGN.md` describía una paleta OKLCH, tipografías (Space Grotesk, DM Sans) y un sitio que **nunca se habían aplicado**; el código real usaba hex, Familjen Grotesk e Inter Tight. `DESIGN.md` se reescribió para describir lo implementado.

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
| **"Sincelejo" partido en "Sincelej / o"** | **Error mío:** al reducir el tamaño añadí `overflow-wrap: anywhere` | Se quitó, y los datos de texto usan un tamaño menor sin salto de línea. Verificado a 390, 1000 y 1700 px |

Sobre el último: se había revisado esa banda en una sola resolución. Los textos grandes se verifican a varios anchos antes de darlos por cerrados.

---

## 11. Despliegue y control de versiones

- Repositorio: `github.com/korozcolt/korbytes-web`.
- Se trabajó siempre en ramas (`feat/scroll-journey-home`, `feat/visual-sections`, `fix/facts-word-wrap`) y se mezcló a `main` solo cuando el usuario lo pidió. Cada merge fue `--no-ff`.
- **Despliegue:** `main` se publica automáticamente en Dokploy según la configuración heredada del proyecto de Aldemar, pero **esto no se verificó desde aquí** (no hay acceso a Dokploy).
- Los 47 MB de video y los fotogramas están versionados en git (`public/video/journey/`, `public/world/`). Queda abierta la decisión de si eso es lo correcto a largo plazo (sección 14).
- Las fuentes originales (stills, clips crudos de Kling, prompts) están en `source/journey/` y **están fuera de git** (`.gitignore`, 67 MB). Sin ellas no se puede regenerar un tramo sin repetir el gasto.

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
- **Una auditoría Lighthouse completa** de la página final (accesibilidad, buenas prácticas, SEO). Solo hay traza de rendimiento y revisión visual.
- **Si el despliegue automático ocurrió** tras cada merge.

---

## 14. Pendientes abiertos

1. **Rotar la clave de OpenRouter**, que quedó escrita en la conversación.
2. **Probar el scrub en un iPhone real** (iOS Safari), que es lo más frágil.
3. **Cadena 9:16 nativa para móvil** (unos 1.40 USD; quedan 3.20 en Monid). Hoy es un recorte del 16:9.
4. **Imagen Open Graph** nueva con la marca actual (hoy usa el logo).
5. **Decidir si los 47 MB de video van en git** o en otro almacenamiento (CDN o bucket).
6. **Resolver `astro check`**, que se cae por un fallo del runtime.
7. **Ejecutar Lighthouse completo** sobre la página final y registrar los resultados.
8. **Verificar el despliegue** en `kor-bytes.com`: que el video avance con el scroll (prueba real del CSP).
