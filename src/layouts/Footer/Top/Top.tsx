import React, { JSX } from 'react';

import style from './Top.module.scss';

import { UserRoleEnum } from 'common/types';
import { LocationAndCurrencySelection } from 'elements/LocationAndCurrencySelection/LocationAndCurrencySelection';
import { HeaderNav } from 'layouts/Header/components';
import { MainLogo } from 'ui-kit';

export const Top = (): JSX.Element => {
  return (
    <div className={style.container}>
      <MainLogo className={style.logo} />
      <HeaderNav userRole={UserRoleEnum.SELLER} className={style.nav_container} />
      <LocationAndCurrencySelection dropOnUp className={style.selects} />
    </div>
  );
};
