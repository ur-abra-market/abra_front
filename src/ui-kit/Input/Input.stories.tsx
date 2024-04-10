import type { Meta, StoryObj } from '@storybook/react';

import { Input } from './Input';

const meta = {
  component: Input,
  tags: ['autodocs'],
  title: 'Ui-kit/Input',
  args: {
    variant: 'primary',
    defaultValue: 'Some text',
  },
  argTypes: {
    onChange: { action: 'type' },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Password: Story = {
  args: {
    type: 'password',
    variant: 'password',
  },
};

export const WithError: Story = {
  args: {
    error: 'Some error',
  },
};

export const DateType: Story = {
  args: {
    type: 'date',
  },
};
