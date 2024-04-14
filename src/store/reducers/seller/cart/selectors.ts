import { IProductCardInCart } from './types';

import { RootStateType } from 'store/createStore';

export const productsInCart = (state: RootStateType): Array<IProductCardInCart[]> | [] =>
  state.sellerCart.productsInCart;

export const totalItems = (state: RootStateType): number => state.sellerCart.totalItems;

export const isLoading = (state: RootStateType): boolean => state.sellerCart.isLoading;
