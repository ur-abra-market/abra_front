import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import authService from '../../services/auth.service';
import {
  AsyncThunkConfig,
  CheckAuthResponseType,
  LoginParamsType,
  userRoleType,
  LoginResponseType,
} from '../../services/auth.serviceType';

const initialState = {
  resMessage: '' as string,
  errMessage: '' as string,
  loading: false as boolean,
  isAuth: false as boolean,
  userRole: null as userRoleType,
};

export const loginService = createAsyncThunk<
  LoginResponseType,
  LoginParamsType,
  AsyncThunkConfig
>('login/loginService', async (dataUser, { rejectWithValue, dispatch }) => {
  try {
    const response = await authService.login(dataUser);

    await dispatch(checkAuth());

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.message);
    }

    return rejectWithValue('[registerService]: Error');
  }
});

export const checkAuth = createAsyncThunk<CheckAuthResponseType, void, AsyncThunkConfig>(
  'login/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.checkAuth();

      if (response.data.result.is_supplier) {
        localStorage.setItem('profile', 'supplier');
      }

      return response.data;
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
      state.resMessage = action.payload.result; // response
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
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuth = true;
      state.userRole = action.payload.result.is_supplier ? 'supplier' : 'seller';
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
      state.userRole = null;
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
