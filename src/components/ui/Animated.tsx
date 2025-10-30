import { cva, type VariantProps } from "class-variance-authority";

function createCompoundVariants(
  name: string,
  variants: Record<string, string[]>,
) {
  return Object.entries(variants).flatMap(([k, v]) => {
    return v.map((value) => {
      return {
        animate: (v.includes("-in-") ? "in" : "out") as "in" | "out",
        [name]: k,
        className: value,
      };
    });
  });
}

const animatedVariants = cva("", {
  variants: {
    animate: {
      in: "animate-in",
      out: "animate-out",
      none: "",
    },
    blur: {
      xs: "",
      sm: "",
      md: "",
      lg: "",
      xl: "",
      "2xl": "",
      "3xl": "",
    },
    spin: {
      true: "",
      false: "",
      custom: "",
    },
    zoom: {
      true: "",
      false: "",
      custom: "",
    },
    fillMode: {
      forwards: "fill-mode-forwards",
      backwards: "fill-mode-backwards",
      both: "fill-mode-both",
      initial: "fill-mode-initial",
    },
    slideDirection: {
      start: "",
      end: "",
      bottom: "",
      left: "",
      right: "",
      up: "",
      top: "",
    },
    ease: {
      initial: "ease-initial",
      in: "ease-in slide-in-from-bottom-(--offset)",
      "in-out": "ease-in-out",
      out: "ease-out",
      linear: "ease-linear",
    },
  },
  compoundVariants: [
    ...createCompoundVariants("blur", {
      xs: ["blur-in-xs", "blur-out-xs"],
      sm: ["blur-in-sm", "blur-out-sm"],
      md: ["blur-in-md", "blur-out-md"],
      lg: ["blur-in-lg", "blur-out-lg"],
      xl: ["blur-in-xl", "blur-out-xl"],
      "2xl": ["blur-in-2xl", "blur-out-2xl"],
      "3xl": ["blur-in-3xl", "blur-out-3xl"],
    }),
    ...createCompoundVariants("slideDirection", {
      start: ["slide-in-start", "slide-out-start"],
      end: ["slide-in-end", "slide-out-end"],
      bottom: ["slide-in-bottom", "slide-out-bottom"],
      left: ["slide-in-left", "slide-out-left"],
      right: ["slide-in-right", "slide-out-right"],
      up: ["slide-in-up", "slide-out-up"],
      top: ["slide-in-top", "slide-out-top"],
      "2xl": ["blur-in-2xl", "blur-out-2xl"],
      "3xl": ["blur-in-3xl", "blur-out-3xl"],
    }),
  ],
  defaultVariants: {
    zoom: false,
    fillMode: "both",
    ease: "in-out",
    spin: false,
  },
});

type AnimationVariants = VariantProps<typeof animatedVariants>;

interface AnimatedProps extends Omit<AnimationVariants, "slideDirection"> {
  blur?: boolean | number;
  zoom?: boolean | number;
  fade?: boolean | number;
  slide?: {
    direction: AnimationVariants["slideDirection"];
    offset?: number;
  };
}

export function Animated() {}
