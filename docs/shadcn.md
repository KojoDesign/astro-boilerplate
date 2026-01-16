# Creating UI components

Most UI components will be created via `shadcn-ui`, which has been aliased to the `ui` script in this repo.

Simply run a command such as:

```bash
bun ui button
```

This will automatically install a new button component to `src/components/ui` **and rename it to PascalCase** (the script handles this automatically via `scripts/add-component.ts`).

Review the [best practices](./best-practices.md) when dealing with React in Astro.

Note that any imported React components that feature interactivity or components that use React context will need to be hydrated using an Astro [client directive](https://docs.astro.build/en/reference/directives-reference/#client-directives).

This repository uses the `base-vega` style variant, which is built on Base UI components (not Radix UI). The icon library is set to `lucide-react`.

**For more info on `shadcn-ui`, [read the official docs](https://ui.shadcn.com/docs).**
