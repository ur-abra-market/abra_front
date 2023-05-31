import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { userRoleType } from '../../../services/auth/auth.serviceTypes';
import { getUserRole } from '../appSlice';

import { loginUser } from './thunks';

interface IAuthSliceInitialState {
  errorMessage: null | string;
  isValidRegistrationData: null | boolean;
  loading: boolean;
  userRole: userRoleType;
  isAuthorized: boolean;
}

const AuthSliceInitialState: IAuthSliceInitialState = {
  errorMessage: null,
  isValidRegistrationData: null,
  loading: false,
  userRole: null,
  isAuthorized: false,
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
    builder.addCase(
      getUserRole.fulfilled,
      (state, action: PayloadAction<userRoleType>) => {
        state.userRole = action.payload;
      },
    );

    builder.addCase(loginUser.fulfilled, state => {
      state.isAuthorized = true;
    });
  },
});

export const { clearState } = authSlice.actions;
export const authReducer = authSlice.reducer;
