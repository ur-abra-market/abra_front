import React, { ChangeEvent, useCallback } from 'react';

import { useSelector } from 'react-redux';

import style from './TableHeader.module.scss';

import { ArrowSort } from 'assets/icons';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { tableSortData } from 'pages/supplier-pages/pages/SupplierProducts/utils/tableData';
import {
  selectAllProductsSelector,
  getParamsSelector,
  isLoadingSelector,
  selectAllProducts,
  setParams,
  SortType,
} from 'store/reducers/supplier/product';
import { ButtonIcon, Checkbox } from 'ui-kit';

export const TableHeader = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const params = useAppSelector(getParamsSelector);
  const checked = useSelector(selectAllProductsSelector);
  const isLoading = useAppSelector(isLoadingSelector);

  const setAllCheckboxesState = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      dispatch(selectAllProducts(e.currentTarget.checked));
    },
    [dispatch],
  );

  const onChangeSortData = (sortKey?: string, sortValue?: SortType): void => {
    if (!sortKey) return;
    const [[key]] = Object.entries(params).filter(([key]) => key === sortKey);

    if (sortValue === params.sort) {
      dispatch(
        setParams({
          ...params,
          ascending: !params.ascending,
        }),
      );
    } else {
      dispatch(
        setParams({
          ...params,
          [key]: sortValue,
          ascending: false,
        }),
      );
    }
  };

  return (
    <thead className={style.thead}>
      <tr className={style.table_row}>
        <th className={style.table_head}>
          <Checkbox
            disabled={isLoading}
            variant="default"
            checked={checked}
            onChange={setAllCheckboxesState}
          />
        </th>
        {tableSortData.map(column => (
          <th key={column.id} className={style.table_head}>
            {column.name}
            {column.arrow && (
              <ButtonIcon
                disabled={isLoading}
                onClick={() => onChangeSortData(column.sortKey, column.sortValue)}
              >
                <ArrowSort />
              </ButtonIcon>
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};
