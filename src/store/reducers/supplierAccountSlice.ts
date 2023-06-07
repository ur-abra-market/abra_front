export {};
// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { AxiosError } from 'axios';
//
// import { LoadingStatus } from '../../common/types';
// import { supplierService } from '../../services';
// import { INotification } from '../../services/supplier/supplier.serviceTypes';
//
// import { getCurrentUserInfo } from './loginSlice';
//
// import { RootStateType } from 'store/createStore';
//
// export const getSupplierAccountDataService = createAsyncThunk(
//   'supplierAccount/getAccountData',
//   async (_, { rejectWithValue }) => {
//     try {
//       return supplierService.getAccountData();
//     } catch (error: unknown) {
//       if (error instanceof AxiosError) {
//         rejectWithValue(error.message);
//       }
//
//       return rejectWithValue('[getSupplierNotifications]: Error');
//     }
//   },
// );
//
// export const getSupplierNotifications = createAsyncThunk(
//   'supplierAccount/getNotifications',
//   async (_, { rejectWithValue }) => {
//     try {
//       return supplierService.getNotifications();
//     } catch (error: unknown) {
//       if (error instanceof AxiosError) {
//         rejectWithValue(error.message);
//       }
//
//       return rejectWithValue('[getSupplierNotifications]: Error');
//     }
//   },
// );
//
// export const updateSupplierNotifications = createAsyncThunk<
//   void,
//   { id: string; value: boolean }
// >(
//   'supplierAccount/postNotifications',
//   async (param, { rejectWithValue, getState, dispatch }) => {
//     try {
//       const state = getState() as RootStateType;
//       const { notifications } = state.supplierAccount;
//
//       if (notifications) {
//         const new_notifications = { ...notifications, [param.id]: param.value };
//
//         await supplierService.postNotifications(new_notifications);
//         dispatch(getSupplierNotifications());
//       }
//     } catch (error: unknown) {
//       if (error instanceof AxiosError) {
//         rejectWithValue(error.message);
//       }
//
//       return rejectWithValue('[getSupplierNotifications]: Error');
//     }
//   },
// );
//
// export interface ISupplierAccountSlice {
//   isLoading: LoadingStatus;
//   error: string | null;
//   notifications?: INotification;
//   hasProfile: boolean;
//   supplierInfo: {
//     firstName: string;
//     lastName: string;
//     phoneCountryCode: string;
//     phoneNumberBody: string;
//   };
// }
//
// const initialState: ISupplierAccountSlice = {
//   isLoading: LoadingStatus.Idle,
//   error: null,
//   hasProfile: false,
//   supplierInfo: {
//     firstName: '',
//     lastName: '',
//     phoneCountryCode: '',
//     phoneNumberBody: '',
//   },
// };
//
// const supplierAccountSlice = createSlice({
//   name: 'supplierAccount',
//   initialState,
//   reducers: {},
//   extraReducers: builder => {
//     builder.addCase(getCurrentUserInfo.pending, state => {
//       state.isLoading = LoadingStatus.Loading;
//     });
//     builder.addCase(getCurrentUserInfo.fulfilled, (state, action) => {
//       const response = action.payload.result;
//
//       if (response.is_supplier) {
//         if (action.payload.detail.has_profile) {
//           state.hasProfile = true;
//           state.supplierInfo.firstName = response.first_name;
//           state.supplierInfo.lastName = response.last_name;
//           state.supplierInfo.phoneCountryCode = response.phone_country_code;
//           state.supplierInfo.phoneNumberBody = response.phone_number;
//         } else {
//           state.hasProfile = false;
//         }
//       }
//
//       state.isLoading = LoadingStatus.Success;
//     });
//     builder.addCase(getSupplierAccountDataService.pending, state => {
//       state.isLoading = LoadingStatus.Loading;
//       state.error = null;
//     });
//     builder.addCase(getSupplierAccountDataService.fulfilled, (state, action) => {
//       state.supplierInfo = action.payload.result;
//       state.isLoading = LoadingStatus.Success;
//     });
//     builder.addCase(getSupplierAccountDataService.rejected, (state, action) => {
//       state.isLoading = LoadingStatus.Failed;
//       state.error = action.payload as string;
//     });
//     builder.addCase(getSupplierNotifications.pending, state => {
//       state.isLoading = LoadingStatus.Loading;
//     });
//     builder.addCase(getSupplierNotifications.fulfilled, (state, action) => {
//       state.isLoading = LoadingStatus.Success;
//       state.notifications = action.payload;
//     });
//     builder.addCase(getSupplierNotifications.rejected, (state, action) => {
//       state.isLoading = LoadingStatus.Failed;
//       state.error = action.payload as string;
//     });
//   },
// });
//
// export default supplierAccountSlice.reducer;
