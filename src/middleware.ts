import unhead from "astro-unhead/middleware";
import { SITE_ORIGIN } from "astro:env/client";
import { CanonicalPlugin, InferSeoMetaPlugin } from "unhead/plugins";

export const onRequest = unhead({
  plugins: [CanonicalPlugin({ canonicalHost: SITE_ORIGIN }), InferSeoMetaPlugin()],
  init: [
    {
      link: [
        {
          rel: "sitemap" as const,
          type: "application/xml",
          title: "Sitemap",
          href: "/sitemap-index.xml",
        },
      ],
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width,initial-scale=1" },
      ],
    },
  ],
});
