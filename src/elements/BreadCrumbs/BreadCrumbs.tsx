import React, { FC } from 'react';

import cn from 'classnames';
import { NavLink } from 'react-router-dom';

import style from './BreadCrumbs.module.scss';

interface IBreadCrumbsProps {
  parentId: number | null;
  categoryName: string;
  className?: string;
}

export const BreadCrumbs: FC<IBreadCrumbsProps> = ({
  categoryName,
  parentId,
  className,
}): JSX.Element => {
  // todo пока так, не получаем всех значений
  const itemList = [
    { id: 1, name: 'Clothing' },
    { id: 2, name: 'For women' },
    { id: 3, name: categoryName },
  ];

  return (
    <ul className={cn(style.list, className)}>
      {itemList.map((el, i, arr) =>
        i < arr.length - 1 ? (
          <li key={el.id} className={style.list_items}>
            <NavLink className={style.item_link} to="#">
              {el.name}
            </NavLink>
            <span>&#62;</span>
          </li>
        ) : (
          <li key={el.id} className={style.list_items}>
            <NavLink className={style.item_link} to="#">
              {el.name}
            </NavLink>
          </li>
        ),
      )}
    </ul>
  );
};
