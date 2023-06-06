import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import commonService from '../../../services/common/common.service';
import { CountryType } from '../../../services/common/common.serviceTypes';

export const getCountries = createAsyncThunk<CountryType[], void, any>(
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
