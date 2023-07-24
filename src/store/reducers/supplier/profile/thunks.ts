import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { IAsyncThunkConfig, IBaseResponse } from 'common/types';
import { supplierService } from 'services';
import {
  IBusinessInfoRequest,
  ISupplierBusinessInfo,
  ISupplierErrorResponse,
  ISupplierNotifications,
  ISupplierUpdateBusinessInfo,
} from 'services/supplier/supplier.serviceTypes';
import { setResponseNotice } from 'store/reducers/appSlice/slice';

export const getBusinessInfo = createAsyncThunk<
  ISupplierBusinessInfo,
  void,
  IAsyncThunkConfig
>('supplierProfile/getBusinessInfo', async (_, { rejectWithValue }) => {
  try {
    return await supplierService.getBusinessInfo();
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
  async (businessInfoData, { rejectWithValue, dispatch }) => {
    try {
      await supplierService.createBusinessInfo(businessInfoData);
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.error || error.message
          : '[createAccountBusinessInfo]: Error';

      if (error instanceof AxiosError) {
        dispatch(setResponseNotice({ noticeType: 'error', message: errorMessage }));
      }

      return rejectWithValue(errorMessage);
    }
  },
);

export const hasBusinessInfo = createAsyncThunk<boolean, void, IAsyncThunkConfig>(
  'supplierProfile/hasBusinessInfo',
  async (_, { rejectWithValue }) => {
    try {
      return await supplierService.hasBusinessInfo();
    } catch (error) {
      return rejectWithValue('[hasBusinessInfo]: Error');
    }
  },
);

export const hasPersonalInfo = createAsyncThunk<boolean, void, IAsyncThunkConfig>(
  'supplierProfile/hasPersonalInfo',
  async (_, { rejectWithValue }) => {
    try {
      return await supplierService.hasPersonalInfo();
    } catch (error) {
      return rejectWithValue('[hasPersonalInfo]: Error');
    }
  },
);

export const updateBusinessInfo = createAsyncThunk<
  void,
  ISupplierUpdateBusinessInfo,
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

    if (error instanceof AxiosError) {
      dispatch(setResponseNotice({ noticeType: 'error', message: errorMessage }));
    }

    return rejectWithValue(errorMessage);
  }
});

export const getCompanyLogo = createAsyncThunk<string, void, IAsyncThunkConfig>(
  'supplierProfile/getCompanyLogo',
  async (_, { rejectWithValue }) => {
    try {
      return await supplierService.getCompanyLogo();
    } catch (error) {
      const err = error as AxiosError<ISupplierErrorResponse>;

      return rejectWithValue(err.message);
    }
  },
);

export const updateCompanyLogo = createAsyncThunk<string, File, IAsyncThunkConfig>(
  'supplierProfile/updateCompanyLogo',
  async (img, { rejectWithValue }) => {
    try {
      await supplierService.updateCompanyLogo(img);

      return URL.createObjectURL(img);
    } catch (error) {
      const err = error as AxiosError<ISupplierErrorResponse>;

      return rejectWithValue(err.message);
    }
  },
);

export const deleteCompanyImage = createAsyncThunk<void, number, IAsyncThunkConfig>(
  'supplierProfile/deleteCompanyLogo',
  async (id, { rejectWithValue }) => {
    try {
      await supplierService.deleteCompanyImage(id);
    } catch (error) {
      const err = error as AxiosError<ISupplierErrorResponse>;

      return rejectWithValue(err.message);
    }
  },
);

export const getSupplierNotifications = createAsyncThunk<
  ISupplierNotifications,
  void,
  IAsyncThunkConfig
>(
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
  { id: string; value: boolean },
  IAsyncThunkConfig
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
