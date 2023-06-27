import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { sellerService } from '../../../../services/seller/seller.service';
import { SellerAddressData } from '../../../../services/seller/seller.serviceTypes';
import { setResponseNotice } from '../../appSlice/slice';

export const getSellerAvatar = createAsyncThunk<any, void>(
  'seller/getSellerAvatar',
  async (_, { rejectWithValue }) => {
    try {
      return await sellerService.getSellerAvatar();
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.error || error.message
          : '[getSellerAvatar]: Error';

      return rejectWithValue(errorMessage);
    }
  },
);

export const getSellerAddresses = createAsyncThunk<any, void>(
  'seller/getSellerAddresses',
  async (_, { rejectWithValue }) => {
    try {
      return await sellerService.getSellerAddresses();
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.error || error.message
          : '[getSellerAddresses]: Error';

      return rejectWithValue(errorMessage);
    }
  },
);

export const addSellerAddresses = createAsyncThunk<any, SellerAddressData>(
  'seller/addSellerAddresses',
  async (arg, { rejectWithValue, dispatch }) => {
    try {
      await sellerService.addAddress(arg);
      dispatch(getSellerAddresses());
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.error || error.message
          : '[addSellerAddresses]: Error';

      return rejectWithValue(errorMessage);
    }
  },
);

export const updateSellerAddresses = createAsyncThunk<any, SellerAddressData>(
  'seller/updateSellerAddresses',
  async (arg, { rejectWithValue, dispatch }) => {
    try {
      await sellerService.addAddress(arg);
      dispatch(getSellerAddresses());
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.error || error.message
          : '[updateSellerAddresses]: Error';

      return rejectWithValue(errorMessage);
    }
  },
);

export const getSellerNotifications = createAsyncThunk<any, void>(
  'seller/getSellerNotifications',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      return await sellerService.getNotifications();
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.error || error.message
          : '[getSellerNotifications]: Error';

      if (error instanceof AxiosError)
        dispatch(setResponseNotice({ noticeType: 'error', message: errorMessage }));

      return rejectWithValue(errorMessage);
    }
  },
);

export const updateSellerNotifications = createAsyncThunk<
  void,
  { id: string; value: boolean }
>('seller/updateSellerNotifications', async (param, { rejectWithValue, dispatch }) => {
  try {
    await sellerService.updateNotifications({ [param.id]: param.value });
    dispatch(getSellerNotifications());
  } catch (error) {
    const errorMessage =
      error instanceof AxiosError
        ? error.response?.data?.error || error.message
        : '[updateSellerNotifications]: Error';

    if (error instanceof AxiosError)
      dispatch(setResponseNotice({ noticeType: 'error', message: errorMessage }));

    return rejectWithValue(errorMessage);
  }
});
