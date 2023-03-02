import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { Status } from '../../enums/status.enum';
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

export const getFavoritesProductsService = createAsyncThunk<any, void>(
  'user/getFavoritesProductsService',
  async function (_, { rejectWithValue }) {
    try {
      const data = await userFetch.getFavoritesProducts();

      return data.result;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('[getFavoritesProductsService]: Error');
    }
  },
);

const initialState: InitialStateType = {
  logoUrl: null,
  errMessage: '',
  loading: Status.Idle,
  favoritesProducts: [],
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
        state.loading = Status.Loading;
      })
      .addCase(uploadUserLogoService.fulfilled, (state, action) => {
        state.logoUrl = action.payload;
        state.errMessage = '';
        state.loading = Status.Success;
      })
      .addCase(uploadUserLogoService.rejected, (state, action) => {
        state.logoUrl = null;
        state.errMessage = action.payload as string;
        state.loading = Status.Failed;
      })
      .addCase(getFavoritesProductsService.pending, state => {
        state.loading = Status.Loading;
      })
      .addCase(getFavoritesProductsService.fulfilled, (state, action) => {
        state.favoritesProducts = action.payload;
        state.loading = Status.Success;
      })
      .addCase(getFavoritesProductsService.rejected, state => {
        state.loading = Status.Failed;
      });
  },
});

export default userSlice.reducer;

type InitialStateType = {
  logoUrl: null | string;
  errMessage: string;
  loading: 'idle' | 'loading' | 'success' | 'failed';
  favoritesProducts: any[];
};
