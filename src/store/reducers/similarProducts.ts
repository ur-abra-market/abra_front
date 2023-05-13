import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { Status } from 'enums/status.enum';
import { IRequestSimilarProduct, I_SimilarProduct } from 'interfaces';
import { getSimilarProductsService } from 'services/getSimilarProducts.service';

export const getSimilarProducts = createAsyncThunk<
  I_SimilarProduct[],
  IRequestSimilarProduct
>('similarProducts/getSimilarProducts', async (payload, { rejectWithValue }) => {
  try {
    const { result } = await getSimilarProductsService.get(payload);

    return result;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.response?.data);
    }

    return rejectWithValue('[Error]: getSimilarProducts');
  }
});

const initialState = {
  similarProducts: [] as I_SimilarProduct[],
  status: Status.Idle,
};

export const similarProductsSlice = createSlice({
  name: 'similarProducts',
  initialState,
  extraReducers: builder => {
    builder.addCase(getSimilarProducts.pending, state => {
      state.status = Status.Loading;
    });
    builder.addCase(getSimilarProducts.fulfilled, (state, action) => {
      state.similarProducts = action.payload;
      state.status = Status.Success;
    });
    builder.addCase(getSimilarProducts.rejected, state => {
      state.similarProducts = [];
      state.status = Status.Failed;
    });
  },
  reducers: {},
});

export const similarProductsReducer = similarProductsSlice.reducer;
