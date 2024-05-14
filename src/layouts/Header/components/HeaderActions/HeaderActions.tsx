import React, { FC, useCallback } from 'react';

import cn from 'classnames';
import { useNavigate } from 'react-router-dom';

import { HeaderSellerActions, HeaderGuestUserActions } from '.';

import { useAppSelector } from 'common/hooks';
import { IHtmlProps } from 'common/types';
import { LOGIN, REGISTER, HOME, CART, FAVORITES } from 'routes';
import { isAuthorizedSelector } from 'store/reducers/authSlice';

import style from './HeaderActions.module.scss';

export const HeaderActions: FC<IHtmlProps> = ({
  className,
  ...restProps
}): JSX.Element => {
  const navigate = useNavigate();
  const isAuthorized = useAppSelector(isAuthorizedSelector);

  const handleOnClick = useCallback(
    (target: string): void => {
      if (!isAuthorized) {
        return target === 'login' ? navigate(LOGIN) : navigate(REGISTER);
      }
      switch (target) {
        case 'note':
          return navigate(HOME);
        case 'favorite':
          return navigate(FAVORITES);
        case 'cart':
          return navigate(CART);
        default:
      }
    },
    [isAuthorized, navigate],
  );

  return (
    <div className={cn(style.wrapper, className)}>
      {isAuthorized ? (
        <HeaderSellerActions callBack={handleOnClick} />
      ) : (
        <HeaderGuestUserActions callBack={handleOnClick} />
      )}
    </div>
  );
};
