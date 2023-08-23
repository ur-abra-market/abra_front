import React, { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import style from 'pages/supplier-pages/pages/SupplierProducts/ProductHeader/FilterBlock/FilterBlock.module.scss';
import { CATEGORY_SELECT } from 'pages/supplier-pages/pages/SupplierProducts/utils/filterOptions';
import {
  getParamsSelector,
  isLoadingSelector,
  setPage,
  setParams,
} from 'store/reducers/supplier/product';
import { ISelectOption, Select } from 'ui-kit';

export const CategoryFilter = (): JSX.Element => {
  const params = useAppSelector(getParamsSelector);
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(isLoadingSelector);

  const onChangeCategory = useCallback(
    (selectOption: ISelectOption) => {
      const { value } = selectOption;
      const categoryIds = !value ? [] : [Number(value)];

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
