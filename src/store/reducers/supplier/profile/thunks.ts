import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { supplierService } from '../../../../services';

export const getCompanyInfo = createAsyncThunk<any, void>( // todo fix any
  'supplierProfile/getCompanyInfo',
  async (_, { rejectWithValue }) => {
    try {
      return await supplierService.fetchCompanyInfo();
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.error || error.message
          : '[getCompanyInfo]: Error';

      return rejectWithValue(errorMessage);
    }
  },
);
