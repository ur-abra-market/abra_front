import React, { useCallback } from 'react';

import { useNavigate } from 'react-router-dom';

import style from './Top.module.scss';

import { HeaderGuestUserActions, HeaderSellerActions } from '.';

import { useAppSelector } from 'common/hooks';
import { CART, HOME, LOGIN, REGISTER } from 'routes';
import { isAuthSelector } from 'store/reducers/authSlice/selectors';
import { MainLogo, Search } from 'ui-kit';

export const Top = (): JSX.Element => {
  const navigate = useNavigate();
  const isAuth = useAppSelector(isAuthSelector);

  const handleOnClick = useCallback(
    (target: string): void => {
      if (!isAuth) {
        return target === 'login' ? navigate(LOGIN) : navigate(REGISTER);
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
    },
    [isAuth, navigate],
  );

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <MainLogo className={style.logo} />
        <Search placeholder="Search" />

        <div className={style.inner_buttons}>
          {isAuth ? (
            <HeaderSellerActions callBack={handleOnClick} />
          ) : (
            <HeaderGuestUserActions callBack={handleOnClick} />
          )}
        </div>
      </div>
    </div>
  );
};
