# KOR Bytes - Tareas Pendientes

## Prioridad Alta

### Imágenes de Proyectos
Reemplazar los placeholders con screenshots reales de cada proyecto.

| Proyecto | Archivo sugerido | Estado |
|----------|------------------|--------|
| ArchiveMaster | `images/proyectos/archivemaster.webp` | Pendiente |
| SIGMA | `images/proyectos/sigma.webp` | Pendiente |
| VolleyPass | `images/proyectos/volleypass.webp` | Pendiente |
| Torcoroma PQRS | `images/proyectos/torcoroma.webp` | Pendiente |
| NEXUS OMS | `images/proyectos/nexus.webp` | Pendiente |
| DeadTree Studio | `images/proyectos/deadtree.webp` | Pendiente |

**Recomendaciones:**
- Formato: WebP (mejor compresión)
- Dimensiones: 800x450px (aspect ratio 16:9)
- Tamaño máximo: 100KB por imagen

### Imagen Sección "Nosotros"
Actualmente usa una imagen externa de Google que puede desaparecer.

- **Archivo actual:** URL externa de Google
- **Archivo sugerido:** `images/nosotros.webp` o `images/equipo.webp`
- **Dimensiones:** 600x600px (cuadrada)
- **Opciones:** Foto del fundador, espacio de trabajo, o imagen abstracta de tecnología

---

## Prioridad Media

### Redes Sociales
Cuando estén creadas, agregar los enlaces en el footer.

| Red Social | URL | Estado |
|------------|-----|--------|
| LinkedIn | - | Pendiente |
| GitHub | - | Pendiente |
| Twitter/X | - | Pendiente |
| Instagram | - | Pendiente |

### NIT Empresarial
Cuando esté confirmado, agregar en el footer:
```
© 2026 KOR Bytes S.A.S. Todos los derechos reservados. NIT: XXX.XXX.XXX-X
```

### Favicon Dedicado
Actualmente usa `logo.webp`. Considerar crear:
- `favicon.ico` (16x16, 32x32)
- `favicon-192.png` (para Android)
- `favicon-512.png` (para PWA)

---

## Prioridad Baja (Mejoras Futuras)

### Funcionalidades Opcionales

- [ ] **Formulario de contacto** - Actualmente solo hay mailto, podría agregarse un formulario con Formspree o similar
- [ ] **Blog/Artículos** - Sección para compartir conocimiento técnico
- [ ] **Testimonios** - Citas de clientes satisfechos
- [ ] **Casos de estudio detallados** - Páginas individuales por proyecto con más información
- [ ] **Animaciones al scroll** - Usar AOS o similar para animar elementos al hacer scroll
- [ ] **Modo claro/oscuro toggle** - El soporte existe, falta el switch visible
- [ ] **Internacionalización** - Versión en inglés

### SEO Avanzado

- [ ] Crear `sitemap.xml`
- [ ] Crear `robots.txt`
- [ ] Agregar datos estructurados (JSON-LD) para empresa local
- [ ] Registrar en Google Search Console
- [ ] Configurar Google Analytics o alternativa (Plausible, Umami)

### Performance

- [ ] Minificar HTML/CSS cuando se pase a producción
- [ ] Considerar migrar Tailwind de CDN a build local (reduce tamaño)
- [ ] Implementar lazy loading en imágenes
- [ ] Agregar service worker para PWA básica

---

## Estructura de Carpetas Sugerida

```
korbytes-web/
├── index.html
├── PENDIENTES.md
├── images/
│   ├── logo.webp (existente)
│   ├── nosotros.webp (pendiente)
│   ├── favicon.ico (pendiente)
│   └── proyectos/
│       ├── archivemaster.webp
│       ├── sigma.webp
│       ├── volleypass.webp
│       ├── torcoroma.webp
│       ├── nexus.webp
│       └── deadtree.webp
├── css/ (vacío - usando Tailwind CDN)
└── js/ (vacío - JS inline)
```

---

## Notas de Desarrollo

- **Framework CSS:** Tailwind CSS v3 (CDN)
- **Iconos:** Material Icons Round + Devicon
- **Fuentes:** Inter (cuerpo) + Space Grotesk (títulos)
- **Colores principales:**
  - Primary (Magenta): `#A0006D`
  - KOR Blue: `#2E3696`
  - Background Dark: `#0B0B0B`

---

*Última actualización: Enero 2026*
