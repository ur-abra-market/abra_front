import React from 'react';

import style from './ProductsTable.module.scss';
import { TableHeader } from './TableHeader/TableHeader';
import { TableList } from './TableList/TableList';

import { useAppSelector } from 'common/hooks';
import { manageProductsSelector } from 'store/reducers/productSlice/selectors';
import { IProductsListRequest } from 'store/reducers/productSlice/types';

export interface ITableData {
  data: IProductsListRequest[] | undefined;
}

export const ProductsTable = (): JSX.Element => {
  const products = useAppSelector(manageProductsSelector);

  // make a copy of the products array
  const testProductsArray = (): IProductsListRequest[] | undefined => {
    if (products?.length) {
      return [...products];
    }
  };

  // test array of 20 elements, then sort by the is_active(visible/hidden) property
  const array = testProductsArray()
    ?.splice(0, 20)
    .sort((a, b) => {
      if (a.is_active && !b.is_active) {
        return -1;
      }
      if (!a.is_active && b.is_active) {
        return 1;
      }

      return 0;
    });

  return (
    <table className={style.table}>
      <TableHeader data={array} />
      <TableList data={array} />
    </table>
  );
};
