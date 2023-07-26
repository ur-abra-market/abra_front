import React, { useEffect } from 'react';

import style from './ProductsList.module.scss';
import { ProductsListSettings } from './ProductsListSettings/ProductsListSettings';
import { ProductsTable } from './ProductsTable/ProductsTable';

import { useAppDispatch } from 'common/hooks';
import { manageProducts } from 'store/reducers/productSlice/thunks';

export const ProductsList = (): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(manageProducts());
  }, [dispatch]);

  return (
    <div className={style.container}>
      <ProductsListSettings />
      <ProductsTable />
    </div>
  );
};
