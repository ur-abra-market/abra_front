import { createSlice } from '@reduxjs/toolkit';

import { getFavoritesProductsService, uploadUserLogoService } from '.';

export interface IPersonalInfo {
  firstName: string;
  lastName: string;
  phoneCountryCode: string;
  phoneNumberBody: string;
} // проверить с респонс персонал инфо на дубль

interface IUserSliceInitialState {
  logoUrl: null | string;
  favoritesProducts: any[];
  personalInfo: IPersonalInfo;
}

const initialState: IUserSliceInitialState = {
  logoUrl: null,
  favoritesProducts: [],
  personalInfo: {
    firstName: '',
    lastName: '',
    phoneCountryCode: '',
    phoneNumberBody: '',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(uploadUserLogoService.pending, state => {
        state.logoUrl = null;
      })
      .addCase(uploadUserLogoService.fulfilled, (state, action) => {
        state.logoUrl = action.payload;
      })
      .addCase(uploadUserLogoService.rejected, state => {
        state.logoUrl = null;
      })

      .addCase(getFavoritesProductsService.fulfilled, (state, action) => {
        state.favoritesProducts = action.payload;
      });
  },
});

export const userReducer = userSlice.reducer;
