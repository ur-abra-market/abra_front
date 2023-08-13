import React, { useEffect } from 'react';

import style from './ProductsList.module.scss';
import { ProductsListSettings } from './ProductsListSettings/ProductsListSettings';
import { ProductsTable } from './ProductsTable/ProductsTable';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import {
  getParamsSelector,
  hasChangedSelector,
  manageProducts,
  pageNumber,
} from 'store/reducers/supplier/product';

export const ProductsList = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { offset, limit, onSale, sort, ascending, categoryId, isActive } =
    useAppSelector(getParamsSelector);
  const page = useAppSelector(pageNumber);
  const hasChanged = useAppSelector(hasChangedSelector);

  useEffect(() => {
    dispatch(
      manageProducts({
        offset: (page - 1) * limit,
        limit,
        ascending,
        category_id: categoryId,
        sort,
        on_sale: onSale,
        is_active: isActive,
      }),
    );
  }, [
    dispatch,
    offset,
    limit,
    onSale,
    sort,
    ascending,
    categoryId,
    isActive,
    page,
    hasChanged,
  ]);

  return (
    <div className={style.container}>
      <ProductsListSettings />
      <ProductsTable />
    </div>
  );
};
