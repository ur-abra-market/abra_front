import { createSlice } from '@reduxjs/toolkit';

import { LoadingStatus } from '../../common/types';

import { getCurrentUserInfo, loginService } from './loginSlice';

interface IInitialState {
  isInitialized: boolean;
  isLoading: LoadingStatus;
  isFeedbackOpen: boolean;
}

const initialState: IInitialState = {
  isInitialized: false,
  isLoading: LoadingStatus.Idle,
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
    builder.addCase(loginService.pending, state => {
      state.isLoading = LoadingStatus.Loading;
    });
    builder.addCase(loginService.rejected, state => {
      state.isLoading = LoadingStatus.Failed;
    });

    builder.addCase(getCurrentUserInfo.pending, state => {
      state.isLoading = LoadingStatus.Loading;
    });
    builder.addCase(getCurrentUserInfo.fulfilled, state => {
      state.isInitialized = true;
      state.isLoading = LoadingStatus.Success;
    });
    builder.addCase(getCurrentUserInfo.rejected, state => {
      state.isInitialized = true;
      state.isLoading = LoadingStatus.Failed;
    });
  },
});

export const appReducer = appSlice.reducer;

export const { toggleInfoForm } = appSlice.actions;
