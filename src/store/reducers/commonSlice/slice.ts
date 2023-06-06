import { createSlice } from '@reduxjs/toolkit';

import { CountryType } from '../../../services/common/common.serviceTypes';

import { getCompanyNumberEmployees, getCountries } from './index';

export interface INumberEmployees {
  id: number;
  number: string;
}

interface IInitialState {
  countries: CountryType[];
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
      .addCase(getCompanyNumberEmployees.fulfilled, (state, action) => {
        state.numberEmployees = action.payload;
      });
  },
});

export const commonReducer = commonSlice.reducer;
