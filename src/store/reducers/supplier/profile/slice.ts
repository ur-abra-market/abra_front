import { createSlice } from '@reduxjs/toolkit';

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
  loading: boolean;
  personalInfo: {
    firstName: string;
    lastName: string;
    phoneCountryCode: string;
    phoneNumberBody: string;
  };
  notifications: ISupplierNotifications | null;
}

const initialState: ISupplierProfileSliceInitialState = {
  loading: false,
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
        // state.loading = true;
      })
      .addCase(getPersonalInfo.fulfilled, (state, action) => {
        state.personalInfo.lastName = action.payload.last_name;
        state.personalInfo.firstName = action.payload.first_name;
        state.personalInfo.phoneCountryCode = action.payload.phone_country_code;
        state.personalInfo.phoneNumberBody = action.payload.phone_number;
        state.loading = false;
      });
    builder
      .addCase(getSupplierNotifications.pending, state => {
        state.loading = true;
      })
      .addCase(getSupplierNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload;
        state.loading = false;
      })
      .addCase(updateSupplierNotifications.pending, state => {
        state.loading = true;
      })
      .addCase(updateSupplierNotifications.fulfilled, (state, action) => {
        state.loading = false;
      });
  },
});

export const supplierProfileReducer = supplierProfileSlice.reducer;
