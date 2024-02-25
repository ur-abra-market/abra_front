import { createSlice } from '@reduxjs/toolkit';

import {
  getAllCategories,
  getCompanyNumberEmployees,
  getCountries,
  IInitialState,
} from '.';

import { LoadingStatusEnum } from 'common/types';

const initialState: IInitialState = {
  loading: {
    categoriesLoading: LoadingStatusEnum.Idle,
  },
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

      .addCase(getAllCategories.pending, state => {
        state.loading.categoriesLoading = LoadingStatusEnum.Loading;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading.categoriesLoading = LoadingStatusEnum.Success;
      })
      .addCase(getAllCategories.rejected, state => {
        state.loading.categoriesLoading = LoadingStatusEnum.Failed;
      });
  },
});

export const commonReducer = commonSlice.reducer;
