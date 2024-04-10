import React, { useState } from 'react';

import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { ProductVariation } from './ProductVariation';

import style from './ProductVariation.module.scss';

const meta = {
  component: ProductVariation,
  tags: ['autodocs'],
  title: 'Ui-kit/ProductParams/ProductVariation',
  argTypes: {
    onClick: { action: 'clicked' },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ProductVariation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    imageUrl: 'https://lookcolor.ru/images/menu/menu-right/pink.png',
    children: 'Var. 1',
    productId: 1,
    selectColor: () => {},
  },
};

export const ListPricingColors: StoryFn = () => {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className={style.list_items}>
      {tempData.map(el => (
        <ProductVariation
          key={el.id}
          selectedColorId={active}
          productId={el.id}
          imageUrl={el.image_url}
          selectColor={setActive}
        >
          {el.title}
        </ProductVariation>
      ))}
    </div>
  );
};

const tempData = [
  {
    id: 1,
    image_url: 'https://lookcolor.ru/images/menu/menu-right/pink.png',
    title: 'Var. 1',
  },
  {
    id: 2,
    image_url: 'https://lookcolor.ru/images/menu/menu-right/red.png',
    title: 'Bundle 2',
  },
  {
    id: 3,
    image_url: 'https://lookcolor.ru/images/menu/menu-right/vinous.png',
    title: 'Variant 5',
  },
];
