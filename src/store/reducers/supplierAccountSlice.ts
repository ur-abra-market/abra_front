import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import supplierAccountData, {
  CompanyInfo,
  Country,
  INotification,
  License,
  UserInfo,
} from '../../services/supplierAccount.service';

export const getSupplierAccountDataService = createAsyncThunk(
  'supplierAccount/getAccountData',

  async (data, { rejectWithValue }) => {
    try {
      const data = await supplierAccountData.getAccountData();

      console.log('data', data);

      return data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        rejectWithValue(error.message);
      }

      return rejectWithValue('[getSupplierNotifications]: Error');
    }
  },
);

// TODO - not use
export const getSupplierNotifications = createAsyncThunk(
  'supplierAccount/getNotifications',
  async (_, { rejectWithValue }) => {
    try {
      const notifications = await supplierAccountData.getNotifications();

      return notifications;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        rejectWithValue(error.message);
      }

      return rejectWithValue('[getSupplierNotifications]: Error');
    }
  },
);

// TODO - not use
export const postSupplierNotifications = createAsyncThunk<any, INotification>(
  'supplierAccount/postNotifications',
  async (data, { rejectWithValue }) => {
    try {
      return supplierAccountData.postNotifications(data);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        rejectWithValue(error.message);
      }

      return rejectWithValue('[getSupplierNotifications]: Error');
    }
  },
);

// TODO - not use
export const postSupplierAccountDataService = createAsyncThunk<any, any>(
  'supplierAccount/postAccountData',
  async (personalData, { rejectWithValue }) => {
    try {
      const data = await supplierAccountData.postAccountData(personalData);

      return data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        rejectWithValue(error.message);
      }

      return rejectWithValue('[getSupplierNotifications]: Error');
    }
  },
);

// TODO - пересмотреть типизацию
export interface ISupplierAccountSlice {
  isLoading: boolean;
  error: string | null;
  notifications?: INotification;
  // TODO что приходит ?
  supplierInfo?: {
    user_info: UserInfo;
    license: License;
    company_info: CompanyInfo;
    country: Country;
  };
}
const initialState: ISupplierAccountSlice = {
  isLoading: false,
  error: null,
  supplierInfo: undefined,
  notifications: undefined,
};

const supplierAccountSlice = createSlice({
  name: 'supplierAccount',
  initialState,

  reducers: {},
  extraReducers: builder => {
    builder.addCase(getSupplierAccountDataService.pending, state => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getSupplierAccountDataService.fulfilled, (state, action) => {
      state.isLoading = false;
      state.supplierInfo = action.payload.result;
    });
    builder.addCase(getSupplierAccountDataService.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    //
    // builder.addCase(postSupplierNotifications.pending, state => {
    //   state.isLoading = true;
    // });
    // builder.addCase(postSupplierNotifications.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.notifications = action.payload;
    // });
    // builder.addCase(postSupplierNotifications.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload as string;
    // });

    builder.addCase(getSupplierNotifications.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getSupplierNotifications.fulfilled, (state, action) => {
      state.isLoading = false;
      state.notifications = action.payload;
    });
    builder.addCase(getSupplierNotifications.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export default supplierAccountSlice.reducer;
