import React from 'react';

import { HeaderActions } from 'layouts/Header/components';
import { MainLogo, Search } from 'ui-kit';

import style from './Top.module.scss';

export const Top = (): JSX.Element => {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <MainLogo />
        <Search mainSearchField placeholder="Search" />
        <HeaderActions />
      </div>
    </div>
  );
};
