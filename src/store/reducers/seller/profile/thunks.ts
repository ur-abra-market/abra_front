import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { IAsyncThunkConfig } from 'common/types';
import { sellerService } from 'services/seller/seller.service';
import {
  ISellerAddressData,
  ISellerAddressRequest,
  ISellerNotifications,
} from 'services/seller/seller.serviceTypes';
import { setResponseNotice } from 'store/reducers/appSlice/slice';

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

export const getSellerAddresses = createAsyncThunk<
  ISellerAddressData[],
  void,
  IAsyncThunkConfig
>('seller/getSellerAddresses', async (_, { rejectWithValue }) => {
  try {
    return await sellerService.getSellerAddresses();
  } catch (error) {
    const errorMessage =
      error instanceof AxiosError
        ? error.response?.data?.error || error.message
        : '[getSellerAddresses]: Error';

    return rejectWithValue(errorMessage);
  }
});

export const addSellerAddresses = createAsyncThunk<
  void,
  ISellerAddressRequest,
  IAsyncThunkConfig
>('seller/addSellerAddresses', async (arg, { rejectWithValue, dispatch }) => {
  try {
    await sellerService.addAddress(arg);
    await dispatch(getSellerAddresses());
    dispatch(
      setResponseNotice({ noticeType: 'success', message: 'Address successfully added' }),
    );
  } catch (error) {
    const errorMessage =
      error instanceof AxiosError
        ? error.response?.data?.error || error.message
        : '[addSellerAddresses]: Error';

    if (error instanceof AxiosError)
      dispatch(setResponseNotice({ noticeType: 'error', message: errorMessage }));

    return rejectWithValue(errorMessage);
  }
});

export const updateSellerAddresses = createAsyncThunk<
  void,
  ISellerAddressRequest,
  IAsyncThunkConfig
>('seller/updateSellerAddresses', async (arg, { rejectWithValue, dispatch }) => {
  try {
    await sellerService.updateAddress(arg);
    await dispatch(getSellerAddresses());
    dispatch(
      setResponseNotice({
        noticeType: 'success',
        message: 'Address successfully changed',
      }),
    );
  } catch (error) {
    const errorMessage =
      error instanceof AxiosError
        ? error.response?.data?.error || error.message
        : '[updateSellerAddresses]: Error';

    if (error instanceof AxiosError)
      dispatch(setResponseNotice({ noticeType: 'error', message: errorMessage }));

    return rejectWithValue(errorMessage);
  }
});

export const deleteSellerAddress = createAsyncThunk<void, number, IAsyncThunkConfig>(
  'seller/deleteSellerAddresses',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await sellerService.deleteAddress(id);

      dispatch(getSellerAddresses());
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('[deleteSellerAddresses]: Error');
    }
  },
);

export const getSellerNotifications = createAsyncThunk<
  ISellerNotifications,
  void,
  IAsyncThunkConfig
>('seller/getSellerNotifications', async (_, { rejectWithValue, dispatch }) => {
  try {
    return await sellerService.fetchNotifications();
  } catch (error) {
    const errorMessage =
      error instanceof AxiosError
        ? error.response?.data?.error || error.message
        : '[getSellerNotifications]: Error';

    if (error instanceof AxiosError)
      dispatch(setResponseNotice({ noticeType: 'error', message: errorMessage }));

    return rejectWithValue(errorMessage);
  }
});

export const updateSellerNotifications = createAsyncThunk<
  void,
  { id: string; value: boolean },
  IAsyncThunkConfig
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

export const updateSellerAvatar = createAsyncThunk<string, File, IAsyncThunkConfig>(
  'seller/updateAvatar',
  async (img, { rejectWithValue }) => {
    try {
      await sellerService.updateAvatar(img);

      return URL.createObjectURL(img);
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.error || error.message
          : '[updateSellerNotifications]: Error';

      return rejectWithValue(errorMessage);
    }
  },
);
