import { forwardRef } from "react";

import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";

export const typographyVariants = cva("", {
  variants: {
    variant: {
      display: "font-display font-medium",
      headline: "font-display",
      title: "font-sans font-bold",
      body: "font-sans font-normal",
      label: "font-sans font-bold",
    },
    size: {
      sm: "",
      md: "",
      lg: "",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
    color: {
      success: "text-success",
      danger: "text-danger",
      warn: "text-warn",
      primary: "text-primary",
      default: "text-default",
      subtle: "text-subtle",
      muted: "text-muted",
      invert: "text-invert",
      inherit: "text-inherit",
    },
  },
  compoundVariants: [
    {
      variant: "display",
      size: "lg",
      class: "tablet:text-[3rem] text-[4.5rem] leading-none",
    },
    {
      variant: "display",
      size: "md",
      class: "text-5xl phone:text-4xl",
    },
    {
      variant: "display",
      size: "sm",
      class: "text-4xl",
    },
    {
      variant: "headline",
      size: "lg",
      class: "text-3xl",
    },
    {
      variant: "headline",
      size: "md",
      class: "text-2xl",
    },
    {
      variant: "headline",
      size: "sm",
      class: "text-xl",
    },
    {
      variant: "title",
      size: "lg",
      class: "text-lg",
    },
    {
      variant: "title",
      size: "md",
      class: "text-base",
    },
    {
      variant: "title",
      size: "sm",
      class: "text-sm",
    },
    {
      variant: "body",
      size: "lg",
      class: "text-base",
    },
    {
      variant: "body",
      size: "md",
      class: "text-sm",
    },
    {
      variant: "body",
      size: "sm",
      class: "text-xs",
    },
    {
      variant: "label",
      size: "lg",
      class: "text-sm",
    },
    {
      variant: "label",
      size: "md",
      class: "text-xs",
    },
    {
      variant: "label",
      size: "sm",
      class: "text-2xs",
    },
  ],
  defaultVariants: {
    variant: "body",
    size: "md",
    color: "default",
  },
});

const tagVariants = cva("", {
  variants: {
    variant: {
      display: "",
      headline: "",
      body: "",
      title: "",
      label: "",
    },
    size: {
      sm: "",
      md: "",
      lg: "",
    },
  },
  defaultVariants: {
    variant: "body",
    size: "md",
  },
  compoundVariants: [
    {
      variant: "display",
      size: "lg",
      class: "h1",
    },
    {
      variant: "display",
      size: "md",
      class: "h2",
    },
    {
      variant: "display",
      size: "sm",
      class: "h3",
    },
    {
      variant: "headline",
      size: "lg",
      class: "h4",
    },
    {
      variant: "headline",
      size: "md",
      class: "h5",
    },
    {
      variant: "headline",
      size: "sm",
      class: "h6",
    },
    {
      variant: "title",
      size: "lg",
      class: "h4",
    },
    {
      variant: "title",
      size: "md",
      class: "h5",
    },
    {
      variant: "title",
      size: "sm",
      class: "h6",
    },
    {
      variant: "body",
      size: "lg",
      class: "p",
    },
    {
      variant: "body",
      size: "md",
      class: "p",
    },
    {
      variant: "body",
      size: "sm",
      class: "p",
    },
    {
      variant: "label",
      size: "lg",
      class: "span",
    },
    {
      variant: "label",
      size: "md",
      class: "span",
    },
    {
      variant: "label",
      size: "sm",
      class: "span",
    },
  ],
});

export interface TypographyProps
  extends Omit<React.HTMLAttributes<HTMLParagraphElement>, "color">,
    VariantProps<typeof typographyVariants> {
  asChild?: boolean;
}

const Typography = forwardRef<HTMLParagraphElement, TypographyProps>(
  (
    { className, variant, color, align, size, asChild = false, ...props },
    ref,
  ) => {
    let Comp = asChild ? Slot : "p";

    if (!asChild) {
      Comp = tagVariants({ variant, size });
    }

    return (
      <Comp
        className={cn(
          typographyVariants({
            variant,
            align,
            color,
            size,
          }),
          className,
        )}
        {...props}
        ref={ref}
      />
    );
  },
);

Typography.displayName = "Typography";

export { Typography };
