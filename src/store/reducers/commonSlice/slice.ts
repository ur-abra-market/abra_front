import { createSlice } from '@reduxjs/toolkit';

import { ICountry } from '../../../services/common/common.serviceTypes';

import { getCompanyNumberEmployees, getCountries } from './index';

export interface INumberEmployees {
  id: number;
  number: string;
}

interface IInitialState {
  countries: ICountry[];
  numberEmployees: INumberEmployees[];
}

const initialState: IInitialState = {
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
      });
  },
});

export const commonReducer = commonSlice.reducer;
