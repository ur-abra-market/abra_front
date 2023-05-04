import { createSlice } from '@reduxjs/toolkit';

import { Status } from '../../enums/status.enum';

import { getCurrentUserInfo, loginService } from './loginSlice';

interface IInitialState {
  isInitialized: boolean;
  isLoading: Status;
  isFeedbackOpen: boolean;
}

const initialState: IInitialState = {
  isInitialized: false,
  isLoading: Status.Idle,
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
      state.isLoading = Status.Loading;
    });
    builder.addCase(loginService.rejected, state => {
      state.isLoading = Status.Failed;
    });

    builder.addCase(getCurrentUserInfo.pending, state => {
      state.isLoading = Status.Loading;
    });
    builder.addCase(getCurrentUserInfo.fulfilled, state => {
      state.isInitialized = true;
      state.isLoading = Status.Success;
    });
    builder.addCase(getCurrentUserInfo.rejected, state => {
      state.isInitialized = true;
      state.isLoading = Status.Failed;
    });
  },
});

export const appReducer = appSlice.reducer;

export const { toggleInfoForm } = appSlice.actions;
