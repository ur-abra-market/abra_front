import React from 'react';

import style from './Top.module.scss';

import { HeaderActions } from 'layouts/Header/components';
import { MainLogo, Search } from 'ui-kit';

export const Top = (): JSX.Element => {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <MainLogo />
        <Search placeholder="Search" />
        <HeaderActions />
      </div>
    </div>
  );
};
