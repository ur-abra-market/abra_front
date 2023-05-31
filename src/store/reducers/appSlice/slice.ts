import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { LoadingStatus } from '../../../common/types/enums/status.enum';

import { getUserRole } from './index';

type ResponseType = 'error' | 'success' | null;

interface IAppSliceInitialState {
  isAppInitialized: boolean;
  initializedLoading: LoadingStatus;
  loading: LoadingStatus;
  response: { type: ResponseType; message: string | null };
  isFeedbackOpen: boolean;
}

const initialState: IAppSliceInitialState = {
  isAppInitialized: false,
  initializedLoading: LoadingStatus.Idle,
  loading: LoadingStatus.Idle,
  response: { type: null, message: null },
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
      state.response.type = 'error';
      state.response.message = action.payload;
      state.loading = LoadingStatus.Failed;
    },
  },

  extraReducers: builder => {
    builder.addCase(getUserRole.pending, state => {
      state.response.message = null;
    });
    builder.addCase(getUserRole.fulfilled, state => {
      state.isAppInitialized = true;
    });
    builder.addCase(getUserRole.rejected, state => {
      state.isAppInitialized = true;
    });
  },
});

export const appReducer = appSlice.reducer;
export const { toggleInfoForm, setResponseError } = appSlice.actions;
