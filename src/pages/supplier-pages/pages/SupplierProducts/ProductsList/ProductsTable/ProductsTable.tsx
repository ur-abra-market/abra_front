import React from 'react';

import { TableHeader } from './TableHeader/TableHeader';
import { TableList } from './TableList/TableList';

import style from './ProductsTable.module.scss';

export const ProductsTable = (): JSX.Element => {
  return (
    <table className={style.table}>
      <TableHeader />
      <TableList />
    </table>
  );
};
