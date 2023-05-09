import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { Status } from '../../enums/status.enum';
import supplierAccountData, {
  INotification,
  RequestAccountInfo,
} from '../../services/supplierAccount.service';

import { getCurrentUserInfo } from './loginSlice';

import { RootState } from 'store/createStore';

export const getSupplierAccountDataService = createAsyncThunk(
  'supplierAccount/getAccountData',
  async (_, { rejectWithValue }) => {
    try {
      return supplierAccountData.getAccountData();
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        rejectWithValue(error.message);
      }

      return rejectWithValue('[getSupplierNotifications]: Error');
    }
  },
);

export const updateSupplierAccountDataService = createAsyncThunk<
  void,
  RequestAccountInfo
>('supplierAccount/updateAccountData', async (data, { rejectWithValue, dispatch }) => {
  try {
    await supplierAccountData.sendAccountData(data);
    dispatch(getSupplierAccountDataService());
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      rejectWithValue(error.message);
    }

    return rejectWithValue('[updateAccountData]: Error');
  }
});

export const getSupplierNotifications = createAsyncThunk(
  'supplierAccount/getNotifications',
  async (_, { rejectWithValue }) => {
    try {
      return supplierAccountData.getNotifications();
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        rejectWithValue(error.message);
      }

      return rejectWithValue('[getSupplierNotifications]: Error');
    }
  },
);

export const updateSupplierNotifications = createAsyncThunk<
  void,
  { id: string; value: boolean }
>(
  'supplierAccount/postNotifications',
  async (param, { rejectWithValue, getState, dispatch }) => {
    try {
      const state = getState() as RootState;
      const { notifications } = state.supplierAccount;

      if (notifications) {
        const new_notifications = { ...notifications, [param.id]: param.value };

        await supplierAccountData.postNotifications(new_notifications);
        dispatch(getSupplierNotifications());
      }
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
  isLoading: Status;
  error: string | null;
  notifications?: INotification;
  hasProfile: boolean;
  supplierInfo: {
    first_name: string;
    last_name: string;
    phone_country_code: string;
    phone_number: string;
  };
}
const initialState: ISupplierAccountSlice = {
  isLoading: Status.Idle,
  error: null,
  hasProfile: false,
  supplierInfo: {
    first_name: '',
    last_name: '',
    phone_country_code: '',
    phone_number: '',
  },
};

const supplierAccountSlice = createSlice({
  name: 'supplierAccount',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getCurrentUserInfo.pending, state => {
      state.isLoading = Status.Loading;
    });
    builder.addCase(getCurrentUserInfo.fulfilled, (state, action) => {
      if (action.payload.result.is_supplier) {
        if (action.payload.detail.has_profile) {
          state.hasProfile = true;
          state.supplierInfo = action.payload.result;
        } else {
          state.hasProfile = false;
        }
      }
      state.isLoading = Status.Success;
    });
    builder.addCase(getSupplierAccountDataService.pending, state => {
      state.isLoading = Status.Loading;
      state.error = null;
    });
    builder.addCase(getSupplierAccountDataService.fulfilled, (state, action) => {
      state.supplierInfo = action.payload.result;
      state.isLoading = Status.Success;
    });
    builder.addCase(getSupplierAccountDataService.rejected, (state, action) => {
      state.isLoading = Status.Failed;
      state.error = action.payload as string;
    });

    builder.addCase(getSupplierNotifications.pending, state => {
      state.isLoading = Status.Loading;
    });
    builder.addCase(getSupplierNotifications.fulfilled, (state, action) => {
      state.isLoading = Status.Success;
      state.notifications = action.payload;
    });
    builder.addCase(getSupplierNotifications.rejected, (state, action) => {
      state.isLoading = Status.Failed;
      state.error = action.payload as string;
    });
  },
});

export default supplierAccountSlice.reducer;
