import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import authService from '../../services/auth/auth.service';
import {
  AsyncThunkConfig,
  ChangePasswordPayloadType,
  PasswordResponseType,
  ResetPasswordPayloadType,
} from '../../services/auth/auth.serviceTypes';

export type ForgotChangePasswordFormType = {
  email: string;
};

export const forgotPassword = createAsyncThunk<
  { data: PasswordResponseType },
  ForgotChangePasswordFormType,
  AsyncThunkConfig
>('password/forgotPassword', async (param, { rejectWithValue }) => {
  try {
    return await authService.forgotPassword(param.email);
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.message);
    }

    return rejectWithValue('[forgotPassword]: ERROR');
  }
});

export const checkToken = createAsyncThunk<
  { data: PasswordResponseType },
  string,
  AsyncThunkConfig
>('password/checkToken', async (token, { rejectWithValue }) => {
  try {
    return await authService.checkToken(token);
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.message);
    }

    return rejectWithValue('[checkToken]: ERROR');
  }
});

export const resetPassword = createAsyncThunk<
  { data: PasswordResponseType },
  ResetPasswordPayloadType,
  AsyncThunkConfig
>('password/resetPassword', async (param, { rejectWithValue }) => {
  try {
    return authService.resetPassword(param);
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.message);
    }

    return rejectWithValue('[resetPassword]: ERROR');
  }
});

export const changePassword = createAsyncThunk<
  { data: PasswordResponseType },
  ChangePasswordPayloadType,
  AsyncThunkConfig
>('password/changePassword', async (param, { rejectWithValue }) => {
  try {
    return authService.changePassword(param);
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.message);
    }

    return rejectWithValue('[changePassword]: ERROR');
  }
});
const passwordSlice = createSlice({
  name: 'password',
  initialState: {
    result: '' as string,
  },
  extraReducers: builder => {
    builder.addCase(forgotPassword.pending, state => {
      state.result = '';
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.result = action.payload.data.result;
    });
    builder.addCase(checkToken.fulfilled, (state, action) => {
      state.result = action.payload.data.result;
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.result = action.payload.data.result;
    });
    builder.addCase(changePassword.fulfilled, (state, action) => {
      state.result = action.payload.data.result;
    });
  },
  reducers: {},
});

export default passwordSlice.reducer;
