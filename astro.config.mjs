// @ts-check
import { defineConfig } from "astro/config";

import { FileSystemIconLoader } from "unplugin-icons/loaders";

import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import icons from "unplugin-icons/vite";

// https://astro.build/config
export default defineConfig({
  site: "http://TODO.com",
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
  integrations: [react(), mdx(), sitemap()],
  output: "static",
  adapter: vercel(),
});
