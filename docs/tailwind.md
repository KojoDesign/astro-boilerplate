# Adding new Tailwind Colors

By default, this repo follows `shadcn-ui`'s [CSS theming and variable names](https://ui.shadcn.com/docs/theming). These probably should not be renamed at all, in order to keep `shadcn-ui` working correctly.

These variables are defined and configured in [`global.css`](../src/styles/global.css) and referenced in the Tailwind config.

New colors should be added as CSS variables in HSL format, then referenced or aliased in the semantic colors.

For example:

```css
--black: 0 0% 100%;
--foreground: var(--black);
--subtle: hsl(var(--black) / 0.5);
```
