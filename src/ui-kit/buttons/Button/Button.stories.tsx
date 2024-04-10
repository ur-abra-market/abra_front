import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';

const meta = {
  component: Button,
  tags: ['autodocs'],
  title: 'Ui-kit/Buttons/DefaultButton',
  args: {
    children: 'Default Button',
    color: 'default',
  },
  argTypes: {
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultButton: Story = {};

export const ButtonDisabled: Story = {
  args: {
    disabled: true,
  },
};

export const LightRedColor: Story = {
  args: {
    color: 'light-red',
  },
};

export const LightRedColorDisabled: Story = {
  args: {
    color: 'light-red',
    disabled: true,
  },
};

export const White: Story = {
  args: {
    color: 'white',
  },
};

export const Black: Story = {
  args: {
    color: 'black',
  },
};
