import React, { useEffect } from 'react';

import style from './ProductsList.module.scss';
import { ProductsTable } from './ProductsTable/ProductsTable';
import { ProductTableEditor } from './ProductTableEditor/ProductTableEditor';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import {
  getParamsSelector,
  hasChangedSelector,
  isLoadingSelector,
  getSupplierProducts,
  pageNumber,
} from 'store/reducers/supplier/product';
import { LoaderLinear } from 'ui-kit';

export const ProductsList = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { offset, limit, onSale, sort, ascending, categoryIds, isActive } =
    useAppSelector(getParamsSelector);
  const page = useAppSelector(pageNumber);
  const hasChanged = useAppSelector(hasChangedSelector);
  const isLoading = useAppSelector(isLoadingSelector);

  useEffect(() => {
    dispatch(
      getSupplierProducts({
        offset: (page - 1) * limit,
        limit,
        ascending,
        category_ids: categoryIds,
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
    categoryIds,
    isActive,
    page,
    hasChanged,
  ]);

  return (
    <div className={style.container}>
      {isLoading && <LoaderLinear />}
      <ProductTableEditor />
      <ProductsTable />
    </div>
  );
};
