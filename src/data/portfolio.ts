export interface PortfolioItem {
  name: string;
  stack: string;
  status: string;
  url?: string;
  desc: string;
}

export interface PortfolioGroup {
  sector: string;
  items: PortfolioItem[];
}

export const portfolio: PortfolioGroup[] = [
  {
    sector: "Ecosistema VolleyPass · Deporte",
    items: [
      {
        name: "VolleyPass",
        stack: "Laravel 12, Filament 3, Livewire Flux + Volt, Inertia.js, MySQL, Reverb",
        status: "Producción · desarrollo activo",
        desc: "Backend para ligas de voleibol: carnetización digital con QR, clubes federados y descentralizados, torneos, ficha médica y cobro de suscripciones.",
      },
      {
        name: "VolleyPass Mobile",
        stack: "React Native 0.79, Expo SDK 53, TypeScript, Expo Router",
        status: "MVP en desarrollo temprano",
        url: "https://github.com/korozcolt/volleypass-mobile",
        desc: "App cliente para consultar torneos, partidos en vivo, tablas de posiciones y carnetización QR; incluye control de partidos para árbitros.",
      },
      {
        name: "VolleyPass Discovery Service",
        stack: "PocketBase (Go + SQLite), hooks en JS, Docker Compose",
        status: "Prototipo listo para desplegar",
        desc: "Servicio centralizado que registra y devuelve las URLs base de las distintas instancias backend de clubes y ligas.",
      },
      {
        name: "VolleyStream Broadcast Suite",
        stack: "Marcador y overlays para transmisión en vivo",
        status: "Producción",
        url: "https://github.com/korozcolt/volleyball-scoreboard",
        desc: "Marcador profesional en tiempo real y overlays para transmisiones deportivas vía OBS Studio.",
      },
    ],
  },
  {
    sector: "KronnosStream · Producción y transmisión de video",
    items: [
      {
        name: "KronnosStream — Servidor de transmisión",
        stack: "SRT/RTMP, servidor de ingesta y redistribución",
        status: "Producción",
        url: "https://srt.kronnos.dev",
        desc: "Servidor propio de ingesta y redistribución de streaming, sin depender de plataformas de terceros.",
      },
      {
        name: "KronnosStream — App de campo",
        stack: "Android, encoder móvil",
        status: "Producción",
        desc: "Aplicación Android para transmitir en vivo desde el lugar del evento hacia el servidor propio.",
      },
      {
        name: "KronnosStudio",
        stack: "Vision mixing remoto sobre OBS",
        status: "Producción",
        url: "https://studio.kronnos.dev",
        desc: "Producción de video en la nube: mezcla de escenas y cámaras de forma remota sin instalar OBS localmente.",
      },
    ],
  },
  {
    sector: "Salud y estética",
    items: [
      {
        name: "DatesPass",
        stack: "Laravel 12, arquitectura DDD, WooCommerce",
        status: "Activo · maduro",
        url: "https://github.com/korozcolt/datespass",
        desc: "SaaS para clínicas capilares y spas: reservas con control anti-doble-reserva, tratamientos por sesiones y e-commerce integrado.",
      },
      {
        name: "Herencia Rizada",
        stack: "E-commerce, agendamiento de citas, pasarela de pagos",
        status: "Producción",
        url: "https://herenciarizada.com",
        desc: "Plataforma web para clínica y salón especializado en cuidado capilar rizado: agendamiento de citas especializadas, catálogo de productos y venta online.",
      },
      {
        name: "CoreDesk",
        stack: "RPA con Playwright, IA para atención al cliente",
        status: "Producción",
        url: "https://github.com/korozcolt/coredesk",
        desc: "Secretaria virtual 24/7 vía WhatsApp que automatiza agendamiento en sistemas clínicos sin API oficial, mediante RPA.",
      },
    ],
  },
  {
    sector: "Educación",
    items: [
      {
        name: "CEA Movilízate",
        stack: "CodeIgniter 4",
        status: "Producción",
        url: "https://ceamovilizatesas.com",
        desc: "Plataforma para un Centro de Enseñanza Automovilística: matrícula en 6 pasos, captura biométrica y exámenes teóricos cronometrados.",
      },
      {
        name: "CampusPass",
        stack: "Laravel, Filament",
        status: "En desarrollo activo",
        url: "https://github.com/korozcolt/campuspass",
        desc: "Sistema de información escolar multi-campus: matrícula, calificaciones, asistencia, disciplina y portales para docentes y acudientes.",
      },
    ],
  },
  {
    sector: "Farmacias y comercio",
    items: [
      {
        name: "KorPass",
        stack: "Bagisto (Laravel), offline-first",
        status: "Activo",
        url: "https://github.com/korozcolt/korpass",
        desc: "POS + ERP offline-first para farmacias: trazabilidad de lotes FEFO, conversión de presentaciones y caja por turnos.",
      },
      {
        name: "LuckyCore",
        stack: "Laravel, Filament",
        status: "Propuesta definida",
        url: "https://github.com/korozcolt/LuckyCore",
        desc: "Plataforma para rifas y sorteos: carrito, checkout, pagos, auditoría y estados de compra.",
      },
      {
        name: "ShopStorePass",
        stack: "Laravel, API de Shopify",
        status: "Muy activo",
        url: "https://github.com/korozcolt/ShopStorePass",
        desc: "Panel de operación multi-tienda sobre la API de Shopify para dueños de negocio sin equipo técnico, evolucionando hacia un OMS.",
      },
      {
        name: "Kuwai Lencería",
        stack: "Shopify a medida, e-commerce multicanal, pasarela de pagos",
        status: "Producción",
        url: "https://soykuwai.com",
        desc: "Tienda online de lencería y moda con cobertura nacional, alta tasa de conversión y pagos automatizados.",
      },
      {
        name: "Temas Shopify a medida",
        stack: "Liquid, temas Shopify personalizados",
        status: "Producción",
        url: "https://tota.studio",
        desc: "Desarrollo de temas Shopify a medida para tiendas de moda y joyería, incluyendo tota.studio y marceylauren.com.",
      },
    ],
  },
  {
    sector: "Sector público y gestión electoral",
    items: [
      {
        name: "CARSUCRE — Corporación Autónoma Regional de Sucre",
        stack: "Portal gubernamental, transparencia y accesibilidad",
        status: "Producción",
        url: "https://carsucre.gov.co",
        desc: "Portal oficial de la autoridad ambiental de Sucre: trámites ambientales, normatividad, PQRSD y cumplimiento de estándares de Gobierno Digital.",
      },
      {
        name: "SIGMA",
        stack: "Laravel, microservicio Python/Playwright para captchas",
        status: "Base construida",
        url: "https://github.com/korozcolt/sigma-project",
        desc: "Centro de comando electoral: campañas, equipos, censo, puestos, call center, control del Día D con foto y GPS, y reportes.",
      },
    ],
  },
  {
    sector: "Movilidad y logística",
    items: [
      {
        name: "MoviPass",
        stack: "Laravel",
        status: "En desarrollo",
        url: "https://github.com/korozcolt/movipass",
        desc: "Gestión de transporte de pasajeros para rutas intermunicipales.",
      },
      {
        name: "ParkingPass",
        stack: "Laravel",
        status: "En desarrollo",
        url: "https://github.com/korozcolt/parkingpass",
        desc: "Gestión de parqueaderos: control de espacios, tarifas y turnos.",
      },
    ],
  },
  {
    sector: "Contabilidad y finanzas",
    items: [
      {
        name: "ContPass",
        stack: "Laravel",
        status: "En desarrollo",
        url: "https://github.com/korozcolt/contpass",
        desc: "Control contable y presupuestal por partida doble, retenciones versionadas y ciclo presupuestal público colombiano (CDP → RP → obligación → orden de pago).",
      },
      {
        name: "korozcolt/payments",
        stack: "Paquete PHP open source",
        status: "Publicado en Packagist",
        url: "https://packagist.org/packages/korozcolt/payments",
        desc: "Librería que abstrae e integra Wompi, MercadoPago y ePayco bajo una sola interfaz — usada en varios de estos mismos proyectos.",
      },
    ],
  },
  {
    sector: "Gestión de proyectos y documental",
    items: [
      {
        name: "ScrumPass",
        stack: "Laravel",
        status: "En desarrollo",
        desc: "Gestión de proyectos y entregas para equipos B2B.",
      },
      {
        name: "Archive Master",
        stack: "Laravel",
        status: "Repositorio trabajado",
        desc: "Gestión documental empresarial: roles operativos, carga, consulta, movimientos, oficinas, trazabilidad y funciones con IA.",
      },
      {
        name: "KorSolutions Docs",
        stack: "Plataforma de documentación técnica",
        status: "Producción",
        url: "https://doc.kronnos.dev",
        desc: "Base de conocimiento técnica centralizada para los productos del ecosistema.",
      },
    ],
  },
  {
    sector: "Imprenta y artes gráficas",
    items: [
      {
        name: "Litrografika API",
        stack: "Laravel 13, backend headless",
        status: "Producción",
        url: "https://github.com/korozcolt/litrografika-api",
        desc: "Backend headless para imprenta y artes gráficas con control estricto de inventario por variante y bloqueo de salidas sin stock suficiente.",
      },
    ],
  },
  {
    sector: "Infraestructura y web",
    items: [
      {
        name: "File Uploads Microservice",
        stack: "Microservicio de almacenamiento",
        status: "Producción",
        url: "https://github.com/korozcolt/file-uploads",
        desc: "CDN y almacenamiento de imágenes desacoplado, reutilizable entre proyectos.",
      },
      {
        name: "KOR Bytes — este sitio",
        stack: "Astro, Node",
        status: "Producción",
        url: "https://kor-bytes.com",
        desc: "Vitrina comercial de KOR Bytes, construida y mantenida con el mismo criterio de calidad que el resto del portafolio.",
      },
    ],
  },
  {
    sector: "Política, medios y servicios profesionales",
    items: [
      {
        name: "Aldemar Alfaro — sitio oficial",
        stack: "Astro",
        status: "Producción",
        url: "https://aldemaralfaro.com",
        desc: "Sitio oficial de campaña política.",
      },
      {
        name: "Alfaro & Bolaño Abogados",
        stack: "Sitio corporativo",
        status: "Producción",
        url: "https://alfarobolano.com",
        desc: "Sitio corporativo para una firma de servicios jurídicos.",
      },
      {
        name: "La Alerta",
        stack: "Astro",
        status: "Producción",
        url: "https://github.com/korozcolt/laalerta",
        desc: "Portal de noticias local, con plantillas intercambiables de portada según la sección.",
      },
      {
        name: "La Certeza",
        stack: "Astro",
        status: "Producción",
        url: "https://lacerteza.co",
        desc: "Portal periodístico y de denuncias.",
      },
    ],
  },
];
