import { defineCollection, reference, type ImageFunction } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const authors = defineCollection({
  loader: glob({ pattern: "authors/*.yml", base: "src/data" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      image: image(),
      linkedin: z.string(),
    }),
});

const blog = defineCollection({
  loader: glob({ pattern: "blog/*.{mdx,md}", base: "src/data" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      subtitle: z.string().optional(),
      date: z.date(),
      authors: z
        .array(reference("authors"))
        .transform((authors) => Array.from(new Set(authors))),
      image: image(),
      draft: z.boolean().default(false),
    }),
});

const openGraphType = z.enum([
  "website",
  "music.song",
  "music.album",
  "music.playlist",
  "music.radio_station",
  "video.movie",
  "video.episode",
  "video.tv_show",
  "video.other",
  "article",
  "book",
  "payment.link",
  "profile",
]);

const metaImage = (image: ImageFunction) =>
  z.object({
    src: image(),
    alt: z.string(),
  });

const seo = defineCollection({
  loader: glob({ pattern: "seo.yml", base: "src/data" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      siteName: z.string(),
      description: z.string(),
      image: metaImage(image),
      twitter: z
        .object({
          card: z.enum(["summary", "summary_large_image", "app", "player"]),
          site: z.string(),
          creator: z.string(),
          title: z.string(),
          description: z.string(),
          image: metaImage(image),
        })
        .partial()
        .optional(),
      opengraph: z
        .object({
          title: z.string(),
          description: z.string(),
          type: openGraphType,
          image: metaImage(image),
          audio: z.url(),
          determiner: z.string(),
          locale: z.string(),
          localeAlternate: z.array(z.string()),
          siteName: z.string(),
          video: z.url(),
        })
        .partial()
        .optional(),
    }),
});

export const collections = {
  authors,
  seo,
  blog,
};
