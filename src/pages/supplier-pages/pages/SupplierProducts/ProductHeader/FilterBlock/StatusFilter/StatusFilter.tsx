import React, { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { useUpdateSearchParams } from 'pages/supplier-pages/pages/SupplierProducts/common/hoocks/useUpdateSearchParams';
import {
  DEFAULT_QUERY_PARAMS_FOR_URL,
  QUERY_PARAMS_KEY,
  QUERY_PARAMS_VALUE,
} from 'pages/supplier-pages/pages/SupplierProducts/common/utils/queryParamsConstants';
import { STATUS_SELECT } from 'pages/supplier-pages/pages/SupplierProducts/common/utils/selectOptions';
import style from 'pages/supplier-pages/pages/SupplierProducts/ProductHeader/FilterBlock/FilterBlock.module.scss';
import {
  isLoadingSelector,
  resetProductStatusSelection,
} from 'store/reducers/supplier/product';
import { ISelectOption, Select } from 'ui-kit';

export const StatusFilter = (): JSX.Element => {
  const { updateUrlQueryParams, searchParams } = useUpdateSearchParams();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(isLoadingSelector);
  const onStatusQueryParam = searchParams.get(QUERY_PARAMS_KEY.STATUS);
  const isActive = onStatusQueryParam || QUERY_PARAMS_VALUE.ALL;

  const onChangeStatusFilter = useCallback(
    (selectOption: ISelectOption) => {
      const { value } = selectOption;

      updateUrlQueryParams([
        [QUERY_PARAMS_KEY.STATUS, value],
        [QUERY_PARAMS_KEY.PAGE, DEFAULT_QUERY_PARAMS_FOR_URL.page],
        [QUERY_PARAMS_KEY.LIMIT, DEFAULT_QUERY_PARAMS_FOR_URL.limit],
      ]);

      dispatch(resetProductStatusSelection());
    },
    [updateUrlQueryParams, dispatch],
  );

  const controlledValue = STATUS_SELECT.find(el => el.value === isActive);

  return (
    <div className={style.filter}>
      <div className={style.filter_name}>Status</div>
      <Select
        controlledValue={controlledValue}
        onChange={onChangeStatusFilter}
        disabled={isLoading}
        options={STATUS_SELECT}
        className={style.select}
      />
    </div>
  );
};
