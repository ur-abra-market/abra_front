import React from 'react';

import { WithLayout } from 'common/hocs/WithLayout';
import { Title } from 'ui-kit';

import style from './PriceManagementPage.module.scss';

export const PriceManagementPage = WithLayout((): JSX.Element => {
  return (
    <div className={style.price_management_page_container}>
      <Title>Coming soon...</Title>
    </div>
  );
}, 'supplier');
