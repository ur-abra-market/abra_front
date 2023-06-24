import React, { FC, JSX } from 'react';

import cn from 'classnames';
import { NavLink } from 'react-router-dom';

import style from './HeaderNav.module.scss';

import { HEADER_NAV_CONTENT } from 'components/HeaderNav/HeaderNavContent';

interface IHeaderNavProps {
  type: 'seller' | 'supplier';
  className?: string;
}

export const HeaderNav: FC<IHeaderNavProps> = ({ type, className }): JSX.Element => {
  const navItems = HEADER_NAV_CONTENT[type];

  return (
    <ul className={cn(style.container, className)}>
      {navItems.map(el => (
        <li key={el.id}>
          <NavLink
            to={el.path}
            className={({ isActive }) =>
              isActive ? `${style.active_item}` : `${style.item}`
            }
          >
            {el.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
