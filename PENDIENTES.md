# KOR Bytes - Tareas Pendientes

## Prioridad Alta

### NIT Empresarial
Pendiente — la empresa no está constituida legalmente aún. Cuando esté listo, agregar en `Footer.astro`:
```
© 2026 KOR Bytes S.A.S. Todos los derechos reservados. NIT: XXX.XXX.XXX-X
```

### Imágenes de Proyectos
Reemplazar placeholders con screenshots reales de cada proyecto.

| Proyecto | Archivo sugerido | Estado |
|----------|------------------|--------|
| ArchiveMaster | `public/images/proyectos/archivemaster.webp` | Pendiente |
| SIGMA | `public/images/proyectos/sigma.webp` | Pendiente |
| VolleyPass | `public/images/proyectos/volleypass.webp` | Pendiente |
| Torcoroma PQRS | `public/images/proyectos/torcoroma.webp` | Pendiente |
| NEXUS OMS | `public/images/proyectos/nexus.webp` | Pendiente |
| DeadTree Studio | `public/images/proyectos/deadtree.webp` | Pendiente |

**Recomendaciones:**
- Formato: WebP
- Dimensiones: 800×450px (16:9)
- Máx 100KB por imagen

### Imagen Sección "Nosotros"
Actualmente usa URL externa de Google (`images/nosotros.webp` pendiente).

- **Dimensiones:** 600×600px (cuadrada)
- **Opción:** Foto del fundador o espacio de trabajo

---

## Prioridad Media

### Redes Sociales
Cuando estén creadas, agregar enlaces en `Footer.astro`.

| Red Social | URL | Estado |
|------------|-----|--------|
| LinkedIn | — | Pendiente |
| GitHub | — | Pendiente |
| Twitter/X | — | Pendiente |
| Instagram | — | Pendiente |

---

## Prioridad Baja (Mejoras Futuras)

- [ ] **Formulario de contacto** — Actualmente solo hay mailto; podría agregarse con Formspree o similar
- [ ] **Blog/Artículos** — Sección para compartir conocimiento técnico
- [ ] **Testimonios** — Citas de clientes
- [ ] **Casos de estudio detallados** — Páginas individuales por proyecto con más información
- [ ] **Modo claro/oscuro toggle** — El soporte CSS existe, falta el switch visible
- [ ] **Internacionalización** — Versión en inglés

---

## Completado ✓

- ✅ **Badge.astro** — reparado (template literal `${kind}` en vez de `{kind}`)
- ✅ **Surface classes** — `.raised-surface`, `.warm-surface`, `.dbl-shell`/`.dbl-core` aplicadas en secciones
- ✅ **Motion Design** — GSAP + ScrollTrigger: hero stagger, servicios/PASS fade-up, sticky-stack de proyectos, CTA scale-in
- ✅ **Favicon** — generado desde `logo-oficial.png` (`.ico`, 16/32/192/512 PNG, apple-touch-icon, `site.webmanifest`)
- ✅ **Estructura del proyecto** — migrado de HTML/Tailwind CDN a Astro v6 + Tailwind CLI + Vite
