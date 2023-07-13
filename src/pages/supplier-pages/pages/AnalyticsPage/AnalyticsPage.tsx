import React from 'react';

import style from './AnalyticsPage.module.scss';

import { WithLayout } from 'common/hocs/WithLayout';

export const AnalyticsPage = WithLayout((): JSX.Element => {
  return (
    <div className={style.analytics_page_container}>
      <h2>Coming soon...</h2>
    </div>
  );
}, 'supplier');
