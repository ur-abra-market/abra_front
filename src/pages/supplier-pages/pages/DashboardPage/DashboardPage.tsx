import React from 'react';

import style from './DashboardPage.module.scss';

import { WithLayout } from 'common/hocs/WithLayout';
import { Title } from 'ui-kit/Title/Title';

export const DashboardPage = WithLayout((): JSX.Element => {
  return (
    <div className={style.dashboard_container}>
      <Title>Coming soon...</Title>
    </div>
  );
}, 'supplier');
