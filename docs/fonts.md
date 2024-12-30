# Adding custom fonts

This repository uses [Fontsource](https://fontsource.org/) to import custom fonts from [Google Fonts](https://fonts.google.com), preferring variable fonts where possible. If you can't find the font under the `@fontsource-variable` org, just use the non-variable version under `@fontsource`. Make sure to check the proper font name under the Fontsource website!

To add a new font, first add it via NPM:

```bash
pnpm add @fontsource-variable/inter
```

Modify the [`global.css`](../src/styles/global.css) file to reference your new font:

```css
--font-sans: Inter Variable, Arial, Helvetica, sans-serif;
```

Then, import and preload it into the layout that will be using the font:

```astro
---
import inter from "@fontsource-variable/inter";
import interFile from "@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url";
---

<BaseLayout preloadAssets={[interFile]} />
```

Preloading your font will prevent a fallback font from flashing before your custom font loads. You can learn more about preloading [here](https://fontsource.org/docs/getting-started/preload).

[`BaseLayout`](../src/layouts//BaseLayout.astro) passes its props directly into `BaseHead`, so if you end up modifying `BaseLayout` to preload your font at the highest level, be sure to merge the `preloadAssets` prop with the array of fonts you wish to preload. For most websites, it's actually recommended you load all site-wide fonts inside of `BaseLayout`.
