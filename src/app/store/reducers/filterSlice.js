import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sort_type: 'rating',
  category: 'all',
  price_from: 0,
  price_to: 0,
  discount: false,
  ascending: false
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    category: (state, action) => {
      state.category = action.payload
    },
    sort: (state, action) => {
      state.sort_type = action.payload
    },
    priceFrom: (state, action) => {
      state.price_from = action.payload
    },
    priceTo: (state, action) => {
      state.price_to = action.payload
    },
    discount: (state, action) => {
      state.discount = action.payload
    }
  }
})

export const { category, sort, priceFrom, priceTo, discount } =
  filterSlice.actions
export default filterSlice.reducer
