import type { Config } from "tailwindcss";

import { scale } from "@kojodesign/miniscale";

export default {
  darkMode: "class",
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    fontFamily: {
      sans: "var(--font-sans)",
      display: "var(--font-display)",
      mono: "var(--font-mono)",
      serif: "var(--font-serif)",
    },
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
    screens: {
      phone: { max: "640px" },
      tablet: { max: "768px" },
      laptop: { max: "1280px" },
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    borderRadius: {
      lg: "var(--radius)",
      md: "calc(var(--radius) - 2px)",
      sm: "calc(var(--radius) - 4px)",
    },
    colors: {
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      card: {
        DEFAULT: "hsl(var(--card))",
        foreground: "hsl(var(--card-foreground))",
      },
      popover: {
        DEFAULT: "hsl(var(--popover))",
        foreground: "hsl(var(--popover-foreground))",
      },
      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
      },
      secondary: {
        DEFAULT: "hsl(var(--secondary))",
        foreground: "hsl(var(--secondary-foreground))",
      },
      muted: {
        DEFAULT: "hsl(var(--muted))",
        foreground: "hsl(var(--muted-foreground))",
      },
      accent: {
        DEFAULT: "hsl(var(--accent))",
        foreground: "hsl(var(--accent-foreground))",
      },
      destructive: {
        DEFAULT: "hsl(var(--destructive))",
        foreground: "hsl(var(--destructive-foreground))",
      },
      border: "hsl(var(--border))",
      input: "hsl(var(--input))",
      ring: "hsl(var(--ring))",
      chart: {
        "1": "hsl(var(--chart-1))",
        "2": "hsl(var(--chart-2))",
        "3": "hsl(var(--chart-3))",
        "4": "hsl(var(--chart-4))",
        "5": "hsl(var(--chart-5))",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
