import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import supplierAccountData from '../../services/supplierAccount.service'

export const getSupplierAccountDataService = createAsyncThunk(
  'supplierAccount/getAccountData',

  async function (data, { rejectWithValue }) {
    try {
      const data = await supplierAccountData.getAccountData()
      console.log('data', data)
      return data
    } catch (error) {
      const err = error.response.data.result
        ? error.response.data.result
        : error.message
      return rejectWithValue(err)
    }
  }
)

export const postSupplierAccountDataService = createAsyncThunk(
  'supplierAccount/postAccountData',
  async (personalData, { rejectWithValue }) => {
    try {
      const data = await supplierAccountData.postAccountData(personalData)
      return data
    } catch (error) {
      const err = error.response.data.result
        ? error.response.data.result
        : error.message
      return rejectWithValue(err)
    }
  }
)

// export const selectLogoImgUrl = (state) => state.business_profile.logo_url
// console.log('selectLogoImgUrl', selectLogoImgUrl)

const supplierAccountSlice = createSlice({
  name: 'supplierAccount',
  initialState: {
    isLoading: false,
    error: null,
    business_profile: {},
    personal_info: {}
    // user_info: {
    //   first_name: '',
    //   last_name: '',
    //   phone: ''
    // },
    // license: {
    //   license_number: ''
    // },
    // company_info: {
    //   logo_url: null,
    //   name: '',
    //   business_sector: '',
    //   is_manufacturer: false,
    //   year_established: '',
    //   number_of_employees: '',
    //   description: '',
    //   photo_url: [],
    //   phone: '',
    //   business_email: '',
    //   address: ''
    // },
    // country: {
    //   country: ''
    // }

    // notifications: {
    //     discountsOffers: false,
    //     orderUpdates: false,
    //     orderReminders: false,
    //     onStockAgain: false,
    //     productIsCheaper: false
    //     yourFavoritesNew: false,
    //     accountSupport: false,
    // },
  },

  //будет один редьюсер с выбором изменяемого поля??
  reducers: {
    setFirstName: (state, action) => {
      state.personal_info.first_name = action.payload
    },
    setLastName: (state, action) => {
      state.personal_info.last_name = action.payload
    },
    setCountry: (state, action) => {
      state.personal_info.country = action.payload
    },
    setPhone: (state, action) => {
      state.personal_info.phone = action.payload
    },
    setLicence: (state, action) => {
      state.personal_info.license_number = action.payload
    },
    setEmail: (state, action) => {
      state.email = action.payload
    },
    // password: (state, action) => {
    //     state.password = action.payload;
    // },
    setLogo: (state, action) => {
      state.company_info.logo_url = action.payload
    },
    setShopName: (state, action) => {
      state.company_info.name = action.payload
    },
    setBusinessSector: (state, action) => {
      state.company_info.business_sector = action.payload
    },
    setManufacturer: (state) => {
      state.company_info.is_manufacturer = !state.manufacturer
    },
    setYearEstablished: (state, action) => {
      state.company_info.year_established = action.payload
    },
    setNumberOfEmployees: (state, action) => {
      state.company_info.number_of_employees = action.payload
    },
    setAboutTheBusiness: (state, action) => {
      state.company_info.description = action.payload
    },
    setPhotos: (state, action) => {
      state.company_info.photo_url = action.payload
    },
    // businessCode: (state, action) => {
    //     state.company_info.businessCode = action.payload;
    // },
    setBusinessPhone: (state, action) => {
      state.company_info.phone = action.payload
    },
    setBusinessEmail: (state, action) => {
      state.company_info.business_email = action.payload
    },
    setCompanyAddress: (state, action) => {
      state.company_info.address = action.payload
    }
    // discountsOffers: (state) => {
    //     state.businessSector = !state.businessSector;
    // },
    // orderUpdates: (state) => {
    //     state.orderUpdates = !state.orderUpdates;
    // },
    // orderReminders: (state) => {
    //     state.orderReminders = !state.orderReminders;
    // },
    // onStockAgain: (state) => {
    //     state.onStockAgain = !state.onStockAgain;
    // },
    // productIsCheaper: (state) => {
    //     state.productIsCheaper = !state.productIsCheaper;
    // },
    // yourFavoritesNew: (state) => {
    //     state.yourFavoritesNew = !state.yourFavoritesNew;
    // },
    // accountSupport: (state) => {
    //     state.accountSupport = !state.accountSupport;
    // },
  },
  extraReducers: {
    [getSupplierAccountDataService.pending]: (state) => {
      // state.status = 'loading'
      state.isLoading = true
      state.error = null
    },
    [getSupplierAccountDataService.fulfilled]: (state, action) => {
      // state.status = 'resolved'
      state.isLoading = false
      state.data = action.payload
    },
    [getSupplierAccountDataService.rejected]: (state, action) => {
      // state.status = 'rejected'
      state.isLoading = false
      state.error = action.payload
    }
  }
})

export const {
  setFirstName,
  setLastName,
  setCountry,
  setPhone,
  setLicence,
  setEmail,
  // password,
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
  setCompanyAddress
  // discountsOffers,
  // orderUpdates,
  // orderReminders,
  // onStockAgain,
  // productIsCheaper
  // yourFavoritesNew,
  // accountSupport,
} = supplierAccountSlice.actions
export default supplierAccountSlice.reducer
