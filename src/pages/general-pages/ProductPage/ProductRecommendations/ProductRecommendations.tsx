import React from 'react';

import cn from 'classnames';

import { useAppSelector } from 'common/hooks';
import { ViewMoreProductsLink } from 'elements';
import { ProductCard, ProductsPreview } from 'modules';
import { IProductCompilation } from 'services/product/product.serviceTypes';
import {
  popularProductsSelector,
  productTagsSelector,
  similarProductsSelector,
} from 'store/reducers/productSlice';

import style from './ProductRecommendations.module.scss';

export const ProductRecommendations = (): JSX.Element => {
  const popularProducts = useAppSelector(popularProductsSelector);
  const similarProducts = useAppSelector(similarProductsSelector);
  const tags = useAppSelector(productTagsSelector);

  return (
    <>
      {similarProducts.length > 0 && (
        <div className={cn(style.similar_product, style.section)}>
          <ProductsPreview title="Similar products">
            {similarProducts.map((product: IProductCompilation): JSX.Element => {
              return <ProductCard key={product.id} product={product} />;
            })}
            <ViewMoreProductsLink />
          </ProductsPreview>
        </div>
      )}
      {popularProducts.length > 0 && (
        <div className={cn(style.popular_product, style.section)}>
          <ProductsPreview title="Popular products in this category">
            {popularProducts.map((product: IProductCompilation): JSX.Element => {
              return <ProductCard key={product.id} product={product} />;
            })}
            <ViewMoreProductsLink />
          </ProductsPreview>
        </div>
      )}
      {/* //todo ждет данные с бека */}
      {/* <div className={style.section}> */}
      {/* <LatestSearches tags={tags} /> */}
      {/* </div> */}
    </>
  );
};
