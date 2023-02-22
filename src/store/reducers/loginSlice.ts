import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import authService from '../../services/auth.service';
import { generateResponseError } from '../../utils/generateResponseError';

const initialState = {
  resMessage: '',
  errMessage: '',
  loading: false,
  isAuth: false,
};

export const loginService = createAsyncThunk<any, any>(
  'login/loginService',
  async (dataUser, { rejectWithValue }) => {
    try {
      const data = await authService.login(dataUser);

      if (data.is_supplier) localStorage.setItem('profile', 'supplier');

      return data.result;
    } catch (error: unknown) {
      // @ts-ignore
      const err = error.response.data.detail ? error.response.data.detail : error.message;
      const message = generateResponseError(err);

      return rejectWithValue(message);
    }
  },
);

export const checkAuth = createAsyncThunk<any, void>(
  'login/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const data = await authService.checkAuth();

      if (data.is_supplier) localStorage.setItem('profile', 'supplier');

      return data;
    } catch (error: unknown) {
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
      state.resMessage = action.payload; // response
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
