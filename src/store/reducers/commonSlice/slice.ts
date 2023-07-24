import { createSlice } from '@reduxjs/toolkit';

import {
  getAllCategories,
  getCompanyNumberEmployees,
  getCountries,
  IInitialState,
} from '.';

import { getData } from 'store/reducers/supplier/profile/thunks';

const initialState: IInitialState = {
  categories: null,
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
      .addCase(getCountries.rejected, (state, action) => {
        console.log(action.payload);
      })
      .addCase(getCompanyNumberEmployees.fulfilled, (state, action) => {
        state.numberEmployees = action.payload;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        console.log(action.payload);
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.numberEmployees = action.payload.companyNumberEmployees;
      });
  },
});

export const commonReducer = commonSlice.reducer;
