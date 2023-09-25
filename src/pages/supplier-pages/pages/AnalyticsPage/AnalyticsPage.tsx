import React from 'react';

import style from './AnalyticsPage.module.scss';

import { WithLayout } from 'common/hocs/WithLayout';
import { Title } from 'ui-kit';

export const AnalyticsPage = WithLayout((): JSX.Element => {
  return (
    <div className={style.analytics_page_container}>
      <Title>Coming soon...</Title>
    </div>
  );
}, 'supplier');
