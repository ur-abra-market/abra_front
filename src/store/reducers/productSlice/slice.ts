import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IProductCard, IProductSliceInitialState } from './interfaces';
import {
  addFavoriteProduct,
  getPopularProducts,
  getProductById,
  getSimilarProducts,
  removeFavoriteProduct,
} from './thunks';

import { IProductCompilation } from 'services/product/product.serviceTypes';

const productSlice = createSlice({
  name: 'Product',
  initialState: {} as IProductSliceInitialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getProductById.fulfilled, (state, action: PayloadAction<IProductCard>) => {
        state.productCard = action.payload;
      })
      .addCase(addFavoriteProduct.fulfilled, state => {
        state.isFavorite = true;
      })
      .addCase(removeFavoriteProduct.fulfilled, state => {
        state.isFavorite = false;
      })
      .addCase(
        getSimilarProducts.fulfilled,
        (state, action: PayloadAction<IProductCompilation[]>) => {
          state.similarProducts = action.payload;
        },
      )
      .addCase(
        getPopularProducts.fulfilled,
        (state, action: PayloadAction<IProductCompilation[]>) => {
          state.popularProducts = action.payload;
        },
      );
  },
});

export const productReducer = productSlice.reducer;
