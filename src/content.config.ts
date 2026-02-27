import { defineCollection, z, reference } from "astro:content";
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

const seo = defineCollection({
  schema: ({ image }) =>
    z.union([
      z.object({
        kind: z.literal("basic"),
        title: z.string(),
        description: z.string(),
        image: image().optional(),
      }),
      z.object({
        kind: z.literal("twitter"),
        card: z
          .enum(["summary", "summary_large_image", "app", "player"])
          .default("summary_large_image"),
        site: z.string().optional(),
        creator: z.string().optional(),
        title: z.string().optional(),
        description: z.string().optional(),
        image: z
          .object({
            url: image(),
            alt: z.string(),
          })
          .optional(),
      }),
      z.object({
        kind: z.literal("opengraph"),
        title: z.string().optional(),
        description: z.string().optional(),
        type: openGraphType.default("website"),
        image: z
          .object({
            url: image(),
            alt: z.string(),
          })
          .optional(),
        audio: z
          .string()
          .url()
          .describe("A URL to an audio file to accompany this object.")
          .optional(),
        determiner: z
          .string()
          .describe(
            'The word that appears before this object\'s title in a sentence. An enum of (a, an, the, "", auto). If auto is chosen, the consumer of your data should choose between \"a\" or \"an\". Default is \"\" (blank).',
          )
          .optional(),
        locale: z
          .string()
          .describe(
            "The locale these tags are marked up in. Of the format language_TERRITORY. Default is en_US.",
          )
          .optional(),
        localeAlternate: z
          .array(z.string())
          .describe("An array of other locales this page is available in.")
          .optional(),
        siteName: z
          .string()
          .optional()
          .describe(
            'If your object is part of a larger web site, the name which should be displayed for the overall site. e.g., "IMDb".',
          ),
        video: z
          .string()
          .url()
          .describe("A URL to a video file that complements this object.")
          .optional(),
      }),
    ]),
  loader: glob({
    // generateId: ({ data }) => z.object({ kind: z.string() }).parse(data).kind,
    pattern: "*.yml",
    base: "src/data/seo",
  }),
});

export const collections = {
  authors,
  seo,
  blog,
};
