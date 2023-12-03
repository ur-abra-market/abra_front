import React from 'react';

import { useAppSelector } from 'common/hooks';
import {
  AboutProduct,
  DescriptionProduct,
  FeedBacksProduct,
  ProductParams,
  ProductPrice,
  SupplierInfo,
  Tags,
} from 'elements';
import {
  productDescriptionSelector,
  productNameSelector,
  productTagsSelector,
} from 'store/reducers/productSlice';
import { Button, Title } from 'ui-kit';

import style from './ProductDetails.module.scss';

export const ProductDetails = (): JSX.Element => {
  const title = useAppSelector(productNameSelector);
  const tags = useAppSelector(productTagsSelector);
  const description = useAppSelector(productDescriptionSelector);

  return (
    <div className={style.product_details_container}>
      <Title className={style.product_title}>{title}</Title>
      <Tags tags={tags} />
      <ProductParams />
      <ProductPrice />
      <Button className={style.button}>Add to Cart</Button>
      <SupplierInfo />
      <AboutProduct />
      <FeedBacksProduct />
      <DescriptionProduct description={description} />
    </div>
  );
};
