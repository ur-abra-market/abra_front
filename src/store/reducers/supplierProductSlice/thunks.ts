import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { IProductsListRequest, IProductsSortRequest } from './types';

import { productService } from 'services/product/product.service';

export const activateProducts = createAsyncThunk<boolean, number[]>(
  'product/activateProducts',
  async (productsId: number[], { rejectWithValue }) => {
    try {
      return await productService.restoreList(productsId);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('[deleteProducts]: ERROR');
    }
  },
);
export const deActivateProducts = createAsyncThunk<boolean, number[]>(
  'product/deleteProducts',
  async (productsId: number[], { rejectWithValue }) => {
    try {
      return await productService.deleteList(productsId);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('[deleteProducts]: ERROR');
    }
  },
);

export const manageProducts = createAsyncThunk<
  IProductsListRequest[],
  IProductsSortRequest
>(
  'product/manageProducts',

  async (params: IProductsSortRequest, { rejectWithValue }) => {
    try {
      return await productService.getListManageProducts(params);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('[manageProductsService]: ERROR');
    }
  },
);
