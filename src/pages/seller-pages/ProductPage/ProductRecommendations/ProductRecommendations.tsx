import React from 'react';

import style from './ProductRecommendations.module.scss';

import { useAppSelector } from 'common/hooks';
import { ProductCard } from 'elements';
import { ProductsPreview } from 'modules';
import { IProductCompilation } from 'services/product/product.serviceTypes';
import {
  popularProductsSelector,
  similarProductsSelector,
} from 'store/reducers/productSliceNew';
import { ViewMoreProducts } from 'ui-kit';

export const ProductRecommendations = (): JSX.Element => {
  const popularProducts = useAppSelector(popularProductsSelector);
  const similarProducts = useAppSelector(similarProductsSelector);

  return (
    <div className={style.product_recommendation_container}>
      <div>
        {Object.keys(similarProducts).map(key => {
          return (
            <ProductsPreview key={key} title="Similar products">
              {similarProducts.map((product: IProductCompilation) => (
                <ProductCard key={product.uuid} product={product} />
              ))}
              <ViewMoreProducts />
            </ProductsPreview>
          );
        })}
      </div>
      <div>
        {Object.keys(popularProducts).map(key => {
          return (
            <ProductsPreview key={key} title="Popular products in this category">
              {popularProducts.map((product: IProductCompilation) => (
                <ProductCard key={product.uuid} product={product} />
              ))}
              <ViewMoreProducts />
            </ProductsPreview>
          );
        })}
      </div>
    </div>
  );
};
