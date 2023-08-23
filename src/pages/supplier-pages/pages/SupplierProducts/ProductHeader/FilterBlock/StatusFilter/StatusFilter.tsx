import React, { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { STATUS_SELECT } from 'pages/supplier-pages/pages/SupplierProducts/#utils/filterOptions';
import style from 'pages/supplier-pages/pages/SupplierProducts/ProductHeader/FilterBlock/FilterBlock.module.scss';
import {
  getParamsSelector,
  isLoadingSelector,
  setParams,
} from 'store/reducers/supplier/product';
import { ISelectOption, Select } from 'ui-kit';

export const StatusFilter = (): JSX.Element => {
  const params = useAppSelector(getParamsSelector);
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(isLoadingSelector);

  const onChangeStatusFilter = useCallback(
    (selectOption: ISelectOption) => {
      const { value } = selectOption;
      const newParams =
        value === -1
          ? { ...params, isActive: undefined }
          : { ...params, isActive: Boolean(value) };

      dispatch(setParams(newParams));
    },
    [dispatch, params],
  );

  const controlledValue =
    params.isActive === undefined
      ? STATUS_SELECT[0]
      : STATUS_SELECT.find(el => el.value >= 0 && !!el.value === params.isActive);

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
