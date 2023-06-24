import { useState } from 'react';

import { NavLink, useNavigate } from 'react-router-dom';

import Modal from '../../../components/Modal';
import { HOME, LOGIN, REGISTER, CART, PERSONAL_ACCOUNT } from '../../../routes';

import style from './Top.module.scss';

import {
  HeaderCartIcon,
  HeaderFavouritesIcon,
  HeaderNotificationsIcon,
  HeaderProfileIcon,
} from 'assets/icons';
import { useAppSelector, useOnClickOutside } from 'common/hooks';
import { HeaderMenu } from 'components/HeaderMenu/HeaderMenu';
import { isAuthSelector } from 'store/reducers/authSlice/selectors';
import { ButtonIcon, MainLogo, Search } from 'ui-kit';

export const Top = (): JSX.Element => {
  const navigate = useNavigate();

  const isAuth = useAppSelector(isAuthSelector);
  const [active, setActive] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);

  const handleOnClick = (target: string): void => {
    if (!isAuth) {
      return setIsShowModal(true);
    }
    switch (target) {
      case 'note':
        return navigate(HOME);
      case 'favorite':
        return navigate(HOME);
      case 'cart':
        return navigate(CART);
      default:
    }
  };

  const handleMenuOpen = (value: boolean): void => {
    setActive(value);
  };

  const triggerRef = useOnClickOutside(handleMenuOpen);

  return (
    <div className={style.wrapper}>
      <Modal showModal={isShowModal} closeModal={setIsShowModal}>
        <div>You are not included in...</div>
        <NavLink to={LOGIN}>Login</NavLink>
      </Modal>

      <MainLogo className={style.logo_font_size} />
      <Search placeholder="Search" />
      <div className={style.inner_buttons}>
        <div className={style.wrapper_btn} ref={triggerRef}>
          <ButtonIcon onClick={() => handleMenuOpen(!active)}>
            <HeaderProfileIcon />
          </ButtonIcon>

          <HeaderMenu active={active} setActive={() => setActive(false)} />
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
