// @ts-check
import { defineConfig } from "astro/config";

import { FileSystemIconLoader } from "unplugin-icons/loaders";

import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import Icons from "unplugin-icons/vite";

// https://astro.build/config
export default defineConfig({
  site: "http://TODO.com",
  vite: {
    assetsInclude: [/\.riv$/],
    plugins: [
      Icons({
        compiler: "jsx",
        customCollections: {
          assets: FileSystemIconLoader("./src/assets/svg"),
        },
      }),
    ],
  },
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    mdx(),
    sitemap(),
  ],
  output: "hybrid",
  adapter: vercel(),
});
