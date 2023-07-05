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
        state.loading = {
          ...state.loading,
          notificationsLoading: LoadingStatusEnum.Loading,
        };
      })
      .addCase(getSellerNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload;
        state.loading = {
          ...state.loading,
          notificationsLoading: LoadingStatusEnum.Success,
        };
      })
      .addCase(getSellerNotifications.rejected, state => {
        state.loading = {
          ...state.loading,
          notificationsLoading: LoadingStatusEnum.Failed,
        };
      })

      .addCase(updateSellerNotifications.pending, state => {
        state.loading = {
          ...state.loading,
          notificationsLoading: LoadingStatusEnum.Loading,
        };
      })
      .addCase(updateSellerNotifications.rejected, state => {
        state.loading = {
          ...state.loading,
          notificationsLoading: LoadingStatusEnum.Failed,
        };
      })

      .addCase(getSellerAddresses.pending, state => {
        state.loading = {
          ...state.loading,
          addressesLoading: LoadingStatusEnum.Loading,
        };
      })
      .addCase(getSellerAddresses.fulfilled, (state, action) => {
        state.addresses = action.payload;
        state.loading = {
          ...state.loading,
          addressesLoading: LoadingStatusEnum.Success,
        };
      })
      .addCase(getSellerAddresses.rejected, state => {
        state.loading = {
          ...state.loading,
          addressesLoading: LoadingStatusEnum.Failed,
        };
      })

      .addCase(getSellerAvatar.pending, state => {
        state.loading = {
          ...state.loading,
          avatarLoading: LoadingStatusEnum.Loading,
        };
      })
      .addCase(getSellerAvatar.fulfilled, (state, action) => {
        state.sellerAvatar = action.payload.result.thumbnail_url;
        state.loading = {
          ...state.loading,
          avatarLoading: LoadingStatusEnum.Success,
        };
      })
      .addCase(getSellerAvatar.rejected, state => {
        state.loading = {
          ...state.loading,
          avatarLoading: LoadingStatusEnum.Failed,
        };
      });
  },
});

export const sellerProfileReducer = sellerProfileSlice.reducer;
