import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { ISellersCartResponse } from './types';

import { IAsyncThunkConfig } from 'common/types';
import { sellerService } from 'services/seller/seller.service';
import { ISellersCartRequest } from 'services/seller/seller.serviceTypes';

export const getSellerDataCart = createAsyncThunk<
  ISellersCartResponse,
  ISellersCartRequest,
  IAsyncThunkConfig
>('seller/getDataCart', async (payload, { rejectWithValue }) => {
  try {
    return await sellerService.getSellerCart(payload);
  } catch (error) {
    const errorMessage =
      error instanceof AxiosError
        ? error.response?.data?.error || error.message
        : '[getDataCart]: Error';

    return rejectWithValue(errorMessage);
  }
});
