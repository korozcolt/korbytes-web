// POST /api/lead: recibe el formulario de contacto y lo manda por correo con Resend.
// Sin dependencias. Si falta configuración responde 503 y el formulario sigue abriendo WhatsApp.

const MAX_BODY = 8 * 1024;
const MIN_FILL_MS = 3000;            // un humano tarda más que esto en llenar el formulario
const MAX_AGE_MS = 6 * 60 * 60 * 1000;
const RATE_WINDOW_MS = 60 * 60 * 1000;
const RATE_MAX = 5;                  // envíos por IP por hora
const ALLOWED_HOSTS = new Set(['kor-bytes.com', 'www.kor-bytes.com', 'localhost', '127.0.0.1']);

const hits = new Map();              // ip -> [timestamps]

function clientIp(req) {
  const xff = String(req.headers['x-forwarded-for'] ?? '').split(',')[0].trim();
  return xff || req.socket.remoteAddress || 'unknown';
}

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (!v.some((t) => now - t < RATE_WINDOW_MS)) hits.delete(k);
  }
  return recent.length > RATE_MAX;
}

function clean(value, max) {
  return String(value ?? '').replace(/[\u0000-\u001f\u007f]+/g, ' ').trim().slice(0, max);
}

const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

function readJson(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', (c) => {
      size += c.length;
      if (size > MAX_BODY) { reject(new Error('too-large')); req.destroy(); return; }
      chunks.push(c);
    });
    req.on('end', () => {
      try { resolve(JSON.parse(Buffer.concat(chunks).toString('utf8'))); } catch { reject(new Error('bad-json')); }
    });
    req.on('error', reject);
  });
}

function reply(res, status, body, headers = {}) {
  res.writeHead(status, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...headers });
  res.end(JSON.stringify(body));
}

async function sendMail(payload) {
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(8000),
  });
  if (!r.ok) throw new Error(`resend ${r.status}`);
}

export async function handleLead(req, res) {
  if (req.method !== 'POST') return reply(res, 405, { ok: false }, { Allow: 'POST' });

  const { RESEND_API_KEY, LEAD_TO_EMAIL } = process.env;
  const from = process.env.LEAD_FROM || 'KOR Bytes Web <web@kor-bytes.com>';
  if (!RESEND_API_KEY || !LEAD_TO_EMAIL) return reply(res, 503, { ok: false, error: 'not-configured' });

  // Solo desde nuestro propio sitio.
  try {
    const origin = req.headers.origin;
    if (origin && !ALLOWED_HOSTS.has(new URL(origin).hostname)) return reply(res, 403, { ok: false });
  } catch { return reply(res, 403, { ok: false }); }
  if (!String(req.headers['content-type'] ?? '').startsWith('application/json')) return reply(res, 415, { ok: false });

  const ip = clientIp(req);
  if (rateLimited(ip)) return reply(res, 429, { ok: false, error: 'rate' }, { 'Retry-After': '3600' });

  let body;
  try { body = await readJson(req); } catch { return reply(res, 400, { ok: false }); }

  // Trampas para bots: campo oculto lleno o formulario enviado demasiado rápido. Se responde "ok" para no darles pistas.
  const age = Date.now() - Number(body.t);
  if (clean(body.web, 50) || !(age >= MIN_FILL_MS && age <= MAX_AGE_MS)) return reply(res, 200, { ok: true });

  const nombre = clean(body.nombre, 80);
  const empresa = clean(body.empresa, 80);
  const necesidad = clean(body.necesidad, 120);
  const presupuesto = clean(body.presupuesto, 80);
  const detalle = clean(body.detalle, 1000);
  const origen = clean(body.origen, 120);
  const correo = clean(body.correo, 120);
  const telefono = clean(body.telefono, 30);

  if (!nombre) return reply(res, 422, { ok: false, error: 'nombre' });
  const correoOk = /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]{2,}$/.test(correo);
  if (correo && !correoOk) return reply(res, 422, { ok: false, error: 'correo' });
  if (telefono && !/^[0-9+()\-.\s]{7,30}$/.test(telefono)) return reply(res, 422, { ok: false, error: 'telefono' });

  const rows = [
    ['Nombre', nombre], ['Empresa', empresa], ['Necesita', necesidad], ['Presupuesto', presupuesto],
    ['Correo', correo], ['Teléfono', telefono], ['Contexto', detalle], ['Desde', origen],
  ].filter(([, v]) => v);

  const html = `<table cellpadding="6" style="font:15px/1.5 system-ui,sans-serif">${rows
    .map(([k, v]) => `<tr><td style="color:#666;vertical-align:top">${k}</td><td>${esc(v).replace(/\n/g, '<br>')}</td></tr>`)
    .join('')}</table>`;

  try {
    await sendMail({
      from,
      to: [LEAD_TO_EMAIL],
      ...(correoOk ? { reply_to: correo } : {}),
      subject: `Nuevo contacto web: ${nombre}${necesidad ? ` · ${necesidad}` : ''}`.slice(0, 150),
      html,
      text: rows.map(([k, v]) => `${k}: ${v}`).join('\n'),
    });
  } catch (err) {
    console.error('[lead] fallo al enviar:', err.message);
    return reply(res, 502, { ok: false, error: 'send' });
  }

  // Confirmación al visitante: si falla no importa, el aviso a KOR Bytes ya salió.
  if (correoOk) {
    sendMail({
      from,
      to: [correo],
      subject: 'Recibimos tu mensaje · KOR Bytes',
      html: `<p style="font:15px/1.6 system-ui,sans-serif">Hola ${esc(nombre)}, recibimos tu solicitud. Te respondemos en horario laboral por WhatsApp o correo.</p><p style="font:15px/1.6 system-ui,sans-serif">— KOR Bytes · Sincelejo, Colombia<br>https://kor-bytes.com</p>`,
      text: `Hola ${nombre}, recibimos tu solicitud. Te respondemos en horario laboral por WhatsApp o correo.\n\n— KOR Bytes · Sincelejo, Colombia\nhttps://kor-bytes.com`,
    }).catch((err) => console.error('[lead] fallo confirmación:', err.message));
  }

  reply(res, 200, { ok: true });
}
