import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { ProductColorInteractive } from './ProductColorInteractive';

import style from './ProductColorInteractive.module.scss';

const meta = {
  component: ProductColorInteractive,
  tags: ['autodocs'],
  title: 'Components/ProductColorInteractive',
} satisfies Meta<typeof ProductColorInteractive>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ListColors = (): JSX.Element => {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className={style.list_items}>
      {tempData.map(el => (
        <ProductColorInteractive
          key={el.id}
          selectedColorId={active}
          id={el.id}
          image_url={el.image_url}
          selectColor={setActive}
        />
      ))}
    </div>
  );
};

const tempData = [
  { id: '2', image_url: 'https://lookcolor.ru/images/menu/menu-right/pink.png' },
  { id: '3', image_url: 'https://lookcolor.ru/images/menu/menu-right/red.png' },
  { id: '4', image_url: 'https://lookcolor.ru/images/menu/menu-right/vinous.png' },
  { id: '5', image_url: 'https://lookcolor.ru/images/menu/menu-right/orange.png' },
  {
    id: '6',
    image_url: 'https://lookcolor.ru/images/menu/menu-right/coral.png',
  },
  {
    id: '7',
    image_url: 'https://lookcolor.ru/images/menu/menu-right/gold.png',
  },
  {
    id: '8',
    image_url: 'https://lookcolor.ru/images/menu/menu-right/turquoise.png',
  },
];
