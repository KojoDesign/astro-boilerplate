import type * as React from "react";

import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

interface GradientBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: number;
  left?: boolean;
  right?: boolean;
  top?: boolean;
  bottom?: boolean;
  asChild?: boolean;
}

export function GradientBorder({
  className,
  left,
  right,
  top,
  children,
  bottom,
  asChild,
  width = 1,
  ...props
}: GradientBorderProps) {
  const all = [left, right, top, bottom].every((x) => !x);
  const Tag = asChild ? Slot : "div";

  return (
    <Tag
      className={cn(
        "relative",
        "before:absolute before:border-solid before:border-[transparent] before:inset-[calc(-1*var(--width))] before:rounded-[inherit]",
        "before:pointer-events-none",
        "before:[mask-image:linear-gradient(#000_0_0),linear-gradient(#000_0_0)]",
        "before:[mask-clip:content-box,no-clip]",
        "before:[mask-composite:exclude]",
        { "before:[padding-left:var(--width)]": left || all },
        { "before:[padding-right:var(--width)]": right || all },
        { "before:[padding-top:var(--width)]": top || all },
        { "before:[padding-bottom:var(--width)]": bottom || all },
        className,
      )}
      style={{ "--width": `${width}px` } as React.CSSProperties}
      {...props}
    >
      {children}
    </Tag>
  );
}
