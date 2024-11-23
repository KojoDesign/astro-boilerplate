import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const stackVariants = cva("flex", {
  variants: {
    orientation: {
      column: "flex-col",
      row: "flex-row",
    },
    reverse: {
      true: "",
      false: "",
    },
    centered: {
      true: "justify-center! items-center!",
      false: "",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
      baseline: "items-baseline",
    },
    justify: {
      normal: "justify-normal",
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
      stretch: "justify-stretch",
    },
    gap: {
      none: "",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-8",
    },
    wrap: {
      true: "flex-wrap",
      false: "",
    },
  },
  compoundVariants: [
    {
      orientation: "column",
      reverse: true,
      className: "flex-col-reverse",
    },
    {
      orientation: "row",
      reverse: true,
      className: "flex-row-reverse",
    },
  ],
  defaultVariants: {
    wrap: false,
    orientation: "column",
    align: "start",
    justify: "start",
    gap: "md",
  },
});

interface StackProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof stackVariants> {
  asChild?: boolean;
}

const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (
    {
      orientation,
      asChild,
      align,
      justify,
      className,
      gap,
      wrap,
      centered,
      reverse,
      children,
      ...props
    },
    ref,
  ) => {
    const Component = asChild ? Slot : "div";

    return (
      <Component
        {...props}
        ref={ref}
        className={cn(
          stackVariants({
            centered,
            wrap,
            reverse,
            orientation,
            align,
            justify,
            gap,
          }),
          className,
        )}
      >
        {children}
      </Component>
    );
  },
);

Stack.displayName = "Stack";

export { Stack, stackVariants };
