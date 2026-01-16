# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development

- `bun dev` or `bun start` - Start Astro development server
- `bun build` - Run Astro type checking and build for production
- `bun preview` - Preview production build locally
- `bun check` - Run Astro type checking only

### Linting & Formatting

- `bun lint` - Run oxlint with type-aware checking
- Pre-commit hook (via Husky) automatically runs `bun x lint-staged` on staged files

### UI Components

- `bun ui <component-name>` - Add shadcn-ui component (auto-renames to PascalCase via `scripts/add-component.ts`)
  - Example: `bun ui button`
- `bun utils` - Run atmx utilities (Note: uses pnpm dlx under the hood)

### Storybook

- `bun storybook:dev` - Start Storybook on port 6006
- `bun storybook:build` - Build Storybook for production

## Architecture

### Tech Stack

- **Astro 5** - Static site framework with partial hydration
- **React 19** - For interactive islands (use sparingly, prefer Astro)
- **TypeScript 5.9** - Strict mode enabled
- **Tailwind CSS 4** - CSS-based configuration (no JS config file)
- **Base UI** - Unstyled component primitives (used by shadcn components)
- **Bun** - Package manager and runtime
- **oxlint** - Fast Rust-based linter with type-awareness
- **Prettier** - Code formatter

### Project Structure

```
src/
├── components/
│   ├── ui/              # Base UI components from shadcn (React, PascalCase)
│   ├── BaseHead.astro   # SEO and meta tags
│   ├── InView.astro     # Intersection observer wrapper
│   ├── Navigation.tsx   # Site navigation
│   ├── Rive.tsx         # Rive animation wrapper
│   └── ...
├── layouts/
│   └── BaseLayout.astro # Root layout with BaseHead
├── pages/               # File-based routing
│   ├── blog/            # Blog routes
│   ├── index.astro      # Homepage
│   └── robots.txt.ts    # Robots.txt endpoint
├── content/
│   └── config.ts        # Content collections schema (authors, blog)
├── lib/
│   ├── utils.ts         # cn(), cssVars() utilities
│   └── units.ts         # CSS unit helpers (px, rem, url, etc.)
├── hooks/               # React hooks
├── stories/             # Storybook stories
├── styles/
│   ├── global.css       # Tailwind imports & theme definitions
│   ├── theme.css        # CSS variables for colors
│   └── utilities.css    # Custom utilities
└── assets/
    └── svg/             # Custom SVG icons (used with unplugin-icons)
```

### Import Paths

Always use `@/` alias for imports (points to `src/`):

```ts
import { Button } from "@/components/ui/Button"; // ✅
import { Button } from "../../components/ui/Button"; // ❌
```

### When to Use React vs Astro

**Prefer `.astro` components by default.** Only use React (`.tsx`) when:

1. **Adding to `src/components/ui/`** - These are shadcn components that use Base UI primitives
2. **Using React Context** - Context doesn't work across Astro islands
3. **Using `asChild` prop** - Radix UI's composition pattern requires React children

**React components need hydration directives:**

```astro
<MyReactComponent client:load />
<MyReactComponent client:visible />
<MyReactComponent client:idle />
```

### Styling with Tailwind CSS 4

- **No JS config file** - Configuration is CSS-based in `src/styles/global.css`
- **Theme via CSS variables** - Colors defined in `:root` and `.dark` in `global.css`
- **Uses OKLCH color space** - Modern color definition
- **Custom variants**: `dark`, `in-view`
- **Utility helpers**:
  - `cn(...classes)` - Merge Tailwind classes with conflict resolution
  - `cssVars({ name: value })` - Convert object to CSS custom properties

### Content Collections

Defined in `src/content/config.ts` using glob loader:

```ts
// Blog posts: src/data/blog/*.{md,mdx}
const blog = defineCollection({
  loader: glob({ pattern: "blog/*.{mdx,md}", base: "src/data" }),
  schema: { title, date, authors, image, draft, ... }
});

// Authors: src/data/authors/*.yml
const authors = defineCollection({
  loader: glob({ pattern: "authors/*.yml", base: "src/data" }),
  schema: { name, image, linkedin }
});
```

