import React, { FC } from 'react';

import { Link } from 'react-router-dom';

import { Button } from '../../../../components/ui-kit';
import style from '../Top.module.css';

import { BuildProfileMenuProps } from './BuildProfileMenu.props';

const buildProfileMenu: FC<BuildProfileMenuProps> = props => {
  const { isAuth, PROFILE_MENU, handleClickLogout } = props;

  const buildMenu = !isAuth ? PROFILE_MENU.UNAUTHORIZED : PROFILE_MENU.AUTHORIZED;

  return (
    <ul className={style.menu}>
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

export default buildProfileMenu;
