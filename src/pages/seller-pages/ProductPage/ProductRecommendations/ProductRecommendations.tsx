import React from 'react';

import { useAppSelector } from 'common/hooks';
import { ViewMoreProductsLink } from 'elements';
import { ProductCard, ProductsPreview } from 'modules';
import { IProductCompilation } from 'services/product/product.serviceTypes';
import {
  popularProductsSelector,
  similarProductsSelector,
} from 'store/reducers/productSlice';

import style from './ProductRecommendations.module.scss';

export const ProductRecommendations = (): JSX.Element => {
  const popularProducts = useAppSelector(popularProductsSelector);
  const similarProducts = useAppSelector(similarProductsSelector);

  return (
    <>
      <div className={style.similar_product}>
        <ProductsPreview title="Similar products">
          {similarProducts.map((product: IProductCompilation): JSX.Element => {
            return <ProductCard key={product.id} product={product} />;
          })}
          <ViewMoreProductsLink />
        </ProductsPreview>
      </div>

      <div className={style.popular_product}>
        <ProductsPreview title="Popular products in this category">
          {popularProducts.map((product: IProductCompilation): JSX.Element => {
            return <ProductCard key={product.id} product={product} />;
          })}
          <ViewMoreProductsLink />
        </ProductsPreview>
      </div>
    </>
  );
};
