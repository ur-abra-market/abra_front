import React, { FC } from 'react';

import { NavLink } from 'react-router-dom';

import style from './HeaderMenuItem.module.scss';

interface IHeaderMenuItem {
  path: string;
  label: string;
}

export const HeaderMenuItem: FC<IHeaderMenuItem> = ({ label, path }): JSX.Element => {
  return (
    <li className={style.menu_item}>
      <NavLink
        to={path}
        className={({ isActive }) =>
          isActive ? `${style.active_item}` : `${style.item}`
        }
      >
        {label}
      </NavLink>
    </li>
  );
};
