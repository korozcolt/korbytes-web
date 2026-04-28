export const SITE = "https://kor-bytes.com";
export const WHATSAPP_NUMBER = "573043978157";

export type PageType =
  | "home"
  | "pass"
  | "services"
  | "software"
  | "integrations"
  | "web"
  | "cases"
  | "nexus"
  | "pqrs"
  | "locations"
  | "sincelejo"
  | "sucre";

export interface PageData {
  route: string;
  title: string;
  description: string;
  nav: string;
  type: PageType;
  h1: string;
  eyebrow: string;
  lead: string;
  cta: string;
  secondary: [string, string];
}

export interface CardItem {
  title: string;
  status?: string;
  sector?: string;
  tag?: string;
  href?: string;
  text: string;
  chips?: string[];
}

export interface FaqItem {
  q: string;
  a: string;
}

export const navItems: Array<[string, string]> = [
  ["Inicio", "/"],
  ["Ecosistema PASS", "/ecosistema-pass/"],
  ["Servicios", "/servicios/"],
  ["Proyectos/Casos", "/casos/"],
  ["Cobertura", "/ubicaciones/"],
  ["Contacto", "/#contacto"],
];

export const services: CardItem[] = [
  {
    title: "Software a medida",
    href: "/servicios/desarrollo-software-a-medida.html",
    tag: "Operación crítica",
    text: "Sistemas internos, backoffice, dashboards y flujos con trazabilidad para empresas que ya no pueden depender de hojas de cálculo o procesos manuales.",
    chips: ["Laravel", "Roles", "Auditoría", "Dashboards"],
  },
  {
    title: "Productos verticales PASS",
    href: "/ecosistema-pass/",
    tag: "Producto reutilizable",
    text: "Una línea de productos para deporte, reservas, farmacia, transporte, educación, comercio, certificados y gestión documental.",
    chips: ["PASS Core", "SaaS", "QR", "Pagos"],
  },
  {
    title: "Integraciones y APIs",
    href: "/servicios/integraciones-erp-crm.html",
    tag: "Conectar sistemas",
    text: "Middleware, APIs, pagos, ecommerce, CRM, ERP, sincronización de datos y automatizaciones para que los sistemas conversen sin fricción.",
    chips: ["APIs", "ERP", "CRM", "Pagos"],
  },
  {
    title: "Web, SEO y conversión",
    href: "/servicios/desarrollo-web.html",
    tag: "Presencia comercial",
    text: "Sitios rápidos, claros y medibles para empresas, productos, medios y marcas que necesitan ser encontradas y convertir oportunidades.",
    chips: ["SEO", "Core Web Vitals", "GA4", "WordPress"],
  },
  {
    title: "Automatización",
    href: "/servicios/#automatizacion",
    tag: "Flujos inteligentes",
    text: "n8n, OpenClaw, webhooks, Gemini, notificaciones y flujos operativos para reducir tareas repetitivas y conectar servicios externos.",
    chips: ["n8n", "Webhooks", "Gemini", "Dokploy"],
  },
  {
    title: "Infraestructura y despliegues",
    href: "/servicios/#infraestructura",
    tag: "Operar en producción",
    text: "VPS, Docker, Dokploy, Hostinger, Redis, bases de datos, GitHub Actions y despliegues para productos Laravel, WordPress y servicios internos.",
    chips: ["Docker", "VPS", "Dokploy", "CI/CD"],
  },
];

