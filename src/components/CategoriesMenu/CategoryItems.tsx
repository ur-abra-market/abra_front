import React, { FC } from 'react';

import cn from 'classnames';
import { NavLink } from 'react-router-dom';

import { ItemsProps } from './CategoriesMenu';
import style from './CategoriesMenu.module.scss';

export const Items: FC<ItemsProps> = ({ items }): JSX.Element => {
  const mappedItems = items?.map(item => (
    <li className={style.list_item} key={item.id}>
      <NavLink className={style.link} to={`/products-list/${item.id}`}>
        {item.name}
      </NavLink>
      {item.children?.map(i => (
        <div className={style.items_links} key={i.id}>
          {i.name}
        </div>
      ))}
    </li>
  ));

  return (
    <div className={style.items_wrapper}>
      <div className={cn(style.items_container)}>{mappedItems}</div>
    </div>
  );
};
