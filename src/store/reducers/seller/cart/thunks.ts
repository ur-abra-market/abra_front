import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { ISellersCartResponse } from './types';

import { IAsyncThunkConfig } from 'common/types';
import { sellerService } from 'services/seller/seller.service';
import { ISellersCartRequest } from 'services/seller/seller.serviceTypes';

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
