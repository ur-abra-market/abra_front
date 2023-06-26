import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../common/hooks';

import style from './ProductListPage.module.scss';

import { WithLayout } from 'common/hocs/WithLayout';
import ProductFilter from 'old-components/ui/product/ProductFilter';
import ProductList from 'old-components/ui/product/ProductList';
import { productPaginateService } from 'store/reducers/productPaginateSlice';

export const ProductListPage = WithLayout((): JSX.Element => {
  const dispatch = useAppDispatch();
  const paginate = useAppSelector(state => state.paginate);
  const filter = useAppSelector(state => state.filter);

  const data = { ...filter, ...paginate };

  useEffect(() => {
    dispatch(productPaginateService(data));
  }, [data]);

  return (
    <div className={style.product_list_page}>
      <ProductFilter />
      <ProductList />
    </div>
  );
});
