// import { ILoading } from '.';

import { RootStateType } from 'store/createStore';

export const productCardInCart = (state: RootStateType): any | null =>
  state.sellerCart.productsListInCart;

export const totalAmountInCart = (state: RootStateType): any | null =>
  state.sellerCart.totalAmount;

export const totalItemsInCart = (state: RootStateType): any | null =>
  state.sellerCart.itemsInCart;

export const isLoadingCardInCart = (state: RootStateType): any | null =>
  state.sellerCart.isLoading;
