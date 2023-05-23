import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { AsyncThunkConfig } from '../../services/auth/auth.serviceTypes';
import { CountryType } from '../../services/common/common.serviceTypes';

import commonService from 'services/common/common.service';

export const getCountries = createAsyncThunk<CountryType[], void, AsyncThunkConfig>(
  'common/getCountries',
  async (_, { rejectWithValue }) => {
    try {
      const response = await commonService.getCountry();

      return response.data.result;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('[getCountry]: ERROR');
    }
  },
);

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

export default commonSlice.reducer;
