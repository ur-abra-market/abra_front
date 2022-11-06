import { createSlice } from '@reduxjs/toolkit'
import productFetch from '../../services/product.service'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const productService = createAsyncThunk(
  'product/productService',
  async function (productData, { rejectWithValue }) {
    try {
      const data = await productFetch.getList(productData)
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
  dataProduct: null,
  statusProduct: 'bestsellers',
  categoryProduct: 'all',
  sumProduct: 100,
  stateProduct: 'nothing',
  quantity: 0,
  max: 1000000,
  price: 8.5,
  reward: 4,
  step: 100
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  extraReducers: (bulder) => {
    bulder.addCase(productService.pending, (state) => {
      state.dataProduct = null
      state.stateProduct = 'loading'
    })
    bulder.addCase(productService.fulfilled, (state, action) => {
      state.dataProduct = action.payload
      state.stateProduct = 'presence'
    })
    bulder.addCase(productService.rejected, (state) => {
      state.dataProduct = null
      state.stateProduct = 'nothing'
    })
  },
  reducers: {
    status: (state, action) => {
      state.statusProduct = action.payload
    },
    category: (state, action) => {
      state.categoryProduct = action.payload
    },
    increment: (state) => {
      state.quantity =
        state.quantity === state.max ? state.max : state.quantity + state.step
    },
    decrement: (state) => {
      state.quantity = state.quantity === 0 ? 0 : state.quantity - state.step
    },
    input: (state, action) => {
      const value = Math.ceil(action.payload / 100) * 100
      if (value < 0) state.quantity = 0
      else if (value > state.max) state.quantity = state.max
      else state.quantity = value
    }
  }
})
export const { status, category, increment, decrement, input } =
  productSlice.actions
export default productSlice.reducer
