/**
 * Paradas del recorrido de la portada (scroll-world).
 * Los textos salen de site.ts para no duplicar cifras ni nombres de producto.
 * El ancla de cada parada se deriva de su nombre (nunca se escribe a mano).
 */
import { EMAIL, passProducts, projects, services, whatsapp } from "./site";

export interface JourneyStop {
  label: string;
  eyebrow: string;
  title: string;
  body?: string;
  items?: string[];
  stats?: Array<{ k: string; v: string }>;
  tags?: string[];
  cta?: { label: string; url: string; external?: boolean };
  ctaSecondary?: { label: string; url: string };
  contact?: { email: string; phone: string; phoneHref: string; place: string };
  scene: string;
  side: "left" | "right";
  valign: "center" | "end";
  focus: number;
}

export const journey: JourneyStop[] = [
  {
    label: "Inicio",
    eyebrow: "Software operativo · Sincelejo, Sucre",
    title: "KOR Bytes es una casa de software en Sincelejo. Construimos productos verticales y sistemas que sí aguantan la operación.",
    body: "Sincelejo, Sucre · Colombia — LATAM · Remoto-first · B2B",
    cta: {
      label: "Hablemos por WhatsApp",
      url: whatsapp("Hola KOR Bytes, quiero un diagnóstico para mi proyecto."),
      external: true,
    },
    ctaSecondary: { label: "Cómo trabajamos", url: "#proceso" },
    scene: "Un escritorio de oficina de noche, lleno de carpetas, notas adhesivas y una hoja de cálculo caótica en la pantalla.",
    side: "left",
    valign: "center",
    focus: 50,
  },
  {
    label: "Operación",
    eyebrow: "Del caos al flujo",
    title: "Tu operación vive en papeles, chats y hojas de cálculo.",
    body: "La convertimos en un sistema con roles, estados y trazabilidad, conectado a lo que ya usas.",
    items: services.slice(0, 4).map((s) => s.title),
    scene: "Del portátil salen líneas de luz que recorren el pasillo: los datos ya fluyen ordenados.",
    side: "right",
    valign: "end",
    focus: 30,
  },
  {
    label: "Evidencia",
    eyebrow: "Prueba, no promesa",
    title: "Sistemas reales, con estado real.",
    body: "Casos documentados y sitios en producción. Si no hay evidencia, no lo contamos.",
    stats: [
      { k: String(passProducts.length), v: "productos PASS" },
      { k: String(projects.length), v: "casos documentados" },
    ],
    cta: { label: "Ver proyectos", url: "#proyectos" },
    scene: "Una sala de control con una pantalla curva que muestra tableros abstractos de operación.",
    side: "left",
    valign: "end",
    focus: 70,
  },
  {
    label: "PASS",
    eyebrow: "Ecosistema PASS",
    title: "Productos verticales sobre un núcleo común.",
    body: "No reconstruimos la misma base para cada cliente: cada vertical reutiliza módulos probados.",
    tags: passProducts.map((p) => p.name),
    cta: { label: "Explorar PASS", url: "#pass" },
    scene: "Una galería con paneles verticales, cada uno con una aplicación distinta, en perspectiva simétrica.",
    side: "left",
    valign: "center",
    focus: 50,
  },
  {
    label: "Contacto",
    eyebrow: "Siguiente paso",
    title: "¿Qué proceso quieres ordenar primero?",
    body: "Cuéntanos en un mensaje. Responde el fundador, no un bot.",
    cta: {
      label: "Escribir por WhatsApp",
      url: whatsapp("Hola KOR Bytes, quiero empezar un proyecto."),
      external: true,
    },
    contact: {
      email: EMAIL,
      phone: "+57 304 397 8157",
      phoneHref: "tel:+573043978157",
      place: "Sincelejo, Sucre, Colombia",
    },
    scene: "Un escritorio junto a una ventana al atardecer, con un portátil y un teléfono mostrando conversaciones.",
    side: "left",
    valign: "center",
    focus: 72,
  },
];
