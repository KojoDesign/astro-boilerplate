import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

import { percent, url } from "@/lib/units";
import { cn, cssVars } from "@/lib/utils";

type Corner = "left" | "bottom" | "top" | "right";
type Direction = Corner | `${Corner}-${Corner}`;

interface SVGGradientProps {
  id: string;
  stops: string[];
  to?: Direction;
}

function getStops(percentage: number, steps: number) {
  if (steps < 2) {
    return [percentage];
  }

  const result = [];
  const increment = percentage / (steps - 1);

  for (let i = 0; i < steps; i++) {
    result.push(i * increment);
  }

  return result;
}

function SVGGradient({
  stops,
  id,
  to: direction = "bottom",
}: SVGGradientProps) {
  const { x1, x2, y1, y2 } = React.useMemo(() => {
    const parts = direction.split("-");
    const coordinates = { x1: 0, y1: 0, x2: 0, y2: 100 };

    for (const part of parts) {
      switch (part) {
        case "left": {
          coordinates.x1 = 100;
          coordinates.x2 = 0;
          break;
        }
        case "right": {
          coordinates.x1 = 0;
          coordinates.x2 = 100;
          break;
        }
        case "top": {
          coordinates.y1 = 100;
          coordinates.y2 = 0;
          break;
        }
        case "bottom": {
          coordinates.y1 = 0;
          coordinates.y2 = 100;
          break;
        }
      }
    }

    return coordinates;
  }, [direction]);

  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: Only used for the gradient
    <svg className="sr-only">
      <linearGradient
        id={id}
        x1={percent(x1)}
        y1={percent(y1)}
        x2={percent(x2)}
        y2={percent(y2)}
      >
        {getStops(100, stops.length).map((stop, index) => (
          <stop
            key={stop}
            offset={percent(stop)}
            className="[stop-color:var(--color)]"
            style={cssVars({ color: stops[index] }, true)}
          />
        ))}
      </linearGradient>
    </svg>
  );
}

interface GradientIconProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    Omit<SVGGradientProps, "id"> {
  children: React.ReactNode;
  asChild?: boolean;
}

export function GradientIcon({
  className,
  asChild,
  children,
  to,
  stops,
  ...props
}: GradientIconProps) {
  const id = React.useId();
  const gradientId = `gradient-${id}`;
  const Comp = asChild ? Slot : "span";

  return (
    <>
      <SVGGradient to={to} stops={stops} id={gradientId} />
      <Comp
        {...props}
        style={cssVars({ gradient: url(`#${gradientId}`) }, true)}
        className={cn("[&_path]:fill-[var(--gradient)]", className)}
      >
        {React.Children.only(children)}
      </Comp>
    </>
  );
}
