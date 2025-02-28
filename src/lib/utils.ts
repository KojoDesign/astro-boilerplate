import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { variable } from "./units";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function cssVars(
  vars: Record<string, string>,
  react: true,
): React.CSSProperties;
export function cssVars(vars: Record<string, string>, react?: false): string;
export function cssVars(vars: Record<string, string>, react = false) {
  if (react) {
    return Object.entries(vars).reduce(
      (acc, [key, value]) => {
        acc[variable(key)] = value;
        return acc;
      },
      {} as Record<string, string>,
    ) as React.CSSProperties;
  }

  return Object.entries(vars).reduce(
    (acc, [key, value]) => `${acc} ${variable(key)}: ${value};`,
    "",
  );
}
