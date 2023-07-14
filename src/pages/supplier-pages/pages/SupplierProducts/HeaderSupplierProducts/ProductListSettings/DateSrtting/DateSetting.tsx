import React, { FC } from 'react';

import style from 'pages/supplier-pages/pages/SupplierProducts/HeaderSupplierProducts/ProductListSettings/ProductListSettings.module.scss';
import { Input } from 'ui-kit';

export const DateSetting: FC = (): JSX.Element => {
  return (
    <div className={style.filter}>
      <div className={style.filter_name}>Creation Date</div>
      <Input
        type="date"
        className={style.filter_input_date}
        placeholder="Select the Date"
      />
    </div>
  );
};
