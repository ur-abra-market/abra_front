import React from 'react';

import style from 'pages/supplier-pages/pages/SupplierProducts/HeaderSupplierProducts/ProductListSettings/ProductListSettings.module.scss';
import { ISelectOption, Select } from 'ui-kit';

export const SortBySetting = (): JSX.Element => {
  const CATEGORY_SELECT: ISelectOption[] = [
    { label: { text: 'S' }, value: '1' },
    { label: { text: 'M' }, value: '2' },
    { label: { text: 'L' }, value: '3' },
    { label: { text: 'XL' }, value: '4' },
  ];

  return (
    <div className={style.filter}>
      <div className={style.filter_name}>Sort by:</div>
      <Select options={CATEGORY_SELECT} padding="23px" className={style.select} />
    </div>
  );
};
