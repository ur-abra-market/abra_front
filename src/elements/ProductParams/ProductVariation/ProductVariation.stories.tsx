import type { Meta, StoryObj } from '@storybook/react';

import { ProductVariation } from './ProductVariation';

const meta = {
  component: ProductVariation,
  tags: ['autodocs'],
  title: 'Components/ProductVariation',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ProductVariation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ProductVariationStory: Story = {
  args: {
    color: '#BE58E1',
    optionNumber: 1,
  },
};
