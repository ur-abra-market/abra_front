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

export type passwordActionsResultType =
  | 'LINK_HAS_BEEN_SENT'
  | 'TOKEN_IS_ACTIVE'
  | 'PASSWORD_HAS_BEEN_CHANGED'
  | '';

interface IAuthSliceInitialState {
  userRole: UserRoleType;
  isAuthorized: boolean;
  passwordActionsResult: passwordActionsResultType;
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
        state.isAuthorized = true;
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
    builder.addCase(logout.rejected, state => {
      state.isAuthorized = false;
    });

    builder.addCase(forgotPassword.pending, state => {
      state.passwordActionsResult = '';
    });
    builder.addCase(forgotPassword.fulfilled, state => {
      state.passwordActionsResult = 'LINK_HAS_BEEN_SENT';
    });
    builder.addCase(checkToken.fulfilled, state => {
      state.passwordActionsResult = 'TOKEN_IS_ACTIVE';
    });
    builder.addCase(resetPassword.fulfilled, state => {
      state.passwordActionsResult = 'PASSWORD_HAS_BEEN_CHANGED';
    });
    builder.addCase(changePassword.fulfilled, state => {
      state.passwordActionsResult = 'PASSWORD_HAS_BEEN_CHANGED';
    });
  },
});

export const authReducer = authSlice.reducer;
