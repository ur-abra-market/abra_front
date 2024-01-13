import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { ProductColorSelectable } from './ProductColorSelectable';

import style from './ProductColorSelectable.module.scss';

const meta = {
  component: ProductColorSelectable,
  tags: ['autodocs'],
  title: 'Components/ProductColorSelectable',
} satisfies Meta<typeof ProductColorSelectable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ListColors = (): JSX.Element => {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className={style.list_items}>
      {tempData.map(el => (
        <ProductColorSelectable
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
  { id: 2, image_url: 'https://lookcolor.ru/images/menu/menu-right/pink.png' },
  { id: 3, image_url: 'https://lookcolor.ru/images/menu/menu-right/red.png' },
  { id: 4, image_url: 'https://lookcolor.ru/images/menu/menu-right/vinous.png' },
  { id: 5, image_url: 'https://lookcolor.ru/images/menu/menu-right/orange.png' },
  {
    id: 6,
    image_url: 'https://lookcolor.ru/images/menu/menu-right/coral.png',
  },
  {
    id: 7,
    image_url: 'https://lookcolor.ru/images/menu/menu-right/gold.png',
  },
  {
    id: 8,
    image_url: 'https://lookcolor.ru/images/menu/menu-right/turquoise.png',
  },
];
