import { createSlice } from '@reduxjs/toolkit';

import { LoadingStatus } from '../../../../common/types';
import { CompanyInfo } from '../../../../services/supplier/supplier.serviceTypes';

import { addProductService, getPropertiesService, getVariationsService } from './thunks';

interface ProductObj {
  key: string;
  values: Array<{ value: string; optional_value: string }>;
}

export interface ProductProperties {
  result: ProductObj[];
}

const initialState = {
  productId: null as number | null,
  productProperties: null,
  productVariations: null,
  errMessage: '',
  loading: LoadingStatus.Idle as LoadingStatus,
  companyInfo: null as CompanyInfo | null,
};

const categorySlice = createSlice({
  name: 'supplier',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(addProductService.pending, state => {
        state.productId = null;
        state.errMessage = '';
        state.loading = LoadingStatus.Loading;
      })
      .addCase(addProductService.fulfilled, (state, action) => {
        state.productId = action.payload;
        state.errMessage = '';
        state.loading = LoadingStatus.Success;
      })
      .addCase(addProductService.rejected, (state, action) => {
        state.productId = null;
        state.errMessage = action.payload as string;
        state.loading = LoadingStatus.Failed;
      });

    builder
      .addCase(getPropertiesService.pending, state => {
        state.productProperties = null;
        state.errMessage = '';
        state.loading = LoadingStatus.Loading;
      })
      .addCase(getPropertiesService.fulfilled, (state, action) => {
        state.productProperties = action.payload;
        state.errMessage = '';
        state.loading = LoadingStatus.Success;
      })
      .addCase(getPropertiesService.rejected, (state, action) => {
        // @ts-ignore
        state.productProperties = action.payload;
        state.errMessage = action.payload as string;
        state.loading = LoadingStatus.Failed;
      });

    builder
      .addCase(getVariationsService.pending, state => {
        state.productVariations = null;
        state.errMessage = '';
        state.loading = LoadingStatus.Loading;
      })
      .addCase(getVariationsService.fulfilled, (state, action) => {
        state.productVariations = action.payload;
        state.errMessage = '';
        state.loading = LoadingStatus.Success;
      })
      .addCase(getVariationsService.rejected, (state, action) => {
        // @ts-ignore
        state.productVariations = action.payload;
        state.errMessage = action.payload as string;
        state.loading = LoadingStatus.Failed;
      });
  },
});

export const supplierOtherReducer = categorySlice.reducer;
