import type { Meta, StoryObj } from '@storybook/react';

import { SimpleLink } from './SimpleLink';

const meta = {
  component: SimpleLink,
  tags: ['autodocs'],
  title: 'Ui-kit/SimpleLink',
  args: {
    to: '/',
    color: 'accent',
  },
} satisfies Meta<typeof SimpleLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AccentColor: Story = {
  args: {
    children: "I'm a SimpleLink",
  },
};

export const DefaultColor: Story = {
  args: {
    children: "I'm a SimpleLink",
    color: 'default',
  },
};

export const AsButton: Story = {
  args: {
    variant: 'button',
    children: 'Link as Button',
  },
};
