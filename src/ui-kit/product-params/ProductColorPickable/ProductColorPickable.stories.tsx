import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { ProductColorPickable } from './ProductColorPickable';

import style from './ProductColorPickable.module.scss';

const meta = {
  component: ProductColorPickable,
  tags: ['autodocs'],
  title: 'Ui-kit/ProductParams/ProductColorPickable',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ProductColorPickable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ListColors = (): JSX.Element => {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className={style.list_items}>
      {tempData.map(el => (
        <ProductColorPickable
          colorName={el.colorName}
          key={el.id}
          selectedColorId={active}
          id={el.id}
          imageUrl={el.image_url}
          selectColor={setActive}
        />
      ))}
    </div>
  );
};

const tempData = [
  {
    id: 2,
    colorName: 'pink',
    image_url: 'https://lookcolor.ru/images/menu/menu-right/pink.png',
  },
  {
    id: 3,
    colorName: 'red',
    image_url: 'https://lookcolor.ru/images/menu/menu-right/red.png',
  },
  {
    id: 4,
    colorName: 'vinous',
    image_url: 'https://lookcolor.ru/images/menu/menu-right/vinous.png',
  },
  {
    id: 5,
    colorName: 'orange',
    image_url: 'https://lookcolor.ru/images/menu/menu-right/orange.png',
  },
  {
    id: 6,
    colorName: 'coral',
    image_url: 'https://lookcolor.ru/images/menu/menu-right/coral.png',
  },
  {
    id: 7,
    colorName: 'gold',
    image_url: 'https://lookcolor.ru/images/menu/menu-right/gold.png',
  },
  {
    id: 8,
    colorName: 'turquoise',
    image_url: 'https://lookcolor.ru/images/menu/menu-right/turquoise.png',
  },
];
