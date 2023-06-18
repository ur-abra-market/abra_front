import { createSlice } from '@reduxjs/toolkit';

import { LoadingStatus } from '../../../../common/types';
import {
  ISellerAddressData,
  ISellerNotifications,
} from '../../../../services/seller/seller.serviceTypes';

import {
  getSellerAddressesService,
  getSellerNotifications,
  updateSellerNotifications,
} from './thunks';

interface ISellerProfileSlice {
  loading: LoadingStatus;
  personalInfo: {
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

const initialState: ISellerProfileSlice = {
  loading: LoadingStatus.Idle,
  personalInfo: {
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

const sellerProfileSlice = createSlice({
  name: 'seller',
  initialState,
  reducers: {},
  extraReducers: builder => {
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
    builder
      .addCase(getSellerNotifications.pending, state => {
        state.loading = LoadingStatus.Loading;
      })
      .addCase(getSellerNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload;
        state.loading = LoadingStatus.Success;
      })
      .addCase(updateSellerNotifications.pending, state => {
        state.loading = LoadingStatus.Loading;
      })
      .addCase(updateSellerNotifications.rejected, (state, action) => {
        state.loading = LoadingStatus.Failed;
      });
  },
});

export const sellerProfileReducer = sellerProfileSlice.reducer;
