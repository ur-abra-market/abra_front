import { createSlice } from '@reduxjs/toolkit';

import { LoadingStatus } from 'common/types';

export type ResponseCategoryType = {
  id: number;
  name: string;
  level: number;
  children?: ResponseCategoryType[] | [];
  parent_id?: number;
};

interface IInitialState {
  errMessage: string;
  loading: LoadingStatus;
}

const initialState: IInitialState = {
  errMessage: '',
  loading: LoadingStatus.Idle,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
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
