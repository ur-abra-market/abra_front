import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { ProductColor } from './ProductColor';

import style from './ProductColor.module.scss';

const meta = {
  component: ProductColor,
  tags: ['autodocs'],
  title: 'Ui-kit/ProductParams/ProductColor',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ProductColor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ListColorsInfo = (): JSX.Element => {
  return (
    <div className={style.list_items}>
      {tempData.map(el => (
        <ProductColor
          colorName={el.colorName}
          key={el.id}
          imageUrl={el.image_url}
          value={el.value}
        />
      ))}
    </div>
  );
};

const tempData = [
  {
    id: 2,
    image_url: 'https://lookcolor.ru/images/menu/menu-right/pink.png',
    colorName: 'pink',
    value: 4,
  },
  {
    id: 3,
    image_url: 'https://lookcolor.ru/images/menu/menu-right/red.png',
    colorName: 'red',
    value: 2,
  },
  {
    id: 4,
    image_url: 'https://lookcolor.ru/images/menu/menu-right/vinous.png',
    colorName: 'vinous',
    value: 18,
  },
  {
    id: 5,
    image_url: 'https://lookcolor.ru/images/menu/menu-right/orange.png',
    colorName: 'orange',
    value: 32,
  },
  {
    id: 6,
    image_url: 'https://lookcolor.ru/images/menu/menu-right/coral.png',
    colorName: 'coral',
    value: 11,
  },
  {
    id: 7,
    image_url: 'https://lookcolor.ru/images/menu/menu-right/gold.png',
    colorName: 'gold',
    value: 12,
  },
  {
    id: 8,
    image_url: 'https://lookcolor.ru/images/menu/menu-right/turquoise.png',
    colorName: 'turquoise',
    value: 19,
  },
];
