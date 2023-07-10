import { ICategory, IImage } from './types';

import { IProductCompilation } from 'services/product/product.serviceTypes';
import { RootStateType } from 'store/createStore';

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
