import { createSlice } from '@reduxjs/toolkit';

import {
  IUserSliceInitialState,
  getFavoritesProductsService,
  getPersonalInfo,
  updatePersonalInfo,
} from '.';

import { LoadingStatusEnum } from 'common/types';
import { logout } from 'store/reducers/authSlice';

const initialState: IUserSliceInitialState = {
  loading: LoadingStatusEnum.Idle,
  personalInfo: {
    firstName: '',
    lastName: '',
    phoneNumberBody: '',
    phoneNumberCountryId: null,
  },
  favoritesProducts: [],
};

const userSlice = createSlice({
  name: 'user',
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
        state.personalInfo.phoneNumberCountryId = action.payload.country.id;
        state.personalInfo.phoneNumberBody = action.payload.phone_number;

        state.loading = LoadingStatusEnum.Success;
      })
      .addCase(getPersonalInfo.rejected, state => {
        state.loading = LoadingStatusEnum.Failed;
      })

      .addCase(updatePersonalInfo.pending, state => {
        state.loading = LoadingStatusEnum.Loading;
      })
      .addCase(updatePersonalInfo.rejected, state => {
        state.loading = LoadingStatusEnum.Failed;
      })

      .addCase(getFavoritesProductsService.fulfilled, (state, action) => {
        state.favoritesProducts = action.payload;
      })

      .addCase(logout.fulfilled, state => {
        state.personalInfo = {
          firstName: '',
          lastName: '',
          phoneNumberBody: '',
          phoneNumberCountryId: null,
        };
      });
  },
});

export const userReducer = userSlice.reducer;
