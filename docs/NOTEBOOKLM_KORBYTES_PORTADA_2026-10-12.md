# KOR Bytes S.A.S. — Estado actual de la web (portada con video, marca y rendimiento)
## Documentación NotebookLM — 12 de octubre de 2026

Este documento **reemplaza como fuente de verdad** a la ficha `korbytes-web.md` de julio de 2026, que describe un sitio anterior (con Three.js, anime.js, Space Grotesk y DM Sans, tokens OKLCH y rutas `servicios/` y `casos/`) y ya no es correcta. El proceso completo y detallado está en `PROCESO-RECORRIDO-PORTADA.md`; el sistema de diseño, en `DESIGN.md`.

---

## 1. Resumen ejecutivo

Entre el 10 y el 12 de octubre de 2026 se rediseñó por completo el aspecto visual de `kor-bytes.com`, conservando la base técnica:

- La portada ahora es un **recorrido en video atado al scroll** de 5 paradas: caos operativo → flujo de datos → sala de control → galería de productos PASS → contacto. Cuenta con imagen el mensaje de marca *"No hacemos software. Ordenamos operaciones."*
- Se rediseñaron todas las secciones de la portada y la cabecera, que incluye una **paleta de comandos** (`Ctrl/⌘ K`).
- Se corrigió la identidad: **el logo oficial y los colores del logo** (azul marino y cian) en todo el sitio.
- Se creó una **imagen Open Graph** nueva (la vista previa al compartir el enlace).
- Se optimizó el rendimiento: Lighthouse de la portada pasó de 78 a **99 en móvil** y llegó a 100 en escritorio.
- Todo está en la rama `main` de `github.com/korozcolt/korbytes-web` y desplegado.

## 2. Estado técnico actual

- **Stack:** Astro 6 en modo estático (`output: "static"`), servido por un servidor Node propio (`server.mjs`) con caché, compresión y Content-Security-Policy. Dependencias: GSAP (con ScrollTrigger), Phosphor Icons, sirv-cli. **No hay Three.js ni anime.js.** TypeScript solo para tipos; CSS vanilla con variables.
- **Despliegue:** Dokploy (Nixpacks, Node 22). **Cada push a `main` se publica solo** en cerca de un minuto (verificado el 12 de octubre).
- **Páginas (16):** portada, 7 landings de servicios (desarrollo de software en Colombia, landing pages, dashboards operativos, automatización de procesos, sistema de inventario y POS, desarrollo de aplicaciones móviles, integración con WhatsApp Business), 3 guías más su índice (`/guias/`), portafolio, software a medida en Sincelejo, programador en Sincelejo, aviso legal y 404.
- **Contenido de la portada** (todo sale de `src/data/site.ts`): **6 productos PASS** (KorPass, VolleyPass, DatesPass, CampusPass, ContPass, ShopStorePass), **5 proyectos destacados** (SIGMA, LuckyCore, ArchiveMaster, Sistema PQRS, ShopStorePass), **9 sitios reales de clientes** en producción (CARSUCRE, CEA Movilízate, Kuwai Lencería, Herencia Rizada, Tota Joyería, Marce y Lauren, Aldemar Alfaro, La Alerta, La Certeza), **6 servicios**, **4 pasos de proceso** (Diagnóstico, Arquitectura, Construcción, Producción y soporte) y **4 preguntas frecuentes**. La página `/portafolio` lista unas 33 entradas. (Nota: el documento de estrategia `PRODUCT.md` menciona "11 verticales PASS", una cifra anterior; hoy el código publica 6.)
- **Contacto:** gerencia@kor-bytes.com, WhatsApp +57 304 397 8157. Sede: Sincelejo, Sucre, Colombia.

## 3. Marca y diseño

