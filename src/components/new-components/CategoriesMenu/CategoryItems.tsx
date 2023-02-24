import React, { FC } from 'react';

import cn from 'classnames';

import { ItemsProps } from './CategoriesMenu';
import style from './CategoriesMenu.module.css';

export const Items: FC<ItemsProps> = (props): JSX.Element => {
  const { gender, items } = props;

  const mappedItems = items?.map((item, index) => <li key={index}>{item}</li>);

  return (
    <div>
      <h4>{gender}</h4>
      <ul className={cn(style.items_container)}>{mappedItems}</ul>
    </div>
  );
};
