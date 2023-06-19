import React, { useState } from 'react';

import cn from 'classnames';
import { NavLink, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../common/hooks';
import Modal from '../../../components/Modal';
import { HOME, LOGIN, REGISTER, CART, PERSONAL_ACCOUNT } from '../../../routes';
import { logout } from '../../../store/reducers/authSlice';
import { ButtonIcon, MainLogo, Search } from '../../../ui-kit';

import BuildProfileMenu from './BuildProfileMenu/BuildProfileMenu';
import style from './Top.module.scss';

import {
  HeaderCartIcon,
  HeaderFavouritesIcon,
  HeaderNotificationsIcon,
  HeaderProfileIcon,
} from 'assets/icons';

const PROFILE_MENU = {
  UNAUTHORIZED: [
    {
      label: 'Log in',
      href: LOGIN,
    },
    {
      label: 'Register',
      href: REGISTER,
    },
  ],
  AUTHORIZED: [
    {
      label: 'My Profile',
      href: PERSONAL_ACCOUNT,
    },
    {
      label: 'Edit Profile',
      href: PERSONAL_ACCOUNT,
    },
    {
      label: 'Settings',
      href: PERSONAL_ACCOUNT,
    },
    {
      label: 'My Orders',
      href: PERSONAL_ACCOUNT,
    },
    {
      label: 'Log out',
      href: '/logout',
    },
  ],
} as const;

const Top = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isAuth = useAppSelector(state => state.auth.isAuthorized);
  // const userRole = useAppSelector(state => state.auth.userRole);
  const [menu, setMenu] = useState<string>();
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  const handleOnClick = (target: string): void => {
    if (!isAuth && target === 'account') {
      return setMenu(target);
    }
    if (!isAuth && target !== 'account') {
      return setIsShowModal(true);
    }
    switch (target) {
      case 'account':
        return setMenu(target);
      case 'note':
        return navigate(HOME);
      case 'favorite':
        return navigate(HOME);
      case 'cart':
        return navigate(CART);
      default:
    }
  };

  const handleClickLogout = (): void => {
    dispatch(logout());
    navigate(HOME);
  };

  return (
    <div className={style.wrapper}>
      <Modal showModal={isShowModal} closeModal={setIsShowModal}>
        <div>You are not included in...</div>
        <NavLink to={LOGIN}>Login</NavLink>
      </Modal>

      <div
        role="presentation"
        onClick={() => setMenu(undefined)}
        className={cn(style.menu_wrapper, {
          [style.menu_active]: !!menu,
        })}
      />

      <MainLogo className={style.logo_font_size} />
      <Search placeholder="Search" />
      <div className={style.inner_buttons}>
        <div className={style.wrapper_btn}>
          <ButtonIcon onClick={() => handleOnClick('account')}>
            <HeaderProfileIcon />
          </ButtonIcon>
          {menu === 'account' && (
            <BuildProfileMenu
              isAuth={isAuth}
              PROFILE_MENU={PROFILE_MENU}
              handleClickLogout={handleClickLogout}
            />
          )}
        </div>

        <ButtonIcon onClick={() => handleOnClick('note')}>
          <HeaderNotificationsIcon />
        </ButtonIcon>
        <ButtonIcon onClick={() => handleOnClick('favorite')}>
          <HeaderFavouritesIcon />
        </ButtonIcon>
        <ButtonIcon onClick={() => handleOnClick('cart')}>
          <HeaderCartIcon />
        </ButtonIcon>
      </div>
    </div>
  );
};

export type ProfileMenu = typeof PROFILE_MENU;

export default Top;
