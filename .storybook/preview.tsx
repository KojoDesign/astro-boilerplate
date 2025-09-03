import {
  Controls,
  Description,
  extractTitle,
  Primary,
  Stories,
  Subtitle,
  Title,
  useOf,
} from "@storybook/addon-docs/blocks";
import type { Preview } from "@storybook/react-vite";
import { pascalCase } from "es-toolkit";

import "@/styles/global.css";

const preview: Preview = {
  parameters: {
    docs: {
      codePanel: true,
      page: () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const meta = useOf("meta", ["meta"]);
        const title = extractTitle(meta?.preparedMeta.title);
        const isSingleStory = Object.keys(meta.csfFile.stories).length === 1;

        return (
          <>
            <Title>{pascalCase(title)}</Title>
            <Subtitle />
            <Description of="meta" />
            {isSingleStory ? <Description of="story" /> : null}
            <Primary />
            <Controls />
            {isSingleStory ? null : <Stories />}
          </>
        );
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
};

export default preview;
