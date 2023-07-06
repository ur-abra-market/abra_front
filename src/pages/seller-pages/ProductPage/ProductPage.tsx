import React, { useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { ProductInfo } from './ProductInfo/ProductInfo';
import style from './ProductPage.module.scss';
import { ProductPageHeader } from './ProductPageHeader/ProductPageHeader';

import { WithLayout } from 'common/hocs/WithLayout';
import { useAppDispatch } from 'common/hooks';
import { getProductById } from 'store/reducers/productSliceNew/thunks';

export const ProductPage = WithLayout((): JSX.Element => {
  const { productId } = useParams<string>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productId) return;
    dispatch(getProductById({ product_id: Number(productId) }));
  }, [dispatch, productId]);

  return (
    <div className={style.product_container}>
      <ProductPageHeader />
      <ProductInfo />
    </div>
  );
});
