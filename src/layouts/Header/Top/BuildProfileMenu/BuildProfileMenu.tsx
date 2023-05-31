import React, { FC } from 'react';

import cn from 'classnames';
import { Link, useMatch } from 'react-router-dom';

import { Button } from '../../../../ui-kit';
import style from '../Top.module.css';

import { BuildProfileMenuProps } from './BuildProfileMenu.props';

const BuildProfileMenu: FC<BuildProfileMenuProps> = props => {
  const { isAuth, PROFILE_MENU, handleClickLogout } = props;

  const buildMenu = !isAuth ? PROFILE_MENU.UNAUTHORIZED : PROFILE_MENU.AUTHORIZED;

  const location = useMatch('/personal-account');

  return (
    <ul
      className={cn(style.menu, {
        [style.menu_main]: location?.pathname !== '/personal-account/*',
        [style.menu_profile]: location?.pathname === '/personal-account',
      })}
    >
      {buildMenu.map(({ href, label }) => (
        <li key={label} className={style.item}>
          {href !== '/logout' ? (
            <Link to={href} state={label}>
              {label}
            </Link>
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
