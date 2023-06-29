import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { ResponseUserRoleType } from 'common/types';
import { authService } from 'services';

export const getUserRole = createAsyncThunk<
  ResponseUserRoleType,
  void,
  { rejectValue: string }
>('app/getUserRole', async (_, { rejectWithValue }) => {
  try {
    const { data } = await authService.userRole();

    return data.result;
  } catch (error) {
    const errorMessage =
      error instanceof AxiosError
        ? error.response?.data?.error || error.message
        : '[getUserRole]: Error';

    return rejectWithValue(errorMessage);
  }
});
