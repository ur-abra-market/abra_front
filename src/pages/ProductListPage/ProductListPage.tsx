import React, { useEffect } from 'react';

import style from './ProductListPage.module.css';

import ProductFilter from 'components/ui/product/ProductFilter';
import ProductList from 'components/ui/product/ProductList';
import Footer from 'layouts/Footer';
import Header from 'layouts/Header';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { productPaginateService } from 'store/reducers/productPaginateSlice';

const ProductListPage = (): JSX.Element => {
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
      <Footer />
    </>
  );
};

export default ProductListPage;
