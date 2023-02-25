import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { ForgotPasswordFormType } from "../../pages/AuthPage/AuthType";
import {
  AsyncThunkConfig,
  PasswordResponseType, ResetPasswordPayloadType
} from "../../services/auth.serviceType";
import { passwordService } from "../../services/password.service";

export const forgotPassword = createAsyncThunk<
  { data: PasswordResponseType },
  ForgotPasswordFormType,
  AsyncThunkConfig
>("password/forgotPassword", async (param, { rejectWithValue }) => {
  try {
    return await passwordService.forgotPassword(param.email);
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.message);
    }

    return rejectWithValue("[forgotPassword]: ERROR");
  }
});

export const checkToken = createAsyncThunk<
  { data: PasswordResponseType },
  string,
  AsyncThunkConfig
>("password/checkToken",
  async (token, { rejectWithValue }) => {
    try {
      return await passwordService.checkToken(token);
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue("[checkToken]: ERROR");
    }
  });

export const resetPassword = createAsyncThunk<
  { data: PasswordResponseType },
  ResetPasswordPayloadType,
  AsyncThunkConfig
>(
  "password/resetPassword",
  async (param, { rejectWithValue }) => {
    try {
      const res = await passwordService.resetPassword(param);
      return res
    }
    catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue("[resetPassword]: ERROR");
    }
  }
);
const passwordSlice = createSlice({
  name: "password",
  initialState: {
    result: "" as string
  },
  extraReducers: builder => {
    builder.addCase(forgotPassword.pending, state => {
      state.result = "";
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.result = action.payload.data.result;
    });
    builder.addCase(checkToken.fulfilled, (state, action) => {
      state.result = action.payload.data.result;
    });
    builder.addCase(resetPassword.fulfilled,(state, action)=>{
      state.result= action.payload.data.result
    })
  },
  reducers: {}
});

export default passwordSlice.reducer;
