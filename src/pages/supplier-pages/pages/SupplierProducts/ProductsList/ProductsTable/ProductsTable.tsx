import React from 'react';

import style from './ProductsTable.module.scss';
import { TableHeader } from './TableHeader/TableHeader';
import { TableList } from './TableList/TableList';

import { useAppSelector } from 'common/hooks';
import { getSortedData } from 'store/reducers/productSlice/selectors';
import { IProductsListRequest } from 'store/reducers/productSlice/types';

export interface ITableData {
  data: IProductsListRequest[] | undefined;
}

export const ProductsTable = (): JSX.Element => {
  const products = useAppSelector(getSortedData);

  return (
    <table className={style.table}>
      <TableHeader data={products} />
      <TableList data={products} />
    </table>
  );
};
