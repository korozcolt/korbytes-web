# Bitácora de Transformación de Infraestructura Digital, GitHub y SEO
## Kor Bytes S.A.S. — Septiembre 2026

---

### Resumen Ejecutivo
Durante esta jornada se ejecutó una reestructuración integral de la presencia digital, seguridad de datos, arquitectura de repositorios en GitHub y optimización técnica de SEO en Google Search Console para **Kor Bytes S.A.S.** y su fundador **Kristian Orozco (@korozcolt)**.

---

### 1. Auditoría, Seguridad y Limpieza de Repositorios en GitHub

#### A. Respaldo y Protección de Datos Sensibles
* **Extracción segura sin clonar repos completos:** Se descargaron y respaldaron más de 130 MB de bases de datos históricas y censos electorales de Sucre (incluyendo CSVs y JSONs decodificados de los proyectos `sigma`, `kraken` y `kraken_v2`).
* **Ubicación del respaldo físico:** `/Volumes/NAS(MAC)/Archivo-MacMini/bk-repo/`.
* **Privatización de seguridad crítica:** Se pasó de inmediato a **PRIVADO** el repositorio `sigma-project`, el cual contenía el censo electoral decodificado de 17.8 MB (`database/external-data/censo_decoded_202310210734.csv`), cerrando cualquier brecha de exposición pública.

#### B. Depuración de Repositorios Muertos y Abandonados
Se eliminaron de forma permanente **16 repositorios obsoletos** que generaban ruido y dispersión en la cuenta:
* **Pruebas técnicas antiguas:** `tecnical-test`, `technical-test-ariguani`, `draw-something-front`, `draw-something-api`.
* **Sistemas electorales y analíticos deprecados:** `sigma`, `sigmabk`, `sigma-front`, `votecontrol-api`, `votecontrol-backend`, `kraken`, `kraken_v2`.
* **VolleyPass legado y disperso:** `volleypass`, `volleypass-app`, `volley-league-app`, `projects-volleypass`.
* **Proyectos no funcionales:** `documentaly-backend`, `event_management`, `tech-global`, `boiler-plate`, `name-browser`.

---

### 2. Creación y Estructuración de la Organización Corporativa en GitHub

