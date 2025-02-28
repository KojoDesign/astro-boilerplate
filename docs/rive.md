# Using Rive

Highly complex animations are implemented using [Rive](https://rive.app), a high-performance alternative to libraries like Lottie. This repo uses the [React WebGL2 renderer](https://rive.app/docs/runtimes/react/react), the only web renderer (as of this writing) that uses Rive's custom renderer (compared to HTML5 canvas or Skia). This enables us to use cutting-edge features such as vector feathering.

While usage is straightforward and even wrapped up in an intuitive [Rive.tsx](../src/components//Rive.tsx) component for you to use, there is one important caveat: **SSR is _not_ supported**. This means that when using Rive in Astro, you _must_ only hydrate it on the client to avoid errors:

```astro
<Rive client:only="react" />
```

Hopefully this is fixed in a future release, but for now, it's sadly required.
