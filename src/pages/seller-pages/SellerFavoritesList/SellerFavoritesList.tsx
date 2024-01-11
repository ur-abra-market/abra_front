import React, { useEffect } from 'react';

import { WithLayout } from 'common/hocs/WithLayout';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { ProductCard } from 'modules';
import { ICategoryRequest } from 'services/product/product.serviceTypes';
import {
  getProductsListCompilation,
  productsListSelector,
} from 'store/reducers/productSlice';
import { ButtonQuestion, Search, Title } from 'ui-kit';

import style from './SellerFavoritesList.module.scss';

export const SellerFavoritesList = WithLayout((): JSX.Element => {
  const dispatch = useAppDispatch();
  // const products = useAppSelector(favoriteProductsSelector);
  const products = useAppSelector(productsListSelector);

  useEffect(() => {
    const param = {
      offset: 0,
      limit: 20,
      category_id: 1,
      sort: 'rating',
      ascending: false,
    } as unknown as ICategoryRequest;

    dispatch(getProductsListCompilation(param));
  }, []);

  return (
    <div className={style.favorites_page}>
      <div className={style.container}>
        <div className={style.top}>
          <Title as="h3">Favorites list</Title>
          <Search className={style.search} placeholder="Search within my favorites" />
        </div>
        <div className={style.main}>
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className={style.bottom}>
          <ButtonQuestion />
        </div>
      </div>
    </div>
  );
});