- **Colores de la empresa = colores del logo oficial:** azul marino `#081c3c` y cian `#04b0e0`. El cian es el único color de acción (botones, enlaces, estados activos). Fondo de página: un marino oscurecido (`#050d1a`). Dark mode único.
- **Logo:** siempre el archivo oficial (`logo-oficial-dark.png` sobre fondo oscuro), mediante un componente único. Favicons e íconos de app: cuadrado cian con la K blanca (`favicon-oficial.png`).
- **Tipografías:** Familjen Grotesk (titulares), Inter Tight (texto), JetBrains Mono (etiquetas técnicas). **Autoalojadas** por Astro en el build.
- **Un error corregido (honestidad):** el 10 de octubre se había cambiado el acento a ámbar y se había puesto una "K" cuadrada ámbar con texto en la cabecera. Fue un error: no se había mirado el logo oficial. El 12 de octubre se corrigió; el ámbar ya no existe en la interfaz y solo vive en la luz cálida del video.

## 4. La portada: recorrido en video

- **Cómo funciona:** un video fijo a pantalla completa avanza o retrocede con el scroll; entre paradas hay un fotograma fijo con su texto. Es una variante de la técnica "scroll-world" y reutiliza el motor de scroll del proyecto Alfaro & Bolaño.
- **Cómo se produjo:** 5 imágenes con el modelo `openai/gpt-image-2.5-sunburst` (vía OpenRouter) y **4 clips de 5 segundos** con Kling 2.6 (vía Monid), cada uno entre dos imágenes vecinas. Costo del video: **1.40 USD** (0.35 por clip). Saldo restante en Monid: 3.20 USD.
- **Modelos probados y descartados:** Codex CLI (no generó nada, exigía una versión más nueva), Gemini 2.5 Flash Image (salió poco agradable e inventó texto) y Gemini Nano Banana 2.1 (límite de tasa).
- **Peso del video:** clips de ~4 MB en escritorio y ~2.1 MB en móvil (total 16 MB y 8.6 MB).
- **Móvil:** es un recorte vertical del mismo video 16:9. **Decisión del dueño: se queda así**; una versión 9:16 nativa costaría ~1.40 USD más y no se considera necesaria.

## 5. Cabecera y navegación

El menú anterior era una píldora flotante que "parecía de restaurante". Ahora es una **barra a todo el ancho** con navegación en tipografía mono, un subrayado cian que se desliza bajo la sección activa, un indicador de la parada del recorrido (por ejemplo `02 / 05 OPERACIÓN`) y un buscador con atajo `Ctrl/⌘ K` (también `/`). La paleta de comandos permite saltar a secciones, soluciones, guías y acciones de contacto; sus entradas salen de los datos del sitio. En móvil: menú numerado a ancho completo con buscador.

## 6. Rendimiento (Lighthouse oficial, 12 de octubre)

| | Antes | Después |
|---|---|---|
| Portada, móvil, build local (simulado) | 78 | **99** (3 corridas) |
| Portada, escritorio | 99 | **100** |
| FCP / LCP móvil (simulado) | 2.9 s / 4.6 s | 1.2 s / ~2.0 s |
| CLS móvil | 0.023 | 0 |
| Las otras 15 páginas | n/a | 100 en las cuatro categorías |
| Sitio publicado, móvil, simulado | 72 | 83 a 84 |
| Sitio publicado, móvil, throttling real | n/a | **100** (LCP ~1.0 s) |

**Causas del problema y arreglos:** un preloader con contador falso de 1.4 s (ahora se retira cuando hay contenido real, máximo 1.5 s), la imagen de portada descubierta tarde (ahora se precarga), fuentes de Google con cambio tardío (ahora autoalojadas) y 5 imágenes pidiéndose a la vez (ahora por cercanía al scroll). **Política del video:** no se descarga nada hasta el primer scroll; en móvil, un clip a la vez.

**Por qué el sitio publicado da 83 y el local 99:** el modo por defecto de Lighthouse *estima* los tiempos con un modelo y se infla con la latencia del servidor (~450 ms hasta el primer byte medidos desde la máquina de prueba, frente a ~120 ms en local). Con throttling real el mismo sitio saca 100. Recomendación pendiente: evaluar un CDN (por ejemplo Cloudflare, plan gratuito). Google posiciona con datos de usuarios reales, no con esta nota de laboratorio; para este sitio aún no hay datos de campo.

