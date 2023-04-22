import React, { FC } from 'react';

import { Link } from 'react-router-dom';

import style from '../Top.module.css';

import { BuildProfileMenuProps } from './BuildProfileMenu.props';

const buildProfileMenu: FC<BuildProfileMenuProps> = props => {
  const { isAuth, PROFILE_MENU, handleClickLogout } = props;

  const buildMenu = !isAuth ? PROFILE_MENU.UNAUTHORIZED : PROFILE_MENU.AUTHORIZED;

  return (
    <ul className={style.menu}>
      {buildMenu.map(({ href, label }) => (
        <li key={label} className={style.item}>
          {href ? (
            <Link to={href}>{label}</Link>
          ) : (
            <button type="button" onClick={handleClickLogout}>
              {label}
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default buildProfileMenu;
