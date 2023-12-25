import React from 'react';

import { ProductDetails } from './ProductDetails/ProductDetails';

import { useAppSelector } from 'common/hooks';
import { Grades } from 'elements';
import { ProductCarousel } from 'elements/ProductCarousel/ProductCarousel';
import {
  productGradeSelector,
  productImagesSelector,
  productTotalOrdersSelector,
} from 'store/reducers/productSlice';

import style from './ProductMainInfo.module.scss';

export const ProductMainInfo = (): JSX.Element => {
  const images = useAppSelector(productImagesSelector);
  const grade = useAppSelector(productGradeSelector);
  const totalOrders = useAppSelector(productTotalOrdersSelector);

  return (
    <div className={style.product_main_info_wrapper}>
      <ProductCarousel photoArray={images} />
      <Grades className={style.grade_mobile} grade={grade} count={totalOrders} />
      <ProductDetails />
    </div>
  );
};
