import React, { useCallback } from 'react';

import { useNavigate } from 'react-router-dom';

import { HeaderSellerActions } from './HeaderSellerActions/HeaderSellerActions';
import { HeaderUserActionsGuest } from './HeaderUserActionsGuest/HeaderUserActionsGuest';
import style from './Top.module.scss';

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
      <MainLogo className={style.logo_font_size} />
      <Search placeholder="Search" />
      <div className={style.inner_buttons}>
        {isAuth ? (
          <HeaderSellerActions callBack={handleOnClick} />
        ) : (
          <HeaderUserActionsGuest callBack={handleOnClick} />
        )}
      </div>
    </div>
  );
};
