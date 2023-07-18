import React from 'react';

import style from 'pages/supplier-pages/pages/SupplierProducts/HeaderSupplierProducts/ProductListSettings/ProductListSettings.module.scss';
import { ISelectOption, Select } from 'ui-kit';

export const SaleStatusSetting = (): JSX.Element => {
  const STATUS_SELECT: ISelectOption[] = [
    { label: { text: 'On Sale' }, value: '1' },
    { label: { text: 'Off-sale' }, value: '2' },
  ];

  return (
    <div className={style.filter}>
      <Select options={STATUS_SELECT} padding="23px" className={style.select} />
    </div>
  );
};
