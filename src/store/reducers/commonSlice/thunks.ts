import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { AsyncThunkConfig } from '../../../common/types';
import {
  commonService,
  IResponseCategory,
} from '../../../services/common/common.service';

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

export const getCompanyNumberEmployees = createAsyncThunk<
  NumberEmployeesType,
  void,
  AsyncThunkConfig
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

export const getAllCategories = createAsyncThunk<IResponseCategory[], void>(
  'category/categoryService',
  async function (_, { rejectWithValue }) {
    try {
      const data = await commonService.fetchAllCategories();

      return data.result;
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.error || error.message
          : '[getAllCategories]: Error';

      return rejectWithValue(errorMessage);
    }
  },
);
