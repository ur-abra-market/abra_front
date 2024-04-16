import type { Meta, StoryObj } from '@storybook/react';

import { Paragraph } from './Paragraph';

const meta = {
  component: Paragraph,
  tags: ['autodocs'],
  title: 'Ui-kit/Paragraph',
  args: {
    children: 'Paragraph',
  },
} satisfies Meta<typeof Paragraph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const XxsSize: Story = {
  args: {
    size: 'xxs',
  },
};

export const XsSize: Story = {
  args: {
    size: 'xs',
  },
};

export const Xs2Size: Story = {
  args: {
    size: 'xs2',
  },
};

export const SSize: Story = {
  args: {
    size: 's',
  },
};

export const S2Size: Story = {
  args: {
    size: 's2',
  },
};

export const MSize: Story = {
  args: {
    size: 'm',
  },
};

export const MSizeLight: Story = {
  args: {
    size: 'm',
    weight: 'light',
  },
};

export const MSizeMedium: Story = {
  args: {
    size: 'm',
    weight: 'medium',
  },
};

export const MSizeSemiBold: Story = {
  args: {
    size: 'm',
    weight: 'semi_bold',
  },
};
