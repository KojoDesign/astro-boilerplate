# Best Practices

While this repository is entirely yours to modify as you see fit, there are a handful of best practices I use when working with Astro you may find helps you write cleaner and more maintainable code.

## Import from `@`

Similar to NextJS, this repo is configured to point `@` to `src`, saving you from relative import hell. Always prefer `@`, unless you're importing code in the same directory.

### ❌ Don't

```ts
import "../../../../components/ui/Button.tsx";

import "./Hero.astro";
```

### ✅ Do

```ts
import "@/components/ui/Button.tsx";

import "./Hero.astro";
```

## Don't repeat yourself.

One of the nice things about Astro is that any JavaScript you write in the frontmatter _won't_ be shipped to the frontend.

So instead of copy-and-pasting the same HTML blocks over-and-over, you can define objects and arrays in the frontmatter, then traverse over them to render the HTML. Alternatively, you could define a component to create consistency.

### ❌ Don't

```astro
<ul>
  <li class="text-foreground/50 rounded-full">Item 1</li>
  <li class="text-foreground/50 rounded-full">Item 2</li>
  <li class="text-foreground/50 rounded-full">Item 3</li>
</ul>
```

### ✅ Do

```astro
---
const items = ["Item 1", "Item 2", "Item 3"];
---

<ul>
  {items.map((item) => <li class="text-foreground/50 rounded-full">{item}</li>)}
</ul>
```

or

```astro
---
import ListItem from "@/components/ListItem.astro";
---

<ul>
  <ListItem>Item 1</ListItem>
  <ListItem>Item 2</ListItem>
  <ListItem>Item 3</ListItem>
</ul>
```

## Prefer Astro over React

Always prefer `.astro` components where possible, as you'll be able to benefit from all of Astro's best features.

That said, there are times when you should be using React:

1. **If you're adding a component to the `ui` directory.** This code is (mostly) going to be from `shadcn-ui`, but more importantly it's intended to for potential reuse across application code for teams using NextJS (or a similar React framework).
2. **If you need to use context.** Sadly, React Context doesn't work across Astro islands, so if you are defining context anywhere on the page, it needs to be a React component, and every child needs to be in React as well. This becomes especially critical when attempting to use [motion](./motion.md) with [`MotionProvider`](../src/components/MotionProvider.tsx).
3. **If you use an `asChild` prop.** [`asChild`](https://www.radix-ui.com/primitives/docs/guides/composition), a prop that passes the current React component's props to its direct children, is heavily leveraged in `shadcn-ui` (and by proxy Radix UI) code. It works by modifying the child React nodes directly in JavaScript. Unfortunately, Astro doesn't pass slots as React children, so this feature doesn't work. You'll need to wrap the component using `asChild` in its own component and ensure all children are from valid `.tsx` files.

Using React in Astro can have its drawbacks. A notable example is the inability to use Astro's optimized `<Image>` component in React. Astro offers some official guidance on this, recommending you [pass images in as slots](https://docs.astro.build/en/guides/images/#images-in-ui-framework-components). You could also [generate the optimized image via `getImage`](https://docs.astro.build/en/guides/images/#generating-images-with-getimage), then pass the props [directly into an `img` element](https://docs.astro.build/en/recipes/build-custom-img-component/) in your React component.

## Prefer slots over props when dealing with React components

It's common practice in React to pass React classes and nodes as props to other components:

```astro
<MyComponent icon={(<Icon />)} content={Content}>
  My header goes here!
</MyComponent>
```

Astro's official recommendation is to use [slots](https://docs.astro.build/en/basics/astro-components/#slots), which greatly simplify this process. Best of all, named slots in Astro are automatically passed as props to the parent React component.

### ❌ Don't

```astro
<MyComponent icon={(<Icon />)} content={Content}>
  My header goes here!
</MyComponent>
```

### ✅ Do

```astro
<MyComponent>
  <Icon slot="icon" />
  <Content slot="content" />
  My default header goes here!
</MyComponent>
```
