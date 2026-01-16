# Adding custom fonts

This repository uses **Astro's experimental fonts API** with Google Fonts provider for loading custom fonts.

## Adding a font

Add the font configuration to `astro.config.ts`:

```ts
export default defineConfig({
  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: "Inter",
        cssVariable: "--font-inter",
        weights: ["400 700"],
      },
      // Add more fonts here
    ],
  },
  // ... rest of config
});
```

## Preloading fonts

Fonts are preloaded in `BaseHead.astro` using the `Font` component:

```astro
---
import { Font } from "astro:assets";
---

<Font cssVariable="--font-inter" preload />
```

## Using fonts in CSS

Reference the font via its CSS variable in your styles:

```css
body {
  font-family: var(--font-inter), system-ui, sans-serif;
}
```

Preloading fonts prevents a fallback font from flashing before your custom font loads (FOUT - Flash of Unstyled Text).
