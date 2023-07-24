import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { IAsyncThunkConfig, IBaseResponse, LoadingStatusEnum } from 'common/types';
import { authService } from 'services/auth/auth.service';
import {
  IChangeEmailRequest,
  IChangePasswordRequest,
  IConfirmEmailRequest,
  ILoginRequest,
  IPersonalInfoRequest,
  IRegisterRequest,
  IResetPasswordRequest,
} from 'services/auth/auth.serviceTypes';
import { getUserRole } from 'store/reducers/appSlice';
import { setLoading, setResponseNotice } from 'store/reducers/appSlice/slice';
import { getCompanyNumberEmployees } from 'store/reducers/commonSlice';
import { hasBusinessInfo, hasPersonalInfo } from 'store/reducers/supplier/profile';

export const registerUser = createAsyncThunk<void, IRegisterRequest, IAsyncThunkConfig>(
  'auth/registerUser',
  async (dataUser, { rejectWithValue, dispatch }) => {
    dispatch(setLoading(LoadingStatusEnum.Loading));

    try {
      await authService.register(dataUser);
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
  },
);

export const confirmEmail = createAsyncThunk<
  void,
  IConfirmEmailRequest,
  IAsyncThunkConfig
>('auth/confirmEmail', async (dataUser, { rejectWithValue }) => {
  try {
    await authService.confirmEmail(dataUser);
  } catch (error) {
    return rejectWithValue('[confirmEmail]: Error');
  }
});

export const createAccountPersonalInfo = createAsyncThunk<
  IBaseResponse<boolean>,
  IPersonalInfoRequest,
  IAsyncThunkConfig
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

export const loginUser = createAsyncThunk<void, ILoginRequest, IAsyncThunkConfig>(
  'auth/loginUser',
  async (dataUser, { rejectWithValue, dispatch }) => {
    dispatch(setLoading(LoadingStatusEnum.Loading));

    try {
      await authService.login(dataUser);

      const userRole = await dispatch(getUserRole());

      if (userRole.payload === 'supplier') {
        await dispatch(hasPersonalInfo());
        await dispatch(hasBusinessInfo());
        await dispatch(getCompanyNumberEmployees());
      }
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
  },
);

export const logoutUser = createAsyncThunk<void, void, IAsyncThunkConfig>(
  'login/logoutUser',
  async (_, { rejectWithValue, dispatch }) => {
    dispatch(setLoading(LoadingStatusEnum.Loading));

    try {
      await authService.logout();
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        dispatch(
          setResponseNotice({
            noticeType: 'error',
            message: error.response?.data?.error || error.message,
          }),
        );
      }

      return rejectWithValue('[logoutUser]: Error');
    } finally {
      dispatch(setLoading(LoadingStatusEnum.Idle));
    }
  },
);

export const forgotPassword = createAsyncThunk<void, string, IAsyncThunkConfig>(
  'password/forgotPassword',
  async (email, { dispatch, rejectWithValue }) => {
    dispatch(setLoading(LoadingStatusEnum.Loading));
    try {
      await authService.forgotPassword(email);
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

export const checkToken = createAsyncThunk<void, string, IAsyncThunkConfig>(
  'password/checkToken',
  async (token, { rejectWithValue }) => {
    try {
      await authService.checkToken(token);
    } catch (error) {
      return rejectWithValue('[checkToken]: Error');
    }
  },
);

export const resetPassword = createAsyncThunk<
  void,
  IResetPasswordRequest,
  IAsyncThunkConfig
>('password/resetPassword', async (param, { dispatch, rejectWithValue }) => {
  dispatch(setLoading(LoadingStatusEnum.Loading));

  try {
    await authService.resetPassword(param);
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
  void,
  IChangePasswordRequest,
  IAsyncThunkConfig
>('password/changePassword', async (param, { dispatch, rejectWithValue }) => {
  dispatch(setLoading(LoadingStatusEnum.Loading));
  try {
    await authService.changePassword(param);
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

export const changeEmail = createAsyncThunk<void, IChangeEmailRequest, IAsyncThunkConfig>(
  'auth/changeEmail',
  async (params, { dispatch, rejectWithValue }) => {
    dispatch(setLoading(LoadingStatusEnum.Loading));
    try {
      await authService.changeEmail(params);
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
  },
);
