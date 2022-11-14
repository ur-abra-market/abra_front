import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import {Status} from '../enums/status.enum'
import {getSimilarProductsService} from '../../services/getSimilarProducts.service'

export const getSimilarProducts = createAsyncThunk(
  'similarProducts/getSimilarProducts',
  async function ({ productId }, { rejectWithValue }) {
    try {
      const { result } = await getSimilarProductsService.get(productId)
      return result
    } catch (error) {
      console.log('similarErrorAxios', error.message)
      console.log('similarErrorData', error.data.detail)
      const err = error.data.detail
        ? error.data.detail
        : error.message
      return rejectWithValue(err)
    }
  }
)

const initialState = {
  similarProducts: [],
  status: Status.Idle,
}

export const similarProductsSlice = createSlice({
  name: 'similarProducts',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getSimilarProducts.pending, (state) => {
      state.status = Status.Loading
    })
    builder.addCase(getSimilarProducts.fulfilled, (state, action) => {
      state.similarProducts = action.payload
      state.status = Status.Success
    })
    builder.addCase(getSimilarProducts.rejected, (state) => {
      state.dataProduct = []
      state.stateProduct = Status.Failed
    })
  },
  reducers: {}
})

export const similarProductsReducer = similarProductsSlice.reducer
