import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { userService } from '../../../services';

export const getPersonalInfo = createAsyncThunk<any, void>( // todo fix any
  'auth/createAccountPersonalInfo',
  async (_, { rejectWithValue }) => {
    try {
      const res = await userService.fetchAccountPersonalInfo();

      console.log(res);

      return res;
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.error || error.message
          : '[getUserRole]: Error';

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
