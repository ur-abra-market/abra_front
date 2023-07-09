import React from 'react';

import style from './ProductDetails.module.scss';

import { useAppSelector } from 'common/hooks';
import { Tags } from 'elements';
// import { ProductColor } from 'elements';
import {
  productNameSelector,
  productTagsSelector,
  productVariationsSelector,
} from 'store/reducers/productSliceNew';

export const ProductDetails = (): JSX.Element => {
  const title = useAppSelector(productNameSelector);
  const tags = useAppSelector(productTagsSelector);
  const variations = useAppSelector(productVariationsSelector); // это пока полная ерунда, бэк отправляет всё в кучу в этот массив

  return (
    <div className={style.product_details_container}>
      <h2 className={style.product_title}>{title}</h2>
      <Tags tags={tags} />
      {/* <ProductColor colors={variations} /> */}
    </div>
  );
};
