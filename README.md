# Kojo's Marketing Site Starter Kit

This repository contains everything you need to start and maintain a SEO-ready, performance-optimized marketing website you can customize to your hearts desire!

To get started, simply hit the "Use This Template" button on this repo to start your own project with this boilerplate.

## What's Inside

### Building Blocks

- 📦 **[pnpm](https://pnpm.io)** for package management, as it's much faster and more performant than NPM. It's configured using Corepack, so you should be able to install it via `corepack enable` (this command comes with Node).
- 🚀 **[Astro](https://astro.build)**, a framework for creating highly-versatile and extremely performance webpages. It comes packed with a boatload of features such as partial hydration, content collections, and server endpoints. [See here](https://docs.astro.build/en/concepts/why-astro/) for more.
- ⚛️ **[React](https://react.dev)** for creating interactive component highlands that leverage React's booming ecosystem.
- 👷 **[TypeScript](https://www.typescriptlang.org/)** for writing type-safe, maintainable code.

### UI & Styling

- 🪁 **[Tailwind CSS](https://tailwindcss.com)** for modular, consistent CSS styling. Includes plugins such as [tailwindcss-typography](https://github.com/tailwindlabs/tailwindcss-typography) and [tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate).
- 🔠 **[Fontsource](https://fontsource.org/)** for loading custom fonts. These can be preloaded via the `preload` prop of [`BaseLayout`](src/layouts/BaseLayout.astro).
- 📥 **[shadcn-ui](https://ui.shadcn.com/)** for rapidly adding pre-configured UI components to your website.
- 🦄 **[unplugin-icons](https://github.com/unplugin/unplugin-icons)** for easily inlining thousands of on-demand icons in Astro and React components.
- ⚒️ Pre-built custom components such as [Typography](src/components/ui/Typography.tsx) and [Stack](src/components/ui/Stack.tsx).

### Animations

- 🚥 **[Rive](https://rive.app)** for embedding highly performant, interactive animations on your site.
- 🏃 **[Motion](https://motion.dev)** (formerly Framer Motion) for creating realistic spring animations in JavaScript.

### Developer Experience

- 📝 **[biome](biomejs.dev)** for lightning-fast linting in JavaScript and TypeScript (written in Rust)
- 🎨 **[Prettier](prettier.io)** for opinionated formatting (only used because Biome's HTML formatting is [incomplete](https://biomejs.dev/internals/language-support/)).
- 🐶 **[Husky](https://github.com/typicode/husky)** with **[lint-staged](https://github.com/lint-staged/lint-staged)** to automatically run linting on new commits.

## Opinionated Decisions

This repo makes a few strong changes to how Tailwind operates that are worth being aware of.

These decisions may change in the future, but for now this is how the boilerplate is configured:

- **The entire default palette of Tailwind has been replaced by _only_ the color names specified in [`global.css`](src/styles/global.css).** This helps prevent the use of off-brand or incorrect colors throughout the project.
- **The default Tailwind type scale has been swapped out for [Material Design 3's type scale](https://m3.material.io/styles/typography/overview).** This allows us to closely align the font sizes with the typography variants specified in [`Typography.tsx`](src/components/ui/Typography.tsx).
- **The default `lg:`, `md:` and `sm:` breakpoint variants have been swapped out for `phone:`, `tablet:` and `laptop:` variants.** Unlike the defaults, these apply to screens matching the current breakpoint _and below_. For example, `tablet:` will apply to only tablet and phone screens.

## Guides

- [Best Practices](docs/best-practices.md)
- [Creating UI components](docs/shadcn.md)
- [Adding new Tailwind colors](docs/tailwind.md)
- [Using custom fonts](docs/fonts.md)
- [Using icons & SVGs](docs/icons.md)
- [Using Motion](docs/motion.md)
- [Using Rive](docs/rive.md)
- [Deploying](docs/deploying.md)

### Using Astro

- [Adding Images in Astro](https://docs.astro.build/en/guides/images)
- [Using Astro Content Collections](https://docs.astro.build/en/guides/content-collections/) (useful for blogs and articles)