**Accesibilidad:** al medir las páginas internas apareció un fallo causado por el cambio de color: los enlaces cian dentro de párrafos grises tenían contraste de 1:1 con el texto que los rodea. Se subrayaron en todo el sitio. Las 16 páginas sacan 100 en accesibilidad.

## 7. Imagen Open Graph

`/images/og-default.jpg` (1200×630, 115 KB): una tira de tres fotogramas del recorrido (caos → flujo → sistema), el logo oficial y el titular "No hacemos software. Ordenamos operaciones." Es la misma para todas las páginas. Tras el despliegue hay que **refrescar la caché** en LinkedIn (Post Inspector), Facebook (Sharing Debugger) y WhatsApp (compartir el enlace con `?v=2`).

## 8. Reglas aprendidas (cada una costó un error)

1. La marca sale del logo oficial; no inventar colores ni logo.
2. Las fuentes se usan con variables (`var(--font-familjen)`…), nunca con el nombre literal: Astro les añade un sufijo y el nombre literal no coincidiría.
3. El video no debe competir con la carga de la página.
4. `/video` y `/world` tienen caché de un año: al regenerar un archivo hay que cambiarle el nombre.
5. El servidor necesita `media-src 'self' blob:` en el CSP o los videos no cargan en producción.
6. Revisar textos grandes a varios anchos (390, 768, 1000, 1440, 1700 px).
7. Los enlaces dentro de párrafos van subrayados.
8. Medir rendimiento con el CLI oficial de Lighthouse; la herramienta de DevTools MCP excluye esa categoría. Reportar siempre las dos cifras (simulada y con throttling real).
9. Confirmar antes de gastar en Monid u OpenRouter.

## 9. Pendientes abiertos

- Bajar el tiempo hasta el primer byte del servidor (~450 ms): evaluar CDN; hace falta saber dónde está alojado el servidor.
- Decidir si los 47 MB de video van en git o en un CDN/bucket.
- `astro check` funciona; antes se caía por OOM al revisar `templates/`, ya excluido en `tsconfig.json`.
- Refrescar la caché de la imagen Open Graph en las redes.
- Copia de seguridad de `source/journey/` (67 MB: imágenes originales, clips crudos de Kling y prompts), que solo existe en el disco local y no está en git; los enlaces de Kling caducan a los 30 días.

---

## 10. Preguntas y respuestas rápidas

**¿Cuáles son los colores de KOR Bytes?** Azul marino `#081c3c` y cian `#04b0e0`, tomados del logo oficial.

**¿Qué tecnología usa la web?** Astro 6 estático con servidor Node propio, GSAP, CSS vanilla; sin Three.js ni anime.js. Desplegada con Dokploy; cada push a `main` se publica solo.

**¿Cómo funciona la portada?** Un video fijo avanza o retrocede con el scroll por 5 paradas (caos → flujo → sala de control → PASS → contacto).

**¿Cuánto costó el video?** 1.40 USD (4 clips de 5 s a 0.35 USD). Las imágenes costaron centavos.

**¿Qué rendimiento tiene?** Lighthouse local: portada 99 móvil y 100 escritorio; el resto de páginas, 100. En el sitio publicado, 83 móvil con el modo simulado y 100 con throttling real; lo limita el tiempo del servidor, no el código.

**¿Por qué se descartó la versión móvil 9:16?** El dueño prefirió dejar el recorte del video 16:9 tal como está; costaría ~1.40 USD más y no se considera necesaria.

**¿Qué error de marca hubo?** Se había puesto acento ámbar y una "K" inventada; se corrigió al logo oficial y a sus colores el 12 de octubre.

**¿Cuántos productos PASS publica la web?** Seis: KorPass, VolleyPass, DatesPass, CampusPass, ContPass y ShopStorePass.

**¿Qué falta por hacer?** Ver la sección 9.
