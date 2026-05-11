import type {
  OpenGraphProps,
  Preload,
  PreloadAttributes,
  SEOData,
  TwitterProps,
} from "./types";

/**
 * Combines any overrides and fallbacks to create a uniform object of OpenGraph props for astro-seo
 *
 * @param props The raw props passed to the <Meta /> component
 * @param seo An Astro `seo` content collection entry
 * @param url URL of the current page (Astro.url)
 *
 * @returns OpenGraphProps
 */
export function getTwitterProps(seo: SEOData): TwitterProps {
  const {
    twitter: {
      card = "summary_large_image",
      image: twitterImage,
      ...twitter
    } = {},
    siteName,
    ...fallback
  } = seo;

  const {
    src: { src: image },
    alt: imageAlt,
  } = twitterImage ?? fallback.image;

  return {
    ...twitter,
    card,
    image,
    imageAlt: imageAlt,
    site: siteName,
    title: twitter?.title ?? fallback.title,
    description: twitter.description ?? fallback.description,
  };
}

/**
 * Combines any overrides and fallbacks to create a uniform object of OpenGraph props for astro-seo
 *
 * @param seo An Astro `seo` content collection entry
 * @param url URL of the current page (Astro.url)
 *
 * @returns OpenGraphProps
 */
export function getOpenGraphProps(seo: SEOData, url: URL): OpenGraphProps {
  const {
    opengraph: {
      siteName,
      description,
      image: openGraphImage,
      ...opengraph
    } = {},
    ...fallback
  } = seo;

  const { src: imageSrc, alt: imageAlt } = openGraphImage ?? fallback.image;

  const image = {
    width: imageSrc?.width,
    height: imageSrc?.height,
    type: imageSrc?.format,
    url: imageSrc?.src,
    alt: imageAlt,
  };

  return {
    basic: {
      title: opengraph?.title ?? fallback.title,
      type: opengraph?.type ?? "website",
      image: image?.url,
      url,
    },
    optional: {
      ...opengraph,
      siteName: siteName ?? fallback.siteName,
      description: description ?? fallback.description,
    },
    image,
  };
}

/**
 * Transforms a list of preload props into the proper link objects needed by astro-seo
 *
 * @param preloads A list of Preloads to transform
 *
 * @returns The transformed object
 */
export function getPreloadLinks(preloads: Preload[]) {
  return preloads.map((link) => {
    let { href, as, crossorigin, type }: PreloadAttributes =
      typeof link === "string" ? { href: link } : link;

    const ext = href.split(".").pop();

    if (!as) {
      switch (ext) {
        case "css":
          as = "style";
          break;
        case "js":
          as = "script";
          break;
        case "ttf":
        case "otf":
        case "woff":
        case "woff2":
          as = "font";
          break;
        default:
          as = "fetch";
          break;
      }
    }

    type ??= as ? `${as}/${ext}` : undefined;

    return {
      rel: "preload",
      href,
      type,
      crossorigin,
    };
  });
}
