import type { Props as SEOProps } from "astro-seo";
import type { CollectionEntry } from "astro:content";

export interface PreloadAttributes {
  href: string;
  as?: "font" | "fetch" | "style" | "script";
  crossorigin?: string;
  type?: string;
}

export type Preload = PreloadAttributes | string;

export type OpenGraphProps = SEOProps["openGraph"];

export type TwitterProps = SEOProps["twitter"];

export type SEOData = CollectionEntry<"seo">["data"];

export type MetaImage = SEOData["image"];
