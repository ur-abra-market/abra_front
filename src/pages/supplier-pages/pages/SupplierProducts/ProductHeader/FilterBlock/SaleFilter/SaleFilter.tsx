import React, { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { useUpdateSearchParams } from 'pages/supplier-pages/pages/SupplierProducts/common/hoocks/useUpdateSearchParams';
import {
  DEFAULT_QUERY_PARAMS_FOR_URL,
  QUERY_PARAMS_KEY,
  QUERY_PARAMS_VALUE,
} from 'pages/supplier-pages/pages/SupplierProducts/common/utils/queryParamsConstants';
import { SALE_SELECT } from 'pages/supplier-pages/pages/SupplierProducts/common/utils/selectOptions';
import {
  isLoadingSelector,
  resetProductStatusSelection,
} from 'store/reducers/supplier/product';
import { ISelectOption, Select } from 'ui-kit';

import style from 'pages/supplier-pages/pages/SupplierProducts/ProductHeader/FilterBlock/FilterBlock.module.scss';

export const SaleFilter = (): JSX.Element => {
  const { updateUrlQueryParams, searchParams } = useUpdateSearchParams();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(isLoadingSelector);
  const onSaleQueryParam = searchParams.get(QUERY_PARAMS_KEY.SALE);
  const onSale = onSaleQueryParam || QUERY_PARAMS_VALUE.ALL;

  const onChangeSaleStatusFilter = useCallback(
    (selectOption: ISelectOption) => {
      const { value } = selectOption;

      updateUrlQueryParams([
        [QUERY_PARAMS_KEY.SALE, value],
        [QUERY_PARAMS_KEY.PAGE, DEFAULT_QUERY_PARAMS_FOR_URL.page],
        [QUERY_PARAMS_KEY.LIMIT, DEFAULT_QUERY_PARAMS_FOR_URL.limit],
      ]);

      dispatch(resetProductStatusSelection());
    },
    [updateUrlQueryParams],
  );

  const controlledValue = SALE_SELECT.find(el => el.value === onSale);

  return (
    <div className={style.filter}>
      <div className={style.filter_name}>Sale</div>
      <Select
        controlledValue={controlledValue}
        onChange={onChangeSaleStatusFilter}
        disabled={isLoading}
        options={SALE_SELECT}
        className={style.select}
      />
    </div>
  );
};
