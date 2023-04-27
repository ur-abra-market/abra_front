import React, { useState } from 'react';

import cn from 'classnames';
import { Link, useNavigate } from 'react-router-dom';

import { ReactComponent as Cart } from '../../../assets/img/icons/cart_n.svg';
import { ReactComponent as Favorite } from '../../../assets/img/icons/flag_n.svg';
import { ReactComponent as Auth } from '../../../assets/img/icons/human.svg';
import { ReactComponent as Note } from '../../../assets/img/icons/note.svg';
import Modal from '../../../components/new-components/Modal';
import { IconButton, Search } from '../../../components/ui-kit';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { logout } from '../../../store/reducers/loginSlice';
import { Logo } from '../../Logo/Logo';

import BuildProfileMenu from './BuildProfileMenu/BuildProfileMenu';
import style from './Top.module.css';

const PROFILE_MENU = {
  UNAUTHORIZED: [
    {
      label: 'Log In',
      href: '/auth',
    },
    {
      label: 'Sign Up',
      href: '/auth',
    },
  ],
  AUTHORIZED: [
    {
      label: 'My Profile',
      href: '/auth',
    },
    {
      label: 'Edit Profile',
      href: '/auth',
    },
    {
      label: 'Settings',
      href: '/auth',
    },
    {
      label: 'My Orders',
      href: '/auth',
    },
    {
      label: 'Log Out',
      href: '/logout',
    },
  ],
} as const;

const Top = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isAuth = useAppSelector(state => state.login.isAuth);
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
        return navigate('/');
      case 'favorite':
        return navigate('/');
      case 'cart':
        return navigate('/cart');
      default:
    }
  };

  const handleClickLogout = (): void => {
    dispatch(logout());
  };
  const closeModal = (): void => setIsShowModal(false);

  return (
    <div className={style.wrapper}>
      {isShowModal && (
        <Modal active={isShowModal} close={closeModal}>
          <div>You are not included in...</div>

          <Link to="/auth">Login</Link>
        </Modal>
      )}
      <div
        role="presentation"
        onClick={() => setMenu(undefined)}
        className={cn(style.menu_wrapper, {
          [style.menu_active]: !!menu,
        })}
      />

      <Logo href="/" />
      <Search placeholder="Search" isPhotoSearch />
      <div className={style.inner_buttons}>
        <div className={style.wrapper_btn}>
          <IconButton onClick={() => handleOnClick('account')}>
            <Auth />
          </IconButton>
          {menu === 'account' && (
            <BuildProfileMenu
              isAuth={isAuth}
              PROFILE_MENU={PROFILE_MENU}
              handleClickLogout={handleClickLogout}
            />
          )}
        </div>

        <IconButton onClick={() => handleOnClick('note')}>
          <Note />
        </IconButton>
        <IconButton onClick={() => handleOnClick('favorite')}>
          <Favorite />
        </IconButton>
        <IconButton onClick={() => handleOnClick('cart')}>
          <Cart />
        </IconButton>
      </div>
    </div>
  );
};

export type ProfileMenu = typeof PROFILE_MENU;

export default Top;
