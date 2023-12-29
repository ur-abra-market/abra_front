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
    onClick: {
      action: 'clicked',
    },
  },
} satisfies Meta<typeof ProductSizeSelectable>;

export default meta;
type Story = StoryObj<typeof meta>;

const ProductSizeSelectorWithHooks = (): JSX.Element => {
  const [active, setActive] = useState<boolean>(false);

  return (
    <ProductSizeSelectable
      size={SizeEnum.M}
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
      <ProductSizeSelectable
        size={SizeEnum.M}
        selected={active1}
        onClick={() => setActive1(prev => !prev)}
      />
      <ProductSizeSelectable
        size={SizeEnum.L}
        selected={active2}
        onClick={() => setActive2(prev => !prev)}
      />
      <ProductSizeSelectable
        size={SizeEnum.XXXXL}
        selected={active3}
        onClick={() => setActive3(prev => !prev)}
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
