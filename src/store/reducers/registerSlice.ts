import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import authService from '../../services/auth.service';
import { generateResponseError } from '../../utils/generateResponseError';

const initialState = {
  resMessage: '',
  errMessage: '',
  loading: false,
};

export const registerService = createAsyncThunk<any, any>(
  'register/registerService',
  async (dataUser, { rejectWithValue }) => {
    try {
      const response = await authService.register(dataUser);

      return response.result;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('[registerService]: Error');
    }
  },
);

const registerSlice = createSlice({
  name: 'register',
  initialState,
  extraReducers: bulder => {
    bulder.addCase(registerService.pending, state => {
      state.resMessage = '';
      state.loading = true;
    });
    bulder.addCase(registerService.fulfilled, (state, action) => {
      state.resMessage = action.payload; // response
      state.loading = false;
    });
    bulder.addCase(registerService.rejected, (state, action) => {
      state.resMessage = action.payload as string;
      state.errMessage = action.payload as string;
      state.loading = false;
    });
  },
  reducers: {},
});

export default registerSlice.reducer;
