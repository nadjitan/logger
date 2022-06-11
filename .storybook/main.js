module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-dark-mode",
  ],
  framework: "@storybook/react",
  previewHead: head => `
    ${head}
    <style>
      body {
        width: 100%;
        height: 100vh;
      }
      #root {
        width: 100%;
        height: 100%;
        display: grid;
        align-content: center;
        justify-items: center;
      }
    </style>
  `,
}
