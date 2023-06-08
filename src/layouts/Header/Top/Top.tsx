import { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector, useOnClickOutside } from '../../../common/hooks';
import Modal from '../../../components/Modal';
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
      href: '/personal-account',
    },
    {
      label: 'Settings',
      href: '/personal-account',
    },
    {
      label: 'My Orders',
      href: '/personal-account',
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
  const [active, setActive] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);

  const handleOnClick = (target: string): void => {
    if (!isAuth) {
      return setIsShowModal(true);
    }
    switch (target) {
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
  const handleMenuOpen = (value: boolean): void => {
    setActive(value);
  };

  const triggerRef = useOnClickOutside(handleMenuOpen);

  return (
    <div className={style.wrapper}>
      <Modal showModal={isShowModal} closeModal={setIsShowModal}>
        <div>You are not included in...</div>
        <Link to="/auth">Login</Link>
      </Modal>

      <MainLogo className={style.logo_font_size} />
      <Search placeholder="Search" />
      <div className={style.inner_buttons}>
        <div className={style.wrapper_btn} ref={triggerRef}>
          <ButtonIcon onClick={() => handleMenuOpen(!active)}>
            <HeaderProfileIcon />
          </ButtonIcon>

          <BuildProfileMenu
            isAuth={isAuth}
            PROFILE_MENU={PROFILE_MENU}
            handleClickLogout={handleClickLogout}
            active={active}
            setActive={setActive}
          />
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
