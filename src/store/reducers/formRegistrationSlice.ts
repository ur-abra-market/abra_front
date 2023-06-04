import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { LoadingStatus } from '../../common/types/enums/status.enum';
import { userService } from '../../services';
import { IAccountPersonalInfoRequest } from '../../services/common/common.serviceTypes';
import { IAccountPersonalInfoResponse } from '../../services/user/user.serviceTypes';

import { getCurrentUserInfo } from './loginSlice';

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
