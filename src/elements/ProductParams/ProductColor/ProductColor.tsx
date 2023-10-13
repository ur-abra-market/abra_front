import React, { FC, useState } from 'react';

import cn from 'classnames';

import { ButtonIcon, Paragraph } from 'ui-kit';

import style from './ProductColor.module.scss';

interface IProductColorProps {
  colors: any[];
}

export const ProductColor: FC<IProductColorProps> = ({ colors }): JSX.Element => {
  const [active, setActive] = useState(null);

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
        Select color:
      </Paragraph>
      <ul className={style.items}>
        {temp.map(el => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
          <li
            onClick={() => setActive(el.id)}
            key={el.id}
            style={{ background: el.color }}
            className={cn(style.item, { [style.active]: el.id === active })}
          />
        ))}
      </ul>
    </div>
  );
};
