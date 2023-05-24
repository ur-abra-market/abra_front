import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import authService from '../../../services/auth/auth.service';
import {
  AsyncThunkConfig,
  RegisterParamsType,
  RegisterResponseType,
} from '../../../services/auth/auth.serviceTypes';

export const registerUser = createAsyncThunk<
  { data: RegisterResponseType },
  RegisterParamsType,
  AsyncThunkConfig
>('register/registerService', async (dataUser, { rejectWithValue }) => {
  try {
    const { data } = await authService.register(dataUser);

    return { data };
  } catch (error) {
    if (error instanceof AxiosError) {
      const responseError = error.response?.data?.error;

      const errorMessage = responseError || error.message;

      return rejectWithValue(errorMessage);
    }

    return rejectWithValue('[registerService]: Error');
  }
});
