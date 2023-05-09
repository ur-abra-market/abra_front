import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { Status } from '../../enums/status.enum';
import authService from '../../services/auth.service';
import { SendUserAccountInfoParamsType } from '../../services/auth.serviceType';
import { BaseResponseType } from '../../services/common.serviceType';
import formRegistrationService from '../../services/formRegistration.service';
import { RequestAccountInfo } from '../../services/supplierAccount.service';

interface IFormRegistrationInitialState {
  accountInfo: null | {};
  resMessage: string;
  errMessage: string;
  loading: Status;
}

const initialState: IFormRegistrationInitialState = {
  accountInfo: null,
  resMessage: '',
  errMessage: '',
  loading: Status.Idle,
};

export const accountInfoService = createAsyncThunk<
  string,
  { path: string; rest: RequestAccountInfo }
>('formRegistration/accountInfoService', async ({ path, rest }, { rejectWithValue }) => {
  try {
    const response = await formRegistrationService.suppliers({ path, rest });

    return response.result;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.message);
    }

    return rejectWithValue('[accountInfoService]: ERROR');
  }
});

export const sendUserAccountInfo = createAsyncThunk<
  BaseResponseType<boolean>,
  SendUserAccountInfoParamsType
>(
  'formRegistration/sendUserAccountInfo',
  async (
    { first_name, last_name, phone_country_code, phone_number },
    { rejectWithValue },
  ) => {
    try {
      return await authService.sendUserAccountInfo({
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

const formRegistrationSlice = createSlice({
  name: 'formRegistration',
  initialState,
  extraReducers: builder => {
    builder.addCase(accountInfoService.pending, state => {
      state.resMessage = '';
      state.loading = Status.Idle;
    });
    builder.addCase(accountInfoService.fulfilled, (state, action) => {
      state.resMessage = action.payload; // response
      state.loading = Status.Success;
    });
    builder.addCase(accountInfoService.rejected, (state, action) => {
      state.resMessage = action.payload as string;
      state.errMessage = action.payload as string;
      state.loading = Status.Failed;
    });
  },
  reducers: {},
});

export default formRegistrationSlice.reducer;
