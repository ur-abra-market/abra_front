import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { commonService } from '../../services/common/common.service';

import { LoadingStatusEnum } from 'common/types';

export type ResponseCategoryType = {
  id: number;
  name: string;
  level: number;
  children?: ResponseCategoryType[] | [];
  parent_id?: number;
};

interface IInitialState {
  dateCategories: null | ResponseCategoryType[];
  errMessage: string;
  loading: LoadingStatusEnum;
}

const initialState: IInitialState = {
  dateCategories: null,
  errMessage: '',
  loading: LoadingStatusEnum.Idle,
};

export const categoryService = createAsyncThunk<any, void>(
  'category/categoryService',
  async function (_, { rejectWithValue }) {
    try {
      const data = await commonService.fetchIAllCategories();

      return data.result;
    } catch (error: unknown) {
      // @ts-ignore
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
        state.loading = LoadingStatusEnum.Loading;
      })
      .addCase(categoryService.fulfilled, (state, action) => {
        state.dateCategories = action.payload;
        state.loading = LoadingStatusEnum.Success;
      })
      .addCase(categoryService.rejected, (state, action) => {
        // @ts-ignore
        state.dateCategories = action.payload;
        // @ts-ignore
        state.errMessage = action.payload;
        state.loading = LoadingStatusEnum.Failed;
      });
  },
  reducers: {},
});

export const getCategories = (date: any) => (state: any) => {
  const arr: any[] = [];

  if (state?.category?.dateCategories && date) {
    date.forEach((el: any) => arr.push(el.name));

    return arr;
  }
};

export const getChilds = (value: any, date: any) => (state: any) => {
  if (state.category?.dateCategories && value)
    return date.find((el: any) => el.name === value)?.childs;
};

export default categorySlice.reducer;
