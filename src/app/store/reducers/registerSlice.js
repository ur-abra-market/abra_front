import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../services/auth.service";

const initialState = {
  resMessage: "",
  errMessage: "",
  loading: false,
};

export const registerService = createAsyncThunk(
  "register/registerService",
  async ({ userStatus, ...rest }, { rejectWithValue }) => {
    try {
      const response = await authService.register({ userStatus, ...rest });
      return response.data.result;
    } catch (error) {
      const err = error.response.data.result
        ? error.response.data.result
        : error.message;
      return rejectWithValue(err);
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState,
  extraReducers: (bulder) => {
    bulder.addCase(registerService.pending, (state) => {
      state.resMessage = "";
      state.loading = true;
    });
    bulder.addCase(registerService.fulfilled, (state, action) => {
      state.resMessage = action.payload; // response
      state.loading = false;
    });
    bulder.addCase(registerService.rejected, (state, action) => {
      state.resMessage = action.payload;
      state.errMessage = action.payload;
      state.loading = false;
    });
  },
  reducers: {},
});

export default registerSlice.reducer;
