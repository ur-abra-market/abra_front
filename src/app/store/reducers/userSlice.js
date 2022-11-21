import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import userFetch from '../../services/user.service'

export const uploadUserLogoService = createAsyncThunk(
  'user/uploadUserLogoService',
  async (image, { rejectWithValue }) => {
    try {
      const data = await userFetch.uploadLogoImage(image)
      return data.result
    } catch (error) {
      const err = error.response.data.result
        ? error.response.data.result
        : error.message
      return rejectWithValue(err)
    }
  }
)

const initialState = {
  logoUrl: null,
  errMessage: '',
  loading: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(uploadUserLogoService.pending, (state) => {
        state.logoUrl = null
        state.errMessage = ''
        state.loading = true
      })
      .addCase(uploadUserLogoService.fulfilled, (state, action) => {
        state.logoUrl = action.payload
        state.errMessage = ''
        state.loading = false
      })
      .addCase(uploadUserLogoService.rejected, (state, action) => {
        state.logoUrl = null
        state.errMessage = action.payload
        state.loading = false
      })
  }
})

export default userSlice.reducer
