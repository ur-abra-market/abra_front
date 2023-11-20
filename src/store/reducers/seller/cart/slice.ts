import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IProductCardCart } from './types';

import { LoadingStatusEnum } from 'common/types';
import { getProductById, IProductCard } from 'store/reducers/productSlice';

export interface IProductsInCart {
  selectAllProducts: boolean;
  productsList: IProductCard[];
  productsListInCart: IProductCardCart[];
  isLoading: LoadingStatusEnum;
  totalAmount: number;
  itemsInCart: number;
}

const initialState: IProductsInCart = {
  selectAllProducts: false,
  productsList: [],
  productsListInCart: [],
  isLoading: LoadingStatusEnum.Idle,
  totalAmount: 0,
  itemsInCart: 0,
};

const sellerProfileSlice = createSlice({
  name: 'seller/cart',
  initialState,
  reducers: {
    getAmount: (
      state,
      action: PayloadAction<{
        order_id: number;
        amount: number;
      }>,
    ) => {
      const item = state.productsList.find(item => item.id === action.payload.order_id);
      const itemIndex = state.productsListInCart.findIndex(
        cartItem => cartItem.id === item?.id,
      );

      if (itemIndex === -1) {
        const obj: any = {
          ...item,
          amount: action.payload.amount,
        };

        state.productsListInCart.push(obj);
      } else {
        state.productsListInCart[itemIndex].amount = action.payload.amount;
      }
    },
    getTotalAmount: state => {
      const totalAmount = state?.productsListInCart.reduce(
        (prev: number, next: IProductCardCart) => {
          return prev + +next.amount;
        },
        0,
      );

      state.totalAmount = +totalAmount;
      state.isLoading = LoadingStatusEnum.Success;
    },
    getProductItemsInCart: state => {
      state.itemsInCart = +state.productsListInCart.length;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getProductById.pending, state => {
        state.isLoading = LoadingStatusEnum.Loading;
      })
      .addCase(getProductById.fulfilled, (state, action: PayloadAction<IProductCard>) => {
        state.productsList.push(action.payload);
        state.isLoading = LoadingStatusEnum.Success;
      })
      .addCase(getProductById.rejected, state => {
        state.isLoading = LoadingStatusEnum.Failed;
      });
  },
});

export const cartActions = sellerProfileSlice.actions;
export const { getAmount, getTotalAmount, getProductItemsInCart } = cartActions;
export const sellerCartReducer = sellerProfileSlice.reducer;
