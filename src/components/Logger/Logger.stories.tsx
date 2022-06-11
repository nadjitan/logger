import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"

import Logger from "./Logger"

export default {
  title: "Logger/Logger",
  component: Logger,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Logger>

const Template: ComponentStory<typeof Logger> = args => (
  <>
    <Logger {...args} />
    <p>Hello</p>
    <input type="text" placeholder="Name" />
    <button>Submit</button>
  </>
)

export const Primary = Template.bind({})
Primary.args = {
  data: [],
}
