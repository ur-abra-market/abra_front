import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {productFetch} from '../../services/product.service'
import {Status} from '../enums/status.enum'

export const getProductById = createAsyncThunk(
  'targetProduct/getProductById',
  async function ({ product_id }, { rejectWithValue }) {
    try {
      const product = await productFetch.getProductById({product_id})
      const images = await productFetch.getProductImagesById({product_id})

      return {product, images}
    } catch (error) {
      const err = error.response.data.result
        ? error.response.data.result
        : error.message
      return rejectWithValue(err)
    }
  }
)

export const getGradesByProductId = createAsyncThunk(
    'targetProduct/getGradesByProductId',
    async function ({ product_id }, { rejectWithValue }) {
      try {
        return await productFetch.getGradesByProductId({product_id})
      } catch (error) {
        const err = error.response.data.result
            ? error.response.data.result
            : error.message
        return rejectWithValue(err)
      }
    }
)

const initialState = {
  product: undefined,
  gradesData: undefined,
  images: undefined,
  status: Status.Idle,
  error: undefined,
}

const targetProductSlice = createSlice({
  name: 'targetProduct',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getProductById.pending, (state) => {
      state.status = Status.Loading
    })
    builder.addCase(getProductById.fulfilled, (state, action) => {
      state.product = action.payload.product
      state.images = action.payload.images
      state.status = Status.Success
    })
    builder.addCase(getProductById.rejected, (state) => {
      state.status = Status.Failed
    })
    builder.addCase(getGradesByProductId.fulfilled, (state, action) => {
      console.log('ACTION GRADE', action.payload)
      state.gradesData = action.payload
    })
  },
  reducers: {}
})

//export const { } = targetProductSlice.actions
export const targetProductReducer = targetProductSlice.reducer
