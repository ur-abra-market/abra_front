import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { userService } from 'services';
import {
  IAccountPersonalInfoResponse,
  IFavoriteRequest,
} from 'services/user/user.serviceTypes';

export const getPersonalInfo = createAsyncThunk<IAccountPersonalInfoResponse, void>(
  'user/getPersonalInfo',
  async (_, { rejectWithValue }) => {
    try {
      return await userService.getUserPersonalInfo();
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
      const result = await userService.updateUserPersonalInfo(personalInfoData);

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

export const getFavoritesProductsService = createAsyncThunk<any, IFavoriteRequest>(
  'user/getFavoritesProductsService',
  async (payload, { rejectWithValue }) => {
    try {
      const data = await userService.getFavoritesProducts(payload);

      return data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('[getFavoritesProductsService]: Error');
    }
  },
);
