import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { ProductSizeSelectable } from './ProductSizeSelectable';

import { SizeEnum } from 'common/types';

const meta = {
  component: ProductSizeSelectable,
  tags: ['autodocs'],
  title: 'Components/ProductSizeSelectable',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    handleSizeSelect: {
      action: 'clicked',
    },
  },
} satisfies Meta<typeof ProductSizeSelectable>;

export default meta;
type Story = StoryObj<typeof meta>;

const ProductSizeSelectorWithHooks = (): JSX.Element => {
  const [selected, setSelected] = useState<boolean>(false);

  return (
    <ProductSizeSelectable
      size={SizeEnum.M}
      selected={selected}
      handleSizeSelect={() => setSelected(prev => !prev)}
    />
  );
};

export const ProductSizeItemToggle = {
  render: () => <ProductSizeSelectorWithHooks />,
};
export const MultipleProductSizeItem = (): JSX.Element => {
  const [selected1, setSelected1] = useState<boolean>(false);
  const [selected2, setSelected2] = useState<boolean>(false);
  const [selected3, setSelected3] = useState<boolean>(false);

  return (
    <div style={{ display: 'flex', gap: '19px' }}>
      <ProductSizeSelectable
        size={SizeEnum.M}
        selected={selected1}
        handleSizeSelect={() => setSelected1(prev => !prev)}
      />
      <ProductSizeSelectable
        size={SizeEnum.L}
        selected={selected2}
        handleSizeSelect={() => setSelected2(prev => !prev)}
      />
      <ProductSizeSelectable
        size={SizeEnum.XXXXL}
        selected={selected3}
        handleSizeSelect={() => setSelected3(prev => !prev)}
      />
    </div>
  );
};
export const Deffailt: Story = {
  args: {
    size: SizeEnum.L,
    selected: true,
  },
};
