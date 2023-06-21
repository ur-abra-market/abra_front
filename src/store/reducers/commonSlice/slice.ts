import { createSlice } from '@reduxjs/toolkit';

import { IResponseCategory } from '../../../services/common/common.service';
import { ICountry } from '../../../services/common/common.serviceTypes';

import { getAllCategories } from './thunks';

import { getCompanyNumberEmployees, getCountries } from './index';

export interface INumberEmployees {
  id: number;
  number: string;
}

interface IInitialState {
  categories: null | IResponseCategory[];
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
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        console.log(action.payload);
      });
  },
});

export const commonReducer = commonSlice.reducer;
