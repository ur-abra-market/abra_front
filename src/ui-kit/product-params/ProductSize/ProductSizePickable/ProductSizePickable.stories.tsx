import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { ProductSizePickable } from './ProductSizePickable';

const meta = {
  component: ProductSizePickable,
  tags: ['autodocs'],
  title: 'Components/ProductSizePickable',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ProductSizePickable>;

export default meta;
type Story = StoryObj<typeof meta>;

const ProductSizeSelectorWithHooks = (): JSX.Element => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <ProductSizePickable
      size="M"
      handleSelectSize={setSelected}
      selectedSizeId={selected}
      id="1"
    />
  );
};

export const ProductSizeItemToggle = {
  render: () => <ProductSizeSelectorWithHooks />,
};
export const MultipleProductSizeItem = (): JSX.Element => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ display: 'flex', gap: '19px' }}>
      <ProductSizePickable
        size="M"
        handleSelectSize={() => setSelected(1)}
        selectedSizeId={selected}
        id="1"
      />
      <ProductSizePickable
        size="L"
        handleSelectSize={() => setSelected(1)}
        selectedSizeId={selected}
        id="2"
      />
      <ProductSizePickable
        size="XXXXL"
        handleSelectSize={() => setSelected(1)}
        selectedSizeId={selected}
        id="3"
      />
    </div>
  );
};
