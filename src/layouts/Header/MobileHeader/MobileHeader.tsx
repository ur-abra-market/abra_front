import React, { FC } from 'react';

import cn from 'classnames';

import style from './MobileHeader.module.scss';

import { MagnifierBlackIcon } from 'assets/icons';
import { IHtmlProps } from 'common/types';
import { LocationAndCurrencySelection } from 'elements/LocationAndCurrencySelection/LocationAndCurrencySelection';
import { HeaderActions, HeaderCategories, HeaderNav } from 'layouts/Header/components';
import { MainLogo } from 'ui-kit/MainLogo/MainLogo';

export const MobileHeader: FC<IHtmlProps> = ({ className }): JSX.Element => {
  return (
    <div className={cn(style.wrapper, className)}>
      <div className={style.top_container}>
        <MainLogo className={style.logo} />
        <LocationAndCurrencySelection isMobileView />
      </div>
      <div className={style.center_wrapper}>
        <div className={style.center_container}>
          <HeaderNav userRole="seller" isMobileView />
          <HeaderActions />
        </div>
      </div>
      <div className={style.bottom_container}>
        <HeaderCategories />
        <button
          type="button"
          className={style.button_search}
          onClick={() => {
            // TODO - navigate to *SearchPage*
            console.log('---Here navigate to search page---');
          }}
        >
          <MagnifierBlackIcon />
        </button>
      </div>
    </div>
  );
};
