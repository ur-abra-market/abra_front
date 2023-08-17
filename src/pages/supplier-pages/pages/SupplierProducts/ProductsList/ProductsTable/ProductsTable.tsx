import React from 'react';

import style from './ProductsTable.module.scss';
import { TableHeader } from './TableHeader/TableHeader';
import { TableList } from './TableList/TableList';

import { useAppSelector } from 'common/hooks';
import { getSortedData, IProduct } from 'store/reducers/supplier/product';

export interface ITableData {
  data: IProduct[] | undefined;
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
