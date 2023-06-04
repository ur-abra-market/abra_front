import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import userService from '../../services/user/user.service';
import { RootStateType } from '../createStore';

import { LoadingStatus } from 'common/types';

export const uploadUserLogoService = createAsyncThunk<any, any>(
  'user/uploadUserLogoService',
  async (image, { rejectWithValue }) => {
    try {
      const data = await userService.uploadLogoImage(image);

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
  async (_, { rejectWithValue }) => {
    try {
      const data = await userService.getFavoritesProducts();

      return data.result;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('[getFavoritesProductsService]: Error');
    }
  },
);

export const getUserNotificationsService = createAsyncThunk<IUserNotificationsData, void>(
  'user/getUserNotificationsService',
  async (_, { rejectWithValue }) => {
    try {
      const data = await userService.getNotifications();

      return data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('[getUserNotificationsService]: Error');
    }
  },
);

export const updateUserNotificationService = createAsyncThunk<
  void,
  { id: string; isChecked: boolean }
>(
  'user/updateUserNotificationService',
  async (
    param: { id: string; isChecked: boolean },
    { rejectWithValue, getState, dispatch },
  ) => {
    try {
      const state = getState() as RootStateType;
      const { notifications } = state.user;

      if (notifications) {
        const notificationsCopy = { ...notifications, [param.id]: param.isChecked };

        await userService.updateNotification(notificationsCopy);
        dispatch(getUserNotificationsService());
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('[getUserNotificationsService]: Error');
    }
  },
);

const initialState: InitialStateType = {
  logoUrl: null,
  errMessage: '',
  loading: LoadingStatus.Idle,
  favoritesProducts: [],
  notifications: null,
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
        state.loading = LoadingStatus.Loading;
      })
      .addCase(uploadUserLogoService.fulfilled, (state, action) => {
        state.logoUrl = action.payload;
        state.errMessage = '';
        state.loading = LoadingStatus.Success;
      })
      .addCase(uploadUserLogoService.rejected, (state, action) => {
        state.logoUrl = null;
        state.errMessage = action.payload as string;
        state.loading = LoadingStatus.Failed;
      })
      .addCase(getFavoritesProductsService.pending, state => {
        state.loading = LoadingStatus.Loading;
      })
      .addCase(getFavoritesProductsService.fulfilled, (state, action) => {
        state.favoritesProducts = action.payload;
        state.loading = LoadingStatus.Success;
      })
      .addCase(getFavoritesProductsService.rejected, state => {
        state.loading = LoadingStatus.Failed;
      })
      .addCase(getUserNotificationsService.pending, state => {
        state.loading = LoadingStatus.Loading;
      })
      .addCase(getUserNotificationsService.fulfilled, (state, action) => {
        state.loading = LoadingStatus.Success;
        state.notifications = action.payload;
      })
      .addCase(getUserNotificationsService.rejected, state => {
        state.loading = LoadingStatus.Failed;
      });
  },
});

export default userSlice.reducer;

type InitialStateType = {
  logoUrl: null | string;
  errMessage: string;
  loading: LoadingStatus;
  favoritesProducts: any[];
  notifications: IUserNotificationsData | null;
};

export interface IUserNotificationsData {
  on_discount: boolean;
  on_order_updates: boolean;
  on_order_reminders: boolean;
  on_stock_again: boolean;
  on_product_is_cheaper: boolean;
  on_your_favorites_new: boolean;
  on_account_support: boolean;
}
