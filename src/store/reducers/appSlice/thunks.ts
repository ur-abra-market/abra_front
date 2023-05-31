import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { ResponseUserRoleType } from '../../../common/types';
import { authService } from '../../../services';

export const getUserRole = createAsyncThunk<
  ResponseUserRoleType,
  void,
  { rejectValue: string }
>('app/getUserRole', async (_, { rejectWithValue }) => {
  try {
    const { data } = await authService.userRole();

    return data.result;
  } catch (error) {
    let errorMessage: string = ' [getUserRole]: Error';

    if (error instanceof AxiosError) {
      const responseError = error.response?.data?.error;

      errorMessage = responseError || error.message;

      return rejectWithValue(errorMessage);
    }

    return rejectWithValue(errorMessage);
  }
});
