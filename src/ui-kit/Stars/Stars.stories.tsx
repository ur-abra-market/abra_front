import type { Meta, StoryObj } from '@storybook/react';

import { Stars } from './Stars';

const meta = {
  component: Stars,
  tags: ['autodocs'],
  title: 'Ui-kit/Stars',
  args: {
    reward: 5,
    sizes: '20',
  },
} satisfies Meta<typeof Stars>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultStars: Story = {};

export const StarsExample: Story = {
  render: () => {
    return (
      <>
        <Stars reward={0.5} sizes="20" />
        <Stars reward={1} sizes="20" />
        <Stars reward={1.5} sizes="20" />
        <Stars reward={2} sizes="20" />
        <Stars reward={2.5} sizes="20" />
        <Stars reward={3} sizes="20" />
        <Stars reward={3.5} sizes="20" />
        <Stars reward={4} sizes="20" />
        <Stars reward={4.5} sizes="20" />
        <Stars reward={5} sizes="20" />
      </>
    );
  },
};
