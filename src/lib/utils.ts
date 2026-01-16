import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { variable } from "./units";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function cssVars(vars: Record<string, undefined | string | number>) {
  return Object.entries(vars).reduce(
    (acc, [key, value]) => {
      acc[variable(key)] = value ? value.toString() : value;
      return acc;
    },
    {} as Record<string, undefined | number | string>,
  ) as React.CSSProperties;
}
