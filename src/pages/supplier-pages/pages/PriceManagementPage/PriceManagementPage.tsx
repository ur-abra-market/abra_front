import React from 'react';

import style from './PriceManagementPage.module.scss';

import { WithLayout } from 'common/hocs/WithLayout';

export const PriceManagementPage = WithLayout((): JSX.Element => {
  return (
    <div className={style.price_management_page_container}>
      <h2>Coming soon...</h2>
    </div>
  );
}, 'supplier');
