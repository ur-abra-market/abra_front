import React from 'react';

import style from './DashboardPage.module.scss';

import { WithLayout } from 'common/hocs/WithLayout';

export const DashboardPage = WithLayout((): JSX.Element => {
  return (
    <div className={style.dashboard_container}>
      <h2>Coming soon...</h2>
    </div>
  );
}, 'supplier');
