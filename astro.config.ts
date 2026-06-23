import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";
import favicons from "astro-favicons";
import robots from "astro-robots";
import icons from "unplugin-icons/vite";

const ORIGIN = process.env.ORIGIN ?? "example.com";

// https://astro.build/config
export default defineConfig({
  site: `https://${ORIGIN}`,
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Inter",
      cssVariable: "--ff-sans",
      weights: ["400 700"],
    },
  ],
  vite: {
    assetsInclude: [/\.riv$/],
    plugins: [tailwindcss(), icons({ compiler: "jsx" })],
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
