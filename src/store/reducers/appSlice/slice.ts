import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getUserRole, IAppSliceInitialState, IResponseNotice } from '.';

import { LoadingStatusEnum } from 'common/types';

const initialState: IAppSliceInitialState = {
  isAppInitialized: false,
  initializedLoading: LoadingStatusEnum.Idle,
  loading: LoadingStatusEnum.Idle,
  responseNotice: { noticeType: null, message: null },
  isFeedbackOpen: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleInfoForm(state) {
      state.isFeedbackOpen = !state.isFeedbackOpen;
    },
    setResponseError(state, action: PayloadAction<string>) {
      state.responseNotice.noticeType = 'error';
      state.responseNotice.message = action.payload;
      state.loading = LoadingStatusEnum.Failed;
    },
    setLoading(state, action: PayloadAction<LoadingStatusEnum>) {
      state.loading = action.payload;
    },
    setResponseNotice(state, action: PayloadAction<IResponseNotice>) {
      state.responseNotice.noticeType = action.payload.noticeType;
      state.responseNotice.message = action.payload.message;
    },
  },

  extraReducers: builder => {
    builder.addCase(getUserRole.fulfilled, state => {
      state.isAppInitialized = true;
    });
    builder.addCase(getUserRole.rejected, state => {
      state.isAppInitialized = true;
    });
  },
});

export const appReducer = appSlice.reducer;
export const { toggleInfoForm, setResponseError, setLoading, setResponseNotice } =
  appSlice.actions;
