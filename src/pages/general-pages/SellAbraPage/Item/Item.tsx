import React, { FC } from 'react';

import style from './Item.module.scss';

interface IItem {
  numberItem: number;
  title: string;
  description: string;
}

export const Item: FC<IItem> = ({ numberItem, description, title }) => (
  <div className={style.item}>
    <span className={style.number}>{numberItem}</span>
    <div>
      <p className={style.title}>{title}</p>
      <p className={style.description}>{description}</p>
    </div>
  </div>
);
