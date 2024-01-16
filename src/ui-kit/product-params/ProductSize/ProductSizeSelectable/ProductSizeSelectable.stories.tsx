import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { ProductSizeSelectable } from './ProductSizeSelectable';

const meta = {
  component: ProductSizeSelectable,
  tags: ['autodocs'],
  title: 'Components/ProductSizeSelectable',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ProductSizeSelectable>;

export default meta;
type Story = StoryObj<typeof meta>;

const ProductSizeSelectorWithHooks = (): JSX.Element => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <ProductSizeSelectable
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
      <ProductSizeSelectable
        size="M"
        handleSelectSize={() => setSelected(1)}
        selectedSizeId={selected}
        id="1"
      />
      <ProductSizeSelectable
        size="L"
        handleSelectSize={() => setSelected(1)}
        selectedSizeId={selected}
        id="2"
      />
      <ProductSizeSelectable
        size="XXXXL"
        handleSelectSize={() => setSelected(1)}
        selectedSizeId={selected}
        id="3"
      />
    </div>
  );
};
