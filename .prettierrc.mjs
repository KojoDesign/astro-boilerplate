/** @type {import("prettier").Config} */
export default {
  plugins: [
    "prettier-plugin-astro",
    "@prettier/plugin-oxc",
    "prettier-plugin-tailwindcss",
  ],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};
