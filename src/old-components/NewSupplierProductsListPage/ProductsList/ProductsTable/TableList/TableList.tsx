import React, { FC, useEffect } from 'react';

import style from './TableList.module.scss';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { manageProductsService } from 'store/reducers/manageProductsSlice';
import { state } from 'store/reducers/modalSlice';
import { Checkbox } from 'ui-kit';

const columns = [
  { id: 1, name: <Checkbox variant="default" /> },
  { id: 2, name: 'SKU' },
  { id: 3, name: 'Picture' },
  { id: 4, name: 'Name' },
  { id: 5, name: 'Creation Date' },
  { id: 6, name: 'Status' },
  { id: 7, name: 'Price' },
  { id: 8, name: 'Balance, units' },
  { id: 9, name: 'Visibility' },
];

export const TableList: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(state => state.manageProducts.products);

  useEffect(() => {
    dispatch(manageProductsService());
  }, [dispatch]);

  return (
    <tbody>
      <tr className={style.table_row}>
        {columns.map(column => (
          <td key={column.id} className={style.table_head}>
            {column.name}
          </td>
        ))}
      </tr>
    </tbody>
  );
};
