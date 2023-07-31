import React, { FC } from 'react';

import { useSelector } from 'react-redux';

import style from './TableHeader.module.scss';

import { useAppDispatch } from 'common/hooks';
import { ITableData } from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/ProductsTable/ProductsTable';
import {
  columns,
  selectAllCheckbox,
} from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/utils/productUtils';
import { getMainCheckedStatus } from 'store/reducers/supplierProductSlice';
import { Checkbox } from 'ui-kit';

export const TableHeader: FC<ITableData> = ({ data }): JSX.Element => {
  const dispatch = useAppDispatch();
  const checked = useSelector(getMainCheckedStatus);

  const setStatusForMainCheckBox = (checked: boolean): void => {
    selectAllCheckbox(data, checked, dispatch);
  };

  return (
    <thead>
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
            {column.arrow && column.arrow}
          </th>
        ))}
      </tr>
    </thead>
  );
};
