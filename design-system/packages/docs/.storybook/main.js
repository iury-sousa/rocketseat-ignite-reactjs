/** @type { import('@storybook/react-vite').StorybookConfig } */

const config = {
  stories: ["../src/pages/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: true,
    defaultName: "Documentation",
  },
  viteFinal: (config, { configType }) => {
    // if (configType === "PRODUCTION") {
    config.base = "./";
    // }

    return config;
  },
  env: (config) => ({
    ...config,
    STORYBOOK_BASE_URL:
      process.env.NODE_ENV === "production"
        ? "https://iury-sousa.github.io/ignite-reactjs/"
        : "",
  }),
};

export default config;
