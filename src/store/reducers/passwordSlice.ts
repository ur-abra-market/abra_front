import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { ForgotPasFormType } from '../../pages/AuthPage/AuthType';
import {
  AsyncThunkConfig,
  ForGotPasswordResponseType,
} from '../../services/auth.serviceType';
import { passwordService } from '../../services/password.service';

export const forgotPassword = createAsyncThunk<
  { data: ForGotPasswordResponseType },
  ForgotPasFormType,
  AsyncThunkConfig
>('password/forgotPassword', async (param, { rejectWithValue }) => {
  try {
    return await passwordService.forgotPassword(param.email);
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.message);
    }

    return rejectWithValue('[forgotPassword]: ERROR');
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
  },
  reducers: {},
});

export default passwordSlice.reducer;
