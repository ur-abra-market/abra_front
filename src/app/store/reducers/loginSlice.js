import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import authService from '../../services/auth.service'
import cookieService from '../../services/cookie.service'
import { generateResponseError } from '../../utils/generateResponseError'

const initialState = cookieService.getRefreshToken()
  ? {
      resMessage: '',
      errMessage: '',
      loading: false,
      isAuth: true
    }
  : {
      resMessage: '',
      errMessage: '',
      loading: false,
      isAuth: false
    }

export const loginService = createAsyncThunk(
  'login/loginService',
  async function (dataUser, { rejectWithValue }) {
    try {
      const data = await authService.login(dataUser)
      if (data.is_supplier) localStorage.setItem('profile', 'supplier')
      return data.result
    } catch (error) {
      const err = error.response.data.detail
        ? error.response.data.detail
        : error.message
      const message = generateResponseError(err)
      return rejectWithValue(message)
    }
  }
)

const loginSlice = createSlice({
  name: 'login',
  initialState,
  extraReducers: (bulder) => {
    bulder.addCase(loginService.pending, (state) => {
      state.resMessage = ''
      state.loading = true
      state.isAuth = false
    })
    bulder.addCase(loginService.fulfilled, (state, action) => {
      state.resMessage = action.payload // response
      state.loading = false
      state.isAuth = true
    })
    bulder.addCase(loginService.rejected, (state, action) => {
      state.resMessage = action.payload
      state.errMessage = action.payload
      state.loading = false
      state.isAuth = false
    })
  },
  reducers: {}
})

export default loginSlice.reducer
