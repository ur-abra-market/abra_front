import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react';

import cn from 'classnames';
import { NavLink, useMatch } from 'react-router-dom';

import { Button } from '../../../../ui-kit';
import { ProfileMenu } from '../Top';
import style from '../Top.module.scss';

export interface BuildProfileMenuProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> {
  isAuth: boolean;
  PROFILE_MENU: ProfileMenu;
  handleClickLogout: () => void;
  active: boolean;
  setActive: (value: boolean) => void;
}

const BuildProfileMenu: FC<BuildProfileMenuProps> = ({
  isAuth,
  PROFILE_MENU,
  handleClickLogout,
  active,
  setActive,
}) => {
  const buildMenu = !isAuth ? PROFILE_MENU.UNAUTHORIZED : PROFILE_MENU.AUTHORIZED;

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

export default BuildProfileMenu;
