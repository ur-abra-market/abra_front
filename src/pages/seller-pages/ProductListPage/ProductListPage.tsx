import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../common/hooks';

import style from './ProductListPage.module.css';

import { Footer, Header } from 'layouts';
import ProductFilter from 'old-components/ui/product/ProductFilter';
import ProductList from 'old-components/ui/product/ProductList';
import { productPaginateService } from 'store/reducers/productPaginateSlice';

export const ProductListPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const paginate = useAppSelector(state => state.paginate);
  const filter = useAppSelector(state => state.filter);

  const data = { ...filter, ...paginate };

  useEffect(() => {
    dispatch(productPaginateService(data));
  });

  return (
    <>
      <Header />
      <div className={style.product_list_page}>
        <ProductFilter />
        <ProductList />
      </div>
      <Footer variant="default" />
    </>
  );
};
