import { createSelector } from '@reduxjs/toolkit';

import { IProductsListRequest } from './types';

import { IActivateStatus } from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/ProductsListSettings/types/products-types';
import { RootStateType } from 'store/createStore';

export const pageNumber = (state: RootStateType): number =>
  state.supplierProduct.page_num;

export const pageSize = (state: RootStateType): number => state.supplierProduct.page_size;

export const getActivatedIds = (state: RootStateType): IActivateStatus[] =>
  state.supplierProduct.activationProductIds;

export const getMainCheckedStatus = (state: RootStateType): boolean =>
  state.supplierProduct.selectAllProducts;

export const getDeactivatedIds = (state: RootStateType): IActivateStatus[] =>
  state.supplierProduct.deactivationProductIds;

export const manageProductsSelector = (state: RootStateType): IProductsListRequest[] =>
  state.supplierProduct.products;

export const getSortedData = createSelector([manageProductsSelector], data => {
  const copyOfData = [...data];

  return copyOfData.sort((a, b) => {
    if (a.is_active && !b.is_active) {
      return -1;
    }
    if (!a.is_active && b.is_active) {
      return 1;
    }

    return 0;
  });
});
