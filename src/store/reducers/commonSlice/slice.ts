import { createSlice } from '@reduxjs/toolkit';

import { ICountry } from '../../../services/common/common.serviceTypes';
import { ResponseCategoryType } from '../categorySlice';

import { categoryService } from './thunks';

import { getCompanyNumberEmployees, getCountries } from './index';

export interface INumberEmployees {
  id: number;
  number: string;
}

interface IInitialState {
  categories: null | ResponseCategoryType[];
  countries: ICountry[];
  numberEmployees: INumberEmployees[];
}

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
      .addCase(categoryService.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(categoryService.rejected, (state, action) => {
        console.log(action.payload);
      });
  },
});

export const commonReducer = commonSlice.reducer;
