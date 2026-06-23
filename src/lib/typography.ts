import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "./utils";

const typographyVariants = cva("", {
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

type TypographyProps = VariantProps<typeof typographyVariants>;
type TypographyPropsWithoutVariant = Omit<TypographyProps, "variant">;
type TypographyVariant = TypographyProps["variant"];
type TypographySize = TypographyProps["size"];

function typography(...args: Parameters<typeof typographyVariants>) {
  return cn(typographyVariants(...args));
}

export {
  type TypographyProps,
  type TypographyPropsWithoutVariant,
  type TypographySize,
  type TypographyVariant,
  typography,
};
