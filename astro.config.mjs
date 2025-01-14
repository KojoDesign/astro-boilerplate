// @ts-check
import { defineConfig } from "astro/config";

import {
  ExternalPackageIconLoader,
  FileSystemIconLoader,
} from "unplugin-icons/loaders";

import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
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
  integrations: [react(), mdx(), sitemap()],
  output: "static",
  adapter: vercel(),
});
