import type { Meta, StoryObj } from '@storybook/react'
import { Avatar, AvatarProps } from '@iury-ignite-ui/react'

export default {
  title: 'Data display/Avatar',
  component: Avatar,
  args: {
    src: 'https://github.com/iury-sousa.png',
    alt: 'Iury Sousa',
  },
  argTypes: {
    src: {
      description: 'Image url',
      control: {
        type: 'text',
      },
    },
  },
} as Meta<AvatarProps>

export const Primary: StoryObj<AvatarProps> = {}

export const WithFallback: StoryObj<AvatarProps> = {
  args: {
    src: undefined,
  },
}
