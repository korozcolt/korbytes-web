#!/usr/bin/env node
// generate-project-mockups.mjs
// Genera mockups SVG → WebP retina 2x para proyectos y PASS.
// Salida: public/images/{proyectos,pass}/<slug>.webp 2400x1350 ≤120KB

import sharp from "sharp";
import { mkdir, writeFile, stat as fileStat } from "node:fs/promises";
import { dirname } from "node:path";

// ── Brand tokens (alineados a global.css) ──────────────────────────
const PALETTE = {
  bg:        "#08101c",
  bgRaised:  "#101929",
  bgFloat:   "#172033",
  line:      "#2a3550",
  lineStrong:"#3d4d72",
  text:      "#f4f6fb",
  textMuted: "#9aa4bd",
  textSoft:  "#525e7a",
  brand:     "#3d5ff5",
  brandSoft: "#7a93ff",
  cyan:      "#7be0ff",
  cyanSoft:  "#a9eeff",
  amber:     "#f4b85c",
  amberSoft: "#ffd591",
  emerald:   "#5fdda3",
  rose:      "#ec3a7b",
};

const W = 2400, H = 1350;
const PAD = 64;
const CONTENT_W = W - PAD * 2; // 2272

function escape(s) {
  return String(s)
    .replace(/&/g, "&")
    .replace(/</g, "<")
    .replace(/>/g, ">");
}

// ── Layout primitives ─────────────────────────────────────────────
function rect(x, y, w, h, fill, stroke, r = 14) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke || "none"}" stroke-width="1"/>`;
}

function text(x, y, content, opts = {}) {
  const {
    family = "sans-serif",
    size = 26,
    weight = 400,
    fill = PALETTE.text,
    anchor = "start",
    letter = 0,
  } = opts;
  return `<text x="${x}" y="${y}" font-family="${family}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}" letter-spacing="${letter}">${escape(content)}</text>`;
}

function chip(x, y, label, color, bg) {
  const tw = label.length * 11 + 36;
  return `${rect(x, y - 22, tw, 32, bg || (color + "15"), color + "30", 16)}${
    text(x + 18, y, label, { family: "monospace", size: 17, weight: 500, fill: color === PALETTE.cyan ? PALETTE.cyanSoft : color })
  }`;
}

function kicker(x, y, label, color = PALETTE.cyan) {
  return text(x, y, label, {
    family: "monospace", size: 22, weight: 500, fill: color, letter: 3,
  });
}

function bigTitle(x, y, label) {
  return text(x, y, label, {
    family: "sans-serif", size: 96, weight: 700, fill: PALETTE.text, letter: -2,
  });
}

function stat(x, y, value, label, color = PALETTE.amber, idx = 0) {
  return text(x, y, value, {
    family: "monospace", size: 64, weight: 500, fill: color, letter: -2,
  }) + text(x, y + 30, label, {
    family: "sans-serif", size: 22, fill: PALETTE.textMuted, letter: 1,
  });
}

function bar(x, y, w, h, pct, color = PALETTE.cyan) {
  return `${rect(x, y, w, h, PALETTE.bg + "88", null, 6)}${rect(x, y, w * pct, h, color, null, 6)}`;
}

