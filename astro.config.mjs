import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";

const site = "https://kor-bytes.com";

const buildDate = new Date().toISOString();

export default defineConfig({
  site,
  output: "static",
  build: {
    format: "preserve",
    // El sitio es pequeño (~28KB de CSS total): inlinear evita 2 peticiones
    // de hoja de estilo bloqueantes en el <head> (una duplicaba toda la
    // paleta --kb-* solo por el botón de WhatsApp) que retrasaban el
    // primer paint y el LCP bajo 4G lenta.
    inlineStylesheets: "always",
  },
  // Fuentes autoalojadas en el build (sin viaje a Google en producción): menos peticiones,
  // sin cambio tardío de tipografía (mejor LCP y CLS) y métricas de respaldo ajustadas.
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Familjen Grotesk",
      cssVariable: "--font-familjen",
      weights: ["500 700"],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["Inter Tight", "system-ui", "sans-serif"],
    },
    {
      provider: fontProviders.google(),
      name: "Inter Tight",
      cssVariable: "--font-inter",
      weights: ["400 600"],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["system-ui", "sans-serif"],
    },
    {
      provider: fontProviders.google(),
      name: "JetBrains Mono",
      cssVariable: "--font-mono",
      weights: ["400 700"],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["ui-monospace", "monospace"],
    },
  ],
  integrations: [
    sitemap({
      serialize(item) {
        item.lastmod = buildDate;
        return item;
      },
    }),
  ],
});
