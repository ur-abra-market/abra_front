import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import cn from 'classnames';

import { CellColor } from './CellColor';

import style from './CellColor.module.scss';

const meta = {
  component: CellColor,
  tags: ['autodocs'],
  title: 'Components/CellColor',
} satisfies Meta<typeof CellColor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ListColors = (): JSX.Element => {
  const [active, setActive] = useState<string | null>(null);

  return <CellColor activeId={active} onClick={setActive} image_data={tempData} />;
};

const tempData = [
  { id: '1', image_url: '' },
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
