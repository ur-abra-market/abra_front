import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { ProductSize } from './ProductSize';

import { SizeEnum } from 'common/types';

const meta = {
  component: ProductSize,
  tags: ['autodocs'],
  title: 'Components/ProductSize',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onClick: {
      action: 'clicked',
    },
  },
} satisfies Meta<typeof ProductSize>;

export default meta;
type Story = StoryObj<typeof meta>;

const ProductSizeSelectorWithHooks = (): JSX.Element => {
  const [active, setActive] = useState<boolean>(false);

  return (
    <ProductSize
      size={SizeEnum.M}
      quantity={3}
      selected={active}
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
      <ProductSize
        size={SizeEnum.M}
        quantity={3}
        selected={active1}
        onClick={() => setActive1(prev => !prev)}
      />
      <ProductSize
        size={SizeEnum.L}
        quantity={66}
        selected={active2}
        onClick={() => setActive2(prev => !prev)}
      />
      <ProductSize
        size={SizeEnum.XXXXL}
        quantity={999999}
        selected={active3}
        onClick={() => setActive3(prev => !prev)}
      />
    </div>
  );
};
export const Deffailt: Story = {
  args: {
    size: SizeEnum.L,
    quantity: 99,
    selected: true,
  },
};
