import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";
import { Button, type buttonVariants } from "./Button";

interface LinkProps
  extends Omit<ComponentPropsWithoutRef<"a">, "color">,
    VariantProps<typeof buttonVariants> {}

export function Link({
  variant = "link",
  size,
  className,
  ...props
}: LinkProps) {
  return (
    <Button variant={variant} size={size} className={className} asChild>
      <a {...props} />
    </Button>
  );
}
