import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import {
  IProductPaginationParams,
  IProductsListRequest,
  IProductSortParams,
  IProductsSortRequest,
} from './types';

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
  IProductsListRequest,
  IProductsSortRequest
>(
  'product/manageProducts',

  async (
    {
      category_ids,
      sort,
      on_sale,
      ascending,
      is_active,
      limit,
      offset,
    }: IProductsSortRequest,
    { rejectWithValue },
  ) => {
    const params: IProductPaginationParams = { offset, limit };
    const body: IProductSortParams = {
      sort,
      category_ids,
      ascending,
      is_active,
      on_sale,
    };

    try {
      return await productService.getListManageProducts(body, params);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('[manageProductsService]: ERROR');
    }
  },
);
