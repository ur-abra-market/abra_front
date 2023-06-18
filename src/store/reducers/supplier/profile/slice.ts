import { createSlice } from '@reduxjs/toolkit';

import { LoadingStatus } from '../../../../common/types';
import { ISupplierNotifications } from '../../../../services/supplier/supplier.serviceTypes';
import { getPersonalInfo } from '../../userSlice';

import {
  deleteCompanyImage,
  fetchCompanyImage,
  uploadCompanyImage,
  getSupplierNotifications,
  updateSupplierNotifications,
} from './thunks';

export interface ISupplierPersonalInfo {
  firstName: string;
  lastName: string;
  countryShort: string;
  phoneNumber: string;
}

export interface ISupplierBusinessInfo {
  companyLogo: string;
  companyLogoId: number;
}

interface ISupplierProfileSliceInitialState {
  loading: LoadingStatus;
  personalInfo: ISupplierPersonalInfo;
  businessInfo: ISupplierBusinessInfo;
  notifications: ISupplierNotifications | null;
}

const initialState: ISupplierProfileSliceInitialState = {
  loading: LoadingStatus.Idle,
  personalInfo: {
    firstName: '',
    lastName: '',
    countryShort: '',
    phoneNumber: '',
  },
  businessInfo: {
    companyLogo: '',
    companyLogoId: 0,
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
        state.personalInfo.countryShort = action.payload.country.country_short;
        state.personalInfo.phoneNumber = action.payload.phone_number;
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
      })
      .addCase(fetchCompanyImage.fulfilled, (state, action) => {
        state.businessInfo.companyLogo = action.payload;
      })
      .addCase(uploadCompanyImage.fulfilled, (state, action) => {
        state.businessInfo.companyLogo = action.payload.result.image;
        state.businessInfo.companyLogoId = action.payload.result.id;
      })
      .addCase(deleteCompanyImage.fulfilled, state => {
        state.businessInfo.companyLogo = '';
      });
  },
});

export const supplierProfileReducer = supplierProfileSlice.reducer;
