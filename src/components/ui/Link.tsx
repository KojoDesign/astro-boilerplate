import type { VariantProps } from "class-variance-authority";
import { Button, type buttonVariants } from "./button";

export function Link({
  variant = "link",
  size,
  className,
  ...props
}: Omit<React.ComponentPropsWithoutRef<"a">, "color"> &
  VariantProps<typeof buttonVariants>) {
  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      render={<a {...props} />}
    />
  );
}
