import React, { useState } from 'react';

import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { ProductVariation } from './ProductVariation';

import style from './ProductVariation.module.scss';
import cn from 'classnames';

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
    title: 'Var. 1',
    selectedColorId: 1,
    variationId: 1,
  },
};

export const ListPricingColors: StoryFn = () => {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className={style.list_items}>
      {tempData.map((el, index) => (
        <ProductVariation
          key={index}
          changeActiveVariation={() => {}}
          variationId={el.id}
          imageUrl={el.image_url}
          selectedColorId={1}
          title={el.title}
        />
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
