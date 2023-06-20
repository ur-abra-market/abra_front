import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { AsyncThunkConfig } from '../../../common/types';
import { commonService } from '../../../services/common/common.service';
import { ResponseCategoryType } from '../categorySlice';

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

export const categoryService = createAsyncThunk<ResponseCategoryType[], void>(
  'category/categoryService',
  async function (_, { rejectWithValue }) {
    try {
      const data = await commonService.getAllCategories();

      return data.result;
    } catch (error: unknown) {
      // @ts-ignore
      const err = error.response.data.result ? error.response.data.result : error.message;

      return rejectWithValue(err);
    }
  },
);
