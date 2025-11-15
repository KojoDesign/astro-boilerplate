import * as React from "react";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const marqueeVariants = cva(
  [
    "group flex gap-(--gap) overflow-hidden p-2 [--duration:40s] [--gap:1rem]",
    "*:flex *:shrink-0 *:justify-around *:gap-(--gap)",
  ],
  {
    variants: {
      /**
       * Direction to animate (vertically or horizontally)
       * @default horizontal
       */
      direction: {
        horizontal: "flex animate-marquee flex-row",
        vertical: "flex flex-col *:animate-marquee-vertical *:flex-col",
      },
      /**
       * Whether to reverse the animation direction
       * @default false
       */
      reverse: {
        true: "direction-reverse",
        false: "",
      },
      /**
       * Whether to pause the animation on hover
       * @default false
       */
      pauseOnHover: {
        true: "*:group-hover:paused",
        false: "",
      },
    },
    defaultVariants: {
      reverse: false,
      pauseOnHover: false,
      direction: "horizontal",
    },
  },
);
interface MarqueeProps
  extends VariantProps<typeof marqueeVariants>,
    React.ComponentProps<"div"> {
  /**
   * Number of times to repeat the content
   * @default 4
   */
  repeat?: number;
}

export function Marquee({
  className,
  reverse,
  pauseOnHover,
  children,
  direction,
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        marqueeVariants({ reverse, pauseOnHover, direction }),
        className,
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div key={i}>{children}</div>
        ))}
    </div>
  );
}
