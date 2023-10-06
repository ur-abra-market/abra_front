import React, { ChangeEvent, useCallback } from 'react';

import { useSelector } from 'react-redux';

import { ArrowSort } from 'assets/icons';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { useUpdateSearchParams } from 'pages/supplier-pages/pages/SupplierProducts/common/hoocks/useUpdateSearchParams';
import {
  DEFAULT_QUERY_PARAMS_FOR_URL,
  QUERY_PARAMS_KEY,
  QUERY_PARAMS_VALUE,
} from 'pages/supplier-pages/pages/SupplierProducts/common/utils/queryParamsConstants';
import { tableSortData } from 'pages/supplier-pages/pages/SupplierProducts/common/utils/tableData';
import {
  selectAllProductsSelector,
  isLoadingSelector,
  selectAllProducts,
  SortType,
  activeProductSelector,
  deactivatedProductSelector,
  productsSelector,
} from 'store/reducers/supplier/product';
import { ButtonIcon, Checkbox } from 'ui-kit';

import style from './TableHeader.module.scss';

export const TableHeader = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { updateUrlQueryParams, searchParams } = useUpdateSearchParams();
  const activeProduct = useAppSelector(activeProductSelector);
  const isLoading = useAppSelector(isLoadingSelector);
  const deactivatedProduct = useAppSelector(deactivatedProductSelector);
  const products = useAppSelector(productsSelector);
  const ascendingQueryParam = searchParams.get(QUERY_PARAMS_KEY.ASCENDING);
  const sortQueryParam = searchParams.get(QUERY_PARAMS_KEY.SORT);
  const ascending = ascendingQueryParam || DEFAULT_QUERY_PARAMS_FOR_URL.sortBy;
  const sort = sortQueryParam || DEFAULT_QUERY_PARAMS_FOR_URL.sortField;

  const allProductsAreHandled = products.length
    ? products.every(
        pr => activeProduct.includes(pr.id) || deactivatedProduct.includes(pr.id),
      )
    : false;

  const checked = useSelector(selectAllProductsSelector) || allProductsAreHandled;

  const setAllCheckboxesState = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      dispatch(selectAllProducts(e.currentTarget.checked));
    },
    [dispatch],
  );

  const onChangeSortData = (sortValue?: SortType): void => {
    if (sortValue === sort) {
      const newAscendingValue =
        ascending === QUERY_PARAMS_VALUE.ASCENDING
          ? QUERY_PARAMS_VALUE.DESCENDING
          : QUERY_PARAMS_VALUE.ASCENDING;

      updateUrlQueryParams([[QUERY_PARAMS_KEY.ASCENDING, newAscendingValue]]);
    } else {
      updateUrlQueryParams([
        [QUERY_PARAMS_KEY.ASCENDING, QUERY_PARAMS_VALUE.ASCENDING],
        [QUERY_PARAMS_KEY.SORT, sortValue],
      ]);
    }
  };

  return (
    <thead className={style.thead}>
      <tr className={style.table_row}>
        <th className={style.table_head}>
          <Checkbox
            disabled={isLoading}
            variant="default"
            checked={checked}
            onChange={setAllCheckboxesState}
          />
        </th>
        {tableSortData.map(column => (
          <th key={column.id} className={style.table_head}>
            {column.name}
            {column.arrow && (
              <ButtonIcon
                disabled={isLoading}
                onClick={() => onChangeSortData(column.sortValue)}
              >
                <ArrowSort />
              </ButtonIcon>
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};
