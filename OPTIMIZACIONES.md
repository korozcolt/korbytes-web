# Optimizaciones de Rendimiento Web

Este documento describe las optimizaciones implementadas para mejorar el rendimiento del sitio web según el reporte de Lighthouse.

## Resumen de Mejoras

### 1. Optimización de Imágenes
- **Imagen de Google User Content**: Descargada y convertida a WebP optimizado
  - Antes: 365 KB (externa)
  - Después: 30 KB (local) - **Reducción del 92%**
  
- **Logo (logo.webp)**: Recomprimido con mejor calidad/tamaño
  - Antes: 29 KB
  - Después: 20 KB - **Reducción del 31%**

- **Total ahorrado en imágenes**: ~344 KB

### 2. Bloqueo de Renderización Reducido
- **TailwindCSS CDN**: Movido a carga diferida con `defer`
- **Google Fonts**: Implementada carga asíncrona con `media="print" onload="this.media='all'"`
- **Material Icons**: Carga asíncrona implementada
- **Devicon CSS**: Carga asíncrona implementada

Esto elimina ~7,320 ms de bloqueo de renderización inicial.

### 3. Dimensiones Explícitas en Imágenes
Agregadas dimensiones `width` y `height` a todas las imágenes para prevenir CLS (Cumulative Layout Shift):
- Logo del header: 302x84
- Logo del footer: 302x84
- Imagen de equipo: 800x800

### 4. Lazy Loading
Implementado `loading="lazy"` en imágenes below-the-fold:
- Imagen del equipo (sección "Nosotros")
- Logo del footer

### 5. Configuración de Caché
Creados archivos de configuración para diferentes servidores:

#### Apache (.htaccess)
- Imágenes: 1 año de caché
- CSS/JS: 1 mes de caché
- HTML: sin caché
- Compresión gzip habilitada

#### Netlify (_headers)
- Headers de caché optimizados para CDN

#### Nginx (nginx-cache.conf)
- Configuración de caché y compresión gzip

## Impacto Esperado en Métricas

- **LCP (Largest Contentful Paint)**: Mejora significativa por imagen optimizada y recursos no bloqueantes
- **FCP (First Contentful Paint)**: Mejora por eliminación de bloqueo de renderización
- **CLS (Cumulative Layout Shift)**: Mejora por dimensiones explícitas en imágenes
- **TBT (Total Blocking Time)**: Reducido por carga asíncrona de recursos

## Recomendaciones Adicionales

### Para Producción
1. **CDN**: Servir assets estáticos desde un CDN
2. **HTTP/2 o HTTP/3**: Habilitar en el servidor para mejor multiplexing
3. **Preload críticos**: Considerar preload para recursos críticos above-the-fold
4. **Service Worker**: Implementar para caché offline y mejor rendimiento

### Optimizaciones Futuras
1. **Minificar CSS/JS custom**: Si se agrega CSS o JS propio
2. **Critical CSS inline**: Extraer CSS crítico e insertar inline en el `<head>`
3. **Tailwind JIT local**: Cambiar de CDN a build local con JIT mode
4. **Fuentes locales**: Hospedar Google Fonts localmente para evitar requests externos

## Cómo Aplicar las Configuraciones

### Apache
El archivo `.htaccess` funciona automáticamente si mod_headers y mod_deflate están habilitados.

### Nginx
Incluir en tu bloque `server`:
```nginx
include /path/to/nginx-cache.conf;
```

### Netlify
El archivo `_headers` es detectado automáticamente por Netlify.

## Verificación
Después de desplegar, verifica las mejoras con:
- [PageSpeed Insights](https://pagespeed.web.dev/)
- Chrome DevTools Lighthouse
- [WebPageTest](https://www.webpagetest.org/)
