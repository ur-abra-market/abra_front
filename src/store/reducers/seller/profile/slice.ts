import { createSlice } from '@reduxjs/toolkit';

import {
  getSellerAddresses,
  getSellerAvatar,
  getSellerNotifications,
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
  country: string;
  firstName: string;
  isMain: boolean;
  lastName: string;
  phoneNumber: string;
  postalCode: string;
  street: string;
}

export interface ISellerProfileLoading {
  sellerAvatarLoading: LoadingStatusEnum;
  sellerNotificationsLoading: LoadingStatusEnum;
  sellerAddressesLoading: LoadingStatusEnum;
}

interface ISellerProfileSliceInitialState {
  loading: ISellerProfileLoading;
  addresses: ISellerAddressData[] | null;
  notifications: ISellerNotifications | null;
  sellerAvatar: string;
}

const initialState: ISellerProfileSliceInitialState = {
  loading: {
    sellerAvatarLoading: LoadingStatusEnum.Idle,
    sellerNotificationsLoading: LoadingStatusEnum.Idle,
    sellerAddressesLoading: LoadingStatusEnum.Idle,
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
        state.loading = {
          ...state.loading,
          sellerNotificationsLoading: LoadingStatusEnum.Loading,
        };
      })
      .addCase(getSellerNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload;
        state.loading = {
          ...state.loading,
          sellerNotificationsLoading: LoadingStatusEnum.Success,
        };
      })
      .addCase(getSellerNotifications.rejected, state => {
        state.loading = {
          ...state.loading,
          sellerNotificationsLoading: LoadingStatusEnum.Failed,
        };
      })

      .addCase(updateSellerNotifications.pending, state => {
        state.loading = {
          ...state.loading,
          sellerNotificationsLoading: LoadingStatusEnum.Loading,
        };
      })
      .addCase(updateSellerNotifications.rejected, state => {
        state.loading = {
          ...state.loading,
          sellerNotificationsLoading: LoadingStatusEnum.Failed,
        };
      })

      .addCase(getSellerAddresses.pending, state => {
        state.loading = {
          ...state.loading,
          sellerAddressesLoading: LoadingStatusEnum.Loading,
        };
      })
      .addCase(getSellerAddresses.fulfilled, (state, action) => {
        state.addresses = action.payload;
        state.loading = {
          ...state.loading,
          sellerAddressesLoading: LoadingStatusEnum.Success,
        };
      })
      .addCase(getSellerAddresses.rejected, state => {
        state.loading = {
          ...state.loading,
          sellerAddressesLoading: LoadingStatusEnum.Failed,
        };
      })

      .addCase(getSellerAvatar.pending, state => {
        state.loading = {
          ...state.loading,
          sellerAvatarLoading: LoadingStatusEnum.Loading,
        };
      })
      .addCase(getSellerAvatar.fulfilled, (state, action) => {
        state.sellerAvatar = action.payload.result.thumbnail_url;
        state.loading = {
          ...state.loading,
          sellerAvatarLoading: LoadingStatusEnum.Success,
        };
      })
      .addCase(getSellerAvatar.rejected, state => {
        state.loading = {
          ...state.loading,
          sellerAvatarLoading: LoadingStatusEnum.Failed,
        };
      });
  },
});

export const sellerProfileReducer = sellerProfileSlice.reducer;
