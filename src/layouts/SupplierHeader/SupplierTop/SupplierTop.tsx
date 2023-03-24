import React, { useState } from 'react';

import cn from 'classnames';
import { Link } from 'react-router-dom';

import { ReactComponent as Arrow } from '../../../assets/img/icons/arrowRight.svg';
import bellImg from '../../../assets/img/icons/notification-bell.svg';
import { useAppDispatch } from '../../../store/hooks';
import { logout } from '../../../store/reducers/loginSlice';
import { Logo } from '../../Logo/Logo';

import style from './SupplierTop.module.css';

import { IconButton } from 'components/ui-kit';

const SupplierTop = (): JSX.Element => {
  // const navigate = useNavigate();
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
        <Logo href="/" />
        <span className={style.vertical_line} />
        <span>
          <Link className={style.supplier_link} to="/">
            SUPPLIER
          </Link>
        </span>
      </div>
      <div className={style.inner_buttons}>
        <Link to="/">
          <IconButton>
            <img src={bellImg} alt="btn-header" />
          </IconButton>
        </Link>
        <div
          role="presentation"
          className={style.btn_menu}
          onClick={() => setIsMenu(true)}
        >
          <div className={style.btn_menu_img}>
            <img src={bellImg} alt="logo" />
          </div>
          <span>Business Name</span>
          <span className={style.icon}>
            <Arrow className={style.arrow} />
          </span>
          {isMenu && <ul className={style.menu}>{buildMenu()}</ul>}
        </div>
      </div>
    </div>
  );
};

export default SupplierTop;
