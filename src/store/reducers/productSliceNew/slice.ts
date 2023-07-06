import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IProductCard, IProductSliceInitialState } from './interfaces';
import { addFavoriteProduct, getProductById, removeFavoriteProduct } from './thunks';

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
      });
  },
});

export const productReducerNew = productSlice.reducer;
