import React from 'react';

import { useParams } from 'react-router-dom';

import style from './ProductPageHeader.module.scss';

import { useAppSelector } from 'common/hooks';
import { Grades, BreadCrumbs, Favorite } from 'elements';
import {
  productCategorySelector,
  favoriteProductSelector,
  productGradeSelector,
  productTotalOrdersSelector,
} from 'store/reducers/productSlice';

export const ProductPageHeader = (): JSX.Element => {
  const { productId } = useParams<string>();
  const { name, parent_id } = useAppSelector(productCategorySelector);
  const isFavorite = useAppSelector(favoriteProductSelector);

  const grade = useAppSelector(productGradeSelector);
  const totalOrders = useAppSelector(productTotalOrdersSelector);

  return (
    <header className={style.header}>
      <div className={style.inner_wrapper}>
        <BreadCrumbs categoryName={name} parentId={parent_id} />
        <Grades grade={grade} count={totalOrders} />
        <Favorite product_id={Number(productId)} isFavorite={isFavorite} />
      </div>
    </header>
  );
};
