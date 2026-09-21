import { defineConfig } from "astro/config";
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
  integrations: [
    sitemap({
      serialize(item) {
        item.lastmod = buildDate;
        return item;
      },
    }),
  ],
});
