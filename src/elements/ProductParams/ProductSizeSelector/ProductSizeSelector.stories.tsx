import type { Meta, StoryObj } from '@storybook/react';

import { ProductSizeSelector } from './ProductSizeSelector ';

import { SizeEnum } from 'common/types';

const meta = {
  component: ProductSizeSelector,
  tags: ['autodocs'],
  title: 'Components/ProductSizeSelector',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ProductSizeSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Deffailt: Story = {
  args: {
    size: SizeEnum.L,
    quantity: 99,
  },
};
