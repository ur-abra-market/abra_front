import React, { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { useUpdateSearchParams } from 'pages/supplier-pages/pages/SupplierProducts/common/hoocks/useUpdateSearchParams';
import { CATEGORY_SELECT } from 'pages/supplier-pages/pages/SupplierProducts/common/utils/filterOptions';
import {
  DEFAULT_QUERY_PARAMS,
  QUERY_PARAMS_KEY,
  QUERY_PARAMS_VALUE,
} from 'pages/supplier-pages/pages/SupplierProducts/common/utils/queryParameters';
import style from 'pages/supplier-pages/pages/SupplierProducts/ProductHeader/FilterBlock/FilterBlock.module.scss';
import { isLoadingSelector, resetProductStatus } from 'store/reducers/supplier/product';
import { ISelectOption, Select } from 'ui-kit';

export const CategoryFilter = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { updateUrlQueryParams, searchParams } = useUpdateSearchParams();
  const isLoading = useAppSelector(isLoadingSelector);
  const categoryIdsQueryParam = searchParams.get(QUERY_PARAMS_KEY.CATEGORY_IDS);

  const categoryIds = categoryIdsQueryParam || QUERY_PARAMS_VALUE.ALL;

  const onChangeCategory = useCallback(
    (selectOption: ISelectOption) => {
      const { value } = selectOption;

      updateUrlQueryParams([
        [QUERY_PARAMS_KEY.CATEGORY_IDS, value],
        [QUERY_PARAMS_KEY.PAGE, DEFAULT_QUERY_PARAMS.page],
        [QUERY_PARAMS_KEY.LIMIT, DEFAULT_QUERY_PARAMS.limit],
      ]);

      dispatch(resetProductStatus());
    },
    [updateUrlQueryParams, dispatch],
  );

  const controlledValue = CATEGORY_SELECT.find(el => String(el.value) === categoryIds);

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
