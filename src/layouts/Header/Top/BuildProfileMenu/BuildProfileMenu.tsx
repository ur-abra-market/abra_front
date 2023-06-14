import React, { FC } from 'react';

import cn from 'classnames';
import { NavLink, useMatch } from 'react-router-dom';

import { Button } from '../../../../ui-kit';
import style from '../Top.module.css';

import { BuildProfileMenuProps } from './BuildProfileMenu.props';

const BuildProfileMenu: FC<BuildProfileMenuProps> = props => {
  const { isAuth, PROFILE_MENU, handleClickLogout } = props;

  const buildMenu = !isAuth ? PROFILE_MENU.UNAUTHORIZED : PROFILE_MENU.AUTHORIZED;

  const location = useMatch('/personal_account');

  return (
    <ul
      className={cn(style.menu, {
        [style.menu_main]: location?.pathname !== '/personal_account/*',
        [style.menu_profile]: location?.pathname === '/personal_account',
      })}
    >
      {buildMenu.map(({ href, label }) => (
        <li key={label} className={style.item}>
          {href !== '/logout' ? (
            <NavLink to={href} state={label}>
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
