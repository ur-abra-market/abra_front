import React from 'react';

import { DateSetting } from './DateSrtting/DateSetting';
import style from './ProductListSettings.module.scss';
import { SaleStatusSetting } from './SaleStatusSetting/SaleStatusSetting';
import { SortBySetting } from './SortBySetting/SortBySetting';

import { Checkbox } from 'ui-kit';

export const ProductListSettings = (): JSX.Element => {
  return (
    <div className={style.rest_filters_wrapper}>
      <DateSetting />
      <SortBySetting />
      <SaleStatusSetting />
      <Checkbox
        label="Include Hidden"
        variant="notification"
        className={style.checkbox}
      />
    </div>
  );
};
