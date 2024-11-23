import { LazyMotion, domAnimation } from "motion/react";

interface MotionProviderProps {
  children?: React.ReactNode | React.ReactNode[];
}

export function MotionProvider({ children }: MotionProviderProps): JSX.Element {
  return (
    <LazyMotion strict features={domAnimation}>
      {children}
    </LazyMotion>
  );
}
