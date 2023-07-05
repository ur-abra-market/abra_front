import React from 'react';

import style from './ProductPage.module.scss';

import { WithLayout } from 'common/hocs/WithLayout';
import { Grades } from 'elements';

export const ProductPage = WithLayout((): JSX.Element => {
  return (
    <div className={style.product_container}>
      <Grades grade="4.4" count={1900} />
    </div>
  );
});
