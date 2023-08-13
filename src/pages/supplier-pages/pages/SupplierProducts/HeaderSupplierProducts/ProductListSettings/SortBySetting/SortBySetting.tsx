import React, { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import style from 'pages/supplier-pages/pages/SupplierProducts/HeaderSupplierProducts/ProductListSettings/ProductListSettings.module.scss';
import { getParamsSelector, setPage, setParams } from 'store/reducers/supplier/product';
import { ISelectOption, Select } from 'ui-kit';

export const SortBySetting = (): JSX.Element => {
  const params = useAppSelector(getParamsSelector);
  const dispatch = useAppDispatch();
  const CATEGORY_SELECT: ISelectOption[] = [
    { label: { text: 'All' }, value: 0 },
    { label: { text: 'Closes' }, value: 10 },
    { label: { text: 'Cosmetics' }, value: 5 },
    { label: { text: 'Accessories' }, value: 7 },
  ];

  const onChangeCategory = useCallback(
    (selectOption: ISelectOption) => {
      const { value } = selectOption;

      dispatch(setPage(1));
      dispatch(setParams({ ...params, categoryId: value }));
    },
    [dispatch, params],
  );

  const controlledValue = CATEGORY_SELECT.find(el => el.value === params.categoryId);

  return (
    <div className={style.filter}>
      <div className={style.filter_name}>Sort by:</div>
      <Select
        controlledValue={controlledValue}
        onChange={onChangeCategory}
        options={CATEGORY_SELECT}
        className={style.select}
      />
    </div>
  );
};
