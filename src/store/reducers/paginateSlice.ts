import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  page_size: 20,
  amountPages: 25,
  page_num: 1,
  allItems: 500,
};

export const paginateSlice = createSlice({
  name: 'paginate',
  initialState,
  reducers: {
    active: (state, action) => {
      state.page_num = action.payload;
    },
    amount: (state, action) => {
      state.page_size = action.payload;
      state.amountPages = Math.ceil(state.allItems / action.payload);
    },
  },
});

export const { active, amount } = paginateSlice.actions;
export default paginateSlice.reducer;
