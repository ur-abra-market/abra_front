import React, { FC } from 'react';

import { Paragraph } from 'ui-kit';

import style from './ProductColor.module.scss';

interface IProductColorProps {
  colors: any[];
}

export const ProductColor: FC<IProductColorProps> = ({ colors }): JSX.Element => {
  const temp =
    colors.length === 0
      ? [
          { id: 1, color: '#000' },
          { id: 2, color: '#A98C6B' },
          { id: 3, color: '#1E5112' },
          { id: 4, color: '#BEBEBE' },
        ]
      : colors; // заглушка пока бэк нечего не даёт проверить

  return (
    <div className={style.product_color_container}>
      <Paragraph size="s" className={style.text}>
        Select color
      </Paragraph>
      <ul className={style.items}>
        {temp.map(el => (
          <li key={el.id} style={{ background: el.color }} className={style.item} />
        ))}
      </ul>
    </div>
  );
};
