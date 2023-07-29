import { createSelector } from '@reduxjs/toolkit';

import { ICategory, IImage, IProductsListRequest } from './types';

import { IActivateStatus } from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/ProductsListSettings/types/products-types';
import { IProductCompilation } from 'services/product/product.serviceTypes';
import { RootStateType } from 'store/createStore';

export const pageNumber = (state: RootStateType): number => state.paginate.page_num;

export const pageSize = (state: RootStateType): number => state.paginate.page_size;

export const amountPages = (state: RootStateType): number => state.paginate.amountPages;

export const getActivatedIds = (state: RootStateType): IActivateStatus[] =>
  state.product.activationProductIds;

export const getMainCheckedStatus = (state: RootStateType): boolean =>
  state.product.selectAllProducts;

export const getDeactivatedIds = (state: RootStateType): IActivateStatus[] =>
  state.product.deactivationProductIds;

export const productCategorySelector = (state: RootStateType): ICategory =>
  state.product.productCard.category ?? {};

export const favoriteProductSelector = (state: RootStateType): boolean =>
  state.product.isFavorite || false;

export const productGradeSelector = (state: RootStateType): number | string =>
  state.product.productCard.grade_average;

export const productTotalOrdersSelector = (state: RootStateType): number | null =>
  state.product.productCard.total_orders;

export const productImagesSelector = (state: RootStateType): IImage[] =>
  state.product.productCard.images;

export const productNameSelector = (state: RootStateType): string =>
  state.product.productCard.name;

export const productTagsSelector = (state: RootStateType): string[] =>
  state.product.productCard.tags;

export const productVariationsSelector = (state: RootStateType): any[] =>
  state.product.productCard.variations;

export const productDescriptionSelector = (state: RootStateType): string =>
  state.product.productCard.description;

export const popularProductsSelector = (state: RootStateType): IProductCompilation[] =>
  state.product.popularProducts;

export const similarProductsSelector = (state: RootStateType): IProductCompilation[] =>
  state.product.similarProducts;
export const productsCompilationSelector = (
  state: RootStateType,
): { [key: number]: IProductCompilation[] } => state.product.productsCompilation;

export const manageProductsSelector = (state: RootStateType): IProductsListRequest[] =>
  state.product.products;

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
