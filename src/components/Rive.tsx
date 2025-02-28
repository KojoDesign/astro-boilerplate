import type { ComponentProps } from "react";

import { RIVE_WASM_URL } from "@/consts";
import {
  Alignment,
  Fit,
  Layout,
  RuntimeLoader,
  type UseRiveParameters,
  useRive,
} from "@rive-app/react-webgl2";
import { animate } from "motion";

RuntimeLoader.setWasmUrl(RIVE_WASM_URL);

const fitMap = {
  cover: Fit.Cover,
  contain: Fit.Contain,
  fill: Fit.Fill,
  none: Fit.None,
} satisfies Record<string, Fit>;

const alignmentMap = {
  center: Alignment.Center,
  top: Alignment.TopCenter,
  topLeft: Alignment.TopLeft,
  topRight: Alignment.TopRight,
  bottom: Alignment.BottomCenter,
  bottomLeft: Alignment.BottomLeft,
  bottomRight: Alignment.BottomRight,
  left: Alignment.CenterLeft,
  right: Alignment.CenterRight,
};

export type RiveProps = ComponentProps<"canvas"> & {
  animation: string;
  artboard?: string;
  params?: Partial<
    Omit<NonNullable<UseRiveParameters>, "artboard" | "layout" | "src">
  > | null;
  fit?: keyof typeof fitMap;
  alignment?: keyof typeof alignmentMap;
};

export function Rive({
  fit,
  alignment,
  params,
  artboard,
  animation,
  ...props
}: RiveProps) {
  const { onLoad = () => {}, ...restParams } = params ?? {};

  const { RiveComponent, container } = useRive(
    {
      src: animation,
      artboard,
      stateMachines: params?.stateMachines ?? "State Machine 1",
      autoplay: true,
      layout: new Layout({
        ...(fit && { fit: fitMap[fit] }),
        ...(alignment && { alignment: alignmentMap[alignment] }),
      }),
      onLoad: (e) => {
        animate(container as HTMLElement, { opacity: [0, 1] });
        onLoad(e);
      },
      ...restParams,
    },
    { shouldUseIntersectionObserver: true },
  );

  return <RiveComponent {...props} />;
}