// ── Frame wrapper ────────────────────────────────────────────────
function frame(content, opts) {
  const { kickerLabel, title, accent } = opts;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
    <defs>
      <linearGradient id="bg-${opts.slug}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%"   stop-color="${PALETTE.bg}"/>
        <stop offset="55%"  stop-color="#0c1424"/>
        <stop offset="100%" stop-color="${PALETTE.bgRaised}"/>
      </linearGradient>
      <radialGradient id="halo-${opts.slug}" cx="0.18" cy="0.05" r="0.7">
        <stop offset="0%" stop-color="${accent}" stop-opacity="0.22"/>
        <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
      </radialGradient>
      <pattern id="grid-${opts.slug}" width="48" height="48" patternUnits="userSpaceOnUse">
        <path d="M 48 0 L 0 0 0 48" fill="none" stroke="${PALETTE.line}" stroke-width="0.5" opacity="0.4"/>
      </pattern>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#bg-${opts.slug})"/>
    <rect width="${W}" height="${H}" fill="url(#grid-${opts.slug})" opacity="0.5"/>
    <rect width="${W}" height="${H}" fill="url(#halo-${opts.slug})"/>
    ${kickerLabel ? kicker(PAD, PAD + 20, kickerLabel) : ""}
    ${title ? bigTitle(PAD, PAD + 110, title) : ""}
    ${content}
    <rect x="${PAD}" y="${H - PAD - 4}" width="120" height="3" fill="${accent}"/>
    ${text(PAD + 140, H - PAD + 6, "kor-bytes.com · Mockup generado", {
      family: "monospace", size: 20, weight: 500, fill: PALETTE.textMuted, letter: 2,
    })}
    ${text(W - PAD, H - PAD + 6, `v1 · ${opts.slug}`, {
      family: "monospace", size: 20, weight: 500, fill: PALETTE.textSoft, anchor: "end", letter: 2,
    })}
  </svg>`;
}

// ── Mockups por proyecto ──────────────────────────────────────────
const projects = [
  // ── 1. NEXUS OMS ────────────────────────────────────────────────
  {
    slug: "nexus-oms",
    out: "proyectos",
    kickerLabel: "CASO · RETAIL OMNICANAL",
    title: "NEXUS OMS",
    accent: PALETTE.cyan,
    content: () => {
      const TL = 300; // top of content after title block
      const colL = PAD, colR = W / 2 + 40;
      const panelW = W / 2 - PAD - 40;
      const panelH = 380;

      // ── Header strip with status
      const topY = TL + 40;

      // ── LEFT: estado operacional
      let html = "";
      html += rect(colL, topY, panelW, panelH, PALETTE.bgRaised, PALETTE.line);
      html += kicker(colL + 32, topY + 50, "ESTADO OPERACIONAL · LIVE", PALETTE.emerald);
      html += stat(colL + 32, topY + 200, "98.4%", "PEDIDOS SIN ERROR", PALETTE.emerald);
      html += stat(colL + 360, topY + 200, "2,847", "TIEMPO REAL · /24H", PALETTE.cyan);
      html += stat(colL + 760, topY + 200, "247/s", "EVENTOS / MINUTO", PALETTE.amber);
      // chips fila
      let cy = topY + 280;
      html += chip(colL + 32, cy, "VTEX  Activo", PALETTE.emerald);
      html += chip(colL + 220, cy, "ICG  Sync OK", PALETTE.emerald);
      html += chip(colL + 410, cy, "OMS  Healthy", PALETTE.cyan);
      html += chip(colL + 600, cy, "0 errores", PALETTE.cyanSoft);

      // ── RIGHT: Flujo unificado
      const rightX = colR;
      html += rect(rightX, topY, panelW, panelH, PALETTE.bgRaised, PALETTE.lineStrong);
      html += kicker(rightX + 32, topY + 50, "FLUJO UNIFICADO · VTEX+ICG OMS", PALETTE.amber);
      const steps = ["WWW", "MIDDLEWARE", "API", "OMS", "Fulfillment"];
      const sx = rightX + 32;
      const sy = topY + 150;
      const stepW = 200;
      const stepGap = 18;
      steps.forEach((s, i) => {
        const isHighlight = i === 2 || i === 3;
        html += rect(sx + i * (stepW + stepGap), sy, stepW, 80,
          isHighlight ? PALETTE.bgFloat : PALETTE.bg,
          isHighlight ? PALETTE.amber : PALETTE.lineStrong, 14);
        html += text(sx + i * (stepW + stepGap) + stepW / 2, sy + 50, s, {
          family: "monospace", size: 22, weight: 600, fill: PALETTE.text, anchor: "middle", letter: 2,
        });
      });
      // arrow tip
      html += text(rightX + 32, sy + 130, "→ Pedido unificado, inventario único, estados operativos sincronizados", {
        family: "sans-serif", size: 22, fill: PALETTE.textMuted,
      });
      // 3 stat inline
      html += stat(rightX + 32, sy + 240, "−2.1d", "TIEMPO LOGÍSTICO", PALETTE.cyan);
      html += stat(rightX + 400, sy + 240, "12 → 1", "FASES UNIFICADAS", PALETTE.amber);

      // ── FOOTER strip: KPIs comparativos
      const footerY = topY + panelH + 40;
      const footerH = 220;
      html += rect(PAD, footerY, CONTENT_W, footerH, PALETTE.bgRaised, PALETTE.line);
      html += kicker(PAD + 32, footerY + 50, "RESULTADO · 12 MESES EN PRODUCCIÓN", PALETTE.cyan);
      html += stat(PAD + 32, footerY + 160, "+187%", "PEDIDOS PROCESADOS", PALETTE.emerald);
      html += stat(PAD + 360, footerY + 160, "−68%", "TIEMPO INCIDENCIAS", PALETTE.cyan);
      html += stat(PAD + 720, footerY + 160, "99.94%", "UPTIME", PALETTE.amber);
      html += stat(PAD + 1100, footerY + 160, "0", "RECLAMOS CLIENTE FINAL", PALETTE.amberSoft);

      return html;
    },
  },

  // ── 2. SIGMA ────────────────────────────────────────────────────
  {
    slug: "sigma",
    out: "proyectos",
    kickerLabel: "CASO · GESTIÓN ELECTORAL",
    title: "SIGMA",
    accent: PALETTE.amber,
    content: () => {
      const TL = 300;
      const topY = TL + 40;
      // LEFT big number + status
      let html = "";
      html += rect(PAD, topY, 1100, 380, PALETTE.bgRaised, PALETTE.line);
      html += kicker(PAD + 32, topY + 50, "DÍA D · COMANDO OPERATIVO", PALETTE.amber);
      html += stat(PAD + 32, topY + 220, "127k", "VOTANTES INDEXADOS", PALETTE.amber);
      html += stat(PAD + 360, topY + 220, "842", "LÍDERES EN CAMPO", PALETTE.cyan);
      html += stat(PAD + 700, topY + 220, "98%", "VALIDACIÓN CENSAL", PALETTE.emerald);

      // RIGHT timeline Día D
      const rx = W / 2 + 40;
      const rw = W - PAD - rx;
      html += rect(rx, topY, rw, 380, PALETTE.bgRaised, PALETTE.lineStrong);
      html += kicker(rx + 32, topY + 50, "CRONOGRAMA DÍA D", PALETTE.cyanSoft);
      // 5 phases
      const phases = [
        { t: "06:00", label: "Activación comando", c: PALETTE.emerald },
        { t: "08:30", label: "Apertura puestos", c: PALETTE.amber },
        { t: "13:00", label: "Pico participación", c: PALETTE.rose },
        { t: "17:00", label: "Cierre + transmisión", c: PALETTE.cyan },
        { t: "20:00", label: "Resultados + auditoría", c: PALETTE.cyanSoft },
      ];
      const phStart = rx + 32;
      const phH = 42;
      phases.forEach((p, i) => {
        const py = topY + 110 + i * (phH + 8);
        html += rect(phStart, py, 120, phH, p.c + "30", p.c, 8);
        html += text(phStart + 60, py + 28, p.t, {
          family: "monospace", size: 18, weight: 600, fill: p.c, anchor: "middle",
        });
        html += text(phStart + 140, py + 28, p.label, {
          family: "sans-serif", size: 22, fill: PALETTE.text,
        });
      });
      // arrow between phases
      for (let i = 0; i < phases.length - 1; i++) {
        const py = topY + 110 + i * (phH + 8) + phH + 2;
        html += text(phStart + 60, py, "↓", {
          family: "monospace", size: 18, fill: PALETTE.textSoft, anchor: "middle",
        });
      }

      // Bottom: call center & SMS
      const footerY = topY + 380 + 40;
      html += rect(PAD, footerY, CONTENT_W, 220, PALETTE.bgRaised, PALETTE.line);
      html += kicker(PAD + 32, footerY + 50, "CANAL · LLAMADAS + SMS + EVIDENCIAS", PALETTE.rose);
      // 4 stat blocks
      const slY = footerY + 130;
      html += stat(PAD + 32, slY, "94%", "EFECTIVIDAD LLAMADA", PALETTE.cyan);
      html += stat(PAD + 360, slY, "42k", "SMS ENVIADOS", PALETTE.amber);
      html += stat(PAD + 720, slY, "12k", "EVIDENCIAS CARGADAS", PALETTE.emerald);
      html += stat(PAD + 1100, slY, "0 fugas", "AUDITORÍA INTEGRAL", PALETTE.cyanSoft);

      return html;
    },
  },

  // ── 3. LuckyCore ────────────────────────────────────────────────
  {
    slug: "luckycore",
    out: "proyectos",
    kickerLabel: "PROYECTO · RIFAS Y SORTEOS",
    title: "LuckyCore",
    accent: PALETTE.amber,
    content: () => {
      const TL = 300;
      const topY = TL + 40;
      let html = "";
      // LEFT tabla de sorteos
      html += rect(PAD, topY, 1200, 580, PALETTE.bgRaised, PALETTE.line);
      html += kicker(PAD + 32, topY + 50, "SORTEOS EN VENTA", PALETTE.cyan);
      // table header
      const tx = PAD + 32, ty = topY + 120;
      const tw = 1136;
      html += text(tx, ty, "SORTEO", { family: "monospace", size: 16, fill: PALETTE.textMuted, letter: 2, weight: 500 });
      html += text(tx + 480, ty, "PRECIO", { family: "monospace", size: 16, fill: PALETTE.textMuted, letter: 2, weight: 500 });
      html += text(tx + 680, ty, "DISPONIBLES", { family: "monospace", size: 16, fill: PALETTE.textMuted, letter: 2, weight: 500 });
      html += text(tx + 900, ty, "ESTADO", { family: "monospace", size: 16, fill: PALETTE.textMuted, letter: 2, weight: 500 });
      const rows = [
        ["Rifa Moto Pulsar NS 200", "$120.000", "0/1000", { l: "Agotada", c: PALETTE.rose }],
        ["Sorteo iPhone 16 Pro", "$45.000", "232/500", { l: "En venta", c: PALETTE.emerald }],
        ["Bono SincelejoTech $2M", "$25.000", "1.2k/2k", { l: "Trending", c: PALETTE.amber }],
        ["Sorteo PlayStation 5", "$80.000", "78/300", { l: "Últimas unidades", c: PALETTE.rose }],
        ["Bono Éxito $500k", "$10.000", "4.8k/5k", { l: "Casi agotada", c: PALETTE.amber }],
      ];
      rows.forEach((r, i) => {
        const ry = ty + 60 + i * 60;
        if (i % 2 === 0) html += rect(tx - 8, ry - 30, tw - 16, 50, PALETTE.bg + "44", null, 8);
        html += text(tx, ry, r[0], { family: "sans-serif", size: 26, fill: PALETTE.text });
        html += text(tx + 480, ry, r[1], { family: "monospace", size: 26, fill: PALETTE.text });
        html += text(tx + 680, ry, r[2], { family: "monospace", size: 26, fill: PALETTE.textMuted });
        // estado badge
        const badgeX = tx + 900;
        html += rect(badgeX, ry - 28, 180, 38, r[3].c + "20", r[3].c, 19);
        html += text(badgeX + 90, ry, r[3].l, {
          family: "monospace", size: 18, weight: 600, fill: r[3].c, anchor: "middle", letter: 1,
        });
      });

      // RIGHT panel: revenue funnels
      const rx = W / 2 + 200;
      const rw = W - PAD - rx;
      html += rect(rx, topY, rw, 280, PALETTE.bgRaised, PALETTE.lineStrong);
      html += kicker(rx + 32, topY + 50, "RECORDS · ÚLTIMOS 30 DÍAS", PALETTE.amber);
      html += stat(rx + 32, topY + 180, "$842M", "RECAUDADO", PALETTE.amber);
      html += stat(rx + 360, topY + 180, "+34%", "VS MES ANTERIOR", PALETTE.emerald);

      // RIGHT 2nd panel: payment mix
      const ry2 = topY + 320;
      html += rect(rx, ry2, rw, 260, PALETTE.bgRaised, PALETTE.lineStrong);
      html += kicker(rx + 32, ry2 + 50, "MEDIOS DE PAGO", PALETTE.cyan);
      const payments = [
        { l: "Mercado Pago",   p: 0.42, c: PALETTE.cyan },
        { l: "Wompi",          p: 0.28, c: PALETTE.amber },
        { l: "PSE / Transfer.",p: 0.18, c: PALETTE.emerald },
        { l: "Manual/Otros",   p: 0.12, c: PALETTE.rose },
      ];
      payments.forEach((p, i) => {
        const py = ry2 + 110 + i * 36;
        html += text(rx + 32, py, p.l, { family: "monospace", size: 18, fill: PALETTE.textMuted });
        html += bar(rx + 220, py - 18, 400, 18, p.p, p.c);
        html += text(rx + 640, py, `${Math.round(p.p * 100)}%`, {
          family: "monospace", size: 18, weight: 600, fill: p.c, anchor: "end",
        });
      });

      return html;
    },
  },

  // ── 4. ArchiveMaster ────────────────────────────────────────────
  {
    slug: "archivemaster",
    out: "proyectos",
    kickerLabel: "PRODUCTO · GESTIÓN DOCUMENTAL",
    title: "ArchiveMaster",
    accent: PALETTE.brand,
    content: () => {
      const TL = 300;
      const topY = TL + 40;
      let html = "";

      // LEFT: Documentos apilados visual
      html += rect(PAD, topY, 900, 580, PALETTE.bgRaised, PALETTE.line);
      html += kicker(PAD + 32, topY + 50, "ARCHIVO CENTRAL · CARPETAS Y ROLES", PALETTE.cyan);
      // show stack of file rectangles
      const series = [
        { y: topY + 110, w: 480, label: "2026 · Q1 Contratos", count: "284 docs", c: PALETTE.amber },
        { y: topY + 180, w: 540, label: "RRHH · Expedientes", count: "1.2k docs", c: PALETTE.cyan },
        { y: topY + 250, w: 600, label: "Legal · Auditorías SGSST", count: "76 docs", c: PALETTE.emerald },
        { y: topY + 320, w: 660, label: "Operaciones · Proveedor", count: "356 docs", c: PALETTE.brandSoft },
        { y: topY + 390, w: 720, label: "Finanzas · CxC / CxP", count: "2.1k docs", c: PALETTE.cyanSoft },
        { y: topY + 460, w: 780, label: "Histórico · Backup 5 años", count: "8.4k docs", c: PALETTE.amethyst || PALETTE.rose },
      ];
      series.forEach((s) => {
        html += rect(PAD + 80, s.y, s.w, 56, PALETTE.bgFloat, s.c, 8);
        html += rect(PAD + 60, s.y - 10, 20, 56, PALETTE.bg, s.c, 8);
        html += text(PAD + 100, s.y + 36, s.label, {
          family: "sans-serif", size: 24, fill: PALETTE.text,
        });
        html += text(PAD + s.w + 80, s.y + 36, s.count, {
          family: "monospace", size: 22, fill: s.c, anchor: "end",
        });
      });

      // RIGHT: Roles & audit
      const rx = W / 2 + 80;
      const rw = W - PAD - rx;
      html += rect(rx, topY, rw, 280, PALETTE.bgRaised, PALETTE.lineStrong);
      html += kicker(rx + 32, topY + 50, "ROLES OPERATIVOS", PALETTE.cyan);
      const roles = ["Admin", "Editor", "Consulta", "Auditor", "Firma"];
      roles.forEach((r, i) => {
        const c = [PALETTE.amber, PALETTE.cyan, PALETTE.textMuted, PALETTE.emerald, PALETTE.brandSoft][i];
        const x = rx + 32 + i * 200;
        html += rect(x, topY + 100, 180, 56, c + "22", c, 14);
        html += text(x + 90, topY + 138, r, {
          family: "monospace", size: 22, weight: 600, fill: c, anchor: "middle", letter: 1,
        });
      });
      html += text(rx + 32, topY + 220, "Cada rol · permisos granulares por oficina y carpeta", {
        family: "sans-serif", size: 22, fill: PALETTE.textMuted,
      });

      // RIGHT 2nd panel: trazabilidad log
      const ry2 = topY + 320;
      html += rect(rx, ry2, rw, 260, PALETTE.bgRaised, PALETTE.lineStrong);
      html += kicker(rx + 32, ry2 + 50, "AUDITORÍA · ÚLTIMOS EVENTOS", PALETTE.amber);
      const logs = [
        { t: "10:42", e: "Carga contrato #842 — Editor R. Mendoza", c: PALETTE.emerald },
        { t: "10:38", e: "Firma aprobación — Auditor J. Pérez", c: PALETTE.amber },
        { t: "10:35", e: "Movimiento entre oficinas — Legal → Oper.", c: PALETTE.cyan },
        { t: "10:21", e: "Búsqueda IA: 'contratos Q1 activos'", c: PALETTE.brandSoft },
      ];
      logs.forEach((l, i) => {
        const py = ry2 + 100 + i * 38;
        html += text(rx + 32, py, l.t, {
          family: "monospace", size: 18, fill: PALETTE.textSoft, weight: 500,
        });
        html += text(rx + 110, py, l.e, {
          family: "sans-serif", size: 22, fill: l.c,
        });
      });

      return html;
    },
  },

  // ── 5. Sistema PQRS (Torcoroma) ────────────────────────────────
  {
    slug: "torcoroma-pqrs",
    out: "proyectos",
    kickerLabel: "CASO · PETICIONES Y SOLICITUDES",
    title: "Sistema PQRS",
    accent: PALETTE.cyan,
    content: () => {
      const TL = 300;
      const topY = TL + 40;
      let html = "";

      // KPI bar top
      html += rect(PAD, topY, CONTENT_W, 130, PALETTE.bgRaised, PALETTE.line);
      const kpis = [
        { v: "12,480", l: "TOTAL RECEPCIONADAS", c: PALETTE.cyan },
        { v: "94.2%", l: "DENTRO DE SLA", c: PALETTE.emerald },
        { v: "1.8d", l: "TIEMPO MEDIO RESPUESTA", c: PALETTE.amber },
        { v: "98.7%", l: "SATISFACCIÓN CIUDADANA", c: PALETTE.amberSoft },
      ];
      kpis.forEach((k, i) => {
        const x = PAD + 40 + i * 560;
        html += text(x, topY + 60, k.v, {
          family: "monospace", size: 56, weight: 600, fill: k.c, letter: -1.5,
        });
        html += text(x, topY + 95, k.l, {
          family: "monospace", size: 16, weight: 500, fill: PALETTE.textMuted, letter: 2,
        });
      });

      // Bucket table
      const tx = PAD;
      const ty = topY + 170;
      html += rect(tx, ty, 1500, 480, PALETTE.bgRaised, PALETTE.line);

      html += kicker(tx + 32, ty + 50, "RADICACIÓN VIGENTE · DISTRIBUCIÓN POR TIPO", PALETTE.cyan);
      const buckets = [
        { l: "Peticiones", v: 5840, pct: 100, c: PALETTE.cyan },
        { l: "Quejas", v: 1280, pct: 22, c: PALETTE.rose },
        { l: "Reclamos", v: 2240, pct: 38, c: PALETTE.amber },
        { l: "Sugerencias", v: 920, pct: 16, c: PALETTE.emerald },
        { l: "Denuncias", v: 480, pct: 8, c: PALETTE.brandSoft },
        { l: "Felicitaciones", v: 1720, pct: 29, c: PALETTE.cyanSoft },
      ];
      buckets.forEach((b, i) => {
        const py = ty + 110 + i * 56;
        html += text(tx + 32, py, b.l, { family: "sans-serif", size: 26, fill: PALETTE.text, weight: 600 });
        html += text(tx + 360, py, b.v.toLocaleString("es-CO"), {
          family: "monospace", size: 26, weight: 600, fill: b.c, anchor: "end",
        });
        html += bar(tx + 420, py - 18, 1000, 18, b.pct / 100, b.c);
        html += text(tx + 1440, py, `${b.pct}%`, {
          family: "monospace", size: 22, fill: PALETTE.textMuted, anchor: "end",
        });
      });

      // RIGHT: SLA donut representation
      const rx = W / 2 + 540;
      const rw = W - PAD - rx;
      const dy = ty + 60;
      html += rect(rx, ty, rw, 480, PALETTE.bgRaised, PALETTE.lineStrong);
      html += kicker(rx + 32, ty + 50, "ALERTAS DE VENCIMIENTO", PALETTE.amber);

      const alerts = [
        { l: "Por vencer 0-24h", v: 24, color: PALETTE.rose },
        { l: "Vencidas 1-7d",  v: 8,  color: PALETTE.amber },
        { l: "En término",       v: 1842, color: PALETTE.emerald },
        { l: "Cerradas (mes)",  v: 1129, color: PALETTE.cyan },
      ];
      // Big donut-like stat
      html += text(rx + 80, dy + 230, "94%", {
        family: "monospace", size: 96, weight: 600, fill: PALETTE.emerald, anchor: "middle", letter: -2,
      });
      html += text(rx + 80, dy + 270, "DENTRO DE SLA", {
        family: "monospace", size: 16, fill: PALETTE.textMuted, anchor: "middle", letter: 2,
      });

      alerts.forEach((a, i) => {
        const py = ty + 320 + i * 38;
        html += rect(rx + 180, py - 24, 16, 16, a.color, null, 4);
        html += text(rx + 210, py, a.l, { family: "sans-serif", size: 22, fill: PALETTE.text });
        html += text(rx + rw - 32, py, a.v.toLocaleString("es-CO"), {
          family: "monospace", size: 22, fill: a.color, anchor: "end", weight: 600,
        });
      });

      return html;
    },
  },

  // ── 6. Certificados QR ──────────────────────────────────────────
  {
    slug: "certificados-qr",
    out: "proyectos",
    kickerLabel: "REAL · CERTIFICACIÓN DIGITAL",
    title: "Certificados QR",
    accent: PALETTE.emerald,
    content: () => {
      const TL = 300;
      const topY = TL + 40;
      let html = "";

      // Left: simulated certificate card
      html += rect(PAD, topY, 1000, 580, "#f8fafc", null, 14); // white-ish card
      html += kicker(PAD + 48, topY + 56, "INSTITUCIÓN · EDUCATIVA", PALETTE.brand);
      html += text(PAD + 48, topY + 130, "Certificado de", {
        family: "sans-serif", size: 36, weight: 600, fill: "#0a1929", letter: -1,
      });
      html += text(PAD + 48, topY + 200, "Finalización Académica", {
        family: "sans-serif", size: 56, weight: 700, fill: "#0a1929", letter: -1.5,
      });
      html += text(PAD + 48, topY + 270, "Otorgado a:", {
        family: "sans-serif", size: 22, fill: "#475569",
      });
      html += text(PAD + 48, topY + 320, "María Camila Ortega Mendoza", {
        family: "sans-serif", size: 48, weight: 700, fill: "#0a1929", letter: -1,
      });
      html += text(PAD + 48, topY + 380, "CC 1.104.758.230 · Promo 2025", {
        family: "monospace", size: 22, fill: "#475569",
      });
      // signature area
      html += rect(PAD + 48, topY + 470, 360, 2, "#94a3b8");
      html += text(PAD + 48, topY + 510, "Rectoría", {
        family: "serif", size: 26, fill: "#475569", weight: 600,
      });
      // QR placeholder matrix
      const qx = PAD + 720, qy = topY + 360;
      const qSize = 180;
      html += rect(qx, qy, qSize, qSize, "#ffffff", "#0a1929", 12);
      // simulate QR pattern
      const qrMatrix = [
        "1111111010010101111111",
        "1000001010110011000001",
        "1011101001001010111101",
        "1011101010100010111101",
        "1011101011101110111101",
        "1000001010111011000001",
        "1111111010101011111111",
        "0000000011011000000000",
        "1101101111000110110011",
        "0010110010100110001100",
        "1110001000110011010100",
        "1000111011011011111110",
        "0101010000110011000010",
        "0110110110111011001000",
        "1111111010101011111111",
        "1000001010111011000001",
        "1011101001001010111101",
        "1011101010100010111101",
        "1011101011101110111101",
        "1000001010111011000001",
        "1111111010010101111111",
      ];
      const cellSize = qSize / 21;
      qrMatrix.forEach((row, y) => {
        [...row].forEach((c, x) => {
          if (c === "1") html += rect(qx + x * cellSize, qy + y * cellSize, cellSize, cellSize, "#0a1929", null, 1);
        });
      });
      // QR label
      html += text(qx + qSize / 2, qy + qSize + 40, "VALIDAR EN LÍNEA", {
        family: "monospace", size: 16, fill: "#475569", anchor: "middle", letter: 2, weight: 500,
      });
      html += text(qx + qSize / 2, qy + qSize + 70, "hash:8e4f·a91c·2025·cbk", {
        family: "monospace", size: 14, fill: "#475569", anchor: "middle", weight: 400,
      });

      // RIGHT: validation flow + types
      const rx = W / 2 + 80;
      const rw = W - PAD - rx;
      html += rect(rx, topY, rw, 280, PALETTE.bgRaised, PALETTE.lineStrong);
      html += kicker(rx + 32, topY + 50, "VALIDACIÓN EN TIEMPO REAL", PALETTE.emerald);
      html += stat(rx + 32, topY + 180, "9ms", "RESPUESTA QR", PALETTE.emerald);
      html += stat(rx + 200, topY + 180, "100%", "INTEGRIDAD", PALETTE.cyan);
      html += stat(rx + 440, topY + 180, "0", "FRAUDES DETECTADOS", PALETTE.amber);

      // RIGHT 2nd: tipos de certificados
      const ry2 = topY + 320;
      html += rect(rx, ry2, rw, 260, PALETTE.bgRaised, PALETTE.lineStrong);
      html += kicker(rx + 32, ry2 + 50, "PLANTILLAS DISPONIBLES", PALETTE.cyan);
      const types = [
        { l: "Académico", c: PALETTE.cyan },
        { l: "Laboral",   c: PALETTE.amber },
        { l: "Asistencia", c: PALETTE.emerald },
        { l: "Conferencias", c: PALETTE.brandSoft },
        { l: "Competencias", c: PALETTE.rose },
      ];
      types.forEach((t, i) => {
        const cw = 200, ch = 60;
        const cols = 3;
        const x = rx + 32 + (i % cols) * (cw + 16);
        const y = ry2 + 110 + Math.floor(i / cols) * (ch + 16);
        html += rect(x, y, cw, ch, t.c + "22", t.c, 14);
        html += text(x + cw / 2, y + 38, t.l, {
          family: "monospace", size: 22, weight: 600, fill: t.c, anchor: "middle", letter: 1,
        });
      });

      return html;
    },
  },

  // ── 7. Portal de noticias ───────────────────────────────────────
  {
    slug: "portal-noticias",
    out: "proyectos",
    kickerLabel: "CLIENTE · MEDIOS DIGITALES",
    title: "Portal de noticias",
    accent: PALETTE.cyan,
    content: () => {
      const TL = 300;
      const topY = TL + 40;
      let html = "";

      // LEFT: hero article simulation
      html += rect(PAD, topY, 1200, 580, PALETTE.bgRaised, PALETTE.line);
      html += kicker(PAD + 32, topY + 50, "PORTADA · EDICIÓN 1.247", PALETTE.rose);
      // Headline
      html += text(PAD + 32, topY + 200, "Sincelejo inaugurará nuevo", {
        family: "serif", size: 56, weight: 700, fill: PALETTE.text, letter: -1.5,
      });
      html += text(PAD + 32, topY + 270, "centro de innovación regional", {
        family: "serif", size: 56, weight: 700, fill: PALETTE.amber, letter: -1.5,
      });
      html += text(PAD + 32, topY + 320, "en alianza con el SENA y KOR Bytes", {
        family: "serif", size: 40, fill: PALETTE.textMuted, weight: 400, letter: -1,
      });
      // Author + read time
      html += chip(PAD + 32, topY + 380, "Por Redacción Central", PALETTE.textMuted);
      html += chip(PAD + 290, topY + 380, "5 min lectura", PALETTE.textMuted);
      html += chip(PAD + 480, topY + 380, "Actualizado 10:42", PALETTE.emerald);

      // Sidebar: 3 categorías
      const cats = [
        { l: "Última hora", v: 8, c: PALETTE.rose },
        { l: "Deportes", v: 24, c: PALETTE.emerald },
        { l: "Economía", v: 16, c: PALETTE.amber },
        { l: "Opinión", v: 9, c: PALETTE.cyan },
      ];
      cats.forEach((c, i) => {
        const cx = PAD + 32 + i * 280;
        const cy = topY + 470;
        html += rect(cx, cy - 32, 260, 50, PALETTE.bg, c.c, 12);
        html += text(cx + 16, cy, c.l, {
          family: "monospace", size: 20, weight: 600, fill: PALETTE.text, letter: 1,
        });
        html += text(cx + 244, cy, `${c.v}`, {
          family: "monospace", size: 22, fill: c.c, anchor: "end", weight: 700,
        });
      });

      // RIGHT: SEO stats
      const rx = W / 2 + 280;
      const rw = W - PAD - rx;
      html += rect(rx, topY, rw, 280, PALETTE.bgRaised, PALETTE.lineStrong);
      html += kicker(rx + 32, topY + 50, "TRÁFICO · ÚLTIMOS 7 DÍAS", PALETTE.cyan);
      html += stat(rx + 32, topY + 180, "142k", "SESIONES", PALETTE.cyan);
      html += stat(rx + 280, topY + 180, "1:42", "TIEMPO MEDIO", PALETTE.amber);
      html += stat(rx + 600, topY + 180, "+28%", "VS SEMANA ANT.", PALETTE.emerald);

      // RIGHT 2nd: SEO keywords rank
      const ry2 = topY + 320;
      html += rect(rx, ry2, rw, 260, PALETTE.bgRaised, PALETTE.lineStrong);
      html += kicker(rx + 32, ry2 + 50, "RANKING SEO · POSICIÓN", PALETTE.cyanSoft);
      const kws = [
        { kw: "noticias Sincelejo", pos: 2, c: PALETTE.emerald },
        { kw: "periodico Sucre",     pos: 4, c: PALETTE.emerald },
        { kw: "regionales Colombia", pos: 9, c: PALETTE.amber },
        { kw: "deportes Sucre",      pos: 6, c: PALETTE.cyan },
      ];
      kws.forEach((k, i) => {
        const py = ry2 + 100 + i * 38;
        html += text(rx + 32, py, k.kw, {
          family: "monospace", size: 20, fill: PALETTE.text,
        });
        html += text(rx + rw - 32, py, `#${k.pos}`, {
          family: "monospace", size: 28, fill: k.c, anchor: "end", weight: 700,
        });
      });

      return html;
    },
  },

  // ── 8. Ecosistema VPS ───────────────────────────────────────────
  {
    slug: "ecosistema-vps",
    out: "proyectos",
    kickerLabel: "INFRAESTRUCTURA · DOKPLOY",
    title: "Ecosistema VPS",
    accent: PALETTE.brand,
    content: () => {
      const TL = 300;
      const topY = TL + 40;
      let html = "";

      // Servers grid
      html += kicker(PAD, topY, "INSTANCIAS ACTIVAS · VPS", PALETTE.cyan);
      const servers = [
        { l: "korbytes-web",  ip: "159.x.x.21", stack: "Astro · SSG", c: PALETTE.cyan, status: "OK" },
        { l: "sigma",         ip: "159.x.x.22", stack: "Laravel 11", c: PALETTE.amber, status: "OK" },
        { l: "pass-portal",   ip: "159.x.x.23", stack: "Next.js", c: PALETTE.brandSoft, status: "OK" },
        { l: "openclaw",      ip: "159.x.x.24", stack: "n8n", c: PALETTE.emerald, status: "OK" },
        { l: "client-blog",   ip: "159.x.x.25", stack: "WordPress", c: PALETTE.cyanSoft, status: "OK" },
        { l: "staging",       ip: "159.x.x.26", stack: "Preview",  c: PALETTE.textMuted, status: "IDLE" },
      ];
      servers.forEach((s, i) => {
        const cols = 3;
        const cw = (CONTENT_W - (cols - 1) * 24) / cols;
        const ch = 200;
        const x = PAD + (i % cols) * (cw + 24);
        const y = topY + 60 + Math.floor(i / cols) * (ch + 24);
        html += rect(x, y, cw, ch, PALETTE.bgRaised, s.c + "55", 16);
        // status dot
        html += `<circle cx="${x + 30}" cy="${y + 36}" r="6" fill="${s.status === "OK" ? PALETTE.emerald : PALETTE.amber}" />`;
        // title
        html += text(x + 30, y + 80, s.l, {
          family: "monospace", size: 28, weight: 700, fill: PALETTE.text,
        });
        html += text(x + 30, y + 120, s.stack, {
          family: "monospace", size: 18, fill: s.c, letter: 1,
        });
        html += text(x + 30, y + 150, s.ip, {
          family: "monospace", size: 16, fill: PALETTE.textSoft,
        });
        // status text
        html += text(x + cw - 20, y + 36, s.status, {
          family: "monospace", size: 16, weight: 600,
          fill: s.status === "OK" ? PALETTE.emerald : PALETTE.amber,
          anchor: "end", letter: 2,
        });
        // uptime bar
        html += bar(x + 30, y + 170, cw - 60, 8, 0.96, s.c);
      });

      // Footer: deploy cycles
      const footerY = topY + 580;
      html += rect(PAD, footerY, CONTENT_W, 150, PALETTE.bgRaised, PALETTE.line);
      html += kicker(PAD + 32, footerY + 50, "DEPLOY · ÚLTIMOS 7 DÍAS", PALETTE.cyan);
      const points = [3, 5, 2, 8, 4, 6, 7];
      const bx = PAD + 32, by = footerY + 80, bw = CONTENT_W - 64, bh = 50;
      points.forEach((p, i) => {
        const px = bx + i * (bw / 7);
        const ph = (p / 8) * bh;
        html += rect(px, by + (bh - ph), (bw / 7) - 12, ph, PALETTE.cyan, null, 4);
      });
      html += text(PAD + 32, footerY + 145, "Lun   Mar   Mié   Jue   Vie   Sáb   Dom", {
        family: "monospace", size: 14, fill: PALETTE.textSoft, letter: 4,
      });

      return html;
    },
  },

  // ── PASS destacados ─────────────────────────────────────────────
  // ── 9. KORPass (Concepto paraguas) ──────────────────────────────
  {
    slug: "korpass-core",
    out: "pass",
    kickerLabel: "PASS · NÚCLEO COMÚN",
    title: "KORPass",
    accent: PALETTE.cyan,
    content: () => {
      const TL = 300;
      const topY = TL + 40;
      let html = "";

      // diagrama central con módulos
      html += kicker(PAD, topY, "ARQUITECTURA · MÓDULOS COMPARTIDOS", PALETTE.amber);

      // Centro
      const cx = W / 2, cy = topY + 340;
      html += `<circle cx="${cx}" cy="${cy}" r="120" fill="${PALETTE.bgRaised}" stroke="${PALETTE.amber}" stroke-width="2"/>`;
      html += text(cx, cy - 20, "PASS", {
        family: "monospace", size: 36, weight: 700, fill: PALETTE.amber, anchor: "middle", letter: 4,
      });
      html += text(cx, cy + 12, "CORE", {
        family: "monospace", size: 28, weight: 600, fill: PALETTE.amber, anchor: "middle", letter: 6,
      });
      html += text(cx, cy + 50, "usuarios · roles · pagos", {
        family: "sans-serif", size: 18, fill: PALETTE.textMuted, anchor: "middle",
      });

      const modulos = [
        { l: "Usuarios / Roles", a: -Math.PI / 2,                             c: PALETTE.cyan },
        { l: "Pagos múltiples",  a: -Math.PI / 6,                              c: PALETTE.amber },
        { l: "Notificaciones",   a: Math.PI / 6,                              c: PALETTE.emerald },
        { l: "Reportes / BI",    a: Math.PI / 2,                              c: PALETTE.brandSoft },
        { l: "Archivos",         a: (5 * Math.PI) / 6,                         c: PALETTE.rose },
        { l: "QR / Validación",  a: -(5 * Math.PI) / 6,                        c: PALETTE.cyanSoft },
      ];
      const radius = 380;
      modulos.forEach((m) => {
        const mx = cx + Math.cos(m.a) * radius;
        const my = cy + Math.sin(m.a) * radius * 0.5;
        // línea conectora
        const lx1 = cx + Math.cos(m.a) * 130;
        const ly1 = cy + Math.sin(m.a) * 130 * 0.5;
        const lx2 = cx + Math.cos(m.a) * (radius - 150);
        const ly2 = cy + Math.sin(m.a) * (radius - 150) * 0.5;
        html += `<line x1="${lx1}" y1="${ly1}" x2="${lx2}" y2="${ly2}" stroke="${m.c}" stroke-width="2" opacity="0.6" />`;
        // pill
        const pw = m.l.length * 12 + 60;
        html += rect(mx - pw / 2, my - 28, pw, 56, PALETTE.bgRaised, m.c, 28);
        html += text(mx, my + 6, m.l, {
          family: "monospace", size: 22, weight: 600, fill: m.c, anchor: "middle", letter: 1,
        });
      });

      // Footer stats
      const footerY = cy + 260;
      html += rect(PAD, footerY, CONTENT_W, 130, PALETTE.bgRaised, PALETTE.line);
      html += stat(PAD + 60, footerY + 90, "11", "VERTICALES", PALETTE.cyan);
      html += stat(PAD + 480, footerY + 90, "1", "BASE COMPARTIDA", PALETTE.amber);
      html += stat(PAD + 920, footerY + 90, "70%", "AHORRO ESTIMADO", PALETTE.emerald);

      return html;
    },
  },

  // ── 10. VolleyPass (Producto muy definido) ─────────────────────
  {
    slug: "volleypass",
    out: "pass",
    kickerLabel: "PASS · DEPORTE Y VOLEIBOL",
    title: "VolleyPass",
    accent: PALETTE.amber,
    content: () => {
      const TL = 300;
      const topY = TL + 40;
      let html = "";

      // Cuadrícula principal 2 paneles
      // LEFT: Tabla de posiciones
      html += rect(PAD, topY, 1400, 580, PALETTE.bgRaised, PALETTE.line);
      html += kicker(PAD + 32, topY + 50, "LIGA SUCRE · TABLA DE POSICIONES", PALETTE.amber);

      const cols = ["#", "EQUIPO", "PJ", "PG", "PP", "SETS", "PTS"];
      const cw = 1330;
      const tx = PAD + 32;
      const ty = topY + 120;
      // header
      const colWidths = [60, 580, 90, 90, 90, 200, 220];
      let cx = tx;
      cols.forEach((c, i) => {
        html += text(cx + 16, ty, c, {
          family: "monospace", size: 16, weight: 500, fill: PALETTE.textMuted, letter: 2,
        });
        cx += colWidths[i];
      });

      const equipos = [
        ["1", "Athletic Sincelejo",   12, 11, 1, "+24",  { v: "33", c: PALETTE.amber }],
        ["2", "Caimanes Coveñas",     12, 10, 2, "+19",  { v: "30", c: PALETTE.cyan }],
        ["3", "Sampués FC",            12, 8,  4, "+12",  { v: "25", c: PALETTE.cyanSoft }],
        ["4", "Tolú Vóley",           12, 7,  5, "+8",   { v: "22", c: PALETTE.emerald }],
        ["5", "Corozal Titans",       12, 6,  6, "+2",   { v: "20", c: PALETTE.text }],
        ["6", "Morro Vóley Club",      12, 5,  7, "−5",   { v: "16", c: PALETTE.text }],
        ["7", "San Marcos VB",         12, 3,  9, "−14",  { v: "10", c: PALETTE.textSoft }],
      ];
      equipos.forEach((row, ri) => {
        const ry = ty + 50 + ri * 50;
        if (ri % 2 === 0) html += rect(tx - 8, ry - 30, cw - 16, 40, PALETTE.bg + "44", null, 6);
        cx = tx;
        row.forEach((cell, i) => {
          if (i === 6) {
            // puntos como badge
            html += rect(cx + colWidths[i] - 90, ry - 24, 80, 32, cell.c + "20", cell.c, 8);
            html += text(cx + colWidths[i] - 50, ry, cell.v, {
              family: "monospace", size: 22, weight: 700, fill: cell.c, anchor: "middle",
            });
          } else if (typeof cell === "string" || typeof cell === "number") {
            const style = i === 0
              ? { family: "monospace", weight: 700, fill: ri < 3 ? PALETTE.amber : PALETTE.text, size: 24, letter: 1 }
              : i === 1
              ? { family: "sans-serif", weight: 600, fill: PALETTE.text, size: 24 }
              : { family: "monospace", fill: PALETTE.textMuted, size: 22 };
            if (i === 5 && String(cell).startsWith("+")) style["fill"] = PALETTE.emerald;
            html += text(cx + 16, ry, String(cell), style);
          }
          cx += colWidths[i];
        });
      });

      // RIGHT: Carnet digital con QR simulado
      const rx = W / 2 + 480;
      const rw = W - PAD - rx;
      html += rect(rx, topY, rw, 580, PALETTE.bgRaised, PALETTE.lineStrong);
      html += kicker(rx + 32, topY + 50, "CARNET DIGITAL · QR", PALETTE.cyan);

      // tarjeta clara simulando carnet físico
      const cardX = rx + 60, cardY = topY + 130, cardW = rw - 120, cardH = 380;
      html += rect(cardX, cardY, cardW, cardH, "#f8fafc", null, 18);
      html += text(cardX + 30, cardY + 60, "VOLLEYPASS", {
        family: "monospace", size: 22, weight: 700, fill: "#0a1929", letter: 4,
      });
      html += text(cardX + 30, cardY + 110, "Atleta", {
        family: "sans-serif", size: 16, fill: "#475569", letter: 1,
      });
      html += text(cardX + 30, cardY + 150, "Danna Sofía Pérez", {
        family: "sans-serif", size: 32, weight: 700, fill: "#0a1929", letter: -1,
      });
      html += text(cardX + 30, cardY + 190, "Athletic Sincelejo", {
        family: "sans-serif", size: 20, fill: "#475569", weight: 600,
      });
      html += text(cardX + 30, cardY + 230, "CC 1.104.758.230 · Categoría Sub-17", {
        family: "monospace", size: 16, fill: "#475569",
      });

      // QR dentro del carnet
      const qSize = 130;
      const qMx = cardX + cardW - qSize - 30;
      const qMy = cardY + cardH - qSize - 70;
      html += rect(qMx, qMy, qSize, qSize, "#ffffff", "#0a1929", 8);
      const qrPattern = [
        "1111111010101111111",
        "1000001001101000001",
        "1011101011010111101",
        "1011101001010111101",
        "1011101010110111101",
        "1000001001001000001",
        "1111111010101011111",
        "0000000010101100000",
        "1100110011011001011",
        "0110011100101001100",
        "1001011100010110110",
        "0111001010110011001",
        "1100110011011001011",
        "0110011100101001100",
        "1111111001010101111",
        "1000001011011000001",
        "1011101000101111101",
        "1011101011000111101",
        "1000001010101000001",
        "1111111011010111111",
      ];
      const cs = qSize / 19;
      qrPattern.forEach((row, y) => {
        [...row].forEach((c, x) => {
          if (c === "1") html += rect(qMx + x * cs, qMy + y * cs, cs, cs, "#0a1929", null, 0);
        });
      });
      html += text(cardX + cardW / 2, cardY + cardH - 30, "VALIDACIÓN QR · CARNET DIGITAL", {
        family: "monospace", size: 14, fill: "#475569", anchor: "middle", letter: 2,
      });

      return html;
    },
  },
];

// ── Run ──────────────────────────────────────────────────────────
async function render(item) {
  const svg = frame(item.content(), item);
  const outPath = `public/images/${item.out}/${item.slug}.webp`;
  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(`/tmp/${item.slug}.svg`, svg);
  await sharp(Buffer.from(svg))
    .webp({ quality: 88, effort: 6, smartSubsample: true })
    .toFile(outPath);
  const { size } = await fileStat(outPath);
  const kb = (size / 1024).toFixed(1);
  const flag = size > 120 * 1024 ? "⚠" : "✓";
  console.log(`${flag} ${item.slug.padEnd(22)} ${kb.padStart(7)} KB  ${outPath}`);
}

(async () => {
  for (const p of projects) {
    await render(p);
  }
})();