export const passProducts: CardItem[] = [
  {
    title: "KORPass",
    status: "Concepto paraguas",
    sector: "PASS Core",
    text: "Núcleo conceptual para reutilizar usuarios, roles, organizaciones, sedes, pagos, notificaciones, reportes, auditoría, archivos, QR e integraciones.",
    chips: ["PASS Core", "Módulos comunes", "Marca madre"],
  },
  {
    title: "VolleyPass",
    status: "Producto muy definido",
    sector: "Deporte y voleibol",
    text: "Operación digital para ligas, clubes y torneos: carnet digital con QR, jugadores, clubes, pagos, reglas por liga, documentación y competencias.",
    chips: ["QR", "Torneos", "Clubes", "Pagos"],
  },
  {
    title: "DatesPass",
    status: "Arquitectura/repositorio",
    sector: "Reservas y estética",
    text: "Reservas, staff, diagnóstico capilar, seguimiento, tienda, promociones, notificaciones y widget embebible para negocios de servicios por cita.",
    chips: ["Laravel 12", "Filament", "Livewire", "Reverb"],
  },
  {
    title: "FarmaPass",
    status: "Definido técnico/estratégico",
    sector: "Farmacia y POS",
    text: "POS + ecommerce para farmacia con inventario, código de barras, impresión térmica, FEFO, operación LAN local-first y posible sincronización cloud.",
    chips: ["Bagisto", "MySQL", "POS", "FEFO"],
  },
  {
    title: "StorePass",
    status: "Concepto derivado",
    sector: "Comercio general",
    text: "Base reusable para tiendas con productos, inventario, POS, caja, ventas, clientes, ecommerce, pagos, sucursales y reportes.",
    chips: ["Ecommerce", "POS", "Inventario", "Sucursales"],
  },
  {
    title: "MoviPass",
    status: "Propuesta definida",
    sector: "Transporte",
    text: "Gestión de rutas, viajes, vehículos, asientos, taquilla, pasajeros, cancelaciones, validación QR, reportes y pagos para boletería.",
    chips: ["React", "PostgreSQL", "Redis", "Pagos"],
  },
  {
    title: "CampusPass",
    status: "Producto en definición",
    sector: "Educación",
    text: "SaaS académico para estudiantes, acudientes, matrículas, pagos, solvencia, notas, certificados, disciplina, sedes y control de acceso a información.",
    chips: ["EdTech", "Solvencia", "Sedes", "Reportes"],
  },
  {
    title: "CertiPass",
    status: "Potencial",
    sector: "Certificados",
    text: "Emisión y validación de certificados con QR, hash, URL pública, firma visual institucional, estados, revocación y logs de emisión.",
    chips: ["QR", "Hash", "Validación", "Certificados"],
  },
  {
    title: "ArchivePass",
    status: "Potencial",
    sector: "Gestión documental",
    text: "Vertical empaquetada desde ArchiveMaster para documentos, trazabilidad, oficinas, roles operativos, consulta y búsqueda asistida.",
    chips: ["Documentos", "Roles", "Trazabilidad", "IA"],
  },
  {
    title: "EventPass",
    status: "Potencial",
    sector: "Eventos",
    text: "Control de acceso, boletería, acreditaciones, validación y operación de eventos o torneos con una base común PASS.",
    chips: ["Eventos", "Acceso", "Boletería", "QR"],
  },
  {
    title: "ClubPass",
    status: "Potencial",
    sector: "Clubes",
    text: "Membresías, pagos, deportistas, acudientes, comunicaciones y operación para clubes deportivos o comunidades organizadas.",
    chips: ["Membresías", "Pagos", "Clubes", "Comunicación"],
  },
];

