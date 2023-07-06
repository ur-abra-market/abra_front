import React from 'react';

import style from './ProductPageHeader.module.scss';

import { useAppSelector } from 'common/hooks';
import { Grades } from 'elements';
import { BreadCrumbs } from 'elements/BreadCrumbs/BreadCrumbs';
import {
  productGradeSelector,
  productTotalOrdersSelector,
} from 'store/reducers/productSliceNew';
import { productCategorySelector } from 'store/reducers/productSliceNew/selectors';

export const ProductPageHeader = (): JSX.Element => {
  const categoryName = useAppSelector(productCategorySelector).name;

  const grade = useAppSelector(productGradeSelector);
  const totalOrders = useAppSelector(productTotalOrdersSelector);

  return (
    <header className={style.header}>
      <div className={style.inner_wrapper}>
        <BreadCrumbs categoryName={categoryName} />
        <Grades grade={grade} count={totalOrders} />
      </div>
    </header>
  );
};
