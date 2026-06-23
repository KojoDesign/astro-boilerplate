import { type VariantProps, cva } from "class-variance-authority";
import { useRender } from "@base-ui/react/use-render";
import { mergeProps } from "@base-ui/react/merge-props";

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
    responsive: {
      true: "max-lg:flex-col",
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
    responsive: false,
    gap: "md",
  },
});

type StackProps = VariantProps<typeof stackVariants> &
  useRender.ComponentProps<"div">;

function Stack({
  orientation,
  render,
  align,
  justify,
  className,
  gap,
  wrap,
  centered,
  reverse,
  ...props
}: StackProps) {
  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps(props, {
      className: cn(
        stackVariants({
          centered,
          wrap,
          reverse,
          orientation,
          align,
          justify,
          gap,
          className,
        }),
      ),
    }),
  });
}

export { Stack, stackVariants };
