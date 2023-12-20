import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { ProductSizeItem } from './ProductSizeItem';

import { SizeEnum } from 'common/types';

const meta = {
  component: ProductSizeItem,
  tags: ['autodocs'],
  title: 'Components/ProductSizeItem',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onClick: {
      action: 'clicked',
    },
  },
} satisfies Meta<typeof ProductSizeItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const ProductSizeSelectorWithHooks = (): JSX.Element => {
  const [active, setActive] = useState<boolean>(false);

  return (
    <ProductSizeItem
      size={SizeEnum.M}
      quantity={3}
      active={active}
      onClick={() => setActive(prev => !prev)}
    />
  );
};

export const ProductSizeItemToggle = {
  render: () => <ProductSizeSelectorWithHooks />,
};
export const MultipleProductSizeItem = (): JSX.Element => {
  const [active1, setActive1] = useState<boolean>(false);
  const [active2, setActive2] = useState<boolean>(false);
  const [active3, setActive3] = useState<boolean>(false);

  return (
    <div style={{ display: 'flex', gap: '19px' }}>
      <ProductSizeItem
        size={SizeEnum.M}
        quantity={3}
        active={active1}
        onClick={() => setActive1(prev => !prev)}
      />
      <ProductSizeItem
        size={SizeEnum.L}
        quantity={66}
        active={active2}
        onClick={() => setActive2(prev => !prev)}
      />
      <ProductSizeItem
        size={SizeEnum.XXXXL}
        quantity={999999}
        active={active3}
        onClick={() => setActive3(prev => !prev)}
      />
    </div>
  );
};
export const Deffailt: Story = {
  args: {
    size: SizeEnum.L,
    quantity: 99,
    active: true,
  },
};
