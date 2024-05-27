import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { ISellersCartResponse, ISellerSetAmountOfProduct } from './types';

import { IAsyncThunkConfig } from 'common/types';
import { sellerService } from 'services/seller/seller.service';
import {
  ISellerAddToCartRequest,
  ISellersCartRequest,
  ISellerSetAmountOfProductRequest,
} from 'services/seller/seller.serviceTypes';

export const getSellerCartData = createAsyncThunk<
  ISellersCartResponse[],
  ISellersCartRequest,
  IAsyncThunkConfig
>('seller/getSellerDataCart', async (payload, { rejectWithValue }) => {
  try {
    const offset = payload.offset ?? 0;
    const limit = payload.limit ?? 100;

    return await sellerService.getSellerCart({ offset, limit });
  } catch (error) {
    const errorMessage =
      error instanceof AxiosError
        ? error.response?.data?.error || error.message
        : '[getSellerDataCart]: Error';

    return rejectWithValue(errorMessage);
  }
});

export const addToCart = createAsyncThunk<
  ISellersCartResponse[],
  ISellerAddToCartRequest,
  IAsyncThunkConfig
>('seller/addToCart', async (payload, { rejectWithValue }) => {
  try {
    return await sellerService.addToCart(payload);
  } catch (error) {
    const errorMessage =
      error instanceof AxiosError
        ? error.response?.data?.error || error.message
        : '[addToCart]: Error';

    return rejectWithValue(errorMessage);
  }
});

export const checkoutOrder = createAsyncThunk<boolean, number, IAsyncThunkConfig>(
  'seller/checkoutOrder',
  async (orderId, { rejectWithValue }) => {
    try {
      return await sellerService.checkoutOrder(orderId);
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.error || error.message
          : '[checkoutOrder]: Error';

      return rejectWithValue(errorMessage);
    }
  },
);

export const setAmountOfProduct = createAsyncThunk<
  ISellerSetAmountOfProduct,
  ISellerSetAmountOfProductRequest,
  IAsyncThunkConfig
>('seller/setAmountOfProduct', async (payload, { rejectWithValue }) => {
  try {
    return await sellerService.setAmountOfProduct(payload);
  } catch (error) {
    const errorMessage =
      error instanceof AxiosError
        ? error.response?.data?.error || error.message
        : '[setAmountOfProduct]: Error';

    return rejectWithValue(errorMessage);
  }
});
