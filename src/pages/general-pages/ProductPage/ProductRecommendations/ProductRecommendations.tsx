import React from 'react';

import { useAppSelector } from 'common/hooks';
import { Advise } from 'pages/general-pages/ProductPage/Advise/Advise';
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
        <Advise
          products={similarProducts}
          title="Similar products"
          className={style.similar_product}
        />
      )}

      {popularProducts.length > 0 && (
        <Advise
          products={popularProducts}
          title="Popular products in this category"
          className={style.popular_product}
        />
      )}

      {/* //todo ждет данные с бека */}
      {/* <div className={style.section}> */}
      {/* <LatestSearches tags={tags} /> */}
      {/* </div> */}
    </>
  );
};
