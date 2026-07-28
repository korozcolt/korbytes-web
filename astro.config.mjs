import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

const site = "https://kor-bytes.com";

export default defineConfig({
  site,
  output: "static",
  build: {
    format: "preserve",
  },
  integrations: [sitemap()],
});
