import React, { useState } from 'react';

import cn from 'classnames';

import { Paragraph } from 'ui-kit';

import style from './ProductSize.module.scss';

export const ProductSize = (): JSX.Element => {
  const [active, setActive] = useState<null | number>(null);

  const temp = [
    { id: 1, size: 'XS' },
    { id: 2, size: 'S' },
    { id: 3, size: 'M' },
    { id: 4, size: 'L' },
    { id: 5, size: 'XL' },
    { id: 6, size: 'XXL' },
    { id: 7, size: 'XXXL' },
    { id: 8, size: 'XXXXL' },
  ];

  return (
    <div className={style.product_size_container}>
      <Paragraph size="m" className={style.text}>
        Size and quantity
      </Paragraph>
      <ul className={style.items}>
        {temp.map(el => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
          <li onClick={() => setActive(el.id)} key={el.id}>
            <span className={cn(style.item, { [style.active]: el.id === active })}>
              {el.size}
            </span>
            <span className={style.remains}>4</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
