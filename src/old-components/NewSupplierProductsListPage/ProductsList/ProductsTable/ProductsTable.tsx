import React, { FC } from 'react';

import style from './ProductsTable.module.scss';
import { TableHeader } from './TableHeader/TableHeader';

export const ProductsTable: FC = (): JSX.Element => {
  return (
    <table className={style.table}>
      <TableHeader />
    </table>
  );
};
