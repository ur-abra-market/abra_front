import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { supplierService } from '../../../../services';

export const getPropertiesService = createAsyncThunk<any, any>(
  'supplier/getPropertiesService',
  async ({ id }, { rejectWithValue }) => {
    try {
      const data = await supplierService.getProductProperties(id);

      return data.result;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('[getPropertiesService]: Error');
    }
  },
);

export const getVariationsService = createAsyncThunk<any, any>(
  'supplier/getVariationsService',
  async ({ id }, { rejectWithValue }) => {
    try {
      const data = await supplierService.getProductVariations(id);

      return data.result;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('[getVariationsService]: Error');
    }
  },
);

export const addProductService = createAsyncThunk<any, any>(
  'supplier/addProductService',
  async ({ product }, { rejectWithValue }) => {
    try {
      const data = await supplierService.addProduct(product);

      return data.product_id;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('[addProductService]: Error');
    }
  },
);

export const uploadImageService = createAsyncThunk<any, any>(
  'supplier/uploadImageService',
  async ({ rest }, { rejectWithValue }) => {
    try {
      return await supplierService.uploadProductImage(rest.img, rest.prodId, rest.index);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('[uploadImageService]: Error');
    }
  },
);
