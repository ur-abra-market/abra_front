import { useState } from 'react';

import cn from 'classnames';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../../common/hooks/useAppDispatch';
import { useAppSelector } from '../../../common/hooks/useAppSelector';
import Modal from '../../../components/Modal';
import { logout } from '../../../store/reducers/loginSlice';
import { ButtonIcon, Search } from '../../../ui-kit';
import { Logo } from '../../Logo/Logo';

import BuildProfileMenu from './BuildProfileMenu/BuildProfileMenu';
import style from './Top.module.css';

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
      href: '/login',
    },
    {
      label: 'Register',
      href: '/register',
    },
  ],
  AUTHORIZED: [
    {
      label: 'My Profile',
      href: '/personal-account',
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

  return (
    <div className={style.wrapper}>
      <Modal showModal={isShowModal} closeModal={setIsShowModal}>
        <div>You are not included in...</div>
        <Link to="/auth">Login</Link>
      </Modal>

      <div
        role="presentation"
        onClick={() => setMenu(undefined)}
        className={cn(style.menu_wrapper, {
          [style.menu_active]: !!menu,
        })}
      />

      <Logo href="/" />
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
