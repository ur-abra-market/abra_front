import { IProduct } from './types';

import { RootStateType } from 'store/createStore';

export const selectAllProductsSelector = (state: RootStateType): boolean =>
  state.supplierProduct.selectAllProducts;

export const deactivatedProductSelector = (state: RootStateType): number[] =>
  state.supplierProduct.deactivatedProductIds;

export const supplierProductsSelector = (state: RootStateType): IProduct[] =>
  state.supplierProduct.products;

export const activeProductSelector = (state: RootStateType): number[] =>
  state.supplierProduct.activeProductIds;

export const sortedProductSelector = (state: RootStateType): IProduct[] => {
  const copyOfData = [...state.supplierProduct.products];

  return copyOfData.sort((a, b) => {
    if (a.is_active && !b.is_active) {
      return -1;
    }
    if (!a.is_active && b.is_active) {
      return 1;
    }

    return 0;
  });
};

export const hasChangedSelector = (state: RootStateType): boolean =>
  state.supplierProduct.hasChanged;

export const isLoadingSelector = (state: RootStateType): boolean =>
  state.supplierProduct.isLoading;

export const totalCountSelector = (state: RootStateType): number =>
  state.supplierProduct.totalCount;
