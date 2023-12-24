import React, { FC, useState } from 'react';

import cn from 'classnames';

import { WithoutColor } from 'assets/icons';
import { Paragraph } from 'ui-kit/index';

import style from './ProductColor.module.scss';

interface IProductColorProps {
  colors: any[];
}

export const ProductColor: FC<IProductColorProps> = ({ colors }): JSX.Element => {
  const [active, setActive] = useState(null);

  const temp =
    colors.length === 0
      ? [
          { id: 1, color: null },
          { id: 2, color: '#FFF' },
          { id: 3, color: '#F9F3ED' },
          { id: 4, color: '#F0E6D1' },
          { id: 5, color: '#BFBFC0' },
          { id: 6, color: '#484848' },
          {
            id: 7,
            color: 'linear-gradient(258deg, #000 0%, #DEDEDE 51.6%, #4E4E4E 100%)',
          },
          {
            id: 8,
            color: 'linear-gradient(258deg, #856565 0%, #D3BFBF 51.6%, #665247 100%)',
          },
          { id: 9, color: '#F00' },
          { id: 10, color: '#F90' },
          { id: 11, color: '#FFD600' },
          { id: 12, color: '#53DA71' },
          { id: 13, color: '#6DDCFF' },
          { id: 14, color: '#487BFF' },
          { id: 15, color: '#BE58E1' },
          { id: 16, color: '#931FEE' },
        ]
      : colors; // заглушка пока бэк нечего не даёт проверить

  return (
    <div className={style.product_color_container}>
      <Paragraph size="m" className={style.text}>
        Select color
      </Paragraph>
      <ul className={style.items}>
        {temp.map(el =>
          el.color ? (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
            <li
              onClick={() => setActive(el.id)}
              key={el.id}
              style={{ background: el.color }}
              className={cn(style.item, { [style.active]: el.id === active })}
            />
          ) : (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
            <li
              onClick={() => setActive(el.id)}
              key={el.id}
              className={cn(style.item, { [style.active]: el.id === active })}
            >
              <WithoutColor />
            </li>
          ),
        )}
      </ul>
    </div>
  );
};
