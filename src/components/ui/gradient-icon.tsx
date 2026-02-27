import {
  useRender,
  type UseRenderComponentProps,
} from "@base-ui/react/use-render";
import { mergeProps } from "@base-ui/react/merge-props";

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
            className="stop-color-(--color)"
            style={cssVars({ color: stops[index] })}
          />
        ))}
      </linearGradient>
    </svg>
  );
}

type GradientIconProps = React.ComponentProps<"svg"> &
  Omit<SVGGradientProps, "id"> &
  UseRenderComponentProps<"div"> & {
    children: React.ReactNode;
  };

export function GradientIcon({
  className,
  render,
  children,
  to,
  stops,
  ...props
}: GradientIconProps) {
  const id = React.useId();
  const gradientId = `gradient-${id}`;
  const svg = useRender({
    render,
    props: mergeProps(props, {
      children: React.Children.only(children),
      style: cssVars({ gradient: url(`#${gradientId}`) }),
      className: cn("[&_path]:fill-(--gradient)", className),
    }),
  });

  return (
    <>
      <SVGGradient to={to} stops={stops} id={gradientId} />
      {svg}
    </>
  );
}
