import React from 'react';

import { useNavigate } from 'react-router-dom';

import { ReactComponent as Cart } from '../../../assets/img/icons/cart_n.svg';
import { ReactComponent as Favorite } from '../../../assets/img/icons/flag_n.svg';
import { ReactComponent as Auth } from '../../../assets/img/icons/human.svg';
import { ReactComponent as Note } from '../../../assets/img/icons/note.svg';
import { useAppSelector } from '../../../store/hooks';
import { IconButton } from '../../ui-kit/IconButton/IconButton';
import { Logo } from '../../ui-kit/Logo/Logo';
import { Search } from '../../ui-kit/Search/Search';

import style from './Top.module.css';

const Top = (): JSX.Element => {
  const isAuth = useAppSelector(state => state.login.isAuth);
  const navigate = useNavigate();

  const handleOnClick = (target: string): void => {
    if (!isAuth) {
      return navigate('/auth');
    }
    switch (target) {
      case 'account':
        return navigate('/personal-account');
      case 'note':
        return navigate('/');
      case 'favorite':
        return navigate('/');
      case 'cart':
        return navigate('/cart');
      default:
    }
  };

  return (
    <div className={style.wrapper}>
      <Logo href="/" />
      <Search placeholder="Search" isPhotoSearch />
      <div className={style.inner_buttons}>
        <IconButton onClick={() => handleOnClick('account')}>
          <Auth />
        </IconButton>
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

export default Top;
