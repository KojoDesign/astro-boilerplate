import { LazyMotion, domAnimation } from "motion/react";

interface MotionProviderProps {
  children?: React.ReactNode | React.ReactNode[];
}

export function MotionProvider({
  children,
}: MotionProviderProps): React.ReactElement {
  return (
    <LazyMotion strict features={domAnimation}>
      {children}
    </LazyMotion>
  );
}
