import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import supplierAccountData from '../../services/supplierAccount.service';

export const getSupplierAccountDataService = createAsyncThunk(
  'supplierAccount/getAccountData',

  async function (data, { rejectWithValue }) {
    try {
      const data = await supplierAccountData.getAccountData();

      console.log('data', data);

      return data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        rejectWithValue(error.message);
      }

      return rejectWithValue('[getSupplierNotifications]: Error');
    }
  },
);

// TODO - not use
export const getSupplierNotifications = createAsyncThunk(
  'supplierAccount/getNotifications',
  async (_, { rejectWithValue }) => {
    try {
      const notifications = await supplierAccountData.getNotifications();

      return notifications;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        rejectWithValue(error.message);
      }

      return rejectWithValue('[getSupplierNotifications]: Error');
    }
  },
);

// TODO - not use
export const postSupplierNotifications = createAsyncThunk<any, any>(
  'supplierAccount/postNotifications',
  async (data, { rejectWithValue }) => {
    try {
      const notifications = await supplierAccountData.postNotifications(data);

      return notifications;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        rejectWithValue(error.message);
      }

      return rejectWithValue('[getSupplierNotifications]: Error');
    }
  },
);

// TODO - not use
export const postSupplierAccountDataService = createAsyncThunk<any, any>(
  'supplierAccount/postAccountData',
  async (personalData, { rejectWithValue }) => {
    try {
      const data = await supplierAccountData.postAccountData(personalData);

      return data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        rejectWithValue(error.message);
      }

      return rejectWithValue('[getSupplierNotifications]: Error');
    }
  },
);

// TODO - пересмотреть типизацию
export interface ISupplierAccountSlice {
  isLoading: boolean;
  error: string | null;
  business_profile: any;
  personal_info: any;
  notifications: any;
  company_info: any;
  businessSector: boolean;
  orderUpdates: boolean;
  orderReminders: boolean;
  onStockAgain: boolean;
  productIsCheaper: boolean;
  yourFavoritesNew: boolean;
  accountSupport: boolean;
  manufacturer: boolean;
  email: string;
}
const initialState: ISupplierAccountSlice = {
  isLoading: false,
  error: null,
  business_profile: {},
  personal_info: {},
  notifications: {},
  company_info: {},
  email: '',
  manufacturer: false,
  businessSector: false,
  orderUpdates: false,

  orderReminders: false,
  onStockAgain: false,
  productIsCheaper: false,
  yourFavoritesNew: false,
  accountSupport: false,
};

const supplierAccountSlice = createSlice({
  name: 'supplierAccount',
  initialState,

  reducers: {
    setFirstName: (state, action) => {
      state.personal_info.first_name = action.payload;
    },
    setLastName: (state, action) => {
      state.personal_info.last_name = action.payload;
    },
    setCountry: (state, action) => {
      state.personal_info.country = action.payload;
    },
    setPhone: (state, action) => {
      state.personal_info.phone = action.payload;
    },
    setLicence: (state, action) => {
      state.personal_info.license_number = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setLogo: (state, action) => {
      state.company_info.logo_url = action.payload;
    },
    setShopName: (state, action) => {
      state.company_info.name = action.payload;
    },
    setBusinessSector: (state, action) => {
      state.company_info.business_sector = action.payload;
    },
    setManufacturer: state => {
      state.company_info.is_manufacturer = !state.manufacturer;
    },
    setYearEstablished: (state, action) => {
      state.company_info.year_established = action.payload;
    },
    setNumberOfEmployees: (state, action) => {
      state.company_info.number_of_employees = action.payload;
    },
    setAboutTheBusiness: (state, action) => {
      state.company_info.description = action.payload;
    },
    setPhotos: (state, action) => {
      state.company_info.photo_url = action.payload;
    },
    // businessCode: (state, action) => {
    //     state.company_info.businessCode = action.payload;
    // },
    setBusinessPhone: (state, action) => {
      state.company_info.phone = action.payload;
    },
    setBusinessEmail: (state, action) => {
      state.company_info.business_email = action.payload;
    },
    setCompanyAddress: (state, action) => {
      state.company_info.address = action.payload;
    },
    discountsOffers: state => {
      state.businessSector = !state.businessSector;
    },
    orderUpdates: state => {
      state.orderUpdates = !state.orderUpdates;
    },
    orderReminders: state => {
      state.orderReminders = !state.orderReminders;
    },
    onStockAgain: state => {
      state.onStockAgain = !state.onStockAgain;
    },
    productIsCheaper: state => {
      state.productIsCheaper = !state.productIsCheaper;
    },
    yourFavoritesNew: state => {
      state.yourFavoritesNew = !state.yourFavoritesNew;
    },
    accountSupport: state => {
      state.accountSupport = !state.accountSupport;
    },
  },
  extraReducers: builder => {
    builder.addCase(getSupplierAccountDataService.pending, state => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getSupplierAccountDataService.fulfilled, (state, action) => {
      state.isLoading = false;
      state.business_profile = action.payload.business_profile;
      state.personal_info = action.payload.personal_info;
    });
    builder.addCase(getSupplierAccountDataService.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
  // extraReducers: {
  //   [getSupplierAccountDataService.pending]: state => {
  //     // state.status = 'loading'
  //     state.isLoading = true;
  //     state.error = null;
  //   },
  //   [getSupplierAccountDataService.fulfilled]: (state, action) => {
  //     // state.status = 'resolved'
  //     state.isLoading = false;
  //     state.data = action.payload;
  //   },
  //   [getSupplierAccountDataService.rejected]: (state, action) => {
  //     // state.status = 'rejected'
  //     state.isLoading = false;
  //     state.error = action.payload;
  //   },
  // },
});

export const {
  setFirstName,
  setLastName,
  setCountry,
  setPhone,
  setLicence,
  setEmail,
  setLogo,
  setShopName,
  setBusinessSector,
  setManufacturer,
  setYearEstablished,
  setNumberOfEmployees,
  setAboutTheBusiness,
  setPhotos,
  setBusinessPhone,
  setBusinessEmail,
  setCompanyAddress,
  discountsOffers,
  orderUpdates,
  orderReminders,
  onStockAgain,
  productIsCheaper,
  yourFavoritesNew,
  accountSupport,
} = supplierAccountSlice.actions;
export default supplierAccountSlice.reducer;
