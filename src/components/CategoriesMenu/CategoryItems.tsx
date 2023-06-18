import React, { FC } from 'react';

import cn from 'classnames';
import { NavLink } from 'react-router-dom';

import { ItemsProps } from './CategoriesMenu';
import style from './CategoriesMenu.module.css';

export const Items: FC<ItemsProps> = (props): JSX.Element => {
  const { items } = props;

  const activeStyle = {
    color: ' var(--red)',
  };

  const mappedItems = items?.map(item => (
    <li key={item.id}>
      <NavLink
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
        to={`/products-list/${item.id}`}
      >
        {item.name}
      </NavLink>
      {item.children?.map(i => (
        <div className={style.items_anchor} key={i.id}>
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
