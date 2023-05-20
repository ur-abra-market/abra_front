import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { Status } from '../../enums/status.enum';
import supplierAccountData, {
  RequestAccountInfo,
} from '../../services/supplierAccount.service';
import userService from '../../services/user.service';

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

export const updateSupplierNotificationsService = createAsyncThunk<
  void,
  { id: string; value: boolean }
>(
  'supplierAccount/postNotifications',
  async (param, { rejectWithValue, getState, dispatch }) => {
    try {
      const state = getState() as RootState;
      const { notifications } = state.login;

      if (notifications) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...rest } = notifications;

        const notification_data_request = { ...rest, [param.id]: param.value };

        const requestData = {
          supplier_data_request: {
            // Remove when the supplier page is ready
            license_number: '1',
          },
          company_data_request: {
            // Remove when the supplier page is ready
            phone_country_code: '1',
            phone_number: 'string',
            name: 'string',
            is_manufacturer: false,
            year_established: 2000,
            number_employees: 0,
            description: 'string',
            address: 'string',
            logo_url: 'string',
            business_sector: 'string',
            business_email: 'user@example.com',
          },
          notification_data_request,
        };

        await userService.updateSupplierNotifications(requestData);
        dispatch(getCurrentUserInfo());
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
  },
});

export default supplierAccountSlice.reducer;
