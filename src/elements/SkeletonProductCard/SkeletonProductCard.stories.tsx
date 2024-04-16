import type { Meta, StoryObj } from '@storybook/react';

import { SkeletonProductCard } from './SkeletonProductCard';

import { SelectedViewEnum } from 'common/types';

const meta = {
  component: SkeletonProductCard,
  tags: ['autodocs'],
  title: 'Elements/SkeletonProductCard',
} satisfies Meta<typeof SkeletonProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultSkeletonProductCard: Story = {
  args: {
    selectedView: SelectedViewEnum.GRID,
  },
};
