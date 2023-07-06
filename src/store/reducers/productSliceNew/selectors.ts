import { ICategory } from './interfaces';

import { RootStateType } from 'store/createStore';

export const productCategorySelector = (state: RootStateType): ICategory =>
  state.productNew.productCard.category ?? {};

export const favoriteProductSelector = (state: RootStateType): boolean =>
  state.productNew.isFavorite || false;
