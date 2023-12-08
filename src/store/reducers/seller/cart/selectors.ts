import { IProductCardCart } from './types';

import { RootStateType } from 'store/createStore';

export const productsInCart = (state: RootStateType): Array<IProductCardCart[]> | [] =>
  state.sellerCart.productsInCart;
