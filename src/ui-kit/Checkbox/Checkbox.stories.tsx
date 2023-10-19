import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from './Checkbox';

const meta = {
  component: Checkbox,
  tags: ['autodocs'],
  title: 'Components/Checkbox',
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultCheckbox: Story = {
  args: {
    variant: 'default',
  },
  argTypes: {
    onClick: { action: 'checked' },
  },
};

export const NotificationCheckbox: Story = {
  args: {
    variant: 'notification',
  },
  argTypes: {
    onClick: { action: 'checked' },
  },
};
