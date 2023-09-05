import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { IProductCard } from './types';

import { productService } from 'services/product/product.service';
import {
  ICategoryRequest,
  IPopularProductRequest,
  IProductCompilation,
  IProductRequest,
} from 'services/product/product.serviceTypes';

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

export const getSimilarProducts = createAsyncThunk<
  IProductCompilation[],
  IPopularProductRequest
>('similarProducts/getSimilarProducts', async (payload, { rejectWithValue }) => {
  try {
    const { result } = await productService.getSimilarProducts(payload);

    return result;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.response?.data);
    }

    return rejectWithValue('[Error]: getSimilarProducts');
  }
});

export const getPopularProducts = createAsyncThunk<[], IPopularProductRequest>(
  'popularProducts/getPopularProducts',
  async (payload, { rejectWithValue }) => {
    try {
      const { result } = await productService.getPopularProduct(payload);

      return result;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data);
      }

      return rejectWithValue('[Error]: getPopularProductsById');
    }
  },
);

export const getProductsCompilation = createAsyncThunk<any, ICategoryRequest>(
  'product/getProductsCompilation',
  async (productData, { rejectWithValue }) => {
    try {
      const response = await productService.getList(productData);

      return {
        data: response,
        category: productData.category_id,
      };
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('[getProductsCompilation]: ERROR');
    }
  },
);

export const getProductsListCompilation = createAsyncThunk<any, ICategoryRequest>(
  'product/getProductsListCompilation',
  async (productData, { rejectWithValue }) => {
    try {
      const response = await productService.getList(productData);

      return {
        data: response,
      };
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('[getProductsCompilation]: ERROR');
    }
  },
);
