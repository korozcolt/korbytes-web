import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

const site = "https://kor-bytes.com";

const buildDate = new Date().toISOString();

export default defineConfig({
  site,
  output: "static",
  build: {
    format: "preserve",
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
