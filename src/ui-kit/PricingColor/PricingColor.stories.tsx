import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { PricingColor } from './PricingColor';

import style from './PricingColor.module.scss';

const meta = {
  component: PricingColor,
  tags: ['autodocs'],
  title: 'Components/PricingColor',
} satisfies Meta<typeof PricingColor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ListPricingColors = (): JSX.Element => {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className={style.list_items}>
      {tempData.map(el => (
        <PricingColor
          key={el.id}
          selectedColorId={active}
          id={el.id}
          imageUrl={el.image_url}
          selectColor={setActive}
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
