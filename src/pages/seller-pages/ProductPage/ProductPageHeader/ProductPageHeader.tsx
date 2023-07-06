import React from 'react';

import style from './ProductPageHeader.module.scss';

import { useAppSelector } from 'common/hooks';
import { Grades } from 'elements';
import { BreadCrumbs } from 'elements/BreadCrumbs/BreadCrumbs';
import { Favorite } from 'elements/Favorite/Favorite';
import {
  productCategorySelector,
  favoriteProductSelector,
  productGradeSelector,
  productTotalOrdersSelector,
} from 'store/reducers/productSliceNew';

export const ProductPageHeader = (): JSX.Element => {
  const categoryName = useAppSelector(productCategorySelector).name;
  const isFavorite = useAppSelector(favoriteProductSelector);

  const grade = useAppSelector(productGradeSelector);
  const totalOrders = useAppSelector(productTotalOrdersSelector);

  return (
    <header className={style.header}>
      <div className={style.inner_wrapper}>
        <BreadCrumbs categoryName={categoryName} />
        <Grades grade={grade} count={totalOrders} />
        <Favorite isFavorite={isFavorite} />
      </div>
    </header>
  );
};
