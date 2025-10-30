import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cssVars } from "@/lib/utils";

const carouselVariants = cva(
  [
    "relative duration-(--duration) flex w-max gap-[--spacing(var(--gap))]",
    "*:data-[slot=clone]:absolute *:data-[slot=clone]:top-0 *:data-[slot=clone]:flex *:data-[slot=clone]:gap-[--spacing(var(--gap))]",
  ],
  {
    variants: {
      direction: {
        left: "animate-carousel-left pr-[--spacing(var(--gap))] *:data-[slot=clone]:right-0 *:data-[slot=clone]:translate-x-full",
        right:
          "animate-carousel-right pl-[--spacing(var(--gap))] *:data-[slot=clone]:left-0 *:data-[slot=clone]:-translate-x-full",
        up: "animate-carousel-up pb-[--spacing(var(--gap))] *:data-[slot=clone]:bottom-0 *:data-[slot=clone]:translate-y-full",
        down: "animate-carousel-down pt-[--spacing(var(--gap))] *:data-[slot=clone]:top-0 *:data-[slot=clone]:-translate-y-full",
      },
    },
    compoundVariants: [
      {
        direction: ["left", "right"],
        className: "flex-row *:data-[slot=clone]:flex-row",
      },
      {
        direction: ["up", "down"],
        className: "flex-col *:data-[slot=clone]:flex-col",
      },
    ],
  },
);

export interface CarouselProps extends VariantProps<typeof carouselVariants> {
  className?: string;
  gap?: number;
  duration?: number;
  children: React.ReactNode;
}

export function Carousel({
  direction = "left",
  className,
  duration = 30,
  children,
  gap = 4,
}: CarouselProps) {
  return (
    <div className={className}>
      <div
        style={cssVars({ gap, duration: `${duration}s` })}
        className={carouselVariants({ direction })}
        data-slot="carousel"
      >
        {children}
        <div data-slot="clone">{children}</div>
      </div>
    </div>
  );
}
