import type { Meta, StoryObj } from '@storybook/react';

import { ProductSize } from './ProductSize';

const meta = {
  component: ProductSize,
  tags: ['autodocs'],
  title: 'Components/ProductSize',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ProductSize>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Deffailt: Story = {
  args: {
    size: 'L',
    quantity: 99,
  },
};

export const MultipleProductSizeItem = (): JSX.Element => {
  return (
    <div style={{ display: 'flex', gap: '19px' }}>
      <ProductSize size="M" quantity={3} />
      <ProductSize size="L" quantity={66} />
      <ProductSize size="XXXXL" quantity={999999} />
    </div>
  );
};
