import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { IAsyncThunkConfig, LoadingStatusEnum } from '../../../common/types';
import { userService } from '../../../services';
import { authService } from '../../../services/auth/auth.service';
import {
  IChangePasswordRequest,
  ICurrentUserInfoResponse,
  IBusinessInfoRequest,
  IPersonalInfoRequest,
  ILoginRequest,
  ILoginResponse,
  ILogoutResponse,
  IRegisterRequest,
  IRegisterResponse,
  IResetPasswordRequest,
} from '../../../services/auth/auth.serviceTypes';
import { IAccountPersonalInfoRequest } from '../../../services/common/common.serviceTypes';
import { IAccountPersonalInfoResponse } from '../../../services/user/user.serviceTypes';
import { AppDispatchType } from '../../createStore';
import { getUserRole } from '../appSlice';
import { setLoading, setResponseNotice } from '../appSlice/slice';

export const registerUser = createAsyncThunk<
  { data: IRegisterResponse },
  IRegisterRequest,
  { rejectValue: string; dispatch: AppDispatchType }
>('auth/registerUser', async (dataUser, { rejectWithValue, dispatch }) => {
  dispatch(setLoading(LoadingStatusEnum.Loading));

  try {
    const { data } = await authService.register(dataUser);

    return { data };
  } catch (error) {
    const errorMessage =
      error instanceof AxiosError
        ? error.response?.data?.error || error.message
        : '[registerUser]: Error';

    if (error instanceof AxiosError)
      dispatch(setResponseNotice({ noticeType: 'error', message: errorMessage }));

    return rejectWithValue(errorMessage);
  } finally {
    dispatch(setLoading(LoadingStatusEnum.Idle));
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
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.error || error.message
          : '[createAccountPersonalInfo]: Error';

      return rejectWithValue(errorMessage);
    }
  },
);

export const createAccountBusinessInfo = createAsyncThunk<
  IBusinessInfoRequest,
  any // todo fix any -> need common request interface
>(
  'createAccount/createAccountBusinessInfo',
  async (businessInfoData, { rejectWithValue }) => {
    try {
      return await authService.sendAccountBusinessInfo(businessInfoData);
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.error || error.message
          : '[createAccountBusinessInfo]: Error';

      return rejectWithValue(errorMessage);
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

export const logout = createAsyncThunk<ILogoutResponse, void, IAsyncThunkConfig>(
  'login/logout',
  async (_, { rejectWithValue, dispatch }) => {
    dispatch(setLoading(LoadingStatusEnum.Loading));

    try {
      return await authService.logout();
    } catch (error: unknown) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.error || error.message
          : '[logout]: Error';

      if (error instanceof AxiosError)
        dispatch(setResponseNotice({ noticeType: 'error', message: errorMessage }));

      return rejectWithValue(errorMessage);
    } finally {
      dispatch(setLoading(LoadingStatusEnum.Idle));
    }
  },
);

export const getCurrentUserInfo = createAsyncThunk<
  ICurrentUserInfoResponse,
  void,
  IAsyncThunkConfig
>('login/getCurrentUserInfo', async (_, { rejectWithValue, dispatch }) => {
  dispatch(setLoading(LoadingStatusEnum.Loading));

  try {
    const response = await authService.loginCurrentUser();

    return response.data;
  } catch (error) {
    const errorMessage =
      error instanceof AxiosError
        ? error.response?.data?.error || error.message
        : '[getCurrentUserInfo]: Error';

    return rejectWithValue(errorMessage);
  } finally {
    dispatch(setLoading(LoadingStatusEnum.Idle));
  }
});

export const updateAccountPersonalInfo = createAsyncThunk<
  IAccountPersonalInfoResponse,
  IAccountPersonalInfoRequest,
  IAsyncThunkConfig
>(
  'formRegistration/updateAccountPersonalInfo',
  async (personalInfo, { dispatch, rejectWithValue }) => {
    try {
      const response = await userService.updateAccountPersonalInfo(personalInfo);

      if (response.result) {
        dispatch(getCurrentUserInfo());
      }

      return response;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.error || error.message
          : '[updateAccountPersonalInfo]: Error';

      return rejectWithValue(errorMessage);
    }
  },
);

export const forgotPassword = createAsyncThunk<string, string, IAsyncThunkConfig>(
  'password/forgotPassword',
  async (email, { rejectWithValue }) => {
    try {
      const response = await authService.forgotPassword(email);

      return response.data.result;
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.error || error.message
          : '[forgotPassword]: Error';

      return rejectWithValue(errorMessage);
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
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.error || error.message
          : '[checkToken]: Error';

      return rejectWithValue(errorMessage);
    }
  },
);

export const resetPassword = createAsyncThunk<
  string,
  IResetPasswordRequest,
  IAsyncThunkConfig
>('password/resetPassword', async (param, { rejectWithValue }) => {
  try {
    const response = await authService.resetPassword(param);

    return response.data.result;
  } catch (error) {
    const errorMessage =
      error instanceof AxiosError
        ? error.response?.data?.error || error.message
        : '[resetPassword]: Error';

    return rejectWithValue(errorMessage);
  }
});

export const changePassword = createAsyncThunk<
  string,
  IChangePasswordRequest,
  IAsyncThunkConfig
>('password/changePassword', async (param, { rejectWithValue }) => {
  try {
    const response = await authService.changePassword(param);

    return response.data.result;
  } catch (error) {
    const errorMessage =
      error instanceof AxiosError
        ? error.response?.data?.error || error.message
        : '[changePassword]: Error';

    return rejectWithValue(errorMessage);
  }
});
