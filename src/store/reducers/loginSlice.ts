import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import authService from '../../services/auth.service';
import { generateResponseError } from '../../utils/generateResponseError';
import {
  AsyncThunkConfig,
  CheckAuthResponseType,
  LoginParamsType,
  LoginResponseType
} from "../../services/auth.serviceType";

const initialState = {
  resMessage: '' as string,
  errMessage: '' as string,
  loading: false as boolean,
  isAuth: false as boolean,
};

export const loginService = createAsyncThunk<{data:LoginResponseType},LoginParamsType, AsyncThunkConfig>(
  'login/loginService',
  async (dataUser, { rejectWithValue }) => {
    try {
      const response = await authService.login(dataUser);

      if (response.data.is_supplier) localStorage.setItem('profile', 'supplier');

      return response
    } catch (error) {
      // const err = error.response.data.detail ? error.response.data.detail : error.message;
      // const message = generateResponseError(err);
      //
      // return rejectWithValue(message);
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('[registerService]: Error');
    }
  },
);

export const checkAuth = createAsyncThunk<{data:CheckAuthResponseType},void, AsyncThunkConfig>(
  'login/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.checkAuth();

      if (response.data.is_supplier) localStorage.setItem('profile', 'supplier');

      return response;
    } catch (error) {
      localStorage.removeItem('profile');
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('[checkAuth]: ERROR');
    }
  },
);

export const logout = createAsyncThunk<any, void>(
  'login/logout',
  async (_, { rejectWithValue }) => {
    try {
      const data = await authService.logout();

      localStorage.removeItem('profile');

      return data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('[logout]: ERROR');
    }
  },
);

const loginSlice = createSlice({
  name: 'login',
  initialState,
  extraReducers: builder => {
    builder.addCase(loginService.pending, state => {
      state.resMessage = '';
      state.loading = true;
      state.isAuth = false;
    });
    builder.addCase(loginService.fulfilled, (state, action) => {
      state.resMessage = action.payload.data.result; // response
      state.loading = false;
      state.isAuth = true;
    });
    builder.addCase(loginService.rejected, (state, action) => {
      state.resMessage = action.payload as string;
      state.errMessage = action.payload as string;
      state.loading = false;
      state.isAuth = false;
    });
    builder.addCase(checkAuth.pending, state => {
      state.loading = true;
    });
    builder.addCase(checkAuth.fulfilled, state => {
      state.loading = false;
      state.isAuth = true;
    });
    builder.addCase(checkAuth.rejected, state => {
      state.loading = false;
      state.isAuth = false;
    });
    builder.addCase(logout.pending, state => {
      state.loading = true;
    });
    builder.addCase(logout.fulfilled, state => {
      state.loading = false;
      state.isAuth = false;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.resMessage = action.payload as string;
      state.errMessage = action.payload as string;
      state.loading = false;
      state.isAuth = false;
    });
  },
  reducers: {},
});

export default loginSlice.reducer;
