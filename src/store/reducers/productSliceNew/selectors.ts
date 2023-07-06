import { ICategory } from './interfaces';

import { RootStateType } from 'store/createStore';

export const productCategorySelector = (state: RootStateType): ICategory =>
  state.productNew.productCard.category ?? {};
