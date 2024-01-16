import type { Meta, StoryObj } from '@storybook/react';

import { ProductSizeLocked } from './ProductSizeLocked';

const meta = {
  component: ProductSizeLocked,
  tags: ['autodocs'],
  title: 'Components/ProductSizeLocked',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ProductSizeLocked>;

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
      <ProductSizeLocked size="M" quantity={3} />
      <ProductSizeLocked size="L" quantity={66} />
      <ProductSizeLocked size="XXXXL" quantity={999999} />
    </div>
  );
};
