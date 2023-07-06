import React from 'react';

import style from './ProductPageHeader.module.scss';

import { useAppSelector } from 'common/hooks';
import { Grades } from 'elements';
import { BreadCrumbs } from 'elements/BreadCrumbs/BreadCrumbs';
import { Favorite } from 'elements/Favorite/Favorite';
import {
  productCategorySelector,
  favoriteProductSelector,
} from 'store/reducers/productSliceNew';

export const ProductPageHeader = (): JSX.Element => {
  const categoryName = useAppSelector(productCategorySelector).name;
  const isFavorite = useAppSelector(favoriteProductSelector);

  return (
    <header className={style.header}>
      <div className={style.inner_wrapper}>
        <BreadCrumbs categoryName={categoryName} />
        <Grades grade="4.4" count={1900} />
        <Favorite isFavorite={isFavorite} />
      </div>
    </header>
  );
};
