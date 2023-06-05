import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { LoadingStatus } from '../../../common/types';
import { IPersonalInfoRequestData } from '../../../common/types/interfaces';
import authService from '../../../services/auth/auth.service';
import {
  LoginParamsType,
  LoginResponseType,
  RegisterParamsType,
  RegisterResponseType,
} from '../../../services/auth/auth.serviceTypes';
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
    let errorMessage: string = '[registerUser]: Error';

    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.error || error.message;
      dispatch(setResponseNotice({ noticeType: 'error', message: errorMessage }));
    }

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
  { rejectValue: string; dispatch: AppDispatchType }
>('auth/loginUser', async (dataUser, { rejectWithValue, dispatch }) => {
  dispatch(setLoading(LoadingStatus.Loading));

  try {
    const { data } = await authService.login(dataUser);

    dispatch(getUserRole());

    return data;
  } catch (error) {
    let errorMessage: string = ' [registerUser]: Error';

    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.error || error.message;
      dispatch(setResponseNotice({ noticeType: 'error', message: errorMessage }));

      return rejectWithValue(errorMessage);
    }

    return rejectWithValue(errorMessage);
  } finally {
    dispatch(setLoading(LoadingStatus.Idle));
  }
});
