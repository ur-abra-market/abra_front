import { createSlice } from '@reduxjs/toolkit';

import {
  getSellerAddresses,
  getSellerAvatar,
  getSellerNotifications,
  updateSellerAvatar,
  updateSellerNotifications,
  ISellerProfileSliceInitialState,
} from '.';

import { LoadingStatusEnum } from 'common/types';

const initialState: ISellerProfileSliceInitialState = {
  loading: {
    avatarLoading: LoadingStatusEnum.Idle,
    notificationsLoading: LoadingStatusEnum.Idle,
    addressesLoading: LoadingStatusEnum.Idle,
  },
  addresses: null,
  notifications: null,
  avatar: '',
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
        state.avatar = action.payload.result.thumbnail_url;
      })

      .addCase(updateSellerAvatar.pending, state => {
        state.loading.avatarLoading = LoadingStatusEnum.Loading;
      })
      .addCase(updateSellerAvatar.fulfilled, (state, action) => {
        state.avatar = action.payload;
        state.loading.avatarLoading = LoadingStatusEnum.Success;
      })
      .addCase(updateSellerAvatar.rejected, state => {
        state.loading.avatarLoading = LoadingStatusEnum.Failed;
      });
  },
});

export const sellerProfileReducer = sellerProfileSlice.reducer;
