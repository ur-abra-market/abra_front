import { ICategory, IImage } from './interfaces';

import { IProductCompilation } from 'services/product/product.serviceTypes';
import { RootStateType } from 'store/createStore';

export const productCategorySelector = (state: RootStateType): ICategory =>
  state.productNew.productCard.category ?? {};

export const favoriteProductSelector = (state: RootStateType): boolean =>
  state.productNew.isFavorite || false;

export const productGradeSelector = (state: RootStateType): number =>
  state.productNew.productCard.grade_average;

export const productTotalOrdersSelector = (state: RootStateType): number =>
  state.productNew.productCard.total_orders;

export const productImagesSelector = (state: RootStateType): IImage[] =>
  state.productNew.productCard.images;

export const productNameSelector = (state: RootStateType): string =>
  state.productNew.productCard.name;

export const productTagsSelector = (state: RootStateType): string[] =>
  state.productNew.productCard.tags;

export const productVariationsSelector = (state: RootStateType): any[] =>
  state.productNew.productCard.variations;

export const productDescriptionSelector = (state: RootStateType): string =>
  state.productNew.productCard.description;

export const popularProductsSelector = (state: RootStateType): IProductCompilation[] =>
  state.productNew.popularProducts;

export const similarProductsSelector = (state: RootStateType): IProductCompilation[] =>
  state.productNew.similarProducts;
