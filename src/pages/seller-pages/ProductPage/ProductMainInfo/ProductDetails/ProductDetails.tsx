import React from 'react';

import { useAppSelector } from 'common/hooks';
import { ProductParams, ProductPrice, SupplierInfo, Tags } from 'elements';
import { ProductOverview } from 'pages/seller-pages/ProductPage/ProductOverview/ProductOverview';
import { ProductRecommendations } from 'pages/seller-pages/ProductPage/ProductRecommendations/ProductRecommendations';
import { productNameSelector, productTagsSelector } from 'store/reducers/productSlice';
import { Button, Title } from 'ui-kit';

import style from './ProductDetails.module.scss';

export const ProductDetails = (): JSX.Element => {
  const title = useAppSelector(productNameSelector);
  const tags = useAppSelector(productTagsSelector);

  return (
    <div className={style.product_details_container}>
      <Title className={style.product_title}>{title}</Title>
      <Tags tags={tags} />
      <ProductParams />
      <ProductPrice />
      <Button className={style.button}>Add to Cart</Button>
      <SupplierInfo />
      <ProductOverview />
    </div>
  );
};
