import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { ProductSizePickable } from './ProductSizePickable';

const meta = {
  component: ProductSizePickable,
  tags: ['autodocs'],
  title: 'Ui-kit/ProductParams/ProductSizePickable',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ProductSizePickable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ProductSizeItem = {
  render: () => {
    const [selected, setSelected] = useState<number | null>(null);

    return (
      <ProductSizePickable
        size="M"
        handleSelectSize={setSelected}
        selectedSizeId={selected}
        id="1"
      />
    );
  },
};

export const MultipleProductSizeItem = (): JSX.Element => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ display: 'flex', gap: '19px' }}>
      <ProductSizePickable
        size="M"
        handleSelectSize={setSelected}
        selectedSizeId={selected}
        id="1"
      />
      <ProductSizePickable
        size="L"
        handleSelectSize={setSelected}
        selectedSizeId={selected}
        id="2"
      />
      <ProductSizePickable
        size="XL"
        handleSelectSize={setSelected}
        selectedSizeId={selected}
        id="3"
      />
    </div>
  );
};
