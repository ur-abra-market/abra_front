import React, { JSX } from 'react';

import style from './Top.module.scss';

import { HeaderNav } from 'components/HeaderNav/HeaderNav';
import { LocationAndCurrencySelection } from 'components/LocationAndCurrencySelection/LocationAndCurrencySelection';
import { MainLogo } from 'ui-kit';

export const Top = (): JSX.Element => {
  return (
    <div className={style.container}>
      <MainLogo className={style.logo} />
      <HeaderNav userRole="seller" className={style.nav_container} />
      <LocationAndCurrencySelection className={style.selects} />
    </div>
  );
};
