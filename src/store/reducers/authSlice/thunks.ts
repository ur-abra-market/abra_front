import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { LoadingStatus } from '../../../common/types/enums/status.enum';
import authService from '../../../services/auth/auth.service';
import {
  LoginParamsType,
  LoginResponseType,
  RegisterParamsType,
  RegisterResponseType,
} from '../../../services/auth/auth.serviceTypes';
import { AppDispatchType } from '../../createStore';
import { setLoading } from '../appSlice/slice';
import { getCurrentUserInfo } from '../loginSlice';

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
    let errorMessage: string = ' [registerUser]: Error';

    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.error || error.message;

      return rejectWithValue(errorMessage);
    }

    return rejectWithValue(errorMessage);
  } finally {
    dispatch(setLoading(LoadingStatus.Idle));
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

    dispatch(getCurrentUserInfo());

    return data;
  } catch (error) {
    let errorMessage: string = ' [registerUser]: Error';

    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.error || error.message;

      return rejectWithValue(errorMessage);
    }

    return rejectWithValue(errorMessage);
  } finally {
    dispatch(setLoading(LoadingStatus.Idle));
  }
});
