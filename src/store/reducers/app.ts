import { createSlice } from '@reduxjs/toolkit';

import { checkAuth } from './loginSlice';

const initialState = {
  isInitialized: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(checkAuth.fulfilled, state => {
      state.isInitialized = true;
    });
    builder.addCase(checkAuth.rejected, state => {
      state.isInitialized = true;
    });
  },
});

export const appReducer = appSlice.reducer;
