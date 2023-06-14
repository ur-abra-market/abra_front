import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { sellerService } from '../../../../services/seller/seller.service';
import { ISellerAddressData } from '../../../../services/seller/seller.serviceTypes';
import { setResponseNotice } from '../../appSlice/slice';

export const getSellerAddressesService = createAsyncThunk<ISellerAddressData[], void>(
  'seller/getSellerAddressesService',
  async (_, { rejectWithValue }) => {
    try {
      const data = await sellerService.getSellerAddresses();

      return data.result.seller_address;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('[getSellerAddressesService]: Error');
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
