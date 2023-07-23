import React from 'react';

import style from './ProductsList.module.scss';
import { ProductsListSettings } from './ProductsListSettings/ProductsListSettings';
import { ProductsTable } from './ProductsTable/ProductsTable';

export const ProductsList = (): JSX.Element => {
  return (
    <div className={style.container}>
      <ProductsListSettings />
      <ProductsTable />
    </div>
  );
};
