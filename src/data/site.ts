export const SITE = "https://kor-bytes.com";
export const WHATSAPP_NUMBER = "573043978157";
export const EMAIL = "gerencia@kor-bytes.com";
export const GITHUB_URL = "https://github.com/korozcolt";
export const INSTAGRAM_URL = "https://www.instagram.com/kor_bytes/";
export const PHONE = "+573043978157";

export const page = {
  title: "KOR Bytes S.A.S. | Software operativo, productos PASS e infraestructura digital",
  description:
    "Casa de software en Sincelejo para productos verticales PASS, software a medida, integraciones, automatización, web SEO e infraestructura digital en Colombia y LATAM.",
};

export interface NavAnchor {
  label: string;
  href: string;
}

export const navAnchors: NavAnchor[] = [
  { label: "Inicio", href: "#top" },
  { label: "Ecosistema PASS", href: "#pass" },
  { label: "Servicios", href: "#servicios" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Contacto", href: "#contacto" },
];

export interface ServiceItem {
  tag: string;
  title: string;
  text: string;
  chips: string[];
}

export const services: ServiceItem[] = [
  {
    tag: "Operación crítica",
    title: "Software a medida",
    text: "Sistemas internos, backoffice, dashboards y flujos con trazabilidad para empresas que ya no pueden depender de hojas de cálculo o procesos manuales.",
    chips: ["Laravel", "Roles", "Auditoría", "Dashboards"],
  },
  {
    tag: "Producto reutilizable",
    title: "Productos verticales PASS",
    text: "Una línea de productos SaaS para farmacia, voleibol, salud/estética, educación, contabilidad y comercio, construida sobre módulos comunes reutilizables.",
    chips: ["PASS Core", "SaaS", "Filament", "Multi-tenant"],
  },
  {
    tag: "Conectar sistemas",
    title: "Integraciones y APIs",
    text: "Middleware, APIs, pagos, e-commerce, sincronización de datos y automatizaciones para que los sistemas conversen sin fricción.",
    chips: ["APIs", "Wompi", "MercadoPago", "Shopify"],
  },
  {
    tag: "Presencia comercial",
    title: "Web, SEO y conversión",
    text: "Sitios rápidos, claros y medibles para empresas, productos y marcas que necesitan ser encontradas y convertir oportunidades.",
    chips: ["SEO", "Core Web Vitals", "Astro", "WordPress"],
  },
  {
    tag: "Flujos inteligentes",
    title: "Automatización",
    text: "n8n, webhooks, Gemini y notificaciones para reducir tareas repetitivas y conectar servicios externos entre sí.",
    chips: ["n8n", "Webhooks", "Gemini", "Dokploy"],
  },
  {
    tag: "Operar en producción",
    title: "Infraestructura y despliegues",
    text: "VPS, Docker, Dokploy, Redis, bases de datos y CI/CD para productos Laravel, WordPress y servicios internos.",
    chips: ["Docker", "VPS", "Dokploy", "CI/CD"],
  },
];

export interface PassProduct {
  name: string;
  sector: string;
  estado: string;
  desc: string;
  tags: string[];
}

export const passProducts: PassProduct[] = [
  {
    name: "KorPass",
    sector: "Farmacias",
    estado: "Activo",
    desc: "POS + ERP offline-first para farmacias sobre Bagisto: trazabilidad de lotes FEFO, conversión de presentaciones, caja por turnos y devoluciones con bloqueo de inventario.",
    tags: ["POS", "FEFO", "Offline-first", "Bagisto"],
  },
  {
    name: "VolleyPass",
    sector: "Ligas de voleibol",
    estado: "Activo",
    desc: "Carnetización deportiva digital con QR para clubes federados y ligas alternas: torneos, estadísticas, certificados médicos, pagos y suscripciones de clubes.",
    tags: ["QR", "Torneos", "Clubes", "Suscripciones"],
  },
  {
    name: "DatesPass",
    sector: "Clínicas y estética",
    estado: "Activo · maduro",
    desc: "SaaS para clínicas capilares y spas: reservas con control anti-doble-reserva, tratamientos por sesiones, e-commerce con WooCommerce y fidelización.",
    tags: ["Laravel 12", "DDD", "Reservas", "WooCommerce"],
  },
  {
    name: "CampusPass",
    sector: "Educación",
    estado: "En desarrollo activo",
    desc: "Sistema de información escolar multi-campus: matrícula, calificaciones, asistencia, disciplina y portales diferenciados para docentes y acudientes.",
    tags: ["SIS", "Multi-campus", "Filament", "Portales"],
  },
  {
    name: "ContPass",
    sector: "Contabilidad · Colombia",
    estado: "En desarrollo",
    desc: "Control contable y presupuestal por partida doble, retenciones versionadas y ciclo presupuestal público (CDP → RP → obligación → orden de pago).",
    tags: ["Contabilidad", "Presupuesto", "Colombia", "Partida doble"],
  },
  {
    name: "ShopStorePass",
    sector: "E-commerce multi-tienda",
    estado: "Muy activo",
    desc: "Panel de operación multi-tienda sobre la API de Shopify para dueños de negocio sin equipo técnico, evolucionando hacia un OMS completo.",
    tags: ["Shopify", "Multi-tienda", "OMS", "Excel"],
  },
];

export interface Project {
  name: string;
  sector: string;
  estado: string;
  desc: string;
  tags: string[];
  image?: string;
}

export const projects: Project[] = [
  {
    name: "SIGMA",
    sector: "Gestión electoral",
    estado: "Base construida",
    desc: "Centro de comando electoral con campañas, equipos, líderes, votantes, censo, puestos, call center, Día D y reportes.",
    tags: ["Comando político", "Call center", "Día D", "Reportes"],
    image: "/images/proyectos/sigma.webp",
  },
  {
    name: "LuckyCore",
    sector: "Rifas y sorteos",
    estado: "Propuesta definida",
    desc: "Plataforma web para rifas, números, carrito, checkout, pagos, auditoría, estados de compra y administración en Filament.",
    tags: ["Rifas", "Checkout", "Filament", "Auditoría"],
    image: "/images/proyectos/luckycore.webp",
  },
  {
    name: "ArchiveMaster",
    sector: "Gestión documental",
    estado: "Repositorio trabajado",
    desc: "Administración documental con roles operativos, carga, consulta, movimientos, oficinas, trazabilidad y funciones con IA.",
    tags: ["Documentos", "Roles", "IA", "Trazabilidad"],
    image: "/images/proyectos/archivemaster.webp",
  },
  {
    name: "Sistema PQRS",
    sector: "Peticiones y solicitudes",
    estado: "Repositorio existente",
    desc: "Recepción, radicación, estados, dependencias, respuestas, vencimientos, reportes y adjuntos para solicitudes ciudadanas.",
    tags: ["PQRS", "SLAs", "Reportes", "Adjuntos"],
    image: "/images/proyectos/torcoroma-pqrs.webp",
  },
  {
    name: "ShopStorePass",
    sector: "Retail · Shopify",
    estado: "En producción",
    desc: "Gestión masiva de catálogo, precios e inventario multi-tienda vía Excel, con caché local de pedidos y clientes evolucionando hacia un OMS.",
    tags: ["Shopify", "Excel", "Caché", "OMS"],
  },
];

export const practica: Array<{ n: string; text: string }> = [
  { n: "01", text: "Diagnóstico, arquitectura y desarrollo de sistemas internos." },
  { n: "02", text: "Verticales PASS para sectores con operación recurrente." },
  { n: "03", text: "Automatización, integraciones y despliegues para llevarlo a producción." },
];

export const pasos: Array<{ n: string; title: string; desc: string }> = [
  { n: "01", title: "Diagnóstico", desc: "Entendemos la operación real, los cuellos de botella y qué datos ya existen antes de escribir código." },
  { n: "02", title: "Arquitectura", desc: "Definimos módulos, roles, integraciones y el plan técnico: qué se reutiliza de PASS y qué se construye." },
  { n: "03", title: "Construcción", desc: "Desarrollo iterativo en Laravel + Filament, con entregas revisables y trazabilidad en cada avance." },
  { n: "04", title: "Producción y soporte", desc: "Despliegue en VPS/Docker, automatizaciones, monitoreo y acompañamiento después del lanzamiento." },
];

export const hechos: Array<{ k: string; v: string }> = [
  { k: String(passProducts.length), v: "Productos PASS activos en desarrollo" },
  { k: String(projects.length), v: "Proyectos y casos documentados" },
  { k: "Sincelejo", v: "Sucre · Colombia — sede y operación" },
  { k: "B2B", v: "Remoto-first para toda LATAM" },
];

export const faqs: Array<{ question: string; answer: string }> = [
  {
    question: "¿Qué hace KOR Bytes en Sincelejo?",
    answer: "KOR Bytes desarrolla software operativo para empresas: sistemas internos, productos verticales PASS, integraciones, automatización, presencia web e infraestructura digital desde Sincelejo, Sucre.",
  },
  {
    question: "¿KOR Bytes desarrolla software a medida para empresas en Sucre?",
    answer: "Sí. Diseñamos y construimos sistemas internos, dashboards, flujos con trazabilidad e integraciones para organizaciones que necesitan ordenar una operación existente.",
  },
  {
    question: "¿Trabajan con empresas fuera de Sincelejo?",
    answer: "Sí. El equipo trabaja de forma remoto-first con empresas B2B en Sucre, Colombia y Latinoamérica, manteniendo diagnóstico, entregas revisables y acompañamiento de producción.",
  },
  {
    question: "¿Cómo puedo iniciar un proyecto de software con KOR Bytes?",
    answer: "Puedes escribir por WhatsApp, correo o teléfono. El primer paso es entender la operación, los cuellos de botella y los datos disponibles para definir una ruta técnica realista.",
  },
];

export function whatsapp(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function structuredData(canonical: string) {
  const graph: Array<Record<string, unknown>> = [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": `${SITE}/#organization`,
      name: "KOR Bytes S.A.S.",
      url: `${SITE}/`,
      logo: `${SITE}/images/logo-oficial.png`,
      image: `${SITE}/images/logo-oficial.png`,
      email: EMAIL,
      telephone: PHONE,
      priceRange: "$$",
      sameAs: [GITHUB_URL, INSTAGRAM_URL],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: PHONE,
        contactType: "sales",
        availableLanguage: ["es"],
        areaServed: ["CO", "LATAM"],
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Sincelejo",
        addressRegion: "Sucre",
        addressCountry: "CO",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 9.3047,
        longitude: -75.3978,
      },
      areaServed: [
        {
          "@type": "GeoCircle",
          geoMidpoint: {
            "@type": "GeoCoordinates",
            latitude: 9.3047,
            longitude: -75.3978,
          },
          geoRadius: "60000",
        },
        "Sincelejo",
        "Sucre",
        "Colombia",
        "LATAM",
      ],
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
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
    {
      "@type": "ItemList",
      "@id": `${canonical}#pass-products`,
      name: "Ecosistema PASS",
      itemListElement: passProducts.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
      })),
    },
    {
      "@type": "ItemList",
      "@id": `${canonical}#projects`,
      name: "Proyectos de KOR Bytes",
      itemListElement: projects.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
      })),
    },
    {
      "@type": "FAQPage",
      "@id": `${canonical}#faq`,
      mainEntity: faqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ];

  return { "@context": "https://schema.org", "@graph": graph };
}
