import React from 'react';

import { ProductDetails } from './ProductDetails/ProductDetails';

import { useAppSelector } from 'common/hooks';
import { ProductCarousel } from 'elements/ProductCarousel/ProductCarousel';
import { productImagesSelector } from 'store/reducers/productSlice';

import style from './ProductMainInfo.module.scss';

export const ProductMainInfo = (): JSX.Element => {
  const images = useAppSelector(productImagesSelector);

  return (
    <div className={style.product_main_info_wrapper}>
      <ProductCarousel photoArray={images} />
      <ProductDetails />
    </div>
  );
};
