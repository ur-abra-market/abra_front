import React, { FC } from 'react';

import cn from 'classnames';

import { IHtmlProps, UserRoleEnum } from 'common/types';
import { LocationAndCurrencySelection } from 'elements/LocationAndCurrencySelection/LocationAndCurrencySelection';
import { HeaderActions, HeaderCategories, HeaderNav } from 'layouts/Header/components';
import { Search } from 'ui-kit';
import { MainLogo } from 'ui-kit/MainLogo/MainLogo';

import style from './MobileHeader.module.scss';

export const MobileHeader: FC<IHtmlProps> = ({ className }): JSX.Element => {
  return (
    <div className={cn(style.wrapper, className)}>
      <div className={style.top_container}>
        <MainLogo />
        <Search placeholder="Search" className={style.search} />
        <LocationAndCurrencySelection isMobileView />
      </div>
      <div className={style.center_wrapper}>
        <div className={style.center_container}>
          <HeaderNav userRole={UserRoleEnum.SELLER} isMobileView />
          <HeaderActions />
        </div>
      </div>
      <div className={style.bottom_container}>
        <HeaderCategories />
      </div>
    </div>
  );
};
