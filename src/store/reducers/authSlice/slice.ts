import { createSlice } from '@reduxjs/toolkit';

import { registerUser } from './asyncThunks';

interface IAuthSliceInitialState {
  errorMessage: null | string;
  isValidRegistrationData: null | boolean;
  loading: boolean;
}

const AuthSliceInitialState: IAuthSliceInitialState = {
  errorMessage: null,
  isValidRegistrationData: null,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: AuthSliceInitialState,
  reducers: {
    clearState: state => {
      state.errorMessage = null;
      state.isValidRegistrationData = null;
      state.loading = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(registerUser.pending, state => {
      state.errorMessage = null;
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, state => {
      state.isValidRegistrationData = true;
      state.loading = false;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.errorMessage = action.payload as string;
      state.isValidRegistrationData = false;
      state.loading = false;
    });
  },
});

export const { clearState } = authSlice.actions;
export const authReducer = authSlice.reducer;