export const projects: CardItem[] = [
  {
    title: "SIGMA",
    status: "Base construida",
    sector: "Gestión electoral",
    text: "Centro de comando electoral con campañas, equipos, líderes, votantes, censo, validación, puestos, zonas, call center, encuestas, mensajería, Día D, evidencias y reportes.",
    chips: ["Comando político", "Call center", "Día D", "Hablame SMS"],
  },
  {
    title: "LuckyCore",
    status: "Propuesta definida",
    sector: "Rifas y sorteos",
    text: "Plataforma web para rifas, números, carrito, checkout, pagos, auditoría, estados de compra, reportes y administración en Filament.",
    chips: ["Rifas", "Checkout", "Filament", "Auditoría"],
  },
  {
    title: "ArchiveMaster",
    status: "Repositorio trabajado",
    sector: "Gestión documental",
    text: "Administración documental con roles operativos, carga, consulta, edición, movimientos, impresión, oficinas, trazabilidad y posibles funciones con IA.",
    chips: ["Documentos", "Roles", "IA", "Trazabilidad"],
  },
  {
    title: "Sistema PQRS",
    status: "Repositorio existente",
    sector: "Peticiones y solicitudes",
    text: "Recepción, radicación, estados, dependencias, respuestas, vencimientos, reportes, adjuntos y trazabilidad para solicitudes ciudadanas o institucionales.",
    chips: ["PQRS", "SLAs", "Reportes", "Adjuntos"],
    href: "/casos/torcoroma-pqrs.html",
  },
  {
    title: "NEXUS OMS",
    status: "Caso detallado",
    sector: "Retail omnicanal",
    text: "Integración VTEX + ICG para sincronizar pedidos, inventario y estados operativos entre ecommerce, backoffice y operación comercial.",
    chips: ["VTEX", "ICG", "OMS", "Middleware"],
    href: "/casos/nexus-oms-integracion-vtex-icg.html",
  },
  {
    title: "Certificados QR",
    status: "Análisis técnico",
    sector: "Educación/certificación",
    text: "Certificados con firma visual institucional, QR de validación, hash único, URL pública, estados, logs, revocación y plantillas controladas.",
    chips: ["QR", "Hash", "Validación", "Plantillas"],
  },
  {
    title: "Portal de noticias",
    status: "Proyecto cliente",
    sector: "Medios digitales",
    text: "Sitio tipo medio digital para noticias destacadas, categorías, última hora, opinión, videos, redes sociales y una presencia más profesional.",
    chips: ["WordPress", "Noticias", "SEO", "Redes"],
  },
  {
    title: "Ecosistema VPS",
    status: "Infraestructura",
    sector: "Deploy y operación",
    text: "VPS con Dokploy para múltiples instancias: página institucional, SIGMA, automatizaciones OpenClaw y portales WordPress conectados a dominios.",
    chips: ["Dokploy", "VPS", "WordPress", "OpenClaw"],
  },
  {
    title: "NotFound Band",
    status: "Marca/contenido",
    sector: "Música",
    text: "Presencia visual, web, copys, reels, marcos, narrativa y recursos promocionales para una banda indie/rock alternativo.",
    chips: ["Branding", "Web", "Reels", "Indie"],
  },
  {
    title: "Athletic Sincelejo",
    status: "Social/deportivo",
    sector: "Voleibol juvenil",
    text: "Comunicación, patrocinio, cartas de presentación, identidad emocional y posible conexión con VolleyPass como caso local.",
    chips: ["Patrocinio", "Voleibol", "Sincelejo", "VolleyPass"],
  },
  {
    title: "korozcolt/payments",
    status: "Paquete reusable",
    sector: "Pagos Laravel",
    text: "Módulo Laravel para Mercado Pago, ePayco y Wompi, pensado para MoviPass, LuckyCore, DatesPass, FarmaPass, StorePass y otros productos.",
    chips: ["Mercado Pago", "ePayco", "Wompi", "Laravel"],
  },
  {
    title: "Shopify + API headless",
    status: "Estimación trabajada",
    sector: "Ecommerce",
    text: "Propuesta para cuatro tiendas Shopify y una API headless compartida con alternativas como Supabase o PocketBase.",
    chips: ["Shopify", "Headless", "Supabase", "PocketBase"],
  },
  {
    title: "Automatizaciones n8n/OpenClaw",
    status: "Infraestructura real",
    sector: "Automatización",
    text: "Flujos con n8n, Postgres, Dokploy, OpenClaw, Gemini, webhooks y automatización de sitios o procesos de cliente.",
    chips: ["n8n", "Gemini", "Webhooks", "Postgres"],
  },
];

