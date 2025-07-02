import type { Meta, StoryFn } from "@storybook/react-vite";

import Add from "~icons/mdi/add";

import { GradientIcon } from "./GradientIcon";

const meta = {
  component: GradientIcon,
} satisfies Meta<typeof GradientIcon>;

export default meta;

export const Default: StoryFn = () => (
  <GradientIcon stops={["#ff7e5f", "#feb47b"]}>
    <Add className="size-16" />
  </GradientIcon>
);
