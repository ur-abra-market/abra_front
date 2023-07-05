import React from 'react';

import style from './ProductPage.module.scss';
import { ProductPageHeader } from './ProductPageHeader/ProductPageHeader';

import { WithLayout } from 'common/hocs/WithLayout';

export const ProductPage = WithLayout((): JSX.Element => {
  return (
    <div className={style.product_container}>
      <ProductPageHeader />
    </div>
  );
});
