import React, { FC } from 'react';

import { NavLink } from 'react-router-dom';

import { ICategory } from 'common/types';

import style from './BreadCrumbs.module.scss';

interface IBreadCrumbs {
  breadCrumbs: ICategory[];
}

export const BreadCrumbs: FC<IBreadCrumbs> = ({ breadCrumbs }): JSX.Element => {
  return (
    <ul className={style.list}>
      {breadCrumbs.map((el, i, arr) =>
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
