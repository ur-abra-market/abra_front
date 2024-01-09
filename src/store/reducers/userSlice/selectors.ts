import { ILoading, IUserPersonalInfo } from '.';

import { RootStateType } from 'store/createStore';

export const userPersonalInfoSelector = (state: RootStateType): IUserPersonalInfo =>
  state.user.personalInfo;

export const userLoadingSelector = (state: RootStateType): ILoading => state.user.loading;

export const favoriteProductsSelector = (state: RootStateType): any[] =>
  state.user.favoritesProducts;
