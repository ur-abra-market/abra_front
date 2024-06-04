import React, { FC, useEffect, useState } from 'react';

import { ProductVariation } from 'ui-kit';

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
    title: 'Var. 2',
  },
  {
    id: 4,
    image_url: 'https://lookcolor.ru/images/menu/menu-right/vinous.png',
    title: 'Var. 3',
  },
  {
    id: 5,
    image_url: 'https://lookcolor.ru/images/menu/menu-right/orange.png',
    title: 'Var. 4',
  },
  {
    id: 6,
    image_url: 'https://lookcolor.ru/images/menu/menu-right/coral.png',
    title: 'Var. 5',
  },
  {
    id: 7,
    image_url: 'https://lookcolor.ru/images/menu/menu-right/gold.png',
    title: 'Var. 6',
  },
  {
    id: 8,
    image_url: 'https://lookcolor.ru/images/menu/menu-right/turquoise.png',
    title: 'Var. 7',
  },
]; /* todo color временно пока не приходят цвета */

interface IColorVariant {
  price?: number;
}

export const ColorVariant: FC<IColorVariant> = ({ price }): JSX.Element => {
  const [active, setActive] = useState<number | null>(null); /* todo color */

  useEffect(() => {
    if (price) {
      setActive(null);
    }
  }, [price]);

  return (
    <>
      <span className={style.label_text}>
        Choose variations for markup or discount (optional)
      </span>
      <div className={style.list_items}>
        {tempData.map((el, index) => (
          <ProductVariation
            key={index}
            selectedColorId={active}
            productId={el.id}
            imageUrl={el.image_url}
            selectColor={setActive}
            disabled={!price}
          >
            {el.title}
          </ProductVariation>
        ))}
      </div>
    </>
  );
};
