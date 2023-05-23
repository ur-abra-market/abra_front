import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import authService from '../../services/auth/auth.service';
import {
  AsyncThunkConfig,
  LoginParamsType,
  userRoleType,
  LoginResponseType,
} from '../../services/auth/auth.serviceTypes';

interface IInitialState {
  resMessage: string;
  errMessage: string;
  loading: boolean;
  isAuth: boolean;
  userRole: userRoleType;
}

const initialState: IInitialState = {
  resMessage: '',
  errMessage: '',
  loading: false,
  isAuth: false,
  userRole: null,
};

export const loginService = createAsyncThunk<
  LoginResponseType,
  LoginParamsType,
  AsyncThunkConfig
>('login/loginService', async (dataUser, { rejectWithValue, dispatch }) => {
  try {
    const response = await authService.login(dataUser);

    dispatch(getCurrentUserInfo());

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.message);
    }

    return rejectWithValue('[loginService]: ERROR');
  }
});

export const getCurrentUserInfo = createAsyncThunk<any, void, AsyncThunkConfig>(
  'login/getCurrentUserInfo',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.loginCurrentUser();

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('[getCurrentUserInfo]: ERROR');
    }
  },
);

export const logout = createAsyncThunk<any, void>(
  'login/logout',
  async (_, { rejectWithValue }) => {
    try {
      return await authService.logout();
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
    builder.addCase(loginService.fulfilled, (state, action) => {
      state.resMessage = action.payload.result;
      state.isAuth = true;
    });
    builder.addCase(loginService.rejected, (state, action) => {
      state.resMessage = action.payload as string;
      state.errMessage = action.payload as string;
      state.isAuth = false;
    });
    builder.addCase(getCurrentUserInfo.fulfilled, (state, action) => {
      state.userRole = action.payload.result.is_supplier ? 'supplier' : 'seller';
    });
    builder.addCase(getCurrentUserInfo.rejected, state => {
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
