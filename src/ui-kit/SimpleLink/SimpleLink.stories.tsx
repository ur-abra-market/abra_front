import type { Meta, StoryObj } from '@storybook/react';

import { SimpleLink } from './SimpleLink';

const meta = {
  component: SimpleLink,
  tags: ['autodocs'],
  title: 'Components/SimpleLink',
} satisfies Meta<typeof SimpleLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultSimpleLink: Story = {
  args: {
    to: '/',
    className: 'default',
    color: 'accent',
    children: "I'm a SimpleLink",
    disabled: false,
  },
};
