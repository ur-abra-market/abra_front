import React, { JSX } from 'react';

import style from './ProductOverview.module.scss';

import { useAppSelector } from 'common/hooks';
import { AboutProduct, DescriptionProduct, FeedBacksProduct } from 'elements';
import { productDescriptionSelector } from 'store/reducers/productSlice';

export const ProductOverview = (): JSX.Element => {
  const description = useAppSelector(productDescriptionSelector);

  return (
    <div className={style.product_overview_container}>
      <AboutProduct />
      <div className={style.product_overview_group_container}>
        <FeedBacksProduct />
        <DescriptionProduct description={description} />
      </div>
    </div>
  );
};
