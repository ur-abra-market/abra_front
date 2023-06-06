import React, { useState } from 'react';

import cn from 'classnames';
import { Link } from 'react-router-dom';

import { useAppDispatch } from '../../../common/hooks';
import { logout } from '../../../store/reducers/loginSlice';

import style from './SupplierTop.module.css';

import { ArrowRightIcon, HeaderNotificationsIcon } from 'assets/icons';
import { MainLogo } from 'ui-kit'; // 5 10px for ArrowRightIcon

const SupplierTop = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const [isMenu, setIsMenu] = useState(false);

  const handleClickLogout = (): void => {
    dispatch(logout());
  };

  const buildMenu = (): JSX.Element[] => {
    const menu = [
      {
        label: 'Name 1',
        href: '/',
      },
      {
        label: 'Name 2',
        href: '/',
      },
      {
        label: 'Log Out',
      },
    ];

    return menu.map(({ href, label }) => {
      return (
        <li key={label} className={style.item}>
          {href ? (
            <Link to={href}>{label}</Link>
          ) : (
            <button type="button" onClick={handleClickLogout}>
              {label}
            </button>
          )}
        </li>
      );
    });
  };

  return (
    <div className={style.wrapper}>
      <div
        role="presentation"
        onClick={() => setIsMenu(false)}
        className={cn(style.menu_wrapper, {
          [style.menu_active]: isMenu,
        })}
      />
      <div className={style.logo}>
        <MainLogo className={style.logo_font_size} />
        <span className={style.vertical_line} />
        <span>
          <Link className={style.supplier_link} to="/">
            SUPPLIER
          </Link>
        </span>
      </div>
      <div className={style.inner_buttons}>
        <Link to="/">
          <HeaderNotificationsIcon />
        </Link>
        <div
          role="presentation"
          className={style.btn_menu}
          onClick={() => setIsMenu(true)}
        >
          <div className={style.btn_menu_img}>
            <HeaderNotificationsIcon />
          </div>
          <span>Business Name</span>
          <span className={style.icon}>
            <ArrowRightIcon className={style.arrow} />
          </span>
          {isMenu && <ul className={style.menu}>{buildMenu()}</ul>}
        </div>
      </div>
    </div>
  );
};

export default SupplierTop;
