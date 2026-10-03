export interface LandingFaq {
  question: string;
  answer: string;
}

export interface LandingCase {
  name: string;
  text: string;
}

export interface Landing {
  slug: string;
  /** Etiqueta corta para menús y enlaces internos. */
  label: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  lead: string;
  /** Mensaje prellenado de WhatsApp para el CTA principal. */
  waMessage: string;
  /** Opción que aparece preseleccionada en el formulario. */
  need: string;
  bullets: string[];
  problemTitle: string;
  problems: string[];
  deliverTitle: string;
  deliverables: Array<{ title: string; text: string }>;
  cases: LandingCase[];
  faqs: LandingFaq[];
  /** Slugs de landings relacionadas para enlazado interno. */
  related: string[];
}

export const budgetOptions = [
  "Aún no lo sé",
  "Menos de $3 millones",
  "$3 a $10 millones",
  "$10 a $30 millones",
  "Más de $30 millones",
];

export const needOptions = [
  "Software a medida / sistema interno",
  "Landing page o página web",
  "Dashboard o reportes",
  "Automatización de procesos",
  "Inventario, POS o facturación",
  "Aplicación móvil",
  "Integración con WhatsApp o APIs",
  "Otra cosa",
];

export const landings: Landing[] = [
  {
    slug: "desarrollo-de-software-colombia",
    label: "Desarrollo de software en Colombia",
    title: "Desarrollo de software en Colombia | Empresa de software a medida | KOR Bytes",
    description:
      "Empresa de desarrollo de software en Colombia: sistemas a medida, integraciones y automatización. Diagnóstico gratis por WhatsApp y respuesta del fundador.",
    eyebrow: "Colombia · Remoto · Sede en Sincelejo",
    h1: "Desarrollo de software en Colombia que ordena tu operación.",
    lead: "Somos una casa de software con sede en Sincelejo que construye sistemas a medida, integraciones y automatizaciones para empresas de todo el país. Cuéntanos qué proceso te duele y te respondemos con una ruta realista, sin cotizaciones genéricas.",
    waMessage: "Hola KOR Bytes, vi su página de desarrollo de software en Colombia y quiero un diagnóstico para mi empresa.",
    need: "Software a medida / sistema interno",
    bullets: [
      "Respuesta directa del fundador, no de un bot",
      "Diagnóstico inicial gratis",
      "Entregas por etapas con avances reales",
      "Trabajamos 100 % remoto con todo el país",
    ],
    problemTitle: "Señales de que necesitas software propio",
    problems: [
      "Tu operación vive en hojas de cálculo que solo entiende una persona.",
      "Los datos están repartidos entre WhatsApp, Excel y correos, y nadie ve el panorama completo.",
      "Pagas licencias de varias herramientas que no se hablan entre sí.",
      "Cada cierre de mes toma días de conciliación manual.",
      "Un programa de caja no soporta tus aprobaciones, roles o reportes.",
    ],
    deliverTitle: "Qué construimos",
    deliverables: [
      { title: "Sistemas internos y backoffice", text: "Flujos, estados, roles y aprobaciones con auditoría para reemplazar procesos manuales." },
      { title: "Portales y plataformas web", text: "Aplicaciones para clientes, docentes, afiliados o aliados, con acceso por roles." },
      { title: "Integraciones y pagos", text: "Conexión con Wompi, MercadoPago, Shopify y otras APIs para que los sistemas se hablen." },
      { title: "Automatización", text: "Flujos con n8n y webhooks para quitar tareas repetitivas del equipo." },
      { title: "Mantenimiento y evolución", text: "Despliegue, monitoreo y mejoras continuas una vez el sistema está en producción." },
      { title: "Rescate de sistemas existentes", text: "Revisión técnica de código e infraestructura heredada para decidir si ordenar o rehacer." },
    ],
    cases: [
      { name: "KorPass · Farmacias", text: "POS + ERP offline-first con trazabilidad de lotes FEFO, caja por turnos y devoluciones con bloqueo de inventario." },
      { name: "SIGMA · Centro de comando", text: "Plataforma con campañas, equipos, censo, call center y reportes en tiempo real el día de la elección." },
      { name: "VolleyPass · Deporte", text: "Carnetización digital con QR, torneos, ficha médica y cobro de suscripciones para ligas." },
    ],
    faqs: [
      { question: "¿Cuánto cuesta desarrollar un software a medida en Colombia?", answer: "Depende del alcance: un módulo acotado no cuesta lo mismo que un sistema con roles, reportes e integraciones. Hacemos un diagnóstico gratuito por WhatsApp y te entregamos un alcance con precio antes de construir." },
      { question: "¿Trabajan con empresas fuera de Sincelejo?", answer: "Sí. Operamos de forma remota con empresas de Bogotá, Medellín, Barranquilla, Cartagena y el resto del país, y también de LATAM. Si estás en Sincelejo podemos reunirnos en persona." },
      { question: "¿Cuánto tarda un proyecto?", answer: "Un módulo puntual se mide en semanas y un sistema completo en meses. Entregamos por etapas para que veas avances reales y el plazo exacto se define en el diagnóstico." },
      { question: "¿El código y los datos son míos?", answer: "Sí. Los acuerdos de propiedad, accesos y entrega del código se definen por escrito antes de empezar." },
      { question: "¿Qué necesito para empezar?", answer: "Solo contarnos qué proceso quieres ordenar. Con eso agendamos una conversación corta, entendemos el flujo y proponemos una ruta." },
    ],
    related: ["automatizacion-de-procesos", "sistema-de-inventario-y-pos", "dashboards-operativos"],
  },
  {
    slug: "landing-pages-colombia",
    label: "Landing pages",
    title: "Landing page profesional para tu negocio en Colombia | KOR Bytes",
    description:
      "Diseño y desarrollo de landing pages rápidas, con SEO y orientadas a que tus clientes te escriban por WhatsApp. Cotiza por WhatsApp.",
    eyebrow: "Landing pages · Web · SEO",
    h1: "Una landing page pensada para que tus clientes te escriban.",
    lead: "Una landing no es una tarjeta digital: es una página con un solo objetivo, que alguien te contacte. Construimos páginas rápidas, claras y medibles que cargan en segundos desde el celular y llevan al cliente directo a tu WhatsApp.",
    waMessage: "Hola KOR Bytes, quiero una landing page para mi negocio.",
    need: "Landing page o página web",
    bullets: [
      "Carga rápida en celular (Core Web Vitals)",
      "Botón de WhatsApp con mensaje prellenado",
      "SEO básico y datos estructurados incluidos",
      "Medición de contactos con Google Analytics",
    ],
    problemTitle: "Por qué muchas páginas no generan clientes",
    problems: [
      "Tardan en cargar en el celular y la gente se va antes de leer.",
      "Hablan de la empresa en vez de resolver el problema del cliente.",
      "No tienen un llamado a la acción claro, o piden llenar formularios largos.",
      "No miden cuántas personas escriben, así que no se sabe si funcionan.",
      "Google no las encuentra porque nadie cuidó el SEO técnico.",
    ],
    deliverTitle: "Qué incluye una landing con KOR Bytes",
    deliverables: [
      { title: "Estructura orientada a contacto", text: "Propuesta de valor, prueba social, preguntas frecuentes y un CTA claro en cada tramo." },
      { title: "Diseño responsive", text: "Pensada primero para celular, que es desde donde te va a visitar la mayoría." },
      { title: "SEO técnico", text: "Metadatos, datos estructurados, sitemap, velocidad y estructura de encabezados." },
      { title: "WhatsApp y analítica", text: "Botón con mensaje prellenado y evento de contacto en Google Analytics 4." },
      { title: "Publicación y dominio", text: "Puesta en línea con tu dominio, certificado SSL y hosting estable." },
      { title: "Ajustes tras el lanzamiento", text: "Revisamos los datos de las primeras semanas y mejoramos lo que no convierta." },
    ],
    cases: [
      { name: "kor-bytes.com", text: "Este mismo sitio está construido con Astro, optimizado para velocidad y medición de contactos por WhatsApp." },
      { name: "Sitios de clientes", text: "Tiendas Shopify, sitios WordPress y portales a medida que puedes ver en el portafolio." },
    ],
    faqs: [
      { question: "¿Cuánto cuesta una landing page?", answer: "El precio depende de la cantidad de secciones, el contenido y las integraciones. Te enviamos una propuesta cerrada después de una conversación corta por WhatsApp." },
      { question: "¿En cuánto tiempo la tienen lista?", answer: "Una landing estándar se entrega en pocos días una vez tenemos el contenido. El plazo exacto lo confirmamos en la propuesta." },
      { question: "¿Qué diferencia hay entre una landing y una página web completa?", answer: "La landing tiene un solo objetivo y una sola acción. Una página web completa tiene varias secciones y páginas. Si tu negocio apenas empieza, casi siempre conviene empezar por una landing bien hecha." },
      { question: "¿Me ayudan con el contenido y los textos?", answer: "Sí. Podemos redactar los textos con base en lo que nos cuentes de tu negocio y tus clientes." },
      { question: "¿Puedo editarla yo después?", answer: "Podemos dejarte un panel o un esquema sencillo para cambiar textos e imágenes, según lo que necesites." },
    ],
    related: ["integracion-whatsapp-business", "desarrollo-de-software-colombia", "automatizacion-de-procesos"],
  },
  {
    slug: "dashboards-operativos",
    label: "Dashboards y reportes",
    title: "Dashboards y reportes operativos para tu empresa | KOR Bytes",
    description:
      "Dashboards a medida con los datos que ya tienes: ventas, inventario, operación y finanzas en un solo lugar. Sin exportar a Excel cada semana.",
    eyebrow: "Dashboards · Reportes · Datos",
    h1: "Dashboards que te muestran cómo va tu operación sin abrir Excel.",
    lead: "Conectamos las fuentes que ya usas y las convertimos en indicadores claros: ventas, inventario, cumplimiento, cartera o lo que tu equipo necesite mirar cada día. Menos reportes manuales, más decisiones a tiempo.",
    waMessage: "Hola KOR Bytes, quiero un dashboard con los datos de mi empresa.",
    need: "Dashboard o reportes",
    bullets: [
      "Indicadores con tus datos reales",
      "Acceso por roles: cada quien ve lo suyo",
      "Actualización automática, sin exportar a Excel",
      "Visible desde el celular",
    ],
    problemTitle: "Cuándo un dashboard te hace falta",
    problems: [
      "Armas el reporte semanal copiando y pegando de varios archivos.",
      "Para saber cómo vas tienes que preguntarle a tres personas distintas.",
      "Detectas los problemas de inventario o cartera cuando ya es tarde.",
      "Tus datos están en distintos sistemas y nadie los cruza.",
    ],
    deliverTitle: "Qué incluye",
    deliverables: [
      { title: "Levantamiento de indicadores", text: "Definimos contigo qué decisiones quieres tomar y qué números las sostienen." },
      { title: "Conexión a tus fuentes", text: "Bases de datos, hojas de cálculo, APIs, tiendas en línea o el sistema que ya uses." },
      { title: "Paneles claros", text: "Tablas y gráficos pensados para leerse en segundos, en computador y celular." },
      { title: "Roles y permisos", text: "Gerencia, supervisores y operarios ven solo la información que les corresponde." },
      { title: "Alertas", text: "Avisos automáticos por correo o WhatsApp cuando un indicador sale de rango." },
      { title: "Exportes", text: "Reportes descargables en Excel o PDF para quien los necesite." },
    ],
    cases: [
      { name: "SIGMA", text: "Centro de comando con reportes de campañas, censo y control del Día D con foto y GPS." },
      { name: "ShopStorePass", text: "Panel de operación multi-tienda sobre la API de Shopify: catálogo, precios e inventario." },
    ],
    faqs: [
      { question: "¿Puedo usar los datos que ya tengo en Excel?", answer: "Sí. Muchos dashboards empiezan leyendo hojas de cálculo existentes y luego migran a una base de datos cuando el proceso madura." },
      { question: "¿Cuánto cuesta un dashboard a medida?", answer: "Depende de cuántas fuentes de datos tengas y cuántos indicadores necesites. Con una conversación corta te damos un alcance y un precio." },
      { question: "¿Qué pasa si mis datos están en varios sistemas?", answer: "Es el caso más común. Hacemos las integraciones necesarias para consolidarlos en un solo lugar." },
      { question: "¿Mis datos quedan seguros?", answer: "Trabajamos con roles, auditoría y buenas prácticas de infraestructura. Los detalles de acceso y tratamiento de datos se acuerdan por escrito." },
    ],
    related: ["desarrollo-de-software-colombia", "sistema-de-inventario-y-pos", "automatizacion-de-procesos"],
  },
  {
    slug: "automatizacion-de-procesos",
    label: "Automatización de procesos",
    title: "Automatización de procesos para empresas en Colombia | KOR Bytes",
    description:
      "Automatiza tareas repetitivas con n8n, webhooks e IA: agendamiento, notificaciones, atención por WhatsApp y sincronización entre sistemas.",
    eyebrow: "Automatización · n8n · IA",
    h1: "Automatización de procesos para que tu equipo deje de repetir tareas.",
    lead: "Identificamos las tareas manuales que más tiempo consumen y las convertimos en flujos automáticos: agendamiento, notificaciones, conciliaciones, respuestas por WhatsApp y sincronización entre sistemas.",
    waMessage: "Hola KOR Bytes, quiero automatizar un proceso de mi empresa.",
    need: "Automatización de procesos",
    bullets: [
      "Flujos con n8n y webhooks",
      "Integración con WhatsApp, correo y tus sistemas",
      "IA donde aporta, no por moda",
      "Monitoreo para que no se rompa en silencio",
    ],
    problemTitle: "Tareas que casi siempre se pueden automatizar",
    problems: [
      "Responder las mismas preguntas por WhatsApp todo el día.",
      "Pasar datos de un sistema a otro a mano.",
      "Enviar recordatorios, confirmaciones y cobros uno por uno.",
      "Consolidar reportes que llegan de varias fuentes.",
      "Agendar citas y evitar dobles reservas.",
    ],
    deliverTitle: "Cómo lo hacemos",
    deliverables: [
      { title: "Mapeo del proceso", text: "Dibujamos el flujo actual y definimos qué se automatiza y qué sigue siendo humano." },
      { title: "Flujos con n8n", text: "Automatizaciones auditables, con registros y reintentos, en infraestructura propia." },
      { title: "Integraciones", text: "Conectamos WhatsApp, correo, hojas de cálculo, CRMs, tiendas y APIs." },
      { title: "IA aplicada", text: "Clasificación, resúmenes y respuestas asistidas cuando el caso lo justifica." },
      { title: "Alertas y monitoreo", text: "Te avisamos si un flujo falla, antes de que lo note un cliente." },
      { title: "Documentación", text: "Dejamos el flujo explicado para que no dependa de una sola persona." },
    ],
    cases: [
      { name: "Secretaria virtual por WhatsApp", text: "Agente 24/7 que automatiza el agendamiento en sistemas clínicos sin API oficial, mediante RPA." },
      { name: "DatesPass", text: "SaaS de reservas con control anti-doble-reserva para clínicas capilares y spas." },
    ],
    faqs: [
      { question: "¿Qué procesos conviene automatizar primero?", answer: "Los que se repiten a diario, siguen reglas claras y consumen horas del equipo: confirmaciones, recordatorios, carga de datos y reportes." },
      { question: "¿Necesito cambiar mis herramientas actuales?", answer: "Normalmente no. Conectamos lo que ya usas y automatizamos entre ellas." },
      { question: "¿Cuánto cuesta?", answer: "Hay automatizaciones puntuales que se resuelven rápido y otras que son un proyecto. Te damos un alcance y un precio después de entender el flujo." },
      { question: "¿Qué pasa si una automatización falla?", answer: "Se registra, se reintenta y se te notifica. Por eso monitoreamos los flujos en producción." },
    ],
    related: ["integracion-whatsapp-business", "dashboards-operativos", "desarrollo-de-software-colombia"],
  },
  {
    slug: "sistema-de-inventario-y-pos",
    label: "Sistema de inventario y POS",
    title: "Sistema de inventario y POS a medida en Colombia | KOR Bytes",
    description:
      "Sistema de inventario y punto de venta a medida: control de stock, lotes, caja por turnos y reportes. Funciona incluso sin internet.",
    eyebrow: "Inventario · POS · Comercio",
    h1: "Un sistema de inventario que sabe cuánto tienes de verdad.",
    lead: "Desarrollamos sistemas de inventario y punto de venta adaptados a cómo vende tu negocio: control de stock por variante o lote, caja por turnos, devoluciones y reportes. Ya lo hicimos para farmacias, imprentas y tiendas en línea.",
    waMessage: "Hola KOR Bytes, quiero un sistema de inventario o POS para mi negocio.",
    need: "Inventario, POS o facturación",
    bullets: [
      "Control de stock por producto, variante o lote",
      "Caja por turnos y devoluciones",
      "Opción offline-first si tu internet falla",
      "Reportes de rotación, faltantes y ventas",
    ],
    problemTitle: "Síntomas de un inventario fuera de control",
    problems: [
      "El stock del sistema no coincide con el de la estantería.",
      "Vendes productos que ya no tienes o te quedas sin lo que más rota.",
      "No sabes qué lote vence primero.",
      "Cerrar la caja del día toma horas y siempre hay diferencias.",
      "Tienes varias tiendas o bodegas y cada una lleva su propio Excel.",
    ],
    deliverTitle: "Qué incluye",
    deliverables: [
      { title: "Inventario con trazabilidad", text: "Movimientos, lotes y vencimientos, con bloqueo de salidas sin stock suficiente." },
      { title: "Punto de venta", text: "Venta rápida, caja por turnos, conversión de presentaciones y devoluciones." },
      { title: "Multi-bodega y multi-tienda", text: "Una sola vista de varias sedes, con reglas por sucursal." },
      { title: "Tienda en línea", text: "Sincronización con Shopify u otras plataformas para no vender lo que no hay." },
      { title: "Reportes", text: "Rotación, faltantes, márgenes y cierre de caja listos para revisar." },
      { title: "Migración de datos", text: "Cargamos tu inventario actual desde Excel u otro sistema." },
    ],
    cases: [
      { name: "KorPass · Farmacias", text: "POS + ERP offline-first con trazabilidad FEFO, conversión de presentaciones, caja por turnos y devoluciones." },
      { name: "Backend para imprenta", text: "Backend headless con control estricto de inventario por variante y bloqueo de salidas sin stock suficiente." },
      { name: "ShopStorePass", text: "Gestión masiva de catálogo, precios e inventario multi-tienda sobre Shopify." },
    ],
    faqs: [
      { question: "¿Pueden integrar facturación electrónica?", answer: "Sí, lo evaluamos en el diagnóstico. Depende del proveedor tecnológico que uses o quieras usar y del flujo de tu negocio." },
      { question: "¿Funciona sin internet?", answer: "Podemos diseñarlo offline-first, de modo que el punto de venta siga operando y sincronice cuando regrese la conexión." },
      { question: "¿Por qué no usar un programa de inventario ya hecho?", answer: "Si uno ya resuelve tu caso, te lo decimos. A medida conviene cuando tu operación tiene lotes, variantes, aprobaciones o integraciones que esos programas no cubren." },
      { question: "¿Cuánto cuesta?", answer: "Depende de los módulos, sedes e integraciones. Con una conversación corta te damos un alcance y un precio." },
    ],
    related: ["dashboards-operativos", "desarrollo-de-software-colombia", "automatizacion-de-procesos"],
  },
  {
    slug: "desarrollo-de-aplicaciones-moviles",
    label: "Aplicaciones móviles",
    title: "Desarrollo de aplicaciones móviles en Colombia | iOS y Android | KOR Bytes",
    description:
      "Desarrollo de aplicaciones móviles para iOS y Android con React Native y backend propio. De la idea al MVP publicado en las tiendas.",
    eyebrow: "Apps móviles · iOS · Android",
    h1: "Aplicaciones móviles para iOS y Android, de la idea al MVP.",
    lead: "Construimos apps móviles con React Native y un backend sólido detrás: autenticación, pagos, notificaciones y paneles de administración. Empezamos por un MVP que puedas poner en manos de usuarios reales.",
    waMessage: "Hola KOR Bytes, quiero desarrollar una aplicación móvil.",
    need: "Aplicación móvil",
    bullets: [
      "Una sola base de código para iOS y Android",
      "Backend y panel de administración incluidos",
      "Notificaciones push y pagos",
      "Publicación en App Store y Google Play",
    ],
    problemTitle: "Antes de construir una app, conviene resolver esto",
    problems: [
      "No está claro si necesitas una app o te basta una web adaptable.",
      "Quieres lanzar con todo y el presupuesto no alcanza.",
      "No tienes backend ni panel para administrar lo que pasa en la app.",
      "Te preocupa quedar atado a quien la desarrolló.",
    ],
    deliverTitle: "Cómo trabajamos una app",
    deliverables: [
      { title: "Definición del MVP", text: "Recortamos al mínimo que ya aporta valor y validamos antes de invertir más." },
      { title: "App con React Native y Expo", text: "Un solo desarrollo para iOS y Android con buen rendimiento." },
      { title: "Backend y API", text: "Autenticación, base de datos, lógica de negocio y panel de administración." },
      { title: "Notificaciones y pagos", text: "Push, y pasarelas como Wompi o MercadoPago cuando el caso lo pide." },
      { title: "Publicación", text: "Te acompañamos en el proceso de publicación en las tiendas." },
      { title: "Evolución", text: "Mejoras por iteraciones a partir del uso real." },
    ],
    cases: [
      { name: "VolleyPass Mobile", text: "App para consultar torneos, partidos en vivo, tablas y carnetización QR, con control de partidos para árbitros. Hecha con React Native y Expo." },
      { name: "KronnosStream", text: "Aplicación Android para transmitir en vivo desde el evento hacia un servidor propio." },
    ],
    faqs: [
      { question: "¿Cuánto cuesta desarrollar una app móvil?", answer: "Depende de las funcionalidades, las integraciones y si necesitas panel y backend. Definimos un MVP y te damos un alcance con precio." },
      { question: "¿Hacen apps para iOS y Android?", answer: "Sí, con una sola base de código en React Native." },
      { question: "¿Me ayudan a publicarla en las tiendas?", answer: "Sí. Te acompañamos en la preparación y envío a App Store y Google Play." },
      { question: "¿Necesito una app o me sirve una web?", answer: "Muchas veces una web bien hecha resuelve el caso. Si ese es tu caso, te lo decimos de entrada." },
    ],
    related: ["desarrollo-de-software-colombia", "integracion-whatsapp-business", "automatizacion-de-procesos"],
  },
  {
    slug: "integracion-whatsapp-business",
    label: "Integración con WhatsApp Business",
    title: "Integración con WhatsApp Business API para empresas | KOR Bytes",
    description:
      "Conectamos WhatsApp Business API con tu sistema: mensajes automáticos, agendamiento, notificaciones y atención asistida por IA.",
    eyebrow: "WhatsApp · API · Automatización",
    h1: "Integra WhatsApp Business con tus sistemas y atiende sin perder ventas.",
    lead: "Conectamos la API de WhatsApp Business con tu CRM, tu agenda o tu tienda para enviar confirmaciones, recordatorios y cobros, y para atender consultas frecuentes sin que tu equipo responda todo a mano.",
    waMessage: "Hola KOR Bytes, quiero integrar WhatsApp Business con mi negocio.",
    need: "Integración con WhatsApp o APIs",
    bullets: [
      "Mensajes automáticos con plantillas aprobadas",
      "Conexión con tu CRM, agenda o tienda",
      "Atención asistida por IA para consultas frecuentes",
      "Traspaso a una persona cuando hace falta",
    ],
    problemTitle: "Dónde WhatsApp se vuelve un cuello de botella",
    problems: [
      "Los mensajes llegan a un celular personal y se pierden clientes.",
      "Tu equipo responde lo mismo decenas de veces al día.",
      "Las confirmaciones y recordatorios se envían a mano.",
      "No hay registro de qué se habló ni quién lo atendió.",
    ],
    deliverTitle: "Qué podemos conectar",
    deliverables: [
      { title: "Notificaciones y recordatorios", text: "Confirmaciones de cita, estados de pedido y avisos de pago." },
      { title: "Agendamiento", text: "Reservas por chat con control de disponibilidad y sin dobles reservas." },
      { title: "Atención con IA", text: "Respuestas a preguntas frecuentes con traspaso a un asesor humano." },
      { title: "Integración con tu sistema", text: "Que cada conversación quede asociada al cliente o pedido correspondiente." },
      { title: "Flujos con n8n", text: "Automatizaciones auditables y con reintentos ante fallos." },
      { title: "Cumplimiento", text: "Uso de plantillas y consentimiento acorde a las políticas de WhatsApp." },
    ],
    cases: [
      { name: "Secretaria virtual 24/7", text: "Agente por WhatsApp que automatiza el agendamiento en sistemas clínicos sin API oficial, mediante RPA." },
    ],
    faqs: [
      { question: "¿Qué es la API de WhatsApp Business?", answer: "Es la versión de WhatsApp pensada para empresas que permite conectar el canal con tus sistemas y automatizar mensajes, a diferencia de la app de uso manual." },
      { question: "¿Cuánto cuesta?", answer: "Hay un costo del proveedor por conversación y un costo de integración. Calculamos ambos en el diagnóstico según tu volumen." },
      { question: "¿Puedo mantener mi número actual?", answer: "En muchos casos sí, pero depende del estado de tu cuenta. Lo revisamos al empezar." },
      { question: "¿La IA responde sola todo?", answer: "Responde lo que está definido y cuando no sabe, pasa la conversación a una persona." },
    ],
    related: ["automatizacion-de-procesos", "landing-pages-colombia", "desarrollo-de-software-colombia"],
  },
];

export function getLanding(slug: string) {
  return landings.find((l) => l.slug === slug);
}