**Note:** `src/data/` directory does not exist by default - create it when adding content.

### Icon System

Uses **unplugin-icons** for automatic SVG optimization:

```ts
// Iconify icons (requires @iconify-json/<pack> package)
import Close from "~icons/mdi/close";

// Custom SVGs from src/assets/svg/
import Logo from "~icons/assets/logo";
```

Always prefer this over manual SVG inlining unless you need to animate/modify the SVG programmatically.

### shadcn-ui Components

- **Style**: `base-vega` (Base UI variant)
- **Icon library**: `lucide-react`
- **Add components**: `bun ui button` - automatically renames to PascalCase
- **Config**: `components.json`
- **Custom registry**: `@magicui` for additional components

Component structure:

```tsx
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva("...", { variants: { ... } });

export function Button({ variant, size, ...props }: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return <ButtonPrimitive className={cn(buttonVariants({ variant, size }))} {...props} />;
}
```

### Fonts

Uses **Astro's experimental fonts API** with Google Fonts:

```ts
// astro.config.ts
experimental: {
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Inter",
      cssVariable: "--font-inter",
      weights: ["400 700"],
    },
  ];
}
```

Preload in `BaseHead.astro`:

```astro
<Font cssVariable="--font-inter" preload />
```

### Animations

- **Motion** (formerly Framer Motion) - `motion/react` for React, vanilla API in Astro `<script>` tags
- **Rive** - WebGL2 animations (`.riv` files configured in Vite)
- **tw-animate-css** - Tailwind animation utilities
- Prefer Tailwind `animate-*` classes for simple animations

### Images

Use Astro's optimized `Image` component:

```astro
import {Image} from "astro:assets"; import myImage from "@/assets/image.jpg";

<Image src={myImage} alt="..." />
```

For background images, use `getImage()`:

```astro
---
import { getImage } from "astro:assets";
import { cssVars } from "@/lib/utils";
import { url } from "@/lib/units";

import background from "@/assets/background.png";

const optimized = await getImage({ src: background });
---

<div style={cssVars({ bg: url(optimized.src) })} class="bg-(url:--bg)"></div>
```

### SEO & Deployment

- **Adapter**: Vercel (`output: "static"`)
- **SEO**: `astro-seo` package in `BaseHead.astro`
- **Sitemap**: Auto-generated via `@astrojs/sitemap`
- **Robots**: Configured via `astro-robots` integration
- **Favicons**: Auto-generated via `astro-favicons`
- **Site URL**: Set `ORIGIN` constant in `astro.config.ts` (currently `"TODO.com"`)

## Key Conventions

### Slots Over Props

When passing content to React components from Astro, use named slots:

```astro
<!-- ✅ Prefer slots -->
<MyComponent>
  <Icon slot="icon" />
  <Content slot="content" />
  Default content
</MyComponent>

<!-- ❌ Avoid props -->
<MyComponent icon={(<Icon />)} content={(<Content />)}>
  Default content
</MyComponent>
```

### DRY in Astro

Use frontmatter for data transformation (doesn't ship to client):

```astro
---
const items = ["Item 1", "Item 2", "Item 3"];
---

<ul>
  {items.map((item) => <li>{item}</li>)}
</ul>
```

### CSS Units Helpers

Use helpers from `@/lib/units` for type-safe CSS values:

```ts
import { px, rem, url, variable, reference } from "@/lib/units";

cssVars({
  height: px(100),
  margin: rem(2),
  bg: url("/image.jpg"),
});
```

## Linting & Pre-commit

- **Husky** manages Git hooks
- **lint-staged** runs on pre-commit (via `bun x lint-staged`):
  - `*.{js,jsx,ts,tsx,mjs}` → oxlint (type-aware) + prettier
  - `*.{astro,mdx,md,html,postcss,css,json}` → prettier

## Requirements

- **Node.js**: 22+ (see `engines` in package.json)
- **Package manager**: Bun (primary package manager and runtime)
- **TypeScript**: Strict mode with Astro presets