export const locations: CardItem[] = [
  {
    title: "Sincelejo",
    href: "/ubicaciones/sincelejo.html",
    text: "Base local de KOR Bytes para empresas que necesitan software, productos digitales, automatización e infraestructura desde Sucre hacia Colombia.",
  },
  {
    title: "Sucre",
    href: "/ubicaciones/sucre.html",
    text: "Cobertura regional para operaciones distribuidas, comercios, instituciones, transporte, educación, deporte y servicios.",
  },
  {
    title: "Colombia y LATAM",
    href: "/ubicaciones/",
    text: "Trabajo remoto y despliegues para proyectos Laravel, WordPress, integraciones, automatizaciones y productos verticales.",
  },
];

export const pages = {
  home: {
    route: "/",
    title: "KOR Bytes S.A.S. | Software operativo, productos PASS e infraestructura digital",
    description:
      "Casa de software en Sincelejo para productos verticales PASS, software a medida, integraciones, automatización, web SEO e infraestructura digital en Colombia y LATAM.",
    nav: "/",
    type: "home",
    h1: "Software operativo, productos verticales y sistemas que sí aguantan la operación.",
    eyebrow: "KOR Bytes S.A.S. · Tech premium desde Sincelejo",
    lead:
      "Construimos software a medida, productos PASS reutilizables, integraciones, automatizaciones e infraestructura digital para empresas que necesitan control, trazabilidad y crecimiento con criterio técnico.",
    cta: "Hola KOR Bytes, quiero un diagnostico para mi proyecto de software o producto digital.",
    secondary: ["/ecosistema-pass/", "Explorar ecosistema PASS"],
  },
  pass: {
    route: "/ecosistema-pass/",
    title: "Ecosistema PASS | Productos verticales de KOR Bytes",
    description:
      "KORPass y la familia PASS: productos verticales para deporte, reservas, farmacia, comercio, transporte, educación, certificados, eventos y gestión documental.",
    nav: "/ecosistema-pass/",
    type: "pass",
    h1: "PASS es la línea de productos verticales de KOR Bytes.",
    eyebrow: "KORPass · PASS Core · Productos reutilizables",
    lead:
      "Una familia estratégica de soluciones que comparten módulos de usuarios, roles, organizaciones, pagos, notificaciones, reportes, auditoría, QR, archivos e integraciones.",
    cta: "Hola KOR Bytes, quiero hablar sobre el ecosistema PASS o una vertical para mi sector.",
    secondary: ["/casos/", "Ver proyectos relacionados"],
  },
  services: {
    route: "/servicios/",
    title: "Servicios de software, productos PASS e infraestructura | KOR Bytes",
    description:
      "Servicios de KOR Bytes: software a medida, productos verticales PASS, integraciones, desarrollo web SEO, automatización e infraestructura para empresas.",
    nav: "/servicios/",
    type: "services",
    h1: "Servicios para convertir operación compleja en software claro.",
    eyebrow: "Servicios B2B · Software · Web · Infraestructura",
    lead:
      "Acompañamos desde diagnóstico y arquitectura hasta implementación, despliegue y evolución. El foco es que cada sistema reduzca fricción y produzca datos útiles.",
    cta: "Hola KOR Bytes, quiero una consultoria sobre servicios de software para mi empresa.",
    secondary: ["/casos/", "Ver proyectos/casos"],
  },
  software: {
    route: "/servicios/desarrollo-software-a-medida.html",
    title: "Desarrollo de software a medida en Colombia | KOR Bytes",
    description:
      "Software a medida para procesos críticos: backoffice, dashboards, PQRS, inventario, pagos, roles, reportes e integraciones con arquitectura Laravel.",
    nav: "/servicios/",
    type: "software",
    h1: "Software a medida para procesos que necesitan control real.",
    eyebrow: "Servicio · Operación crítica",
    lead:
      "Diseñamos y construimos plataformas internas, backends y herramientas de negocio para reemplazar reprocesos por flujos trazables, seguros y medibles.",
    cta: "Hola KOR Bytes, quiero hablar sobre software a medida para mi empresa.",
    secondary: ["/casos/torcoroma-pqrs.html", "Ver caso PQRS"],
  },
  integrations: {
    route: "/servicios/integraciones-erp-crm.html",
    title: "Integraciones ERP, CRM, ecommerce y pagos | KOR Bytes",
    description:
      "Integraciones ERP/CRM, APIs, ecommerce, pagos, middleware, automatización y sincronización de datos para operaciones B2B en Colombia y LATAM.",
    nav: "/servicios/",
    type: "integrations",
    h1: "Integramos sistemas para que la operación deje de vivir partida.",
    eyebrow: "APIs · Middleware · Pagos · Datos",
    lead:
      "Conectamos ecommerce, ERP, CRM, POS, pasarelas de pago, notificaciones y herramientas internas con una arquitectura pensada para trazabilidad y soporte.",
    cta: "Hola KOR Bytes, quiero evaluar una integracion ERP, CRM, ecommerce o pagos.",
    secondary: ["/casos/nexus-oms-integracion-vtex-icg.html", "Ver NEXUS OMS"],
  },
  web: {
    route: "/servicios/desarrollo-web.html",
    title: "Desarrollo web, SEO técnico y conversión | KOR Bytes",
    description:
      "Desarrollo web para empresas, productos, medios y marcas: SEO técnico, performance, analítica, WordPress, landing pages y sitios comerciales.",
    nav: "/servicios/",
    type: "web",
    h1: "Webs que se sienten importantes, cargan rápido y convierten mejor.",
    eyebrow: "Web comercial · SEO · Performance",
    lead:
      "Creamos sitios institucionales, portales, landing pages y experiencias digitales con estructura SEO, medición y diseño alineado a la marca.",
    cta: "Hola KOR Bytes, quiero revisar el desarrollo web o SEO de mi proyecto.",
    secondary: ["/ubicaciones/sincelejo.html", "Ver cobertura local"],
  },
  cases: {
    route: "/casos/",
    title: "Proyectos, productos y casos de software | KOR Bytes",
    description:
      "Portafolio de KOR Bytes: productos PASS, SIGMA, LuckyCore, ArchiveMaster, PQRS, NEXUS OMS, automatizaciones, infraestructura, portales y proyectos de marca.",
    nav: "/casos/",
    type: "cases",
    h1: "Proyectos que muestran cómo pensamos producto, operación e infraestructura.",
    eyebrow: "Portafolio · Productos · Casos",
    lead:
      "Una lectura organizada del ecosistema construido y explorado: productos propios, proyectos cliente, paquetes reutilizables, automatizaciones, infraestructura y marcas digitales.",
    cta: "Hola KOR Bytes, quiero hablar sobre un proyecto parecido a los casos del portafolio.",
    secondary: ["/ecosistema-pass/", "Explorar PASS"],
  },
  nexus: {
    route: "/casos/nexus-oms-integracion-vtex-icg.html",
    title: "Caso NEXUS OMS: integración VTEX + ICG | KOR Bytes",
    description:
      "Caso NEXUS OMS: middleware e integración VTEX + ICG para sincronizar pedidos, inventario y estados operativos en retail omnicanal.",
    nav: "/casos/",
    type: "nexus",
    h1: "NEXUS OMS: integración VTEX + ICG para operación omnicanal.",
    eyebrow: "Caso · Retail · Middleware",
    lead:
      "Un caso enfocado en cerrar la brecha entre la promesa comercial del ecommerce y la realidad operativa del backoffice, inventario y cumplimiento.",
    cta: "Hola KOR Bytes, quiero evaluar una integracion tipo NEXUS OMS.",
    secondary: ["/servicios/integraciones-erp-crm.html", "Ver servicio de integraciones"],
  },
  pqrs: {
    route: "/casos/torcoroma-pqrs.html",
    title: "Caso Torcoroma PQRS: trazabilidad y SLAs | KOR Bytes",
    description:
      "Caso Torcoroma PQRS: plataforma para centralizar solicitudes, controlar estados, responsables, vencimientos, reportes y trazabilidad institucional.",
    nav: "/casos/",
    type: "pqrs",
    h1: "Torcoroma PQRS: control, responsables y trazabilidad para solicitudes críticas.",
    eyebrow: "Caso · PQRS · Servicio",
    lead:
      "Una plataforma orientada a ordenar solicitudes, evidencias, tiempos, respuestas y responsabilidades para operaciones que necesitan visibilidad y gobierno.",
    cta: "Hola KOR Bytes, quiero mejorar un proceso PQRS o de solicitudes.",
    secondary: ["/servicios/desarrollo-software-a-medida.html", "Ver software a medida"],
  },
  locations: {
    route: "/ubicaciones/",
    title: "Cobertura de KOR Bytes en Sincelejo, Sucre, Colombia y LATAM",
    description:
      "KOR Bytes desarrolla software, productos PASS, integraciones, automatizaciones, web e infraestructura desde Sincelejo para Sucre, Colombia y LATAM.",
    nav: "/ubicaciones/",
    type: "locations",
    h1: "Desde Sincelejo, construimos software para operaciones que pueden crecer en cualquier lugar.",
    eyebrow: "Cobertura · Sincelejo · Sucre · LATAM",
    lead:
      "Combinamos cercanía regional con ejecución remota: discovery, arquitectura, desarrollo, despliegue y soporte para empresas locales y proyectos distribuidos.",
    cta: "Hola KOR Bytes, quiero evaluar un proyecto para mi empresa en Sincelejo, Sucre o Colombia.",
    secondary: ["/servicios/", "Ver servicios"],
  },
  sincelejo: {
    route: "/ubicaciones/sincelejo.html",
    title: "Empresa de software en Sincelejo | KOR Bytes",
    description:
      "Empresa de software en Sincelejo para desarrollo a medida, productos PASS, integraciones, desarrollo web, automatización e infraestructura digital.",
    nav: "/ubicaciones/",
    type: "sincelejo",
    h1: "Software en Sincelejo con ambición de producto y criterio de operación.",
    eyebrow: "Sincelejo · Software · Productos digitales",
    lead:
      "KOR Bytes nace desde Sincelejo para ayudar a empresas, instituciones, comercios, clubes y proyectos digitales a convertir operación en sistemas confiables.",
    cta: "Hola KOR Bytes, quiero hablar sobre software para mi empresa en Sincelejo.",
    secondary: ["/ecosistema-pass/", "Ver línea PASS"],
  },
  sucre: {
    route: "/ubicaciones/sucre.html",
    title: "Desarrollo de software en Sucre | KOR Bytes",
    description:
      "Desarrollo de software en Sucre para empresas, instituciones, comercio, transporte, educación, deporte, gestión documental, web e infraestructura.",
    nav: "/ubicaciones/",
    type: "sucre",
    h1: "Software para Sucre: operación regional, productos verticales e infraestructura digital.",
    eyebrow: "Sucre · Colombia · Transformación operativa",
    lead:
      "Atendemos escenarios donde la operación se distribuye entre sedes, municipios, canales, usuarios, documentos, pagos o equipos que necesitan más control.",
    cta: "Hola KOR Bytes, quiero evaluar software para mi empresa en Sucre.",
    secondary: ["/casos/", "Ver proyectos"],
  },
} satisfies Record<string, PageData>;

