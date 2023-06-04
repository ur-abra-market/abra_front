import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import authService from '../../services/auth/auth.service';
import {
  IAccountPersonalInfoRequest,
  IAccountPersonalInfoResponse,
} from '../../services/common/common.serviceTypes';
import userService from '../../services/user/user.service';

import { getCurrentUserInfo } from './loginSlice';

import { LoadingStatus } from 'common/types';

interface IFormRegistrationInitialState {
  accountInfo: null | {};
  resMessage: string;
  errMessage: string;
  loading: LoadingStatus;
}

const initialState: IFormRegistrationInitialState = {
  accountInfo: null,
  resMessage: '',
  errMessage: '',
  loading: LoadingStatus.Idle,
};

export const sendAccountPersonalInfo = createAsyncThunk<
  IAccountPersonalInfoResponse,
  IAccountPersonalInfoRequest
>(
  'formRegistration/sendUserAccountInfo',
  async (
    { first_name, last_name, phone_country_code, phone_number },
    { rejectWithValue },
  ) => {
    try {
      return await authService.sendAccountPersonalInfo({
        first_name,
        last_name,
        phone_country_code,
        phone_number,
      });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('[sendUserAccountInfo]: ERROR');
    }
  },
);

export const updateAccountPersonalInfo = createAsyncThunk<
  IAccountPersonalInfoResponse,
  IAccountPersonalInfoRequest
>(
  'formRegistration/updateAccountPersonalInfo',
  async (
    { first_name, last_name, phone_country_code, phone_number },
    { dispatch, rejectWithValue },
  ) => {
    try {
      const response = await userService.updateAccountPersonalInfo({
        first_name,
        last_name,
        phone_country_code,
        phone_number,
      });

      if (response.result) {
        dispatch(getCurrentUserInfo());
      }

      return response;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('[updateAccountPersonalInfo]: ERROR');
    }
  },
);

const formRegistrationSlice = createSlice({
  name: 'formRegistration',
  initialState,
  reducers: {},
});

export default formRegistrationSlice.reducer;
