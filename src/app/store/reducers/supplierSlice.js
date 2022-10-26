import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supplierFetch from "../../services/supplier.service";

const initialState = {
  productId: null,
  productProperties: null,
  productVariations: null,
  errMessage: "",
  loading: false,
  companyInfo: null,
};

export const getPropertiesService = createAsyncThunk(
  "supplier/getPropertiesService",
  async function ({ id }, { rejectWithValue }) {
    try {
      const data = await supplierFetch.getProductProperties(id);
      return data.result;
    } catch (error) {
      const err = error.response.data.result
        ? error.response.data.result
        : error.message;
      return rejectWithValue(err);
    }
  }
);
export const getCompanyInfoService = createAsyncThunk(
  "supplier/getCompanyInfoService",
  async function (id, { rejectWithValue }) {
    try {
      const data = await supplierFetch.getSupplierCompanyInfo();
      return data.result;
    } catch (error) {
      const err = error.response.data.result
        ? error.response.data.result
        : error.message;
      return rejectWithValue(err);
    }
  }
);

export const getVariationsService = createAsyncThunk(
  "supplier/getVariationsService",
  async function ({ id }, { rejectWithValue }) {
    try {
      const data = await supplierFetch.getProductVariations(id);
      return data.result;
    } catch (error) {
      const err = error.response.data.result
        ? error.response.data.result
        : error.message;
      return rejectWithValue(err);
    }
  }
);

export const addProductService = createAsyncThunk(
  "supplier/addProduct",
  async ({ product }, { rejectWithValue }) => {
    try {
      const data = await supplierFetch.addProduct(product);
      return data.product_id;
    } catch (error) {
      const err = error.response.data.result
        ? error.response.data.result
        : error.message;
      return rejectWithValue(err);
    }
  }
);

export const uploadImageService = createAsyncThunk(
  "supplier/uploadImage",
  async ({ rest }, { rejectWithValue }) => {
    try {
      return await supplierFetch.uploadImage(rest.img, rest.prodId, rest.index);
    } catch (error) {
      const err = error.response.data.result
        ? error.response.data.result
        : error.message;
      return rejectWithValue(err);
    }
  }
);

const categorySlice = createSlice({
  name: "supplier",
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addProductService.pending, (state) => {
        state.productId = null;
        state.errMessage = "";
        state.loading = true;
      })
      .addCase(addProductService.fulfilled, (state, action) => {
        state.productId = action.payload;
        state.errMessage = "";
        state.loading = false;
      })
      .addCase(addProductService.rejected, (state, action) => {
        state.productId = null;
        state.errMessage = action.payload;
        state.loading = false;
      });

    builder
      .addCase(getPropertiesService.pending, (state) => {
        state.productProperties = null;
        state.errMessage = "";
        state.loading = true;
      })
      .addCase(getPropertiesService.fulfilled, (state, action) => {
        state.productProperties = action.payload;
        state.errMessage = "";
        state.loading = false;
      })
      .addCase(getPropertiesService.rejected, (state, action) => {
        state.productProperties = action.payload;
        state.errMessage = action.payload;
        state.loading = false;
      });

    builder
      .addCase(getCompanyInfoService.pending, (state) => {
        state.companyInfo = null;
        state.errMessage = "";
        state.loading = true;
      })
      .addCase(getCompanyInfoService.fulfilled, (state, action) => {
        state.companyInfo = action.payload;
        state.errMessage = "";
        state.loading = false;
      })
      .addCase(getCompanyInfoService.rejected, (state, action) => {
        state.companyInfo = null;
        state.errMessage = action.payload;
        state.loading = false;
      });

    builder
      .addCase(getVariationsService.pending, (state) => {
        state.productVariations = null;
        state.errMessage = "";
        state.loading = true;
      })
      .addCase(getVariationsService.fulfilled, (state, action) => {
        state.productVariations = action.payload;
        state.errMessage = "";
        state.loading = false;
      })
      .addCase(getVariationsService.rejected, (state, action) => {
        state.productVariations = action.payload;
        state.errMessage = action.payload;
        state.loading = false;
      });
  },
  reducers: {},
});

export default categorySlice.reducer;
