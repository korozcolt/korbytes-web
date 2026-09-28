# Kor Bytes S.A.S. — Actualización de Sesión
## Documentación NotebookLM — 28 de Septiembre 2026 (Sesión Tarde)

---

## Resumen Ejecutivo de la Sesión

Esta sesión cubrió tres grandes áreas:
1. **Investigación y estrategia SECOP / SECOP II** — cómo posicionar a Kor Bytes S.A.S. como proveedor del Estado colombiano.
2. **Gestión del proyecto tupatupacomunicaciones.com** — integración Git + Hostinger con auto-deploy.
3. **Estrategia de GitHub Projects** para la organización `@korbytes`.

---

## 1. Investigación SECOP y SECOP II

### ¿Qué es el SECOP?
- **SECOP I:** Plataforma informativa (casi en extinción). Solo publicación de documentos, sin interacción digital real.
- **SECOP II:** Plataforma transaccional completa y obligatoria desde 2019. Todo el ciclo de contratación pública ocurre aquí: convocatoria, oferta, adjudicación, firma y ejecución del contrato.
- **Administrado por:** Agencia Nacional de Contratación Pública — Colombia Compra Eficiente (CCE).
- **Portal proveedor:** https://community.secop.gov.co (gratuito)

### Ruta para Kor Bytes S.A.S.
```
Registro Mercantil (Cámara de Comercio Sincelejo)
    → Inscripción RUP (Registro Único de Proponentes)
        → Habilitación en SECOP II
            → Participación en contratos públicos
```

### Modalidades de Contratación

| Modalidad | Cuantía aprox. | ¿Requiere RUP? |
|---|---|---|
| Mínima Cuantía | Hasta ~$28M COP | No |
| Selección Abreviada Menor Cuantía | $28M–$500M COP | Sí |
| Acuerdo Marco de Precios (TVEC) | Ilimitada | Sí |
| Licitación Pública | +$500M COP | Sí |

### Códigos UNSPSC Estratégicos para Kor Bytes

| Código | Descripción |
|---|---|
| 81111500 | Servicios de software |
| 81111600 | Desarrollo de software a medida / programación |
| 81111700 | Análisis y diseño de sistemas |
| 81111800 | Mantenimiento y soporte de sistemas informáticos |
| 43210000 | Equipos de computación y accesorios |
| 43211500 | Computadores personales |
| 43222600 | Equipos de red e infraestructura |
| 81112200 | Instalación de software y hardware |

### API de Datos Abiertos SECOP II
Disponible en `datos.gov.co` con tecnología Socrata (gratuita, sin autenticación):

```
SECOP II - Procesos: https://www.datos.gov.co/resource/p6dx-8zbt.json
SECOP II - Contratos: https://www.datos.gov.co/resource/jbjy-vk9h.json
```

Permite consultas programáticas con SoQL para filtrar por departamento, palabras clave, estado del proceso, cuantía, etc. Datos actualizados diariamente.

### Contexto de Mercado
- Sistema Dinámico de Adquisición de Software (2024): proyección >$1.7 billones COP.
- Servicios de Conectividad (2024): nuevo Acuerdo Marco ~$276 mil millones COP.
- Sucre, Córdoba y Bolívar: alta contratación pública con baja oferta de proveedores TI locales formales → ventana competitiva para Kor Bytes.

---

## 2. Estrategia de Experiencia para Empresa Nueva

### El punto clave
El RUP **no exige contratos con el Estado**. Acepta experiencia privada certificada.

### Cómo certificar experiencia privada
Carta firmada por el representante legal del cliente con:
- Objeto del contrato
- Código UNSPSC
- Valor
- Fechas de inicio y fin
- Estado (ejecutado / en ejecución)

### Proyectos de Kor Bytes que cuentan como experiencia

| Proyecto | Código UNSPSC |
|---|---|
| La Alerta (laalerta.com) | 81111600 |
| Torcoroma Web | 81111600 |
| Extranoticias | 81111600 |
| Milejarava | 81111600 |
| Sistema PQRSD | 81111600 |
| Archive Master | 81111700 |
| VolleyPass | 81111600 |

Con 3–5 certificaciones de clientes privados se puede inscribir el RUP con experiencia válida.

### Ruta de escalada
- **Fase 1 (sin RUP):** Mínima cuantía → hasta $28M COP, inmediato.
- **Fase 2 (RUP con experiencia privada):** Hasta $500M COP, en 1–2 meses.
- **Fase 3 (con historial estatal):** Licitaciones y TVEC sin límite, en 6–12 meses.

### Estrategias adicionales
- Consorcios con empresas establecidas para proyectos grandes.
- Beneficios MIPYME y empresa local en procesos territoriales.
- Registrarse en el directorio de la Cámara de Comercio de Sincelejo.
- Crear portafolio institucional PDF con casos de éxito.

---

## 3. Sistema de Monitor Automatizado SECOP II (Diseño)

