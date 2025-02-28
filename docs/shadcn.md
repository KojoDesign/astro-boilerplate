# Creating UI components

Most UI components will be created via `[shadcn-ui]`, which has been aliased to `ui` script in this repo.

Simply a command such as

```bash
pnpm ui add button
```

to automatically install a new button component to `src/components/ui`.

Be sure to rename it to use React's recommended casing (PascalCase) before committing, as well as review the [best practices](./best-practices.md) when dealing with React in Astro.

Note that any imported React components that feature interactivity or components that use React context will need to be hydrated using an Astro [client directive](https://docs.astro.build/en/reference/directives-reference/#client-directives).

**For more info on `shadcn-ui`, [read the official docs](https://ui.shadcn.com/docs).**
