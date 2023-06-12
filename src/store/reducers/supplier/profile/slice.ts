import { createSlice } from '@reduxjs/toolkit';

import { LoadingStatus } from '../../../../common/types';
import { ISupplierNotifications } from '../../../../services/supplier/supplier.serviceTypes';
import { getPersonalInfo } from '../../userSlice';

import { getSupplierNotifications, updateSupplierNotifications } from './thunks';

export interface ISupplierPersonalInfo {
  firstName: string;
  lastName: string;
  phoneCountryCode: string;
  phoneNumberBody: string;
}

interface ISupplierProfileSliceInitialState {
  loading: LoadingStatus;
  personalInfo: ISupplierPersonalInfo;
  notifications: ISupplierNotifications | null;
}

const initialState: ISupplierProfileSliceInitialState = {
  loading: LoadingStatus.Idle,
  personalInfo: {
    firstName: '',
    lastName: '',
    phoneCountryCode: '',
    phoneNumberBody: '',
  },
  notifications: null,
};

export const supplierProfileSlice = createSlice({
  name: 'supplierAccount',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getPersonalInfo.pending, state => {
        state.loading = LoadingStatus.Loading;
      })
      .addCase(getPersonalInfo.fulfilled, (state, action) => {
        state.personalInfo.lastName = action.payload.last_name;
        state.personalInfo.firstName = action.payload.first_name;
        state.personalInfo.phoneCountryCode = action.payload.phone_country_code;
        state.personalInfo.phoneNumberBody = action.payload.phone_number;
        state.loading = LoadingStatus.Success;
      });
    builder
      .addCase(getSupplierNotifications.pending, state => {
        state.loading = LoadingStatus.Loading;
      })
      .addCase(getSupplierNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload;
        state.loading = LoadingStatus.Success;
      })
      .addCase(getSupplierNotifications.rejected, state => {
        state.loading = LoadingStatus.Failed;
      })
      .addCase(updateSupplierNotifications.pending, state => {
        state.loading = LoadingStatus.Loading;
      })
      .addCase(updateSupplierNotifications.rejected, (state, action) => {
        state.loading = LoadingStatus.Failed;
      });
  },
});

export const supplierProfileReducer = supplierProfileSlice.reducer;
