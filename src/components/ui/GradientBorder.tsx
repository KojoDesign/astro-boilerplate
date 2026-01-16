import { cva, type VariantProps } from "class-variance-authority";
import { useRender } from "@base-ui/react/use-render";
import { mergeProps } from "@base-ui/react/merge-props";

import { cn, cssVars } from "@/lib/utils";
import { px } from "@/lib/units";

const gradientBorderVariants = cva(
  [
    "relative",
    "before:absolute before:inset-[calc(-1*var(--width))] before:rounded-[inherit] before:border-solid before:border-[transparent]",
    "before:pointer-events-none",
    "before:[mask-image:linear-gradient(#000_0_0),linear-gradient(#000_0_0)]",
    "before:[mask-clip:content-box,no-clip]",
    "before:[mask-composite:exclude]",
  ],
  {
    variants: {
      left: {
        true: "before:[padding-left:var(--width)]",
        false: "",
      },
      right: {
        true: "before:[padding-right:var(--width)]",
        false: "",
      },
      top: {
        true: "before:[padding-top:var(--width)]",
        false: "",
      },
      bottom: {
        true: "before:[padding-bottom:var(--width)]",
        false: "",
      },
    },
  },
);

type GradientBorderProps = useRender.ComponentProps<"div"> &
  VariantProps<typeof gradientBorderVariants> & { width?: number };

export function GradientBorder({
  className,
  left,
  right,
  top,
  children,
  bottom,
  render,
  width = 1,
  ...props
}: GradientBorderProps) {
  const all = [left, right, top, bottom].every((x) => !x);

  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps(props, {
      className: cn(
        gradientBorderVariants({
          left: left || all,
          right: right || all,
          top: top || all,
          bottom: bottom || all,
        }),
        className,
      ),
      style: cssVars({ width: px(width) }),
    }),
  });
}
