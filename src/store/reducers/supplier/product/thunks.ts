import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import {
  IProductPaginationParams,
  IProductsListResponse,
  IProductSortParams,
  IProductsSortRequest,
} from './types';

import { productService } from 'services/product/product.service';

export const activateProducts = createAsyncThunk<boolean, number[]>(
  'product/activateProducts',
  async (productsIds: number[], { rejectWithValue }) => {
    try {
      return await productService.restoreList(productsIds);
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
  async (selectedProductIds: number[], { rejectWithValue }) => {
    try {
      return await productService.deleteProducts(selectedProductIds);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('[deleteProducts]: ERROR');
    }
  },
);

export const getSupplierProducts = createAsyncThunk<
  IProductsListResponse,
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
    const params: IProductPaginationParams = { offset, limit, sort, ascending };
    const body: IProductSortParams = {
      category_ids,
      is_active,
      on_sale,
    };

    try {
      return await productService.getListSupplierProducts(body, params);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('[manageProductsService]: ERROR');
    }
  },
);
