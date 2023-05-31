import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { userRoleType } from '../../../services/auth/auth.serviceTypes';
import { getUserRole } from '../appSlice';

import { registerUser } from './thunks';

interface IAuthSliceInitialState {
  errorMessage: null | string;
  isValidRegistrationData: null | boolean;
  loading: boolean;
  userRole: userRoleType;
}

const AuthSliceInitialState: IAuthSliceInitialState = {
  errorMessage: null,
  isValidRegistrationData: null,
  loading: false,
  userRole: null,
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

    builder.addCase(
      getUserRole.fulfilled,
      (state, action: PayloadAction<userRoleType>) => {
        state.userRole = action.payload;
      },
    );
  },
});

export const { clearState } = authSlice.actions;
export const authReducer = authSlice.reducer;
