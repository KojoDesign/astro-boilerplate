import { defineCollection, reference, z } from "astro:content";
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

export const collections = {
  authors,
  blog,
};
