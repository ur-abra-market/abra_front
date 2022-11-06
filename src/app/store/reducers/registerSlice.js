import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import authService from '../../services/auth.service'
import { generateResponseError } from '../../utils/generateResponseError'

const initialState = {
  resMessage: '',
  errMessage: '',
  loading: false
}
export const registerService = createAsyncThunk(
  'register/registerService',
  async (dataUser, { rejectWithValue }) => {
    try {
      const response = await authService.register(dataUser)
      return response.result
    } catch (error) {
      const err = error.response.data.detail
        ? error.response.data.detail
        : error.message
      const message = generateResponseError(err)
      return rejectWithValue(message)
    }
  }
)

const registerSlice = createSlice({
  name: 'register',
  initialState,
  extraReducers: (bulder) => {
    bulder.addCase(registerService.pending, (state) => {
      state.resMessage = ''
      state.loading = true
    })
    bulder.addCase(registerService.fulfilled, (state, action) => {
      state.resMessage = action.payload // response
      state.loading = false
    })
    bulder.addCase(registerService.rejected, (state, action) => {
      state.resMessage = action.payload
      state.errMessage = action.payload
      state.loading = false
    })
  },
  reducers: {}
})

export default registerSlice.reducer
