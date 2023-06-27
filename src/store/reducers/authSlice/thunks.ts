import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { IAsyncThunkConfig, LoadingStatusEnum } from '../../../common/types';
import authService from '../../../services/auth/auth.service';
import {
  IChangePasswordRequest,
  IPersonalInfoRequest,
  ILoginRequest,
  ILoginResponse,
  IResetPasswordRequest,
  IChangeEmailRequest,
  IRegisterRequest,
  IConfirmEmailRequest,
  IPasswordResponse,
} from '../../../services/auth/auth.serviceTypes';
import { getUserRole } from '../appSlice';
import { setLoading, setResponseNotice } from '../appSlice/slice';

export const registerUser = createAsyncThunk<
  IPasswordResponse,
  IRegisterRequest,
  IAsyncThunkConfig
>('auth/registerUser', async (dataUser, { rejectWithValue, dispatch }) => {
  dispatch(setLoading(LoadingStatusEnum.Loading));

  try {
    return await authService.register(dataUser);
  } catch (error) {
    if (error instanceof AxiosError) {
      dispatch(
        setResponseNotice({
          noticeType: 'error',
          message: error.response?.data?.error || error.message,
        }),
      );
    }

    return rejectWithValue('[registerUser]: Error');
  } finally {
    dispatch(setLoading(LoadingStatusEnum.Idle));
  }
});

export const confirmEmail = createAsyncThunk<
  IPasswordResponse,
  IConfirmEmailRequest,
  IAsyncThunkConfig
>('auth/confirmEmail', async (dataUser, { rejectWithValue }) => {
  try {
    return await authService.confirmEmail(dataUser);
  } catch (error) {
    return rejectWithValue('[confirmEmail]: Error');
  }
});

export const createAccountPersonalInfo = createAsyncThunk<
  any, // todo fix any -> need common request interface
  IPersonalInfoRequest
>(
  'createAccount/createAccountPersonalInfo',
  async (personalInfoData, { rejectWithValue }) => {
    try {
      return await authService.sendAccountPersonalInfo(personalInfoData);
    } catch (error) {
      return rejectWithValue('[createAccountPersonalInfo]: Error');
    }
  },
);

export const loginUser = createAsyncThunk<
  ILoginResponse,
  ILoginRequest,
  IAsyncThunkConfig
>('auth/loginUser', async (dataUser, { rejectWithValue, dispatch }) => {
  dispatch(setLoading(LoadingStatusEnum.Loading));

  try {
    const { data } = await authService.login(dataUser);

    dispatch(getUserRole());

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      dispatch(
        setResponseNotice({
          noticeType: 'error',
          message: error.response?.data?.error || error.message,
        }),
      );
    }

    return rejectWithValue('[loginUser]: Error');
  } finally {
    dispatch(setLoading(LoadingStatusEnum.Idle));
  }
});

export const logout = createAsyncThunk<IPasswordResponse, void, IAsyncThunkConfig>(
  'login/logout',
  async (_, { rejectWithValue, dispatch }) => {
    dispatch(setLoading(LoadingStatusEnum.Loading));

    try {
      return await authService.logout();
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        dispatch(
          setResponseNotice({
            noticeType: 'error',
            message: error.response?.data?.error || error.message,
          }),
        );
      }

      return rejectWithValue('[logout]: Error');
    } finally {
      dispatch(setLoading(LoadingStatusEnum.Idle));
    }
  },
);

export const forgotPassword = createAsyncThunk<string, string, IAsyncThunkConfig>(
  'password/forgotPassword',
  async (email, { dispatch, rejectWithValue }) => {
    dispatch(setLoading(LoadingStatusEnum.Loading));
    try {
      const response = await authService.forgotPassword(email);

      return response.data.result;
    } catch (error) {
      if (error instanceof AxiosError) {
        dispatch(
          setResponseNotice({
            noticeType: 'error',
            message: error.response?.data?.error || error.message,
          }),
        );
      }

      return rejectWithValue('[forgotPassword]: Error');
    } finally {
      dispatch(setLoading(LoadingStatusEnum.Idle));
    }
  },
);

export const checkToken = createAsyncThunk<string, string, IAsyncThunkConfig>(
  'password/checkToken',
  async (token, { rejectWithValue }) => {
    try {
      const response = await authService.checkToken(token);

      return response.data.result;
    } catch (error) {
      return rejectWithValue('[checkToken]: Error');
    }
  },
);

export const resetPassword = createAsyncThunk<
  string,
  IResetPasswordRequest,
  IAsyncThunkConfig
>('password/resetPassword', async (param, { dispatch, rejectWithValue }) => {
  dispatch(setLoading(LoadingStatusEnum.Loading));

  try {
    const response = await authService.resetPassword(param);

    return response.data.result;
  } catch (error) {
    if (error instanceof AxiosError) {
      dispatch(
        setResponseNotice({
          noticeType: 'error',
          message: error.response?.data?.error || error.message,
        }),
      );
    }

    return rejectWithValue('[resetPassword]: Error');
  } finally {
    dispatch(setLoading(LoadingStatusEnum.Idle));
  }
});

export const changePassword = createAsyncThunk<
  string,
  IChangePasswordRequest,
  IAsyncThunkConfig
>('password/changePassword', async (param, { dispatch, rejectWithValue }) => {
  dispatch(setLoading(LoadingStatusEnum.Loading));
  try {
    const response = await authService.changePassword(param);

    return response.data.result;
  } catch (error) {
    if (error instanceof AxiosError) {
      dispatch(
        setResponseNotice({
          noticeType: 'error',
          message: error.response?.data?.error || error.message,
        }),
      );
    }

    return rejectWithValue('[changePassword]: Error');
  } finally {
    dispatch(setLoading(LoadingStatusEnum.Idle));
  }
});

export const changeEmail = createAsyncThunk<
  string,
  IChangeEmailRequest,
  IAsyncThunkConfig
>('auth/changeEmail', async (params, { dispatch, rejectWithValue }) => {
  dispatch(setLoading(LoadingStatusEnum.Loading));
  try {
    const response = await authService.changeEmail(params);

    return response.data.result;
  } catch (error) {
    if (error instanceof AxiosError) {
      dispatch(
        setResponseNotice({
          noticeType: 'error',
          message: error.response?.data?.error || error.message,
        }),
      );
    }

    return rejectWithValue('[changeEmail]: Error');
  } finally {
    dispatch(setLoading(LoadingStatusEnum.Idle));
  }
});
