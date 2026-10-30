import type { Preview } from "@storybook/react-vite";
import ecarTheme from "./ecarTheme";

import "../src/styles/tokens.css";
import "../src/styles/global.css";

const preview: Preview = {
  parameters: {
    docs: {
      theme: ecarTheme,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;