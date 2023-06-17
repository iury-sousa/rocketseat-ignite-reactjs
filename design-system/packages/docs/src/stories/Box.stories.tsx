import type { Meta, StoryObj } from '@storybook/react'
import { Box, BoxProps, Text } from '@iury-ignite-ui/react'

export default {
  title: 'Surfaces/Box',
  component: Box,
  argTypes: {
    children: {
      control: 'null',
    },
  },
  args: {
    children: (
      <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos illum
        commodi itaque nulla quibusdam error voluptatibus ex ea excepturi quam.
      </Text>
    ),
  },
} as Meta<BoxProps>

export const Primary: StoryObj<BoxProps> = {}
