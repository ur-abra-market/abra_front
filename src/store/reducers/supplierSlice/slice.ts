import { createSlice } from '@reduxjs/toolkit';

interface ISupplierSliceInitialState {}

const initialState: ISupplierSliceInitialState = {};

export const supplierSlice = createSlice({
  name: 'supplier',
  initialState,
  reducers: {},
  extraReducers: builder => {},
});
