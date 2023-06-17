import { themes } from "@storybook/theming";

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      theme: themes.dark,
    },
    backgrounds: {
      default: "default",
      values: [
        {
          name: "default",
          value: themes.dark.appContentBg,
        },
        {
          name: "light",
          value: themes.light.appContentBg,
        },
      ],
    },
  },
};

export default preview;