#### A. Creación de Kor Bytes S.A.S. (`@korbytes`)
* Se registró y activó la organización oficial: **[github.com/korbytes](https://github.com/korbytes)**.
* **Identidad de marca:** Logo oficial (WebP y PNG optimizado), enlaces institucionales al portal web (`https://kor-bytes.com/`), WhatsApp de gerencia (+57 304 3978157), Instagram oficial (`@kor_bytes`), ubicación en Colombia y perfil comercial en Google Maps.
* **README de Organización (`korbytes/.github`):** Se creó el repositorio especial `.github` con una portada institucional (`profile/README.md`) que presenta la propuesta de valor (*"Software operativo que sí aguanta la operación"*), verticales de soluciones, stack tecnológico y accesos directos de contacto.

#### B. Transferencia Masiva y Centralización (33 Repositorios)
Se transfirieron exitosamente y sin interrupción de servicio **33 repositorios** a la organización `@korbytes`, organizados en tres verticales estratégicas:

1. **Ecosistema PASS (SaaS y Productos Propios - 10 repos):**
   - `korpass`, `campuspass`, `contpass`, `datespass`, `datepass-app`, `movipass`, `parkingpass`, `ShopStorePass`, `socialpass`, `volleypass-new`.
2. **Plataformas Empresariales y Herramientas B2B (10 repos):**
   - `sistema-pqrsd`, `archive-master-app`, `archive-master-backend`, `LuckyCore`, `file-uploads`, `digital-signage`, `coredesk`, `kronnos-studio`, `proyecto-anubis`, `sigma-project`.
3. **Clientes Comerciales y Desarrollos Web (13 repos):**
   - `torcoromaweb`, `herencia-rizada`, `herenciarizada-app`, `laalerta`, `lacerteza`, `asv-soluciones`, `ceamovilizate`, `litrografika-api`, `aldemar-web`, `aldemarbolano`, `environment-aldemar`, `extranoticias`, `milejarava`.
4. **Documentación:** `korsolutions-docs`.

#### C. Redefinición del Perfil Personal (`@korozcolt`)
El perfil personal de Kristian Orozco quedó enfocado exclusivamente en su rol de fundador, arquitecto de software y desarrollador open-source:
* Portafolio personal y sitio web: `korbytes-web`, `korozcolt`, `korozcolt.github.io`.
* Librerías y utilidades open source: `payments` (gateway unificado Laravel para Wompi, MercadoPago y ePayco), `colombian-cedula-reader` (lector PDF417 de cédulas), `volleyball-scoreboard`, `stream-server`, `kronnoscms`, `krodocs`.
* Forks de la comunidad: `countries-states-cities-database`, `register`, `autocomplete`.

---

### 3. Actualización de la Web Oficial (`korbytes-web`) y Separación de Identidades

* **Ajuste de enlaces de portafolio:** Se eliminaron 14 enlaces rotos en `src/data/portfolio.ts` que apuntaban a repositorios que ahora son privados, y se actualizó el enlace de *La Alerta* a su dominio de producción (`https://laalerta.com`).
* **Separación de roles GitHub en el código:**
  - `GITHUB_URL = "https://github.com/korbytes"`: Asignado a la empresa en Hero, Footer (`@korbytes`), llamada a la acción y Schema SEO estructurado (`Organization`).
  - `GITHUB_FOUNDER_URL = "https://github.com/korozcolt"`: Asignado a la sección *"Quién construye esto"* de Kristian Orozco y al Schema SEO de persona (`Person`).
* **Assets:** Incorporación del logo oficial en `public/korbytes-logo.png`.

---

### 4. Diagnóstico y Optimización de SEO en Google Search Console

#### A. Diagnóstico de Rendimiento
* Métricas iniciales (registradas desde el 15 de septiembre de 2026):
  - **4 clics** y **68 impresiones**.
  - **CTR: 5,9%** (excelente tracción para tráfico orgánico B2B).
  - **Posición media: 3,2** (compitiendo en el top 3 de primera página para búsquedas locales de software en Sincelejo y Sucre).
* **Backlinks:** 1.165 enlaces externos rastreados, generados por los créditos de desarrollo en los pies de página de medios y clientes (`lacerteza.co`, `soykuwai.com`, `laalerta.com`, `herenciarizada.com`, etc.).

#### B. Corrección de Errores de Indexación
1. **Solución al Error 404 de `/sitemap.xml`:**
   - La versión anterior de la web usaba `/sitemap.xml`. Astro compila el nuevo sitemap en `/sitemap-index.xml`.
   - Se implementó una regla de redirección 301 permanente en `server.mjs` y en `.htaccess` para que cualquier petición a `/sitemap.xml` redirija a `/sitemap-index.xml`.
2. **Solución al "Error de redirección":**
   - Googlebot reportaba error al intentar rastrear URLs viejas con caracteres especiales o tildes (ej. `/casos/nexus-oms-integraci%C3%B3n-vtex-icg.html`).
   - Se integró `decodeURIComponent()` en `server.mjs` y reglas comodín (wildcards) para que cualquier subruta de `/servicios/*`, `/casos/*`, `/ubicaciones/*` y `/ecosistema-pass/*` se redirija suavemente con 301 a su sección en la página principal.
3. **Página 404 Personalizada (`src/pages/404.astro`):**
   - Se diseñó y compiló una página de error 404 oficial con la identidad oscura de KOR Bytes, que guía al usuario hacia la portada o al canal de WhatsApp, eliminando las respuestas en texto plano del servidor.

---

### 5. Estado Actual del Stack y Rutas de Despliegue
* **Framework:** Astro 6 (static output, `inlineStylesheets: "always"`, `@astrojs/sitemap`).
* **Servidor Node:** `server.mjs` con compresión Brotli/Gzip, cabeceras de seguridad CSP, Strict-Transport-Security y ruteador 301.
* **Organización GitHub:** `https://github.com/korbytes` (34 repositorios centralizados).
* **Perfil Fundador:** `https://github.com/korozcolt`.
* **Portal Oficial:** `https://kor-bytes.com/`.
