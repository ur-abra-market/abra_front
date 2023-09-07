import { useEffect } from 'react';

import { useGetSearchParams } from './common/hoocks/useGetSearchParams';
import { PaginationControl } from './PaginationControl/PaginationControl';
import { ProductHeader } from './ProductHeader/ProductHeader';
import { ProductsList } from './ProductsList/ProductsList';
import style from './SupplierProducts.module.scss';

import { WithLayout } from 'common/hocs/WithLayout';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { getSupplierProducts, hasChangedSelector } from 'store/reducers/supplier/product';

export const SupplierProducts = WithLayout((): JSX.Element => {
  const { status, sale, categoryIds, limit, page, sortField, sortBy } =
    useGetSearchParams();
  const dispatch = useAppDispatch();
  const hasChanged = useAppSelector(hasChangedSelector);

  const offset = (page - 1) * limit;

  useEffect(() => {
    dispatch(
      getSupplierProducts({
        offset,
        limit,
        ascending: sortBy,
        category_ids: categoryIds,
        sort: sortField,
        on_sale: sale,
        is_active: status,
      }),
    );
  }, [
    dispatch,
    offset,
    page,
    sortField,
    sale,
    limit,
    categoryIds,
    sortBy,
    status,
    hasChanged,
  ]);

  return (
    <section className={style.wrapper}>
      <div className={style.content_container}>
        <ProductHeader />
        <PaginationControl />
        <ProductsList />
        <PaginationControl />
      </div>
    </section>
  );
}, 'supplier');
