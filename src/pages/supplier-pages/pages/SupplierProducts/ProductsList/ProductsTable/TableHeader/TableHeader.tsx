import React, { FC } from 'react';

import { useSelector } from 'react-redux';

import style from './TableHeader.module.scss';

import { ArrowSort } from 'assets/icons';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { ITableData } from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/ProductsTable/ProductsTable';
import {
  columns,
  selectAllCheckbox,
} from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/utils/productUtils';
import {
  getMainCheckedStatus,
  getParamsSelector,
  setParams,
  SortType,
} from 'store/reducers/supplier/product';
import { ButtonIcon, Checkbox } from 'ui-kit';

export const TableHeader: FC<ITableData> = ({ data }): JSX.Element => {
  const dispatch = useAppDispatch();
  const params = useAppSelector(getParamsSelector);
  const checked = useSelector(getMainCheckedStatus);

  const setStatusForMainCheckBox = (checked: boolean): void => {
    selectAllCheckbox(data, checked, dispatch);
  };

  const onChangeSortData = (sortKey?: string, sortValue?: SortType): void => {
    if (!sortKey) return;
    const [[key, value]] = Object.entries(params).filter(([key]) => key === sortKey);

    if (!sortValue) {
      dispatch(setParams({ ...params, [key]: !value }));
    } else if (sortValue === params.sort) {
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
          ascending: true,
        }),
      );
    }
  };

  return (
    <thead className={style.thead}>
      <tr className={style.table_row}>
        <th className={style.table_head}>
          <Checkbox
            variant="default"
            checked={checked}
            onChange={e => setStatusForMainCheckBox(e.currentTarget.checked)}
          />
        </th>
        {columns.map(column => (
          <th key={column.id} className={style.table_head}>
            {column.name}
            {column.arrow && (
              <ButtonIcon
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
