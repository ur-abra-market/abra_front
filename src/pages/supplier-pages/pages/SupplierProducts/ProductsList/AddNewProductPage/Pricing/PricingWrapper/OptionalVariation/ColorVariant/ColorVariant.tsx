import React, { FC, useState } from 'react';

import { Label, PricingColor } from 'ui-kit';

import style from './ColorVariant.module.scss';

const tempData = [
  {
    id: 2,
    image_url: 'https://lookcolor.ru/images/menu/menu-right/pink.png',
    title: 'Var. 1',
  },
  {
    id: 3,
    image_url: 'https://lookcolor.ru/images/menu/menu-right/red.png',
    title: 'Bundle 2',
  },
  {
    id: 4,
    image_url: 'https://lookcolor.ru/images/menu/menu-right/vinous.png',
    title: 'Variant 5',
  },
  {
    id: 5,
    image_url: 'https://lookcolor.ru/images/menu/menu-right/orange.png',
    title: 'Bundle 2',
  },
  {
    id: 6,
    image_url: 'https://lookcolor.ru/images/menu/menu-right/coral.png',
    title: 'Bundle 2',
  },
  {
    id: 7,
    image_url: 'https://lookcolor.ru/images/menu/menu-right/gold.png',
    title: 'Bundle 5',
  },
  {
    id: 8,
    image_url: 'https://lookcolor.ru/images/menu/menu-right/turquoise.png',
    title: 'Bundle 3',
  },
]; /* todo color временно пока не приходят цвета */

export const ColorVariant: FC = (): JSX.Element => {
  const [active, setActive] = useState<number | null>(null); /* todo color */

  return (
    <Label label="Choose variations for markup or discount (optional)">
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
    </Label>
  );
};
