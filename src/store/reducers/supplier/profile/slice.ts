import { createSlice } from '@reduxjs/toolkit';

import {
  deleteCompanyImage,
  getCompanyLogo,
  getBusinessInfo,
  getSupplierNotifications,
  updateBusinessInfo,
  updateSupplierNotifications,
  hasPersonalInfo,
  hasBusinessInfo,
  ISupplierProfileSliceInitialState,
  updateCompanyLogo,
  createAccountBusinessInfo,
} from '.';

import { LoadingStatusEnum } from 'common/types';

const initialState: ISupplierProfileSliceInitialState = {
  loading: {
    businessInfoLoading: LoadingStatusEnum.Idle,
    notificationsLoading: LoadingStatusEnum.Idle,
    companyLogoLoading: LoadingStatusEnum.Idle,
  },
  businessInfo: {
    storeName: '',
    businessSector: '',
    isManufacturer: false,
    license: '',
    yearEstablished: null,
    numEmployees: null,
    countryRegistration: null,
    description: '',
    email: '',
    address: '',
    companyLogo: '',
    countryShort: '',
    phoneNumber: '',
    phoneId: null,
    countryCode: '',
    countryId: null,
  },
  notifications: null,
  hasPersonalInfo: null,
  hasCompanyInfo: null,
  initDataLoading: LoadingStatusEnum.Idle,
  data: null,
};

export const supplierProfileSlice = createSlice({
  name: 'supplierAccount',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createAccountBusinessInfo.pending, state => {
        state.loading.businessInfoLoading = LoadingStatusEnum.Loading;
      })
      .addCase(createAccountBusinessInfo.fulfilled, state => {
        state.loading.businessInfoLoading = LoadingStatusEnum.Success;
      })
      .addCase(createAccountBusinessInfo.rejected, state => {
        state.loading.businessInfoLoading = LoadingStatusEnum.Failed;
      })
      .addCase(getBusinessInfo.pending, state => {
        state.loading.businessInfoLoading = LoadingStatusEnum.Loading;
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
        state.businessInfo.businessSector = business_sector;
        state.businessInfo.isManufacturer = is_manufacturer;
        state.businessInfo.license = action.payload.license_number;
        state.businessInfo.yearEstablished = year_established;
        state.businessInfo.numEmployees = number_employees;
        state.businessInfo.countryRegistration = country.id;
        state.businessInfo.description = description;
        state.businessInfo.email = business_email;
        state.businessInfo.address = address;
        state.businessInfo.phoneId = phone?.id;
        state.businessInfo.phoneNumber = phone?.phone_number;
        state.businessInfo.countryShort = phone?.country?.country_short;
        state.businessInfo.countryCode = phone?.country?.country_code;
        state.businessInfo.countryId = phone?.country?.id;
        state.loading.businessInfoLoading = LoadingStatusEnum.Success;
      })
      .addCase(getBusinessInfo.rejected, state => {
        state.loading.businessInfoLoading = LoadingStatusEnum.Failed;
      })

      .addCase(updateBusinessInfo.pending, state => {
        state.loading.businessInfoLoading = LoadingStatusEnum.Loading;
      })
      .addCase(updateBusinessInfo.rejected, state => {
        state.loading.businessInfoLoading = LoadingStatusEnum.Failed;
      })

      .addCase(getSupplierNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload;
        state.loading.notificationsLoading = LoadingStatusEnum.Success;
      })

      .addCase(updateSupplierNotifications.pending, state => {
        state.loading.notificationsLoading = LoadingStatusEnum.Loading;
      })
      .addCase(updateSupplierNotifications.rejected, state => {
        state.loading.notificationsLoading = LoadingStatusEnum.Failed;
      })

      .addCase(getCompanyLogo.pending, state => {
        state.loading.companyLogoLoading = LoadingStatusEnum.Loading;
      })
      .addCase(getCompanyLogo.fulfilled, (state, action) => {
        state.businessInfo.companyLogo = action.payload;
        state.loading.companyLogoLoading = LoadingStatusEnum.Success;
      })
      .addCase(getCompanyLogo.rejected, state => {
        state.loading.companyLogoLoading = LoadingStatusEnum.Failed;
      })
      .addCase(updateCompanyLogo.pending, state => {
        state.loading.companyLogoLoading = LoadingStatusEnum.Loading;
      })
      .addCase(updateCompanyLogo.fulfilled, (state, action) => {
        state.businessInfo.companyLogo = action.payload;
        state.loading.companyLogoLoading = LoadingStatusEnum.Success;
      })
      .addCase(updateCompanyLogo.rejected, state => {
        state.loading.companyLogoLoading = LoadingStatusEnum.Failed;
      })
      .addCase(deleteCompanyImage.pending, state => {
        state.loading.companyLogoLoading = LoadingStatusEnum.Loading;
      })
      .addCase(deleteCompanyImage.fulfilled, state => {
        state.businessInfo.companyLogo = '';
        state.loading.companyLogoLoading = LoadingStatusEnum.Success;
      })
      .addCase(deleteCompanyImage.rejected, state => {
        state.loading.companyLogoLoading = LoadingStatusEnum.Failed;
      })
      .addCase(hasPersonalInfo.fulfilled, (state, action) => {
        state.hasPersonalInfo = action.payload;
      })
      .addCase(hasBusinessInfo.fulfilled, (state, action) => {
        state.hasCompanyInfo = action.payload;
      });
  },
});

export const supplierProfileReducer = supplierProfileSlice.reducer;
