import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getUserRole } from '../appSlice';

import {
  getCurrentUserInfo,
  loginUser,
  logout,
  forgotPassword,
  checkToken,
  resetPassword,
  changePassword,
} from './thunks';

import { UserRoleType } from 'common/types';

interface IAuthSliceInitialState {
  userRole: UserRoleType;
  isAuthorized: boolean;
  passwordActionsResult: string;
}

const AuthSliceInitialState: IAuthSliceInitialState = {
  userRole: null,
  isAuthorized: false,
  passwordActionsResult: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState: AuthSliceInitialState,
  reducers: {},

  extraReducers: builder => {
    builder.addCase(
      getUserRole.fulfilled,
      (state, action: PayloadAction<UserRoleType>) => {
        state.userRole = action.payload;
      },
    );

    builder.addCase(getCurrentUserInfo.rejected, state => {
      state.isAuthorized = false;
    });

    builder.addCase(loginUser.fulfilled, state => {
      state.isAuthorized = true;
    });

    builder.addCase(logout.fulfilled, state => {
      state.isAuthorized = false;
      state.userRole = null;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.isAuthorized = false;
    });

    builder.addCase(forgotPassword.pending, state => {
      state.passwordActionsResult = '';
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.passwordActionsResult = action.payload;
    });
    builder.addCase(checkToken.fulfilled, (state, action) => {
      state.passwordActionsResult = action.payload;
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.passwordActionsResult = action.payload;
    });
    builder.addCase(changePassword.fulfilled, (state, action) => {
      state.passwordActionsResult = action.payload;
    });
  },
});

export const authReducer = authSlice.reducer;
