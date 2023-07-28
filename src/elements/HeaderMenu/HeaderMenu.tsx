import React, { DetailedHTMLProps, FC, HTMLAttributes, useEffect, useState } from 'react';

import cn from 'classnames';
import { NavLink, useMatch, useNavigate } from 'react-router-dom';

import style from './HeaderMenu.module.scss';
import { HEADER_MENU_CONTENT } from './headerMenuContent';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { HOME, PERSONAL_ACCOUNT } from 'routes';
import { logoutUser } from 'store/reducers/authSlice';
import { userRoleSelector } from 'store/reducers/authSlice/selectors';
import { Button, LoaderLinear } from 'ui-kit';

export interface IHeaderMenu
  extends DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> {
  isMenuOpen: boolean;
  setMenuOpen: () => void;
}

export const HeaderMenu: FC<IHeaderMenu> = ({ isMenuOpen, setMenuOpen }) => {
  const [isLogOut, setLogOut] = useState<boolean>(false);
  const navigate = useNavigate();
  const userRole = useAppSelector(userRoleSelector);
  const dispatch = useAppDispatch();
  const menuContent =
    userRole === 'supplier' ? HEADER_MENU_CONTENT.SUPPLIER : HEADER_MENU_CONTENT.SELLER;
  const location = useMatch(PERSONAL_ACCOUNT);

  const menuCLasses = cn(style.menu, {
    [style.menu_active]: isMenuOpen,
    [style.menu_inactive]: !isMenuOpen,
    [style.menu_main]: location?.pathname !== `${PERSONAL_ACCOUNT}/*`,
    [style.menu_profile]: location?.pathname === PERSONAL_ACCOUNT,
    [style.menu_supplier]: userRole === 'supplier',
  });

  useEffect(() => {
    const handleOnScroll = (): void => {
      setMenuOpen();
    };

    document.addEventListener('scroll', handleOnScroll);

    return () => document.removeEventListener('scroll', handleOnScroll);
  }, [setMenuOpen]);

  const handleClickLogout = async (): Promise<void> => {
    setLogOut(true);
    const result = await dispatch(logoutUser());

    setLogOut(false);

    if (result) navigate(HOME);
  };

  return (
    <>
      {isLogOut && <LoaderLinear />}
      <ul className={menuCLasses}>
        {menuContent.map(({ href, label }) => (
          <li key={label} className={style.item}>
            {href !== '/logout' ? ( // данная конструкция нужна просто чтобы понять когда отрисовать кнопку логаут, а когда навлинку
              <NavLink to={href} state={label} onClick={() => setMenuOpen()}>
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
    </>
  );
};
