import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import userFetch from '../../services/user.service';

export const uploadUserLogoService = createAsyncThunk<any, any>(
  'user/uploadUserLogoService',
  async (image, { rejectWithValue }) => {
    try {
      const data = await userFetch.uploadLogoImage(image);

      return data.result;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        rejectWithValue(error.message);
      }

      return rejectWithValue('[uploadUserLogoService]: ERROR');
    }
  },
);

const initialState = {
  logoUrl: null,
  errMessage: '',
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(uploadUserLogoService.pending, state => {
        state.logoUrl = null;
        state.errMessage = '';
        state.loading = true;
      })
      .addCase(uploadUserLogoService.fulfilled, (state, action) => {
        state.logoUrl = action.payload;
        state.errMessage = '';
        state.loading = false;
      })
      .addCase(uploadUserLogoService.rejected, (state, action) => {
        state.logoUrl = null;
        state.errMessage = action.payload as string;
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
