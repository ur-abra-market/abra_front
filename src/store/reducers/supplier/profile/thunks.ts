import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { supplierService } from '../../../../services';
import { setResponseNotice } from '../../appSlice/slice';

import { AsyncThunkConfig } from 'common/types';
import {
  ISupplierErrorResponse,
  SuppliersResponse,
} from 'services/supplier/supplier.serviceTypes';
import { setResponseError } from 'store/reducers/appSlice/slice';
import { logout } from 'store/reducers/authSlice';

export const getCompanyInfo = createAsyncThunk<any, void>( // todo fix any
  'supplierProfile/getCompanyInfo',
  async (_, { rejectWithValue }) => {
    try {
      return await supplierService.fetchCompanyInfo();
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.error || error.message
          : '[getCompanyInfo]: Error';

      return rejectWithValue(errorMessage);
    }
  },
);
export const fetchCompanyLogo = createAsyncThunk<string, void, AsyncThunkConfig>(
  'supplierProfile/fetchCompanyImage',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      return await supplierService.fetchCompanyLogo();
    } catch (error: unknown) {
      const err = error as AxiosError<ISupplierErrorResponse>;

      if (err.response) {
        dispatch(setResponseError(err.response?.data.error[0].msg));
      }

      return rejectWithValue(err.message);
    }
  },
);
export const uploadCompanyLogo = createAsyncThunk<
  SuppliersResponse<{
    id: number;
    url: string;
    image: string;
  }>,
  File,
  AsyncThunkConfig
>('supplierProfile/uploadCompanyImage', async (img, { dispatch, rejectWithValue }) => {
  try {
    const data = await supplierService.uploadCompanyLogo(img);

    return { ...data, result: { ...data.result, image: URL.createObjectURL(img) } };
  } catch (error: unknown) {
    const err = error as AxiosError<ISupplierErrorResponse>;

    if (err.response) {
      dispatch(setResponseError(err.response?.data.error[0].msg));
    }

    return rejectWithValue(err.message);
  }
});

export const deleteCompanyLogo = createAsyncThunk<
  SuppliersResponse<boolean>,
  number,
  AsyncThunkConfig
>('supplierProfile/deleteCompanyImage', async (id, { dispatch, rejectWithValue }) => {
  try {
    const data = await supplierService.deleteCompanyLogo(id);

    return data;
  } catch (error) {
    const err = error as AxiosError<ISupplierErrorResponse>;

    return rejectWithValue(err.message);
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
