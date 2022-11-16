import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {productFetch} from '../../services/product.service'
import {Status} from '../enums/status.enum'

export const getProductByIdAndSellerId = createAsyncThunk(
  'targetProduct/getProductByIdAndSellerId',
  async function ({ product_id, seller_id }, { rejectWithValue }) {
    try {
      return await productFetch.getProductByIdAndSellerId({product_id, seller_id})
    } catch (error) {
      const err = error.response.data.result
        ? error.response.data.result
        : error.message
      return rejectWithValue(err)
    }
  }
)

export const getPopularProductById = createAsyncThunk(
    'targetProduct/getPopularProductById',
    async function ({ product_id }, { rejectWithValue }) {
      try {
        return await productFetch.getPopularProductById({product_id})
      } catch (error) {
        const err = error.response.data.result
            ? error.response.data.result
            : error.message
        return rejectWithValue(err)
      }
    }
)

const initialState = {
  product: {},
  popularProducts: [],
  status: Status.Idle,
  error: undefined
}

const targetProductSlice = createSlice({
  name: 'targetProduct',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getProductByIdAndSellerId.pending, (state) => {
      state.status = Status.Loading
    })
    builder.addCase(getProductByIdAndSellerId.fulfilled, (state, action) => {
      state.product = action.payload
      state.status = Status.Success
    })
    builder.addCase(getProductByIdAndSellerId.rejected, (state) => {
      state.status = Status.Failed
    })

    // builder.addCase(getPopularProductById.pending, (state) => {
    //   state.status = Status.Loading
    // })
    builder.addCase(getPopularProductById.fulfilled, (state, action) => {
      state.popularProducts = action.payload
      //state.status = Status.Success
    })
    // builder.addCase(getPopularProductById.rejected, (state) => {
    //   state.status = Status.Failed
    // })
  },
  reducers: {}
})

//export const { } = targetProductSlice.actions
export const targetProductReducer = targetProductSlice.reducer
