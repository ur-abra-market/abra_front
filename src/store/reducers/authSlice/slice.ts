import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { loginUser, logout, IAuthSliceInitialState } from '.';

import { UserRoleType } from 'common/types';
import { getUserRole } from 'store/reducers/appSlice';

const AuthSliceInitialState: IAuthSliceInitialState = {
  userRole: null,
  isAuthorized: false,
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
  },
});

export const authReducer = authSlice.reducer;
