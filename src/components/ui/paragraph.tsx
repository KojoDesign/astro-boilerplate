import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import {
  type TypographyPropsWithoutVariant,
  type TypographyVariant,
  typography,
} from "@/lib/typography";
import { cn } from "@/lib/utils";

type ParagraphVariant = Extract<TypographyVariant, "body" | "label">;

type ParagraphProps = Omit<React.HTMLAttributes<HTMLParagraphElement>, "color"> &
  TypographyPropsWithoutVariant &
  useRender.ComponentProps<"p"> & {
    variant?: ParagraphVariant;
  };

type ParagraphSize = ParagraphProps["size"];

function Paragraph({
  className,
  color,
  align,
  size = "md",
  variant = "body",
  render,
  ...props
}: ParagraphProps) {
  return useRender({
    defaultTagName: "p",
    render,
    props: mergeProps(props, {
      className: cn(typography({ color, align, variant, size }), className),
    }),
  });
}

Paragraph.displayName = "Paragraph";

export { Paragraph, type ParagraphProps, type ParagraphSize, type ParagraphVariant };
