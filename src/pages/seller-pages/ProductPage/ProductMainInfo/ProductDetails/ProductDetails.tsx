import React from 'react';

import style from './ProductDetails.module.scss';

import { useAppSelector } from 'common/hooks';
import { Tags } from 'elements';
// import { ProductColor } from 'elements';
import { productNameSelector, productTagsSelector } from 'store/reducers/productSlice';
import { Title } from 'ui-kit';

export const ProductDetails = (): JSX.Element => {
  const title = useAppSelector(productNameSelector);
  const tags = useAppSelector(productTagsSelector);

  return (
    <div className={style.product_details_container}>
      <Title className={style.product_title}>{title}</Title>
      <Tags tags={tags} />
      {/* <ProductColor colors={variations} /> */}
    </div>
  );
};
