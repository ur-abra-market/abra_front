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

export const addFavoriteProduct = createAsyncThunk<any, IProductRequest>(
  'favorite/addFavoriteProduct',
  async (payload, { rejectWithValue }) => {
    try {
      return productService.addFavorite(payload);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data);
      }

      return rejectWithValue('[Error]: addFavoriteProduct');
    }
  },
);

export const removeFavoriteProduct = createAsyncThunk<any, IProductRequest>(
  'favorite/removeFavoriteProduct',
  async (payload, { rejectWithValue }) => {
    try {
      return productService.removeFavorite(payload);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data);
      }

      return rejectWithValue('[Error]: removeFavoriteProduct');
    }
  },
);
