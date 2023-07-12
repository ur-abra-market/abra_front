import React, { FC } from 'react';

import style from './ProductsTable.module.scss';
import { TableHeader } from './TableHeader/TableHeader';
import { TableList } from './TableList/TableList';

export const ProductsTable: FC = (): JSX.Element => {
  return (
    <table className={style.table}>
      <TableHeader />
      <TableList />
    </table>
  );
};