### Arquitectura propuesta
```
n8n (cron diario)
    → API datos.gov.co (SECOP II)
    → Filtro por palabras clave + departamentos
    → Motor de matching con perfil Kor Bytes
    → Notificación WhatsApp / Telegram / Email
    → Dashboard Filament (pipeline de propuestas)
```

### Stack tecnológico
- Automatización: n8n
- BD seguimiento: PostgreSQL
- Notificaciones: WhatsApp Business API / Telegram Bot
- Dashboard: Filament (Laravel)

---

## 4. tupatupacomunicaciones.com — Integración Git + Hostinger

### Descripción del proyecto
- Sitio de noticias de rock en WordPress
- Hosting: Hostinger Single Web Hosting
- Tema: Fameup 1.0.0.53
- PHP: 8.1
- Administrado por Kor Bytes S.A.S. como cliente

### Lo que se implementó esta sesión

**Repositorio GitHub:**
- Creado: `github.com/korbytes/tupatupa-comunicaciones` (Privado)
- Rama por defecto: `main`
- Contenido: `themes/` + `plugins/` + `.gitignore` WordPress

**Integración Hostinger GIT:**
- Conectado a: `@korbytes/tupatupa-comunicaciones`
- Rama: `main`
- Directorio destino: `public_html/wp-content`
- **Auto-deployment activo** → cada push a `main` se despliega en ~44 segundos

**Footer Kor Bytes agregado:**
- Archivo modificado: `themes/fameup/footer.php`
- Barra discreta en la parte inferior del sitio
- Texto: "Desarrollado por Kor Bytes S.A.S. • 2026 © Todos los derechos reservados."
- Link a kor-bytes.com
- Deployed y verificado en producción ✅

### Flujo de trabajo futuro
```bash
# Editar localmente en:
# /Volumes/NAS(MAC)/Data/Projects/owner/tupatupa-comunicaciones/

git add .
git commit -m "descripción del cambio"
git push origin main
# → Auto-deploy en Hostinger en ~44 segundos
```

### Nota sobre SSH en Hostinger Single
El plan Single de Hostinger **no incluye SSH**. Alternativas disponibles:
- FTP/SFTP para transferencia de archivos
- GIT integration (configurada ✅)
- File Manager en hPanel
- Cron Jobs para tareas programadas
- Para SSH: upgrade a Business plan o VPS

---

## 5. GitHub Projects — Estrategia para @korbytes

### Principio
No todos los repos necesitan un GitHub Project. Solo los que tienen desarrollo activo y planificado.

### Projects recomendados (3 máximo al inicio)

| Project | Repos incluidos | Propósito |
|---|---|---|
| 🚀 PASS Ecosystem Roadmap | Todos los repos pass-* | Roadmap de módulos y features |
| 🛠️ KorProducts | PQRSD, Archive Master, ContPass | Backlog de productos empresariales |
| 🌐 Presencia Digital | korbytes-web, docs | SEO, web, documentación |

### Lo que NO necesita Project
- Proyectos de clientes privados (La Alerta, Torcoroma, etc.) → tracking en Notion/WhatsApp
- Repos legacy o sin desarrollo activo
- Librerías/utilidades estáticas

---

## 6. Recursos y Referencias Clave

### SECOP y Contratación Pública
| Recurso | URL |
|---|---|
| SECOP II (Portal Proveedor) | https://community.secop.gov.co |
| Colombia Compra Eficiente | https://www.colombiacompra.gov.co |
| Datos Abiertos SECOP II | https://www.datos.gov.co |
| Clasificador UNSPSC | https://www.colombiacompra.gov.co/clasificador |
| Tienda Virtual Estado (TVEC) | https://www.colombiacompra.gov.co/tvec |
| Cámara de Comercio Sincelejo | https://www.ccsincelejo.org |

### Proyectos GitHub
| Repo | URL |
|---|---|
| tupatupa-comunicaciones | https://github.com/korbytes/tupatupa-comunicaciones |
| Organización korbytes | https://github.com/korbytes |
| Web oficial | https://kor-bytes.com |

---

## 7. Checklist de Próximos Pasos

### Inmediato (esta semana)
- [ ] Registrar Kor Bytes en SECOP II (community.secop.gov.co) — gratuito, 30 min
- [ ] Contactar clientes actuales y solicitar certificaciones de experiencia
- [ ] Crear portafolio institucional PDF con casos de éxito

### Mes 1
- [ ] Iniciar trámite RUP en Cámara de Comercio de Sincelejo
- [ ] Postularse a primeros procesos de Mínima Cuantía

### Mes 1–2 (desarrollo)
- [ ] Construir Monitor SECOP II con n8n + API datos.gov.co
- [ ] Dashboard de oportunidades en Filament/Laravel
- [ ] Notificaciones automáticas al WhatsApp de gerencia
- [ ] Crear los 3 GitHub Projects en @korbytes

### Mes 2–3
- [ ] Ejecutar primer contrato estatal
- [ ] Documentar como experiencia formal para RUP

---

*Documentación generada el 28 de septiembre de 2026.*
*Sesión: Tarde (13:44 – 18:26 COT)*
*Conversación: korbytes-web — Antigravity AI*
