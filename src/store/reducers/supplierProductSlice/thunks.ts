import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { pageNumber, pageSize } from './selectors';
import { IProductsListRequest } from './types';

import { productService } from 'services/product/product.service';
import { RootStateType } from 'store/createStore';

export const activateProducts = createAsyncThunk<boolean, number[]>(
  'product/activateProducts',
  async (productsId: number[], { rejectWithValue, dispatch }) => {
    try {
      const res = await productService.restoreList(productsId);

      await dispatch(manageProducts());

      return res;
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
  async (productsId: number[], { rejectWithValue, dispatch }) => {
    try {
      const res = await productService.deleteList(productsId);

      await dispatch(manageProducts());

      return res;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('[deleteProducts]: ERROR');
    }
  },
);

export const manageProducts = createAsyncThunk<IProductsListRequest[], void>(
  'product/manageProducts',

  async (_, { rejectWithValue, getState }) => {
    const page = pageNumber(getState() as RootStateType);
    const sizeOfPages = pageSize(getState() as RootStateType);

    const offset = (page - 1) * 20;

    try {
      return await productService.getListManageProducts(offset, sizeOfPages);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('[manageProductsService]: ERROR');
    }
  },
);
