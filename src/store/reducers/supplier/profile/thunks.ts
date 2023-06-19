import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { supplierService } from '../../../../services';
import { setResponseNotice } from '../../appSlice/slice';

import { AsyncThunkConfig } from 'common/types';
import {
  ISuppliersCompanyInfoData,
  ISuppliersUpdateCompanyInfo,
} from 'services/supplier/supplier.serviceTypes';

export const getBusinessInfo = createAsyncThunk<
  ISuppliersCompanyInfoData,
  void,
  AsyncThunkConfig
>('supplierProfile/getCompanyInfo', async (_, { rejectWithValue }) => {
  try {
    return await supplierService.fetchBusinessInfo();
  } catch (error) {
    const errorMessage =
      error instanceof AxiosError
        ? error.response?.data?.error || error.message
        : '[getCompanyInfo]: Error';

    return rejectWithValue(errorMessage);
  }
});
export const updateBusinessInfo = createAsyncThunk<
  void,
  ISuppliersUpdateCompanyInfo,
  AsyncThunkConfig
>('supplierProfile/updateCompanyInfo', async (arg, { rejectWithValue, dispatch }) => {
  try {
    await supplierService.updateBusinessInfo(arg);
    dispatch(getBusinessInfo());
  } catch (error) {
    const errorMessage =
      error instanceof AxiosError
        ? error.response?.data?.error || error.message
        : '[updateCompanyInfo]: Error';

    return rejectWithValue(errorMessage);
  }
});

export const getSupplierNotifications = createAsyncThunk<any, void>(
  'supplierAccount/getSupplierNotifications',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      return await supplierService.getNotifications();
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.error || error.message
          : '[getSupplierNotifications]: Error';

      if (error instanceof AxiosError)
        dispatch(setResponseNotice({ noticeType: 'error', message: errorMessage }));

      return rejectWithValue(errorMessage);
    }
  },
);

export const updateSupplierNotifications = createAsyncThunk<
  void,
  { id: string; value: boolean }
>(
  'supplierAccount/updateSupplierNotifications',
  async (param, { rejectWithValue, dispatch }) => {
    try {
      await supplierService.updateNotifications({ [param.id]: param.value });
      dispatch(getSupplierNotifications());
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.error || error.message
          : '[updateSupplierNotifications]: Error';

      if (error instanceof AxiosError)
        dispatch(setResponseNotice({ noticeType: 'error', message: errorMessage }));

      return rejectWithValue(errorMessage);
    }
  },
);
