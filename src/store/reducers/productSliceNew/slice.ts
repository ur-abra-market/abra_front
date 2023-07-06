import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IProductCard, IProductSliceInitialState } from './interfaces';
import { getProductById } from './thunks';

const productSlice = createSlice({
  name: 'Product',
  initialState: {} as IProductSliceInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      getProductById.fulfilled,
      (state, action: PayloadAction<IProductCard>) => {
        state.productCard = action.payload;
      },
    );
  },
});

export const productReducerNew = productSlice.reducer;
