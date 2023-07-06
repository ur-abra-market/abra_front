import React, { FC } from 'react';

import { NavLink } from 'react-router-dom';

import style from './BreadCrumbs.module.scss';

interface IBreadCrumbsProps {
  // categoryPath?: string[];
  categoryName: string;
}

export const BreadCrumbs: FC<IBreadCrumbsProps> = ({ categoryName }): JSX.Element => {
  const itemList = [
    { id: 1, name: 'Clothing' },
    { id: 2, name: 'For women' },
    { id: 3, name: categoryName },
  ]; // пока так, не получаем всех значений

  return (
    <ul className={style.items}>
      {itemList.map((el, i, arr) =>
        i < arr.length - 1 ? (
          <li key={el.id} className={style.item}>
            <NavLink className={style.item_link} to="#">
              {el.name}
            </NavLink>
            <span>&#62;</span>
          </li>
        ) : (
          <li key={el.id} className={style.item}>
            <NavLink className={style.item_link} to="#">
              {el.name}
            </NavLink>
          </li>
        ),
      )}
    </ul>
  );
};
