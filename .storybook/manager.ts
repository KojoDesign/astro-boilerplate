import { pascalCase } from "es-toolkit";
import { addons } from "storybook/manager-api";

addons.setConfig({
  sidebar: {
    renderLabel: ({ name, type }) =>
      type === "story" ? name : pascalCase(name),
  },
});
