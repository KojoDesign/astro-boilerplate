import plugin from "tailwindcss/plugin";

import { scale } from "@kojodesign/miniscale";

export default plugin(() => {}, {
  theme: {
    fontSize: () => {
      const ms = scale(14, "major-second");

      return {
        "2xs": [ms(-3).rem, "1.4em"],
        xs: [ms(-2).rem, "1.3em"],
        sm: [ms(-1).rem, "1.5em"],
        base: [ms(0).rem, "1.5em"],
        lg: [ms(2).rem, { lineHeight: "1.4em", fontWeight: 500 }],
        xl: [ms(4).rem, { lineHeight: "1.3em", fontWeight: 500 }],
        "2xl": [ms(5).rem, { lineHeight: "1.35em", fontWeight: 500 }],
        "3xl": [ms(6).rem, { lineHeight: "1.25em", fontWeight: 500 }],
        "4xl": [ms(7).rem, { lineHeight: "1.2em", fontWeight: 500 }],
        "5xl": [
          ms(9).rem,
          {
            lineHeight: "1.15em",
            letterSpacing: "-0.02em",
            fontWeight: 500,
          },
        ],
        "6xl": [
          ms(11).rem,
          {
            lineHeight: "1.12em",
            letterSpacing: "-0.02em",
            fontWeight: 500,
          },
        ],
      };
    },
  },
});
