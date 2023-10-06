import React from 'react';

import { WithLayout } from 'common/hocs/WithLayout';
import { Title } from 'ui-kit';

import style from './DashboardPage.module.scss';

export const DashboardPage = WithLayout((): JSX.Element => {
  return (
    <div className={style.dashboard_container}>
      <Title>Coming soon...</Title>
    </div>
  );
}, 'supplier');
