import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';

const meta = {
  component: Button,
  tags: ['autodocs'],
  title: 'ui-kit/Button',
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultButton: Story = {
  args: {
    children: 'Default Button',
    disabled: false,
    color: 'default',
  },
  argTypes: {
    onClick: { action: 'clicked' },
  },
};
