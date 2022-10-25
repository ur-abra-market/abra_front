import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fetchManageProducts from "../../services/manageProducts.service";
import fetchDeletedProducts from "../../services/deleteProducts.service";

export const manageProductsService = createAsyncThunk(
  "manageProducts/manageProductsService",

  async function (manageProductsData, { rejectWithValue }) {
    try {
      const data = await fetchManageProducts.getList();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteProducts = createAsyncThunk(
  "manageProducts/deleteProducts",
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const response = await fetchDeletedProducts.deleteList(id);

      dispatch(removeProducts(id));
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const manageProductsSlice = createSlice({
  name: "manageProducts",
  initialState: {
    products: null,
    status: null,
    error: null,
  },

  extraReducers: {
    [manageProductsService.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [manageProductsService.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.products = action.payload;
    },
    [manageProductsService.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  },

  reducers: {
    products: (state, action) => {
      state.products = action.payload;
    },
    removeProducts(state, action) {
      state.products = state.products.filter(
        (product) => product.id !== action.payload.id
      );
    },
  },
});

export const { products, removeProducts } = manageProductsSlice.actions;
export default manageProductsSlice.reducer;
