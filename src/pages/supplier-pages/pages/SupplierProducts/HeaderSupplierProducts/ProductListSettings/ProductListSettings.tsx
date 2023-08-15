import React from 'react';

import style from './ProductListSettings.module.scss';
import { SaleStatusSetting } from './SaleStatusSetting/SaleStatusSetting';
import { SortBySetting } from './SortBySetting/SortBySetting';
import { Status } from './Status/Status';

export const ProductListSettings = (): JSX.Element => {
  return (
    <div className={style.rest_filters_wrapper}>
      <SortBySetting />
      <SaleStatusSetting />
      <Status />
    </div>
  );
};
