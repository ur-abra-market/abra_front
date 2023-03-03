import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import authService from '../../services/auth.service';
import {
  AsyncThunkConfig,
  RegisterParamsType,
  RegisterResponseType,
} from '../../services/auth.serviceType';

const initialState = {
  resMessage: '' as string,
  errMessage: '' as string,
  loading: false as boolean,
};

export const registerService = createAsyncThunk<
  { data: RegisterResponseType },
  RegisterParamsType,
  AsyncThunkConfig
>('register/registerService', async (dataUser, { rejectWithValue }) => {
  try {
    return authService.register(dataUser);
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.message);
    }

    return rejectWithValue('[registerService]: Error');
  }
});

const registerSlice = createSlice({
  name: 'register',
  initialState,
  extraReducers: bulder => {
    bulder.addCase(registerService.pending, state => {
      state.resMessage = '';
      state.loading = true;
    });
    bulder.addCase(registerService.fulfilled, (state, action) => {
      state.resMessage = action.payload.data.result; // response
      state.loading = false;
    });
    bulder.addCase(registerService.rejected, (state, action) => {
      state.resMessage = action.payload as string;
      state.errMessage = action.payload as string;
      state.loading = false;
    });
  },
  reducers: {},
});

export default registerSlice.reducer;
