import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { supplierService } from '../../../../services';
import { setResponseNotice } from '../../appSlice/slice';

import { IAsyncThunkConfig, IServerResponse } from 'common/types';
import authService from 'services/auth/auth.service';
import {
  ISupplierErrorResponse,
  ISupplierCompanyInfoData,
  ISuppliersUpdateISupplierCompanyInfo,
  IBusinessInfoRequest,
} from 'services/supplier/supplier.serviceTypes';

export const getBusinessInfo = createAsyncThunk<
  ISupplierCompanyInfoData,
  void,
  IAsyncThunkConfig
>('supplierProfile/getBusinessInfo', async (_, { rejectWithValue }) => {
  try {
    return await supplierService.fetchBusinessInfo();
  } catch (error) {
    const errorMessage =
      error instanceof AxiosError
        ? error.response?.data?.error || error.message
        : '[getBusinessInfo]: Error';

    return rejectWithValue(errorMessage);
  }
});

export const createAccountBusinessInfo = createAsyncThunk<
  void,
  IBusinessInfoRequest,
  IAsyncThunkConfig
>(
  'createAccount/createAccountBusinessInfo',
  async (businessInfoData, { rejectWithValue }) => {
    try {
      return await supplierService.sendAccountBusinessInfo(businessInfoData);
    } catch (error) {
      return rejectWithValue('[createAccountBusinessInfo]: Error');
    }
  },
);

export const updateBusinessInfo = createAsyncThunk<
  void,
  ISuppliersUpdateISupplierCompanyInfo,
  IAsyncThunkConfig
>('supplierProfile/updateBusinessInfo', async (arg, { rejectWithValue, dispatch }) => {
  try {
    await supplierService.updateBusinessInfo(arg);
    dispatch(getBusinessInfo());
  } catch (error) {
    const errorMessage =
      error instanceof AxiosError
        ? error.response?.data?.error || error.message
        : '[updateBusinessInfo]: Error';

    return rejectWithValue(errorMessage);
  }
});

export const fetchCompanyLogo = createAsyncThunk<string, void, IAsyncThunkConfig>(
  'supplierProfile/fetchCompanyLogo',
  async (_, { rejectWithValue }) => {
    try {
      return await supplierService.fetchCompanyLogo();
    } catch (error: unknown) {
      const err = error as AxiosError<ISupplierErrorResponse>;

      return rejectWithValue(err.message);
    }
  },
);

export const uploadCompanyLogo = createAsyncThunk<
  IServerResponse<{
    id: number;
    url: string;
    image: string;
  }>,
  File,
  IAsyncThunkConfig
>('supplierProfile/uploadCompanyLogo', async (img, { rejectWithValue }) => {
  try {
    const data = await supplierService.uploadCompanyLogo(img);

    return { ...data, result: { ...data.result, image: URL.createObjectURL(img) } };
  } catch (error: unknown) {
    const err = error as AxiosError<ISupplierErrorResponse>;

    return rejectWithValue(err.message);
  }
});

export const deleteCompanyLogo = createAsyncThunk<
  IServerResponse<boolean>,
  number,
  IAsyncThunkConfig
>('supplierProfile/deleteCompanyLogo', async (id, { rejectWithValue }) => {
  try {
    return await supplierService.deleteCompanyLogo(id);
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
