import { createSlice } from '@reduxjs/toolkit';

import {
  getAllCategories,
  getCompanyNumberEmployees,
  getCountries,
  IInitialState,
} from '.';

const initialState: IInitialState = {
  categories: [],
  countries: [],
  numberEmployees: [],
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getCountries.fulfilled, (state, action) => {
        state.countries = action.payload;
      })
      .addCase(getCountries.rejected, (state, action) => {})
      .addCase(getCompanyNumberEmployees.fulfilled, (state, action) => {
        state.numberEmployees = action.payload;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(getAllCategories.rejected, (state, action) => {});
  },
});

export const commonReducer = commonSlice.reducer;
