import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { LoadingStatus } from '../../common/types/enums/status.enum';
import { productService } from '../../services/product/product.service';

export const manageProductsService = createAsyncThunk<any, void>(
  'manageProducts/manageProductsService',

  async (_, { rejectWithValue }) => {
    try {
      const data = await productService.getListManageProducts();

      return data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('[manageProductsService]: ERROR');
    }
  },
);

export const deleteProducts = createAsyncThunk<any, any>(
  'manageProducts/deleteProducts',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await productService.deleteList(id);

      dispatch(removeProducts(id));

      return response;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('[deleteProducts]: ERROR');
    }
  },
);

interface IManageProductsItialState {
  products: any[] | null;
  isLoading: LoadingStatus;
  error: string | null;
}

const initialState: IManageProductsItialState = {
  products: null,
  isLoading: LoadingStatus.Idle,
  // isStarted: false,
  error: null,
};

const manageProductsSlice = createSlice({
  name: 'manageProducts',
  initialState,

  extraReducers: builder => {
    builder.addCase(manageProductsService.pending, state => {
      state.isLoading = LoadingStatus.Loading;
      // state.isStarted = true
      state.error = null;
    });
    builder.addCase(manageProductsService.fulfilled, (state, action) => {
      state.isLoading = LoadingStatus.Success;
      state.products = action.payload;
    });
    builder.addCase(manageProductsService.rejected, (state, action) => {
      state.isLoading = LoadingStatus.Failed;
      state.error = action.payload as string;
    });

    builder.addCase(deleteProducts.pending, state => {
      state.isLoading = LoadingStatus.Loading;
      // state.isStarted = true
      state.error = null;
    });
    builder.addCase(deleteProducts.fulfilled, (state, action) => {
      state.isLoading = LoadingStatus.Success;
      state.products = action.payload;
    });
    builder.addCase(deleteProducts.rejected, (state, action) => {
      state.isLoading = LoadingStatus.Failed;
      state.error = action.payload as string;
    });
  },

  reducers: {
    products: (state, action) => {
      state.products = action.payload;
    },
    removeProducts(state, action) {
      if (state.products) {
        state.products = state.products.filter(
          product => product.id !== action.payload.id,
        );
      }
    },
  },
});

export const { products, removeProducts } = manageProductsSlice.actions;
export default manageProductsSlice.reducer;
