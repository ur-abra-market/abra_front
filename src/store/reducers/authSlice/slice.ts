import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getUserRole } from '../appSlice';

import { loginUser } from './thunks';

import { UserRoleType } from 'common/types';

interface IAuthSliceInitialState {
  userRole: UserRoleType;
  isAuthorized: boolean;
}

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
      },
    );

    builder.addCase(loginUser.fulfilled, state => {
      state.isAuthorized = true;
    });
  },
});

export const authReducer = authSlice.reducer;
