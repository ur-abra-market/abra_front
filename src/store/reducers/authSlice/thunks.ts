import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { LoadingStatus, IPersonalInfoRequestData } from '../../../common/types';
import { userService } from '../../../services';
import authService from '../../../services/auth/auth.service';
import {
  LoginParamsType,
  LoginResponseType,
  RegisterParamsType,
  RegisterResponseType,
  AsyncThunkConfig,
  LogoutResponseType,
  CurrentUserInfoResponseType,
  ResetPasswordPayloadType,
  ChangePasswordPayloadType,
} from '../../../services/auth/auth.serviceTypes';
import { IAccountPersonalInfoRequest } from '../../../services/common/common.serviceTypes';
import { IAccountPersonalInfoResponse } from '../../../services/user/user.serviceTypes';
import { AppDispatchType } from '../../createStore';
import { getUserRole } from '../appSlice';
import { setLoading, setResponseNotice } from '../appSlice/slice';

export const registerUser = createAsyncThunk<
  { data: RegisterResponseType },
  RegisterParamsType,
  { rejectValue: string; dispatch: AppDispatchType }
>('auth/registerUser', async (dataUser, { rejectWithValue, dispatch }) => {
  dispatch(setLoading(LoadingStatus.Loading));

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
    dispatch(setLoading(LoadingStatus.Idle));
  }
});

export const createAccountPersonalInfo = createAsyncThunk<
  any, // todo fix any -> need common request interface
  IPersonalInfoRequestData
>('auth/createAccountPersonalInfo', async (personalInfoData, { rejectWithValue }) => {
  try {
    return await authService.sendAccountPersonalInfo(personalInfoData);
  } catch (error) {
    const errorMessage =
      error instanceof AxiosError
        ? error.response?.data?.error || error.message
        : '[getUserRole]: Error';

    return rejectWithValue(errorMessage);
  }
});

export const loginUser = createAsyncThunk<
  LoginResponseType,
  LoginParamsType,
  AsyncThunkConfig
>('auth/loginUser', async (dataUser, { rejectWithValue, dispatch }) => {
  dispatch(setLoading(LoadingStatus.Loading));

  try {
    const { data } = await authService.login(dataUser);

    dispatch(getUserRole());

    return data;
  } catch (error) {
    const errorMessage =
      error instanceof AxiosError
        ? error.response?.data?.error || error.message
        : '[loginUser]: Error';

    if (error instanceof AxiosError)
      dispatch(setResponseNotice({ noticeType: 'error', message: errorMessage }));

    return rejectWithValue(errorMessage);
  } finally {
    dispatch(setLoading(LoadingStatus.Idle));
  }
});

export const logout = createAsyncThunk<LogoutResponseType, void, AsyncThunkConfig>(
  'login/logout',
  async (_, { rejectWithValue, dispatch }) => {
    dispatch(setLoading(LoadingStatus.Loading));

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
      dispatch(setLoading(LoadingStatus.Idle));
    }
  },
);

export const getCurrentUserInfo = createAsyncThunk<
  CurrentUserInfoResponseType,
  void,
  AsyncThunkConfig
>('login/getCurrentUserInfo', async (_, { rejectWithValue, dispatch }) => {
  dispatch(setLoading(LoadingStatus.Loading));

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
    dispatch(setLoading(LoadingStatus.Idle));
  }
});

export const sendAccountPersonalInfo = createAsyncThunk<
  IAccountPersonalInfoResponse,
  IAccountPersonalInfoRequest
>('formRegistration/sendUserAccountInfo', async (personalInfo, { rejectWithValue }) => {
  try {
    return await authService.sendAccountPersonalInfo(personalInfo);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof AxiosError
        ? error.response?.data?.error || error.message
        : '[sendUserAccountInfo]: Error';

    return rejectWithValue(errorMessage);
  }
});

export const updateAccountPersonalInfo = createAsyncThunk<
  IAccountPersonalInfoResponse,
  IAccountPersonalInfoRequest,
  AsyncThunkConfig
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

export const forgotPassword = createAsyncThunk<string, string, AsyncThunkConfig>(
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

export const checkToken = createAsyncThunk<string, string, AsyncThunkConfig>(
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
  ResetPasswordPayloadType,
  AsyncThunkConfig
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
  ChangePasswordPayloadType,
  AsyncThunkConfig
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
