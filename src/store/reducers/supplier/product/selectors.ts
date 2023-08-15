import { createSelector } from '@reduxjs/toolkit';

import { IProduct, IProductSortOptions } from './types';

import { IActivateStatus } from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/ProductsListSettings/types/products-types';
import { RootStateType } from 'store/createStore';

export const pageNumber = (state: RootStateType): number => state.supplierProduct.page;

export const pageSize = (state: RootStateType): number =>
  state.supplierProduct.params.limit;

export const getActivatedIds = (state: RootStateType): IActivateStatus[] =>
  state.supplierProduct.activationProductIds;

export const getMainCheckedStatus = (state: RootStateType): boolean =>
  state.supplierProduct.selectAllProducts;

export const getDeactivatedIds = (state: RootStateType): IActivateStatus[] =>
  state.supplierProduct.deactivationProductIds;

export const manageProductsSelector = (state: RootStateType): IProduct[] =>
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

export const getParamsSelector = (state: RootStateType): IProductSortOptions =>
  state.supplierProduct.params;

export const hasChangedSelector = (state: RootStateType): boolean =>
  state.supplierProduct.hasChanged;

export const isLoadingSelector = (state: RootStateType): boolean =>
  state.supplierProduct.isLoading;

export const totalCountSelector = (state: RootStateType): number =>
  state.supplierProduct.totalCount;
