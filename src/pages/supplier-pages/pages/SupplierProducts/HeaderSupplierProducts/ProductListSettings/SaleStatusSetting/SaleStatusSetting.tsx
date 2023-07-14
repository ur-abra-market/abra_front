import React, { FC } from 'react';

import style from 'pages/supplier-pages/pages/SupplierProducts/HeaderSupplierProducts/ProductListSettings/ProductListSettings.module.scss';
import { ISelectOption, Select } from 'ui-kit';

export const SaleStatusSetting: FC = (): JSX.Element => {
  const STATUS_SELECT: ISelectOption[] = [
    { label: 'On Sale', value: '1' },
    { label: 'Off-sale', value: '2' },
  ];

  return (
    <div className={style.filter}>
      <Select options={STATUS_SELECT} padding="23px" className={style.select} />
    </div>
  );
};
