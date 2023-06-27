import React, { DetailedHTMLProps, FC, HTMLAttributes, useEffect } from 'react';

import cn from 'classnames';
import { NavLink, useMatch, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import style from 'elements/HeaderMenu/HeaderMenu.module.scss';
import { HEADER_MENU_CONTENT } from 'elements/HeaderMenu/headerMenuContent';
import { HOME, PERSONAL_ACCOUNT } from 'routes';
import { logout } from 'store/reducers/authSlice';
import { isAuthSelector, userRoleSelector } from 'store/reducers/authSlice/selectors';
import { Button } from 'ui-kit';

export interface IHeaderMenu
  extends DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> {
  active: boolean;
  setActive: () => void;
}

export const HeaderMenu: FC<IHeaderMenu> = ({ active, setActive }) => {
  const isAuth = useAppSelector(isAuthSelector);
  const userRole = useAppSelector(userRoleSelector);
  const dispatch = useAppDispatch();
  const menuContent =
    userRole === 'supplier' ? HEADER_MENU_CONTENT.SUPPLIER : HEADER_MENU_CONTENT.SELLER;
  const buildMenu = !isAuth ? HEADER_MENU_CONTENT.UNAUTHORIZED : menuContent;
  const location = useMatch(PERSONAL_ACCOUNT);
  const navigate = useNavigate();
  const menuCLasses = cn(style.menu, {
    [style.menu_active]: active,
    [style.menu_inactive]: !active,
    [style.menu_main]: location?.pathname !== `${PERSONAL_ACCOUNT}/*`,
    [style.menu_profile]: location?.pathname === PERSONAL_ACCOUNT,
    [style.menu_supplier]: userRole === 'supplier',
  });

  useEffect(() => {
    const handleOnScroll = (): void => {
      setActive();
    };

    document.addEventListener('scroll', handleOnScroll);

    return () => document.removeEventListener('scroll', handleOnScroll);
  }, [setActive]);

  const handleClickLogout = (): void => {
    dispatch(logout());
    navigate(HOME);
  };

  return (
    <ul className={menuCLasses}>
      {buildMenu.map(({ href, label }) => (
        <li key={label} className={style.item}>
          {href !== '/logout' ? (
            <NavLink to={href} state={label} onClick={() => setActive()}>
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
