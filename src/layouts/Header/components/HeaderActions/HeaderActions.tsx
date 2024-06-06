import React, { FC } from 'react';

import cn from 'classnames';

import { HeaderGuestUserActions, HeaderSellerActions } from '.';

import { useAppSelector } from 'common/hooks';
import { IHtmlProps } from 'common/types';
import { isAuthorizedSelector } from 'store/reducers/authSlice';

import style from './HeaderActions.module.scss';

export const HeaderActions: FC<IHtmlProps> = ({ className }): JSX.Element => {
  const isAuthorized = useAppSelector(isAuthorizedSelector);

  return (
    <div className={cn(style.wrapper, className)}>
      {isAuthorized ? <HeaderSellerActions /> : <HeaderGuestUserActions />}
    </div>
  );
};
