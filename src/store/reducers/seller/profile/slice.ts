import { createSlice } from '@reduxjs/toolkit';

import {
  getSellerAddresses,
  getSellerAvatar,
  getSellerNotifications,
  updateSellerNotifications,
} from './thunks';

import { LoadingStatusEnum } from 'common/types';
import {
  ISellerNotifications,
  ISellerAddressData,
} from 'services/seller/seller.serviceTypes';
import { getPersonalInfo } from 'store/reducers/userSlice';

export interface ISellerPersonalInfo {
  firstName: string;
  lastName: string;
  countryShort: string;
  phoneNumber: string;
  avatar: string;
}

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
  personalInfo: ISellerPersonalInfo;
  addresses: ISellerAddressData[] | null;
  notifications: ISellerNotifications | null;
}

const initialState: ISellerProfileSliceInitialState = {
  loading: LoadingStatusEnum.Idle,
  personalInfo: {
    firstName: '',
    lastName: '',
    countryShort: '',
    phoneNumber: '',
    avatar: '',
  },
  addresses: null,
  notifications: null,
};

const sellerProfileSlice = createSlice({
  name: 'seller',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getPersonalInfo.pending, state => {
        state.loading = LoadingStatusEnum.Loading;
      })
      .addCase(getPersonalInfo.fulfilled, (state, action) => {
        state.personalInfo.lastName = action.payload.last_name;
        state.personalInfo.firstName = action.payload.first_name;
        state.personalInfo.countryShort = action.payload.country.country_short;
        state.personalInfo.phoneNumber = action.payload.phone_number;
        state.loading = LoadingStatusEnum.Success;
      })
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
      })
      .addCase(getSellerAvatar.fulfilled, (state, action) => {
        state.personalInfo.avatar = action.payload.result.thumbnail_url;
      });
  },
});

export const sellerProfileReducer = sellerProfileSlice.reducer;
