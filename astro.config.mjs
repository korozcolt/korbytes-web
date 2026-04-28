import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

const site = "https://kor-bytes.com";
const directoryRoutes = new Set(["/ecosistema-pass", "/servicios", "/casos", "/ubicaciones"]);

export default defineConfig({
  site,
  output: "static",
  build: {
    format: "preserve",
  },
  integrations: [
    sitemap({
      serialize(item) {
        const url = new URL(item.url);

        if (url.pathname !== "/") {
          url.pathname = directoryRoutes.has(url.pathname)
            ? `${url.pathname}/`
            : `${url.pathname}.html`;
        }

        item.url = url.toString();
        return item;
      },
    }),
  ],
});
