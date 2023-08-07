import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { loginUser, logoutUser, IAuthSliceInitialState } from '.';

import { UserRoleType } from 'common/types';
import { getUserRole } from 'store/reducers/appSlice';

const AuthSliceInitialState: IAuthSliceInitialState = {
  userRole: null,
  isAuthorized: false,
  isLogoutLoading: false,
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

    builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<UserRoleType>) => {
      state.isAuthorized = true;
      state.userRole = action.payload;
    });

    builder.addCase(logoutUser.pending, state => {
      state.isLogoutLoading = true;
    });

    builder.addCase(logoutUser.fulfilled, state => {
      state.isLogoutLoading = false;
      state.isAuthorized = false;
      state.userRole = null;
    });
    builder.addCase(logoutUser.rejected, state => {
      state.isLogoutLoading = false;
    });
  },
});

export const authReducer = authSlice.reducer;
