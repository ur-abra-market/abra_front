import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  getBusinessInfo,
  deleteCompanyLogo,
  fetchCompanyLogo,
  uploadCompanyLogo,
  getSupplierNotifications,
  updateSupplierNotifications,
  updateBusinessInfo,
} from './thunks';

import { LoadingStatusEnum } from 'common/types';
import { ISupplierNotifications } from 'services/supplier/supplier.serviceTypes';
import { getPersonalInfo, updatePersonalInfo } from 'store/reducers/userSlice';

export interface ISupplierPersonalInfo {
  firstName: string;
  lastName: string;
  countryShort: string;
  phoneNumber: string;
}

interface IBusinessSector {
  value: string;
}

export interface ISupplierBusinessInfo {
  storeName: string;
  businessSector: IBusinessSector;
  isManufacturer: boolean;
  license: string;
  yearEstablished: number | null;
  numEmployees: number | null;
  countryRegistration: number | null;
  description: string;
  email: string;
  phoneNumber: string;
  phoneId: number | null;
  countryShort: string;
  countryCode: string;
  address: string;
  companyLogo: string;
  companyLogoId: number | null;
  countryId: number | null;
}

interface ISupplierProfileSliceInitialState {
  loading: LoadingStatusEnum;
  isProgressLoading: LoadingStatusEnum;
  personalInfo: ISupplierPersonalInfo;
  businessInfo: ISupplierBusinessInfo;
  notifications: ISupplierNotifications | null;
}

const initialState: ISupplierProfileSliceInitialState = {
  loading: LoadingStatusEnum.Idle,
  isProgressLoading: LoadingStatusEnum.Idle,
  personalInfo: {
    firstName: '',
    lastName: '',
    countryShort: '',
    phoneNumber: '',
  },
  businessInfo: {
    storeName: '',
    businessSector: { value: '' },
    isManufacturer: false,
    license: '',
    yearEstablished: null,
    numEmployees: null,
    countryRegistration: null,
    description: '',
    email: '',
    address: '',
    companyLogo: '',
    companyLogoId: null,
    countryShort: '',
    phoneNumber: '',
    phoneId: null,
    countryCode: '',
    countryId: null,
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
        state.loading = LoadingStatusEnum.Loading;
        state.isProgressLoading = LoadingStatusEnum.Loading;
      })
      .addCase(getPersonalInfo.fulfilled, (state, action) => {
        state.personalInfo.lastName = action.payload.last_name;
        state.personalInfo.firstName = action.payload.first_name;
        state.personalInfo.countryShort = action.payload.country.country_short;
        state.personalInfo.phoneNumber = action.payload.phone_number;
        state.loading = LoadingStatusEnum.Success;
        state.isProgressLoading = LoadingStatusEnum.Success;
      })
      .addCase(getPersonalInfo.rejected, state => {
        state.loading = LoadingStatusEnum.Failed;
        state.isProgressLoading = LoadingStatusEnum.Failed;
      })
      .addCase(updatePersonalInfo.pending, state => {
        state.loading = LoadingStatusEnum.Loading;
        state.isProgressLoading = LoadingStatusEnum.Loading;
      })
      .addCase(updatePersonalInfo.fulfilled, state => {
        state.isProgressLoading = LoadingStatusEnum.Success;
      })
      .addCase(updatePersonalInfo.rejected, state => {
        state.loading = LoadingStatusEnum.Failed;
        state.isProgressLoading = LoadingStatusEnum.Failed;
      })
      .addCase(getBusinessInfo.pending, state => {
        state.loading = LoadingStatusEnum.Loading;
        state.isProgressLoading = LoadingStatusEnum.Loading;
      })
      .addCase(getBusinessInfo.fulfilled, (state, action) => {
        const {
          name,
          country,
          description,
          address,
          year_established,
          is_manufacturer,
          business_sector,
          business_email,
          number_employees,
          phone,
        } = action.payload.company;

        state.businessInfo.storeName = name;
        state.businessInfo.businessSector.value = business_sector;
        state.businessInfo.isManufacturer = is_manufacturer;
        state.businessInfo.license = action.payload.license_number;
        state.businessInfo.yearEstablished = year_established;
        state.businessInfo.numEmployees = number_employees;
        state.businessInfo.countryRegistration = country.id;
        state.businessInfo.description = description;
        state.businessInfo.email = business_email;
        state.businessInfo.address = address;
        state.businessInfo.phoneId = phone.id;
        state.businessInfo.phoneNumber = phone.phone_number;
        state.businessInfo.countryShort = phone.country.country_short;
        state.businessInfo.countryCode = phone.country.country_code;
        state.businessInfo.countryId = phone.country.id;
        state.loading = LoadingStatusEnum.Success;
        state.isProgressLoading = LoadingStatusEnum.Success;
      })
      .addCase(getBusinessInfo.rejected, state => {
        state.loading = LoadingStatusEnum.Failed;
        state.isProgressLoading = LoadingStatusEnum.Failed;
      })
      .addCase(updateBusinessInfo.pending, state => {
        state.loading = LoadingStatusEnum.Loading;
        state.isProgressLoading = LoadingStatusEnum.Loading;
      })
      .addCase(updateBusinessInfo.fulfilled, state => {
        state.isProgressLoading = LoadingStatusEnum.Success;
      })
      .addCase(updateBusinessInfo.rejected, state => {
        state.loading = LoadingStatusEnum.Failed;
        state.isProgressLoading = LoadingStatusEnum.Failed;
      })
      .addCase(getSupplierNotifications.pending, state => {
        state.loading = LoadingStatusEnum.Loading;
      })
      .addCase(getSupplierNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload;
        state.loading = LoadingStatusEnum.Success;
      })
      .addCase(getSupplierNotifications.rejected, state => {
        state.loading = LoadingStatusEnum.Failed;
      })
      .addCase(updateSupplierNotifications.pending, state => {
        state.loading = LoadingStatusEnum.Loading;
      })
      .addCase(updateSupplierNotifications.rejected, state => {
        state.loading = LoadingStatusEnum.Failed;
      })
      .addCase(fetchCompanyLogo.pending, state => {
        state.isProgressLoading = LoadingStatusEnum.Loading;
      })
      .addCase(fetchCompanyLogo.fulfilled, (state, action) => {
        state.businessInfo.companyLogo = action.payload;
        state.isProgressLoading = LoadingStatusEnum.Success;
      })
      .addCase(fetchCompanyLogo.rejected, state => {
        state.isProgressLoading = LoadingStatusEnum.Failed;
      })
      .addCase(uploadCompanyLogo.pending, state => {
        state.isProgressLoading = LoadingStatusEnum.Loading;
      })
      .addCase(uploadCompanyLogo.fulfilled, (state, action) => {
        state.businessInfo.companyLogo = action.payload.result.image;
        state.businessInfo.companyLogoId = action.payload.result.id;
        state.isProgressLoading = LoadingStatusEnum.Success;
      })
      .addCase(uploadCompanyLogo.rejected, state => {
        state.isProgressLoading = LoadingStatusEnum.Failed;
      })
      .addCase(deleteCompanyLogo.pending, state => {
        state.isProgressLoading = LoadingStatusEnum.Loading;
      })
      .addCase(deleteCompanyLogo.fulfilled, state => {
        state.businessInfo.companyLogo = '';
        state.isProgressLoading = LoadingStatusEnum.Success;
      })
      .addCase(deleteCompanyLogo.rejected, state => {
        state.isProgressLoading = LoadingStatusEnum.Failed;
      });
  },
});

export const supplierProfileReducer = supplierProfileSlice.reducer;
