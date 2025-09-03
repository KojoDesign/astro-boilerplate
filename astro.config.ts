import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import favicons from "astro-favicons";
import robots from "astro-robots";
import { FileSystemIconLoader } from "unplugin-icons/loaders";
import icons from "unplugin-icons/vite";

const ORIGIN = "TODO.com";

// https://astro.build/config
export default defineConfig({
  site: `https://${ORIGIN}`,
  vite: {
    assetsInclude: [/\.riv$/],
    plugins: [
      // @ts-expect-error https://github.com/withastro/astro/issues/14030
      tailwindcss(),
      // @ts-expect-error
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
