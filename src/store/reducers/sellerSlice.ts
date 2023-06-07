import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { LoadingStatus } from '../../common/types';
import {
  ISellerAddressData,
  ISellerData,
  ISellerNotifications,
  ISendSellerResponse,
} from '../../services/seller/seller.serviceTypes';

import { sellerService } from 'services/seller/seller.service';

export const getSellerInfoService = createAsyncThunk<any, void>(
  'seller/getSellerInfoService',
  async (_, { rejectWithValue }) => {
    try {
      const data = await sellerService.getSellerInfo();

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
      const data = await sellerService.sendSellerInfo(sellerData);

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
      const data = await sellerService.getSellerAddresses();

      return data.result.seller_address;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('[getSellerAddressesService]: Error');
    }
  },
);

interface ISellerSlice {
  loading: LoadingStatus;
  userProfileInfo: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };
  userAdresses: {};
  notifications: ISellerNotifications | null;
  profileImage: {
    null: null;
  };
  sellerAddress: null | ISellerAddressData[];
}

const initialState: ISellerSlice = {
  loading: LoadingStatus.Idle,
  userProfileInfo: {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
  },
  userAdresses: {},
  notifications: null,
  profileImage: {
    null: null,
  },
  sellerAddress: null,
};

const sellerSlice = createSlice({
  name: 'seller',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getSellerInfoService.pending, state => {
      state.loading = LoadingStatus.Loading;
    });
    builder.addCase(getSellerInfoService.fulfilled, (state, action) => {
      state.loading = LoadingStatus.Success;
      state.userProfileInfo = action.payload.user_profile_info;
      state.userAdresses = action.payload.user_adresses;
      state.notifications = action.payload.notifications;
      state.profileImage = action.payload.profile_image;
    });
    builder.addCase(getSellerInfoService.rejected, state => {
      state.loading = LoadingStatus.Failed;
    });

    builder.addCase(getSellerAddressesService.pending, state => {
      state.loading = LoadingStatus.Loading;
    });
    builder.addCase(getSellerAddressesService.fulfilled, (state, action) => {
      state.loading = LoadingStatus.Success;
      state.sellerAddress = action.payload;
    });
    builder.addCase(getSellerAddressesService.rejected, state => {
      state.loading = LoadingStatus.Failed;
    });
  },
});

export default sellerSlice.reducer;
