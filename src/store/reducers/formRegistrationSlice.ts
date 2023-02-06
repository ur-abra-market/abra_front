import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import formRegistrationService from '../../services/formRegistration.service';
import { RequestAccountInfo } from '../../services/supplierAccount.service';

interface IFormRegistrationInitialState {
  accountInfo: null | {};
  resMessage: string;
  errMessage: string;
  loading: boolean;
}

const initialState: IFormRegistrationInitialState = {
  accountInfo: null,
  resMessage: '',
  errMessage: '',
  loading: false,
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

// export const getAccountInfo = createAsyncThunk(
//   'formRegistration/getAccountInfo',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await supplierAccountData.getAccountData();
//
//       console.log('SLICE - NEW', response);
//
//       return response.result;
//     } catch (error) {
//       const err = error.response.data.result ? error.response.data.result : error.message;
//
//       return rejectWithValue(err);
//     }
//   },
// );

const formRegistrationSlice = createSlice({
  name: 'formRegistration',
  initialState,
  extraReducers: builder => {
    builder.addCase(accountInfoService.pending, state => {
      state.resMessage = '';
      state.loading = true;
    });
    builder.addCase(accountInfoService.fulfilled, (state, action) => {
      state.resMessage = action.payload; // response
      state.loading = false;
    });
    builder.addCase(accountInfoService.rejected, (state, action) => {
      state.resMessage = action.payload as string;
      state.errMessage = action.payload as string;
      state.loading = false;
    });
  },
  reducers: {
    setAccountInfo: (state, action) => {
      state.accountInfo = action.payload;
    },
  },
});

export const { setAccountInfo } = formRegistrationSlice.actions;
export default formRegistrationSlice.reducer;
