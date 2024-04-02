import type { Meta, StoryObj } from '@storybook/react';

import { ButtonWithLoader } from './ButtonWithLoader';

const meta = {
  component: ButtonWithLoader,
  tags: ['autodocs'],
  title: 'Components/ButtonWithLoader',
} satisfies Meta<typeof ButtonWithLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultButton: Story = {
  args: {
    color: 'default',
  },
  argTypes: {
    onClick: { action: 'clicked' },
  },
};
