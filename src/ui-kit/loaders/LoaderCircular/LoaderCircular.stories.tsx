import type { Meta, StoryObj } from '@storybook/react';

import { LoaderCircular } from './LoaderCircular';

const meta = {
  component: LoaderCircular,
  tags: ['autodocs'],
  title: 'ui-kit/LoaderCircular',
} satisfies Meta<typeof LoaderCircular>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoaderCircularPrimary: Story = {};

export const LoaderCircularMin: Story = {
  args: {
    variant: 'circular-min',
  },
};
