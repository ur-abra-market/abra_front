import { createSlice } from '@reduxjs/toolkit';

import { getFavoritesProductsService, uploadUserLogoService } from '.';

interface IUserSliceInitialState {
  logoUrl: null | string;
  favoritesProducts: any[];
}

const initialState: IUserSliceInitialState = {
  logoUrl: null,
  favoritesProducts: [],
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
