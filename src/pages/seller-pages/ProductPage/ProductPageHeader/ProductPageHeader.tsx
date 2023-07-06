import React from 'react';

import style from './ProductPageHeader.module.scss';

import { useAppSelector } from 'common/hooks';
import { Grades } from 'elements';
import { BreadCrumbs } from 'elements/BreadCrumbs/BreadCrumbs';
import { productCategorySelector } from 'store/reducers/productSliceNew/selectors';

export const ProductPageHeader = (): JSX.Element => {
  const categoryName = useAppSelector(productCategorySelector).name;

  return (
    <header className={style.header}>
      <div className={style.inner_wrapper}>
        <BreadCrumbs categoryName={categoryName} />
        <Grades grade="4.4" count={1900} />
      </div>
    </header>
  );
};
