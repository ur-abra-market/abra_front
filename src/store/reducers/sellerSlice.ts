import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { Status } from '../../enums/status.enum';
import {
  ISellerAddressData,
  ISellerData,
  IUserResultFetch,
  sellerFetch,
  ISendSellerResponse,
} from '../../services/seller.service';
import userFetch from '../../services/user.service';
import { RootState } from '../createStore';

import { getCurrentUserInfo } from './loginSlice';

export const getSellerInfoService = createAsyncThunk<IUserResultFetch, void>(
  'seller/getSellerInfoService',
  async (_, { rejectWithValue }) => {
    try {
      const data = await sellerFetch.getSellerInfo();

      return data.result;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('[getSellerInfoService]: Error');
    }
  },
);

export const sendSellerInfoService = createAsyncThunk<ISendSellerResponse, ISellerData>(
  'seller/sendSellerInfoService',
  async (sellerData, { rejectWithValue }) => {
    try {
      const data = await sellerFetch.sendSellerInfo(sellerData);

      return data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('[sendSellerInfoService]: Error');
    }
  },
);

export const getSellerAddressesService = createAsyncThunk<ISellerAddressData[], void>(
  'seller/getSellerAddressesService',
  async (_, { rejectWithValue }) => {
    try {
      const data = await sellerFetch.getSellerAddresses();

      return data.result.seller_address;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('[getSellerAddressesService]: Error');
    }
  },
);

export const updateSellerNotificationsService = createAsyncThunk<
  void,
  { id: string; value: boolean }
>(
  'user/updateUserNotificationService',
  async (param, { rejectWithValue, getState, dispatch }) => {
    try {
      const state = getState() as RootState;
      const { notifications } = state.login;

      if (notifications) {
        const notificationsCopy = { ...notifications, [param.id]: param.value };

        await userFetch.updateSellerNotifications(notificationsCopy);
        dispatch(getCurrentUserInfo());
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('[getUserNotificationsService]: Error');
    }
  },
);

const initialState = {
  loading: Status.Idle as Status,
  userProfileInfo: {
    first_name: '' as string,
    last_name: '' as string,
    email: null as null | string,
    phone: null as null | string,
  },
  userAdresses: {},
  profileImage: {
    null: null as null | string,
  },
  sellerAddress: null as null | ISellerAddressData[],
};

const sellerSlice = createSlice({
  name: 'seller',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getSellerInfoService.pending, state => {
      state.loading = Status.Loading;
    });
    builder.addCase(getSellerInfoService.fulfilled, (state, action) => {
      state.loading = Status.Success;
      state.userProfileInfo = action.payload.user_profile_info;
      state.userAdresses = action.payload.user_adresses;
      state.profileImage = action.payload.profile_image;
    });
    builder.addCase(getSellerInfoService.rejected, state => {
      state.loading = Status.Failed;
    });

    builder.addCase(getSellerAddressesService.pending, state => {
      state.loading = Status.Loading;
    });
    builder.addCase(getSellerAddressesService.fulfilled, (state, action) => {
      state.loading = Status.Success;
      state.sellerAddress = action.payload;
    });
    builder.addCase(getSellerAddressesService.rejected, state => {
      state.loading = Status.Failed;
    });
  },
});

export default sellerSlice.reducer;
