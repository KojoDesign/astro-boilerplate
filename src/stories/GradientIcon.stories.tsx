import type { Meta, StoryFn } from "@storybook/react-vite";
import { GradientIcon } from "@/components/ui/GradientIcon";
import Add from "~icons/mdi/add";

const meta = {
  component: GradientIcon,
} satisfies Meta<typeof GradientIcon>;

export default meta;

export const Default: StoryFn = () => (
  <GradientIcon stops={["#ff7e5f", "#feb47b"]}>
    <Add className="size-16" />
  </GradientIcon>
);