export function whatsapp(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function initials(title: string) {
  return title
    .split(/[\s/+-]+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
}

export function faqFor(type: PageType): FaqItem[] {
  const common: FaqItem[] = [
    {
      q: "¿KOR Bytes solo desarrolla software a medida?",
      a: "No. KOR Bytes combina software a medida, productos verticales PASS, integraciones, automatización, desarrollo web e infraestructura digital.",
    },
    {
      q: "¿Trabajan solo en Sincelejo y Sucre?",
      a: "La empresa tiene base en Sincelejo, Sucre, pero puede atender proyectos en Colombia y LATAM mediante trabajo remoto, despliegues cloud y acompañamiento por fases.",
    },
    {
      q: "¿Pueden integrar pagos, WhatsApp, CRM o ecommerce?",
      a: "Sí. El enfoque técnico contempla APIs, pasarelas de pago, ecommerce, CRM, ERP, webhooks y flujos automatizados según el alcance del proyecto.",
    },
  ];

  const specific: Partial<Record<PageType, FaqItem[]>> = {
    pass: [
      {
        q: "¿Qué es el ecosistema PASS?",
        a: "PASS es la línea de productos verticales de KOR Bytes, pensada para reutilizar módulos comunes y adaptarlos a sectores como deporte, reservas, farmacia, transporte, educación, comercio y certificados.",
      },
      {
        q: "¿KORPass ya es un producto final?",
        a: "KORPass se presenta como concepto paraguas o núcleo reusable. Las verticales pueden estar en distintos niveles de madurez: concepto, producto definido, propuesta o repositorio trabajado.",
      },
    ],
    software: [
      {
        q: "¿Cuándo conviene software a medida?",
        a: "Cuando el proceso requiere reglas propias, trazabilidad, roles, integraciones o reportes que una herramienta genérica no resuelve bien.",
      },
    ],
    integrations: [
      {
        q: "¿Qué tipo de integraciones hacen?",
        a: "Integraciones con ecommerce, ERP, CRM, POS, pasarelas de pago, notificaciones, APIs internas, bases de datos y herramientas de automatización.",
      },
    ],
    web: [
      {
        q: "¿El desarrollo web incluye SEO técnico?",
        a: "Sí. La arquitectura de contenido, metadatos, performance, sitemap, estructura semántica, datos estructurados y medición forman parte del enfoque.",
      },
    ],
  };

  return [...(specific[type] || []), ...common].slice(0, 4);
}

export function structuredData(page: PageData, canonical: string) {
  const graph: Array<Record<string, unknown>> = [
    {
      "@type": "Organization",
      "@id": `${SITE}/#organization`,
      name: "KOR Bytes S.A.S.",
      url: `${SITE}/`,
      logo: `${SITE}/images/logo-oficial.png`,
      email: "gerencia@kor-bytes.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Sincelejo",
        addressRegion: "Sucre",
        addressCountry: "CO",
      },
      areaServed: ["Sincelejo", "Sucre", "Colombia", "LATAM"],
      knowsAbout: [
        "Desarrollo de software a medida",
        "Productos SaaS verticales",
        "Ecosistema PASS",
        "Integraciones Laravel",
        "Automatización con n8n",
        "Infraestructura con Dokploy",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: `${SITE}/`,
      name: "KOR Bytes S.A.S.",
      inLanguage: "es-CO",
      publisher: { "@id": `${SITE}/#organization` },
    },
    {
      "@type": "WebPage",
      "@id": `${canonical}#webpage`,
      url: canonical,
      name: page.title,
      description: page.description,
      inLanguage: "es-CO",
      isPartOf: { "@id": `${SITE}/#website` },
      about: { "@id": `${SITE}/#organization` },
    },
  ];

  if (["services", "software", "integrations", "web"].includes(page.type)) {
    graph.push({
      "@type": "Service",
      "@id": `${canonical}#service`,
      name: page.h1,
      provider: { "@id": `${SITE}/#organization` },
      areaServed: ["Colombia", "LATAM"],
      audience: { "@type": "BusinessAudience", audienceType: "Empresas y equipos operativos" },
    });
  }

  if (page.type === "pass") {
    graph.push({
      "@type": "ItemList",
      "@id": `${canonical}#pass-products`,
      name: "Ecosistema PASS",
      itemListElement: passProducts.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.title,
      })),
    });
  }

  if (page.type === "cases") {
    graph.push({
      "@type": "ItemList",
      "@id": `${canonical}#projects`,
      name: "Proyectos y casos de KOR Bytes",
      itemListElement: projects.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.title,
      })),
    });
  }

  if (["home", "services", "pass", "software", "integrations", "web", "locations"].includes(page.type)) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${canonical}#faq`,
      mainEntity: faqFor(page.type).map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}
