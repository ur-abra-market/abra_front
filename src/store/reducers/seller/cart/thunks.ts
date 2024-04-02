import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { ISellersCartResponse } from './types';

import { IAsyncThunkConfig } from 'common/types';
import { sellerService } from 'services/seller/seller.service';
import {
  ISellerAddToCartRequest,
  ISellersCartRequest,
} from 'services/seller/seller.serviceTypes';

export const getSellerCartData = createAsyncThunk<
  ISellersCartResponse[],
  ISellersCartRequest,
  IAsyncThunkConfig
>('seller/getSellerDataCart', async (payload, { rejectWithValue }) => {
  try {
    return await sellerService.getSellerCart(payload);
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
