import React, { FC } from 'react';

import cn from 'classnames';
import { NavLink } from 'react-router-dom';

import { ItemsProps } from './CategoriesMenu';
import style from './CategoriesMenu.module.css';

export const Items: FC<ItemsProps> = (props): JSX.Element => {
  const { gender, items } = props;

  const activeStyle = {
    color: ' var(--red)',
  };

  const mappedItems = items?.map((item, index) => (
    <li key={index}>
      <NavLink
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
        to={`/products-list/${item.id}`}
      >
        {item.name}
      </NavLink>
    </li>
  ));

  return (
    <div>
      <h4>{gender}</h4>
      <ul className={cn(style.items_container)}>{mappedItems}</ul>
    </div>
  );
};
