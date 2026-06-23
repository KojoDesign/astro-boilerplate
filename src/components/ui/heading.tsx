import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import {
  type TypographyPropsWithoutVariant,
  type TypographyVariant,
  typography,
} from "@/lib/typography";
import { cn } from "@/lib/utils";

type HeadingVariant = Extract<TypographyVariant, "display" | "headline" | "title">;
type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type HeadingTagName = `h${HeadingLevel}`;

type HeadingPropsWithoutLevel = Omit<React.HTMLAttributes<HTMLHeadingElement>, "color"> &
  TypographyPropsWithoutVariant &
  useRender.ComponentProps<"h1"> & {
    variant?: HeadingVariant;
  };

type HeadingProps = HeadingPropsWithoutLevel & { level: HeadingLevel };

function Heading({
  className,
  variant = "display",
  color,
  align,
  size = "md",
  level,
  render,
  ...props
}: HeadingProps) {
  const defaultTagName = `h${level}` satisfies HeadingTagName;

  return useRender({
    defaultTagName,
    render,
    props: mergeProps(props, {
      className: cn(typography({ variant, size, color, align }), className),
    }),
  });
}

Heading.displayName = "Heading";

export {
  Heading,
  type HeadingLevel,
  type HeadingProps,
  type HeadingPropsWithoutLevel,
  type HeadingTagName,
  type HeadingVariant,
};
