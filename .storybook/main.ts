import type { StorybookConfig } from "@storybook/react-vite";
import { FileSystemIconLoader } from "unplugin-icons/loaders";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  stories: [
    "../src/stories/**/*.mdx",
    "../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
  ],
  async viteFinal(config) {
    const { default: tailwindcss } = await import("@tailwindcss/vite");
    const { default: icons } = await import("unplugin-icons/vite");
    const { default: paths } = await import("vite-tsconfig-paths");

    return mergeConfig(config, {
      plugins: [
        paths(),
        tailwindcss(),
        icons({
          compiler: "jsx",
          customCollections: {
            assets: FileSystemIconLoader("./src/assets/svg"),
          },
        }),
      ],
    });
  },

  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
};
export default config;
