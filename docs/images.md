# Adding images

Images are located in the `src/assets` directory and should use Astro's [`Image` component (imported from "astro:assets")](https://docs.astro.build/en/guides/images/#display-optimized-images-with-the-image--component) whenever possible.

When adding background images, you can use the [`getImage`](https://docs.astro.build/en/guides/images/#generating-images-with-getimage) function to optimize images server-side before adding them to the HTML.

```astro
---
import { getImage } from "astro:assets";

import { url } from "@/lib/units";
import { cssVars } from "@/lib/utils";

import background from "@/assets/bg.jpg";

const optimized = await getImage({ src: background });
---

<div class="bg-(url:--bg)" style={cssVars({ bg: url(optimized.src) })}></div>
```
