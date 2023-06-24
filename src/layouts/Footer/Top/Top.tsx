import React, { JSX } from 'react';

import cn from 'classnames';

import style from './Top.module.scss';

import { LocationAndCurrencySelection } from 'components/LocationAndCurrencySelection/LocationAndCurrencySelection';
import { HeaderNavMenu } from 'old-components/HeaderNavMemu';
import { MainLogo } from 'ui-kit';

export const Top = (): JSX.Element => {
  return (
    <div className={style.container}>
      <div className={style.top}>
        <MainLogo />
        <div className={style.inner}>
          <HeaderNavMenu className={cn(style.nav)} />
          <LocationAndCurrencySelection className={style.selects} />
        </div>
      </div>
    </div>
  );
};
