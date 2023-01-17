import React, { useEffect } from 'react';

import style from './ProductListPage.module.css';

import Footer from 'components/common/Footer';
import Header from 'components/common/Header';
import ProductFilter from 'components/ui/product/ProductFilter';
import ProductList from 'components/ui/product/ProductList';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { productPaginateService } from 'store/reducers/productPaginateSlice';

const ProductListPage = () => {
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
      <div className={style.productListPage}>
        <ProductFilter />
        <ProductList />
      </div>
      <Footer />
    </>
  );
};

export default ProductListPage;
