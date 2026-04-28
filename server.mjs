import { createServer } from 'node:http';
import { createReadStream, statSync } from 'node:fs';
import { join, extname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const distDir = resolve(__dirname, 'dist');
const PORT = process.env.PORT ?? 4321;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.woff2':'font/woff2',
  '.woff': 'font/woff',
  '.ttf':  'font/ttf',
  '.xml':  'application/xml',
  '.txt':  'text/plain; charset=utf-8',
  '.pdf':  'application/pdf',
};

const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: https:",
  "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ');

const SECURITY_HEADERS = {
  'Strict-Transport-Security':  'max-age=31536000; includeSubDomains; preload',
  'X-Content-Type-Options':     'nosniff',
  'X-Frame-Options':            'SAMEORIGIN',
  'X-XSS-Protection':           '1; mode=block',
  'Referrer-Policy':             'strict-origin-when-cross-origin',
  'Permissions-Policy':          'camera=(), microphone=(), geolocation=()',
  'Content-Security-Policy':     CSP,
};

function tryFile(p) {
  try { return statSync(p).isFile() ? p : null; } catch { return null; }
}

function resolve404() {
  return tryFile(join(distDir, '404.html'));
}

function serveFile(filePath, statusCode, res) {
  const ext = extname(filePath).toLowerCase();
  const contentType = MIME[ext] || 'application/octet-stream';
  Object.entries(SECURITY_HEADERS).forEach(([k, v]) => res.setHeader(k, v));
  res.setHeader('Content-Type', contentType);
  if (ext === '.html') {
    res.setHeader('Cache-Control', 'no-cache, must-revalidate');
  } else {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  }
  res.statusCode = statusCode;
  createReadStream(filePath).pipe(res);
}

createServer((req, res) => {
  let urlPath = req.url.split('?')[0].split('#')[0];

  if (urlPath !== '/' && urlPath.endsWith('/')) {
    res.writeHead(301, { Location: urlPath.slice(0, -1) });
    res.end();
    return;
  }

  const base = join(distDir, urlPath);
  const found = tryFile(base)
    ?? tryFile(base + '.html')
    ?? tryFile(join(base, 'index.html'));

  if (found) {
    serveFile(found, 200, res);
  } else {
    const page404 = resolve404();
    if (page404) {
      serveFile(page404, 404, res);
    } else {
      res.statusCode = 404;
      res.end('Not found');
    }
  }
}).listen(PORT, '0.0.0.0', () => {
  console.log(`KOR Bytes serving on http://0.0.0.0:${PORT}`);
});
