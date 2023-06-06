import { createSlice } from '@reduxjs/toolkit';

import { CountryType } from '../../../services/common/common.serviceTypes';

import { getCountries } from './index';

interface IInitialState {
  countries: CountryType[];
}

const initialState: IInitialState = {
  countries: [],
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getCountries.fulfilled, (state, action) => {
      state.countries = action.payload;
    });
  },
});

export const commonReducer = commonSlice.reducer;
