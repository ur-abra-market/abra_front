import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { supplierService } from '../../../../services';

import { AsyncThunkConfig } from 'services/auth/auth.serviceTypes';
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
export const fetchCompanyImage = createAsyncThunk<
  SuppliersResponse<string>,
  void,
  AsyncThunkConfig
>('supplierProfile/fetchCompanyImage', async (_, { dispatch, rejectWithValue }) => {
  try {
    return await supplierService.fetchCompanyLogo();
  } catch (error: unknown) {
    const err = error as AxiosError<ISupplierErrorResponse>;

    if (err.response) {
      dispatch(setResponseError(err.response?.data.error[0].msg));
    }

    return rejectWithValue(err.message);
  }
});
export const uploadCompanyImage = createAsyncThunk<
  SuppliersResponse<{
    id: number;
    url: string;
    image: string;
  }>,
  File,
  AsyncThunkConfig
>('supplierProfile/uploadCompanyImage', async (img, { dispatch, rejectWithValue }) => {
  try {
    const data = await supplierService.uploadCompanyImage(img);

    return { ...data, result: { ...data.result, image: URL.createObjectURL(img) } };
  } catch (error: unknown) {
    const err = error as AxiosError<ISupplierErrorResponse>;

    console.log(err.message);
    console.log(err.response?.data.error[0].msg);
    if (err.response) {
      dispatch(setResponseError(err.response?.data.error[0].msg));
    }

    return rejectWithValue(err.message);
  }
});

export const deleteCompanyImage = createAsyncThunk<
  SuppliersResponse<boolean>,
  number,
  AsyncThunkConfig
>('supplierProfile/deleteCompanyImage', async (id, { dispatch, rejectWithValue }) => {
  try {
    const data = await supplierService.deleteCompanyImage(id);

    return data;
  } catch (error) {
    const err = error as AxiosError<ISupplierErrorResponse>;

    return rejectWithValue(err.message);
  }
});
