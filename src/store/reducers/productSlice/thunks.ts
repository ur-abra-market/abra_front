import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { getPageNumber, getPageSize } from './selectors';
import { IProductCard, IProductsListRequest } from './types';

import { productService } from 'services/product/product.service';
import {
  ICategoryRequest,
  IPopularProductRequest,
  IProductCompilation,
  IProductRequest,
} from 'services/product/product.serviceTypes';
import { RootStateType } from 'store/createStore';

export const activateProducts = createAsyncThunk<boolean, number[]>(
  'product/activateProducts',
  async (ids: number[], { rejectWithValue, dispatch }) => {
    try {
      const res = await productService.restoreList(ids);

      dispatch(manageProducts());

      return res;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('[deleteProducts]: ERROR');
    }
  },
);
export const deActivateProducts = createAsyncThunk<boolean, number[]>(
  'product/deleteProducts',
  async (ids: number[], { rejectWithValue, dispatch }) => {
    try {
      const res = await productService.deleteList(ids);

      dispatch(manageProducts());

      return res;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('[deleteProducts]: ERROR');
    }
  },
);

export const manageProducts = createAsyncThunk<IProductsListRequest[], void>(
  'product/manageProducts',

  async (_, { rejectWithValue, getState }) => {
    const page = getPageNumber(getState() as RootStateType);
    const pageSize = getPageSize(getState() as RootStateType);

    const offset = (page - 1) * 20;

    try {
      return await productService.getListManageProducts(offset, pageSize);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('[manageProductsService]: ERROR');
    }
  },
);

export const getProductById = createAsyncThunk<IProductCard, IProductRequest>(
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

export const addFavoriteProduct = createAsyncThunk<any, IProductRequest>(
  'favorite/addFavoriteProduct',
  async (payload, { rejectWithValue }) => {
    try {
      return productService.addFavorite(payload);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data);
      }

      return rejectWithValue('[Error]: addFavoriteProduct');
    }
  },
);

export const removeFavoriteProduct = createAsyncThunk<any, IProductRequest>(
  'favorite/removeFavoriteProduct',
  async (payload, { rejectWithValue }) => {
    try {
      return productService.removeFavorite(payload);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data);
      }

      return rejectWithValue('[Error]: removeFavoriteProduct');
    }
  },
);

export const getSimilarProducts = createAsyncThunk<
  IProductCompilation[],
  IPopularProductRequest
>('similarProducts/getSimilarProducts', async (payload, { rejectWithValue }) => {
  try {
    const { result } = await productService.getSimilarProducts(payload);

    return result;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.response?.data);
    }

    return rejectWithValue('[Error]: getSimilarProducts');
  }
});

export const getPopularProducts = createAsyncThunk<[], IPopularProductRequest>(
  'popularProducts/getPopularProducts',
  async (payload, { rejectWithValue }) => {
    try {
      const { result } = await productService.getPopularProduct(payload);

      return result;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data);
      }

      return rejectWithValue('[Error]: getPopularProductsById');
    }
  },
);

export const getProductsCompilation = createAsyncThunk<any, ICategoryRequest>(
  'product/getProductsCompilation',
  async (productData, { rejectWithValue }) => {
    try {
      const response = await productService.getList(productData);

      return {
        data: response,
        category: productData.category_id,
      };
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('[getProductsCompilation]: ERROR');
    }
  },
);

//
// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { RootStateType } from './yourRootStateType';
// import { productService } from './yourProductService'; // Импортируйте ваш сервис продуктов
//
// interface Product {
//   id: number;
//   checked: boolean;
// }
//
// interface ProductState {
//   deactivationProductIds: Product[];
//   restoreProductIds: number[];
// }
//
// const initialState: ProductState = {
//   deactivationProductIds: [],
//   restoreProductIds: [],
// };
//
// export const deActivateProducts = createAsyncThunk<boolean, number[]>(
//   'product/deleteProducts',
//   async (ids: number[], { rejectWithValue, dispatch, getState }) => {
//     try {
//       const deactivatedIds = getDeactivatedIds(getState() as RootStateType);
//
//       // Удаление продуктов с помощью сервиса продуктов
//       const res = await productService.deleteList(ids);
//
//       // Извлечение идентификаторов из массива объектов deactivatedIds
//       const restoreProductIds = deactivatedIds.map((product) => product.id);
//
//       // Удаление объектов из deactivatedIds на основе переданных идентификаторов
//       const updatedDeactivationProductIds = deactivatedIds.filter(
//         (product) => !ids.includes(product.id)
//       );
//
//       // Диспатчим действие для обновления состояния с новыми массивами
//       dispatch(productSlice.actions.updateProductsArrays({ restoreProductIds, updatedDeactivationProductIds }));
//
//       // Диспатчим другие необходимые действия
//       dispatch(manageProducts());
//
//       console.log(res);
//
//       return res;
//     } catch (error: unknown) {
//       if (error instanceof AxiosError) {
//         return rejectWithValue(error.message);
//       }
//
//       return rejectWithValue('[deleteProducts]: ERROR');
//     }
//   },
// );
//
// const productSlice = createSlice({
//   name: 'product',
//   initialState,
//   reducers: {
//     // Этот редьюсер будет обновлять массивы restoreProductIds и deactivationProductIds
//     updateProductsArrays: (state, action: PayloadAction<{ restoreProductIds: number[]; updatedDeactivationProductIds: Product[] }>) => {
//       state.restoreProductIds = action.payload.restoreProductIds;
//       state.deactivationProductIds = action.payload.updatedDeactivationProductIds;
//     },
//   },
// });
//
// // Экспортируем действие и редьюсер
// export const { updateProductsArrays } = productSlice.actions;
// export default productSlice.reducer;
