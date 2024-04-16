import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from './Checkbox';

const meta = {
  component: Checkbox,
  tags: ['autodocs'],
  title: 'Ui-kit/Checkbox',
  args: {
    label: 'Click',
  },
  argTypes: {
    onClick: { action: 'checked' },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultCheckbox: Story = {
  args: {
    variant: 'default',
  },
};

export const WithoutLabel: Story = {
  args: {
    variant: 'default',
    label: '',
  },
};

export const NotificationCheckbox: Story = {
  args: {
    variant: 'notification',
  },
};
