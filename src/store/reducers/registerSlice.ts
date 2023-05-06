import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import authService from '../../services/auth.service';
import {
  AsyncThunkConfig,
  RegisterParamsType,
  RegisterResponseType,
} from '../../services/auth.serviceType';

const initialState = {
  errMessage: '' as string | undefined,
  isValidRegistrationData: null as null | boolean,
  loading: false as boolean,
};

export const registerService = createAsyncThunk<
  { data: RegisterResponseType },
  RegisterParamsType,
  AsyncThunkConfig
>('register/registerService', async (dataUser, { rejectWithValue }) => {
  try {
    const { data } = await authService.register(dataUser);

    return { data };
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.error;

      return rejectWithValue(errorMessage);
    }

    return rejectWithValue('[registerService]: Error');
  }
});

const registerSlice = createSlice({
  name: 'register',
  initialState,
  extraReducers: bulder => {
    bulder.addCase(registerService.pending, state => {
      state.errMessage = '';
      state.loading = true;
    });
    bulder.addCase(registerService.fulfilled, state => {
      state.isValidRegistrationData = true;
      state.loading = false;
    });
    bulder.addCase(registerService.rejected, (state, action) => {
      state.errMessage = action.payload as string;
      state.isValidRegistrationData = false;
      state.loading = false;
    });
  },
  reducers: {
    clearState: state => {
      state.errMessage = '';
      state.isValidRegistrationData = null;
      state.loading = false;
    },
  },
});

export const { clearState } = registerSlice.actions;

export default registerSlice.reducer;
