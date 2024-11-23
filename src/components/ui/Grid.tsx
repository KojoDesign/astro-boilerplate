import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const gridVariants = cva("grid", {
  variants: {
    columns: {
      0: "",
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
      6: "grid-cols-6",
      7: "grid-cols-7",
      8: "grid-cols-8",
      9: "grid-cols-9",
      10: "grid-cols-10",
      11: "grid-cols-11",
      12: "grid-cols-12",
    },
    rows: {
      0: "",
      1: "grid-rows-1",
      2: "grid-rows-2",
      3: "grid-rows-3",
      4: "grid-rows-4",
      5: "grid-rows-5",
      6: "grid-rows-6",
      7: "grid-rows-7",
      8: "grid-rows-8",
      9: "grid-rows-9",
      10: "grid-rows-10",
      11: "grid-rows-11",
      12: "grid-rows-12",
    },
    flow: {
      row: "grid-flow-row",
      column: "grid-flow-col",
      dense: "grid-flow-dense",
      rowDense: "grid-flow-row-dense",
      columnDense: "grid-flow-col-dense",
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
      lg: "gap-8",
    },
  },
  defaultVariants: {
    rows: 0,
    flow: "row",
    alignItems: "start",
    justifyItems: "start",
    alignCells: "normal",
    justifyCells: "normal",
    gap: "md",
  },
});

interface GridProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof gridVariants> {
  asChild?: boolean;
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  (
    {
      alignCells,
      alignItems,
      asChild,
      justifyCells,
      columns,
      rows,
      justifyItems,
      className,
      gap,
      children,
      ...props
    },
    ref,
  ) => {
    const Component = asChild ? Slot : "div";

    return (
      <Component
        ref={ref}
        {...props}
        className={cn(
          gridVariants({
            alignCells,
            columns,
            rows,
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
  },
);

Grid.displayName = "Grid";

export { Grid, type GridProps, gridVariants };
