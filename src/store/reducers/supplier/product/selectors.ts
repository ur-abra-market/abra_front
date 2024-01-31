import { createSelector } from '@reduxjs/toolkit';

import { IProduct } from './types';

import { RootStateType } from 'store/createStore';

export const selectAllProductsSelector = (state: RootStateType): boolean =>
  state.supplierProduct.selectAllProducts;

export const unselectedProductSelector = (state: RootStateType): number[] =>
  state.supplierProduct.unselectedProductIds;

export const productsSelector = (state: RootStateType): IProduct[] =>
  state.supplierProduct.products;

export const selectedProductSelector = (state: RootStateType): number[] =>
  state.supplierProduct.selectedProductIds;

export const sortedProductSelector = createSelector([productsSelector], products => {
  const copyOfData = [...products];

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

export const hasChangedSelector = (state: RootStateType): boolean =>
  state.supplierProduct.hasChanged;

export const isLoadingSelector = (state: RootStateType): boolean =>
  state.supplierProduct.isLoading;

export const totalCountSelector = (state: RootStateType): number =>
  state.supplierProduct.totalCount;
