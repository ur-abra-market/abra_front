import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { IAsyncThunkConfig } from 'common/types';
import { commonService } from 'services/common/common.service';
import {
  ICategoryResponse,
  ICountry,
  INumberEmployees,
} from 'services/common/common.serviceTypes';

export const getCountries = createAsyncThunk<ICountry[], void, IAsyncThunkConfig>(
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

export const getAllCategories = createAsyncThunk<
  ICategoryResponse[],
  void,
  IAsyncThunkConfig
>('category/getAllCategories', async (_, { rejectWithValue }) => {
  try {
    return await commonService.fetchAllCategories();
  } catch (error) {
    const errorMessage =
      error instanceof AxiosError
        ? error.response?.data?.error || error.message
        : '[getAllCategories]: Error';

    return rejectWithValue(errorMessage);
  }
});
