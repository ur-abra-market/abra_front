import { createSlice } from '@reduxjs/toolkit';

import {
  getSellerAddresses,
  getSellerAvatar,
  getSellerNotifications,
  updateSellerAvatar,
  updateSellerNotifications,
} from './thunks';

import { LoadingStatusEnum } from 'common/types';
import {
  ISellerAddressData,
  ISellerNotifications,
} from 'services/seller/seller.serviceTypes';

export interface ISellerAddress {
  apartment: string;
  area: string;
  building: string;
  city: string;
  country: number;
  firstName: string;
  isMain: boolean;
  lastName: string;
  phoneNumber: string;
  postalCode: string;
  street: string;
}

export interface ILoading {
  avatarLoading: LoadingStatusEnum;
  notificationsLoading: LoadingStatusEnum;
  addressesLoading: LoadingStatusEnum;
}

interface ISellerProfileSliceInitialState {
  loading: ILoading;
  addresses: ISellerAddressData[] | null;
  notifications: ISellerNotifications | null;
  sellerAvatar: string;
}

const initialState: ISellerProfileSliceInitialState = {
  loading: {
    avatarLoading: LoadingStatusEnum.Idle,
    notificationsLoading: LoadingStatusEnum.Idle,
    addressesLoading: LoadingStatusEnum.Idle,
  },
  addresses: null,
  notifications: null,
  sellerAvatar: '',
};

const sellerProfileSlice = createSlice({
  name: 'seller',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getSellerNotifications.pending, state => {
        state.loading.notificationsLoading = LoadingStatusEnum.Loading;
      })
      .addCase(getSellerNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload;
        state.loading.notificationsLoading = LoadingStatusEnum.Success;
      })
      .addCase(getSellerNotifications.rejected, state => {
        state.loading.notificationsLoading = LoadingStatusEnum.Failed;
      })

      .addCase(updateSellerNotifications.pending, state => {
        state.loading.notificationsLoading = LoadingStatusEnum.Loading;
      })
      .addCase(updateSellerNotifications.rejected, state => {
        state.loading.notificationsLoading = LoadingStatusEnum.Failed;
      })

      .addCase(getSellerAddresses.pending, state => {
        state.loading.addressesLoading = LoadingStatusEnum.Loading;
      })
      .addCase(getSellerAddresses.fulfilled, (state, action) => {
        state.addresses = action.payload;
        state.loading.addressesLoading = LoadingStatusEnum.Success;
      })
      .addCase(getSellerAddresses.rejected, state => {
        state.loading.addressesLoading = LoadingStatusEnum.Failed;
      })

      .addCase(getSellerAvatar.fulfilled, (state, action) => {
        state.sellerAvatar = action.payload.result.thumbnail_url;
      })

      .addCase(updateSellerAvatar.pending, state => {
        state.loading.avatarLoading = LoadingStatusEnum.Loading;
      })
      .addCase(updateSellerAvatar.rejected, state => {
        state.loading.avatarLoading = LoadingStatusEnum.Failed;
      });
  },
});

export const sellerProfileReducer = sellerProfileSlice.reducer;
