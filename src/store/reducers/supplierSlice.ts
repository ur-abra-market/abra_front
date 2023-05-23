import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { LoadingStatus } from '../../common/types/enums/status.enum';
import supplierFetch from '../../services/supplier/supplier.service';
import { CompanyInfo } from '../../services/supplier/supplier.serviceTypes';

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

export const getPropertiesService = createAsyncThunk<any, any>(
  'supplier/getPropertiesService',
  async ({ id }, { rejectWithValue }) => {
    try {
      const data = await supplierFetch.getProductProperties(id);

      return data.result;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('[getPropertiesService]: Error');
    }
  },
);
export const getCompanyInfoService = createAsyncThunk<any, void>(
  'supplier/getCompanyInfoService',
  async (_, { rejectWithValue }) => {
    try {
      const data = await supplierFetch.getSupplierCompanyInfo();

      return data.result;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('[getCompanyInfoService]: Error');
    }
  },
);

export const getVariationsService = createAsyncThunk<any, any>(
  'supplier/getVariationsService',
  async ({ id }, { rejectWithValue }) => {
    try {
      const data = await supplierFetch.getProductVariations(id);

      return data.result;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('[getVariationsService]: Error');
    }
  },
);

export const addProductService = createAsyncThunk<any, any>(
  'supplier/addProduct',
  async ({ product }, { rejectWithValue }) => {
    try {
      const data = await supplierFetch.addProduct(product);

      return data.product_id;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('[addProductService]: Error');
    }
  },
);

export const uploadImageService = createAsyncThunk<any, any>(
  'supplier/uploadImage',
  async ({ rest }, { rejectWithValue }) => {
    try {
      return await supplierFetch.uploadImage(rest.img, rest.prodId, rest.index);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('[uploadImageService]: Error');
    }
  },
);

const categorySlice = createSlice({
  name: 'supplier',
  initialState,
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
      .addCase(getCompanyInfoService.pending, state => {
        state.companyInfo = null;
        state.errMessage = '';
        state.loading = LoadingStatus.Loading;
      })
      .addCase(getCompanyInfoService.fulfilled, (state, action) => {
        state.companyInfo = action.payload;
        state.errMessage = '';
        state.loading = LoadingStatus.Success;
      })
      .addCase(getCompanyInfoService.rejected, (state, action) => {
        state.companyInfo = null;
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
  reducers: {},
});

export default categorySlice.reducer;
