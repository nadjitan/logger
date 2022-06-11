import { themes } from "@storybook/theming"

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: "light",
  },
  darkMode: {
    dark: { ...themes.dark, appBg: "#333333" },
  },
}
