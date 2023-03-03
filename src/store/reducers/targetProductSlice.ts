import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { Status } from 'enums/status.enum';
import {
  IGradeProduct,
  IGradeProductRequest,
  IImageProduct,
  IImageProductRequest,
  IProduct,
  IRequestProduct,
} from 'interfaces';
import { productFetch } from 'services/product.service';

export const getProductById = createAsyncThunk<IProduct, IRequestProduct>(
  'targetProduct/getProductById',
  async (payload, { rejectWithValue }) => {
    try {
      return productFetch.getProductById(payload);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data);
      }

      return rejectWithValue('[Error]: getProductById');
    }
  },
);

export const getGradesByProductId = createAsyncThunk<IGradeProduct, IGradeProductRequest>(
  'targetProduct/getGradesByProductId',
  async ({ product_id }, { rejectWithValue }) => {
    try {
      return await productFetch.getGradesByProductId({ product_id });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data);
      }

      return rejectWithValue('[Error]: getGradesByProductId');
    }
  },
);

export const getImagesByProductId = createAsyncThunk<
  IImageProduct[],
  IImageProductRequest
>('targetProduct/getImagesByProductId', async ({ product_id }, { rejectWithValue }) => {
  try {
    return await productFetch.getProductImagesById({ product_id });
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.response?.data);
    }

    return rejectWithValue('[Error]: getImagesByProductId');
  }
});

const initialState = {
  product: {} as IProduct,
  gradesData: {} as IGradeProduct,
  images: [] as IImageProduct[],
  status: Status.Idle,
  error: '',
};

const targetProductSlice = createSlice({
  name: 'targetProduct',
  initialState,
  extraReducers: builder => {
    builder.addCase(getProductById.pending, state => {
      state.status = Status.Loading;
    });
    builder.addCase(getProductById.fulfilled, (state, action) => {
      console.log(action.payload);
      state.product = action.payload;

      state.status = Status.Success;
    });
    builder.addCase(getProductById.rejected, state => {
      state.status = Status.Failed;
    });
    builder.addCase(getGradesByProductId.fulfilled, (state, action) => {
      state.gradesData = action.payload;
    });
    builder.addCase(getImagesByProductId.fulfilled, (state, action) => {
      state.images = action.payload;
    });
  },
  reducers: {},
});

// export const { } = targetProductSlice.actions
export const targetProductReducer = targetProductSlice.reducer;
