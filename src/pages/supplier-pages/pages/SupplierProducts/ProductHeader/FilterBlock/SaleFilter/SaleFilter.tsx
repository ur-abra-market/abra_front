import React, { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import style from 'pages/supplier-pages/pages/SupplierProducts/ProductHeader/FilterBlock/FilterBlock.module.scss';
import { SALE_SELECT } from 'pages/supplier-pages/pages/SupplierProducts/utils/filterOptions';
import {
  paramsSelector,
  isLoadingSelector,
  setParams,
} from 'store/reducers/supplier/product';
import { ISelectOption, Select } from 'ui-kit';

export const SaleFilter = (): JSX.Element => {
  const params = useAppSelector(paramsSelector);
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(isLoadingSelector);

  const onChangeSaleStatusFilter = useCallback(
    (selectOption: ISelectOption) => {
      const { value } = selectOption;
      const newParams =
        value === -1
          ? { ...params, onSale: undefined }
          : { ...params, onSale: Boolean(value) };

      dispatch(setParams(newParams));
    },
    [dispatch, params],
  );

  const controlledValue =
    params.onSale === undefined
      ? SALE_SELECT[0]
      : SALE_SELECT.find(el => el.value >= 0 && !!el.value === params.onSale);

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
