import type { Meta, StoryObj } from '@storybook/react';
import { BreadCrumbs } from './BreadCrumbs';

const meta = {
  component: BreadCrumbs,
  tags: ['autodocs'],
  title: 'Ui-kit/BreadCrumbs',
} satisfies Meta<typeof BreadCrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    breadCrumbs: [
      {
        id: 1,
        level: 1,
        name: 'Clothes',
      },
      {
        id: 14,
        level: 2,
        name: 'Men',
      },
      {
        id: 17,
        level: 3,
        name: 'Trousers & Shorts',
      },
    ],
  },
};
