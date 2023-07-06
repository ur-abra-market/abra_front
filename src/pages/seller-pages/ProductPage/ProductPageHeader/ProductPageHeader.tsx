import React from 'react';

import { useAppSelector } from 'common/hooks';
import { Grades } from 'elements';
import {
  productGradeSelector,
  productTotalOrdersSelector,
} from 'store/reducers/productSliceNew';

export const ProductPageHeader = (): JSX.Element => {
  const grade = useAppSelector(productGradeSelector);
  const totalOrders = useAppSelector(productTotalOrdersSelector);

  return (
    <div>
      <Grades grade={grade || '1'} count={totalOrders} />
    </div>
  );
};
