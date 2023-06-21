import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { AsyncThunkConfig, LoadingStatus } from '../../../common/types';
import { userService } from '../../../services';
import authService from '../../../services/auth/auth.service';
import {
  ChangePasswordPayloadType,
  CurrentUserInfoResponseType,
  IBusinessInfoRequestData,
  IPersonalInfoRequestData,
  LoginParamsType,
  LoginResponseType,
  LogoutResponseType,
  RegisterResponseType,
  ResetPasswordPayloadType,
  ChangeEmailPayloadType,
  IRegisterRequest,
  IConfirmEmailRequest,
} from '../../../services/auth/auth.serviceTypes';
import { IAccountPersonalInfoRequest } from '../../../services/common/common.serviceTypes';
import { IAccountPersonalInfoResponse } from '../../../services/user/user.serviceTypes';
import { getUserRole } from '../appSlice';
import { setLoading, setResponseNotice } from '../appSlice/slice';

export const registerUser = createAsyncThunk<
  RegisterResponseType,
  IRegisterRequest,
  AsyncThunkConfig
>('auth/registerUser', async (dataUser, { rejectWithValue, dispatch }) => {
  dispatch(setLoading(LoadingStatus.Loading));

  try {
    const response = await authService.register(dataUser);

    return response.data;
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
    dispatch(setLoading(LoadingStatus.Idle));
  }
});

export const confirmEmail = createAsyncThunk<
  RegisterResponseType,
  IConfirmEmailRequest,
  AsyncThunkConfig
>('auth/registerUser', async (dataUser, { rejectWithValue }) => {
  try {
    const response = await authService.confirmEmail(dataUser);

    return response.data;
  } catch (error) {
    return rejectWithValue('[confirmEmail]: Error');
  }
});

export const createAccountPersonalInfo = createAsyncThunk<
  any, // todo fix any -> need common request interface
  IPersonalInfoRequestData
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

export const createAccountBusinessInfo = createAsyncThunk<
  IBusinessInfoRequestData,
  any // todo fix any -> need common request interface
>(
  'createAccount/createAccountBusinessInfo',
  async (businessInfoData, { rejectWithValue }) => {
    try {
      return await authService.sendAccountBusinessInfo(businessInfoData);
    } catch (error) {
      return rejectWithValue('[createAccountBusinessInfo]: Error');
    }
  },
);

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
    return rejectWithValue('[getCurrentUserInfo]: Error');
  } finally {
    dispatch(setLoading(LoadingStatus.Idle));
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
    } catch (error) {
      return rejectWithValue('[updateAccountPersonalInfo]: Error');
    }
  },
);

export const forgotPassword = createAsyncThunk<string, string, AsyncThunkConfig>(
  'password/forgotPassword',
  async (email, { dispatch, rejectWithValue }) => {
    dispatch(setLoading(LoadingStatus.Loading));
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
      dispatch(setLoading(LoadingStatus.Idle));
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
      return rejectWithValue('[checkToken]: Error');
    }
  },
);

export const resetPassword = createAsyncThunk<
  string,
  ResetPasswordPayloadType,
  AsyncThunkConfig
>('password/resetPassword', async (param, { dispatch, rejectWithValue }) => {
  dispatch(setLoading(LoadingStatus.Loading));

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
    dispatch(setLoading(LoadingStatus.Idle));
  }
});

export const changePassword = createAsyncThunk<
  string,
  ChangePasswordPayloadType,
  AsyncThunkConfig
>('password/changePassword', async (param, { dispatch, rejectWithValue }) => {
  dispatch(setLoading(LoadingStatus.Loading));
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
    dispatch(setLoading(LoadingStatus.Idle));
  }
});

export const changeEmail = createAsyncThunk<
  string,
  ChangeEmailPayloadType,
  AsyncThunkConfig
>('auth/changeEmail', async (params, { dispatch, rejectWithValue }) => {
  dispatch(setLoading(LoadingStatus.Loading));
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
    dispatch(setLoading(LoadingStatus.Idle));
  }
});
