import React, { useCallback } from 'react';

import { useAppSelector } from 'common/hooks';
import { useUpdateSearchParams } from 'pages/supplier-pages/pages/SupplierProducts/common/hoocks/useUpdateSearchParams';
import { SALE_SELECT } from 'pages/supplier-pages/pages/SupplierProducts/common/utils/filterOptions';
import {
  DEFAULT_QUERY_PARAMS,
  QUERY_PARAMS_KEY,
  QUERY_PARAMS_VALUE,
} from 'pages/supplier-pages/pages/SupplierProducts/common/utils/queryParameters';
import style from 'pages/supplier-pages/pages/SupplierProducts/ProductHeader/FilterBlock/FilterBlock.module.scss';
import { isLoadingSelector } from 'store/reducers/supplier/product';
import { ISelectOption, Select } from 'ui-kit';

export const SaleFilter = (): JSX.Element => {
  const { updateUrlQueryParams, searchParams } = useUpdateSearchParams();
  const isLoading = useAppSelector(isLoadingSelector);
  const onSaleQueryParam = searchParams.get(QUERY_PARAMS_KEY.SALE);

  const onSale = onSaleQueryParam || QUERY_PARAMS_VALUE.ALL;

  const onChangeSaleStatusFilter = useCallback(
    (selectOption: ISelectOption) => {
      const { value } = selectOption;

      updateUrlQueryParams([
        [QUERY_PARAMS_KEY.SALE, value],
        [QUERY_PARAMS_KEY.PAGE, DEFAULT_QUERY_PARAMS.page],
        [QUERY_PARAMS_KEY.LIMIT, DEFAULT_QUERY_PARAMS.limit],
      ]);
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
