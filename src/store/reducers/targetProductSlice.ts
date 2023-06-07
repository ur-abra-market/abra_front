import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import {
  IGradeProduct,
  IGradeProductRequest,
  IImageProductRequest,
  IProduct,
  IRequestProduct,
} from '../../services/product/product.serviceTypes';

import { IImageProduct, LoadingStatus } from 'common/types';
import { productService } from 'services/product/product.service';

export const getProductById = createAsyncThunk<IProduct, IRequestProduct>(
  'targetProduct/getProductById',
  async (payload, { rejectWithValue }) => {
    try {
      return productService.getProductById(payload);
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
      return await productService.getGradesByProductId({ product_id });
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
    return await productService.getProductImagesById({ product_id });
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.response?.data);
    }

    return rejectWithValue('[Error]: getImagesByProductId');
  }
});

const product = {
  grade: {
    grade_average: '4.4',
    count: 5,
  },
  category_id: 1,
  category_path: 'Womens clothes',
  product_name: 'Womens clothes',
  is_favorite: true,
  tags: ['tags', 'tags'],
  colors: ['black', 'green', 'blue', 'red'],
  sizes: ['xs', 's', 'm', 'l', 'xl'],
  monthly_actual_demand: 100,
  daily_actual_demand: 10,
  prices: [
    {
      value: '100',
      min_quantity: 5,
      discount: '1',
      start_date: '21.03.2023',
      end_date: '21.04.2023',
    },
  ],
  supplier_info: 'any',
};

const images = [
  {
    image_url:
      'https://images.asos-media.com/products/asos-design-cargo-tapered-trousers-in-black-with-toggles/202796442-1-black?$n_750w$&wid=750&hei=750&fit=crop',
    serial_number: 1,
  },
  {
    image_url:
      'https://images.asos-media.com/products/asos-design-smart-high-waisted-trousers-in-khaki/14653639-1-khaki?$n_640w$&wid=513&fit=constrain',
    serial_number: 2,
  },
  {
    image_url:
      'https://images.asos-media.com/products/asos-design-curve-jersey-slouch-wide-leg-trouser-in-sage-check/203076894-1-sage?$n_640w$&wid=513&fit=constrain',
    serial_number: 3,
  },
  {
    image_url:
      'https://images.asos-media.com/products/asos-design-skinny-trousers-in-black-check/21340237-1-black?$n_640w$&wid=513&fit=constrain',
    serial_number: 4,
  },
  {
    image_url:
      'https://images.asos-media.com/products/asos-design-skinny-trousers-in-check-with-elasticated-waist/21339425-1-black?$n_640w$&wid=513&fit=constrain',
    serial_number: 5,
  },
];

const gradesData = {
  grade: {
    grade_average: '4.4',
    count: 5,
  },
  grade_details: [{ grade: 4, count: 4 }],
};

const initialState = {
  product: product as IProduct,
  gradesData: gradesData as IGradeProduct,
  images: images as IImageProduct[],
  status: 'success',
  error: '',
};

const targetProductSlice = createSlice({
  name: 'targetProduct',
  initialState,
  extraReducers: builder => {
    builder.addCase(getProductById.pending, state => {
      state.status = LoadingStatus.Loading;
    });
    builder.addCase(getProductById.fulfilled, (state, action) => {
      state.product = action.payload;

      state.status = LoadingStatus.Success;
    });
    builder.addCase(getProductById.rejected, state => {
      state.status = LoadingStatus.Failed;
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
