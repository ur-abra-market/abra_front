import { createSlice } from '@reduxjs/toolkit';

import {
  getSellerAddresses,
  getSellerNotifications,
  updateSellerNotifications,
} from './thunks';

import { LoadingStatusEnum } from 'common/types';
import {
  ISellerNotifications,
  ISellerAddressData,
} from 'services/seller/seller.serviceTypes';

export interface ISellerAddress {
  apartment: string;
  area: string;
  building: string;
  city: string;
  country: string;
  firstName: string;
  isMain: boolean;
  lastName: string;
  phoneNumber: string;
  postalCode: string;
  street: string;
}

interface ISellerProfileSliceInitialState {
  loading: LoadingStatusEnum;
  addresses: ISellerAddressData[] | null;
  notifications: ISellerNotifications | null;
}

const initialState: ISellerProfileSliceInitialState = {
  loading: LoadingStatusEnum.Idle,
  addresses: null,
  notifications: null,
};

const sellerProfileSlice = createSlice({
  name: 'seller',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getSellerNotifications.pending, state => {
        state.loading = LoadingStatusEnum.Loading;
      })
      .addCase(getSellerNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload;
        state.loading = LoadingStatusEnum.Success;
      })
      .addCase(getSellerNotifications.rejected, state => {
        state.loading = LoadingStatusEnum.Failed;
      })
      .addCase(updateSellerNotifications.pending, state => {
        state.loading = LoadingStatusEnum.Loading;
      })
      .addCase(updateSellerNotifications.rejected, state => {
        state.loading = LoadingStatusEnum.Failed;
      })
      .addCase(getSellerAddresses.pending, state => {
        state.loading = LoadingStatusEnum.Loading;
      })
      .addCase(getSellerAddresses.fulfilled, (state, action) => {
        state.addresses = action.payload;
        state.loading = LoadingStatusEnum.Success;
      })
      .addCase(getSellerAddresses.rejected, state => {
        state.loading = LoadingStatusEnum.Failed;
      });
  },
});

export const sellerProfileReducer = sellerProfileSlice.reducer;
