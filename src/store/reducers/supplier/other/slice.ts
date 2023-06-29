import { createSlice } from '@reduxjs/toolkit';

import { addProductService, getPropertiesService, getVariationsService } from './thunks';

import { LoadingStatusEnum } from 'common/types';

const initialState = {
  productId: null as number | null,
  productProperties: null,
  productVariations: null,
  errMessage: '',
  loading: LoadingStatusEnum.Idle as LoadingStatusEnum,
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
        state.loading = LoadingStatusEnum.Loading;
      })
      .addCase(addProductService.fulfilled, (state, action) => {
        state.productId = action.payload;
        state.errMessage = '';
        state.loading = LoadingStatusEnum.Success;
      })
      .addCase(addProductService.rejected, (state, action) => {
        state.productId = null;
        state.errMessage = action.payload as string;
        state.loading = LoadingStatusEnum.Failed;
      });

    builder
      .addCase(getPropertiesService.pending, state => {
        state.productProperties = null;
        state.errMessage = '';
        state.loading = LoadingStatusEnum.Loading;
      })
      .addCase(getPropertiesService.fulfilled, (state, action) => {
        state.productProperties = action.payload;
        state.errMessage = '';
        state.loading = LoadingStatusEnum.Success;
      })
      .addCase(getPropertiesService.rejected, (state, action) => {
        // @ts-ignore
        state.productProperties = action.payload;
        state.errMessage = action.payload as string;
        state.loading = LoadingStatusEnum.Failed;
      });

    builder
      .addCase(getVariationsService.pending, state => {
        state.productVariations = null;
        state.errMessage = '';
        state.loading = LoadingStatusEnum.Loading;
      })
      .addCase(getVariationsService.fulfilled, (state, action) => {
        state.productVariations = action.payload;
        state.errMessage = '';
        state.loading = LoadingStatusEnum.Success;
      })
      .addCase(getVariationsService.rejected, (state, action) => {
        // @ts-ignore
        state.productVariations = action.payload;
        state.errMessage = action.payload as string;
        state.loading = LoadingStatusEnum.Failed;
      });
  },
});

export const supplierOtherReducer = categorySlice.reducer;
