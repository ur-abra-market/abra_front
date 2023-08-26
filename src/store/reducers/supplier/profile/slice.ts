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

  hasPersonalInfo: null,
  hasPersonalInfoError: false,

  hasCompanyInfo: null,
  hasCompanyInfoError: false,

  businessInfo: {
    companyLogo: '',
    storeName: '',
    businessSector: '',
    isManufacturer: false,
    license: '',
    yearEstablished: null,
    numberEmployees: null,
    countryRegistration: null,
    description: '',
    businessPhoneNumberBody: '',
    businessPhoneNumberCountryId: null,
    businessEmail: '',
    companyAddress: '',
  },

  notifications: null,
<<<<<<< Updated upstream
  hasPersonalInfo: null,
  hasCompanyInfo: null,
  initDataLoading: LoadingStatusEnum.Idle,
  data: null,
=======
>>>>>>> Stashed changes
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
        const { company } = action.payload;

        state.businessInfo.storeName = company.name;
        state.businessInfo.businessSector = company.business_sector;
        state.businessInfo.isManufacturer = company.is_manufacturer;
        state.businessInfo.license = action.payload.license_number;
        state.businessInfo.yearEstablished = company.year_established;
        state.businessInfo.numberEmployees = company.number_employees;
        state.businessInfo.countryRegistration = company.country.id;
        state.businessInfo.description = company.description;
        state.businessInfo.businessEmail = company.business_email;
        state.businessInfo.companyAddress = company.address;
        if (company.phone.id && company.phone.phone_number) {
          state.businessInfo.businessPhoneNumberCountryId = company.phone.country.id;
          state.businessInfo.businessPhoneNumberBody = company.phone.phone_number;
        }

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
<<<<<<< Updated upstream
      .addCase(hasPersonalInfo.fulfilled, (state, action) => {
        state.hasPersonalInfo = action.payload;
      })
=======

      .addCase(hasPersonalInfo.pending, state => {
        state.hasPersonalInfoError = false;
      })
      .addCase(hasPersonalInfo.fulfilled, (state, action) => {
        state.hasPersonalInfo = action.payload;
      })
      .addCase(hasPersonalInfo.rejected, state => {
        state.hasPersonalInfoError = true;
      })

      .addCase(hasBusinessInfo.pending, state => {
        state.hasCompanyInfoError = false;
      })
>>>>>>> Stashed changes
      .addCase(hasBusinessInfo.fulfilled, (state, action) => {
        state.hasCompanyInfo = action.payload;
      });
  },
});

export const supplierProfileReducer = supplierProfileSlice.reducer;
