import { defineConfig } from "astro/config";
import { FileSystemIconLoader } from "unplugin-icons/loaders";

import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import icons from "unplugin-icons/vite";
import favicons from "astro-favicons";
import robots from "astro-robots";

const ORIGIN = "TODO.com";

// https://astro.build/config
export default defineConfig({
  site: `https://${ORIGIN}`,
  vite: {
    assetsInclude: [/\.riv$/],
    plugins: [
      tailwindcss(),
      icons({
        compiler: "jsx",
        customCollections: {
          assets: FileSystemIconLoader("./src/assets/svg"),
        },
      }),
    ],
  },
  integrations: [
    react(),
    mdx(),
    sitemap(),
    favicons(),
    robots({
      host: ORIGIN,
      sitemap: [
        `https://${ORIGIN}/sitemap-index.xml`,
        `https://www.${ORIGIN}/sitemap-index.xml`,
      ],
      policy: [
        {
          userAgent: [
            "Applebot",
            "Googlebot",
            "bingbot",
            "Yandex",
            "Yeti",
            "Baiduspider",
            "360Spider",
            "*",
          ],
          allow: ["/"],
          disallow: ["/admin", "/login"],
          crawlDelay: 5,
        },
        {
          userAgent: "BLEXBot",
          disallow: ["/"],
        },
      ],
    }),
  ],
  output: "static",
  adapter: vercel(),
});
