import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { ProductColor } from './ProductColor';

import style from './ProductColor.module.scss';

const meta = {
  component: ProductColor,
  tags: ['autodocs'],
  title: 'Components/ProductColor',
} satisfies Meta<typeof ProductColor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ListColorsInfo = (): JSX.Element => {
  return (
    <div className={style.list_items}>
      {tempData.map(el => (
        <ProductColor key={el.id} imageUrl={el.image_url} value={el.value} />
      ))}
    </div>
  );
};

const tempData = [
  {
    id: 2,
    image_url: 'https://lookcolor.ru/images/menu/menu-right/pink.png',
    value: 4,
  },
  { id: 3, image_url: 'https://lookcolor.ru/images/menu/menu-right/red.png', value: 2 },
  {
    id: 4,
    image_url: 'https://lookcolor.ru/images/menu/menu-right/vinous.png',
    value: 18,
  },
  {
    id: 5,
    image_url: 'https://lookcolor.ru/images/menu/menu-right/orange.png',
    value: 32,
  },
  {
    id: 6,
    image_url: 'https://lookcolor.ru/images/menu/menu-right/coral.png',
    value: 11,
  },
  {
    id: 7,
    image_url: 'https://lookcolor.ru/images/menu/menu-right/gold.png',
    value: 12,
  },
  {
    id: 8,
    image_url: 'https://lookcolor.ru/images/menu/menu-right/turquoise.png',
    value: 19,
  },
];
