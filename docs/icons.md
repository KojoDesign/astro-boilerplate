# Using Icons & SVGs

This repository using the [unplugin-icons](https://github.com/unplugin/unplugin-icons) Vite plugin to automatically optimize and provide SVG icons as React components on-demand.

It allows you to pull in thousands icons from [Iconify](https://iconify.design) via NPM packages, as well as any custom SVG you place inside `src/assets/svg` inside this repo.

**It's always recommended you leverage this plugin over inlining SVGs anywhere in Astro or React components (unless you're modifying or animating it programmatically).**

## Importing Iconify icons

First, install the Iconify JSON package for the icon pack you'd like to use:

```bash
pnpm add @iconify-json/mdi # Adds the Material Design Icons pack
```

then use it Astro or React components:

```ts
import Close from "~icons/mdi/close";
```

## Import local SVGs

Place your SVG inside the `src/assets/svg` directory (not created by default), then import it:

```ts
import Logo from "~icons/assets/logo";
```

---

**For more info, [read the docs](https://github.com/unplugin/unplugin-icons)**.
