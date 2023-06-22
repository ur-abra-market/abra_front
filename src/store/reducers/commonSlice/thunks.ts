import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { IAsyncThunkConfig } from '../../../common/types';
import { commonService } from '../../../services/common/common.service';

import { ICountry, INumberEmployees } from 'services/common/common.serviceTypes';

export const getCountries = createAsyncThunk<ICountry[], void, any>(
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

export const getCompanyNumberEmployees = createAsyncThunk<
  INumberEmployees[],
  void,
  IAsyncThunkConfig
>('common/getCompanyNumberEmployees', async (_, { rejectWithValue }) => {
  try {
    return await commonService.fetchCompanyNumberEmployees();
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.message);
    }

    return rejectWithValue('[getCompanyNumberEmployees]: ERROR');
  }
});
