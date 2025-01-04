import rss from "@astrojs/rss";

import { getCollection } from "astro:content";
import type { APIRoute } from "astro";

import { BLOG_DESCRIPTION, BLOG_TITLE } from "@/consts";

export const GET: APIRoute = async (context) => {
  const posts = await getCollection("blog");
  return rss({
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    site: context.site ?? "",
    items: posts.map(({ data: { title, subtitle, date }, id }) => ({
      title,
      description: subtitle,
      pubDate: date,
      link: `/blog/${id}/`,
    })),
  });
};
