import React from 'react';

import style from './ProductsList.module.scss';
import { ProductsTable } from './ProductsTable/ProductsTable';
import { ProductTableEditor } from './ProductTableEditor/ProductTableEditor';

import { useAppSelector } from 'common/hooks';
import { isLoadingSelector } from 'store/reducers/supplier/product';
import { LoaderLinear } from 'ui-kit';

export const ProductsList = (): JSX.Element => {
  const isLoading = useAppSelector(isLoadingSelector);

  return (
    <div className={style.container}>
      {isLoading && <LoaderLinear />}
      <ProductTableEditor />
      <ProductsTable />
    </div>
  );
};
