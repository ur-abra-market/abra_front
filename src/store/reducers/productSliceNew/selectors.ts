import { ICategory, IImage } from './interfaces';

import { RootStateType } from 'store/createStore';

export const productCategorySelector = (state: RootStateType): ICategory =>
  state.productNew.productCard.category ?? {};

export const productGradeSelector = (state: RootStateType): number =>
  state.productNew.productCard?.grade_average;

export const productTotalOrdersSelector = (state: RootStateType): number =>
  state.productNew.productCard?.total_orders;

export const productImagesSelector = (state: RootStateType): IImage[] =>
  state.productNew.productCard?.images;
