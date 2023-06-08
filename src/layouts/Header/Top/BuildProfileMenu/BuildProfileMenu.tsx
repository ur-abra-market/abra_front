import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react';

import cn from 'classnames';
import { Link, useMatch } from 'react-router-dom';

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

  const location = useMatch('/personal-account');

  const handleOnClick = (): void => {
    setActive(false);
  };

  return (
    <ul
      className={cn(style.menu, {
        [style.menu_active]: active,
        [style.menu_inactive]: !active,
        [style.menu_main]: location?.pathname !== '/personal-account/*',
        [style.menu_profile]: location?.pathname === '/personal-account',
      })}
    >
      {buildMenu.map(({ href, label }) => (
        <li key={label} className={style.item}>
          {href !== '/logout' ? (
            <Link to={href} state={label} onClick={handleOnClick}>
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
