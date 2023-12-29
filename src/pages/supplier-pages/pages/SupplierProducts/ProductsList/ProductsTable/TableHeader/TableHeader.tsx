import React, { ChangeEvent, FC, useCallback } from 'react';

import { useSelector } from 'react-redux';

import { ArrowSort } from 'assets/icons';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { useUpdateSearchParams } from 'pages/supplier-pages/pages/SupplierProducts/common/hoocks/useUpdateSearchParams';
import { IColumns } from 'pages/supplier-pages/pages/SupplierProducts/common/types/types';
import {
  DEFAULT_QUERY_PARAMS_FOR_URL,
  QUERY_PARAMS_KEY,
  QUERY_PARAMS_VALUE,
} from 'pages/supplier-pages/pages/SupplierProducts/common/utils/queryParamsConstants';
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

interface TableHeaderProps {
  tableSortData: IColumns[];
  displayedColumns?: string[];
  nonDisplayedColumns?: string[];
  isFixed?: boolean;
}

export const TableHeader: FC<TableHeaderProps> = ({
  tableSortData,
  displayedColumns,
  nonDisplayedColumns,
  isFixed = false,
}) => {
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

  const totalDisplayedColumns = (): IColumns[] => {
    if (displayedColumns) {
      return tableSortData.filter(({ name }) => displayedColumns.includes(name));
    }

    return tableSortData.filter(({ name }) => !nonDisplayedColumns!.includes(name));
  };

  return (
    <thead className={style.thead}>
      <tr className={`${style.table_row} ${isFixed ? style.fixed : ''}`}>
        {!nonDisplayedColumns?.includes('Checkbox') && (
          <th className={style.table_head} data-column="Checkbox">
            <Checkbox
              disabled={isLoading}
              variant="default"
              checked={checked}
              onChange={setAllCheckboxesState}
            />
          </th>
        )}
        {totalDisplayedColumns().map(column => (
          <th key={column.id} className={style.table_head} data-column={column.name}>
            {column.name}
            {column.arrow && (
              <ButtonIcon
                className={style.icon_filter}
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
