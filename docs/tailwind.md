# Adding new Tailwind Colors

This repository uses **Tailwind CSS 4** with the `@tailwindcss/vite` plugin, meaning the site's theme is controlled entirely by CSS variables.

## Theme configuration

Colors are defined in `src/styles/global.css`:

- `:root` - Light mode colors (using OKLCH color space)
- `.dark` - Dark mode colors
- `@theme inline` - Maps CSS variables to Tailwind utilities

This repo follows `shadcn-ui`'s [CSS theming and variable names](https://ui.shadcn.com/docs/theming). Avoid renaming these variables to keep `shadcn-ui` components working correctly.

## Adding a new color

Add the variable to both `:root` and `.dark` in `global.css`:

```css
:root {
  --my-custom-color: oklch(0.7 0.2 250);
}

.dark {
  --my-custom-color: oklch(0.3 0.15 250);
}
```

Then map it in the `@theme inline` block:

```css
@theme inline {
  --color-my-custom: var(--my-custom-color);
}
```

Now use it in your components: `text-my-custom`, `bg-my-custom`, etc.
