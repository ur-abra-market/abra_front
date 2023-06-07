import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { supplierService } from '../../../../services';
import { RootStateType } from '../../../createStore';

export const getCompanyInfo = createAsyncThunk<any, void>( // todo fix any
  'supplierAccount/getCompanyInfo',
  async (_, { rejectWithValue }) => {
    try {
      return await supplierService.fetchCompanyInfo();
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.error || error.message
          : '[getUserRole]: Error';

      return rejectWithValue(errorMessage);
    }
  },
);

export const getSupplierNotifications = createAsyncThunk<any, void>(
  'supplierAccount/getSupplierNotifications',
  async (_, { rejectWithValue }) => {
    try {
      return await supplierService.getNotifications();
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.error || error.message
          : '[getSupplierNotifications]: Error';

      return rejectWithValue(errorMessage);
    }
  },
);

export const updateSupplierNotifications = createAsyncThunk<
  void,
  { id: string; value: boolean }
>(
  'supplierAccount/updateSupplierNotifications',
  async (param, { rejectWithValue, getState, dispatch }) => {
    try {
      const state = getState() as RootStateType;
      const { notifications } = state.supplierProfile;

      if (notifications) {
        const new_notifications = { ...notifications, [param.id]: param.value };

        await supplierService.updateNotifications(new_notifications);
        dispatch(getSupplierNotifications());
      }
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.error || error.message
          : '[updateSupplierNotifications]: Error';

      return rejectWithValue(errorMessage);
    }
  },
);
