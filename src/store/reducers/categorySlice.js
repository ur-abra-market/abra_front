import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import categoryFetch from '../../services/category.service';

const initialState = {
  dateCategories: null,
  errMessage: '',
  loading: false,
};

export const categoryService = createAsyncThunk(
  'category/categoryService',
  async function (_, { rejectWithValue }) {
    try {
      const data = await categoryFetch.getAllCategories();

      return data.result;
    } catch (error) {
      const err = error.response.data.result ? error.response.data.result : error.message;

      return rejectWithValue(err);
    }
  },
);

const categorySlice = createSlice({
  name: 'category',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(categoryService.pending, state => {
        state.dateCategories = null;
        state.resMessage = '';
        state.loading = true;
      })
      .addCase(categoryService.fulfilled, (state, action) => {
        state.dateCategories = action.payload;
        state.resMessage = '';
        state.loading = false;
      })
      .addCase(categoryService.rejected, (state, action) => {
        state.dateCategories = action.payload;
        state.errMessage = action.payload;
        state.loading = false;
      });
  },
  reducers: {},
});

export const getCategories = date => state => {
  const arr = [];

  if (state?.category?.dateCategories && date) {
    date.forEach(el => arr.push(el.name));

    return arr;
  }
};

export const getChilds = (value, date) => state => {
  if (state.category?.dateCategories && value)
    return date.find(el => el.name === value)?.childs;
};

export default categorySlice.reducer;
