export interface GuideSection {
  heading: string;
  paragraphs: string[];
  list?: string[];
}

export interface Guide {
  slug: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  published: string;
  updated?: string;
  waMessage: string;
  need: string;
  sections: GuideSection[];
  faqs: Array<{ question: string; answer: string }>;
  /** Slug de la landing de servicio a la que empuja la guía. */
  landing: string;
}

export const guides: Guide[] = [
  {
    slug: "cuanto-cuesta-una-pagina-web",
    title: "¿Cuánto cuesta una página web en Colombia? Qué define el precio | KOR Bytes",
    description:
      "Qué determina el precio de una página web en Colombia: alcance, contenido, integraciones y mantenimiento. Guía práctica antes de cotizar.",
    h1: "¿Cuánto cuesta una página web en Colombia?",
    intro:
      "No existe un precio único, y desconfía de quien te lo da sin preguntarte nada. El costo de una página web depende de unas pocas variables que puedes definir tú antes de pedir cotizaciones. Esta guía te explica cuáles son para que compares propuestas con criterio.",
    published: "2026-10-03",
    updated: "2026-10-04",
    waMessage: "Hola KOR Bytes, leí su guía de cuánto cuesta una página web y quiero una cotización.",
    need: "Landing page o página web",
    sections: [
      {
        heading: "Primero: ¿landing page o sitio completo?",
        paragraphs: [
          "Una landing page tiene un solo objetivo: que alguien te contacte o compre. Un sitio completo tiene varias páginas (servicios, nosotros, blog, contacto). Si tu negocio apenas empieza, casi siempre conviene empezar por una landing bien hecha y crecer después con datos reales.",
        ],
      },
      {
        heading: "Lo que más mueve el precio",
        paragraphs: ["Estas son las variables que cambian el valor de una cotización:"],
        list: [
          "Cantidad de páginas o secciones.",
          "Quién produce el contenido: textos, fotos y logos propios o a crear.",
          "Si necesitas tienda en línea, pagos, reservas o área de clientes.",
          "Integraciones: WhatsApp, CRM, facturación, redes sociales.",
          "SEO técnico y velocidad de carga, que no se ven pero determinan si Google te muestra.",
          "Quién administra el contenido después y cuánta capacitación necesita.",
        ],
      },
      {
        heading: "Costos que a veces no aparecen en la cotización",
        paragraphs: ["Pregunta siempre por esto antes de aceptar un precio:"],
        list: [
          "Dominio y hosting: ¿quedan a tu nombre o al del proveedor?",
          "Certificado SSL (el candado de seguridad).",
          "Mantenimiento y actualizaciones posteriores.",
          "Cambios después de la entrega: cuántos están incluidos.",
          "Quién es dueño del código y de los accesos.",
        ],
      },
      {
        heading: "Cómo comparar dos propuestas",
        paragraphs: [
          "No compares solo el número. Compara qué incluye cada una: velocidad en celular, SEO técnico, medición de contactos y propiedad de lo que te entregan. Una página barata que nadie encuentra y no mide contactos termina costando más que una bien hecha.",
          "En KOR Bytes preferimos darte una propuesta cerrada después de una conversación corta, con alcance, plazo y precio por escrito. Así sabes exactamente qué recibes.",
        ],
      },
      {
        heading: "Rangos de referencia del mercado colombiano (2026)",
        paragraphs: [
          "Estos valores se recopilaron de publicaciones de agencias y freelancers colombianos en 2026. Son una referencia para orientarte, no una cotización: el precio final depende de tu caso.",
        ],
        list: [
          "Landing page: entre $800.000 y $3.000.000 COP (hay opciones desde $500.000).",
          "Página web corporativa: entre $1.500.000 y $8.000.000 COP.",
          "Tienda en línea: entre $2.000.000 y $15.000.000 COP o más, según catálogo y pagos.",
          "Dominio y hosting: entre $150.000 y $500.000 COP al año, según el plan.",
        ],
      },
      {
        heading: "Cuánto cobramos en KOR Bytes",
        paragraphs: [
          "Nuestras landing pages parten desde $800.000 COP. Para tiendas en línea, sitios con varias secciones o desarrollos a medida damos una propuesta cerrada después de entender tu caso.",
        ],
      },
      {
        heading: "Por qué los precios varían tanto",
        paragraphs: [
          "Casi todo el rango se explica por quién lo hace y qué incluye. Una plantilla armada por un freelancer, una agencia con diseño propio y un desarrollo a medida con integraciones no son el mismo producto aunque todos se llamen «página web». La ciudad pesa poco: las fuentes consultadas ven precios similares entre las principales ciudades, con Bogotá algo más cara.",
        ],
      },
    ],
    faqs: [
      { question: "¿Cuánto tarda en estar lista una página web?", answer: "Una landing estándar puede salir en pocos días si el contenido está listo. Un sitio con varias secciones o tienda toma más tiempo; el plazo exacto se acuerda en la propuesta." },
      { question: "¿Necesito pagar mantenimiento todos los meses?", answer: "No siempre. Depende de la tecnología y de cuánto cambie tu contenido. Se acuerda según lo que necesites y queda por escrito." },
      { question: "¿La página queda a mi nombre?", answer: "Debería. Dominio, hosting y código deben quedar a tu nombre o con acceso claro para ti; confírmalo con cualquier proveedor." },
    ],
    landing: "landing-pages-colombia",
  },
  {
    slug: "cuanto-cuesta-desarrollar-una-app",
    title: "¿Cuánto cuesta desarrollar una app móvil? Factores y cómo reducir el costo | KOR Bytes",
    description:
      "Qué define el costo de una app móvil: funcionalidades, backend, diseño y publicación. Cómo empezar con un MVP y no gastar de más.",
    h1: "¿Cuánto cuesta desarrollar una app móvil?",
    intro:
      "El costo de una app depende más de lo que hace que de cómo se ve. Dos apps con la misma pantalla de inicio pueden costar muy distinto si una necesita pagos, mapas, notificaciones y un panel de administración. Aquí te explicamos cómo se compone el precio y cómo no gastar de más.",
    published: "2026-10-03",
    updated: "2026-10-04",
    waMessage: "Hola KOR Bytes, leí su guía de cuánto cuesta una app y quiero evaluar mi idea.",
    need: "Aplicación móvil",
    sections: [
      {
        heading: "¿Realmente necesitas una app?",
        paragraphs: [
          "Muchas veces una web adaptable al celular resuelve el caso a menor costo. Una app se justifica cuando necesitas notificaciones push, uso de cámara o GPS, funcionamiento sin conexión o presencia en las tiendas. Si no es tu caso, te lo decimos desde el principio.",
        ],
      },
      {
        heading: "Qué compone el costo",
        paragraphs: ["Estos son los bloques que definen el alcance:"],
        list: [
          "Cantidad y complejidad de pantallas y flujos.",
          "Backend: base de datos, autenticación y lógica de negocio.",
          "Panel de administración para gestionar usuarios y contenido.",
          "Integraciones: pagos, mapas, notificaciones, WhatsApp, APIs de terceros.",
          "Una o dos plataformas: con React Native se desarrolla una sola base de código para iOS y Android.",
          "Diseño de interfaz y experiencia.",
          "Publicación y cuentas de desarrollador en App Store y Google Play.",
        ],
      },
      {
        heading: "Empieza con un MVP",
        paragraphs: [
          "Un MVP es la versión mínima que ya aporta valor. En lugar de construir todo lo imaginado, lanzas lo esencial, aprendes cómo lo usa la gente real y decides qué sigue. Es la forma más segura de controlar el costo y el riesgo.",
          "Un ejemplo propio: VolleyPass Mobile, una app para torneos y carnetización con QR hecha con React Native y Expo, que empezó como MVP y evoluciona por etapas.",
        ],
      },
      {
        heading: "Costos posteriores al lanzamiento",
        paragraphs: ["Una app no termina el día que se publica:"],
        list: [
          "Servidores y servicios en la nube.",
          "Actualizaciones por cambios de iOS y Android.",
          "Corrección de errores y soporte.",
          "Nuevas funcionalidades según el uso real.",
        ],
      },
      {
        heading: "Rangos de referencia del mercado colombiano (2026)",
        paragraphs: [
          "Estos valores se recopilaron de publicaciones de agencias colombianas en 2026. Son una referencia para orientarte, no una cotización.",
        ],
        list: [
          "App muy sencilla: desde $2.000.000 COP.",
          "MVP móvil para iOS y Android: entre $15.000.000 y $30.000.000 COP según la mayoría de fuentes; algunas lo ubican entre $20.000.000 y $50.000.000.",
          "Tiempo típico de un MVP: entre 4 y 8 semanas.",
          "Integraciones extra (pagos, APIs de terceros): entre $2.000.000 y $8.000.000 COP según la complejidad.",
        ],
      },
      {
        heading: "Por qué los precios varían tanto",
        paragraphs: [
          "La diferencia viene sobre todo del alcance: una app con login y una pantalla no se parece a una con pagos, notificaciones, mapas y panel de administración. También pesa si la hace un freelancer, una agencia o un equipo con backend propio. La ciudad influye poco.",
        ],
      },
    ],
    faqs: [
      { question: "¿Cuánto tarda desarrollar una app?", answer: "Un MVP se mide en semanas o pocos meses según el alcance. Definimos el plazo exacto en la propuesta." },
      { question: "¿Hacen apps para iOS y Android?", answer: "Sí, con React Native desarrollamos una sola base de código para ambas." },
      { question: "¿Qué necesito para pedir una cotización?", answer: "Una descripción simple de qué debe hacer la app y para quién. Con eso armamos un alcance y una propuesta." },
    ],
    landing: "desarrollo-de-aplicaciones-moviles",
  },
  {
    slug: "sistema-de-inventario-para-negocio",
    title: "Sistema de inventario para tu negocio: cuándo dejar el Excel | KOR Bytes",
    description:
      "Señales de que tu inventario en Excel ya no alcanza, qué debe tener un buen sistema de inventario y cómo elegir entre uno listo o a medida.",
    h1: "Sistema de inventario para tu negocio: cuándo dejar el Excel",
    intro:
      "El Excel funciona hasta que deja de funcionar. Cuando el stock no coincide con la estantería, vendes lo que no tienes o cerrar la caja toma horas, el costo de seguir con hojas de cálculo ya es mayor que el de un sistema. Esta guía te ayuda a decidir.",
    published: "2026-10-03",
    updated: "2026-10-04",
    waMessage: "Hola KOR Bytes, leí su guía de inventario y quiero revisar mi caso.",
    need: "Inventario, POS o facturación",
    sections: [
      {
        heading: "Señales de que el Excel ya no alcanza",
        paragraphs: ["Si te pasan dos o más de estas, es hora de cambiar:"],
        list: [
          "El stock del archivo no coincide con el real.",
          "Varias personas editan el mismo archivo y se pisan.",
          "No sabes qué lote vence primero o qué producto rota menos.",
          "Tienes varias sedes o bodegas, cada una con su archivo.",
          "Cerrar la caja del día toma horas y siempre hay diferencias.",
        ],
      },
      {
        heading: "Qué debe tener un buen sistema de inventario",
        paragraphs: [],
        list: [
          "Movimientos con trazabilidad: quién movió qué y cuándo.",
          "Control por variante o lote, con fechas de vencimiento cuando aplique.",
          "Bloqueo de salidas cuando no hay stock suficiente.",
          "Punto de venta y cierre de caja por turnos.",
          "Alertas de faltantes y reportes de rotación.",
          "Funcionamiento aun si se cae el internet, si tu local lo requiere.",
        ],
      },
      {
        heading: "¿Programa listo o a medida?",
        paragraphs: [
          "Si tu negocio es estándar, un programa ya hecho puede bastar y sale más barato. A medida conviene cuando tienes lotes y vencimientos, varias presentaciones de un mismo producto, reglas de aprobación o integraciones con tu tienda en línea que esos programas no cubren. Si un programa listo resuelve tu caso, te lo decimos.",
          "Hemos construido ambos extremos: un POS + ERP offline-first para farmacias con trazabilidad FEFO, y un backend para imprenta con control de inventario por variante.",
        ],
      },
      {
        heading: "Cómo migrar sin parar la operación",
        paragraphs: [
          "Se carga el inventario actual desde Excel, se prueba en paralelo unos días y recién entonces se apaga el archivo viejo. Así no pierdes ventas durante el cambio.",
        ],
      },
      {
        heading: "Rangos de referencia del mercado colombiano (2026)",
        paragraphs: [
          "Valores recopilados de publicaciones de proveedores colombianos en 2026. Son orientativos, no una cotización.",
        ],
        list: [
          "Programa de inventario ya hecho (SaaS): desde unos $20.000 hasta $180.000 COP al mes, según usuarios y módulos. Ojo: si nómina, POS e inventario se cobran por separado, el costo real puede ser entre 30 % y 80 % mayor al del plan base.",
          "Sistema a medida básico: entre $5.000.000 y $15.000.000 COP.",
          "Sistema a medida mediano: entre $15.000.000 y $50.000.000 COP, con 2 a 5 meses de desarrollo.",
          "Integración con un sistema externo: entre $2.000.000 y $8.000.000 COP adicionales.",
        ],
      },
    ],
    faqs: [
      { question: "¿Un sistema de inventario sirve para una tienda pequeña?", answer: "Sí, si el problema ya es real. Si apenas tienes pocos productos, quizá una solución simple baste. Lo evaluamos contigo." },
      { question: "¿Se puede conectar con facturación electrónica?", answer: "Se evalúa en el diagnóstico, según el proveedor que uses y el flujo de tu negocio." },
      { question: "¿Pueden migrar mi inventario desde Excel?", answer: "Sí, hacemos la carga inicial y una etapa de prueba en paralelo." },
    ],
    landing: "sistema-de-inventario-y-pos",
  },
];

export function getGuide(slug: string) {
  return guides.find((g) => g.slug === slug);
}
