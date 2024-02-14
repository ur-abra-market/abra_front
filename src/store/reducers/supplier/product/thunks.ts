import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import {
  IProductSorting,
  IProductsListResponse,
  IProductFilterParams,
  IProductRequestParams,
  IBrandsInfo,
} from './types';

import { IAsyncThunkConfig } from 'common/types';
import { productService } from 'services/product/product.service';

export const selectedProducts = createAsyncThunk<boolean, number[]>(
  'product/selectedProduct',
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
export const unselectedProducts = createAsyncThunk<boolean, number[]>(
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
  IProductRequestParams
>(
  'product/manageProducts',

  async (
    {
      category_ids,
      sort,
      on_sale,
      ascending,
      is_active,
      query,
      limit,
      offset,
    }: IProductRequestParams,
    { rejectWithValue },
  ) => {
    const params: IProductSorting = { offset, limit, sort, ascending };
    const body: IProductFilterParams = {
      category_ids,
      is_active,
      query,
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

export const getBrandsInfo = createAsyncThunk<any, IBrandsInfo[]>(
  'product/getBrandsInfo',
  async (_, { rejectWithValue }) => {
    try {
      return await productService.getBrandsInfo();
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('[getBrandsInfo]: Error');
    }
  },
);
