import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { IProductCard } from './interfaces';

import { productService } from 'services/product/product.service';
import { IProductRequest } from 'services/product/product.serviceTypes';

export const getProductById = createAsyncThunk<IProductCard, IProductRequest>(
  'targetProduct/getProductById',
  async (payload, { rejectWithValue }) => {
    try {
      return productService.getProductById(payload);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data);
      }

      return rejectWithValue('[Error]: getProductById');
    }
  },
);
