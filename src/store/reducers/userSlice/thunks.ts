import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { supplierService, userService } from '../../../services';
import { IAccountPersonalInfoResponse } from '../../../services/user/user.serviceTypes';

export const getPersonalInfo = createAsyncThunk<IAccountPersonalInfoResponse, void>(
  'user/getPersonalInfo',
  async (_, { rejectWithValue }) => {
    try {
      return await userService.fetchAccountPersonalInfo();
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.error || error.message
          : '[getPersonalInfo]: Error';

      return rejectWithValue(errorMessage);
    }
  },
);

export const updatePersonalInfo = createAsyncThunk<any, any>(
  'user/updatePersonalInfo',
  async (personalInfoData, { rejectWithValue, dispatch }) => {
    try {
      const result = await userService.updateAccountPersonalInfo(personalInfoData);

      if (result) dispatch(getPersonalInfo());

      return result;
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.error || error.message
          : '[updatePersonalInfo]: Error';

      return rejectWithValue(errorMessage);
    }
  },
);

export const uploadUserLogoService = createAsyncThunk<any, any>(
  'user/uploadUserLogoService',
  async (image, { rejectWithValue }) => {
    try {
      const data = await userService.uploadLogoImage(image);

      return data.result;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        rejectWithValue(error.message);
      }

      return rejectWithValue('[uploadUserLogoService]: ERROR');
    }
  },
);

export const getFavoritesProductsService = createAsyncThunk<any, void>(
  'user/getFavoritesProductsService',
  async (_, { rejectWithValue }) => {
    try {
      const data = await userService.getFavoritesProducts();

      return data.result;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('[getFavoritesProductsService]: Error');
    }
  },
);
