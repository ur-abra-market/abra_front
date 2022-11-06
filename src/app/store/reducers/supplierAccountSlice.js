import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { manageProductsService } from './manageProductsSlice'

export const supplierAccountService = createAsyncThunk(
  'supplierAccount/supplierAccountService',

  async function (supplierAccountData, { rejectWithValue }) {
    try {
      const data = await manageProductsService.getList(supplierAccountData)
      return data
    } catch (error) {
      const err = error.response.data.result
        ? error.response.data.result
        : error.message
      return rejectWithValue(err)
    }
  }
)

const supplierAccountSlice = createSlice({
  name: 'supplierAccount',
  initialState: {
    status: null,
    error: null,

    data: null
    // {
    //     firstName: '',
    //     lastName: '',
    //     country: null,
    //     code: '+90',
    //     phone: '',
    //     licence: '',
    //     email: '', //email должен подтягиваться тот, что указывался при регистрации
    //     password: '', //password должен подтягиваться тот, что указывался при регистрации
    //     //как быть с подгрузкой картинки профиля??
    //     shopName: '',
    //     businessSector: null,
    //     manufacturer: false,
    //     yearEstablished: '',
    //     numberOfEmployees: null,
    //     aboutTheBusiness: '',
    //     //как быть с подгрузкой дополнительных фото??
    //     businessCode: '+90',
    //     businessPhone: '',
    //     businessEmail: '',
    //     companyAddress: '',
    //     discountsOffers: false,
    //     orderUpdates: false,
    //     orderReminders: false,
    //     onStockAgain: false,
    //     yourFavoritesNew: false,
    //     accountSupport: false,
    // },
  },
  reducers: {
    //будет один редьюсер с выбором изменяемого поля
    // firstName: (state, action) => {
    //     state.firstName = action.payload;
    // },
    // lastName: (state, action) => {
    //     state.lastName = action.payload;
    // },
    // country: (state, action) => {
    //     state.country = action.payload;
    // },
    // code: (state, action) => {
    //     state.code = action.payload;
    // },
    // phone: (state, action) => {
    //     state.phone = action.payload;
    // },
    // licence: (state, action) => {
    //     state.licence = action.payload;
    // },
    // email: (state, action) => {
    //     state.email = action.payload;
    // },
    // password: (state, action) => {
    //     state.password = action.payload;
    // },
    // shopName: (state, action) => {
    //     state.shopName = action.payload;
    // },
    // businessSector: (state, action) => {
    //     state.businessSector = action.payload;
    // },
    // manufacturer: (state) => {
    //     state.manufacturer = !state.manufacturer;
    // },
    // yearEstablished: (state, action) => {
    //     state.yearEstablished = action.payload;
    // },
    // numberOfEmployees: (state, action) => {
    //     state.numberOfEmployees = action.payload;
    // },
    // aboutTheBusiness: (state, action) => {
    //     state.aboutTheBusiness = action.payload;
    // },
    // businessCode: (state, action) => {
    //     state.businessCode = action.payload;
    // },
    // businessPhone: (state, action) => {
    //     state.businessPhone = action.payload;
    // },
    // businessEmail: (state, action) => {
    //     state.businessEmail = action.payload;
    // },
    // companyAddress: (state, action) => {
    //     state.companyAddress = action.payload;
    // },
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
    // yourFavoritesNew: (state) => {
    //     state.yourFavoritesNew = !state.yourFavoritesNew;
    // },
    // accountSupport: (state) => {
    //     state.accountSupport = !state.accountSupport;
    // },
  },
  extraReducers: {
    [supplierAccountService.pending]: (state) => {
      state.status = 'loading'
      state.error = null
    },
    [supplierAccountService.fulfilled]: (state, action) => {
      state.status = 'resolved'
      state.data = action.payload
    },
    [supplierAccountService.rejected]: (state, action) => {
      state.status = 'rejected'
      state.error = action.payload
    }
  }
})

export const {
  firstName,
  lastName,
  country,
  code,
  phone,
  licence,
  email,
  password,
  shopName,
  businessSector,
  manufacturer,
  yearEstablished,
  numberOfEmployees,
  aboutTheBusiness,
  businessCode,
  businessPhone,
  businessEmail,
  companyAddress,
  discountsOffers,
  orderUpdates,
  orderReminders,
  onStockAgain,
  yourFavoritesNew,
  accountSupport
} = supplierAccountSlice.actions
export default supplierAccountSlice.reducer
