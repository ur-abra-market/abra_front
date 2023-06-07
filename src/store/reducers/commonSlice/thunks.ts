import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { commonService } from '../../../services/common/common.service';

import { CountriesType, NumberEmployeesType } from 'services/common/common.serviceTypes';

export const getCountries = createAsyncThunk<CountriesType, void, any>(
  'common/getCountries',
  async (_, { rejectWithValue }) => {
    try {
      return await commonService.getCountry();
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('[getCountries]: ERROR');
    }
  },
);

export const getCompanyNumberEmployees = createAsyncThunk<NumberEmployeesType, void, any>(
  'common/getCompanyNumberEmployees',
  async (_, { rejectWithValue }) => {
    try {
      return await commonService.fetchCompanyNumberEmployees();
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('[getCompanyNumberEmployees]: ERROR');
    }
  },
);
