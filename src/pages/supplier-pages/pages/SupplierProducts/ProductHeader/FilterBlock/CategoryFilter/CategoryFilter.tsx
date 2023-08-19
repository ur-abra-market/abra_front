import React, { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import style from 'pages/supplier-pages/pages/SupplierProducts/ProductHeader/FilterBlock/FilterBlock.module.scss';
import {
  getParamsSelector,
  isLoadingSelector,
  setPage,
  setParams,
} from 'store/reducers/supplier/product';
import { ISelectOption, Select } from 'ui-kit';

const CATEGORY_SELECT: ISelectOption[] = [
  { label: { text: 'All' }, value: 0 },
  { label: { text: 'Clothes' }, value: 3 },
  { label: { text: 'Cosmetics' }, value: 4 },
  { label: { text: 'Accessories' }, value: 5 },
];

export const CategoryFilter = (): JSX.Element => {
  const params = useAppSelector(getParamsSelector);
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(isLoadingSelector);

  const onChangeCategory = useCallback(
    (selectOption: ISelectOption) => {
      const { value } = selectOption;
      const categoryIds = !value ? [] : [value];

      dispatch(setPage(1));
      dispatch(setParams({ ...params, categoryIds, limit: 20 }));
    },
    [dispatch, params],
  );

  const controlledValue = CATEGORY_SELECT.find(el => {
    if (!params.categoryIds.length) return CATEGORY_SELECT[0];

    return el.value === params.categoryIds[0];
  });

  return (
    <div className={style.filter}>
      <div className={style.filter_name}>Choose categories</div>
      <Select
        disabled={isLoading}
        controlledValue={controlledValue}
        onChange={onChangeCategory}
        options={CATEGORY_SELECT}
        className={style.select}
      />
    </div>
  );
};
