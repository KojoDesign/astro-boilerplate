import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn, cssVars } from "@/lib/utils";
import { px } from "@/lib/units";

const gridVariants = cva("grid", {
  variants: {
    columns: {
      true: "grid-cols-(--columns)",
      false: "",
    },
    rows: {
      true: "grid-rows-(--rows)",
      false: "",
    },
    dense: {
      true: "grid-flow-dense",
      false: "",
    },
    flow: {
      row: "grid-flow-row",
      column: "grid-flow-col",
    },
    alignItems: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
    },
    justifyItems: {
      start: "justify-items-start",
      center: "justify-items-center",
      end: "justify-items-end",
      stretch: "justify-items-stretch",
    },
    alignCells: {
      normal: "content-normal",
      start: "content-start",
      center: "content-center",
      end: "content-end",
      between: "content-between",
      around: "content-around",
      evenly: "content-evenly",
      stretch: "content-stretch",
    },
    justifyCells: {
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
      lg: "gap-6",
      xl: "gap-8",
    },
  },
  compoundVariants: [
    {
      dense: true,
      flow: "column",
      className: "grid-flow-col-dense",
    },
    {
      dense: true,
      flow: "row",
      className: "grid-flow-row-dense",
    },
  ],
  defaultVariants: {
    flow: "row",
    alignItems: "start",
    justifyItems: "start",
    alignCells: "normal",
    justifyCells: "normal",
    gap: "md",
  },
});

function resolve(v?: string | number, min: number = 0) {
  return v === "auto-fit" || v === "auto-fill" || typeof v === "number"
    ? `repeat(${v}, minmax(${px(min)}, 1fr))`
    : v;
}

type GridProps = React.ComponentProps<"div"> &
  Omit<VariantProps<typeof gridVariants>, "columns" | "rows"> & {
    asChild?: boolean;
    columns?: string | number | "auto-fit" | "auto-fill";
    rows?: string | number | "auto-fit" | "auto-fill";
    minWidth?: number;
    minHeight?: number;
  };

function Grid({
  alignCells,
  alignItems,
  asChild,
  justifyCells,
  columns,
  rows,
  justifyItems,
  className,
  gap,
  minHeight,
  minWidth,
  children,
  ...props
}: GridProps) {
  const Component = asChild ? Slot : "div";

  return (
    <Component
      {...props}
      style={cssVars({
        columns: resolve(columns, minWidth),
        rows: resolve(rows, minHeight),
      })}
      className={cn(
        gridVariants({
          alignCells,
          columns: columns !== undefined,
          rows: rows !== undefined,
          alignItems,
          justifyCells,
          justifyItems,
          gap,
        }),
        className,
      )}
    >
      {children}
    </Component>
  );
}

Grid.displayName = "Grid";

export { Grid, type GridProps, gridVariants };
