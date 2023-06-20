import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react';

import cn from 'classnames';
import { NavLink, useMatch } from 'react-router-dom';

import { Button } from '../../../../ui-kit';

import style from './BuildProfileMenu.module.scss';

import { MENU } from 'common/constants/header-menu/headerMenu';

export interface BuildProfileMenuProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> {
  isAuth: boolean;
  userRole?: 'supplier' | 'seller';
  handleClickLogout: () => void;
  active: boolean;
  setActive: (value: boolean) => void;
}

export const BuildProfileMenu: FC<BuildProfileMenuProps> = ({
  isAuth,
  userRole,
  handleClickLogout,
  active,
  setActive,
}) => {
  const menuFor = userRole === 'supplier' ? MENU.SUPPLIER : MENU.SELLER;
  const buildMenu = !isAuth ? MENU.UNAUTHORIZED : menuFor;

  const location = useMatch('/personal_account');

  const handleOnClick = (): void => {
    setActive(false);
  };

  return (
    <ul
      className={cn(style.menu, {
        [style.menu_active]: active,
        [style.menu_inactive]: !active,
        [style.menu_main]: location?.pathname !== '/personal_account/*',
        [style.menu_profile]: location?.pathname === '/personal_account',
        [style.menu_supplier]: userRole === 'supplier',
      })}
    >
      {buildMenu.map(({ href, label }) => (
        <li key={label} className={style.item}>
          {href !== '/logout' ? (
            <NavLink to={href} state={label} onClick={handleOnClick}>
              {label}
            </NavLink>
          ) : (
            <Button
              type="button"
              onClick={handleClickLogout}
              color="white"
              className={style.logout_btn}
            >
              {label}
            </Button>
          )}
        </li>
      ))}
    </ul>
  );
};
