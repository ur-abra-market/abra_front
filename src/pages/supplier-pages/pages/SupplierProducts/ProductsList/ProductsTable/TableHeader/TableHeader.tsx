import React, { ChangeEvent, useCallback } from 'react';

import { useSelector } from 'react-redux';

import style from './TableHeader.module.scss';

import { ArrowSort } from 'assets/icons';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import {
  DEFAULT_QUERY_PARAMS,
  QUERY_PARAMS_KEY,
  QUERY_PARAMS_VALUE,
} from 'pages/supplier-pages/pages/SupplierProducts/utils/queryParameters';
import { tableSortData } from 'pages/supplier-pages/pages/SupplierProducts/utils/tableData';
import { useUpdateSearchParams } from 'pages/supplier-pages/pages/SupplierProducts/utils/useUpdateSearchParams';
import {
  selectAllProductsSelector,
  isLoadingSelector,
  selectAllProducts,
  SortType,
  activeProductSelector,
  deactivatedProductSelector,
  supplierProductsSelector,
} from 'store/reducers/supplier/product';
import { ButtonIcon, Checkbox } from 'ui-kit';

export const TableHeader = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { updateUrlQueryParams, searchParams } = useUpdateSearchParams();
  const activeProduct = useAppSelector(activeProductSelector);
  const deactivatedProduct = useAppSelector(deactivatedProductSelector);
  const products = useAppSelector(supplierProductsSelector);
  const ascendingQueryParam = searchParams.get(QUERY_PARAMS_KEY.ASCENDING);
  const sortQueryParam = searchParams.get(QUERY_PARAMS_KEY.SORT);
  const ascending = ascendingQueryParam || DEFAULT_QUERY_PARAMS.sortBy;
  const sort = sortQueryParam || DEFAULT_QUERY_PARAMS.sortField;

  const allProductsAreHandled = products.length
    ? products.every(
        pr => activeProduct.includes(pr.id) || deactivatedProduct.includes(pr.id),
      )
    : false;

  const checked = useSelector(selectAllProductsSelector) || allProductsAreHandled;
  const isLoading = useAppSelector(isLoadingSelector);

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
