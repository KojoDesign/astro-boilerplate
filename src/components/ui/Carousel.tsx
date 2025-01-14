import * as React from "react";

import { cn } from "@/lib/utils";

export type CarouselDirection = "left" | "right";

export interface CarouselProps {
  direction?: CarouselDirection;
  className?: string;
  gap: number;
  children: React.ReactNode;
}

export function Carousel({
  direction = "left",
  className,
  children,
  gap,
}: CarouselProps) {
  const em = gap / 4;
  const count = React.Children.count(children);

  return (
    <div
      style={
        {
          "--carousel-count": count,
          "--gap": `${em}em`,
        } as React.CSSProperties
      }
      className={className}
    >
      <div
        className={cn("flex relative flex-row w-max gap-[var(--gap)]", {
          "animate-carousel-left pr-[var(--gap)]": direction === "left",
          "animate-carousel-right pl-[var(--gap)]": direction === "right",
        })}
      >
        {children}
        <div
          className={cn("flex flex-row absolute top-0", {
            "left-0 -translate-x-full": direction === "right",
            "right-0 translate-x-full": direction === "left",
          })}
          style={{ gap: `${em}em` }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
