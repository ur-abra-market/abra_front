import { createSlice } from '@reduxjs/toolkit';

import { checkAuth } from './loginSlice';

const initialState = {
  isInitialized: false,
  isFeedbackOpen: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleInfoForm(state) {
      state.isFeedbackOpen = !state.isFeedbackOpen;
    },
  },
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

export const { toggleInfoForm } = appSlice.actions;
