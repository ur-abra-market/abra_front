import React, { ChangeEvent, useCallback } from 'react';

import { useSelector } from 'react-redux';

import style from './TableHeader.module.scss';

import { ArrowSort } from 'assets/icons';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { tableSortData } from 'pages/supplier-pages/pages/SupplierProducts/utils/tableData';
import {
  selectAllProductsSelector,
  paramsSelector,
  isLoadingSelector,
  selectAllProducts,
  setParams,
  SortType,
  activeProductSelector,
  deactivatedProductSelector,
  supplierProductsSelector,
} from 'store/reducers/supplier/product';
import { ButtonIcon, Checkbox } from 'ui-kit';

export const TableHeader = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const params = useAppSelector(paramsSelector);
  const activeProduct = useAppSelector(activeProductSelector);
  const deactivatedProduct = useAppSelector(deactivatedProductSelector);
  const products = useAppSelector(supplierProductsSelector);

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

  const onChangeSortData = (sortKey?: string, sortValue?: SortType): void => {
    if (!sortKey) return;
    const [[key]] = Object.entries(params).filter(([key]) => key === sortKey);

    if (sortValue === params.sort) {
      dispatch(
        setParams({
          ...params,
          ascending: !params.ascending,
        }),
      );
    } else {
      dispatch(
        setParams({
          ...params,
          [key]: sortValue,
          ascending: false,
        }),
      );
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
            <span className={style.text}>{column.name}</span>
            {column.arrow && (
              <ButtonIcon
                disabled={isLoading}
                onClick={() => onChangeSortData(column.sortKey, column.sortValue)}
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
